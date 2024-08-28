import Dashboard from '../pages/Dashboard';
import Supervisor from '../pages/Supervisor';
import Members from '../pages/Members';
import Projects from '../pages/Projects';
import Meetings from '../pages/Meetings';
import Profile from '../pages/Profile';
import Login from '../pages/Login';

const routes = [
  {
    path: '/',
    component: Login,
    layout: false,
  },
  {
    path: '/dashboard',
    component: Dashboard,
    layout: true,
  },
  {
    path: '/supervisor',
    component: Supervisor,
    layout: true,
  },
  {
    path: '/members',
    component: Members,
    layout: true,
  },
  {
    path: '/projects',
    component: Projects,
    layout: true,
  },
  {
    path: '/meetings',
    component: Meetings,
    layout: true,
  },
  {
    path: '/profile',
    component: Profile,
    layout: true,
  },
];

export default routes;