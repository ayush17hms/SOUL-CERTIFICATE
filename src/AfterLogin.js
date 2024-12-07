import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./afterLogin.css";
import NTT from "./NTT.json";
import background from "./images/bg-01.jpg";

const YOUR_CONTRACT_ADDRESS = "0xC31762a7A7Ea66dC0407C08188aE4762A2e1e9AA";

function AfterLogin() {
  const [fullName, setFullName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [email, setEmail] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [metaMaskEnabled, setMetaMaskEnabled] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  const getContract = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(YOUR_CONTRACT_ADDRESS, NTT.abi, signer);
  };

  const isValidAddress = (address) => {
    return ethers.utils.isAddress(address);
  };

  const checkedWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Get MetaMask!");
        setMetaMaskEnabled(false);
        return;
      }

      await ethereum.enable();
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      const sepoliaChainId = `0x${Number(11155111).toString(16)}`;
      try {
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: sepoliaChainId }],
        });
      } catch (switchError) {
        if (switchError.code === 4902) {
          try {
            await ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: sepoliaChainId,
                  chainName: "Sepolia Testnet",
                  nativeCurrency: {
                    name: "SepoliaETH",
                    symbol: "ETH",
                    decimals: 18,
                  },
                  rpcUrls: ["https://sepolia.infura.io/v3/f343742f11c44d3e9b143468af5f2567"],
                  blockExplorerUrls: ["https://sepolia.etherscan.io"],
                },
              ],
            });
          } catch (addError) {
            console.error("Failed to add Sepolia network:", addError);
            return;
          }
        } else {
          console.error("Failed to switch to Sepolia network:", switchError);
          return;
        }
      }

      console.log("Connected", accounts[0]);
      localStorage.setItem("walletAddress", accounts[0]);
      setMetaMaskEnabled(true);
    } catch (error) {
      console.log(error);
      setMetaMaskEnabled(false);
    }
  };

  useEffect(() => {
    checkedWallet();
    if (window.ethereum) {
      window.ethereum.on("chainChanged", () => window.location.reload());
      window.ethereum.on("accountsChanged", checkedWallet);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidAddress(walletAddress)) {
      alert("Please enter a valid Ethereum wallet address.");
      return;
    }

    if (phoneNum.length !== 10 || isNaN(phoneNum)) {
      alert("Phone number must be a 10-digit number");
      return;
    }

    const final_AfterLogin = `Fullname=${fullName}\nWallet Address=${walletAddress}\nE-mail=${email}\nPhone Number=${phoneNum}\nOrganization Name=${organizationName}\nCourse Name=${courseName}\nOtherdeatils=${purpose}`;

    try {
      setLoading(true); // Set loading state to true
      const contract = getContract();
      const transaction = await contract.mint(walletAddress, 1, final_AfterLogin);
      await transaction.wait(); // Wait for the transaction to be mined
      console.log("Transaction successful", transaction);
      alert("Certificate minted successfully!");
      // Reset the form
      setFullName("");
      setPhoneNum("");
      setOrganizationName("");
      setCourseName("");
      setPurpose("");
      setEmail("");
      setWalletAddress("");
    } catch (error) {
      console.error("Error minting certificate:", error);
      alert("There was an error minting the certificate.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="limiter">
      <div
        className="container-login100"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="wrap-login100 p-t-30 p-b-50">
          <span className="login100-form-title p-b-41">
            Create Soul Certificate
          </span>
          <form className="login100-form validate-form p-b-33 p-t-5" onSubmit={handleSubmit}>
            <div className="wrap-input100 validate-input">
              <input
                className="input100"
                type="text"
                placeholder="Name"
                onChange={(e) => setFullName(e.target.value)}
                value={fullName}
                required
              />
            </div>
            <div className="wrap-input100 validate-input">
              <input
                className="input100"
                type="text"
                placeholder="Wallet address"
                onChange={(e) => setWalletAddress(e.target.value)}
                value={walletAddress}
                required
              />
            </div>
            <div className="wrap-input100 validate-input">
              <input
                className="input100"
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
            <div className="wrap-input100 validate-input">
              <input
                className="input100"
                type="tel" // Change to tel
                placeholder="Phone Number"
                onChange={(e) => setPhoneNum(e.target.value)}
                value={phoneNum}
                maxLength="10"
                required
              />
            </div>
            <div className="wrap-input100 validate-input">
              <input
                className="input100"
                type="text"
                placeholder="Name Of Organization"
                onChange={(e) => setOrganizationName(e.target.value)}
                value={organizationName}
                required
              />
            </div>
            <div className="wrap-input100 validate-input">
              <input
                className="input100"
                type="text"
                placeholder="Course name"
                onChange={(e) => setCourseName(e.target.value)}
                value={courseName}
                required
              />
            </div>
            <div className="wrap-input100 validate-input">  
              <input
                className="input100"
                type="text"
                placeholder="Other Details"
                onChange={(e) => setPurpose(e.target.value)}
                value={purpose}
                required
              />
              
            </div>
            <div className="container-login100-form-btn m-t-32">
              <button type="submit" className="login100-form-btn" disabled={loading}>
                {loading ? "Submitting..." : "Submit Details"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AfterLogin;
