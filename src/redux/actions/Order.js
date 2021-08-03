import {ORDERS_ACTION_TYPES} from '../../shared/constants/ActionTypes';
import jwtAxios from '@crema/services/auth/jwt-auth/jwt-api';
import moment from 'moment';
import {getDashboardAnalyticsData} from './Dashboard';
import {toast} from 'react-toastify';

const {GET_ORDERS, ADD_ORDER, UPDATE_ORDER, DELETE_ORDER} = ORDERS_ACTION_TYPES;

export const getOrdersData = () => async (dispatch) => {
  try {
    dispatch({type: GET_ORDERS.IS_FETCHING});
    const {data} = await jwtAxios.get('/order');

    dispatch({
      type: GET_ORDERS.IS_FETCHED,
      orders: data.ordersList,
    });
  } catch (error) {
    dispatch({type: GET_ORDERS.IS_ERROR, error: error.message});
  }
};

export const addNewOrder =
  (inventories, recordSaleCloseHandler) => async (dispatch) => {
    try {
      dispatch({type: ADD_ORDER.IS_FETCHING});
      const {data} = await jwtAxios.post('/order', {
        inventories,
      });
      // dispatch({
      //   type: ADD_ORDER.IS_FETCHED,
      //   order: data.order,
      //   // analytics: data1.analytics,
      // });
      recordSaleCloseHandler();
    } catch (error) {
      toast.error('Please fill up the required fields');
      dispatch({type: ADD_ORDER.IS_ERROR, error: error});
    }
  };

export const updateOrder = (body) => async (dispatch) => {
  try {
    dispatch({type: UPDATE_ORDER.IS_FETCHING});

    const {data} = await jwtAxios.patch(`/order?orderID=${body._id}`, body);

    dispatch({
      type: UPDATE_ORDER.IS_FETCHED,
      order: data.order,
    });
    dispatch(getDashboardAnalyticsData());
  } catch (error) {
    dispatch({type: UPDATE_ORDER.IS_ERROR, error: error.message});
  }
};

export const deleteOrder = (body) => async (dispatch) => {
  try {
    dispatch({type: DELETE_ORDER.IS_FETCHING});

    const {data} = await jwtAxios.delete(`/order?orderID=${body._id}`);

    dispatch({
      type: DELETE_ORDER.IS_FETCHED,
      order: data.order,
    });
    dispatch(getOrdersData());
  } catch (error) {
    dispatch({type: DELETE_ORDER.IS_ERROR, error: error.message});
  }
};
