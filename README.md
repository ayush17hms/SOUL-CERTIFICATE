# SOUL CERTIFICATE - Document Verification Platform

This repository hosts the code for the `SOUL CERTIFICATE` project, a blockchain-based platform for converting physical certificates into Soul Bound Tokens (SBTs). The platform ensures secure, immutable, and easily verifiable credentials while addressing inefficiencies in traditional certificate verification processes.

---

## Features
- **Immutable Credentials**: Leverages blockchain technology to create tamper-proof certificates.
- **Soul Bound Tokens (SBTs)**: Unique, non-transferable tokens represent verified credentials.
- **Privacy and Security**: Guarantees secure and private record-keeping.
- **Efficient Verification**: Reduces transaction time by 20% and enhances privacy by 30%.

---

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/ayush17hms/SOUL-CERTIFICATE.git
   cd SOUL-CERTIFICATE
   ```

2. **Install Dependencies**:
   Ensure you have Node.js and npm installed. Then, run:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and configure the following variables:
   ```env
   INFURA_PROJECT_ID=your-infura-project-id
   CONTRACT_ADDRESS=your-contract-address
   ```

4. **Deploy the Smart Contract**:
   To deploy the smart contract, use Remix IDE or any suitable Ethereum development tool.
   - Open Remix IDE: [https://remix.ethereum.org/](https://remix.ethereum.org/)
   - Load your Solidity contract from the `src/contracts` folder.
   - Compile the contract.
   - Connect your wallet (e.g., MetaMask) and deploy the contract to the Sepolia TestNet.

   **Note**: Ensure you have test ETH in your wallet to pay for the deployment transaction.

5. **Update the ABI and Contract Address**:
   - After deployment, copy the contract address and save it in the `.env` file as `CONTRACT_ADDRESS`.
   - The ABI of the deployed contract can be found in the `NTT.json` file located in the `src/contracts` folder.

   **Example**:
   ```json
   {
     "contractAddress": "0xYourContractAddressHere",
     "abi": [
       // ABI JSON array
     ]
   }
   ```

6. **Integrate ABI and Contract Address**:
   - Open `src/components/AfterLogin.js` and ensure the contract address and ABI are properly imported.
   ```javascript
   import contractABI from '../contracts/NTT.json';
   const contractAddress = process.env.CONTRACT_ADDRESS;
   ```

7. **Start the Application**:
   ```bash
   npm start
   ```
   This will start the frontend on `http://localhost:3000`.

---

## Usage

1. **Certificate Conversion**:
   - Upload a physical certificate via the platform.
   - The system converts it into an SBT and stores it on the blockchain.

2. **Verification**:
   - Input the transaction hash or wallet address to retrieve and verify the certificate details.

---


## Folder Structure
```
SOUL-CERTIFICATE/
├── src/
│   ├── components/          # React components for the frontend
│   ├── contract/            # Solidity smart contracts
│   ├── hooks/               # Web3 and blockchain service integrations
│   ├── images/              # Images
│   ├── App.js               # Main React application entry point
├── public/                  # Static assets
├── package.json             # Project dependencies
├── README.md                # Documentation
```
---

## Technology Stack
- **Frontend**: React.js, HTML, CSS
- **Blockchain**: Ethereum, Solidity
- **API**: Infura for Ethereum API calls
- **Smart Contract Deployment**: Remix IDE, Sepolia TestNet

---

## Contribution
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Submit a pull request.

---

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

