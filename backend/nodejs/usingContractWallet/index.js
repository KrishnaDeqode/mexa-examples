const {config} = require(`../config`);
const axios = require(`axios`);
const Web3 = require('web3');
const EthereumTx = require("ethereumjs-tx");
const Biconomy = require("@biconomy/mexa");

// This example shows how to interact with your contract using Biconomy via contract wallet approach
try {
    const provider = new Web3.providers.HttpProvider(config.WEB3_PROVIDER_URL);
    const biconomy = new Biconomy(provider, {dappId: config.biconomy.dappId, apiKey: config.biconomy.apiKey, debug: true});
    const web3 = new Web3(biconomy);

    // Initialize contracts
    const contract = new web3.eth.Contract(config.contractABI, config.contractAddress);
    biconomy.onEvent(biconomy.READY, async ()=> {
        console.log('Biconomy is READY\n');
        try {
            let message = await biconomy.getLoginMessageToSign(config.publicKey);
            let signature = web3.eth.accounts.sign(message, `0x${config.privateKey}`);
            let response = await biconomy.accountLogin(config.publicKey, signature.signature);
            if(response.transactionHash) {
                console.log(`NEW USER => Creating your identitiy on chain, Please wait ...   Track using transactionHash ${response.transactionHash}`);
            } else if(response.userContract) {
                console.log(`Login successfull. Contract wallet ${response.userContract}`);
                init();
            }
        } catch(error) {
            console.log(error);
        }
    }).onEvent(biconomy.ERROR, (error, message)=> {
        console.error(error);
        console.error(message);
    }).onEvent(biconomy.LOGIN_CONFIRMATION, (log)=>{
        console.log(`On-chain identity created`);
        console.log(log);
        init();
    });

    const init = async ()=> {
        // Initiate Transaction
        let gasPrice = await web3.eth.getGasPrice();
        let nonce = await getNonce(config.activeNetworkId, web3, config.publicKey);

        var rawTransaction = {
            gasPrice: web3.utils.toHex(gasPrice),
            gasLimit: web3.utils.toHex(210000),
            to: config.contractAddress,
            value: "0x0",
            data: contract.methods.addToFav(6).encodeABI(),
            nonce: nonce
        };

        let transaction = new EthereumTx(rawTransaction);
        let privateKey = new Buffer.from(config.privateKey, "hex");

        transaction.sign(privateKey);
        let serializedTx = transaction.serialize().toString("hex");

        const message = await biconomy.getUserMessageToSign(config.publicKey);
        const sign = await web3.eth.accounts.sign(message, `0x${config.privateKey}`);
        let data = {
            message: message,
            signature: sign.signature,
            rawTransaction: `0x${serializedTx}`
        };
        try {
            await web3.eth.sendSignedTransaction(data)
            .on('transactionHash', (hash)=> {
                console.log(`Transaction hash is ${hash}`)
            })
            .once('confirmation', (confirmation, receipt)=> {
                console.log(`Add Book to Favorite List Transaction, Confirmed.`);
                console.log(receipt);
                process.exit(0);
            });
        } catch(error) {
            console.log(error);
        }
    }

    async function getNonce(networkId, web3, publicAddress){
        if (networkId == "8995") {
            let rpcUrl=config.WEB3_PROVIDER_URL;
            let data = {
                method: "parity_nextNonce",
                params: [publicAddress],
                jsonrpc: "2.0",
                id: new Date().getTime()
            };
            return axios
            .post(rpcUrl, data)
            .then(function(response) {
                if (response.status == 200 && response.data) {
                    let nonce = web3.utils.hexToNumber(response.data.result);
                    return nonce;
                } else {
                    throw new ExpectationFailed(
                        512,
                    `Next nonce for address ${address} not found`
                    );
                }
            })
            .catch(function(error) {
                log.error(error);
                throw new ExpectationFailed(
                    512,
                    `Next nonce for address  not found`
                );
            });
        } else {
            return web3.eth.getTransactionCount(publicAddress, "pending");
        }
    }
} catch(error) {
    console.log(error);
}