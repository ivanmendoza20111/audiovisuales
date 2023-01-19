import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { isAuthenticated } from '@/utils/jwtUtil';

const PrivateRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Layout>
          <Component {...props} />
        </Layout>
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.any,
  layout: PropTypes.any,
  location: PropTypes.any,
};

export default PrivateRoute;
