import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  onGetECommerceData,
  getOrdersData,
  getDashboardAnalyticsData,
  updateOrder,
} from '../../../redux/actions';
import InfoView from '../../../@crema/core/InfoView';
import {Box, Grid} from '@material-ui/core';
import GridContainer from '../../../@crema/core/GridContainer';
import SalesState from './SalesState';
import SaleStatics from './SaleStatics';
import Application from './Application';
import ReportCard from './ReportCard';
import RecentOrders from './RecentOrders';
import Revenue from './Revenue';
import MarketingCampaign from './MarketingCampaign';
import Notifications from './Notifications';
import NewCustomers from './NewCustomers';
import PopularProducts from './PopularProducts';
import Browser from './Browser';
import SiteVisitors from './SiteVisitors';
import AppAnimate from '../../../@crema/core/AppAnimate';
import RecordSale from 'modules/common/RecordSale';

const revenueResults = [
  {
    bgColor: '#0A8FDC',
    icon: '/assets/images/dashboard/1_sales_icon.png',
    id: 1,
    type: 'Total Sale',
  },
  {
    bgColor: '#9E49E6',
    icon: '/assets/images/dashboard/1_revenue_icon.png',
    id: 2,
    type: 'Total Revenue',
  },
];

const ECommerce = () => {
  const [isRecordASaleModalOpen, setRecordASaleModalOpen] = useState(false);
  const [saleObjOnUpdating, setSaleObjOnUpdating] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onGetECommerceData());
    dispatch(getOrdersData());
    dispatch(getDashboardAnalyticsData());
  }, [dispatch]);

  const ecommerceData = useSelector(({dashboard}) => dashboard.ecommerceData);
  const revenue = useSelector(({dashboard}) => dashboard.revenue);
  const ordersCount = useSelector(({dashboard}) => dashboard.ordersCount);

  const ordersData = useSelector(({orders}) => orders.data);

  // Record Sale Functions
  const openUpdateSaleRecordHandler = (orderDetails) => () => {
    setSaleObjOnUpdating(orderDetails);
    setRecordASaleModalOpen(true);
  };

  const recordSaleCloseHandler = () => {
    setRecordASaleModalOpen(false);
    setSaleObjOnUpdating(null);
  };

  const submitRecordSaleHandler = (isUpdating, obj) => {
    dispatch(updateOrder(obj));

    recordSaleCloseHandler();
  };

  return (
    <>
      {ecommerceData ? (
        <AppAnimate animation='transition.slideUpIn' delay={200}>
          <Box pt={{xl: 4}} clone>
            <GridContainer>
              <Grid item xs={12} sm={6} md={3}>
                <SalesState
                  state={{...revenueResults[0], value: ordersCount || 0}}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <SalesState
                  state={{...revenueResults[1], value: revenue || 0}}
                />
              </Grid>

              {/* {ecommerceData.salesState.map((state, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <SalesState state={state} />
                </Grid>
              ))} */}
              {/* <Grid item xs={12} md={9}>
                <SaleStatics />
              </Grid> */}
              {/* <Grid item xs={12} md={3}>
                <Application />
              </Grid> */}
              {/* {ecommerceData.reportCards.map((report, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <ReportCard data={report} />
                </Grid>
              ))} */}
              {isRecordASaleModalOpen && (
                <RecordSale
                  isOpen={isRecordASaleModalOpen}
                  onClose={recordSaleCloseHandler}
                  onSubmit={submitRecordSaleHandler}
                  objOnUpdating={saleObjOnUpdating}
                />
              )}

              <Grid item xs={12} md={9}>
                <RecentOrders
                  recentOrders={ordersData}
                  openModelHandler={openUpdateSaleRecordHandler}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <Revenue />
              </Grid>

              {/* <Grid item xs={12} md={6}>
                <MarketingCampaign
                  marketingCampaign={ecommerceData.marketingCampaign}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Notifications notifications={ecommerceData.notifications} />
              </Grid> */}

              {/* <Grid item xs={12} md={6}>
                <NewCustomers newCustomers={ecommerceData.newCustomers} />
              </Grid>
              <Grid item xs={12} md={6}>
                <PopularProducts
                  popularProducts={ecommerceData.popularProducts}
                />
              </Grid> */}

              {/* <Grid item xs={12} md={9}>
                <SiteVisitors siteVisitorsData={ecommerceData.siteVisitors} />
              </Grid>
              <Grid item xs={12} md={3}>
                <Browser browserData={ecommerceData.browser} />
              </Grid> */}
            </GridContainer>
          </Box>
        </AppAnimate>
      ) : null}
      <InfoView />
    </>
  );
};

export default ECommerce;
