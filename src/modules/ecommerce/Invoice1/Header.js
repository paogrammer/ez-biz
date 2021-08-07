import React, {useEffect, useState} from 'react';
import {Box, makeStyles} from '@material-ui/core';
import invoiceData from '../../../@crema/services/db/extraPages/invoice/invoiceData';
import Typography from '@material-ui/core/Typography';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {Fonts} from '../../../shared/constants/AppEnums';
import moment from 'moment';
import jwtAxios from '@crema/services/auth/jwt-auth/jwt-api';

const useStyles = makeStyles((theme) => ({
  logoRoot: {
    display: 'inline-block',
    width: 100,
    [theme.breakpoints.down('xs')]: {
      width: 60,
    },
  },
  textRes: {
    fontSize: 16,
  },
}));

const Header = (props) => {
  const classes = useStyles(props);
  const {items} = props;
  const [business, setBusiness] = useState({});
  const date = new Date();

  const invoiceNumberGenerator = () => {
    return Math.floor(Math.random() * 100000000);
  };

  const getUserData = async () => {
    try {
      const {data} = await jwtAxios.get(`/users/${items.items[0].userID}`);
      console.log(data);
      setBusiness(data.user[0]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (items?.items) {
      getUserData();
    }
  }, []);

  return (
    <Box
      py={{xs: 6, sm: 8, xl: 10}}
      px={{xs: 6, xl: 8}}
      mb={{xl: 8}}
      display='flex'
      flexDirection={{xs: 'column', lg: 'row'}}
      alignItems={{lg: 'center'}}>
      <Box
        mx={-3}
        color='text.secondary'
        display='flex'
        flexDirection={{xs: 'column', sm: 'row'}}
        justifyContent='space-between'
        flex={1}>
        <Box px={3} mb={{xs: 3, sm: 0}} textAlign={{xs: 'center', sm: 'left'}}>
          <Box
            component='h3'
            color='grey.700'
            mb={1}
            fontWeight={Fonts.BOLD}
            className={classes.textRes}>
            {business.name}
          </Box>
          <Typography component='p' mb={1}>
            Email: {business.email}
          </Typography>
        </Box>

        <Box px={3} mb={{xs: 3, sm: 0}} textAlign={{xs: 'center', lg: 'left'}}>
          <Box
            component='h3'
            color='grey.700'
            mb={1}
            fontWeight={Fonts.BOLD}
            className={classes.textRes}>
            <IntlMessages id='invoice.client' />
          </Box>
          <Typography component='p' mb={1}>
            {items.items[0].customerName}
          </Typography>
          <Typography component='p' mb={1}>
            {items.items[0].customerNumber}
          </Typography>
        </Box>

        <Box
          px={3}
          mb={{xs: 3, sm: 0}}
          textAlign={{xs: 'center', sm: 'right', lg: 'left'}}>
          <Box
            component='h3'
            mb={1}
            color='grey.700'
            fontWeight={Fonts.BOLD}
            className={classes.textRes}>
            <IntlMessages id='invoice.invoice' />
          </Box>
          <Typography component='p' mb={1} fontWeight={Fonts.MEDIUM}>
            <IntlMessages id='invoice.id' />: {invoiceNumberGenerator()}
          </Typography>
          <Typography component='p' mb={1}>
            <IntlMessages id='invoice.issued' />:
            {moment(date).format('MM/DD/YYYY')}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
