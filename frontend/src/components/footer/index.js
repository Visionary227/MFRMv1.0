import React from "react";
import './style.css';
import { NavLink } from "react-router-dom";

export default function Footer() {
    return (
        <div className='footer'>
            <ul className='footerList'>
                <li><NavLink to='/home'>Home</NavLink></li>
                <li><NavLink to='stake'>Farm</NavLink></li>
                <li><a href="https://medium.com/@Go_APEcoin/memefarm-io-introduces-nft-dao-996aadd6d805">About</a></li>
                <li><a href="https://medium.com/@Go_APEcoin/memefarm-io-introduces-nft-dao-996aadd6d805">Github</a></li>
                <li><a href="https://twitter.com/Go_MemeFarm">Twitter</a></li>
                <li><a href="https://medium.com/@Go_APEcoin">Medium</a></li>
                <li><a href="https://apecoin.dev/">Powered by APECoin</a></li>
            </ul>
            <p>© 2020 MEME FARM, All Rights Reserved.</p>
        </div>
    )
}

