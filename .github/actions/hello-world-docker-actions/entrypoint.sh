#!/bin/sh -l

echo "$"@
pwd
ls -la
time=$(date)
echo ::set-output name=time::$time
