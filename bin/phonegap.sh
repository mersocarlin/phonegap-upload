#!/bin/bash

rm -rf ./hybrid/PhonegapUpload/www/build
cp ./build -R ./hybrid/PhonegapUpload/www/

cd ./hybrid/PhonegapUpload/
phonegap build android
