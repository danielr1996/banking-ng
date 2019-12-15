#!/bin/sh -l

pwd
ls -la
echo $INPUT_IMAGENAME
echo $INPUT_IMAGETAG
echo $INPUT_DOCKERUSER
echo $INPUT_DOCKERPASSWORD
#docker build -t danielr1996/banking-ui .
echo ::set-output name=time::$time
