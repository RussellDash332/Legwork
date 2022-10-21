# Create models directory if it doesn't exist
mkdir -p ../models

# Setup model zoo file
model_zoo='../setup/model_zoo.txt'
cd ../models

# One-liner download everything
wget -i $model_zoo

# Do a loop to extract the tar.gz files
for url in $(grep . $model_zoo)
do
    tar -xvf $(echo $url | grep -oEi '([^/]*tar\.gz)')
done