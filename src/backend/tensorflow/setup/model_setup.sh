# Create models directory if it doesn't exist
mkdir -p ../models

# Setup model zoo file
model_zoo='../setup/model_zoo.txt'
cd ../models

# Do a loop to download and extract the tar.gz files
for url in $(grep . $model_zoo)
do
    curl -O $(echo $url | grep -oEi '(.*tar\.gz)')
    tar -xvf $(echo $url | grep -oEi '([^/]*tar\.gz)')
done