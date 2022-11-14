# ESP32CAM-RTSP

Simple [RTSP](https://en.wikipedia.org/wiki/Real_Time_Streaming_Protocol) server.
Easy configuration through the web interface.

Flashing this software on a ESP32CAM module will make it a **RTSP streaming camera** server.
The RTSP protocol is an industry standard and allows many CCTV systems and applications (like for example [VLC](https://www.videolan.org/vlc/)) to connect directly to the ESP32CAM camera stream.
It is also possible to to stream directly to a server using [ffmpeg](https://ffmpeg.org).
This makes the module a camera server allowing recording and the stream can be stored on a disk and replayed later.

## Credits
Codebase adapted from [rzeldent esp32cam-rtsp](https://github.com/rzeldent/esp32cam-rtsp) repository

esp32cam-ready depends on PlatformIO, Bootstrap5 and Micro-RTSP by Kevin Hester.
