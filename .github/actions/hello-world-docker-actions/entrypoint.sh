#!/bin/sh -l

pwd
ls -la
echo $1
echo $2
echo $3
echo $4
docker build -t danielr1996/banking-ui .
echo ::set-output name=time::$time
