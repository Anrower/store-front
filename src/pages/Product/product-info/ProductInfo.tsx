import './productInfo.scss';
import { IProduct } from '../../../models/IProduct';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { useEffect } from 'react';
import parse from 'html-react-parser';
import PrimBtn from '../../../components/buttons/primary-btn/PrimBtn';
import AttributeType from './attribute-type/AttributeType';
import { updateSelectProduct, resetState, updateSelectAtt } from '../../../store/reducers/SelectProductSlice';
import { addToCart, updateTotalPrice } from '../../../store/reducers/СartSlice';
import { IAttributeSet } from '../../../models/IAttributeSet';
import { ISelectAtt } from '../../../models/ISelectAtt';

interface IProps {
  product: IProduct
  asidePicture: number
}

const ProductInfo = (props: IProps) => {
  const dispatch = useAppDispatch();
  const { selectProudct } = useAppSelector(store => store.SelectProductReducer)
  const { currencyIndex } = useAppSelector(store => store.currencyReducer)
  const { product, asidePicture } = props
  const wideDescription = 370;
  const description = parse(product.description);

  const currencySymbol = product.prices[currencyIndex].currency.symbol;
  const price = product.prices[currencyIndex].amount;

  const getAllAttribute = (atr: IAttributeSet[]) => {
    const result = [];
    for (let i = 0; i < atr.length; i++) {
      result.push(atr[i].id);
    }
    return result;
  }

  useEffect(() => {
    dispatch(updateSelectProduct(
      {
        ...selectProudct,
        priceCurrency: currencySymbol,
        priceValue: price,
      }
    ));
  }, [dispatch, currencyIndex])

  useEffect(() => {
    const attributes = getAllAttribute(product.attributes);
    let obj: any = {};

    function Att(this: any, key: string, value: string): void {
      this[key] = value;
    }

    for (let i = 0; i < attributes.length; i++) {
      const tempKey = attributes[i];
      const tempValue = product.attributes[i].items[0].value;
      const att = new (Att as any)(tempKey, tempValue);
      obj = { ...obj, ...att };
    }

    dispatch(updateSelectProduct(
      {
        ...selectProudct,
        brand: product.brand,
        id: product.id,
        attributes: product.attributes,
        name: product.name,
        priceValue: product.prices[0].amount,
        priceCurrency: product.prices[0].currency.symbol,
        gallery: product.gallery,
      }
    ));
    dispatch(updateSelectAtt(obj))
    return function cleanup() {
      dispatch(resetState());
    };
  }, []);

  const selectType = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    name: string,
  ) => {
    const attValue = event.currentTarget.getAttribute('data-value');

    if (attValue !== null) {
      const obj = {
        [name]: attValue
      }
      dispatch(updateSelectAtt(obj))
    }
  }

  const addToCartHandler = () => {
    dispatch(addToCart({ ...selectProudct }))
    dispatch(updateTotalPrice(product.prices[0].amount))
  }

  return (
    <div className='product__info'>
      <div className='product__info__image-wrapper'>
        <img src={product.gallery[asidePicture]} alt={product.name}></img>
      </div>
      <div className='product__info__about'>
        <h2 className='product__info__about-brand'>{product.brand}</h2>
        <p className='product__info__about-name'>{product.name}</p>

        <div className='product__info__about-attributes'>
          {product.attributes.map((i, idx) => (
            <div key={i.id}>
              <p className='attributes-type-name'>{i.id}:</p>
              <AttributeType
                attName={i.id}
                attributes={i.items}
                selectType={selectType}
              />
            </div>
          ))}
        </div>

        <div className='attributes-type-price attributes-type-name'>
          <span>price:</span>
          <p className='attributes-type-price-value'>
            <span>{currencySymbol}</span>
            {price}
          </p>
        </div>
        <div className='product__info__about-button'>
          <PrimBtn
            title='add to cart'
            height='tall'
            customClick={addToCartHandler} />
        </div>

        <div className='product__info__about-description'>
          {product.description.length > wideDescription ? null : description}
        </div>

      </div>
      {product.description.length > wideDescription ?
        <div className='product__info__about-description'>
          {description}
        </div> :
        null
      }
    </div>
  )
}

export default ProductInfo