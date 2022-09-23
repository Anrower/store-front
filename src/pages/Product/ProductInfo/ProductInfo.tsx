import './productInfo.scss';
import { IProduct } from '../../../models/IProduct';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import Btn from '../../../components/Button/Button';
import AttributeType from './AttributeType/AttributeType';
import { addToCart, updateTotalPrice } from '../../../store/reducers/СartSlice';
import { IAttributeSet } from '../../../models/IAttributeSet';
import ProductTitle from './ProductTitle/ProductTitle';
import { usePrice } from '../../../hooks/usePrice';
import { ISelectProduct } from '../../../models/ISelectProduct';
import { getClassName } from '../../../helpers/getClassName';

interface IProps {
  product: IProduct
  asidePicture: number
}

const ProductInfo = (props: IProps) => {

  const dispatch = useAppDispatch();
  const { currentCurrency } = useAppSelector(store => store.currencyReducer)
  const { product, asidePicture } = props
  const wideDescription = 370;
  const currentPrice = usePrice(product, currentCurrency);

  const [warning, setWarning] = useState<boolean>(false);
  const [selectProduct, setSelectProduct] = useState<ISelectProduct>({
    ...product,
    selectAtt: {},
    amount: 1,
  })

  const isAttributesSelect = () => {
    return Object.keys(selectProduct.selectAtt).length === selectProduct.attributes.length;
  }

  const addToCartHandler = () => {
    const check = isAttributesSelect();
    if (!check) {
      setWarning(true);
    }
  }

  const selectType = (
    atributeName: string,
    atributeValue?: string,
    productIdx?: number,
  ): void => {
    // console.log(`name: ${atributeName}`);
    // console.log(`value: ${atributeValue}`);
    setSelectProduct({
      ...selectProduct,
      selectAtt: {
        ...selectProduct.selectAtt,
        [atributeName]: atributeValue,
      }
    })
  }

  return (
    <div className="product__info">
      <div className="product__info__image-wrapper">
        <img
          src={product.gallery[asidePicture]}
          alt={product.name}>
        </img>
      </div>

      <div className="product__info__about">
        <ProductTitle title={product.brand} subtitle={product.name} />

        <div className='product__info__about-attributes'>
          {product.attributes.map((atrribute) => (
            <div key={atrribute.id}>
              <AttributeType
                attributeName={atrribute.id}
                attributeOptions={atrribute.items}
                selectType={selectType}
                warning={warning}
                setWarning={setWarning}
              />
            </div>
          ))}
        </div>

        <div className="attributes-type-name">
          <span>price:</span>

          <p className="product__price">
            <span>{currentPrice?.currency.symbol}</span>

            {currentPrice?.amount}
          </p>
        </div>

        <div className="product__info__about-button">
          <Btn
            title="add to cart"
            size="tall"
            important='primary'
            onClick={addToCartHandler}
          />
        </div>

        <div className="product__info__about-description">
          {/* {product.description.length > wideDescription ? null : description} */}
        </div>

      </div>

      {product.description.length > wideDescription ?
        <div className="product__info__about-description" >
          {/* {description} */}
        </div> :
        null
      }
    </div>
  )
}

export default ProductInfo;