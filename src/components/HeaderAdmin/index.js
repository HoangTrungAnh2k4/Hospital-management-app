import { Link } from 'react-router-dom';
import clsx from 'clsx';
import style from './HeaderAdmin.module.scss';
import Logo from '~/img/logo.png';
import { useEffect } from 'react';

function Header() {
    useEffect(() => {
        const navItems = document.querySelectorAll(`.${style.nav} ul li`);
        console.log();
        navItems.forEach((item) => {
            item.addEventListener('click', () => {
                navItems.forEach((item) => {
                    item.classList.remove(style.active);
                });
                item.classList.add(style.active);
            });
        });
    }, []);

    function handleLogout() {
        localStorage.removeItem('auth');
        localStorage.removeItem('name');
        window.location.href = '/';
    }

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
                        <Link to="/staff">Nhân viên</Link>
                    </li>
                    <li>
                        <Link to="/patient">Bệnh nhân</Link>
                    </li>
                    <li>
                        <Link to="/medicine">Kho thuốc</Link>
                    </li>
                    <li>
                        <Link to="/equipment">Thiết bị</Link>
                    </li>
                    <li>
                        <Link to="/blood">Kho máu</Link>
                    </li>
                </ul>
            </nav>
            <div className={clsx(style.user)}>
                <div className={clsx(style.infor)}>
                    {/* <div className={clsx(style.name)}>This is a name</div> */}
                    <div>Admin</div>
                </div>
                <div className={clsx(style.img)}>
                    <div className={clsx(style.img)}>
                        <i class="fa-solid fa-user-large"></i>
                    </div>
                    <div className={clsx(style.dropdown)}>
                        <ul>
                            <li>
                                <Link onClick={handleLogout}>Đăng xuất</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
