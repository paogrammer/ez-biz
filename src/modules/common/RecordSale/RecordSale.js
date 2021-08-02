import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import {useSelector} from 'react-redux';
import {FormatColorResetOutlined} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '98%',
    overflowY: 'scroll',
    maxHeight: '80%',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

export default function RecordSale({onSubmit, onClose, isOpen, objOnUpdating}) {
  const {data} = useSelector((state) => state.inventory);
  const [checked, setChecked] = useState([]);
  const [inventories, setInventories] = useState([]);
  const [values, setValues] = React.useState({
    itemNo: {
      error: false,
      value: '',
    },
    itemName: {
      error: false,
      value: '',
    },
    customerName: {
      error: false,
      value: '',
    },
    customerAddress: {
      error: false,
      value: '',
    },
    customerNumber: {
      error: false,
      value: '',
    },
    Price: {
      error: false,
      value: '',
    },
    quantity: {
      error: false,
      value: '',
    },
  });

  const handleChangeUpdate = (name) => (event) => {
    setValues({
      ...values,
      [name]: {
        error: false,
        value: event.target.value,
      },
    });
  };

  const handleCheckChange = (position) => {
    let _inventories = [...inventories];

    _inventories[position].isChecked = !_inventories[position].isChecked;

    setInventories(_inventories);
  };

  const classes = useStyles();

  useEffect(() => {
    if (!objOnUpdating) {
      setChecked(new Array(data.length).fill(false));
      let newData = [];
      data.map((item) => {
        newData.push({...item, isChecked: false});
      });
      setInventories(newData);
    } else {
      for (const key in objOnUpdating) {
        if (Object.hasOwnProperty.call(objOnUpdating, key)) {
          const element = objOnUpdating[key];

          setValues((prevSate) => {
            return {
              ...prevSate,
              [key]: {
                ...prevSate[key],
                value: element,
              },
            };
          });
        }
      }
    }
  }, [data, objOnUpdating]);

  const handleChange = (e, index) => {
    const {name, value} = e;
    let _inventories = [...inventories];
    _inventories[index][name] = value;
    setInventories(_inventories);
  };

  const onSubmitHandler = () => {
    onSubmit(inventories);
  };

  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-deliveryDate'
      className={classes.modal}
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}>
      <Fade in={isOpen}>
        <div className={classes.paper}>
          <h1>{objOnUpdating ? `Update A Sale` : `Record A Sale`}</h1>
          <form className={classes.container} noValidate autoComplete='off'>
            {!objOnUpdating &&
              inventories.map((inventory, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      margin: '1em 0',
                    }}>
                    <Checkbox
                      checked={inventories[index].isChecked}
                      onChange={() => handleCheckChange(index)}
                      inputProps={{'aria-label': 'primary checkbox'}}
                    />
                    {inventory.photo ? (
                      <img
                        src={`${process.env.REACT_APP_SERVER_URL}/${inventory.photo}`}
                        style={{
                          textAlign: 'center',
                          width: '100px',
                          height: '100px',
                          borderRadius: '50%',
                          margin: '0 1em',
                        }}
                      />
                    ) : (
                      <img
                        src={`${process.env.REACT_APP_SERVER_URL}/default.jpeg`}
                        style={{
                          textAlign: 'center',
                          width: '100px',
                          height: '100px',
                        }}
                      />
                    )}
                    <TextField
                      id='outlined-name'
                      label='Product Name'
                      className={classes.textField}
                      value={inventory.itemName}
                      disabled
                      // onChange={handleChange('productName')}
                      margin='normal'
                      variant='outlined'
                      required
                    />

                    <TextField
                      id='outlined-name'
                      label='Customer Name'
                      className={classes.textField}
                      value={
                        inventory.customerName ? inventory.customerName : ''
                      }
                      name='customerName'
                      onChange={(e) => handleChange(e.target, index)}
                      // onChange={handleChange('customerName', index)}
                      margin='normal'
                      variant='outlined'
                      disabled={!inventories[index].isChecked}
                      required
                    />
                    <TextField
                      id='outlined-name'
                      label='Customer Address'
                      className={classes.textField}
                      value={
                        inventory.customerAddress
                          ? inventory.customerAddress
                          : ''
                      }
                      onChange={(e) => handleChange(e.target, index)}
                      name='customerAddress'
                      margin='normal'
                      variant='outlined'
                      disabled={!inventories[index].isChecked}
                      required
                    />

                    <TextField
                      id='outlined-name'
                      label='Customer Contact Number'
                      className={classes.textField}
                      value={
                        inventory.customerNumber ? inventory.customerNumber : ''
                      }
                      onChange={(e) => handleChange(e.target, index)}
                      name='customerNumber'
                      margin='normal'
                      variant='outlined'
                      disabled={!inventories[index].isChecked}
                      type={'number'}
                      required
                    />
                    <TextField
                      id='outlined-number'
                      label='Price'
                      value={inventory.Price}
                      disabled
                      // onChange={handleChange('Price')}
                      type='number'
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin='normal'
                      variant='outlined'
                      required
                    />
                    <TextField
                      id='outlined-number'
                      label='Quantity'
                      value={inventory.quantity ? inventory.quantity : 0}
                      onChange={(e) => handleChange(e.target, index)}
                      type='number'
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin='normal'
                      variant='outlined'
                      name='quantity'
                      required
                      disabled={!inventories[index].isChecked}
                    />
                  </div>
                );
              })}
            {objOnUpdating && (
              <div>
                {objOnUpdating.photo ? (
                  <img
                    src={`${process.env.REACT_APP_SERVER_URL}/${objOnUpdating.photo}`}
                    style={{
                      textAlign: 'center',
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                      margin: '0 1em',
                    }}
                  />
                ) : (
                  <img
                    src={`${process.env.REACT_APP_SERVER_URL}/default.jpeg`}
                    style={{
                      textAlign: 'center',
                      width: '100px',
                      height: '100px',
                    }}
                  />
                )}
                <TextField
                  id='outlined-name'
                  label='Product Name'
                  className={classes.textField}
                  value={values.itemName.value}
                  error={values.itemName.error}
                  disabled
                  onChange={handleChangeUpdate('productName')}
                  disabled
                  margin='normal'
                  variant='outlined'
                  required
                />
                <TextField
                  id='outlined-name'
                  label='Customer Name'
                  className={classes.textField}
                  value={values.customerName.value}
                  error={values.customerName.error}
                  name='customerName'
                  onChange={handleChangeUpdate('customerName')}
                  margin='normal'
                  variant='outlined'
                  required
                />
                <TextField
                  id='outlined-name'
                  label='Customer Address'
                  className={classes.textField}
                  value={values.customerAddress.value}
                  error={values.customerAddress.error}
                  onChange={handleChangeUpdate('customerAddress')}
                  name='customerAddress'
                  margin='normal'
                  variant='outlined'
                  required
                />
                <TextField
                  id='outlined-name'
                  label='Customer Contact Number'
                  className={classes.textField}
                  value={values.customerNumber.value}
                  error={values.customerNumber.error}
                  onChange={handleChangeUpdate('customerNumber')}
                  name='customerNumber'
                  margin='normal'
                  variant='outlined'
                  type={'number'}
                  required
                />
                <TextField
                  id='outlined-number'
                  label='Price'
                  value={values.Price.value}
                  error={values.Price.error}
                  disabled
                  onChange={handleChangeUpdate('Price')}
                  disabled
                  type='number'
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin='normal'
                  variant='outlined'
                  required
                />
                <TextField
                  id='outlined-number'
                  label='Quantity'
                  value={values.quantity.value}
                  error={values.quantity.error}
                  onChange={handleChangeUpdate('quantity')}
                  type='number'
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin='normal'
                  variant='outlined'
                  name='quantity'
                  required
                />
              </div>
            )}
          </form>

          <Button color='primary' onClick={onClose}>
            Cancel
          </Button>
          <Button color='primary' onClick={onSubmitHandler}>
            {!objOnUpdating ? 'Submit' : 'Update'}
          </Button>
        </div>
      </Fade>
    </Modal>
  );
}
