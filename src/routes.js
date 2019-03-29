import React from 'react';
import {Switch, Route} from 'react-router-dom';

//Custom import
import Auth from './Components/Auth/Auth';
import Dashboard from './Components/Dashboard/Dashboard';

export default (
    <Switch>
        <Route exact path='/' component={Auth} />
        <Route path='/dashboard' component={Dashboard} /> 
    </Switch>
)