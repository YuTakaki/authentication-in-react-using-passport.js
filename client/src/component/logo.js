import React from 'react';
import logo from '../public/logo.png';
import '../styles/css/home.css';

const Logo = () => {
    return(
        <div className='backgroundHeader'>
            <img src={logo} />
        </div>
    )
}
export default Logo;