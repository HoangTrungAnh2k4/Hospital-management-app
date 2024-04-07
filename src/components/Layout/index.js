import style from './Layout.module.scss';
import HeaderAdmin from '../HeaderAdmin';
import HeaderStaff from '../HeaderStaff';

function Header() {
    if (localStorage.getItem('role') === 'user') {
        return <HeaderStaff />;
    } else {
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
