import {
  FILTER_WORKSPACES,
  OPEN_DRAWER,
  CLOSE_DRAWER,
  ENABLE_DARK_MODE,
  DISABLE_DARK_MODE,
  LOAD_WORKSPACES_DATA,
} from './actions';

const reducer = (state, action) => {
  switch (action.type) {
    case FILTER_WORKSPACES: {
      if (action.payload === 'all') {
        return { ...state, filter: action.payload, filteredWorkspaces: state.workspaces };
      }

      const filteredWorkspaces = state.workspaces.filter(
        (workspace) => workspace.status === action.payload
      );

      return { ...state, filter: action.payload, filteredWorkspaces };
    }
    case OPEN_DRAWER: {
      return { ...state, isDrawerOpen: true };
    }
    case CLOSE_DRAWER: {
      return { ...state, isDrawerOpen: false };
    }

    case LOAD_WORKSPACES_DATA: {
      return { ...action.payload };
    }
    case ENABLE_DARK_MODE: {
      return { ...state, theme: 'dark' };
    }
    case DISABLE_DARK_MODE: {
      return { ...state, theme: 'light' };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
