import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from '../modules/components/login/Login';
import Home from '../modules/components/account/Home';
import { history } from '../helpers';
import { PrivateRoute } from './privateRoute';

function Routes() {
    return (
        <Router history={history}>
            <Switch>
                <PrivateRoute exact path="/account/home" component={Home} />
                <Route path="/" component={Login} />
                <Redirect from="*" to="/" />
            </Switch>
        </Router>
    );
}

export default Routes;