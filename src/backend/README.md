# Backend

## Camera Setup Guide
TBC.

## Model Setup Guide
Full guide: https://neptune.ai/blog/how-to-train-your-own-object-detector-using-tensorflow-object-detection-api

1. Go to the `tensorflow` directory.
1. Cretae a virtual environment. In this example, we named it as `tf2_api_env`.
    ```sh
    python -m virtualenv tf2_api_env
    ```
1. Activate the virtual environment.
    ```sh
    tf2_api_env\Scripts\activate
    ```
    If you are using Linux, a possible solution might be running this command instead.
    ```sh
    source tf2_api_env/bin/activate
    ```
1. Download, install and compile protobuf:
    - create a folder called `protoc`
    - download `protoc-<version>-<os>.zip` from https://github.com/protocolbuffers/protobuf/releases
    - extract content into the `protoc` folder
1. Compile protoc:
    ```sh
    protoc object_detection/protos/*.proto --python_out=.
    ```
    If the above command does not work, try replacing `protoc` with just `protoc/bin/protoc`.
1. Go to the `setup` folder and install the `object_detection` package (if it gives error, just rerun it)
    ```sh
    cd setup
    python -m pip install .
    ```
1. Test whether the above installation is working by running the command below.
    ```sh
    cd ..
    python object_detection/builders/model_builder_tf2_test.py
    ```
    If it does not work, run `python setup/setup.py install`, then run `model_builder_tf2_test.py` again.
1. To test pre-trained models, do the following steps.
    - Go to the `setup` folder again.
    - Find models from [Tensorflow model zoo](https://github.com/tensorflow/models/blob/master/research/object_detection/g3doc/tf2_detection_zoo.md) and place the URLs into `model_zoo.txt`. An example list of model URLs has been given to you inside the file.
    - Run `./model_setup.sh`. This will download the model files from Tensorflow, and stores it inside the `../models` directory.
    - Now go to the parent directory, where the Python file `model_main_tf2.py` has been provided for you.
    - For any model, make configurations changes to `batch_size, fine_tune_checkpoint, label_map_path, input_path` by editing the `pipeline.config` file on the `models/<model_name>` folder as you see fit.
    - Run the Python model using
      ```sh
      python model_main_tf2.py \
        --pipeline_config_path=<path to your config file> \
        --model_dir=<path to a directory with your model> \
        --checkpoint_every_n=<int for the number of steps per checkpoint> \
        --num_workers=<int for the number of workers to use> \
        --alsologtostderr
      ```
      For example, suppose you have a model called `rcnn_model_1`, then we can run the following command.
      ```sh
      python model_main_tf2.py \
        --pipeline_config_path=models/rcnn_model_1/pipeline.config \
        --model_dir=models/rcnn_model_1/saved_model \
        --checkpoint_every_n=1000 \
        --num_workers=2 \
        --alsologtostderr
      ```

## Firebase Setup Guide
TBC.

## Common Issues
- AttributeError: partially initialized module 'cv2' has no attribute 'gapi_wip_gst_GStreamerPipeline' (most likely due to a circular import)
  - The solution is to ensure that these two packages are of the same version: `opencv-python` and `opencv-python-headless`.
- Getting this error https://stackoverflow.com/questions/70537488/cannot-import-name-registermattype-from-cv2-cv2
  - One common error solution is to do `pip install opencv-python-headless==4.5.2.52`.
- AttributeError: module 'tensorflow.python.training.experimental.mixed_precision' has no attribute '_register_wrapper_optimizer_cls'
  - Based on [this](https://stackoverflow.com/questions/66178738/attributeerror-module-tensorflow-python-training-experimental-mixed-precision), the solution is to upgrade the `keras` package via `pip install keras --upgrade`.