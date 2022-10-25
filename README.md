# Privacy-aware movement tracking

## Directory structure
````
└── src
    ├── backend
    |   ├── assets (images for backend README)
    |   ├── esp32cam (camera setup)
    |   ├── firebase (to upload to database)
    |   └── tensorflow (to handle model training)
    |       ├── cocoapi
    |       ├── data (TF record and label map)
    |       |   ├── test
    |       |   ├── train
    |       |   └── valid
    |       ├── models (all the model checkpoints)
    |       ├── object_counting (code for object counting)
    |       ├── object_detection (code for object detection)
    |       ├── models (all the model checkpoints)
    |       ├── [protoc] (see the setup guide for backend)
    |       ├── setup (scripts to setup environment)
    |       |   ├── object_counting (setup file for object counting)
    |       |   ├── object_detection (setup file for object detection)
    |       |   └── (some shell scripts to automate setup)
    |       └── (virtual environment name and config files)
    └── frontend
````