import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import {Box, makeStyles} from '@material-ui/core';
import clsx from 'clsx';
import {Fonts} from '../../../../shared/constants/AppEnums';

const TableItem = (props) => {
  const {product} = props;

  const useStyles = makeStyles((theme) => ({
    textUppercase: {
      textTransform: 'uppercase',
    },
    textBase: {
      fontSize: 13,
      fontWeight: Fonts.MEDIUM,
      color: 'black',
    },
    alignTop: {
      verticalAlign: 'top',
    },
  }));

  const classes = useStyles(props);
  return (
    <TableRow>
      <TableCell component='th' scope='row'>
        <Box mb={2} className={clsx(classes.textUppercase, classes.textBase)}>
          {product.itemNo}
        </Box>
      </TableCell>
      <TableCell className={classes.alignTop}>
        <Box mb={2} className={clsx(classes.textUppercase, classes.textBase)}>
          {product.itemName}
        </Box>
      </TableCell>
      <TableCell className={classes.alignTop}>
        <Box
          mb={2}
          textAlign='center'
          className={clsx(classes.textUppercase, classes.textBase)}>
          {product.description}
        </Box>
      </TableCell>
      <TableCell className={classes.alignTop}>
        <Box
          mb={2}
          textAlign='right'
          className={clsx(classes.textUppercase, classes.textBase)}>
          {product.quantity}
        </Box>
      </TableCell>
      <TableCell className={classes.alignTop}>
        <Box
          mb={2}
          textAlign='right'
          className={clsx(classes.textUppercase, classes.textBase)}>
          ${product.Price}
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default TableItem;

TableItem.propTypes = {
  product: PropTypes.object.isRequired,
};
