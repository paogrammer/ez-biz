import React from 'react';
import Api from '../../@crema/services/ApiConfig';
import jwtAxios from '@crema/services/auth/jwt-auth/jwt-api';
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  GET_ACADEMY_DATA,
  GET_ANALYTICS_DATA,
  GET_CRM_DATA,
  GET_CRYPTO_DATA,
  GET_ECOMMERCE_DATA,
  GET_HC_DATA,
  GET_METRICS_DATA,
  GET_WIDGETS_DATA,
  DASHBOARD_ACTION_TYPES,
} from '../../shared/constants/ActionTypes';
import IntlMessages from '../../@crema/utility/IntlMessages';

export const onGetAnalyticsData = () => async (dispatch) => {
  // try {
  //   dispatch({type: DASHBOARD_ACTION_TYPES.IS_FETCHING});
  //   const {data} = await jwtAxios.get('/dashboard');
  //   dispatch({
  //     type: DASHBOARD_ACTION_TYPES.IS_FETCHED,
  //     analytics: data.analytics,
  //   });
  // } catch (error) {
  //   dispatch({type: DASHBOARD_ACTION_TYPES.IS_ERROR, error: error.message});
  // }
  // return (dispatch) => {
  //   dispatch({type: FETCH_START});
  //   Api.get('/dashboard/analytics')
  //     .then((data) => {
  //       if (data.status === 200) {
  //         dispatch({type: FETCH_SUCCESS});
  //         dispatch({type: GET_ANALYTICS_DATA, payload: data.analytics});
  //       } else {
  //         dispatch({
  //           type: FETCH_ERROR,
  //           payload: <IntlMessages id='message.somethingWentWrong' />,
  //         });
  //       }
  //     })
  //     .catch((error) => {
  //       dispatch({type: FETCH_ERROR, payload: error.message});
  //     });
  // };
};

export const onGetECommerceData = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.get('/dashboard/ecommerce')
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_ECOMMERCE_DATA, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: <IntlMessages id='message.somethingWentWrong' />,
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};

export const onGetAcademyData = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.get('/dashboard/academy')
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_ACADEMY_DATA, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: <IntlMessages id='message.somethingWentWrong' />,
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};

export const onGetHCData = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.get('/dashboard/health_care')
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_HC_DATA, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: <IntlMessages id='message.somethingWentWrong' />,
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};

export const onGetCrmData = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.get('/dashboard/crm')
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_CRM_DATA, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: <IntlMessages id='message.somethingWentWrong' />,
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};

export const onGetCryptoData = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.get('/dashboard/crypto')
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_CRYPTO_DATA, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: <IntlMessages id='message.somethingWentWrong' />,
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};

export const onGetMetricsData = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.get('/dashboard/metrics')
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_METRICS_DATA, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: <IntlMessages id='message.somethingWentWrong' />,
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};

export const onGetWidgetsData = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.get('/dashboard/widgets')
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_WIDGETS_DATA, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: <IntlMessages id='message.somethingWentWrong' />,
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};

export const getDashboardAnalyticsData = () => async (dispatch) => {
  try {
    dispatch({type: DASHBOARD_ACTION_TYPES.IS_FETCHING});

    const {data} = await jwtAxios.get('/dashboard');

    console.log(data, 'data');

    dispatch({
      type: DASHBOARD_ACTION_TYPES.IS_FETCHED,
      payload: data.dashboard,
    });
  } catch (error) {
    dispatch({type: DASHBOARD_ACTION_TYPES.IS_ERROR, error: error.message});
  }
};
