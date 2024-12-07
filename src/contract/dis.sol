// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

// Import necessary OpenZeppelin contracts for upgradeable ERC721, counters, strings, initializer, and access control
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";

// Define the contract as upgradeable
contract test55 is Initializable, ERC721URIStorageUpgradeable {
    using StringsUpgradeable for uint256; // Use Strings library for uint256 conversions
    using CountersUpgradeable for CountersUpgradeable.Counter; // Use Counters library for managing counters

    // Counters for tracking NTT IDs and token IDs
    CountersUpgradeable.Counter private _NTTIds;
    CountersUpgradeable.Counter private _tokenIds;

    // Mappings to store NTT names, NTT types associated with token IDs, and NTT holdings for addresses
    mapping(uint256 => string) public _NTTNames; // Stores the names of NTTs
    mapping(uint256 => uint256) public _NTTType; // Maps token IDs to their corresponding NTT types
    mapping(address => mapping(uint256 => bool)) public _NTTHoldings; // Tracks whether an address holds a specific NTT

    // Events for logging NTT creation and token minting
    event NTTCreated(string name, uint256 indexed id);
    event TokenMinted(address indexed to, uint256 indexed tokenId, uint256 indexed NTTId);

    // Initialize the contract with the given name and symbol
    function initialize(string memory name, string memory symbol) public initializer {
        __ERC721_init(name, symbol); // Initialize ERC721 with name and symbol
        __ERC721URIStorage_init(); // Initialize URI storage for tokens
    }

    // Function to create a new NTT with a specified name
    function createNTT(string calldata name) external {
        uint256 _id = _NTTIds.current(); // Get the current NTT ID
        _NTTIds.increment(); // Increment the NTT ID counter
        _NTTNames[_id] = name; // Store the NTT name in the mapping
        emit NTTCreated(name, _id); // Emit the NTT creation event
    }

    // Function to mint a new token associated with a specific NTT
    function mint(address to, uint256 NTTId, string memory tokenURI) external {
        uint256 _newTokenId = _tokenIds.current(); // Get the current token ID
        _tokenIds.increment(); // Increment the token ID counter
        _safeMint(to, _newTokenId); // Mint the token to the specified address
        _NTTType[_newTokenId] = NTTId; // Associate the NTT ID with the new token ID
        _setTokenURI(_newTokenId, tokenURI); // Set the token URI
        emit TokenMinted(to, _newTokenId, NTTId); // Emit the token minting event
    }

    // Hook that is called before any token transfer, can be overridden
    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal virtual {}

    // Hook that is called after any token transfer, updates NTT holdings
    function _afterTokenTransfer(address from, address to, uint256 tokenId) internal virtual {
        _NTTHoldings[from][_NTTType[tokenId]] = false; // Remove NTT holding from the sender
        _NTTHoldings[to][_NTTType[tokenId]] = true; // Add NTT holding to the receiver
    }

    // Function to check if an address holds a specific NTT
    function NTTBadge(address owner, uint256 NTTId) public view virtual returns (bool) {
        return _NTTHoldings[owner][NTTId]; // Return the holding status
    }

    // Function to get details of a token by its ID
    function getTokenDetails(uint256 tokenId) public view returns (uint256, string memory) {
        require(tokenId < _tokenIds.current(), "Token does not exist"); // Ensure the token exists
        uint256 nttId = _NTTType[tokenId]; // Get the NTT ID associated with the token
        string memory nttName = _NTTNames[nttId]; // Get the name of the NTT
        return (nttId, nttName); // Return the NTT ID and name
    }

    // Function to get the name of an NTT by its ID
    function NTTName(uint256 NTTId) public view virtual returns (string memory) {
        require(NTTId < _NTTIds.current(), "ERC721Metadata: name query for nonexistent NTT type"); // Ensure the NTT exists
        return _NTTNames[NTTId]; // Return the name of the NTT
    }
}
