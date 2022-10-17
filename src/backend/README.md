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
