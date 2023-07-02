#!/bin/bash

SRC="./beta-decay-legacy"
DEST="./beta-decay-v2"

TO_CLEAN=(\
    'package-lock.json' \
    'yarn.lock' \
    'app' \
    'build' \
    'companion' \
    'node_modules' \
    'resources' \
    'settings'\
)
TO_COPY=('app' 'companion' 'resources' 'settings')

# remove files or folders
for x in ${TO_CLEAN[@]}
do
     rm -rf "${DEST}/${x}"
done

# copy over files
for d in ${TO_COPY[@]}
do
    cp -R "${SRC}/${d}" "${DEST}"
done

# ls -lrt $DEST

cd "${DEST}"

yarn install
yarn build
export FITBIT_QA_COMMANDS=1
echo "on the following \$fitbit prompt, run the following commands:"
echo "   hosts"
echo "   connect phone"
echo "   connect device"
echo "   build-and-install"
yarn debug
