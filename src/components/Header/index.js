import clsx from 'clsx';
import style from './Header.module.scss';

function Header() {
    return (
        <header>
            <nav className={clsx(style.nav, style.nav__active)}>
                <h1>Header</h1>
            </nav>
        </header>
    );
}

export default Header;
