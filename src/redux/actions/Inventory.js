import {INVENTORY_ACTION_TYPES} from '../../shared/constants/ActionTypes';
import jwtAxios from '@crema/services/auth/jwt-auth/jwt-api';

const {
  GET_INVENTORIES,
  UPDATE_INVENTORY,
  ADD_INVENTORY,
} = INVENTORY_ACTION_TYPES;

export const getInventoryData = () => async (dispatch) => {
  try {
    dispatch({type: GET_INVENTORIES.IS_FETCHING});

    const {data} = await jwtAxios.get('/inventory');

    dispatch({
      type: GET_INVENTORIES.IS_FETCHED,
      inventories: data.inventoriesList,
    });
  } catch (error) {
    dispatch({type: GET_INVENTORIES.IS_ERROR, error: error.message});
  }
};

export const addNewInventory = (body) => async (dispatch) => {
  try {
    dispatch({type: ADD_INVENTORY.IS_FETCHING});

    const {data} = await jwtAxios.post('/inventory', body);

    dispatch({
      type: ADD_INVENTORY.IS_FETCHED,
      inventory: data.inventory,
    });
  } catch (error) {
    dispatch({type: ADD_INVENTORY.IS_ERROR, error: error.message});
  }
};

export const updateNewInventory = (body) => async (dispatch) => {
  try {
    dispatch({type: UPDATE_INVENTORY.IS_FETCHING});

    const {data} = await jwtAxios.patch(
      `/inventory?inventoryID=${body._id}`,
      body,
    );

    dispatch({
      type: UPDATE_INVENTORY.IS_FETCHED,
      inventory: data.inventory,
    });
  } catch (error) {
    dispatch({type: UPDATE_INVENTORY.IS_ERROR, error: error.message});
  }
};
