# MemeFarm smart contracts audit report

Prepared by:

- Alex Tikonoff, [tikonoff@gmail.com](tikonoff@gmail.com)

Report:

- October 6, 2020 – date of delivery
- October 15, 2020 – last report update

<br><!-- ******************************************************** -->

## Preamble

This audit report was undertaken for the **[MemeFarm](https://github.com)**, by its request, and has subsequently been shared publicly without any express or implied warranty.

Contracts provided and source verified at [link to Etherscan once deployed].

We would encourage all community members and token holders to make their own assessment of the contracts.

<br><!-- ******************************************************** -->

## Scope

The following contracts were subject for static analyses only:

#### Smart contracts

- [MFRMMasterChef.sol](https://github.com/BlockchainLabsNZ/MemeFarm/blob/main/contracts/MFRMMasterChef.sol)
- [MFRMToken.sol](https://github.com/BlockchainLabsNZ/MemeFarm/blob/main/contracts/MFRMToken.sol)

### Out of scope

Documentation analysis, deploying, dynamic or function testing.

#### Files

- Contracts: [Contract3.sol](https://github.com/) – _these contracts was [previously audited]()_
- Tests: [Test4.js](https://github.com/) – _old tests, kept here because of_ ...
- Folders: [folder1](), [folder2]() – _used for distribution purpose, which is out of scope of this audit_
- Open Zeppeling libraries: [OpenZeppelin GSN](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/GSN), [OpenZeppelin math](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/math), [OpenZeppelin ERC20](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20), [OpenZeppelin access](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/access), [OpenZeppelin utils](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/utils), – _standard libraries, previously audited_

<br><!-- ******************************************************** -->

## Reports

- [Static analysis](static-analysis.md)

<br><!-- ******************************************************** -->

## Issues found

### Severity Description

<table>
<tr>
  <td>Minor</td>
  <td>A defect that does not have a material impact on the contract execution and is likely to be subjective.</td>
</tr>
<tr>
  <td>Moderate</td>
  <td>A defect that could impact the desired outcome of the contract execution in a specific scenario.</td>
</tr>
<tr>
  <td>Major</td>
  <td> A defect that impacts the desired outcome of the contract execution or introduces a weakness that may be exploited.</td>
</tr>
<tr>
  <td>Critical</td>
  <td>A defect that presents a significant security vulnerability or failure of the contract across a range of scenarios.</td>
</tr>
</table>

### Minor

- **Hardcoding specific account address** – `Best practice`<br>

	[OpenZeppelin `Address.sol`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/08dfaab8290494b49737285434aa3682ef663b01/contracts/utils/Address.sol) contract was simplified (removed delegatecall) and bound to the specific address.

	It would be better solution to use the original library contract, which is well tested and maintained, and abstract the bounding logic to the parent/caller contract. This will improve readability, trust and maintainability of the contract. 

  - [x] Team decided to keep this issue

- **Modifier doesn't check `from` address** – `Correctness`, `Security`<br>
	[MFRMToken.sol, 849-855](https://github.com/BlockchainLabsNZ/MemeFarm/blob/9b2e8b74edca40b9dde4370db9b2296364d10c87/contracts/MFRMToken.sol#L849-L855):
	
	```	
	modifier canTransfer(address from) { 
	     require( 
        	 _transferEnabled, 
	         "BaseToken: transfer is not enabled or from does not have the OPERATOR role" 
	     ); 
	     _; 
	 } 
	 ```

	Consider removing `address from` as it isn't used OR implementing such check
	  - [x] Fixed - `address from` removed

- **Inconsistent code formatting** – `Best practice`<br>
	E.g.: MemeFarm/contracts/MFRMMasterChef.sol
	
	```
	 uint256 PoolEndBlock =  block.number; 
	 if(block.number>bonusEndBlock){ 
	
	```
	
	two spaces when assigning, no spaces in comparison.
	It's recommended to use solidity linters/prettierfiers.

  - [x] Team decided to keep this issue

- **Misleading comments** – `Testability`<br>
  Some comments are old, others are misleading (differ from the code).<br>
  - [x] Fixed. 

- **Naming convention** – `Best practice`<br>
  Best practice is to name functions from verb, like doSomething.<br>
  [MFRMMasterChef.sol#L1163](https://github.com/BlockchainLabsNZ/MemeFarm/blob/9b2e8b74edca40b9dde4370db9b2296364d10c87/contracts/MFRMMasterChef.sol#L1163):
`function delegates(address delegator) ...`

	it could be better in terms of reading easiness, hence trust, to change the name of this function to `getDelegates`.

  - [x] Team decided to keep this issue

- **Variables packing** – `Correctness`<br>
  Gas optimisation is possible by packing few variables into one.<br>
	
	```
	    struct Checkpoint {
	        uint32 fromBlock;
	        uint256 votes;
	    }
	```
	is used to store information about checkpoints. It could be optimised by packing block address and number of votes in one uint256 variable:
	
	```
	contract Test {
	    struct structCp {
	        uint32 fromBlock;
	        uint256 votes;
	    }
	    
	    uint256 uintCp;
	    
	    mapping (address => structCp) public structCps;
	    mapping (address => uint256) public uintCps;
	    
	    function useStruct(address addr) public {
	        uint32 blockNumber = uint32(block.number);
	        uint256 votes = 34;
	        structCps[addr] = structCp(blockNumber, votes);
	    }
	    
	    function useUint(address addr) public {
	        uint32 blockNumber = uint32(block.number);
	        uint224 votes = 34;
	        uint256 checkpoint;
	        
	        checkpoint |= blockNumber<<0;
	        checkpoint |= votes<<32;
	        
	        uintCps[addr] = checkpoint;
	    }
	    
	}
	```
	In this tests we can see that `useStruct` tx/execution costs are 64000/41000, whilst `useUint` tx/execution costs are 40000/20000
	
  - [x] Team decided to keep this issue

- **Costly loop** – `Correctness`<br>
  `MassUpdatePool()` iterates over array. Ethereum miners impose a limit on the total number of gas consumed in a block. If array.length is large enough, the function exceeds the block gas limit, and transactions calling it will never be confirmed. 
  The function itself is supposed to be called only by the owner (and thus the onlyOwner() modifier could be added), nevertheless, consider implementing some logic for splitting array if it is too large for one transaction, to avoid manual updates all the pools. 

  - [ ] Fixed
  - [ ] Team decided to keep this issue


- **Compiler versions are different and not fixed** – `Best practices`<br>

	Solidity source files indicate the versions of the compiler they can be compiled with.
	
		pragma solidity ^0.6.0; // bad: compiles w 0.6.0 and above

		pragma solidity 0.6.12; // good : compiles w 0.6.12 only
	
	It is recommended to follow the latter example, as future compiler versions may handle certain language constructions in a way the developer did not foresee.


- **Use of SafeMath** – `Best practices`<br>
	```
	contract MasterChef is Ownable {
   		 using SafeMath for uint256;
   		 ...
	 ```
    
	While using SafeMath is good for project security, it could be expensive. Generally, it is good practice to use explicit checks where it is really needed, and to avoid extra checks where overflow/underflow is impossible.

  - [ ] Fixed
  - [ ] Team decided to keep this issue

  
- **Prefer external to public visibility level** – `Best practices`<br>

	```
    function decimals() public view returns (uint8) {
        return _decimals;
    }
   ```
   
	Changing visibility level to external increases code readability. Moreover, in many cases functions with external visibility modifier spend less gas comparing to functions with public visibility modifier.

  - [ ] Fixed
  - [ ] Team decided to keep this issue

### Moderate

- None found

### Major

- **Comments used to warn, rather than the restricting code** – `Correctness`,`Security`<br>
	[MFRMMasterChef.sol#L1442](https://github.com/BlockchainLabsNZ/MemeFarm/blob/9b2e8b74edca40b9dde4370db9b2296364d10c87/contracts/MFRMMasterChef.sol#L1442)
	`// XXX DO NOT add the same LP token more than once. Rewards will be messed up if you do.`
	
	It would be better solution to implement the check:
	
	``` 
	require(lpToken.balanceOf(address(this)) == 0, "LP token already added");
	```

  - [x] Fixed

### Critical

- None found

<br><!-- ******************************************************** -->

## Observations

- **Altering library contracts**<br>
  Developers implementing custom logic on the top of the well known contracts. It could be better solution to not alter those contracts at all.<br>
  [View on Github](https://github.com/BlockchainLabsNZ/MemeFarm/issues/1)

- **Promise without proof**<br>
  Developers create own logic rather than to rely/base on the well known frameworks, like Aragon DAO for example.
  [View on Github](https://github.com/BlockchainLabsNZ/MemeFarm/issues/4)
  
- **Transfers disabling isn't possible**<br>
	MFRMToken.sol doesn't allow to stop transfers, just in case, if needed.<br>
  [View on Github](https://github.com/BlockchainLabsNZ/MemeFarm/issues/13)

- **No rewards for early birds**<br>
	bonus multiplier is equal to 1 (hardcoded), means no extra bonuses. No reasons to keep the related code to calculate bonuses, OR, it should not be hardcoded.<br>
  [View on Github](https://github.com/BlockchainLabsNZ/MemeFarm/issues/6)
  

- **Using custom logic**<br>
  Developers create own logic rather than to rely/base on the well known frameworks, like Aragon DAO for example.

<br><!-- ******************************************************** -->

## Conclusion

We are that these Smart Contracts do not exhibit any known security vulnerabilities. Overall the code is well written and the developers have been responsive and active throughout the audit process. The contracts show care taken by the developers to follow best practices and a strong knowledge of Solidity.

<br><!-- ******************************************************** -->

---

### Disclaimer

Our team uses our current understanding of the best practises for Solidity and Smart Contracts. Development in Solidity and for Blockchain is an emerging area of software engineering which still has a lot of room to grow, hence our current understanding of best practice may not find all of the issues in this code and design.

We have not analysed any of the assembly code generated by the Solidity compiler. We have not verified the deployment process and configurations of the contracts. We have only analysed the code outlined in the scope. We have not verified any of the claims made by any of the organisations behind this code.

Security audits do not warrant bug-free code. We encourage all users interacting with smart contract code to continue to analyse and inform themselves of any risks before interacting with any smart contracts.