#!/bin/sh

echo ">> Initializng contract"
export NFT_CONTRACT_ID="dev-1667963968389-80281924015328"
echo $NFT_CONTRACT_ID
near call $NFT_CONTRACT_ID init '{"owner_id": "'$NFT_CONTRACT_ID'"}' --accountId $NFT_CONTRACT_ID