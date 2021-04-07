import React from 'react';
import moment from 'moment';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import useStyles from './TableItem.style';

const TableItem = ({data, openModelHandler}) => {
  const classes = useStyles();
  // const getPaymentStatusColor = () => {
  //   switch (data.status) {
  //     case 'Pending': {
  //       return '#F84E4E';
  //     }
  //     case 'Delivered': {
  //       return '#43C888';
  //     }
  //     default: {
  //       return '#E2A72E';
  //     }
  //   }
  // };

  return (
    <TableRow key={data.name} className='item-hover'>
      <TableCell component='th' scope='row' className={classes.tableCell}>
        <Box className={classes.anchar}>{data._id}</Box>
      </TableCell>
      <TableCell align='left' className={classes.tableCell}>
        {data.productName}
      </TableCell>
      <TableCell align='left' className={classes.tableCell}>
        {data.customerName}
      </TableCell>
      <TableCell align='left' className={classes.tableCell}>
        {moment(data.deliveryDate).format('YYYY-MM-DD')}
      </TableCell>
      <TableCell align='left' className={classes.tableCell}>
        {data.Price}
      </TableCell>
      {/* <TableCell align='left' className={classes.tableCell}>
        <Box
          className={classes.badgeRoot}
          style={{
            color: getPaymentStatusColor(),
            backgroundColor: getPaymentStatusColor() + '44',
          }}>
          {data.status}
        </Box>
      </TableCell> */}
      <TableCell align='right' className={classes.tableCell}>
        <IconButton
          aria-label='more'
          aria-controls='long-menu'
          aria-haspopup='true'
          onClick={openModelHandler(data)}>
          <EditOutlinedIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default TableItem;

TableItem.propTypes = {
  data: PropTypes.object.isRequired,
};
