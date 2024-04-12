import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import style from './Login.module.scss';
import logo from 'src/img/logoLogin.png';

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
            <div className={clsx(style.subwrapper)}>
                <img src={logo} alt="Logo" className={clsx(style.logo)} />
                <div className={clsx(style.login)}>
                    <h1>Login</h1>
                    <div>
                        <input ref={Username} type="text" placeholder="Username" />
                        <input ref={Password} type="password" placeholder="Password" />

                        <button ref={loginRef} className={clsx(style.btn, 'btn btn-primary btn-block btn-large')}>
                            Login
                        </button>
                        <a className={clsx(style.forgotPassword)}>Forgot password?</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
