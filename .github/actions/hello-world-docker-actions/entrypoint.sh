#!/bin/sh -l

pwd
ls -la
docker build -t danielr1996/banking-ui .
echo ::set-output name=time::$time
