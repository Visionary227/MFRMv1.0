import React from "react";
import './style.css';

export default function HeaderForHome () {
    return (
        <div className='headerForHomeContainer'>
            <div className='size'>
                <div className='headerForHome'>
                    <div className='headerForHomeBox'>
                        <div className='headerForHomeBoxBlock'>
                            <h2>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed.</h2>
                            <div className='headerLine'></div>
                            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed.</p>
                        </div>
                        <img alt='' src={require('../../assets/images/header/headerBg.png')} className='headerBg' />
                        <div className='headerForHomeBoxBlock'></div>
                    </div>
                    <div >
                        <div className="headerForHomePosition">
                            <div className='headerForHomePositionBlock'>
                                <div className='headerForHomePositionBlockTop'>
                                    <p className='headerForHomePositionBlockTopTitle'>YOUR FMRM <span style={{ color: "#323234" }}>BALANCE</span> </p>
                                    <div className='headerPriceBox'>
                                        <p className='headerPriceBoxInfo'>$0.000</p>
                                    </div>
                                </div>
                                <div className='headerForHomePositionBlockBottom'>
                                    <p style={{ color: '#A7A4AB' }}>Pending Harvest</p>
                                    <p style={{ color: "#FFF" }}>15.507 MEME</p>
                                </div>
                            </div>
                            <div className='headerForHomePositionBlock headerForHomePositionBlock2'>
                                <div className='headerForHomePositionBlockTop'>
                                    <p className='headerForHomePositionBlockTopTitle'>YOUR SUPPLY <span style={{ color: "#323234" }}>BALANCE</span> </p>
                                    <div className='headerPriceBox'>
                                        <p className='headerPriceBoxInfo'>$0.000</p>
                                    </div>
                                </div>
                                <div className='headerForHomePositionBlockBottom'>
                                    <p style={{ color: '#A7A4AB' }}>New rewards per block</p>
                                    <p style={{ color: "#FFF" }}>1,000 MEME</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

