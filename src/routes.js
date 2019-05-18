import React from 'react';
import {Switch, Route} from 'react-router-dom';

//Custom import
import Auth from './Components/Auth/Auth';
import Dashboard from './Components/Dashboard/Dashboard';
import Form from './Components/Form/Form';
import PostPage from './Components/PostPage/PostPage';

export default (
    <Switch>
        <Route exact path='/' component={Auth} />
        <Route path='/dashboard' component={Dashboard} /> 
        <Route path='/post/:postid' component={PostPage} />
        <Route path='/new' component={Form} />
    </Switch>
)