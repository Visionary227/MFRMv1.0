import React, { Component } from "react";
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Footer from "../../components/footer";
import Header from "../../components/header";
import importScript from "../../utilities/importScript";
import { connect } from "react-redux";
import * as actionTypes from "../../redux/action";
import * as utils from "../../mfrmscript";
import "./style.css";
import removeScript from "../../utilities/removeScript";
// import roundToXDigits from '../../utilities/roundToDigits';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

class Harvest extends Component {
  state = {
    showPopUp: false,
    showModal: false,
    pairAllowance: '0.000',
    pid: null,
    poolAmount: 0,
    stakeBalance: 0,
    showLPTokenBalance: '0.000',
    showPoolAmount: '0.000'
  }
  componentDidMount () {
    if (!this.props.boxInfo) {
      this.props.history.replace('/home');
      return;
    }
    importScript('../../mfrmscript.js');
    const query = new URLSearchParams(this.props.location.search);
    let id;
    for (let param of query.entries()) {
      id = param[1];
      this.setState({ pid: id })
    }
    this.getPairAllowance(id);
  }
  // checks user first time user coming or not
  //checks if user has nonzero balance before moving to next step
  getPairAllowance (id) {
    utils.getPairAllowance(id).then(pairAllowance => {
      this.setState({ pairAllowance: Number(pairAllowance).toFixed(3) })
      if (Number(pairAllowance)) {
        this.getPoolAmount(id)
      }
    })
  }
  // checks user stake for first time or not 
  // if value is greater than 0 then show unstake and pool amount value
  // return user staked val
  getPoolAmount (id) {
    utils.poolAmount(id).then(poolAmount => {
      this.setState({
        poolAmount: poolAmount[0],
        showPoolAmount: ( poolAmount[0] / Math.pow(10,18) ).toFixed(3)
      })
      if (!Number(poolAmount)) {
        this.getLPToken(id)
      }
    })
  }
  // returns user balance 
  getLPToken (id) {
    utils.getLPTokenBalance(id).then(stakeBalance => {
      this.setState({
        stakeBalance: stakeBalance,
        showLPTokenBalance: Number(stakeBalance / Math.pow(10,18)) === 0 ? '0.000' : Number(stakeBalance / Math.pow(10,18))
      })
    })
  }
  componentWillUnmount () {
    removeScript('../../mfrmscript.js');
  }
  openPopupHandler = () => {
    this.setState({ showPopUp: !this.state.showPopUp })
  }
  openModalHandler = () => {
    this.setState({ showModal: !this.state.showModal })
  }
  connectToWeb3Handler = () => {
    utils.connectToWeb3().then(res => {
      if (res.length) {
        this.props.onStoreBoxInfo(true);
        this.props.onStoreMemeBalance((res[0]/Math.pow(10,18)));
        this.props.onStoreSupplyBalance((res[1]/Math.pow(10,18)));
        this.props.onStoreHarvestBalance((res[2]/Math.pow(10,18)));
        this.props.onStoreTotalRewards((res[3]/Math.pow(10,18)));
      }
    })
  }
  onHarvestHandler = () => {
    utils.claimRewards(this.state.pid).then(res => {
      this.pendingMfrm(this.state.pid);
      this.getPairAllowance(this.state.pid)
    })
  }
  approveHandler = () => {
    utils.approveSpend(this.state.pid).then(approveSpendData => {
      if (approveSpendData) {
        this.confirmTransactionHandler(approveSpendData.transactionHash);
      }
    })
  }
  confirmTransactionHandler = (hash) => {
    utils.confirmTransaction(hash).then(res => {
      if (res) {
        console.log('confirmTransaction ', res)
        toastr.options = {
          closeButton: true,
          positionClass: 'toast-top-right',
          hideDuration: 300,
          timeOut: 2000
        }
        toastr.success(`Transaction Successful`);
        this.getPairAllowance(this.state.pid)
      }
    })
  }
  stakeHandler = () => {
    let lpTokenValue = this.state.stakeBalance;
    utils.addToPool(this.state.pid, lpTokenValue).then(addToPool => {
      if (addToPool) {
        console.log('addToPool ', addToPool)
        this.confirmTransactionHandler(addToPool.transactionHash)
        this.pendingMfrm(this.state.pid);
      }
    })
  }
  unStakeHandler = () => {
    let poolAmountValue = this.state.poolAmount;
    utils.removeToPool(this.state.pid, poolAmountValue).then(removeToPool => {
      if (removeToPool) {
        console.log('removeToPool ', removeToPool)
        this.confirmTransactionHandler(removeToPool.transactionHash);
        this.pendingMfrm(this.state.pid);
      }
    })
  }
  pendingMfrm = (id) => {
    utils.pendingMfrm(id).then(resp => {
      this.props.pendingMfrmBalance(resp);
    })
  }
  render () {
    let harvestBtnClasses = ['harvectBoxButton']
    if (!Number(this.props.pendingMfrm)) {
      harvestBtnClasses.push('cursor-blocked');
    }
    let showButton = null;
    if (Number(this.state.pairAllowance)) {
      if (Number(this.state.poolAmount)) {
        showButton = <Aux>
          <button className="harvectBoxButton harvectBoxButton1"
            onClick={this.unStakeHandler} >
            UNSTAKE
          </button>
          <div className="harvectBoxButton harvectBoxButton2">
            <img src={require("../../assets/images/plus.png")}
              alt="plus" />
          </div>
        </Aux>
      }
      else {
        showButton = <Aux>
          <button className="harvectBoxButton harvectBoxButton1"
            onClick={this.stakeHandler}>
            STAKE
          </button>
          <div className="harvectBoxButton harvectBoxButton2">
            <img
              src={require("../../assets/images/plus.png")}
              alt="plus" />
          </div>
        </Aux>
      }
    }
    else {
      showButton = <button className="harvectBoxButton harvectBoxButton1"
        onClick={this.approveHandler}>
        APPROVE
        </button>
    }
    return (
      <div className="home harvect">
        <Header />
        <div>
          <div className="size">
            <div className="harvectContainer">
              <img
                src={require("../../assets/images/header/headerBg.png")}
                className="harvectLogo"
                alt="harvectImage"
              />
              <p className="harvectTitle">
                Lorem ipsum <span className="harvectTitleSpan">dolor sit.</span>
              </p>
              <p className="harvectInfo">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                nonumy eirmod tempor invidunt ut.
                            </p>
              <div className="harvectBlock">
                <div className="harvectBox">
                  <div className="harvectBoxLeft">
                    <div className="harvectBoxLeftLine">
                      <p>ILLUSTRATION</p>
                    </div>
                  </div>
                  <div className="harvectBoxRight">
                    <div>
                      <p className="harvectBoxRightCount">{this.props.pendingMfrm}</p>
                      <p className="harvectBoxRightInfo">MEME earned</p>
                    </div>
                    <button className={harvestBtnClasses.join(' ')}
                      disabled={!Number(this.props.pendingMfrm)}
                      onClick={this.onHarvestHandler}>HARVEST</button>
                  </div>
                </div>
                <div className="harvectBox harvectBlockRight">
                  <div className="harvectBoxLeft">
                    <div className="harvectBoxLeftLine">
                      <p>ILLUSTRATION</p>
                    </div>
                  </div>
                  <div className="harvectBoxRight">
                    <div>
                      <p className="harvectBoxRightCount">{Number(this.state.poolAmount) ?
                        this.state.showPoolAmount : this.state.showLPTokenBalance}</p>
                      <p className="harvectBoxRightInfo">MEME earned</p>
                    </div>
                    <div className="harvectBoxButtonBox">
                      {showButton}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    boxInfo: state.balanceInfo.boxInfo,
    pendingMfrm: (state.balanceInfo.pendingMfrm / Math.pow(10,18)).toFixed(3)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    pendingMfrmBalance: (data) => dispatch({ type: actionTypes.PENDING_MFRM, payload: data }),
    onStoreMemeBalance: (data) => dispatch({ type: actionTypes.MEME_BALANCE, payload: data }),
    onStoreSupplyBalance: (data) => dispatch({ type: actionTypes.SUPPLY_BALANCE, payload: data }),
    onStoreHarvestBalance: (data) => dispatch({ type: actionTypes.HARVEST_BALANCE, payload: data }),
    onStoreTotalRewards: (data) => dispatch({ type: actionTypes.TOTAL_REWARDS, payload: data }),
    onStoreBoxInfo: (data) => dispatch({ type: actionTypes.BOX_INFO, payload: data })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Harvest);