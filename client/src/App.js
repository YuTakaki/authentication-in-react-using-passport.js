import React, {Suspense, lazy} from 'react';
import './App.css';
import axios from 'axios'
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {allData} from './action/action';

const Home = lazy(() => import('./component/home'));
const Login = lazy(() => import('./component/login'));
const Signup = lazy(()=> import('./component/signup'));
const Dashboard = lazy(() => import('./component/dashboard'));

class App extends React.Component {
  componentDidMount(){
    axios.get('/authentication').then((res)=> this.props.allData(res.data));
  };
  render(){
    console.log(this.props.state);
    return (
      <div className="App">
        <Router>
          <Suspense fallback={<div>...Loading</div>}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/dashboard" component={Dashboard} />
            </Switch>
          </Suspense>
        </Router>
      </div>
    );
  }
}
const mapStateToProps = (state, prevProps) => {
  return {
    state
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    allData : (data) => dispatch(allData(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
