const Web3 = require("web3");

const mfrmTokenABI = [
    {
        inputs: [
            {
                internalType: "string",
                name: "name",
                type: "string",
            },
            {
                internalType: "string",
                name: "symbol",
                type: "string",
            },
            {
                internalType: "uint8",
                name: "decimals",
                type: "uint8",
            },
            {
                internalType: "uint256",
                name: "cap",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "initialSupply",
                type: "uint256",
            },
            {
                internalType: "bool",
                name: "transferEnabled",
                type: "bool",
            },
            {
                internalType: "bool",
                name: "mintingFinished",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "Approval",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [],
        name: "MintFinished",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "previousOwner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "OwnershipTransferred",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "Transfer",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [],
        name: "TransferEnabled",
        type: "event",
    },
    {
        inputs: [],
        name: "BUILT_ON",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
        ],
        name: "allowance",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "approve",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "balanceOf",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "burn",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "burnFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "cap",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "decimals",
        outputs: [
            {
                internalType: "uint8",
                name: "",
                type: "uint8",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "subtractedValue",
                type: "uint256",
            },
        ],
        name: "decreaseAllowance",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "enableTransfer",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "finishMinting",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "addedValue",
                type: "uint256",
            },
        ],
        name: "increaseAllowance",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "mintingFinished",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "name",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "owner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "tokenAddress",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenAmount",
                type: "uint256",
            },
        ],
        name: "recoverERC20",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "rewards",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "symbol",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "totalSupply",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "transfer",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "transferEnabled",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "transferFrom",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
const mfrmMasterChefABI = [
    {
        inputs: [
            {
                internalType: "contract MfrmToken",
                name: "_Mfrm",
                type: "address",
            },
            {
                internalType: "address",
                name: "_devaddr",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "_MfrmPerBlock",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_startBlock",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_bonusEndBlock",
                type: "uint256",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "user",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "pid",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "Deposit",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "user",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "pid",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "EmergencyWithdraw",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "previousOwner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "OwnershipTransferred",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "user",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "pid",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "Withdraw",
        type: "event",
    },
    {
        inputs: [],
        name: "BONUS_MULTIPLIER",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "Mfrm",
        outputs: [
            {
                internalType: "contract MfrmToken",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "MfrmPerBlock",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_allocPoint",
                type: "uint256",
            },
            {
                internalType: "contract IERC20",
                name: "_lpToken",
                type: "address",
            },
            {
                internalType: "bool",
                name: "_withUpdate",
                type: "bool",
            },
        ],
        name: "add",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "bonusEndBlock",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_pid",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_amount",
                type: "uint256",
            },
        ],
        name: "deposit",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_devaddr",
                type: "address",
            },
        ],
        name: "dev",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "devaddr",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_pid",
                type: "uint256",
            },
        ],
        name: "emergencyWithdraw",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_from",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_to",
                type: "uint256",
            },
        ],
        name: "getMultiplier",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "massUpdatePools",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "owner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_pid",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "_user",
                type: "address",
            },
        ],
        name: "pendingMfrm",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "poolInfo",
        outputs: [
            {
                internalType: "contract IERC20",
                name: "lpToken",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "allocPoint",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "lastRewardBlock",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "accMfrmPerShare",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "poolLength",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_pid",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_allocPoint",
                type: "uint256",
            },
            {
                internalType: "bool",
                name: "_withUpdate",
                type: "bool",
            },
        ],
        name: "set",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "startBlock",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "totalAllocPoint",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_pid",
                type: "uint256",
            },
        ],
        name: "updatePool",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "userInfo",
        outputs: [
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "rewardDebt",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_pid",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_amount",
                type: "uint256",
            },
        ],
        name: "withdraw",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
