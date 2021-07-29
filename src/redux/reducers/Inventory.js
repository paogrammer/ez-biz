import {INVENTORY_ACTION_TYPES} from '../../shared/constants/ActionTypes';

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const {GET_INVENTORIES, ADD_INVENTORY, UPDATE_INVENTORY, DELETE_INVENTORY} =
  INVENTORY_ACTION_TYPES;

const inventoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INVENTORIES.IS_FETCHING:
    case ADD_INVENTORY.IS_FETCHING:
    case UPDATE_INVENTORY.IS_FETCHING:
    case DELETE_INVENTORY.IS_FETCHING:
      return {
        ...state,
        error: null,
        loading: true,
      };

    case GET_INVENTORIES.IS_FETCHED:
      return {
        ...state,
        loading: false,
        data: action.inventories,
      };

    case ADD_INVENTORY.IS_FETCHED:
      return {
        ...state,
        loading: false,
        data: [...state.data, action.inventory],
      };

    case UPDATE_INVENTORY.IS_FETCHED:
      return {
        ...state,
        loading: false,
        data: state.data.map((item) =>
          item._id === action.inventory._id ? action.inventory : item,
        ),
      };
    case DELETE_INVENTORY.IS_FETCHED:
      return {
        ...state,
        loading: false,
        data: state.data.filter((item) => item._id !== action.inventory._id),
      };

    case GET_INVENTORIES.IS_ERROR:
    case ADD_INVENTORY.IS_ERROR:
    case UPDATE_INVENTORY.IS_ERROR:
    case DELETE_INVENTORY.IS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};
export default inventoryReducer;
