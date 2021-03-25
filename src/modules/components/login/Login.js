import React from 'react'
import { useSelector } from 'react-redux';

export default function Login(props) {

    const data = useSelector(state => {
        console.log(state);
    });

    return (
        <div>
            hola.
            <button type="button" class="btn btn-primary">Primarymmmmmm</button>
        </div>
    )
}

