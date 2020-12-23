import React from 'react';
import {Redirect} from 'react-router-dom';

import {createRoutes} from '../@crema/utility/Utils';
import {samplePagesConfig} from './sample';
import {errorPagesConfigs} from './errorPages';
import {dashBoardConfigs} from './dashboard';
import {ecommerceConfig} from './ecommerce';
import {authRouteConfig} from './auth';
import {initialUrl} from '../shared/constants/AppConst';
import {extraPagesConfigs} from './extraPages';
import {thirdPartyConfigs} from './thirdParty';
import {appsConfig} from './apps';

const routeConfigs = [
  ...samplePagesConfig,
  ...errorPagesConfigs,
  ...authRouteConfig,
  ...dashBoardConfigs,
  ...ecommerceConfig,
  ...extraPagesConfigs,
  ...thirdPartyConfigs,
  ...appsConfig,
];

const routes = [
  ...createRoutes(routeConfigs),
  {
    path: '/',
    exact: true,
    component: () => <Redirect to={initialUrl} />,
  },
  {
    component: () => <Redirect to='/error-pages/error-404' />,
  },
];

export default routes;