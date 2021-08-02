import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import {Button, makeStyles} from '@material-ui/core';
import ComponentCard from '@crema/core/ComponentCard';
import ComponentHeader from '@crema/core/ComponentHeader';
import GridContainer from '@crema/core/GridContainer';
import AddInventoryModal from 'modules/common/AddInventoryModal';
import RecordSale from 'modules/common/RecordSale';
import ControlledTable from './ControlledTable';
// eslint-disable-next-line import/no-webpack-loader-syntax
import ControlledTableSource from '!raw-loader!./ControlledTable';
import CustomColumnWidths from './CustomColumnWidths';
// eslint-disable-next-line import/no-webpack-loader-syntax
import CustomColumnWidthsSource from '!raw-loader!./CustomColumnWidths';
import CustomExpanderPosition from './CustomExpanderPosition';
// eslint-disable-next-line import/no-webpack-loader-syntax
import CustomExpanderPositionSource from '!raw-loader!./CustomExpanderPosition';
// eslint-disable-next-line import/no-webpack-loader-syntax
import CustomFiltering from './CustomFiltering';
// eslint-disable-next-line import/no-webpack-loader-syntax
import CustomFilteringSource from '!raw-loader!./CustomFiltering';
import FixedHeaderVerticalScroll from './FixedHeaderVerticalScroll';
// eslint-disable-next-line import/no-webpack-loader-syntax
import FixedHeaderVerticalScrollSource from '!raw-loader!./FixedHeaderVerticalScroll';
import TableFooter from './TableFooters';
// eslint-disable-next-line import/no-webpack-loader-syntax
import TableFooterSource from '!raw-loader!./TableFooters';
import SimpleTable from './SimpleTable';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SimpleTableSource from '!raw-loader!./SimpleTable';
import {
  addNewInventory,
  updateNewInventory,
  addNewOrder,
  deleteInventory,
} from 'redux/actions';

const ReactTable = () => {
  const [isInventoryInventoryModalOpen, setInventoryInventoryModalOpen] =
    useState(false);
  const [isRecordASaleModalOpen, setRecordASaleModalOpen] = useState(false);
  const [inventoryObjOnUpdating, setInventoryObjOnUpdating] = useState(null);
  const [saleObjOnUpdating, setSaleObjOnUpdating] = useState(null);
  const dispatch = useDispatch();

  const openUpdateInventoryHandler = () => {
    setInventoryInventoryModalOpen(true);
  };

  const submitUpdateInventoryHandler = (isUpdating, obj) => {
    if (isUpdating) {
      dispatch(updateNewInventory(obj));
    } else {
      dispatch(addNewInventory(obj));
    }
    updateInventoryCloseHandler();
  };

  const submitDeleteInventoryHandler = (obj) => {
    dispatch(deleteInventory(obj));
    updateInventoryCloseHandler();
  };

  const updateInventoryCloseHandler = () => {
    setInventoryInventoryModalOpen(false);
    setInventoryObjOnUpdating(null);
  };

  const updateTheInventory = (entry) => () => {
    setInventoryObjOnUpdating(entry);
    openUpdateInventoryHandler();
  };

  // Record Sale Functions
  const openUpdateSaleRecordHandler = () => {
    setRecordASaleModalOpen(true);
  };

  const submitRecordSaleHandler = async (inventories) => {
    dispatch(addNewOrder(inventories, recordSaleCloseHandler));
  };

  const recordSaleCloseHandler = () => {
    setRecordASaleModalOpen(false);
    setSaleObjOnUpdating(null);
  };

  const recordSaleObjOnUpdating = (entry) => () => {
    setSaleObjOnUpdating(entry);
    openUpdateSaleRecordHandler();
  };

  return (
    <>
      <ComponentHeader title='Inventory' description='' refUrl='/' />

      <GridContainer>
        <Grid item xs={12}>
          <ComponentCard
            title='Item List'
            component={() => <SimpleTable updateHandler={updateTheInventory} />}
            // source={SimpleTableSource}
          />
        </Grid>

        {isInventoryInventoryModalOpen && (
          <AddInventoryModal
            isOpen={isInventoryInventoryModalOpen}
            onClose={updateInventoryCloseHandler}
            onSubmit={submitUpdateInventoryHandler}
            objOnUpdating={inventoryObjOnUpdating}
            onDelete={submitDeleteInventoryHandler}
          />
        )}

        {isRecordASaleModalOpen && (
          <RecordSale
            isOpen={isRecordASaleModalOpen}
            onClose={recordSaleCloseHandler}
            onSubmit={submitRecordSaleHandler}
            objOnUpdating={saleObjOnUpdating}
          />
        )}

        <Button color='primary' onClick={openUpdateInventoryHandler}>
          Update Inventory
        </Button>
        <Button color='primary' onClick={openUpdateSaleRecordHandler}>
          Record a Sale
        </Button>
        <Button
          color='primary'
          href='https://web.lalamove.com/'
          target='_blank'>
          Deliver via Lalamove
        </Button>
      </GridContainer>
    </>
  );
};

export default ReactTable;
