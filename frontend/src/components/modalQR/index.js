import React from "react";
import "./style.css";

export default function ModalQR (props) {
    return (
        <div className="popUp" onClick={() => props.openModal()}>
            <div className="modalBlock" onClick={(event) => event.stopPropagation()}>
                <div className="modalBlockTop">
                    <p>
                        Scan to connect <span>your wallet</span>{" "}
                    </p>
                    <img
                        src={require("../../assets/images/popUp/close.png")}
                        onClick={() => props.openModal()}
                        className="popUpClose"
                        alt="close_img"
                    />
                </div>
                <img
                    src={require("../../assets/images/popUp/qr.png")}
                    className="qrImage"
                    alt="QRCODE"
                />
            </div>
        </div>
    );
}
