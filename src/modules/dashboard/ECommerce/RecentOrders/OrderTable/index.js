import React from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import PropTypes from 'prop-types';
import TableHeading from './TableHeading';
import TableItem from './TableItem';
import TableContainer from '@material-ui/core/TableContainer';

const OrderTable = ({orderData, openModelHandler}) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableHeading />
        </TableHead>
        <TableBody>
          {orderData?.map((data) => (
            <TableItem
              data={data}
              key={data.id}
              openModelHandler={openModelHandler}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderTable;

OrderTable.defaultProps = {
  orderData: [],
};

OrderTable.propTypes = {
  orderData: PropTypes.array,
};
