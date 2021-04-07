import React from 'react';
import {connect} from 'react-redux';
import ReactTable from 'react-table';
import {Button} from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import {getInventoryData} from 'redux/actions';

class SimpleTable extends React.Component {
  componentDidMount = () => {
    this.props.getInventoryData();
  };

  renderEditable = (entry) => {
    return (
      <div style={{textAlign: 'center'}}>
        <Button onClick={this.props.updateHandler(entry)}>
          <EditOutlinedIcon />
        </Button>
      </div>
    );
  };

  render() {
    return (
      <ReactTable
        data={this.props.inventory || []}
        columns={[
          {
            Header: 'Product',
            columns: [
              {
                Header: 'Item No.',
                accessor: 'itemNo',
              },
              {
                Header: 'Item Name',
                accessor: 'itemName',
              },
              {
                Header: 'Item Description',
                accessor: 'description',
              },
            ],
          },
          {
            Header: 'Info',
            columns: [
              {
                Header: 'Stock Amount',
                accessor: 'stockAmount',
              },
              {
                Header: 'Price',
                accessor: 'Price',
              },
              {
                Header: 'Update',
                // accessor: (a) => {
                //   console.log('...........a', a);
                //   return <EditOutlinedIcon />;
                // },
                Cell: (tableContent) =>
                  this.renderEditable(tableContent.original),
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

const mapStateToProps = (state) => {
  return {
    inventory: state.inventory.data,
  };
};

const mapDispatchToProps = {
  getInventoryData,
};

export default connect(mapStateToProps, mapDispatchToProps)(SimpleTable);
