#!/bin/bash

docker build -t ibmicpcoc/qod-web:1.1.0 .
docker tag ibmicpcoc/qod-web:1.1.0 ibmicpcoc/qod-web:latest
docker push ibmicpcoc/qod-web:1.1.0
docker push ibmicpcoc/qod-web:latest
