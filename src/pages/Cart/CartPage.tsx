import './cartPage.scss';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import PrimBtn from '../../components/buttons/primary-btn/PrimBtn';
import AttributeType from '../Product/product-info/attribute-type/AttributeType';
import ProductTitle from '../Product/product-info/product-title/ProductTitle';
import ProductPrice from '../Product/product-info/product-price/ProductPrice';
import { additionTotalPrice, decreaseTotalAmount, decrementProductAmount, increaseTotalAmount, incrementProductAmount, subtractionTotalPrice, updateProductParam, updateProducts } from '../../store/reducers/СartSlice';
import { ICartProductAttUpd } from '../../store/reducers/СartSlice';

const CartPage = () => {

  const [img, setImage] = useState(['']);
  const [imgIdx, setImgIdx] = useState(0);
  const dispatch = useAppDispatch();
  const { products, totalAmount, totalPrice } = useAppSelector(state => state.cartReducer)

  const updateCartProductType = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    name: string,
    idx: number,
    productIdx?: number,
  ) => {
    const attValue = event.currentTarget.getAttribute('data-value');

    if (attValue !== null && productIdx !== undefined) {
      const indexName = `${name}idx`
      const obj: ICartProductAttUpd = {
        productIndex: productIdx,
        selectAtt: {
          [name]: attValue,
          [indexName]: idx,
        }
      }
      dispatch(updateProductParam(obj))
    }
  }

  const swipe = (dir: string, gallery: string[], productIdx: number) => {
    let currentIndex = imgIdx;
    if (gallery.length !== 1) {
      setImage(gallery);

      if (dir === 'right' && currentIndex + 1 === gallery.length) {
        currentIndex = 0;
      }

      if ((dir === 'left') && currentIndex === 0) {
        currentIndex = gallery.length - 1;
      }

      if (dir === 'right') {
        currentIndex += 1;

      }
      if (dir === 'left') {
        currentIndex -= 1;
      }
      setImgIdx(currentIndex);

    }
    return
  }

  const getProductCount = (productIdx: number) => products[productIdx].amount

  const removeProductAmount = (productIdx: number) => {
    const productPrice = products[productIdx].priceValue;
    if (products[productIdx].amount === 1) {
      const result = products.filter((items, index) => {
        if (index !== productIdx) {
          return items;
        }
      });
      dispatch(updateProducts(result));
    } else {
      dispatch(decrementProductAmount(productIdx));
    }
    dispatch(subtractionTotalPrice(productPrice));
    dispatch(decreaseTotalAmount());
  }
  const addProductAmount = (productIdx: number) => {
    const productPrice = products[productIdx].priceValue;
    dispatch(increaseTotalAmount());
    dispatch(additionTotalPrice(productPrice))
    dispatch(incrementProductAmount(productIdx));
  }

  // const []
  return (
    <div className='cart-page'>
      <h3 className='cart-page__title'>cart</h3>
      <div className='cart-page__content'>
        <div className='cart-page__product'>
          {products.map((i, productIndex) => (

            <div key={productIndex}
              className='cart-page__product-item'>
              <div>
                <ProductTitle title={i.brand} subtitle={i.name} />
                <ProductPrice price={i.priceValue} symbol={i.priceCurrency} />

                {i.attributes.map((i) => (
                  <div key={i.id}>
                    <p className='attributes-type-name'>{i.id}:</p>
                    <AttributeType
                      attName={i.id}
                      items={i.items}
                      selectType={updateCartProductType}
                      productIdx={productIndex}
                    />
                  </div>
                ))}
              </div>

              <div className='item--amount__wrapper'>
                <div className='item--amount__btns'>
                  <button
                    onClick={() => removeProductAmount(productIndex)}>
                    -
                  </button>
                  <span>{getProductCount(productIndex)}</span>
                  <button
                    onClick={() => addProductAmount(productIndex)}>
                    +
                  </button>
                </div>
                <div className='item--image'>
                  <img src={products[productIndex].gallery[imgIdx]} alt={i.name}></img>
                  <button
                    onClick={() => swipe('left', i.gallery, productIndex)}>-</button>
                  <button
                    onClick={() => swipe('right', i.gallery, productIndex)}>+</button>
                </div>
              </div>

            </div>
          ))}
        </div>
        <div className='cart-page__total-box'>
          <p className='discont total-item'>
            <span className='discont--title'>Tax 21%:</span>
            <span className='discont--value'>10</span>
          </p>
          <p className='quantity total-item'>
            <span className='quantity--title'>Qantity:</span>
            <span className='quantity--value'>{totalAmount}</span>
          </p>
          <p className='total-price total-item'>
            <span className='total-price--title'>Total:</span>
            <span className='total-price--value'>{ }{totalPrice}</span>
          </p>
          <div className='order-btn'>
            <PrimBtn title='order' />
          </div>

        </div>
      </div>
    </div>
  )
}

export default CartPage