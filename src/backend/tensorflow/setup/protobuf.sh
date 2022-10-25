# Constant
PROTOBUF_LATEST_VERSION=21.8

mkdir -p protoc
cd protoc
# Install protobuf
curl -LO $(echo "https://github.com/protocolbuffers/protobuf/releases/download/v$PROTOBUF_LATEST_VERSION/protoc-$PROTOBUF_LATEST_VERSION-win64.zip")
unzip -n "protoc-$PROTOBUF_LATEST_VERSION-win64.zip"
cd ..

# Compile protobuf
protoc object_detection/protos/*.proto --python_out=.