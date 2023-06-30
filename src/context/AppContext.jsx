import { createContext, useReducer, useEffect } from 'react';

import reducer from '../reducer';

import {LOAD_WORKSPACES_DATA} from '../actions';

import data from '../data.json';

const initialState = {
  workspaces: data,
  filteredWorkspaces: data,
  filter: 'all',
  isDrawerOpen: false,
  isEditingWorkspace: false,
  editWorkspaceID: null,
  theme: 'light'
};

const AppContext = createContext(null);

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (localStorage.getItem('workspaces-app-data')) {
      const appData = JSON.parse(localStorage.getItem('workspaces-app-data'));
      dispatch({ type: LOAD_WORKSPACES_DATA, payload: appData });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('workspaces-app-data', JSON.stringify(state));
  }, [state]);

  return <AppContext.Provider value={{ ...state, dispatch }}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
