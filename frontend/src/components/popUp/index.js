import React from "react";
import "./style.css";

const PopUp = (props) => {

    function openModals (event) {
        if (event === "MetaMask") {
            props.openPopUp();
            props.connectWeb3();
        } else {
            props.openPopUp();
            props.openModal();
        }
    }

    return (
        <div className="popUp" onClick={() => props.openPopUp()}>
            <div className="popUpBlock" onClick={(event) => event.stopPropagation()}>
                <img src={require("../../assets/images/popUp/close.png")}
                    onClick={() => props.openPopUp()} className="popUpClose"
                    alt="close_icon" />
                <h3>
                    select a <span>wallet</span> to connect
                </h3>
                <div className="popUpBlockFlex">
                    <div className="popUpBlockBox">
                        <img
                            src={require("../../assets/images/popUp/img1.png")}
                            className="popUpimg"
                            alt="Metamask"
                        />
                        <p>Metamask</p>
                        <button onClick={() => openModals("MetaMask")}>CONNECT</button>
                    </div>
                    <div className="popUpBlockBox">
                        <img
                            src={require("../../assets/images/popUp/img2.png")}
                            className="popUpimg"
                            alt="WalletConnect"
                        />
                        <p>WalletConnect</p>
                        <button onClick={() => openModals("WalletConnect")}>CONNECT</button>
                    </div>
                    <div className="popUpBlockBox">
                        <img
                            src={require("../../assets/images/popUp/img3.png")}
                            className="popUpimg"
                            alt="Coinbase Wallet"
                        />
                        <p>Coinbase Wallet</p>
                        <button onClick={openModals}>CONNECT</button>
                    </div>
                </div>
                <p className="learnMoreAbout">Learn more about wallets</p>
            </div>
        </div>
    );
};

export default PopUp;
