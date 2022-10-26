#!/bin/bash
# Upgrade pip
echo 'Upgrading pip...'
pip install --upgrade pip

# Setup protobuf
sh setup/protobuf.sh

# Setup object_detection
cd setup/object_detection
python -m pip install .
cd ../..
python3 setup/object_detection/setup.py install
python3 object_detection/builders/model_builder_tf2_test.py

# Setup object_counting
pip install -r setup/object_counting/requirements.txt

# Setup models and config for transfer learning
sh setup/model_setup.sh

# Train!
sh setup/train_model.sh