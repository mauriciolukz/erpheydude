import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from '../modules/components/login/Login';
import { history } from '../helpers';

function Routes() {
    return (
        <Router history={history}>
            <Switch>
                <Route path="/" component={Login} />
                <Redirect from="*" to="/" />
            </Switch>
        </Router>
    );
}

export default Routes;