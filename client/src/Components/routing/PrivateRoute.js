import React, { useContext } from 'react';
import AuthContext from '../Context/auth/AuthContext';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthentucated, loading } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={props =>
        !isAuthentucated && !loading ? (
          <Redirect to='/home' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
