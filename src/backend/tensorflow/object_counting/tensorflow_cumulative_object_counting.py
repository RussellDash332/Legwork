import cv2
import requests
import io
import os
import PIL
import numpy as np
import argparse
import tensorflow as tf
import dlib
import json
import datetime
from object_detection.utils import label_map_util
from object_detection.utils import ops as utils_ops

from trackable_object import TrackableObject
from centroidtracker import CentroidTracker
from firebase import firebase
from env import FIREBASE_URL

# Create firebase app
fb_app = firebase.FirebaseApplication(FIREBASE_URL, None)

# patch tf1 into `utils.ops`
utils_ops.tf = tf.compat.v1

# Patch the location of gfile
tf.gfile = tf.io.gfile

def log(txt):
    print('log:', txt)

def load_model(model_path):
    tf.keras.backend.clear_session()
    model = tf.saved_model.load(model_path)
    return model

def run_inference_for_single_image(model, image):
    image = np.asarray(image)
    # The input needs to be a tensor, convert it using `tf.convert_to_tensor`.
    input_tensor = tf.convert_to_tensor(image)
    # The model expects a batch of images, so add an axis with `tf.newaxis`.
    input_tensor = input_tensor[tf.newaxis, ...]

    # Run inference
    output_dict = model(input_tensor)

    # All outputs are batches tensors.
    # Convert to numpy arrays, and take index [0] to remove the batch dimension.
    # We're only interested in the first num_detections.
    num_detections = int(output_dict.pop('num_detections'))
    output_dict = {key: value[0, :num_detections].numpy()
                   for key, value in output_dict.items()}
    output_dict['num_detections'] = num_detections

    # detection_classes should be ints.
    output_dict['detection_classes'] = output_dict['detection_classes'].astype(
        np.int64)

    # Handle models with masks:
    if 'detection_masks' in output_dict:
        # Reframe the the bbox mask to the image size.
        detection_masks_reframed = utils_ops.reframe_box_masks_to_image_masks(
            output_dict['detection_masks'], output_dict['detection_boxes'],
            image.shape[0], image.shape[1])
        detection_masks_reframed = tf.cast(
            detection_masks_reframed > 0.5, tf.uint8)
        output_dict['detection_masks_reframed'] = detection_masks_reframed.numpy()

    return output_dict

