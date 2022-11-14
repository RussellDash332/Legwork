# syntax=docker/dockerfile:1

FROM python:3.10.8-buster

WORKDIR /backend

RUN apt update
RUN apt install -y python3-pip
RUN apt-get install -y python3-venv ffmpeg libsm6 libxext6

# Create venv
ENV VIRTUAL_ENV=/opt/venv
RUN python3 -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"
RUN pip3 install wheel

WORKDIR /backend/esp32cam
COPY esp32cam ./
WORKDIR /backend/firebase
COPY firebase ./

WORKDIR /backend/tensorflow/data
COPY tensorflow/data ./
WORKDIR /backend/tensorflow/object_counting
COPY tensorflow/object_counting ./
WORKDIR /backend/tensorflow/object_detection
COPY tensorflow/object_detection ./
WORKDIR /backend/tensorflow/output
COPY tensorflow/output ./
WORKDIR /backend/tensorflow/setup
COPY tensorflow/setup ./
WORKDIR /backend/tensorflow/video
COPY tensorflow/video ./

WORKDIR /backend/tensorflow
COPY tensorflow/model_zoo.txt ./
COPY tensorflow/update_config.py ./
COPY tensorflow/print_it.py ./
RUN pip3 install -r ../firebase/requirements.txt
RUN sh setup/init.sh

ENV camid 1
ENV video 1
ENV ip 1

# python object_counting/tensorflow_cumulative_object_counting.py -m models/<model_name>/saved_model/ -l data/train/human-lower-limb_label_map.pbtxt -camid <cam_id> -v <video_link>
# python object_counting/tensorflow_cumulative_object_counting.py -m models/<model_name>/saved_model/ -l data/train/human-lower-limb_label_map.pbtxt -camid <cam_id> -ip <ip_address>
WORKDIR /backend/tensorflow
CMD python object_counting/tensorflow_cumulative_object_counting.py -m models/centernet_resnet101_v1_fpn_512x512_coco17_tpu-8/saved_model/ -l data/train/human-lower-limb_label_map.pbtxt -camid $camid -v $video -ip $ip

# Example
# python object_counting/tensorflow_cumulative_object_counting.py -m models/centernet_resnet101_v1_fpn_512x512_coco17_tpu-8/saved_model/ -l data/train/human-lower-limb_label_map.pbtxt -camid abcdef -v rtsp://esp32-ec62609bd3c8.local:554/mjpeg/1
# python object_counting/tensorflow_cumulative_object_counting.py -m models/centernet_resnet101_v1_fpn_512x512_coco17_tpu-8/saved_model/ -l data/train/human-lower-limb_label_map.pbtxt -camid abcdef -ip 192.168.166.228

# For debugging
# CMD python print_it.py -m models/centernet_resnet101_v1_fpn_512x512_coco17_tpu-8/saved_model -l data/train/human-lower-limb_label_map.pbtxt -camid $camid -v $video
