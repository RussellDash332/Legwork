#!/bin/bash
# Upgrade pip
echo 'Upgrading pip...'
pip install --upgrade pip
while true; do
    read -p "Set up protobuf? [y/n] " yn
    case $yn in
        [Yy]* ) break;;
        [Nn]* ) exit;;
        * ) echo "Please answer yes or no.";;
    esac
done

# Setup protobuf
sh setup/protobuf.sh
while true; do
    read -p "Set up object_detection? [y/n] " yn
    case $yn in
        [Yy]* ) break;;
        [Nn]* ) exit;;
        * ) echo "Please answer yes or no.";;
    esac
done

# Setup object_detection
cd setup/object_detection
python -m pip install .
cd ../..
python setup/object_detection/setup.py install
python object_detection/builders/model_builder_tf2_test.py
while true; do
    read -p "Set up object_counting? [y/n] " yn
    case $yn in
        [Yy]* ) break;;
        [Nn]* ) exit;;
        * ) echo "Please answer yes or no.";;
    esac
done

# Setup object_counting
pip install -r setup/object_counting/requirements.txt
while true; do
    read -p "Set up models and pipeline configs? [y/n] " yn
    case $yn in
        [Yy]* ) break;;
        [Nn]* ) exit;;
        * ) echo "Please answer yes or no.";;
    esac
done

# Setup models and config for transfer learning
sh setup/model_setup.sh
while true; do
    read -p "Train the models? [y/n] " yn
    case $yn in
        [Yy]* ) break;;
        [Nn]* ) exit;;
        * ) echo "Please answer yes or no.";;
    esac
done

# Train!
sh setup/train_model.sh