const { Gateway, Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const path = require('path');
const { buildCAClient, registerAndEnrollUser, enrollAdmin } = require('./lib/CAUtil.js');
const { buildCCPOrg1, buildWallet } = require('./lib/AppUtil.js');
const { get } = require('http');

const channelName = 'mychannel';
const chaincodeName = 'basic';
const mspOrg1 = 'Org1MSP';
const walletPath = path.join(__dirname, 'wallet');
const org1UserId = 'appUser';
module.exports.getContract = getContract;
async function getContract() {
	try {

		/* COPIED FROM DOCUMENTATION */
		// build an in memory object with the network configuration (also known as a connection profile)

        const ccp = buildCCPOrg1();

		// build an instance of the fabric ca services client based on
		// the information in the network configuration
		const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');

		// setup the wallet to hold the credentials of the application user
		const wallet = await buildWallet(Wallets, walletPath);

		// in a real application this would be done on an administrative flow, and only once
		await enrollAdmin(caClient, wallet, mspOrg1);

		await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');

			const gateway = new Gateway();
	
				await gateway.connect(ccp, {
				wallet,
				identity: org1UserId,
				discovery: { enabled: true, asLocalhost: true } // using asLocalhost as this gateway is using a fabric network deployed locally
			});

			const network = await gateway.getNetwork(channelName);

			const contract = network.getContract(chaincodeName);
			/* END COPIED FROM DOCUMENTATION */
			await contract.submitTransaction('InitLedger');
            return contract;
		
	} catch (error) {
		console.error(`******** FAILED to run the application: ${error}`);
		return null;
	}
}

