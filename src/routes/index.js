import Login from '~/pages/Login';
import DashboardAdmin from '~/pages/Dashboard/DashboardAdmin';
import DashboardStaffs from '~/pages/Dashboard/DashboardStaffs';
import Staffs from '~/pages/Staffs';
import Patients from '~/pages/Patients';
import Equipment from '~/pages/Equipment';
import Medicine from '~/pages/Medicine';

const publicRoutes = [
    {
        path: '/',
        component: Login,
        layout: null,
    },
    {
        path: '/dashboard/admin',
        component: DashboardAdmin,
    },
    {
        path: '/dashboard/staffs',
        component: DashboardStaffs,
    },
    {
        path: '/patients',
        component: Patients,
    },
    {
        path: '/staffs',
        component: Staffs,
    },
    {
        path: '/equipment',
        component: Equipment,
    },
    {
        path: '/medicine',
        component: Medicine,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
