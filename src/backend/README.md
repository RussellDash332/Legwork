# Backend

## Camera Setup Guide
TBC.

## Model Setup Guide
Referenced guide: https://neptune.ai/blog/how-to-train-your-own-object-detector-using-tensorflow-object-detection-api

### Generating TF records and label map
> For now, this part has been done and thus the `data` folder is present.
1. Go to Roboflow and create a new project to store the datasets and annotations.
![New Project on Roboflow](assets/new_project.PNG)
1. Upload the images and annotations.
![Upload on Roboflow](assets/upload_images_and_annotations.PNG)
1. After annotating the images, we should get something like this.
![Dataset Annotation](assets/dataset_annotations.PNG)
1. Run `Generate` and setup the train-test-valid split as well as any possible preprocessings and augmentations.
![Generate on Roboflow](assets/generate_workflow.PNG)
1. Finally, we can export the final generation as TFrecord as shown below.
![Final TFrecord](assets/export_tfrecord.PNG)
This will produce a zip file with this particular directory structure. Copy it to the `data` folder as shown below.
```
└── file.zip                          └── data
    ├── train                             ├── train
    |   ├── tfrecord file                 |   ├── tfrecord file
    |   └── labelmap file     ---->       |   └── labelmap file
    ├── test                              ├── test
    ├── valid                             ├── valid
    └── README files                      └── README files
```

### Training the model
1. Go to the `tensorflow` directory.
1. Create a virtual environment, in this guide we will call it `tf2env`.
    ```sh
    python -m virtualenv tf2env
    ```
1. Activate the virtual environment.
    ```
    tf2env\Scripts\activate
    ```
    If you are using Linux, run this command instead.
    ```sh
    . tf2env/bin/activate
    ```
1. Setup the URL for the pre-trained models at `model_zoo.txt`, one model URL per line.
1. Set the number of training steps (currently 200) at `setup/train_model.sh` as you see fit.
1. Run `setup/init.sh`.

## Firebase Setup Guide
TBC.

## Common Issues
- AttributeError: partially initialized module 'cv2' has no attribute 'gapi_wip_gst_GStreamerPipeline' (most likely due to a circular import)
  - The solution is to ensure that these two packages are of the same version: `opencv-python` and `opencv-python-headless`.
- Getting this error https://stackoverflow.com/questions/70537488/cannot-import-name-registermattype-from-cv2-cv2
  - One common error solution is to do `pip install opencv-python-headless==4.5.2.52`.
- AttributeError: module 'tensorflow.python.training.experimental.mixed_precision' has no attribute '_register_wrapper_optimizer_cls'
  - Based on [this](https://stackoverflow.com/questions/66178738/attributeerror-module-tensorflow-python-training-experimental-mixed-precision), the solution is to upgrade the `keras` package via `pip install keras --upgrade`.