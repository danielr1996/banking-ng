#!/bin/sh -l

echo ImageName: $INPUT_IMAGENAME
echo ImageTag: $INPUT_IMAGETAG
echo DockerUser: $INPUT_DOCKERUSER
echo DockerPasword: $INPUT_DOCKERPASSWORD

echo $INPUT_DOCKERPASSWORD | docker login --username $INPUT_DOCKERUSER --password-stdin
docker build -t $INPUT_IMAGENAME:$(echo $INPUT_IMAGETAG | tr / -) .
docker push $INPUT_IMAGENAME:$(echo $INPUT_IMAGETAG | tr / -)
echo ::set-output name=time::$time
