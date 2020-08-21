import React from 'react';
import '../styles/css/loginSignup.css';
import {Link} from 'react-router-dom';
import Logo from '../component/logo';
import axios from 'axios';
import {connect} from 'react-redux'
import {currentUser, addError, resetError} from '../action/action';

class Login extends React.Component{
    componentWillUnmount(){
        this.props.resetError();
    }
    preventDefault = (e) => {
        e.preventDefault();
        const username = document.querySelector('input[type=text]').value;
        const password = document.querySelector('input[type=password]').value;
        axios.post('/authentication/login', {
            username,
            password,
        }).then(res => {
            console.log(res.data);
            if(typeof res.data === 'object'){
                this.props.addError(res.data);
            }else{
                this.props.currentUser(res.data);
                this.props.history.push('/dashboard');
            }
            // console.log(typeof res.data);
        })
            .catch(err => console.log(err))
    }
    delError = (e) => {
        this.props.resetError();
    }
    render(){
        const errors = this.props.error.msg !== undefined  ? (
            <div>
                <p>{this.props.error.msg}</p>
                <button onClick={this.delError}>delete</button>
            </div>
        ) : (null)
        console.log(this.props.error);
        return(
            <main className='main'>
                <div className='form'>
                    <h1>Login</h1>
                    {errors}
                    <form method='POST' action='/authentication/login' onSubmit={this.preventDefault}>
                        <input type='text' id='username' placeholder='Username'/>
                        <input type='password' placeholder='Password'/>
                        <input type='submit' value='Log-in'/>
                    </form>
                    <p>Don't have an accout? <Link to='/signup'>register</Link></p>
                </div>
                <Logo />
            </main>
        )
    }
}
const mapStateToProps = (state, prevProps) => {
    return{
        error : state.error
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        currentUser : (data) => dispatch(currentUser(data)),
        addError : (data) => dispatch(addError(data)),
        resetError : () => dispatch(resetError())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);