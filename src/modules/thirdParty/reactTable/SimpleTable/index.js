import React from 'react';
import {makeData} from '../data/Utils';
import ReactTable from 'react-table';

class SimpleTable extends React.Component {
  constructor() {
    super();
    this.state = {
      data: makeData(),
    };
  }

  render() {
    const {data} = this.state;
    return (
      <ReactTable
        data={data}
        columns={[
          {
            Header: 'Product',
            columns: [
              {
                Header: 'Item No.',
                accessor: 'itemNumber',
              },
              {
                Header: 'Item Name',
                id: 'itemName',
              },
              {
                Header: 'Item Description',
                accessor: 'itemDesc',
              },
            ],
          },
          {
            Header: 'Info',
            columns: [ 
              {
                Header: 'Stock Amount',
                accessor: 'itemStock',
              },
              {
                Header: 'Price',
                accessor: 'itemPrice',
              },
            ],
          },
        ]}
        defaultPageSize={10}
        className='-striped -highlight'
      />
    );
  }
}

export default SimpleTable;