const uniswapPairABI = [
    {
        inputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "Approval",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "sender",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount0",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount1",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address",
            },
        ],
        name: "Burn",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "sender",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount0",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount1",
                type: "uint256",
            },
        ],
        name: "Mint",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "sender",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount0In",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount1In",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount0Out",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount1Out",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address",
            },
        ],
        name: "Swap",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint112",
                name: "reserve0",
                type: "uint112",
            },
            {
                indexed: false,
                internalType: "uint112",
                name: "reserve1",
                type: "uint112",
            },
        ],
        name: "Sync",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "Transfer",
        type: "event",
    },
    {
        constant: true,
        inputs: [],
        name: "DOMAIN_SEPARATOR",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "MINIMUM_LIQUIDITY",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "PERMIT_TYPEHASH",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "allowance",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "approve",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "balanceOf",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
        ],
        name: "burn",
        outputs: [
            {
                internalType: "uint256",
                name: "amount0",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "amount1",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "decimals",
        outputs: [
            {
                internalType: "uint8",
                name: "",
                type: "uint8",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "factory",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "getReserves",
        outputs: [
            {
                internalType: "uint112",
                name: "_reserve0",
                type: "uint112",
            },
            {
                internalType: "uint112",
                name: "_reserve1",
                type: "uint112",
            },
            {
                internalType: "uint32",
                name: "_blockTimestampLast",
                type: "uint32",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                internalType: "address",
                name: "_token0",
                type: "address",
            },
            {
                internalType: "address",
                name: "_token1",
                type: "address",
            },
        ],
        name: "initialize",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "kLast",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
        ],
        name: "mint",
        outputs: [
            {
                internalType: "uint256",
                name: "liquidity",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "name",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "nonces",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "deadline",
                type: "uint256",
            },
            {
                internalType: "uint8",
                name: "v",
                type: "uint8",
            },
            {
                internalType: "bytes32",
                name: "r",
                type: "bytes32",
            },
            {
                internalType: "bytes32",
                name: "s",
                type: "bytes32",
            },
        ],
        name: "permit",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "price0CumulativeLast",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "price1CumulativeLast",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
        ],
        name: "skim",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                internalType: "uint256",
                name: "amount0Out",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "amount1Out",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        name: "swap",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "symbol",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [],
        name: "sync",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "token0",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "token1",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "totalSupply",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "transfer",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "transferFrom",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
];



//const totalPoolWeight = 11;
const perblock = 50;
const annualblock = 365 * 86400 / 13.2; // approximation of 13 sec/block
const annualreward = annualblock * perblock;

const contractAddress =
    '{ "address":[' +
    '{"mfrmToken":"0xae0e2128f201e069eb272fd16670106a07a4c212"},' +
    '{"mfrmMasterChef":"0xa8F1B569B0817e0d53a07e7A7DCc0Aee9486c6e2"}]}';
export const contractAddressJSON = JSON.parse(contractAddress);

/* MAINNET
const pairAddress =
    '{ "address":[' +
    '{  "pid":"0", "pairAddress":"0x9Cd5FbceFE777D2fD8de8b96CfC9f626665B68f2", "baseToken": "APE", "pair":"APE-ETH UNI-V2", "apy": "127", "pool": "Chad Pool: APE", "icon": "🦍", "uniswapLink": "https://app.uniswap.org/#/add/ETH/0x209C1808FeBf6c1aB7C65764bb61AD67d3923fcc" },' +
    '{  "pid":"1", "pairAddress":"0x", "baseToken": "MFRM", "pair":"MFRM-ETH UNI-V2", "apy": "127", "pool": "Chad Pool: MFRM", "icon": "🚜", "uniswapLink": "https://app.uniswap.org/#/add/ETH/0x" },' +
    '{  "pid":"2", "pairAddress":"0xcFB8CF118B4F0ABB2E8CE6DBEb90D6bC0A62693D", "baseToken": "TEND", "pair":"TEND-ETH UNI-V2", "apy": "127", "pool": "Meme Pool: TEND", "icon": "🐔", "uniswapLink": "https://app.uniswap.org/#/add/ETH/0x6b3595068778dd592e39a122f4f5a5cf09c90fe2" },' +
    '{  "pid":"3", "pairAddress":"0xCE84867c3c02B05dc570d0135103d3fB9CC19433", "baseToken": "SUSHI", "pair":"SUSHI-ETH UNI-V2", "apy": "127", "pool": "Meme Pool: SUSHI", "icon": "🍣", "uniswapLink": "https://app.uniswap.org/#/add/ETH/0xae0E2128f201e069eB272fD16670106A07A4c212" },' +
    '{  "pid":"4", "pairAddress":"0x5DFbe95925FFeb68f7d17920Be7b313289a1a583", "baseToken": "MEME", "pair":"MEME-ETH UNI-V2", "apy": "127", "pool": "Meme Pool: MEME", "icon": "🐸", "uniswapLink": "https://app.uniswap.org/#/add/ETH/0xd5525d397898e5502075ea5e830d8914f6f0affe" },' +
    '{  "pid":"5", "pairAddress":"0xa2107FA5B38d9bbd2C461D6EDf11B11A50F6b974", "baseToken": "LINK", "pair":"LINK-ETH UNI-V2", "apy": "127", "pool": "Safu Pool: LINK", "icon": "🔗", "uniswapLink": "https://app.uniswap.org/#/add/ETH/0x514910771af9ca656af840dff83e8264ecf986ca" },' +
    '{  "pid":"6", "pairAddress":"0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc", "baseToken": "USDC", "pair":"USDC-ETH UNI-V2", "apy": "127", "pool": "Safu Pool: USDC", "icon": "💸", "uniswapLink": "https://app.uniswap.org/#/add/ETH/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48" },' +
    '{  "pid":"7", "pairAddress":"0xCFfDdeD873554F362Ac02f8Fb1f02E5ada10516f", "baseToken": "COMP", "pair":"COMP-ETH UNI-V2", "apy": "127", "pool": "Safu Pool: COMP", "icon": "🌱", "uniswapLink": "https://app.uniswap.org/#/add/ETH/0xc00e94cb662c3520282e6f5717214004a7f26888" },' +
    '{  "pid":"8", "pairAddress":"0xd3d2E2692501A5c9Ca623199D38826e513033a17", "baseToken": "UNI", "pair":"UNI-ETH UNI-V2", "apy": "127", "pool": "Jungle Pool: UNI", "icon": "🦄", "uniswapLink": "https://app.uniswap.org/#/add/ETH/0x1f9840a85d5af5bf1d1762f925bdaddc4201f984" },' +
    '{  "pid":"9", "pairAddress":"0x495871F1825193471F614Fde19c8c580f5E7Ac63", "baseToken": "L2", "pair":"L2-ETH UNI V2", "apy": "127", "pool": "Jungle Pool: L2", "icon": "🍄", "uniswapLink": "https://app.uniswap.org/#/add/ETH/0xbbff34e47e559ef680067a6b1c980639eeb64d24" },' +
    '{  "pid":"10","pairAddress":"0x2fDbAdf3C4D5A8666Bc06645B8358ab803996E28", "baseToken": "YFI", "pair":"YFI-ETH UNI V2", "apy": "127", "pool": "Jungle Pool: YFI", "icon": "🧶", "uniswapLink": "https://app.uniswap.org/#/add/ETH/0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e" }]}';
*/
//KOVAN
const pairAddress =
    '{ "address":[' +
    '{  "pid":"0", "pairAddress":"0xf605025e3c4232dc9a916499654bf4051416e407", "baseToken": "APE", "pair":"APE-ETH UNI-V2", "apy": "127", "pool": "Chad Pool: APE", "icon": "🦍", "uniswapLink": "https://app.uniswap.org/#/add/ETH/0xae0e2128f201e069eb272fd16670106a07a4c212" },' +
    '{  "pid":"1", "pairAddress":"0xc9a3c96b64c458c6b29f1270648bccb5624657aa", "baseToken": "MFRM", "pair":"MFRM-ETH UNI-V2", "apy": "127", "pool": "Chad Pool: MFRM", "icon": "🚜", "uniswapLink": "https://app.uniswap.org/#/add/ETH/0x" },' +
    '{  "pid":"2", "pairAddress":"0xab71d4d074cf28de6565173e100cbd565bf75c13", "baseToken": "TEND", "pair":"TEND-ETH UNI-V2", "apy": "127", "pool": "Meme Pool: TEND", "icon": "🐔", "uniswapLink": "https://app.uniswap.org/#/add/ETH/0x6b3595068778dd592e39a122f4f5a5cf09c90fe2" },' +
    '{  "pid":"3", "pairAddress":"0x65f109d6af8e08ffb44533a0773bd0063b4412a5", "baseToken": "SUSHI", "pair":"SUSHI-ETH UNI-V2", "apy": "127", "pool": "Meme Pool: SUSHI", "icon": "🍣", "uniswapLink": "https://app.uniswap.org/#/add/ETH/0xae0E2128f201e069eB272fD16670106A07A4c212" },' +
    '{  "pid":"4", "pairAddress":"0x6f1B32E7E1E605960e2B5150F631318B05c73c0b", "baseToken": "MEME", "pair":"MEME-ETH UNI-V2", "apy": "127", "pool": "Meme Pool: MEME", "icon": "🐸", "uniswapLink": "https://app.uniswap.org/#/add/ETH/0xd5525d397898e5502075ea5e830d8914f6f0affe" },' +
    '{  "pid":"5", "pairAddress":"0xbeb1e9b0c95cd34ff1d3292ce573986a3cc3825d", "baseToken": "LINK", "pair":"LINK-ETH UNI-V2", "apy": "127", "pool": "Safu Pool: LINK", "icon": "🔗", "uniswapLink": "https://app.uniswap.org/#/add/ETH/0x514910771af9ca656af840dff83e8264ecf986ca" },' +
    '{  "pid":"6", "pairAddress":"0xf1198bf25f5e3b4309085c8ebab446d92c28d6b4", "baseToken": "USDC", "pair":"USDC-ETH UNI-V2", "apy": "127", "pool": "Safu Pool: USDC", "icon": "💸", "uniswapLink": "https://app.uniswap.org/#/add/ETH/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48" },' +
    '{  "pid":"7", "pairAddress":"0x2f095f7ad1F620f836f72C28080864Ad9d248e14", "baseToken": "COMP", "pair":"COMP-ETH UNI-V2", "apy": "127", "pool": "Safu Pool: COMP", "icon": "🌱", "uniswapLink": "https://app.uniswap.org/#/add/ETH/0xc00e94cb662c3520282e6f5717214004a7f26888" },' +
    '{  "pid":"8", "pairAddress":"0x594005E913D9Be17dE2C0Ff290fC3dD4ba6673Df", "baseToken": "UNI", "pair":"UNI-ETH UNI-V2", "apy": "127", "pool": "Jungle Pool: UNI", "icon": "🦄", "uniswapLink": "https://app.uniswap.org/#/add/ETH/0x1f9840a85d5af5bf1d1762f925bdaddc4201f984" },' +
    '{  "pid":"9", "pairAddress":"0xe67B901ba5B661317f2b34937bF7C588A8E36c86", "baseToken": "L2", "pair":"L2-ETH UNI V2", "apy": "127", "pool": "Jungle Pool: L2", "icon": "🍄", "uniswapLink": "https://app.uniswap.org/#/add/ETH/0xbbff34e47e559ef680067a6b1c980639eeb64d24" },' +
    '{  "pid":"10","pairAddress":"0xd630037C2949d10F17878EFc1F24E652B8484F60", "baseToken": "YFI", "pair":"YFI-ETH UNI V2", "apy": "127", "pool": "Jungle Pool: YFI", "icon": "🧶", "uniswapLink": "https://app.uniswap.org/#/add/ETH/0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e" }]}';
export const pairAddressJSON = JSON.parse(pairAddress);
const approveLimit = "115792089237316195423570985008687907853269984665640564039457584007913129639935";
var ethaddress = "0x";
let web3 = require("web3");
web3 = new Web3(web3.givenProvider);
// web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
// connect with metamask wallet
export const connectToWeb3 = async function connectWeb3 () {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        const conn = await window.ethereum.enable();
        const ethconnected = conn.length > 0;
        if (ethconnected) {
            ethaddress = conn[0];
        }
        const poolResData = initPoolHomedata();
        web3.eth.getAccounts().then("getAccounts" + console.log);
        return poolResData;
    }
};
function initPoolHomedata () {
    let contract = new web3.eth.Contract(
        mfrmTokenABI,
        contractAddressJSON.address[0].mfrmToken
    );
    let accountBalance = contract.methods.balanceOf(ethaddress)
        .call().then((accountBalance) => {
            return (accountBalance);
        });
    contract = new web3.eth.Contract(
        mfrmTokenABI,
        contractAddressJSON.address[0].mfrmToken
    );
    let totalSupply = contract.methods.totalSupply()
        .call().then((totalSupply) => {
            return (totalSupply);
        });
    // pending Mfrm Tokens
    contract = new web3.eth.Contract(
        mfrmMasterChefABI,
        contractAddressJSON.address[1].mfrmMasterChef
    );
    let pendingToken = contract.methods.pendingMfrm(0, ethaddress)
        .call().then((pendingMfrmToken) => {
            return (pendingMfrmToken);
        });
    // get mfrm per block
    const tokenContract = new web3.eth.Contract(
        mfrmMasterChefABI,
        contractAddressJSON.address[1].mfrmMasterChef
    );
    let mfrmPerBlock = tokenContract.methods.MfrmPerBlock()
        .call().then((mfrmPerBlock) => {
            return mfrmPerBlock;
        });
    let addresses = JSON.parse(pairAddress);
    contract.methods.poolLength()
        .call().then((poolLength) => {
            for (let i = 0; i < poolLength; i++) {
                const pool = new web3.eth.Contract(
                    returnPair(i),
                    pairAddressJSON.address[i].pairAddress
                );
                pool.methods.getReserves().call(function(err, result1) {
                    pool.methods.totalSupply().call(function(err, result2) {
                        pool.methods.balanceOf(contractAddressJSON.address[1].mfrmMasterChef).call(function(err, result3) {
                            var totalSupply = result2; // total supply of UNI-V2
                            var stakedSupply = result3; // staked amount in chef
                            var percentageOfSupplyInPool = stakedSupply / totalSupply;
                            //result1['_reserve0'] is the amount of tokens in the pool
                            const APY = ((((annualreward/4) / (result1['_reserve0'] * 2 / Math.pow(10, 18))) * 100 * 1) / percentageOfSupplyInPool).toFixed(2);
                            addresses.address[i].apy = APY;
                        });
                    });
                });
            }
            return addresses;
        });
    const promiseData = [accountBalance, totalSupply, pendingToken, mfrmPerBlock, addresses];
    return Promise.all(promiseData).then((resultantCount) => {
        return resultantCount;
    });
}

