import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import style from './Login.module.scss';
import logo from 'src/img/logoLogin.png';
import { database } from '~/firebase';
import { collection, getDocs } from 'firebase/firestore';

function Login() {
    const loginRef = useRef(null);
    const Username = useRef(null);
    const Password = useRef(null);
    const navigate = useNavigate();

    async function checkAuth(username, password) {
        let cnt = 0;

        while (true) {
            if (cnt > 10) {
                break;
            }
            console.log('running');
            cnt++;
            cnt = cnt + '';
            const querySnapshot = await getDocs(collection(database, 'Accounts', 'admin', cnt));
            querySnapshot.forEach((doc) => {
                if (doc.data().username === username && doc.data().password === password) {
                    localStorage.setItem('auth', 'admin');
                    navigate('/dashboard/admin');
                }
            });

            const querySnapshot2 = await getDocs(collection(database, 'Accounts', 'staff', cnt));
            querySnapshot2.forEach((doc) => {
                if (doc.data().username === username && doc.data().password === password) {
                    localStorage.setItem('auth', 'staff');
                    navigate('/dashboard/staff');
                }
            });
        }
    }

    useEffect(() => {
        loginRef.current.onclick = () => {
            checkAuth(Username.current.value, Password.current.value);
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
                        {/* <a className={clsx(style.forgotPassword)}>Forgot password?</a> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
