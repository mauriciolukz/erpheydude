import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser,faLock} from '@fortawesome/free-solid-svg-icons';
import { history } from '../../../helpers';
import { userActions ,alertActions} from '../../../redux/_actions';

export class Login extends Component {

    constructor(props) {
        super(props)

        this.props.logout();

        history.listen((location, action) => {
            this.props.clearAlerts();
        });
    
        this.state = {email:'',password:'',submitted: false}

        this.handleLogin = this.handleLogin.bind(this);
        this.handleOnchange = this.handleOnchange.bind(this);
    }

    handleLogin(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { email, password } = this.state;

        if (email && password) {
            this.props.login(email, password);
        }
    }

    handleOnchange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    render() {

        const {alert } = this.props;
        const { email, password, submitted } = this.state;

        if (submitted)
                return <div class="row d-flex justify-content-center mt-5"><div class="spinner-border text-danger row col-12" role="status"><span class="visually-hidden">Loading...</span></div></div>

        return (
            <div className="container login mt-5">
                <div className="row shadow border rounded p-5">
                    <div className="my-auto col-lg-6 col-md-6 col-sm-12 col-12 text-center">
                        <label className="h3">Heydude ERP <br />For PYME</label>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                        { 
                            alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <form name="login-form needs-validation" onSubmit={this.handleLogin} novalidate>
                            {submitted && !email &&
                                <div className="help-block text-danger">* Email is required</div>
                            }
                            <div className="input-group mb-3">
                                <span className="input-group-text"><FontAwesomeIcon icon={faUser}/></span>
                                <input type="text" className={'form-control' + (submitted && !email ? ' border border-danger' : '')} name="email" placeholder="Email" aria-label="Email" aria-describedby="email" value={email} onChange={this.handleOnchange} required/>
                            </div>
                            {submitted && !password &&
                                <div className="help-block text-danger">* Password is required</div>
                            }
                            <div className="input-group mb-3">
                                <span className="input-group-text"><FontAwesomeIcon icon={faLock}/></span>
                                <input type="text" className={'form-control' + (submitted && !password ? ' border border-danger' : '')} name="password" placeholder="Password" aria-label="Password" aria-describedby="password" value={password} onChange={this.handleOnchange} required/>
                            </div>
                            <div className="d-flex justify-content-start mb-3">
                                <button className="btn btn-danger" type="submit">Login</button>
                            </div>
                            <div className="row">
                                <div className="col-lg-6 col-md-8 col-7 border-top-0 border-bottom-0 border-right-0 border border-secondary"><Link to="/reset">Forgot Your Password?</Link></div>
                                <div className="col-lg-4 col-md-4 col-5"><Link to="/register">Register</Link></div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { alert } = state;
    return { alert };
}

const mapDispatchToProps = {
    login: userActions.login,
    logout: userActions.logout,
    clearAlerts: alertActions.clear
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

