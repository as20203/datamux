import React, { createContext, useReducer } from 'react';

const initialState = { isAuthenticated: false, user: null };

const authReducer = (state, action) => {
  switch (action.type) {
    case 'authenticated':
      return { isAuthenticated: action.value, user: action.user };
    case 'notauthenticated':
      return { isAuthenticated: action.value, user: action.user };
    default:
      return state;
  }
};

const authContext = createContext([initialState, authReducer]);

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return <authContext.Provider value={[state, dispatch]}>{children}</authContext.Provider>;
};

export { AuthContextProvider, authContext };
