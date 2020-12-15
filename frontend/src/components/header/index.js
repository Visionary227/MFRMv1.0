import React from "react";
import "./style.css";
import { NavLink } from "react-router-dom";

export default function Header (props) {
  return (
    <div className="header">
      <div className="size">
        <div className="headerSize">
          <div className="headerLeft">
            <NavLink to="/home" className="headerLeftBlock">
              <img
                src={require("../../assets/images/header/icon1.png")}
                className="headerIcons"
                alt="home_icon"
              />
              <p className="headerLeftInfo">HOME</p>
            </NavLink>
            <NavLink to="/stake" className="headerLeftBlock">
              <img
                src={require("../../assets/images/header/icon2_1.png")}
                className="headerIcons"
                alt="stake_icon"
              />
              <p className="headerLeftInfo">STAKE</p>
            </NavLink>
            <NavLink to="/about" className="headerLeftBlock">
              <img
                src={require("../../assets/images/header/icon3_1.png")}
                className="headerIcons"
                alt="about_icon"
              />
              <p className="headerLeftInfo">ABOUT</p>
            </NavLink>
          </div>
          <img
            src={require("../../assets/images/header/logo.png")}
            className="logo"
            alt="meme_farm_logo"
          />
          <div className="btn headerBtn" onClick={() => props.openPopUp()}>
            <img
              src={require("../../assets/images/header/btn.png")}
              className="logobtn"
              alt="wallet_icon"
            />
            <p>My wallet</p>
          </div>
        </div>
        {props.classStyle === "home" ? (
          <div className="headerForHome">
            <div className="headerForHomeBox">
              <div className="headerForHomeBoxBlock">
                <h2>
                  Lorem ipsum dolor sit amet, consetetur{" "}
                  <span style={{ color: "#F5BC49" }}>sadipscing elitr</span> ,
                                         sed.
                                </h2>
                <div className="headerLine"></div>
                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr</p>
              </div>
              <img
                src={require("../../assets/images/header/headerBg.png")}
                className="headerBg"
                alt="headerBg_img"/>
              <div className="headerForHomeBoxBlock"></div>
            </div>
            <div>
              <div className="headerForHomePosition">
                <div className="headerForHomePositionBlock">
                  <div className="headerForHomePositionBlockTop">
                    <p className="headerForHomePositionBlockTopTitle">
                      YOUR MEME{" "}
                      <span style={{ color: "#323234", fontFamily: "SegoeBold" }}>
                        BALANCE
                      </span>{" "}
                    </p>
                    <div className="headerPriceBox">
                      <p className="headerPriceBoxInfo">${props.memeBalance}</p>
                    </div>
                  </div>
                  <div className="headerForHomePositionBlockBottom">
                    {props.boxInfo ? (
                      <>
                        <p style={{ color: "#A7A4AB" }}>Pending Harvest</p>
                        <p style={{ color: "#FFF" }}>
                          {props.harvestBalance} MEME
                        </p>{" "}
                      </>
                    ) : (
                        <>
                          <div>
                            <div className="headerLockBlock">
                              <img
                                src={require("../../assets/images/header/lock.png")}
                                className="lockIcon"
                                alt="lock_icon"
                              />
                              <p>LOCKED</p>
                            </div>
                            <p className="toUnlockItPleaseAddYouWallet">
                              To unlock it please add you wallet
                          </p>
                            <div className="headerLockBlockBtn"
                              onClick={() => props.openPopUp()}
                            >
                              <img
                                alt="lockBlockBtn"
                                src={require("../../assets/images/header/btn2.png")}
                                className="lockBlockBtnIcon"
                              />
                              <p>Unlock wallet</p>
                            </div>
                          </div>
                        </>
                      )}
                  </div>
                </div>
                <div className="headerForHomePositionBlock headerForHomePositionBlock2">
                  <div className="headerForHomePositionBlockTop">
                    <p className="headerForHomePositionBlockTopTitle">
                      YOUR SUPPLY{" "}
                      <span
                        style={{ color: "#323234", fontFamily: "SegoeBold" }}
                      >
                        BALANCE
                      </span>{" "}
                    </p>
                    <div className="headerPriceBox">
                      <p className="headerPriceBoxInfo">
                        ${props.supplyBalance}
                      </p>
                    </div>
                  </div>
                  <div className="headerForHomePositionBlockBottom">
                    {props.boxInfo ? (
                      <>
                        <p style={{ color: "#A7A4AB" }}>
                          New rewards per block
                        </p>
                        <p style={{ color: "#FFF" }}>
                          {props.totalRewards} MEME
                        </p>
                      </>
                    ) : (
                        <>
                          <div>
                            <div className="headerLockBlock">
                              <img
                                src={require("../../assets/images/header/lock.png")}
                                className="lockIcon"
                                alt="lock_icon"
                              />
                              <p>LOCKED</p>
                            </div>
                            <p className="toUnlockItPleaseAddYouWallet">
                              To unlock it please add you wallet
                          </p>
                            <div
                              className="headerLockBlockBtn"
                              onClick={() => props.openPopUp()}
                            >
                              <img
                                src={require("../../assets/images/header/btn2.png")}
                                className="lockBlockBtnIcon"
                                alt="wallet_icon"
                              />
                              <p>Unlock wallet</p>
                            </div>
                          </div>
                        </>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}