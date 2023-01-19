import { isAuthenticated } from '@/utils/jwtUtil';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

const RestrictRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Redirect
          to={{
            pathname: '/',
            state: { from: props.location },
          }}
        />
      ) : (
        <Layout>
          <Component {...props} />
        </Layout>
      )
    }
  />
);

RestrictRoute.propTypes = {
  component: PropTypes.any,
  layout: PropTypes.any,
  location: PropTypes.any,
};

export default RestrictRoute;
