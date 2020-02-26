# Book Reads Project
This repository contains nodejs backend project that uses mexa for doing gasless transactions. <br/>
Book reads is a simple DApp containing list of books that can be rated by the user or can be added to favorite list on blockchain.

<h2>Setup</h2>
We have already registered this project on the <a target="_blank" href="https://dashboard.biconomy.io">Developer Dashboard</a> and got 
the <b>dappId</b> and <b>apiKey</b>.<br/>
Project is on <b>Matic Testnet 2 (Network ID: 8995) </b>
<br/>
So we will be doing two blockchain transactions here
<ol>
  <li>Rate a book (Native Meta Transaction)</li>
  <li>Add book to Favorite List (Meta Transaction via Contract Wallet)</li>
</ol>

<h2>Mexa using Contract Wallet Approach</h2>
In this approach, we will first do user login on Biconomy using Mexa and then we can start doing transactions without paying the gas fees.

<h4>Example Code:</h4>
<a href="https://github.com/bcnmy/mexa-examples/blob/master/backend/nodejs/usingContractWallet/index.js" target="_blank"> usingContractWallet/index.js </a>
<h3>How to run</h3>
<ol>
  <li>Clone the project to your local system</li>
  <li>Run <b>npm install</b></li>
  <li>Run <b>npm run start:contract-wallet-approach</b></li>
</ol>

<h2>Mexa using Native Transaction Approach</h2>
In this approach, there is no need to login, we can start doing transactions directly without paying the gas fees.

<h4>Example Code:</h4>
<a href="https://github.com/bcnmy/mexa-examples/blob/master/backend/nodejs/index.js" target="_blank">index.js</a>
<h3>How to run</h3>
<ol>
  <li>Clone the project to your local system</li>
  <li>Run <b>npm install</b></li>
  <li>Run <b>npm run start</b></li>
</ol>

<br/>
<h4>Feel free to change the user public and private keys in config.js file</h4>
