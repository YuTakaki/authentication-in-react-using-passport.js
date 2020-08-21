import React from 'react';
import '../styles/css/home.css';
import logo from '../public/logo.png';
import {Link} from 'react-router-dom';

const Home = () => {
    const getStarted = () => {
        const login_signup = document.querySelector('.login_signup');
        login_signup.classList.add('slide');
    }
    return(
        <main className='home'>
            <div className='welcome'>
                <h1>Welcome</h1>
                <p>Duis magna excepteur nostrud mollit nulla aute reprehenderit nisi est magna aliqua esse ea.</p>
                <button className='gettingStarted' onClick={getStarted}>Get Started</button>
            </div>
            <div className='backgroundHeader'>
                <img src={logo} />
                <div className='login_signup'>
                    <Link to='/login'><button className='log-in'>Log-in</button></Link>
                    <Link to='/signup'><button className='sign-up'>Sign-up</button></Link>
                </div>
            </div>
        </main>
    )
}

export default Home;