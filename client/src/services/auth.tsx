import React, { createContext, useReducer, FC, Dispatch } from 'react';
interface AuthContext {
  isAuthenticated: boolean;
  user: Record<string, string> | null;
}

interface AuthContextAction {
  type: 'authenticated' | 'notauthenticated';
  value: boolean;
  user: Record<string, string> | null;
}

const initialState: AuthContext = { isAuthenticated: false, user: null };

const authReducer = (state: AuthContext, action: AuthContextAction) => {
  switch (action.type) {
    case 'authenticated':
      return { isAuthenticated: action.value, user: action.user };
    case 'notauthenticated':
      return { isAuthenticated: action.value, user: action.user };
    default:
      return state;
  }
};

const authContext = createContext<[AuthContext, Dispatch<AuthContextAction>]>([
  initialState,
  () => null
]);

const AuthContextProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return <authContext.Provider value={[state, dispatch]}>{children}</authContext.Provider>;
};

export { AuthContextProvider, authContext };
