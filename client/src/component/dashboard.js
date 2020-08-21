import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux'
import {resetCurrentUser, addError} from '../action/action';

class Dashboard extends React.Component{
    componentWillUnmount(){
        this.props.resetCurrentUser();
    };
    logout = () => {
        axios.get('authentication/logout').then(()=> {
            this.props.history.push('/login');
        })
    }
    componentDidMount(){
        axios.get('/authentication/dashboard/' + this.props.user).catch(err => {
                this.props.addError({msg : 'you must login first in order to access'});
                this.props.history.push('/login');
        })
    }
    render(){
        // console.log(this.props)
        return(
            <div>
                <p>Hello {this.props.user}</p>
                <button onClick={this.logout}>logout</button>
            </div>
            
        )
    };
}
const mapStateToProps = (state, prevProps) => {
    return{
        user : state.currentlyLogin
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        resetCurrentUser : () => dispatch(resetCurrentUser()),
        addError : (data) => dispatch(addError(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)