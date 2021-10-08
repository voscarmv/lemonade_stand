# Run all shell commands in sequence. If one fails, echo "null" and return error code.

# extract seed for random
# echo null && exit 1 if $? -ne 0
# ffmpeg generate files (loop for extracting wav pieces, and final join)
# echo null && exit 2 if $? -ne 0
# echo null && exit 3 if out.wav does not exist
# otherwise echo out.wav && exit 0

# At this point however, let's just do a simulation

TXID=${1}
TOKENID=${2}
FILENAME="./tuner/${TOKENID}.wav"

# sleep 6

# echo "Hello ${TXID}" > "./tuner/${FILENAME}" # Mock generation

# echo ${FILENAME}

# Recorder
CTR=0
while test $CTR -lt 2 ; do
    STATION=`shuf -en1 88.3 89.9 91.3 93.5 94.5 97.7 103.1 105.9 107.1`
    radio -f $STATION -q 2>/dev/null 1>/dev/null
    NUMBER=`printf "%03d" ${CTR}`
    ffmpeg -loglevel -8 -y -f alsa -ac 1 -ar 44100 -i hw:1 -t "0.`shuf -en1 05 1 15 2 25 3`" "./tuner/volt${NUMBER}.wav"
    CTR=`expr $CTR + 1`
    # echo $CTR
done

sox ./tuner/volt*wav ${FILENAME}
echo ${FILENAME}
