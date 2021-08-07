import React, {useEffect, useState} from 'react';
import AppCard from '../../../../@crema/core/AppCard';
import {useIntl} from 'react-intl';
import {Box, TextField} from '@material-ui/core';
import {Fonts} from '../../../../shared/constants/AppEnums';
import AppCircularProgress from '../../../../@crema/core/AppCircularProgress';

const Revenue = ({analytics}) => {
  const {messages} = useIntl();
  const [target, setTarget] = useState(0);

  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    if (target) {
      let _percentage = (analytics?.revenue / target) * 100;
      setPercentage(_percentage);
    }
  }, [target]);

  return (
    <AppCard title={messages['eCommerce.revenue']}>
      <Box mb={6} py={5} px={{xl: 10}}>
        <AppCircularProgress
          activeColor='#0A8FDC'
          value={percentage}
          hidePercentage
          centerNode={
            <Box>
              <Box display='flex' flexDirection='row'>
                <Box
                  component='span'
                  fontSize={14}
                  fontWeight={Fonts.MEDIUM}></Box>
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
      <Box display='flex' justifyContent='space-around'>
        <Box>
          <Box fontSize={18} mb={0.5} fontWeight={Fonts.BOLD}>
            ${' '}
            <TextField
              id='outlined-basic'
              label='Target'
              variant='outlined'
              onChange={(e) => {
                setTarget(e.target.value);
              }}
              value={target}
            />
          </Box>
        </Box>
        <Box>
          <Box fontSize={18} mb={0.5} fontWeight={Fonts.BOLD}>
            {analytics?.revenue}
          </Box>
          <Box color='text.secondary'>Current</Box>
        </Box>
      </Box>
    </AppCard>
  );
};

export default Revenue;
