import {ORDERS_ACTION_TYPES} from '../../shared/constants/ActionTypes';
import jwtAxios from '@crema/services/auth/jwt-auth/jwt-api';
import moment from 'moment';
import {getDashboardAnalyticsData} from './Dashboard';

const {GET_ORDERS, ADD_ORDER, UPDATE_ORDER} = ORDERS_ACTION_TYPES;

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

export const addNewOrder = (body) => async (dispatch) => {
  try {
    dispatch({type: ADD_ORDER.IS_FETCHING});

    const {data} = await jwtAxios.post('/order', {
      ...body,
      deliveryDate: moment(body.deliveryDate).utc(),
    });

    dispatch({
      type: ADD_ORDER.IS_FETCHED,
      order: data.order,
    });
  } catch (error) {
    dispatch({type: ADD_ORDER.IS_ERROR, error: error.message});
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
