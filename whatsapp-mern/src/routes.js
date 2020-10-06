import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Main from './components/Main'
import SignUp from './components/SignUp'
import UserDetails from './components/UserDetails'

export default () => {
    return (
        <Switch>
            <Route path="/signup" exact component={SignUp} />
            <Route path="/" exact component={Main} />
            <Route path="/info" exact component={UserDetails} />
        </Switch>
    )
}