import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Home from "../page/home.js";
import NoMatch from "../page/404.js";
import About from "../page/about.js";
import Hot from "../page/hot.js";

class SwitchCom extends React.Component{
    render() {
        console.log(document.getElementById('root')._reactRootContainer);
        return(<Router>
                    <Switch>
                        <Route path="/home" component={ Home } />
                        <Route path="/hot" component={ Hot } />
                        
                        <Route path="/about" component={ About } />
                        <Redirect from="/" to="/home"></Redirect>           
                        <Route component={ NoMatch }></Route>
                    </Switch>
                </Router>) 
    }
};

export default SwitchCom;