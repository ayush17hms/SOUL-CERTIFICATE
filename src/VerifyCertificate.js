import React, { useState } from 'react';
import Web3 from 'web3';
import './verifyCertificate.css'; // Import the updated CSS file
import background from "./images/bg-01.jpg";

const VerifyCertificate = () => {
    const [transactionHash, setTransactionHash] = useState('');
    const [certificateData, setCertificateData] = useState(null);
    const [error, setError] = useState(null);

    // Initialize Web3
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');

    const handleVerify = async () => {
        setError(null);
        setCertificateData(null);
        try {
            const transaction = await web3.eth.getTransaction(transactionHash);
            if (!transaction) {
                throw new Error('Transaction not found');
            }

            console.log('Transaction Input:', transaction.input);

            const hexData = transaction.input;

            // Function to convert hex to bytes
            const hexToBytes = (hex) => {
                const bytes = [];
                for (let i = 0; i < hex.length; i += 2) {
                    bytes.push(parseInt(hex.substr(i, 2), 16));
                }
                return new Uint8Array(bytes);
            };

            // Function to decode bytes to a UTF-8 string
            const decodeUtf8 = (bytes) => {
                return new TextDecoder("utf-8").decode(bytes);
            };

            // Function to extract parameters from the hex string
            const extractParameters = (hexData) => {
                const data = hexData.startsWith("0x") ? hexData.slice(2) : hexData;

                const byteArray = hexToBytes(data);

                const toAddress = '0x' + byteArray.slice(4, 24).join('').match(/.{1,2}/g).reverse().join('');
                const amount = parseInt(byteArray.slice(24, 56).join(''), 16);
                const tokenUriLength = parseInt(byteArray.slice(56, 88).join(''), 16);
                const tokenUriStartIndex = 88;

                const tokenUriBytes = byteArray.slice(tokenUriStartIndex, tokenUriStartIndex + tokenUriLength);
                const tokenUri = decodeUtf8(tokenUriBytes);

                return {
                    Wallet_Address: toAddress,
                    Amount: amount,
                    Token_URI: tokenUri
                };
            };

            // Extract parameters from the transaction input
            const extractedData = extractParameters(hexData);

            setCertificateData({
                tokenId: extractedData.Amount,
                extractedData,
                tokenUri: extractedData.Token_URI
            });

            console.log(`Token ID: ${extractedData.Amount}`);
            console.log(`Wallet Address: ${extractedData.Wallet_Address}`);
            console.log(`Amount: ${extractedData.Amount}`);
            console.log(`Token URI: ${extractedData.Token_URI}`);

        } catch (err) {
            setError(err.message);
            console.error(err);
        }
    };

    return (
        <div className="verify-certificate" style={{ backgroundImage: `url(${background})` }}>
            <div className="verifier-container" >
                <h1 className="verifier-title">Verify Certificate</h1>
                <input
                    type="text"
                    value={transactionHash}
                    onChange={(e) => setTransactionHash(e.target.value)}
                    placeholder="Enter Transaction Hash"
                    className="transaction-input"
                />
                <button onClick={handleVerify} className="verify-button">Verify</button>

                {error && <p className="error-message">{error}</p>}

                {certificateData && (
                    <div className="certificate-data">
                        <h2>Certificate Data:</h2>
                        <p>Token ID: {certificateData.tokenId}</p>
                        <p>Wallet Address: {certificateData.extractedData.Wallet_Address}</p>
                        <p>Amount: {certificateData.extractedData.Amount}</p>
                        <p>Token URI: {certificateData.tokenUri}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VerifyCertificate;
