import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import style from './Login.module.scss';
import logo from 'src/img/logo.png';

function Login() {
    const loginRef = useRef(null);
    const Username = useRef(null);
    const Password = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        loginRef.current.onclick = () => {
            if (Username.current.value === 'admin' && Password.current.value === 'admin') {
                localStorage.setItem('auth', 'admin');
                navigate('/dashboard/admin');
            }
            if (Username.current.value === 'staff' && Password.current.value === 'staff') {
                localStorage.setItem('auth', 'staff');
                navigate('/dashboard/staff');
            }
        };
    }, []);

    return (
        <div className={clsx(style.wrapper)}>
            <div className={clsx(style.login)}>
                <h1>Login</h1>
                <div>
                    <input ref={Username} type="text" placeholder="Username" />
                    <input ref={Password} type="password" placeholder="Password" />
                    <button ref={loginRef} class="btn btn-primary btn-block btn-large" className={clsx(style.btn)}>
                        Let me in.
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
