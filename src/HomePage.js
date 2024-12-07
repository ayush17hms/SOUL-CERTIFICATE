import React from "react";
import { useNavigate } from "react-router-dom";
import "./homePage.css";
import certificateImage from "../src/images/create.webp"; // Sample certificate image
import verifyImage from "../src/images/verify.jpeg"; // Sample verify image
import projectBackground from "./images/bg-01.jpg"; // Background image

const HomePage = () => {
  const navigate = useNavigate();

  const handleCreateCertificate = () => {
    navigate("/login"); // Navigates to the create certificate page
  };

  const handleVerifyCertificate = () => {
    navigate("/Verify"); // Navigates to the verify certificate page
  };

  return (
    <div
      className="home-container"
      style={{ backgroundImage: `url(${projectBackground})` }}
    >
      <div className="home-content">
        <h1 className="home-title">Soul Bound Certificate Platform</h1>
        <p className="home-description">
          Welcome to the Soul Bound Certificate Platform, a blockchain-powered
          solution for generating, minting, and verifying certificates as Soul
          Bound Tokens (SBTs). This platform ensures secure, immutable, and
          verifiable digital credentials stored on the Ethereum blockchain.
        </p>
        <div className="project-details">
          <div className="project-feature">
            <img src={certificateImage} alt="Create Certificate" className="feature-image" />
            
            <h3>Create Certificates</h3>
            <p>
              Use the power of blockchain to mint certificates as Soul Bound
              Tokens. Students or professionals can register their details, and
              certificates will be permanently stored on the blockchain, ensuring
              security and authenticity.
            </p>
            <button className="action-button" onClick={handleCreateCertificate}>
              Create Certificate
            </button>
          </div>
          <div className="project-feature">
            <img src={verifyImage} alt="Verify Certificate" className="feature-image" />
            <h3>Verify Certificates</h3>
            <p>
              Verify the authenticity of certificates using the transaction hash
              on the Ethereum blockchain. Instantly check the certificate details
              and validate its origin using a decentralized approach.
            </p>
            <button className="action-button" onClick={handleVerifyCertificate}>
              Verify Certificate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
