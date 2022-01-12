import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Dashboard from '../pages/Dashboard';
import Settings from '../pages/Settings';
import Customers from '../pages/Customers';

export default function Router() {
  return (
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route exact path="/register" component={SignUp} />

      <Route exact path="/dashboard" component={Dashboard} isPrivate />
      <Route exact path="/settings" component={Settings} isPrivate />
      <Route exact path="/customers" component={Customers} isPrivate />
    </Switch>
  )
}