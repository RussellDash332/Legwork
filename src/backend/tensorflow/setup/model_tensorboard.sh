# Extracting model name
model_zoo='./model_zoo.txt'
echo $url $(grep . $model_zoo)
echo $model_name $(echo $url | grep -oEi '([^/]*tar\.gz)' | awk '{ print substr( $0, 1, length($0)-7 ) }')

# Running tensorboard code
tensorboard dev upload --logdir ./models/$model_name --name "Tensorboard model evaluation" --one_shot