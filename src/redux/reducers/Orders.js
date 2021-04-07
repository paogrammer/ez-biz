import {ORDERS_ACTION_TYPES} from '../../shared/constants/ActionTypes';

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const {GET_ORDERS, ADD_ORDER, UPDATE_ORDER} = ORDERS_ACTION_TYPES;

const OrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS.IS_FETCHING:
    case ADD_ORDER.IS_FETCHING:
    case UPDATE_ORDER.IS_FETCHING:
      return {
        ...state,
        error: null,
        loading: true,
      };

    case GET_ORDERS.IS_FETCHED:
      return {
        ...state,
        loading: false,
        data: action.orders,
      };

    case ADD_ORDER.IS_FETCHED:
      return {
        ...state,
        loading: false,
        data: [...state.data, action.order],
      };

    case UPDATE_ORDER.IS_FETCHED:
      return {
        ...state,
        loading: false,
        data: state.data.map((item) =>
          item._id === action.order._id ? action.order : item,
        ),
      };

    case GET_ORDERS.IS_ERROR:
    case ADD_ORDER.IS_ERROR:
    case UPDATE_ORDER.IS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};
export default OrdersReducer;
