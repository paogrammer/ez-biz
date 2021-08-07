import React, {useEffect, useRef} from 'react';
import Card from '@material-ui/core/Card';
import {makeStyles, Button} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import Header from './Header';
import ItemList from './ItemList';
import {Fonts} from '../../../shared/constants/AppEnums';
import AppTableContainer from '../../../@crema/core/AppTableContainer';
import AppAnimate from '../../../@crema/core/AppAnimate';
import {useHistory} from 'react-router-dom';
import ReactToPdf from 'react-to-pdf';

const useStyles = makeStyles((theme) => ({
  textUppercase: {
    textTransform: 'uppercase',
  },
}));

const Invoice1 = (props) => {
  const classes = useStyles(props);
  const history = useHistory();

  const items = props.location.state;
  const componentRef = useRef();

  console.log(items, 'props');

  useEffect(() => {
    if (items) {
      // none
    } else {
      history.push('/');
    }
  }, [items]);

  return (
    <div>
      <ReactToPdf
        targetRef={componentRef}
        filename='invoice.pdf'
        x={0.5}
        y={0.5}
        scale={0.65}>
        {({toPdf}) => <Button onClick={toPdf}>Generate pdf</Button>}
      </ReactToPdf>

      <AppAnimate animation='transition.slideUpIn' delay={200}>
        <Box
          flex={1}
          display='flex'
          flexDirection='column'
          alignItems='center'
          ref={componentRef}>
          <Box flex={1} maxWidth={900}>
            <Box pt={{xl: 8}} mb={{xs: 6, lg: 8}} clone>
              <Card>
                <Header items={items} />
                <AppTableContainer>
                  <ItemList items={items} />
                </AppTableContainer>
              </Card>
            </Box>

            <Box
              mb={{xs: 3, lg: 4}}
              component='h4'
              color='grey.600'
              textAlign='center'
              fontSize={16}
              fontWeight={Fonts.BOLD}
              className={classes.textUppercase}>
              <IntlMessages id='invoice.thankYou' />
            </Box>
          </Box>
        </Box>
      </AppAnimate>
    </div>
  );
};

export default Invoice1;
