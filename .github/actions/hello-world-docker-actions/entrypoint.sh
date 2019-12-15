#!/bin/sh -l

echo "Hallo $1"
time=$(date)
echo ::set-output name=time::$time
