import React from 'react'
import { Switch } from 'react-router-dom'
import Singup from '../pages/Singup/index'
import Sigin from '../pages/Signin/index'
import Router from './Routes'
import Dashboard from '../pages/Dashboard'

const Routes: React.FC = () => (
  <Switch>
    <Router exact path="/" component={Sigin} />
    <Router path="/signup" component={Singup} />
    <Router path="/dashboard" component={Dashboard} isPrivate />
  </Switch>
)

export default Routes
