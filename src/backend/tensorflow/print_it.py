import argparse

parser = argparse.ArgumentParser(
        description='Detect objects inside webcam videostream')
parser.add_argument('-m', '--model', type=str,
                    required=True, help='Model Path')
parser.add_argument('-l', '--labelmap', type=str,
                    required=True, help='Path to Labelmap')
parser.add_argument('-v', '--video_path', type=str, default='',
                    help='Path to video. If None camera will be used')
parser.add_argument('-t', '--threshold', type=float,
                    default=0.5, help='Detection threshold')
parser.add_argument('-roi', '--roi_position', type=float,
                    default=0.6, help='ROI Position (0-1)')
parser.add_argument('-la', '--labels', nargs='+', type=str,
                    help='Label names to detect (default="all-labels")')
parser.add_argument('-a', '--axis', default=True, action="store_false",
                    help='Axis for cumulative counting (default=x axis)')
parser.add_argument('-s', '--skip_frames', type=int, default=7,
                    help='Number of frames to skip between using object detection model')
parser.add_argument('-sh', '--show', default=True,
                    action="store_false", help='Show output')
parser.add_argument('-camid', type=str, default="1",help="ID of the camera taking the video")
args = parser.parse_args()

print(f'Video path is "{args.video_path}"')
print(f'CAM ID is "{args.camid}"')
print(f'Model path is "{args.model}"')
print(f'Labelmap path is "{args.labelmap}"')