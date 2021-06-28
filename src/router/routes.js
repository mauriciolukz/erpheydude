import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from '../modules/components/login/Login';
import Home from '../modules/components/account/Home';
import MasterPage from '../modules/components/account/MasterPage';
import { history } from '../helpers';
import { PrivateRoute } from './privateRoute';

function Routes() {
    return (
        <Router history={history}>
            <Switch>
                <Route path="/MasterPage" component={MasterPage} />
                <PrivateRoute exact path="/home" component={Home} />
                <Route path="/" component={Login} />
                <Redirect from="*" to="/" />
            </Switch>
        </Router>
    );
}

export default Routes;