export async function getAddressInfo(){
    let contract = new web3.eth.Contract(
        mfrmMasterChefABI,
        contractAddressJSON.address[1].mfrmMasterChef
    );
    let addresses = JSON.parse(pairAddress);
    contract.methods.poolLength()
        .call().then((poolLength) => {
            for (let i = 0; i < poolLength; i++) {
                const pool = new web3.eth.Contract(
                    returnPair(i),
                    pairAddressJSON.address[i].pairAddress
                );
                pool.methods.getReserves().call(function(err, result1) {
                    pool.methods.totalSupply().call(function(err, result2) {
                        pool.methods.balanceOf(contractAddressJSON.address[1].mfrmMasterChef).call(function(err, result3) {
                            var totalSupply = result2; // total supply of UNI-V2
                            var stakedSupply = result3; // staked amount in chef
                            var percentageOfSupplyInPool = stakedSupply / totalSupply;
                            //result1['_reserve0'] is the amount of tokens in the pool
                            const APY = ((((annualreward/4) / (result1['_reserve0'] * 2 / Math.pow(10, 18))) * 100 * 1) / percentageOfSupplyInPool).toFixed(2);
                            addresses.address[i].apy = APY;
                        });
                    });
                });
            }
        });
        return addresses;
}

export default function loginViaMetamask () {
    if (typeof window.web3 == "undefined") {
        alert("MetaMask is not installed");
    }
    web3 = new Web3(window.web3.currentProvider);
    web3.eth.getAccounts(async function (err, accounts) {
        console.log("Error", err);
        console.log("Accounts", accounts);
    });
}

