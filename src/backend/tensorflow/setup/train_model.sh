# Setup model zoo file
model_zoo='./model_zoo.txt'

# Do a loop to download and extract the tar.gz files
for url in $(grep . $model_zoo)
do
    model_name=$(echo $url | grep -oEi '([^/]*tar\.gz)' | awk '{ print substr( $0, 1, length($0)-7 ) }')
    cp -r models/$model_name/checkpoint models/$model_name/checkpoint_old
    rm -r models/$model_name/checkpoint
    cp models/$model_name/checkpoint_old/checkpoint models/$model_name
    # Train
    echo $(echo "Train $model_name")
    python object_detection/model_main_tf2.py \
        --model_dir=models/$model_name \
        --pipeline_config_path=models/$model_name/pipeline.config \
        --num_train_steps=200
    # Evaluate
    echo $(echo "Eval $model_name")
    python object_detection/model_main_tf2.py \
        --model_dir=models/$model_name \
        --pipeline_config_path=models/$model_name/pipeline.config \
        --checkpoint_dir=models/$model_name \
        --eval_timeout=60
done