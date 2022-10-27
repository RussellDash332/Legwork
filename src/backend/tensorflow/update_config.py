import sys
import tensorflow as tf
from object_detection.utils import config_util
from object_detection.protos import pipeline_pb2
from google.protobuf import text_format

MODEL_NAME = sys.argv[1].strip('.tar.gz')
CHECKPOINT_PATH = f'models/{MODEL_NAME}/checkpoint_old/ckpt-0'
PIPELINE_CONFIG = f'{MODEL_NAME}/pipeline.config'
LABEL_MAP_FUNC = lambda subset: f'data/{subset}/human-lower-limb_label_map.pbtxt'
TF_RECORD_FUNC = lambda subset: f'data/{subset}/human-lower-limb.tfrecord'

config = config_util.get_configs_from_pipeline_file(PIPELINE_CONFIG)
pipeline_config = pipeline_pb2.TrainEvalPipelineConfig()
with tf.io.gfile.GFile(PIPELINE_CONFIG, "r") as f:
    proto_str = f.read()
    text_format.Merge(proto_str, pipeline_config)

# Defensive programming
assert 'centernet' in MODEL_NAME, "Model used must be a CenterNet model"
pipeline_config.model.center_net.num_classes = 1
# Hyperparameter tuning
pipeline_config.model.center_net.object_center_params.classification_loss.penalty_reduced_logistic_focal_loss.alpha = 1
pipeline_config.model.center_net.object_center_params.classification_loss.penalty_reduced_logistic_focal_loss.beta = 2
pipeline_config.train_config.optimizer.adam_optimizer.learning_rate.cosine_decay_learning_rate.learning_rate_base = 1e-3

pipeline_config.train_config.batch_size = 4
pipeline_config.train_config.fine_tune_checkpoint = CHECKPOINT_PATH
pipeline_config.train_config.fine_tune_checkpoint_type = "detection"
pipeline_config.train_input_reader.label_map_path = LABEL_MAP_FUNC('train')
pipeline_config.train_input_reader.tf_record_input_reader.input_path[:] = [TF_RECORD_FUNC('train')]
pipeline_config.eval_input_reader[0].label_map_path = LABEL_MAP_FUNC('test')
pipeline_config.eval_input_reader[0].tf_record_input_reader.input_path[:] = [TF_RECORD_FUNC('test')]

config_text = text_format.MessageToString(pipeline_config)
with tf.io.gfile.GFile(PIPELINE_CONFIG, "wb") as f:
    f.write(config_text)