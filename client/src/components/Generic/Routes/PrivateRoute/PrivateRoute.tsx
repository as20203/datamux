import React, { ReactNode, FC, useContext, useEffect, useState } from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import { StaticContext } from 'react-router';
import { authContext } from 'services/auth';
import axios from 'axios';
import history from 'MyHistory';
interface PrivateRouteProps {
  component: FC<
    RouteComponentProps<
      {
        [x: string]: string | undefined;
      },
      StaticContext,
      unknown
    >
  >;
  path: string;
}
const PrivateRoute: FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
  const [, dispatch] = useContext(authContext);
  const [authRoute, setAuthRuote] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const token = localStorage.getItem('Token');
        if (token) {
          const verifyToken = await axios.post('/api/verify-token');
          if (verifyToken) {
            dispatch({ type: 'authenticated', user: verifyToken.data.user, value: true });
            setAuthRuote(true);
            const currentPath = history.location.pathname;
            if (currentPath === '/') {
              history.push('/dashboard');
            } else {
              history.push(currentPath);
            }
          }
        } else {
          dispatch({ type: 'notauthenticated', user: null, value: false });
          localStorage.clear();
          sessionStorage.clear();
          history.push('/');
        }
      } catch (error) {
        dispatch({ type: 'notauthenticated', user: null, value: false });
        localStorage.clear();
        sessionStorage.clear();
        history.push('/');
      }
    };
    checkAuthentication();
  }, [dispatch]);

  return <Route {...rest} render={props => (authRoute ? <Component {...props} /> : null)} />;
};

export { PrivateRoute };
