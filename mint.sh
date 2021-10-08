NFTID=`node mint.js`

if echo ${NFTID} | grep -q '^[0-9][0-9]*$' ; then
    # Create API placeholder record for NFT
    node apicreate.js ${NFTID}
else
    echo "Nothing minted."
    exit 10
fi

MINTRESULT=$?

if test $MINTRESULT -eq 0 ; then
    echo "NFT ${NFTID} created."
    exit 0
fi


"Exit with error code $MINTRESULT"
exit $MINTRESULT
