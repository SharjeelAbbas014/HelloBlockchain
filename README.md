# HelloBlockchain

## Introduction

Hyperledger is essentialy an umbrella of open source project that focuses on blockchain business tools. Most famous of them is hyperledger fabric.

## Steps

### Build up a network

The application starts with a network where peers are added.
There could be multiple channels for private comunication peers are added into the channels and given rights.

### Deploy chaincode to network

After network creation chaincode is deployed. Chaincode is basically your blockchain logic. All peers must agree to the chaincode for successful deployment

### Write business app to query chaincode

Write your app to access chaincode. Just like Database require a server, we'll build a server to talk to chaincode.

### Build your frontend

Use the api to get put post or delete data from the blockchain

## HOW TO RUN

-> Run root terminal
-> Go to hyperledger-fabric-network
-> Run "./network.sh down" to close any previous running networks
-> Run "./network.sh up createChannel -c mychannel -ca" to create a channel named mychannel and make two example peers
-> Run "/network.sh deployCC -ccn basic -ccp ../chaincode-javascript/ -ccl javascript" to deploy chaincode to the channel
-> cd to application-javascript
-> Run "npm i" to install packages
-> Run "node index.js" to start express server
-> In new terminal cd to react-frontend
-> Run "npm i" to install packages
-> Run "npm start" to start react app