export function checkNetwork () {
    web3.eth.net.getId().then((netId) => {
        if (netId === 42) {
            console.log(netId);
            return true;
        }
    });
}

// get balance
export function getBalance () {
    const contract = new web3.eth.Contract(
        mfrmTokenABI,
        contractAddressJSON.address[0].mfrmToken
    );
    contract.methods.balanceOf(ethaddress)
        .call().then((accountBalance) => {
            console.log(accountBalance);
        });
}

// total supply
export async function getTotalSupply () {
    const contract = new web3.eth.Contract(
        mfrmTokenABI,
        contractAddressJSON.address[0].mfrmToken
    );
    let totalSupply = contract.methods.totalSupply()
        .call().then((totalSupply) => {
            return (totalSupply);

        });
    return totalSupply;
}

// your UNI-V2 lp token from wallet
export async function getLPTokenBalance (pid) {
    const contract = new web3.eth.Contract(
        returnPair(pid),
        pairAddressJSON.address[pid].pairAddress
    );
    let balanceOfLPToken = contract.methods.balanceOf(ethaddress)
        .call().then((balanceOfLPToken) => {
            return balanceOfLPToken;
        });
    return balanceOfLPToken;
}

export async function confirmTransaction (hash) {
    const txReciept = await web3.eth.getTransactionReceipt(hash);
    if (txReciept.status) {
        return txReciept.status;
    }
}

