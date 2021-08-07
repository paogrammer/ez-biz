import React from 'react';
import clsx from 'clsx';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import TableBody from '@material-ui/core/TableBody';
import invoiceData from '../../../../@crema/services/db/extraPages/invoice/invoiceData';
import {Box, makeStyles} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableHeading from './TableHeading';
import TableItem from './TableItem';
import {Fonts} from '../../../../shared/constants/AppEnums';

const useStyles = makeStyles((theme) => ({
  invoiceTable: {
    '@media (min-width: 768px)': {
      tableLayout: 'fixed',

      '& thead th': {
        whiteSpace: 'nowrap',
      },
    },
  },
  [theme.breakpoints.up('lg')]: {
    invoiceTable: {
      '& > thead > tr > th, & > tbody > tr > th, & > tfoot > tr > th, & > thead > tr > td, & > tbody > tr > td, & > tfoot > tr > td':
        {
          padding: 24,
        },
    },
  },
  [theme.breakpoints.up('xl')]: {
    invoiceTable: {
      '& > thead > tr > th, & > tbody > tr > th, & > tfoot > tr > th, & > thead > tr > td, & > tbody > tr > td, & > tfoot > tr > td':
        {
          padding: 32,
        },
    },
  },
  textUppercase: {
    textTransform: 'uppercase',
  },
  textBase: {
    fontSize: 13,
  },
  textLg: {
    fontSize: 13,
  },
}));

const ItemList = (props) => {
  const classes = useStyles(props);
  const {items} = props;

  console.log(items.items, 'items in list');

  const getTotal = () => {
    let grandTotal = 0;

    items.items.map((item) => {
      if (item.isChecked) {
        grandTotal =
          grandTotal + parseFloat(item.quantity) * parseFloat(item.Price);
      }
    });

    return grandTotal;
  };

  return (
    <Table className={classes.invoiceTable}>
      <TableHead>
        <TableHeading />
      </TableHead>

      <TableBody>
        {items.items.map((item) => {
          if (item.isChecked) {
            return <TableItem key={item._id} product={item} />;
          } else {
            return null;
          }
        })}
        <TableRow>
          <TableCell colSpan='4' component='th' scope='row'>
            <Box
              color='grey.700'
              className={clsx(classes.textUppercase, classes.textLg)}
              fontWeight={Fonts.MEDIUM}>
              <IntlMessages id='invoice.grandTotal' />
            </Box>
          </TableCell>
          <TableCell>
            <Box
              color='grey.700'
              className={clsx(classes.textUppercase, classes.textLg)}
              textAlign='right'
              fontWeight={Fonts.MEDIUM}>
              ${getTotal()}
            </Box>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default ItemList;
