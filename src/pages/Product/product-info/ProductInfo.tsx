import './productInfo.scss';
import { IProduct } from '../../../models/IProduct';
import { useAppSelector } from '../../../hooks/redux';
import parse from 'html-react-parser';
import PrimBtn from '../../../components/buttons/primary-btn/PrimBtn';

interface IProps {
  product: IProduct
}


const ProductInfo = (props: IProps) => {
  const { currencyIndex } = useAppSelector(store => store.currencyReducer)
  const { product } = props
  const wideDescription = 370;
  const description = parse(product.description);

  return (
    <div className='product__info'>
      <div className='product__info__image-wrapper'>
        <img src={product.gallery[0]} alt={product.name}></img>
      </div>
      <div className='product__info__about'>
        <h2 className='product__info__about-brand'>{product.brand}</h2>
        <p className='product__info__about-name'>{product.name}</p>

        <div className='product__info__about-attributes'>
          {product.attributes.map(i => (
            <div key={i.id}>
              <p className='attributes-type-name'>{i.id}:</p>
              {i.id === 'Color' ?

                <div className='attributes-type'>
                  {i.items.map(i => (
                    <div
                      key={i.value}
                      style={{
                        backgroundColor: `${i.value}`,
                        // filter: `grayscale(40%)`
                      }} className='attributes-type-item color' />
                  ))}
                </div> :

                <div className='attributes-type'>
                  {i.items.map(i => (
                    <div key={i.value} className='attributes-type-item'>{i.value}</div>
                  ))}
                </div>
              }
            </div>
          ))}
        </div>

        <div className='attributes-type-price attributes-type-name'>
          <span>price:</span>
          <p className='attributes-type-price-value'>
            <span> {product.prices[currencyIndex].currency.symbol}</span>
            {product.prices[currencyIndex].amount}
          </p>
        </div>
        <div className='product__info__about-button'>
          <PrimBtn title='add to cart' height='tall' />
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