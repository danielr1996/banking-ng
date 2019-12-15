#!/bin/sh -l

pwd
ls -la
echo $INPUT_IMAGENAME
echo $INPUT_IMAGETAG
echo $INPUT_DOCKERUSER
echo $INPUT_DOCKERPASSWORD
echo $INPUT_DOCKERPASSWORD | docker login --username $INPUT_DOCKERUSER --password-stdin
docker build -t $INPUT_IMAGENAME:$INPUT_IMAGETAG .
echo ::set-output name=time::$time
