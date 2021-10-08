#!/bin/bash

TXID=${1}
TOKENID=${2}

# Generate file with tuner.sh
FILENAME=`./tuner.sh $TXID $TOKENID` # return filename on success, "null" otherwise.
node deployer.js $FILENAME $TOKENID # 0 = success, 1, 2, 3, etc = failure

# If upload succesful, add txhash to served.js
# Otherwise, don't.
EXITCODE=$?
if test $EXITCODE -eq 0 ; then
    echo "Deployment succesful."
    sed -i "s/}$/,\"${TXID}\":${TOKENID}}/" ./served.js
else
    echo "Deployment failed with exit code $EXITCODE"
fi
