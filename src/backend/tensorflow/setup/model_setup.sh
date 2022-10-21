# Edit this to the list of models used in the end, just a sample for now
modelzoo=(
    "centernet_resnet50_v1_fpn_512x512_coco17_tpu-8.tar.gz"
    "efficientdet_d0_coco17_tpu-32.tar.gz"
)

cd ../models
for mname in ${modelzoo[@]}; do
    wget -c "http://download.tensorflow.org/models/object_detection/tf2/20200711/"$mname
    tar -xvf $mname
done