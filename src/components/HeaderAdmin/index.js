import { Link } from 'react-router-dom';
import clsx from 'clsx';
import style from './HeaderAdmin.module.scss';
import Logo from '~/img/logo.png';

function Header() {
    return (
        <header id={clsx(style.header)}>
            <div className={clsx(style.logo)}>
                <img src={Logo} alt="logo" />
            </div>
            <nav className={clsx(style.nav)}>
                <ul>
                    <li className={clsx(style.active)}>
                        <Link to="/dashboard/admin">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/staff">Staffs</Link>
                    </li>
                    <li>
                        <Link to="/patient">Patients</Link>
                    </li>
                    <li>
                        <Link to="/medicine">Medicine</Link>
                    </li>
                    <li>
                        <Link to="/equipment">Equipment</Link>
                    </li>
                </ul>
            </nav>
            <div className={clsx(style.user)}>
                <div className={clsx(style.infor)}>
                    <div className={clsx(style.name)}>This is a name</div>
                    <div>Admin</div>
                </div>
                <div className={clsx(style.img)}>
                    <img src={Logo} alt="" />
                    <div className={clsx(style.dropdown)}>
                        <ul>
                            <li>
                                <Link to="/">Log out</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
