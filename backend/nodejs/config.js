let config = {}
// Book Reads Contract Details
config.contractAddress = "0xC50e354066248AF3fD637aaF163A15fbA1462D3e";
config.contractABI = [{"constant":false,"inputs":[{"name":"bookId","type":"uint256"}],"name":"addToFav","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x4d7c8c2c"},{"constant":false,"inputs":[{"name":"bookId","type":"uint256"}],"name":"removeFromFav","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0xb9e36caf"},{"constant":true,"inputs":[{"name":"user","type":"address"}],"name":"getBookList","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function","signature":"0xaf97fe68"},{"constant":true,"inputs":[{"name":"bookId","type":"uint256"},{"name":"user","type":"address"}],"name":"getBookFavStatus","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x84d43494"},{"constant":false,"inputs":[{"name":"bookId","type":"uint256"},{"name":"rating","type":"uint256"}],"name":"addRating","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x6760576a"},{"constant":true,"inputs":[{"name":"bookId","type":"uint256"}],"name":"getAvgBookRating","outputs":[{"name":"totalCount","type":"uint256"},{"name":"totalRating","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0xe7aba9d2"},{"constant":true,"inputs":[{"name":"bookId","type":"uint256"},{"name":"user","type":"address"}],"name":"getUserRating","outputs":[{"name":"rating","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x260492cf"}];
config.activeNetworkId = "8995";

// Biconomy configurations
config.biconomy = {
    dappId : "5d8a04b9c4e711650caf4468",
    apiKey: "uihQb57pd.44feab10-b4c5-494c-8f15-68065bc76186"
}

// web3 configurations
config.WEB3_PROVIDER_URL = 'https://testnet2.matic.network';


// Address with balance
// config.publicKey = "0x63591A2cA1da598b263c9ee411037972dd063Bd1";
// config.privateKey = "e2031cd4ac15437e0ad16a81abc3510eb1214e6b1f5eb1d8aa8fc19a04fb0b34";

// Address without balance
config.publicKey = "0x43c97787ba1e89bbB658b9bB2B2000Af9a0ac542";
config.privateKey = "ae2892984e748d0a2b38acab8234d5a6d0fcdbf2dadefba1bcabbfb747dda32f";
module.exports = {config}