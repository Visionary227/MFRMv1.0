import React from "react";
import './style.css';
import { NavLink } from "react-router-dom";

export default function Footer() {
    return (
        <div className='footer'>
            <ul className='footerList'>
                <li><NavLink to='/home'>Home</NavLink></li>
                <li><NavLink to='stake'>Stake</NavLink></li>
                <li><NavLink to='/about'>About</NavLink></li>
                <li><NavLink to='/contactUs'>Contact</NavLink></li>
                <li><NavLink to='/termsOfUse'>Terms of Use</NavLink></li>
                <li><NavLink to='/privacyPolicy'>Privacy Policy</NavLink></li>
            </ul>
            <p>© 2020 MEME FARM, All Rights Reserved.</p>
        </div>
    )
}

