#!/bin/bash

rm -rf ./hybrid/PhonegapUpload/www/build
cp -R ./build ./hybrid/PhonegapUpload/www/

cd ./hybrid/PhonegapUpload/
phonegap build android
