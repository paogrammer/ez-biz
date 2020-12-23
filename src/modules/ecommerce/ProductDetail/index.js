import React, {useEffect} from 'react';
import ProductImageSlide from './ProductImageSlide';
import {useDispatch, useSelector} from 'react-redux';
import AppCard from '../../../@crema/core/AppCard';
import Header from './Header';
import ProductView from './ProductView/index';
import GridContainer from '../../../@crema/core/GridContainer';
import SimilarProduct from './SimilarProduct';
import {getProductDetail} from '../../../redux/actions/Ecommerce';
import {InfoView} from '../../../@crema';
import AppAnimate from '../../../@crema/core/AppAnimate';

const ProductDetail = (props) => {
  const dispatch = useDispatch();
  const {currentProduct} = useSelector(({ecommerce}) => ecommerce);
  useEffect(() => {
    dispatch(getProductDetail(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  return (
    <>
      {currentProduct ? (
        <AppAnimate animation='transition.slideUpIn' delay={200}>
          <AppCard>
            <Header product={currentProduct} />
            <GridContainer>
              <ProductImageSlide product={currentProduct} />
              <ProductView product={currentProduct} />
            </GridContainer>
            <SimilarProduct />
          </AppCard>
        </AppAnimate>
      ) : null}
      <InfoView />
    </>
  );
};

export default ProductDetail;
