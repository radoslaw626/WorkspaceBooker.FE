import { createContext, useReducer, useEffect } from 'react';

import reducer from '../reducer';
import axios from 'axios';

import {LOAD_WORKSPACES_DATA} from '../actions';

import data from '../data.json';



const initialState = {
  workspaces: [],
  filteredWorkspaces: [],
  filter: 'all',
  isDrawerOpen: false,
  isEditingWorkspace: false,
  editWorkspaceID: null,
  theme: 'light'
};

const AppContext = createContext(null);

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchWorkspaces = async () => {
    try {
      const res = await axios.get('https://workspacebooker.azurewebsites.net/api/workspaces/home');
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchWorkspaces().then((data) => {
      dispatch({ type: LOAD_WORKSPACES_DATA, payload: data });
    })
  }, []);


  // useEffect(() => {
  //   if (localStorage.getItem('workspaces-app-data')) {
  //     const appData = JSON.parse(localStorage.getItem('workspaces-app-data'));
  //     dispatch({ type: LOAD_WORKSPACES_DATA, payload: appData });
  //   }
  // }, []);

  useEffect(() => {
    localStorage.setItem('workspaces-app-data', JSON.stringify(state));
  }, [state]);

  return <AppContext.Provider value={{ ...state, dispatch }}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
