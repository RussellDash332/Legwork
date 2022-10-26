# Create models directory if it doesn't exist
mkdir -p models

# Setup model zoo file
model_zoo='../model_zoo.txt'
cd models

# Do a loop to download and extract the tar.gz files
for url in $(grep . $model_zoo)
do
    curl -O $(echo $url | grep -oEi '(.*tar\.gz)')
    model_zip=$(echo $url | grep -oEi '([^/]*tar\.gz)')
    tar -xvf $model_zip
    python3 ../update_config.py $model_zip
done