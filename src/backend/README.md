# Backend

Full guide: https://neptune.ai/blog/how-to-train-your-own-object-detector-using-tensorflow-object-detection-api


1. Go to directory, name it what u want, i used `tensorflow`.
1. Make virtual environment.
    ```
    python3 -m virtualenv tf2_api_env
    ```
1. Activate venv.
    ```
    tf2_api_env\Scripts\activate
    ```
1. Install tensorflow in venv:
    ```
    pip install tensorflow==2.*
    ```
1. Clone tensorflow repos to venv, ensure in correct directory as shown in step 1.
    ```
    git clone https://github.com/tensorflow/models.git
    ```
1. Download, install and compile protobuf:
    - create folder called `protoc` in directory
    - download `protoc-<version>-<os>.zip` from https://github.com/protocolbuffers/protobuf/releases
    - extract content into `protoc` folder
1. Compile protoc:	
    ```
    protoc/bin/protoc models/research/object_detection/protos/*.proto --python_out=.
    ```
1. Install COCO API (needed for object detection api), clone repo into directory
    ```
    pip install cython
    pip install git+https://github.com/philferriere/cocoapi.git
    git clone https://github.com/cocodataset/cocoapi.git
    ```
1. Go into models and install object detection package (if last line gives error just rerun it)
    ```
    cd models/research
    cp object_detection/packages/tf2/setup.py .
    python -m pip install .
    ```
1. Test installation is working using
    ```
    python object_detection/builders/model_builder_tf2_test.py
    ```
1.

1.  To test pre-trained models go into workspace directory
    - Copy a provided python script `model_main_tf2.py` for training from `models/research/object_detection` to `Tensorflow/workspace`
    - Downlaod models from https://github.com/tensorflow/models/blob/master/research/object_detection/g3doc/tf2_detection_zoo.md and place into `worksapce/pre_trained_models` (This is a storage used to store the models downloaded)
    - Unzip using command `tar -xf model_name.tar.gz` in terminal
    - Create a folder in `workspace/models` for model (etc. rcnn_model_1) and copy the pre-trained model from `workspace/pre-trained_models` after
    - Inside `worksapce/models`, create a folder and move everything except `checkpoint` folder into that folder (Etc. v1)
    - Make configurations changes to `batch_size, fine_tune_checkpoint, label_map_path, input_path`
    - Run the python model using
        `python model_main_tf2.py --pipeline_config_path=<path to your config file> --model_dir=<path to a directory with your model> --checkpoint_every_n=<int for the number of steps per checkpoint> --num_workers=<int for the number of workers to use> --alsologtostderr`
    - For this instance if repo is cloned can use 
        `python model_main_tf2.py   --pipeline_config_path=./models/rcnn_model_1/v1/pipeline.config   --model_dir=./models/rcnn_model_1/v1/saved_model.saved_model.pb   --checkpoint_every_n=1000   --num_workers=2 --alsologtostderr` instead and debug for errors
    - One common error solution is to do `pip install opencv-python-headless==4.5.2.52` in terminal if you get this error https://stackoverflow.com/questions/70537488/cannot-import-name-registermattype-from-cv2-cv2
