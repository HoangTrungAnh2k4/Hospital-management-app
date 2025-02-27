import Login from '~/pages/Login';
import DashboardAdmin from '~/pages/Dashboard/DashboardAdmin';
import DashboardStaffs from '~/pages/Dashboard/DashboardStaffs';
import Staffs from '~/pages/Staffs';
import Patients from '~/pages/Patients';
import Information from '~/pages/Patients/Information';
import Equipment from '~/pages/Equipment';
import Medicine from '~/pages/Medicine';
import Blood from '~/pages/Blood';
import CalendarWeek from '~/components/Calendar/CalendarWeek';
import CalendarDay from '~/components/Calendar/CalendarDay';

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
        path: '/patient/information',
        component: Information,
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
        path: '/blood',
        component: Blood,
    },
    {
        path: '/calendar/week',
        component: CalendarWeek,
    },
    {
        path: '/calendar/day',
        component: CalendarDay,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
