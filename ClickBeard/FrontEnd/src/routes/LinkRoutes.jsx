import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Login from '../pages/LoginPage/Login';
import Dashboard from '../pages/dashboardPage/Dashboard';
import Register from '../pages/registerPage/Register';
import CreateAppointment from '../pages/createAppointment/CreateAppointment';
import CreateSpecialties from '../pages/createSpecialties/CreateSpecialties';
import CreateBarbers from '../pages/createBarbers/CreateBarbers';
import AssocBarbSpec from '../pages/assocBarbSpec/AssocBarbSpec';

const LinkRoutes = ()=>{
  const routes = createBrowserRouter(
    [
      {
        path:'/',
        element: <Login />
      },
      {
        path:'/dashboard',
        element: <Dashboard />
      },
      {
        path:'/register',
        element: <Register />
      },
      {
        path:'/createappointment',
        element: <CreateAppointment />
      },
      {
        path:'/createaspecialties',
        element: <CreateSpecialties />
      },
      {
        path:'/createbarbers',
        element: <CreateBarbers />
      },
      {
        path:'/assocbarbspec',
        element: <AssocBarbSpec />
      },
    ]
  );
  return (
    <RouterProvider router={routes} />
  )

}
export default LinkRoutes;