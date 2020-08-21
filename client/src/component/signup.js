import React from 'react';
import '../styles/css/loginSignup.css';
import {Link} from 'react-router-dom';
import Logo from '../component/logo';
import axios from 'axios';
import {connect} from 'react-redux';
import {addError, resetError, delError} from '../action/action';

class Signup extends React.Component {
    componentWillUnmount(){
        this.props.resetError();
    }
    preventDefault = (e) => {
        e.preventDefault();
        const username = document.querySelector('#username').value;
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;
        const retryPassword = document.querySelector('#retryPassword').value;

        axios.post('/authentication/register', {
            username,
            email,
            password,
            retryPassword
        })
            .then((res) => {
                if(res.data === true){
                    this.props.history.push('/login');
                }else{
                    this.props.addError(res.data);
                }
            })
            .catch((err) => console.log(err));
    }
    delError = (e) => {
        const err = e.target.previousSibling.textContent;
        this.props.delError(err);
        
    }
    render(){
        console.log(this.props);
        const errors = this.props.error.map(err => (
            <div key={err.id}>
                <p>{err.msg}</p>
                <button onClick={this.delError}>delete</button>
            </div>
        ))
        return(
            <main className='main'>
                <div className='form'>
                    <h1>Login</h1>
                    {errors}
                    <form onSubmit={this.preventDefault}>
                        <input type='text' id='username' placeholder='Username' required/>
                        <input type='text' id='email' placeholder='email' required/>
                        <input type='password' id='password' placeholder='Password' required/>
                        <input type='password' id='retryPassword' placeholder='Retry Password' required/>
                        <input type='submit' value='Log-in'/>
                    </form>
                    <p>Already have an accout? <Link to='/login'>log-in</Link></p>
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
      addError : (data) => dispatch(addError(data)),
      resetError : () => dispatch(resetError()),
      delError : (err) => dispatch(delError(err)) 
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Signup)