import React from 'react'
import { useSelector } from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser,faLock} from '@fortawesome/free-solid-svg-icons'

export default function Login(props) {

    const data = useSelector(state => {
        console.log(state);
    });

    return (
        <div className="container login mt-5">
            <div className="row shadow border rounded p-5">
                <div className="my-auto col-lg-6 col-md-6 col-sm-12 col-12 text-center">
                    <label className="h3">Heydude ERP <br />For PYME</label>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                    <form name="login-form">
                        <div class="input-group mb-3">
                            <span class="input-group-text"><FontAwesomeIcon icon={faUser}/></span>
                            <input type="text" class="form-control" name="email" placeholder="Email" aria-label="Email" aria-describedby="email" />
                        </div>
                        <div class="input-group mb-3">
                        <span class="input-group-text"><FontAwesomeIcon icon={faLock}/></span>
                            <input type="text" class="form-control" name="password" placeholder="Password" aria-label="Password" aria-describedby="password" />
                        </div>
                        <div className="d-flex justify-content-start mb-3">
                            <button type="button" class="btn btn-danger">Login</button>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 col-md-8 col-7 border-top-0 border-bottom-0 border-right-0 border border-secondary"><a href="/reset">Forgot Your Password?</a></div>
                            <div className="col-lg-4 col-md-4 col-5"><a href="/register">Register</a></div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

