# syntax=docker/dockerfile:1

FROM python:3.10.8-buster

WORKDIR /tensorflow

RUN apt update
RUN apt install -y python3-pip
RUN apt-get install -y python3-venv

# Create venv
ENV VIRTUAL_ENV=/opt/venv
RUN python3 -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

COPY . ./
ENTRYPOINT ["/bin/bash", "setup/init.sh"]