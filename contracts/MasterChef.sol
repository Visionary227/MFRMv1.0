// MasterChef is the master of Mfrm. He can make Mfrm and he is a fair guy.
//
// Note that it's ownable and the owner wields tremendous power. The ownership
// will be transferred to a governance smart contract once Mfrm is sufficiently
// distributed and the community can show to govern itself.
//
// Have fun reading it. Hopefully it's bug-free. God bless.
contract MasterChef is Ownable {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    // Info of each user.
    struct UserInfo {
        uint256 amount;     // How many LP tokens the user has provided.
        uint256 rewardDebt; // Reward debt. See explanation below.
        //
        // We do some fancy math here. Basically, any point in time, the amount of Mfrms
        // entitled to a user but is pending to be distributed is:
        //
        //   pending reward = (user.amount * pool.accMfrmPerShare) - user.rewardDebt
        //
        // Whenever a user deposits or withdraws LP tokens to a pool. Here's what happens:
        //   1. The pool's `accMfrmPerShare` (and `lastRewardBlock`) gets updated.
        //   2. User receives the pending reward sent to his/her address.
        //   3. User's `amount` gets updated.
        //   4. User's `rewardDebt` gets updated.
    }

    // Info of each pool.
    struct PoolInfo {
        IERC20 lpToken;           // Address of LP token contract.
        uint256 allocPoint;       // How many allocation points assigned to this pool. Mfrms to distribute per block.
        uint256 lastRewardBlock;  // Last block number that Mfrms distribution occurs.
        uint256 accMfrmPerShare; // Accumulated Mfrms per share, times 1e12. See below.
    }

    // The Mfrm TOKEN!
    MfrmToken public Mfrm;
    // Dev address.
    address public devaddr;
    // Block number when bonus Mfrm period ends.
    uint256 public bonusEndBlock;
    // Mfrm tokens created per block.
    uint256 public MfrmPerBlock;
    // Bonus muliplier for early Mfrm makers.
    uint256 public constant BONUS_MULTIPLIER = 1; //no Bonus
    // Pool lptokens info
    mapping (IERC20 => bool) public lpTokensStatus;
    // Info of each pool.
    PoolInfo[] public poolInfo;
    // Info of each user that stakes LP tokens.
    mapping (uint256 => mapping (address => UserInfo)) public userInfo;
    // Total allocation poitns. Must be the sum of all allocation points in all pools.
    uint256 public totalAllocPoint = 0;
    // The block number when Mfrm mining starts.
    uint256 public startBlock;

    event Deposit(address indexed user, uint256 indexed pid, uint256 amount);
    event Withdraw(address indexed user, uint256 indexed pid, uint256 amount);
    event EmergencyWithdraw(address indexed user, uint256 indexed pid, uint256 amount);

    constructor(
        MfrmToken _Mfrm,
        address _devaddr,
        uint256 _MfrmPerBlock,
        uint256 _startBlock,
        uint256 _bonusEndBlock
    ) public {
        Mfrm = _Mfrm;
        devaddr = _devaddr;
        MfrmPerBlock = _MfrmPerBlock;
        bonusEndBlock = _bonusEndBlock;
        startBlock = _startBlock;
    }

    function poolLength() external view returns (uint256) {
        return poolInfo.length;
    }

    // Add a new lp to the pool. Can only be called by the owner.
    function add(uint256 _allocPoint, IERC20 _lpToken, bool _withUpdate) public onlyOwner {
        require(lpTokensStatus[_lpToken] != true, "LP token already added");
        if (_withUpdate) {
            massUpdatePools();
        }
        uint256 lastRewardBlock = block.number > startBlock ? block.number : startBlock;
        totalAllocPoint = totalAllocPoint.add(_allocPoint);
        poolInfo.push(PoolInfo({
            lpToken: _lpToken,
            allocPoint: _allocPoint,
            lastRewardBlock: lastRewardBlock,
            accMfrmPerShare: 0
        }));
        lpTokensStatus[_lpToken] = true;
    }

    // Update the given pool's Mfrm allocation point. Can only be called by the owner.
    function set(uint256 _pid, uint256 _allocPoint, bool _withUpdate) public onlyOwner {
        if (_withUpdate) {
            massUpdatePools();
        }
        totalAllocPoint = totalAllocPoint.sub(poolInfo[_pid].allocPoint).add(_allocPoint);
        poolInfo[_pid].allocPoint = _allocPoint;
    }

    // Return reward multiplier over the given _from to _to block.
    function getMultiplier(uint256 _from, uint256 _to) public view returns (uint256) {
        if (_to <= bonusEndBlock) {
            return _to.sub(_from).mul(BONUS_MULTIPLIER);
        } else if (_from >= bonusEndBlock) {
            return _to.sub(_from);
        } else {
            return bonusEndBlock.sub(_from).mul(BONUS_MULTIPLIER).add(
                _to.sub(bonusEndBlock)
            );
        }
    }

    // View function to see pending Mfrms on frontend.
    function pendingMfrm(uint256 _pid, address _user) external view returns (uint256) {
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][_user];
        uint256 accMfrmPerShare = pool.accMfrmPerShare;
        uint256 PoolEndBlock =  block.number;
        if(block.number>bonusEndBlock){
            PoolEndBlock = bonusEndBlock;
        }
        uint256 lpSupply = pool.lpToken.balanceOf(address(this));
        if (PoolEndBlock > pool.lastRewardBlock && lpSupply != 0) {
            uint256 multiplier = getMultiplier(pool.lastRewardBlock, PoolEndBlock);
            uint256 MfrmReward = multiplier.mul(MfrmPerBlock).mul(pool.allocPoint).div(totalAllocPoint);
            accMfrmPerShare = accMfrmPerShare.add(MfrmReward.mul(1e12).div(lpSupply));
        }
        return user.amount.mul(accMfrmPerShare).div(1e12).sub(user.rewardDebt);
    }

    // Update reward vairables for all pools. Be careful of gas spending!
    function massUpdatePools() public {
        uint256 length = poolInfo.length;
        for (uint256 pid = 0; pid < length; ++pid) {
            updatePool(pid);
        }
    }

    // Update reward variables of the given pool to be up-to-date.
    function updatePool(uint256 _pid) public {
        PoolInfo storage pool = poolInfo[_pid];
        if (block.number <= pool.lastRewardBlock) {
            return;
        }
        uint256 lpSupply = pool.lpToken.balanceOf(address(this));
        if (lpSupply == 0) {
            pool.lastRewardBlock = block.number;
            return;
        }

        uint256 PoolEndBlock =  block.number;
        if(block.number>bonusEndBlock){
            PoolEndBlock = bonusEndBlock;
        }

        uint256 multiplier = getMultiplier(pool.lastRewardBlock, PoolEndBlock);
        uint256 MfrmReward = multiplier.mul(MfrmPerBlock).mul(pool.allocPoint).div(totalAllocPoint);
        Mfrm.rewards(address(this), MfrmReward);
        pool.accMfrmPerShare = pool.accMfrmPerShare.add(MfrmReward.mul(1e12).div(lpSupply));
        pool.lastRewardBlock = PoolEndBlock;
    }

    // Deposit LP tokens to MasterChef for Mfrm allocation.
    function deposit(uint256 _pid, uint256 _amount) public {
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][msg.sender];
        updatePool(_pid);
        if (user.amount > 0) {
            uint256 pending = user.amount.mul(pool.accMfrmPerShare).div(1e12).sub(user.rewardDebt);
            if(pending > 0) {
                safeMfrmTransfer(msg.sender, pending);
            }
        }
        if(_amount > 0) {
            pool.lpToken.safeTransferFrom(address(msg.sender), address(this), _amount);
            user.amount = user.amount.add(_amount);
        }
        user.rewardDebt = user.amount.mul(pool.accMfrmPerShare).div(1e12);
        emit Deposit(msg.sender, _pid, _amount);
    }

    // Withdraw LP tokens from MasterChef.
    function withdraw(uint256 _pid, uint256 _amount) public {
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][msg.sender];
        require(user.amount >= _amount, "withdraw: not good");
        updatePool(_pid);
        uint256 pending = user.amount.mul(pool.accMfrmPerShare).div(1e12).sub(user.rewardDebt);
        safeMfrmTransfer(msg.sender, pending);
        user.amount = user.amount.sub(_amount);
        user.rewardDebt = user.amount.mul(pool.accMfrmPerShare).div(1e12);
        pool.lpToken.safeTransfer(address(msg.sender), _amount);
        emit Withdraw(msg.sender, _pid, _amount);
    }

    // Withdraw without caring about rewards. EMERGENCY ONLY.
    function emergencyWithdraw(uint256 _pid) public {
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][msg.sender];
        pool.lpToken.safeTransfer(address(msg.sender), user.amount);
        emit EmergencyWithdraw(msg.sender, _pid, user.amount);
        user.amount = 0;
        user.rewardDebt = 0;
    }

    // Safe Mfrm transfer function, just in case if rounding error causes pool to not have enough Mfrms.
    function safeMfrmTransfer(address _to, uint256 _amount) internal {
        uint256 MfrmBal = Mfrm.balanceOf(address(this));
        if (_amount > MfrmBal) {
            Mfrm.transfer(_to, MfrmBal);
        } else {
            Mfrm.transfer(_to, _amount);
        }
    }

    // Update dev address by the previous dev.
    function dev(address _devaddr) public {
        require(msg.sender == devaddr, "dev: wut?");
        devaddr = _devaddr;
    }
}
