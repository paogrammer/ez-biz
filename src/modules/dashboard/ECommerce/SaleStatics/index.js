import React from 'react';
import AppCard from '../../../../@crema/core/AppCard';
import {useIntl} from 'react-intl';
import AppSelect from '../../../../@crema/core/AppSelect';
import {GridContainer} from '@crema';
import {Box, Grid, makeStyles} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import AppCircularProgress from '../../../../@crema/core/AppCircularProgress';
import SaleStaticChart from './SaleStaticChart';
import {Fonts} from '../../../../shared/constants/AppEnums';

const useStyles = makeStyles((theme) => ({
  textBase: {
    fontSize: 14,
  },
  chartContainer: {
    marginBottom: theme.spacing(9),
    [theme.breakpoints.up('xl')]: {
      paddingLeft: theme.spacing(8),
    },
  },
}));

const SaleStatics = (props) => {
  const {messages} = useIntl();
  const handleSelectionType = (data) => {
    console.log('data: ', data);
  };

  const classes = useStyles(props);
  return (
    <AppCard
      title={messages['eCommerce.saleStatics']}
      action={
        <AppSelect
          menus={[
            messages['dashboard.thisWeek'],
            messages['dashboard.lastWeeks'],
            messages['dashboard.lastMonth'],
          ]}
          defaultValue={messages['dashboard.thisWeek']}
          onChange={handleSelectionType}
        />
      }>
      <GridContainer>
        <Grid item xs={12} md={9}>
          <SaleStaticChart />
        </Grid>
        <Grid item xs={12} md={3}>
          <Box
            display='flex'
            flexDirection='column'
            justifyContent='center'
            height={1}>
            <Box className={classes.chartContainer}>
              <AppCard title={messages['eCommerce.revenue']}>
                <Box mb={6} py={5} px={{xl: 10}}>
                  <AppCircularProgress
                    activeColor='#0A8FDC'
                    value={70}
                    hidePercentage
                    centerNode={
                      <Box>
                        <Box display='flex' flexDirection='row'>
                          <Box
                            component='span'
                            fontSize={14}
                            fontWeight={Fonts.MEDIUM}>
                            $
                          </Box>
                          <Box
                            component='h3'
                            color='text.primary'
                            fontSize={18}
                            fontWeight={Fonts.MEDIUM}>
                            600
                          </Box>
                        </Box>
                        <Box
                          component='p'
                          ml={2}
                          fontSize={14}
                          color='text.secondary'>
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
                </Box>
              </AppCard>
            </Box>
            {/* <Box display='flex' justifyContent='center'>
                  <Box display='flex' justifyContent='space-around'>
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
                  </Box>
                  {/* <Box mr={6} display='flex' alignItems='center'>
                    <Box
                      bgcolor='#0A8FDC'
                      height={10}
                      width={10}
                      mr={2}
                      borderRadius='50%'
                    />
                    <Typography className={classes.textBase}>Android</Typography>
                  </Box>
                  <Box display='flex' alignItems='center'>
                    <Box
                      bgcolor='#F44D50'
                      height={10}
                      width={10}
                      mr={2}
                      borderRadius='50%'
                    />
                    <Typography className={classes.textBase}>IOS</Typography>
                  </Box> */}
            {/* </Box> */}
          </Box>
        </Grid>
      </GridContainer>
    </AppCard>
  );
};

export default SaleStatics;
