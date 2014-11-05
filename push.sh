#! /bin/sh

set -o nounset -o errexit

: ${TESSEL_KEY:?}
: ${TESSEL_ID:=`tessel list`}
: ${TAR_FILE:=tessel-${PWD##*/}.tar}
: ${NUM_FILE:=the_number}

echo $((`cat $NUM_FILE` + 1)) > $NUM_FILE   # increment counter
rm -f $TAR_FILE            # prevent exponential tarball growth ;-)
tessel pack index.js

curl -X POST -H "Accept: application/vnd.tessel.remote.v1" -F "api_key=$TESSEL_KEY" -F "device_id=$TESSEL_ID" -F "script_tar=@$TAR_FILE" http://localhost:3000/api/tessel/$TESSEL_ID/code
echo
