import React from 'react';
import {Switch,Route,Redirect} from "react-router-dom";
import Login from "./components/login";
import logo from './logo.svg';
import './App.css';
import Create from './components/create';
import Story from './components/addstory';
import Showstory from './components/showstory';
import Storyid from './components/storyid';


function App() {
  return (
    <React.Fragment>
      
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/create" component={Create}/>
      <Route path="/addstory" component={Story}/>
      <Route path="/allstory" component={Showstory}/>
      <Route path="/storyid/:id" component={Storyid}/>
      <Redirect from="/" to="/login" exact />
    </Switch>
    </React.Fragment>
  );
}

export default App;
