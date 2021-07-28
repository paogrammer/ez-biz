import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {KeyboardDatePicker} from '@material-ui/pickers';

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
    width: '80%',
    overflowY: 'scroll',
    maxHeight: '100%',
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
  const classes = useStyles();
  const [values, setValues] = React.useState({
    productName: {
      error: false,
      value: '',
    },
    customerName: {
      error: false,
      value: '',
    },
    deliveryDate: {
      error: false,
      value: null,
    },
    purchaseDate: {
      error: false,
    },
    Price: {
      error: false,
      value: '',
    },
    // Status: {
    //   error: false,
    //   value: '',
    // },
  });

  React.useEffect(() => {
    if (objOnUpdating) {
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
  }, [objOnUpdating]);

  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      [name]: {
        error: false,
        value: event.target.value,
      },
    });
  };

  const updateDate = (date, name) => {
    setValues({
      ...values,
      [name]: {
        error: false,
        value: date,
      },
    });
  };

  const validateFields = async () => {
    for (const key in values) {
      if (Object.hasOwnProperty.call(values, key)) {
        const element = values[key];
        if (!element.value || !`${element.value}`.length) {
          setValues((prevSate) => {
            return {
              ...prevSate,
              [key]: {
                ...element,
                error: true,
              },
            };
          });
        }
      }
    }

    let isValidated = false;
    for (const key in values) {
      if (Object.hasOwnProperty.call(values, key)) {
        const element = values[key];
        if (!`${element.value}`.length) {
          isValidated = false;

          return isValidated;
        }
      }
    }
    isValidated = true;
    return isValidated;
  };

  const objValues = () => {
    let res = {};

    for (const key in values) {
      if (Object.hasOwnProperty.call(values, key)) {
        const element = values[key];

        res = {
          ...res,
          [key]: element.value,
        };
      }
    }

    return res;
  };

  const onSubmitHandler = async () => {
    const isValidated = await validateFields();
    if (isValidated) {
      const obj = objValues();

      onSubmit(!!objOnUpdating, obj);
    }
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
          <h1>Record A Sale</h1>
          <form className={classes.container} noValidate autoComplete='off'>
            <TextField
              id='outlined-name'
              label='Product Name'
              className={classes.textField}
              value={values.productName.value}
              error={values.productName.error}
              onChange={handleChange('productName')}
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
              onChange={handleChange('customerName')}
              margin='normal'
              variant='outlined'
              required
            />

            <TextField
              id='outlined-number'
              label='Price'
              value={values.Price.value}
              error={values.Price.error}
              onChange={handleChange('Price')}
              type='number'
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              margin='normal'
              variant='outlined'
              required
            />

            <KeyboardDatePicker
              disableToolbar
              variant='inline'
              format='MM/dd/yyyy'
              margin='normal'
              id='date-picker-inline'
              label='Delivery Date'
              error={values.deliveryDate.error}
              value={values.deliveryDate.value}
              onChange={(date) => updateDate(date, 'deliveryDate')}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />

            {/* <TextField
              id='outlined-number'
              label='Status'
              value={values.Status.value}
              error={values.Status.error}
              onChange={handleChange('Status')}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              margin='normal'
              variant='outlined'
              required
            /> */}
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
