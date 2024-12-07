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

3. **Deploy the Smart Contract**:
   - Open [Remix IDE](https://remix.ethereum.org/).
   - Navigate to the `contracts/` folder and open your contract file (e.g., `SoulCertificate.sol`).
   - Compile the contract and deploy it to the Sepolia TestNet.
   - Copy the deployed contract address.

4. **Configure API and Contract Address**:
   - Open the `ntt.json` file and add your Infura Project ID:
     ```json
     {
       "infura_project_id": "your-infura-project-id"
     }
     ```
   - In `AfterLogin.js`, replace the placeholder with your contract address:
     ```javascript
     const contractAddress = "your-deployed-contract-address";
     ```

5. **Start the Application**:
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