// stack amount
export function poolAmount (pid) {
    const contract = new web3.eth.Contract(
        mfrmMasterChefABI,
        contractAddressJSON.address[1].mfrmMasterChef
    );
    let totalStackAmount = contract.methods.userInfo(pid, ethaddress)
        .call().then((totalStackAmount) => {
            return totalStackAmount;
        });
    return totalStackAmount;
}

// mfrm per block
export function mfrmPerBlock () {
    const contract = new web3.eth.Contract(
        mfrmMasterChefABI,
        contractAddressJSON.address[1].mfrmMasterChef
    );
    contract.methods.MfrmPerBlock()
        .call().then((mfrmPerBlock) => {
            console.log(mfrmPerBlock);
        });
}

// get allowance, if totalAllowance =< 0 user is new otherwise old
export async function getPairAllowance (pid) {
    const contract = new web3.eth.Contract(
        returnPair(pid),
        pairAddressJSON.address[pid].pairAddress
    );
    let totalAllowance = contract.methods.allowance(
        ethaddress,
        contractAddressJSON.address[1].mfrmMasterChef)
        .call().then((totalAllowance) => {
           return totalAllowance;
        });
    return totalAllowance;
}

// total earned or pending mfrm tokens
export async function pendingMfrm (pid) {
    const contract = new web3.eth.Contract(
        mfrmMasterChefABI,
        contractAddressJSON.address[1].mfrmMasterChef
    );
    let pendingMfrmToken = contract.methods.pendingMfrm(pid, ethaddress)
        .call().then((pendingMfrmToken) => {
            return pendingMfrmToken;
        });
    return pendingMfrmToken;
}

