# Privacy-aware movement tracking

## Directory structure
````
└── src
    ├── backend
    |   ├── esp32cam (camera setup)
    |   ├── firebase (to upload to database)
    |   └── tensorflow (to handle model training)
    |   |   ├── cocoapi
    |   |   ├── data
    |   |   |   ├── test
    |   |   |   ├── train
    |   |   |   └── valid
    |   |   ├── models (all the model checkpoints)
    |   |   └── setup (scripts to setup environment)
    └── frontend
````