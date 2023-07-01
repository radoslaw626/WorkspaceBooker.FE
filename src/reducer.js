import {
  FILTER_WORKSPACES,
  OPEN_DRAWER,
  CLOSE_DRAWER,
  ADD_WORKSPACE_BOOKING,
  DELETE_WORKSPACE_BOOKING,
  MARK_WORKSPACE_BOOKED,
  EDIT_WORKSPACE_BOOKING,
  UPDATE_WORKSPACE_BOOKING,
  CANCEL_BOOKING_EDIT,
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
    case ADD_WORKSPACE_BOOKING: {
      const workspaces = [...state.workspaces, action.payload];
      return { ...state, workspaces, filteredWorkspaces: workspaces };
    }
    case DELETE_WORKSPACE_BOOKING: {
      const newWorkspaces = state.workspaces.filter((workspace) => workspace.id !== action.payload);
      return { ...state, newWorkspaces: newWorkspaces, filteredWorkspaces: newWorkspaces };
    }
    case MARK_WORKSPACE_BOOKED: {
      const workspaces = state.workspaces.map((workspace) => {
        if (workspace.id === action.payload) {
          return { ...workspace, status: 'paid' };
        }
        return workspace;
      });
      return { ...state, workspaces, filteredWorkspaces: workspaces };
    }
    case EDIT_WORKSPACE_BOOKING: {
      return {
        ...state,
        isDrawerOpen: true,
        isEditingInvoice: true,
        editWorkspaceID: action.payload
      };
    }
    case UPDATE_WORKSPACE_BOOKING: {
      const newWorkspaces = state.workspaces.map((workspace) => {
        if (workspace.id === state.editInvoiceID) {
          return { ...action.payload };
        }
        return workspace;
      });
      return {
        ...state,
        workspaces: newWorkspaces,
        filteredWorkspaces: newWorkspaces,
        isEditingInvoice: false,
        editInvoiceID: null,
        isDrawerOpen: false
      };
    }
    case CANCEL_BOOKING_EDIT: {
      return {
        ...state,
        isEditingInvoice: false,
        editInvoiceID: null,
        isDrawerOpen: false
      };
    }
    // case LOAD_WORKSPACES_DATA: {
    //   return { ...action.payload };
    // }
    case LOAD_WORKSPACES_DATA:
      return {
        ...state,
        workspaces: action.payload,
        filteredWorkspaces: action.payload // lub filtrowane na podstawie innych kryteriów
      };
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