// appropriate uniswap link for adding liquidity
export async function getUniswapLink (pid) {
    return pairAddressJSON.address[pid].uniswapLink;
}

// appropriate basetoken for adding pool
export async function getBaseToken (pid) {
    return pairAddressJSON.address[pid].baseToken;
}

// stack/deposit
export async function addToPool (pid, amount) {
    const chefContract = new web3.eth.Contract(
        mfrmMasterChefABI,
        contractAddressJSON.address[1].mfrmMasterChef
    );
    let addToPoolData = chefContract.methods.deposit(pid, amount)
        .send({ from: ethaddress }, async function (error, transactionHash) {
            if (error) {
                console.log(error)
            }
            console.log(transactionHash);
        });
    return addToPoolData
}

// harvest
export async function claimRewards (pid) {
    const chefContract = new web3.eth.Contract(
        mfrmMasterChefABI,
        contractAddressJSON.address[1].mfrmMasterChef
    );
    let claimRewardsHash = chefContract.methods
        .deposit(pid, "0")
        .send({ from: ethaddress }, async function (error, transactionHash) {
            if (error) {
                console.log(error)
            }
            console.log(transactionHash);
        });
    return claimRewardsHash
}

// unstacke
export async function removeToPool (pid, amount) {
    const contract = new web3.eth.Contract(
        mfrmMasterChefABI,
        contractAddressJSON.address[1].mfrmMasterChef
    );
    let removeToPoolData = contract.methods
        .withdraw(pid, amount)
        .send({ from: ethaddress }, async function (error, transactionHash) {
            console.log(transactionHash);
            return transactionHash;
        });
    return removeToPoolData;
}

// approve only call if user is new
export async function approveSpend (pid) {
    const contract = new web3.eth.Contract(
        returnPair(pid),
        pairAddressJSON.address[pid].pairAddress
    );
    let transactionHash = contract.methods.approve(
        contractAddressJSON.address[1].mfrmMasterChef,
        approveLimit)
        .send({ from: ethaddress }, async function (error, transactionHash) {
            console.log(transactionHash);
            return transactionHash;
        });
    return transactionHash;
}
function returnPair (pid) {
    const pair = {
        //'8': mspABI,
        //'9': gamABI,
        //'10': strcABI,
        'default': uniswapPairABI
    }
    return pair[pid] || pair['default']
}

// eslint-disable-next-line no-extend-native
Number.prototype.toFixedSpecial = function (n) {
    var str = this.toFixed(n);
    if (str.indexOf("e+") === -1) return str;
    // if number is in scientific notation, pick (b)ase and (p)ower
    str = str.replace(".", "").split("e+")
        .reduce((p, b) => p + Array(b - p.length + 2).join(0));
    if (n > 0) str += "." + Array(n + 1).join(0);
    return str;
};
