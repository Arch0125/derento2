# DeRento
## Installation Instructions

### Inside contracts folder 
1. `npm install`
2. `npx hardhat node`
3. Switch to Localhost 8545 network in MetaMask.
4. Copy a Private key from the `npx hardhat node` terminal.
5. Inside MetaMask click on Import Accounts and paste the private key
6. Make sure that the account balance is displayed
7. In another terminal run `npx hardhat run --network localhost scripts/sample-script.js`
8. Copy the contract address and paste it inside `frontend/contracts.js`

### Inside frontend folder
1. `npm install`
2. `npm start`