def run_inference_util(model, category_index, image_arr, labels, roi_position, threshold, x_axis, skip_frames, show, camid, total_frames, counter, ct, trackableObjects, trackers):
    if show:
        img = PIL.Image.fromarray(image_arr, 'RGB')
        try:    os.makedirs('sandbox')
        except: pass
        img.save('sandbox/temp.png')

    height, width, _ = image_arr.shape
    rgb = cv2.cvtColor(image_arr, cv2.COLOR_BGR2RGB)

    status = "Waiting"
    rects = []

    if total_frames % skip_frames == 0:
        status = "Detecting"
        trackers.clear()

        # Actual detection.
        output_dict = run_inference_for_single_image(model, image_arr)

        for i, (y_min, x_min, y_max, x_max) in enumerate(output_dict['detection_boxes']):
            if output_dict['detection_scores'][i] > threshold and (labels == None or category_index[output_dict['detection_classes'][i]]['name'] in labels):
                tracker = dlib.correlation_tracker()
                rect = dlib.rectangle(
                    int(x_min * width), int(y_min * height), int(x_max * width), int(y_max * height))
                tracker.start_track(rgb, rect)
                trackers.append(tracker)
    else:
        status = "Tracking"
        for tracker in trackers:
            # update the tracker and grab the updated position
            tracker.update(rgb)
            pos = tracker.get_position()

            # unpack the position object
            x_min, y_min, x_max, y_max = int(pos.left()), int(
                pos.top()), int(pos.right()), int(pos.bottom())

            # add the bounding box coordinates to the rectangles list
            rects.append((x_min, y_min, x_max, y_max))

    objects = ct.update(rects)

    for (objectID, centroid) in objects.items():
        to = trackableObjects.get(objectID, None)

        if to is None:
            to = TrackableObject(objectID, centroid)
        else:
            if x_axis and not to.counted:
                x = [c[0] for c in to.centroids]
                direction = centroid[0] - np.mean(x)

                if direction > 0:
                    counter[1] += 1
                    to.counted = True
                elif direction < 0:
                    counter[0] += 1
                    to.counted = True

            to.centroids.append(centroid)

        trackableObjects[objectID] = to

        text = "ID {}".format(objectID)
        cv2.putText(image_arr, text, (centroid[0] - 10, centroid[1] - 10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2)
        cv2.circle(
            image_arr, (centroid[0], centroid[1]), 4, (255, 255, 255), -1)

    # Draw ROI line
    if x_axis:
        cv2.line(image_arr, (int(roi_position*width), 0),
                    (int(roi_position*width), height), (0xFF, 0, 0), 5)
    else:
        cv2.line(image_arr, (0, int(roi_position*height)),
                    (width, int(roi_position*height)), (0xFF, 0, 0), 5)

    # display count and status
    font = cv2.FONT_HERSHEY_SIMPLEX
    if x_axis:
        cv2.putText(image_arr, f'Left: {counter[0]}; Right: {counter[1]}', (
            10, 35), font, 0.8, (0, 0xFF, 0xFF), 2, cv2.FONT_HERSHEY_SIMPLEX)
    else:
        cv2.putText(image_arr, f'Up: {counter[2]}; Down: {counter[3]}', (
            10, 35), font, 0.8, (0, 0xFF, 0xFF), 2, cv2.FONT_HERSHEY_SIMPLEX)
    cv2.putText(image_arr, 'Status: ' + status, (10, 70), font,
                0.8, (0, 0xFF, 0xFF), 2, cv2.FONT_HERSHEY_SIMPLEX)

    ## write JSON file: counter[0] = left, counter[1] = right
    if sum(counter) > 0:
        outputL = {"camera_id": camid}
        outputL["count"] = counter[0]
        outputL["direction"] = "left"
        outputL["timestamp"] = str(datetime.datetime.now())

        outputR = {"camera_id": camid}
        outputR["count"] = counter[1]
        outputR["direction"] = "right"
        outputR["timestamp"] = str(datetime.datetime.now())
        camera_log = {"log1": outputL, "log2": outputR}

        # with open("../output/camera_log.json","w") as f: json.dump(camera_log, f)
        for name, log in camera_log.items():
            result = fb_app.post(f"/camera_log/{datetime.datetime.now().strftime('%Y%m%d')}", log, {'print': 'pretty'})
            print(f"Successfully uploaded {name} to Firebase with log ID {result['name']}")
            print(log)

def run_inference(model, category_index, cap, labels, roi_position=0.5, threshold=0.5, x_axis=True, skip_frames=20, show=False, camid=''):
    total_frames = 0

    ct = CentroidTracker(maxDisappeared=40, maxDistance=50)
    trackers = []
    trackableObjects = {}

    while cap.isOpened():
        counter = [0, 0]

        ret, image_np = cap.read()
        if not ret:
            break
        run_inference_util(model, category_index, image_np, labels, roi_position, threshold, x_axis, skip_frames, show, camid, total_frames, counter, ct, trackableObjects, trackers)
        total_frames += 1

def run_inference_ip_address(model, category_index, ip_address, labels, roi_position=0.5, threshold=0.5, x_axis=True, skip_frames=20, show=False, camid=''):
    total_frames = 0

    ct = CentroidTracker(maxDisappeared=40, maxDistance=50)
    trackers = []
    trackableObjects = {}

    while True:
        counter = [0, 0]

        r = requests.get(f'http://{ip_address}/snapshot', stream=True)
        if r.status_code != 200:
            print(f'IP {ip_address} fails the request')
            break
        image_pil = np.array(PIL.Image.open(io.BytesIO(r.content))) 
        run_inference_util(model, category_index, image_pil, labels, roi_position, threshold, x_axis, skip_frames, show, camid, total_frames, counter, ct, trackableObjects, trackers)
        total_frames += 1

if __name__ == '__main__':
    parser = argparse.ArgumentParser(
        description='Detect objects inside webcam videostream')
    parser.add_argument('-m', '--model', type=str,
                        required=True, help='Model Path')
    parser.add_argument('-l', '--labelmap', type=str,
                        required=True, help='Path to Labelmap')
    parser.add_argument('-v', '--video_path', type=str, default='1',
                        help='Path to video. If None camera will be used')
    parser.add_argument('-t', '--threshold', type=float,
                        default=0.5, help='Detection threshold')
    parser.add_argument('-roi', '--roi_position', type=float,
                        default=0.5, help='ROI Position (0-1)')
    parser.add_argument('-la', '--labels', nargs='+', type=str,
                        help='Label names to detect (default="all-labels")')
    parser.add_argument('-a', '--axis', default=True, action="store_false",
                        help='Axis for cumulative counting (default=x axis)')
    parser.add_argument('-s', '--skip_frames', type=int, default=7,
                        help='Number of frames to skip between using object detection model')
    parser.add_argument('-sh', '--show', type=int, default=0, help='Show output')
    parser.add_argument('-camid', type=str, required=True, default="1",help="ID of the camera taking the video")
    parser.add_argument('-ip', type=str, default="1",help="IP address of network used by the camera")
    args = parser.parse_args()

    detection_model = load_model(args.model)
    category_index = label_map_util.create_category_index_from_labelmap(
        args.labelmap, use_display_name=True)

    if args.ip != '1':
        run_inference_ip_address(detection_model, category_index, args.ip, labels=args.labels, threshold=args.threshold,
                    roi_position=args.roi_position, x_axis=args.axis, skip_frames=args.skip_frames, show=args.show, camid=args.camid)
    else:
        if args.video_path != '1':
            print(args.video_path)
            cap = cv2.VideoCapture(args.video_path)
            log('cap created')
        else:
            log('using webcam instead')
            cap = cv2.VideoCapture(0)

        if not cap.isOpened():
            print("Error opening video stream or file")

        run_inference(detection_model, category_index, cap, labels=args.labels, threshold=args.threshold,
                    roi_position=args.roi_position, x_axis=args.axis, skip_frames=args.skip_frames, show=args.show, camid=args.camid)
