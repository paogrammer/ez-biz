import React from 'react';
import AppCard from '../../../../@crema/core/AppCard';
import {useIntl} from 'react-intl';
import {Box} from '@material-ui/core';
import {Fonts} from '../../../../shared/constants/AppEnums';
import AppCircularProgress from '../../../../@crema/core/AppCircularProgress';

const Revenue = ({analytics}) => {
  const {messages} = useIntl();

  return (
    <AppCard title={messages['eCommerce.revenue']}>
      <Box mb={6} py={5} px={{xl: 10}}>
        <AppCircularProgress
          activeColor='#0A8FDC'
          value={(analytics?.revenue / analytics?.totalSale) * 100}
          hidePercentage
          centerNode={
            <Box>
              <Box display='flex' flexDirection='row'>
                <Box component='span' fontSize={14} fontWeight={Fonts.MEDIUM}>
                  $
                </Box>
                <Box
                  component='h3'
                  color='text.primary'
                  fontSize={18}
                  fontWeight={Fonts.MEDIUM}>
                  {analytics?.totalSale}
                </Box>
              </Box>
              <Box component='p' ml={2} fontSize={14} color='text.secondary'>
                Sales
              </Box>
            </Box>
          }
          thickness={2}
        />
      </Box>
      {/*<Box display='flex' justifyContent='space-around'>
        <Box>
          <Box fontSize={18} mb={0.5} fontWeight={Fonts.BOLD}>
            $
          </Box>
          <Box color='text.secondary'>Target</Box>
        </Box>
        <Box>
          <Box fontSize={18} mb={0.5} fontWeight={Fonts.BOLD}>
            $ 1,500
          </Box>
          <Box color='text.secondary'>Current</Box>
        </Box>
        </Box>*/}
    </AppCard>
  );
};

export default Revenue;
