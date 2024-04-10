import style from './Layout.module.scss';
import HeaderAdmin from '../HeaderAdmin';
import HeaderStaff from '../HeaderStaff';

function Header() {
    if (localStorage.getItem('auth') === 'staff') {
        return <HeaderStaff />;
    }
    if (localStorage.getItem('auth') === 'admin') {
        return <HeaderAdmin />;
    }
}

function Layout({ children }) {
    return (
        <div>
            <Header />
            <main>{children}</main>
        </div>
    );
}

export default Layout;
