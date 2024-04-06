import Login from '~/pages/Login';
import DashboardAdmin from '~/pages/Dashboard/DashboardAdmin';
import DashboardStaffs from '~/pages/Dashboard/DashboardStaffs';
import Staffs from '~/pages/Staffs';
import Patients from '~/pages/Patients';
import Equipment from '~/pages/Equipment';
import Medicine from '~/pages/Medicine';
import Calendar from '~/components/Calendar';

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
        path: '/dashboard/staff',
        component: DashboardStaffs,
    },
    {
        path: '/patient',
        component: Patients,
    },
    {
        path: '/staff',
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
    {
        path: '/calendar',
        component: Calendar,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
