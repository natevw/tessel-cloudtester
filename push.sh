#! /bin/sh

set -o nounset -o errexit

: ${TESSEL_KEY:?}
: ${TESSEL_ID:=`tessel list`}
: ${NET_ADDR:=`ifconfig | awk '/inet /{print $2}' | tail -n 1`}
: ${NET_PORT:=3000}
: ${TAR_FILE:=tessel-${PWD##*/}.tar}
: ${NUM_FILE:=the_number}

echo $((`cat $NUM_FILE` + 1)) > $NUM_FILE   # increment counter
rm -f $TAR_FILE            # prevent exponential tarball growth ;-)
tessel pack index.js

# this is needed until firmware includes…
tessel push ../cloud-client/index.js -a $NET_ADDR -a $((NET_PORT+1))
sleep 5   # give script a chance to startup and register itself

curl -X POST -H "Accept: application/vnd.tessel.remote.v1" -F "api_key=$TESSEL_KEY" -F "device_id=$TESSEL_ID" -F "script_tar=@$TAR_FILE" http://$NET_ADDR:$NET_PORT/api/tessel/$TESSEL_ID/code
echo
