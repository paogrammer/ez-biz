import React, {useRef, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';

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
    flexDirection: 'column',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

export default function TransitionsModal({
  onSubmit,
  onClose,
  isOpen,
  objOnUpdating,
  onDelete,
}) {
  const fileInput = useRef();
  const classes = useStyles();
  const [values, setValues] = React.useState({
    itemNo: {
      error: false,
      value: '',
    },
    itemName: {
      error: false,
      value: '',
    },
    description: {
      error: false,
      value: '',
    },
    stockAmount: {
      error: false,
      value: '',
    },
    Price: {
      error: false,
      value: '',
    },
  });

  const [image, setImage] = useState(null);

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

  const validateFields = async () => {
    for (const key in values) {
      if (Object.hasOwnProperty.call(values, key)) {
        const element = values[key];
        if (!`${element.value}`.length) {
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

  const handleUpload = () => {
    console.log(fileInput.current.files[0]);
    setImage(fileInput.current.files[0]);
  };

  const handleDelete = () => {
    const obj = objValues();
    onDelete(obj);
  };

  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
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
          <h1>Update Inventory</h1>
          <form className={classes.container} noValidate autoComplete='off'>
            <TextField
              id='outlined-name'
              label='Item No.'
              className={classes.textField}
              value={values.itemNo.value}
              error={values.itemNo.error}
              onChange={handleChange('itemNo')}
              margin='normal'
              variant='outlined'
              required
            />

            <TextField
              id='outlined-name'
              label='Item Name'
              className={classes.textField}
              value={values.itemName.value}
              error={values.itemName.error}
              onChange={handleChange('itemName')}
              margin='normal'
              variant='outlined'
              required
            />

            <TextField
              id='outlined-multiline-static'
              label='Item Description'
              multiline
              rows='4'
              className={classes.textField}
              margin='normal'
              value={values.description.value}
              error={values.description.error}
              onChange={handleChange('description')}
              variant='outlined'
              required
            />

            <TextField
              id='outlined-number'
              label='Stock Amount'
              value={values.stockAmount.value}
              error={values.stockAmount.error}
              onChange={handleChange('stockAmount')}
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
            <input
              accept='image/*'
              id='contained-button-file'
              type='file'
              style={{display: 'none'}}
              ref={fileInput}
              onChange={handleUpload}
            />
            <label htmlFor='contained-button-file'>
              <Button variant='contained' color='primary' component='span'>
                Upload
              </Button>
            </label>
          </form>

          <Button color='primary' onClick={onClose}>
            Cancel
          </Button>
          <Button color='primary' onClick={onSubmitHandler}>
            {!objOnUpdating ? 'Submit' : 'Update'}
          </Button>
          <Button color='primary' onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </Fade>
    </Modal>
  );
}
