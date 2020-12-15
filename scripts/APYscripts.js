const MFRMPAIR = "0xa7b0A745de09e97B0B1504E32f5173d54036216c";
const APEPAIR = "0x3c83C648512d79993fDA11D920b7Dd8f9ef826fE";
const TENDPAIR = "0x29F82984F6081478112dc10347dCe433f386F769";
const NYANPAIR = "0x1FE4a809cB6F2d495b875A07565Ccc466586a14b";
const MEMEPAIR = "0xDdeB29d1E9D8690211a1ab4F229a57aFb1c8498D";
const USDCPAIR = "0x6d2ED3Ec5FA9be8F88B67731185c9C895163c338";
const xETHPAIR = "0xC6eafB745C22dbe5309d4B74bD8c893A4cdd7864";
const COMPPAIR = "0x1a5AE641b20c14c46E21ca96eD3F776d73290a59";
const chefAddress = "0x352d98CAA75ca7D85516C088b8763693E78D06F0";
var ethaddress = "0x";
var ethconnected = false;
var conn;
var uniswapABI = [{
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
    }, {
        "indexed": true,
        "internalType": "address",
        "name": "spender",
        "type": "address"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
    }],
    "name": "Approval",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount0",
        "type": "uint256"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount1",
        "type": "uint256"
    }, {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
    }],
    "name": "Burn",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount0",
        "type": "uint256"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount1",
        "type": "uint256"
    }],
    "name": "Mint",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount0In",
        "type": "uint256"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount1In",
        "type": "uint256"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount0Out",
        "type": "uint256"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount1Out",
        "type": "uint256"
    }, {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
    }],
    "name": "Swap",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "internalType": "uint112",
        "name": "reserve0",
        "type": "uint112"
    }, {
        "indexed": false,
        "internalType": "uint112",
        "name": "reserve1",
        "type": "uint112"
    }],
    "name": "Sync",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
    }, {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
    }],
    "name": "Transfer",
    "type": "event"
}, {
    "constant": true,
    "inputs": [],
    "name": "DOMAIN_SEPARATOR",
    "outputs": [{
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "MINIMUM_LIQUIDITY",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "PERMIT_TYPEHASH",
    "outputs": [{
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }, {
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "name": "allowance",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "internalType": "address",
        "name": "spender",
        "type": "address"
    }, {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
    }],
    "name": "approve",
    "outputs": [{
        "internalType": "bool",
        "name": "",
        "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "name": "balanceOf",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "internalType": "address",
        "name": "to",
        "type": "address"
    }],
    "name": "burn",
    "outputs": [{
        "internalType": "uint256",
        "name": "amount0",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "amount1",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [{
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "factory",
    "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "getReserves",
    "outputs": [{
        "internalType": "uint112",
        "name": "_reserve0",
        "type": "uint112"
    }, {
        "internalType": "uint112",
        "name": "_reserve1",
        "type": "uint112"
    }, {
        "internalType": "uint32",
        "name": "_blockTimestampLast",
        "type": "uint32"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "internalType": "address",
        "name": "_token0",
        "type": "address"
    }, {
        "internalType": "address",
        "name": "_token1",
        "type": "address"
    }],
    "name": "initialize",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "kLast",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "internalType": "address",
        "name": "to",
        "type": "address"
    }],
    "name": "mint",
    "outputs": [{
        "internalType": "uint256",
        "name": "liquidity",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [{
        "internalType": "string",
        "name": "",
        "type": "string"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "name": "nonces",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "internalType": "address",
        "name": "owner",
        "type": "address"
    }, {
        "internalType": "address",
        "name": "spender",
        "type": "address"
    }, {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
    }, {
        "internalType": "uint8",
        "name": "v",
        "type": "uint8"
    }, {
        "internalType": "bytes32",
        "name": "r",
        "type": "bytes32"
    }, {
        "internalType": "bytes32",
        "name": "s",
        "type": "bytes32"
    }],
    "name": "permit",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "price0CumulativeLast",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "price1CumulativeLast",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "internalType": "address",
        "name": "to",
        "type": "address"
    }],
    "name": "skim",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "internalType": "uint256",
        "name": "amount0Out",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "amount1Out",
        "type": "uint256"
    }, {
        "internalType": "address",
        "name": "to",
        "type": "address"
    }, {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
    }],
    "name": "swap",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [{
        "internalType": "string",
        "name": "",
        "type": "string"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [],
    "name": "sync",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "token0",
    "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "token1",
    "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "internalType": "address",
        "name": "to",
        "type": "address"
    }, {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
    }],
    "name": "transfer",
    "outputs": [{
        "internalType": "bool",
        "name": "",
        "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "internalType": "address",
        "name": "from",
        "type": "address"
    }, {
        "internalType": "address",
        "name": "to",
        "type": "address"
    }, {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
    }],
    "name": "transferFrom",
    "outputs": [{
        "internalType": "bool",
        "name": "",
        "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}];
 async function connectWeb3() {
    console.log("Ethereum ",window.ethereum)
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        conn = await window.ethereum.enable();
        //console.log(conn.length)

        ethconnected = conn.length > 0
        if (ethconnected) {
            ethaddress = conn[0]
        }
        getAPYvalue();
        return true;
    }
}
var totalPoolWeight = 11;
var perblock = 50;
    var annualblock = 365 * 86400 / 13.2; // approximation of 13 sec/block
    var annualreward = annualblock * perblock;
    console.log("Annual block",annualreward);
function getAPYvalue(){
    var ctx0 = new web3.eth.Contract(uniswapABI, MFRMPAIR);
    ctx0.methods.getReserves().call(function(err, result1) {
        ctx0.methods.totalSupply().call(function(err, result2) {
            ctx0.methods.balanceOf(chefAddress).call(function(err, result3) {
                var totalSupply = result2; // total supply of UNI-V2
                var stakedSupply = result3; // staked amount in chef
                var percentageOfSupplyInPool = stakedSupply / totalSupply;
                var MFRMAPY = ((((annualreward/4) / (result1['_reserve0'] * 2 / Math.pow(10, 18))) * 100 * 1) / percentageOfSupplyInPool);
                console.log("APY for MFRM pair",MFRMAPY);
            });
        });
    });
    var ctx1 = new web3.eth.Contract(uniswapABI, APEPAIR);
    ctx1.methods.getReserves().call(function(err, result1) {
        ctx1.methods.totalSupply().call(function(err, result2) {
            ctx1.methods.balanceOf(chefAddress).call(function(err, result3) {
                var totalSupply = result2; // total supply of UNI-V2
                var stakedSupply = result3; // staked amount in chef
                var percentageOfSupplyInPool = stakedSupply / totalSupply;
                var APEAPY = ((((annualreward/4) / (result1['_reserve0'] * 2 / Math.pow(10, 18))) * 100 * 1) / percentageOfSupplyInPool);
                console.log("APY for APE pair",APEAPY);
            });
        });
    });
    var ctx2 = new web3.eth.Contract(uniswapABI, TENDPAIR);
    ctx2.methods.getReserves().call(function(err, result1) {
        ctx2.methods.totalSupply().call(function(err, result2) {
            ctx2.methods.balanceOf(chefAddress).call(function(err, result3) {
                var totalSupply = result2; // total supply of UNI-V2
                var stakedSupply = result3; // staked amount in chef
                var percentageOfSupplyInPool = stakedSupply / totalSupply;
                var TENDAPY = ((((annualreward/12) / (result1['_reserve0'] * 2 / Math.pow(10, 18))) * 100 * 1) / percentageOfSupplyInPool);
                console.log("APY for TEND pair",TENDAPY);
               
            });
        });
    });
    var ctx3 = new web3.eth.Contract(uniswapABI, NYANPAIR);
    ctx3.methods.getReserves().call(function(err, result1) {
        ctx3.methods.totalSupply().call(function(err, result2) {
            ctx3.methods.balanceOf(chefAddress).call(function(err, result3) {
                var totalSupply = result2; // total supply of UNI-V2
                var stakedSupply = result3; // staked amount in chef
                var percentageOfSupplyInPool = stakedSupply / totalSupply;
                var NYANAPY = ((((annualreward/12) / (result1['_reserve0'] * 2 / Math.pow(10, 18))) * 100 * 1) / percentageOfSupplyInPool);
                console.log("APY for NYAN pair",NYANAPY);
            });
        });
    });
    var ctx4 = new web3.eth.Contract(uniswapABI, MEMEPAIR);
    ctx4.methods.getReserves().call(function(err, result1) {
        ctx4.methods.totalSupply().call(function(err, result2) {
            ctx4.methods.balanceOf(chefAddress).call(function(err, result3) {
                var totalSupply = result2; // total supply of UNI-V2
                var stakedSupply = result3; // staked amount in chef
                var percentageOfSupplyInPool = stakedSupply / totalSupply;
                var MEMEAPY = ((((annualreward/12) / (result1['_reserve0'] * 2 / Math.pow(10, 18))) * 100 * 1) / percentageOfSupplyInPool);
                console.log("APY for MEME pair",MEMEAPY);
            });
        });
    });
    var ctx5 = new web3.eth.Contract(uniswapABI, USDCPAIR);
    ctx5.methods.getReserves().call(function(err, result1) {
        ctx5.methods.totalSupply().call(function(err, result2) {
            ctx5.methods.balanceOf(chefAddress).call(function(err, result3) {
                var totalSupply = result2; // total supply of UNI-V2
                var stakedSupply = result3; // staked amount in chef
                var percentageOfSupplyInPool = stakedSupply / totalSupply;
                var USDCAPY = ((((annualreward/15) / (result1['_reserve0'] * 2 / Math.pow(10, 18))) * 100 * 1) / percentageOfSupplyInPool);
                console.log("APY for USDC pair",USDCAPY);
            });
        });
    });
    var ctx6 = new web3.eth.Contract(uniswapABI, xETHPAIR);
    ctx6.methods.getReserves().call(function(err, result1) {
        ctx6.methods.totalSupply().call(function(err, result2) {
            ctx6.methods.balanceOf(chefAddress).call(function(err, result3) {
                var totalSupply = result2; // total supply of UNI-V2
                var stakedSupply = result3; // staked amount in chef
                var percentageOfSupplyInPool = stakedSupply / totalSupply;
                var xETHAPY = ((((annualreward/15) / (result1['_reserve0'] * 2 / Math.pow(10, 18))) * 100 * 1) / percentageOfSupplyInPool);
                console.log("APY for xETH pair",xETHAPY);
            });
        });
    });
    var ctx7 = new web3.eth.Contract(uniswapABI, COMPPAIR);
    ctx7.methods.getReserves().call(function(err, result1) {
        ctx7.methods.totalSupply().call(function(err, result2) {
            ctx7.methods.balanceOf(chefAddress).call(function(err, result3) {
                var totalSupply = result2; // total supply of UNI-V2
                var stakedSupply = result3; // staked amount in chef
                var percentageOfSupplyInPool = stakedSupply / totalSupply;
                var COMPAPY = ((((annualreward/15) / (result1['_reserve0'] * 2 / Math.pow(10, 18))) * 100 * 1) / percentageOfSupplyInPool);
                console.log("APY for COMP pair",COMPAPY);
            });
        });
    });
}