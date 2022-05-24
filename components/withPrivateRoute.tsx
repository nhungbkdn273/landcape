import React, { FC, useContext, useEffect } from 'react';
import { authContext } from 'context/authContext';
import { useRouter } from 'next/router';

const withPrivateRoute = <Props extends Record<string, unknown>>(
  Component: React.ComponentType<Props>
) => {
  const ComponentWithPrivateRoute: FC<Props> = (props) => {
    const { pathname } = useRouter()
  const { accessToken, setAccessToken } = useContext(authContext);

  /* eslint-disable react-hooks/rules-of-hooks */ 
  if (!accessToken && !pathname.includes("login")) {
    useRedirectToLogin()
  }
    return (
    <Component {...props} setToken={setAccessToken}/>
  )};

  return ComponentWithPrivateRoute
};

const useRedirectToLogin = () => {
  const { push, pathname } = useRouter()

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    push({
      pathname: '/login',
      query: {
        referer: pathname
      }
    });
  }, []);
};

export default withPrivateRoute;
