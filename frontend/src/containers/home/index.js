import React, { Component } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import PopUp from "../../components/popUp";
import ModalQR from "../../components/modalQR";
import { connect } from "react-redux";
import * as actionTypes from "../../redux/action";
import importScript from "../../utilities/importScript";
import removeScript from "../../utilities/removeScript";
import * as utils from "../../mfrmscript";
import "./style.css";

class Home extends Component {
  state = {
    showPopUp: false,
    showModal: false,
  };
  componentDidMount () {
    importScript("../../mfrmscript.js");
  }
  componentWillUnmount () {
    removeScript("./../mfrmscript.js");
  }
  openPopupHandler = () => {
    this.setState({ showPopUp: !this.state.showPopUp });
  };
  openModalHandler = () => {
    this.setState({ showModal: !this.state.showModal });
  };
  connectToWeb3Handler = () => {
    utils.connectToWeb3().then((res) => {
      if (res.length) {
        let memeBalance, supplyBalance, harvestBalance, totalRewards;
        [memeBalance, supplyBalance, harvestBalance, totalRewards] = [
          Number(res[0]).toFixed(3),
          Number(res[1]).toFixed(3),
          Number(res[2]).toFixed(3),
          res[3],
        ];
        this.props.onStoreBoxInfo(true);
        this.props.onStoreMemeBalance(memeBalance);
        this.props.onStoreSupplyBalance(supplyBalance);
        this.props.onStoreHarvestBalance(harvestBalance);
        this.props.onStoreTotalRewards(totalRewards);
      }
    });
  };
  render () {
    return (
      <div className="home">
        <Header
          classStyle={"home"}
          openPopUp={this.openPopupHandler}
          boxInfo={this.props.boxInfo}
          memeBalance={this.props.memeBalance}
          supplyBalance={this.props.supplyBalance}
          harvestBalance={this.props.harvestBalance}
          totalRewards={this.props.totalRewards}
        />
        {this.state.showPopUp ? (
          <PopUp
            openPopUp={this.openPopupHandler}
            openModal={this.openModalHandler}
            connectWeb3={this.connectToWeb3Handler}
          />
        ) : null}
        {this.state.showModal ? (
          <ModalQR openModal={this.openModalHandler} />
        ) : null}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    memeBalance: state.balanceInfo.memeBalance,
    supplyBalance: state.balanceInfo.supplyBalance,
    harvestBalance: state.balanceInfo.harvestBalance,
    totalRewards: state.balanceInfo.totalRewards,
    boxInfo: state.balanceInfo.boxInfo,
    userName: state.userInfo.name,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userChange: (data) =>
      dispatch({ type: actionTypes.USER_INFO, payload: data }),
    onStoreMemeBalance: (data) =>
      dispatch({ type: actionTypes.MEME_BALANCE, payload: data }),
    onStoreSupplyBalance: (data) =>
      dispatch({ type: actionTypes.SUPPLY_BALANCE, payload: data }),
    onStoreHarvestBalance: (data) =>
      dispatch({ type: actionTypes.HARVEST_BALANCE, payload: data }),
    onStoreTotalRewards: (data) =>
      dispatch({ type: actionTypes.TOTAL_REWARDS, payload: data }),
    onStoreBoxInfo: (data) =>
      dispatch({ type: actionTypes.BOX_INFO, payload: data }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
