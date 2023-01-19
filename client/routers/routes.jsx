import EmptyLayout from '@/components/common/layout/EmptyLayout';
import MainLayout from '@/components/common/layout/MainLayout';
import PublicLayout from '@/components/common/layout/PublicLayout';
import NotFound from '@/components/error/NotFound';
import Page500 from '@/components/error/Page500';
import LoginContainer from '@/containers/auth/LoginContainer';
import RecoverPass from '@/containers/auth/RecoverPass';
import ResetPassword from '@/containers/auth/ResetPassword';
import ProductsMaintenance from '@/pages/admin/products/ProductsMaintenance';
import ProductTable from '@/pages/admin/products/ProductsTable';
import ReservationTable from '@/pages/admin/reservation-table/ReservationTable';
import ReservationSchedule from '@/pages/admin/reservation/ReservationSchedule';
import UserMaintenance from '@/pages/admin/user/UserMaintenance';
import UserTable from '@/pages/admin/user/UserTable';
import HomePage from '@/pages/public/HomePage';
import PublicRoute from '@/routers/PublicRoute';
import { Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import RestrictRoute from './RestrictRoute';

const Router = () => (
  <Switch>
    {/*  Public */}
    <PublicRoute exact path="/error500" layout={EmptyLayout} component={Page500} />
    <PublicRoute exact path="/RecuperarContraseña" layout={EmptyLayout} component={RecoverPass} />
    <PublicRoute exact path="/ReiniciarContraseña" layout={EmptyLayout} component={ResetPassword} />
    <RestrictRoute exact path="/login" layout={EmptyLayout} component={LoginContainer} />
    <PublicRoute exact path="/" layout={PublicLayout} component={HomePage} />

    {/*  ADMIN */}
    <PrivateRoute exact path="/dashboard" layout={MainLayout} component={ReservationSchedule} />

    <PrivateRoute
      exact
      path="/dashboard/productos/agregar"
      layout={MainLayout}
      component={ProductsMaintenance}
    />
    <PrivateRoute
      exact
      path="/dashboard/productos/editar"
      layout={MainLayout}
      component={ProductsMaintenance}
    />
    <PrivateRoute exact path="/dashboard/productos" layout={MainLayout} component={ProductTable} />

    <PrivateRoute
      exact
      path="/dashboard/usuario/agregar"
      layout={MainLayout}
      component={UserMaintenance}
    />
    <PrivateRoute
      exact
      path="/dashboard/usuario/editar"
      layout={MainLayout}
      component={UserMaintenance}
    />
    <PrivateRoute exact path="/dashboard/usuario" layout={MainLayout} component={UserTable} />

    <PrivateRoute
      exact
      path="/dashboard/reservaciones"
      layout={MainLayout}
      component={ReservationTable}
    />

    <PublicRoute exact path="*" layout={EmptyLayout} component={NotFound} />
  </Switch>
);
export default Router;
