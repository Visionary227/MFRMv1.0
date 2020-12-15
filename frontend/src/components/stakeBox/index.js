import React from "react";
import './style.css';

export default function StakeBox (props) {
    return (
        <div className='stakeBox'>
            <div className='stakeBoxLeft'>
                <div className='stakeBoxLeftBlock'>
                    <p>ILLUSTRATION</p>
                </div>
            </div>
            <div className='stakeBoxRight'>
                <p className='stakeBoxRightTitle'>Lorem ipsum dolor sit.</p>
                <p className='stakeBoxRightText'>{props.title}</p>
                <div className='stakeBoxRightInput'>
                    <p>APY</p>
                    <p>241.89%</p>
                </div>
                <div className='stakeBoxRightButton' onClick={props.select}>
                    <p style={{ fontFamily: 'SegoeBold' }}>SELECT</p>
                </div>
            </div>
        </div>
    )
}

