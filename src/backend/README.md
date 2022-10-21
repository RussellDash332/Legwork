# Backend

Full guide: https://neptune.ai/blog/how-to-train-your-own-object-detector-using-tensorflow-object-detection-api

## Setup Guide
1. Go to the `tensorflow` directory.
1. Cretae a virtual environment. In this example, we named it as `tf2_api_env`.
    ```
    python -m virtualenv tf2_api_env
    ```
1. Activate the virtual environment.
    ```
    tf2_api_env\Scripts\activate
    ```
    If you are using Linux, a possible solution might be running this command instead.
    ```
    source tf2_api_env/bin/activate
    ```
1. Download, install and compile protobuf:
    - go to the `setup` directory
    - create a folder called `protoc` in the `setup`
    - download `protoc-<version>-<os>.zip` from https://github.com/protocolbuffers/protobuf/releases
    - extract content into the `protoc` folder
1. Compile protoc:
    ```
    protoc/bin/protoc object_detection/protos/*.proto --python_out=.
    ```
    If the above command does not work, try replacing `protoc/bin/protoc` with just `protoc`.
1. Install object detection package (if it gives error, just rerun it)
    ```
    python -m pip install .
    ```
1. Test whether the above installation is working by running the command below.
    ```
    python object_detection/builders/model_builder_tf2_test.py
    ```
1.  To test pre-trained models, do the following steps.
    - Find models from [Tensorflow model zoo](https://github.com/tensorflow/models/blob/master/research/object_detection/g3doc/tf2_detection_zoo.md) and place into `model_setup.sh`. An example list of models has been given to you inside the script.
    - Run `./model_setup.sh`. This will download the model files from Tensorflow, and stores it inside the `models` directory.
    - Now go to the `models` directory, where the Python file `model_main_tf2.py` has been provided for you.
      ```
      cd ../models
      ```
    - For any model, make configurations changes to `batch_size, fine_tune_checkpoint, label_map_path, input_path` by editing the `pipeline.config` file on the model folder as you seem fit.
    - Run the Python model using
      ```
      python model_main_tf2.py \
        --pipeline_config_path=<path to your config file> \
        --model_dir=<path to a directory with your model> \
        --checkpoint_every_n=<int for the number of steps per checkpoint> \
        --num_workers=<int for the number of workers to use> \
        --alsologtostderr
      ```
      For example, suppose you have a model called `rcnn_model_1`, then we can run the following command.
      ```
      python model_main_tf2.py \
        --pipeline_config_path=rcnn_model_1/pipeline.config \
        --model_dir=rcnn_model_1/saved_model/saved_model.pb \
        --checkpoint_every_n=1000 \
        --num_workers=2 \
        --alsologtostderr
      ```

## Common Issues
- One common error solution is to do `pip install opencv-python-headless==4.5.2.52` in terminal if you get this error https://stackoverflow.com/questions/70537488/cannot-import-name-registermattype-from-cv2-cv2
