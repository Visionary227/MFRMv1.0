import React, { Component } from "react";
import { connect } from "react-redux";
import Footer from "../../components/footer";
import Header from "../../components/header";
import StakeBox from "../../components/stakeBox";
import PopUp from "../../components/popUp";
import ModalQR from "../../components/modalQR";
import importScript from "../../utilities/importScript";
import removeScript from "../../utilities/removeScript";
import * as actionTypes from "../../redux/action";
import * as utils from "../../mfrmscript";
import "./style.css";

class Stake extends Component {
    state = {
        showPopUp: false,
        showModal: false,
        addressData: [],
    };

    select = (id) => {
        if (this.props.boxInfo) {
            utils.pendingMfrm(id).then(resp => {
                this.props.pendingMfrmBalance(resp);
                this.props.history.push({
                    pathname: '/harvest',
                    search: `?id=${id}`
                })
            })
        }
    };
    componentDidMount () {
        importScript("../../mfrmscript.js");
        this.getAddressData();
    }
    componentWillUnmount () {
        removeScript("./../mfrmscript.js");
    }

    getAddressData = () => {
        utils.getAddressInfo().then(resp => {
            this.setState((state, props) => ({ addressData: resp.address }));
        });
    };
    openPopupHandler = () => {
        this.setState({ showPopUp: !this.state.showPopUp });
    };
    openModalHandler = () => {
        this.setState({ showModal: !this.state.showModal });
    };
    connectToWeb3Handler = () => {
        utils.connectToWeb3().then((res) => {
            if (res.length) {
                let memeBalance, supplyBalance, harvestBalance, totalRewards, addressInfo;
                [memeBalance, supplyBalance, harvestBalance, totalRewards, addressInfo] = [
                    (res[0]/Math.pow(10,18)).toFixed(3),
                    (res[1]/Math.pow(10,18)).toFixed(3),
                    (res[2]/Math.pow(10,18)).toFixed(3),
                    (res[3]/Math.pow(10,18)).toFixed(3),
                    res[4],
                ];
                this.props.onStoreBoxInfo(true);
                this.props.onStoreMemeBalance(memeBalance);
                this.props.onStoreSupplyBalance(supplyBalance);
                this.props.onStoreHarvestBalance(harvestBalance);
                this.props.onStoreTotalRewards(totalRewards);
                this.props.onStoreAddressInfo(addressInfo);
                this.setState((state, props) => ({ addressData: addressInfo.address}));
            }
        });
    };
    render () {
        let stakeBoxData = Boolean(this.props.boxInfo && this.props.addressData) ? (
            <div className="size">
                <div className="stakeContainer">
                    {this.props.addressData.map((item) => (
                        <StakeBox
                            key={item.pid}
                            select={() => this.select(item.pid)}
                            pool={item.pool}
                            title={item.pair}
                            apy={item.apy}
                            icon={item.icon}
                        />
                    ))}
                </div>
            </div>
        ) : (
                <div className="unlockBtnWrapper">
                    <div className="btn unlockBtn" onClick={() => this.openPopupHandler()}>
                        <img
                            src={require("../../assets/images/header/btn.png")}
                            className="logobtn"
                            alt="wallet_icon"
                        />
                        <p>Unlock wallet</p>
                    </div>
                </div>
            );
        return (
            <div className="stake home">
                <Header openPopUp={this.openPopupHandler} />
                <div>
                    {stakeBoxData}
                </div>
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
        boxInfo: state.balanceInfo.boxInfo,
        pendingMfrm: state.balanceInfo.pendingMfrm,
        addressData: state.balanceInfo.addressData.address,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        pendingMfrmBalance: (data) =>
            dispatch({ type: actionTypes.PENDING_MFRM, payload: Number(data).toFixed(3) }),
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
        onStoreAddressInfo: (data) =>
            dispatch({ type: actionTypes.ADDRESSES, payload: data }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Stake);
