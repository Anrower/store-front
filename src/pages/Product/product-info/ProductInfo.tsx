import './productInfo.scss';
import { IProduct } from '../../../models/IProduct';

interface IProps {
  product?: IProduct
}


const ProductInfo = (props: IProps) => {
  const { product } = props
  return (
    <div className='product__info'>
      <div className='product__info__image-wrapper'>
        <img src={product?.gallery[0]} alt={product?.name}></img>
      </div>
      <div className='product__info__about'>
        <h2 className='product__info__about-brand'>{product?.brand}</h2>
        <p className='product__info__about-name'>{product?.name}</p>
        <div className='product__info__about-attributes'>
          {product?.attributes.map(i => (
            <div>
              <p className='attributes-type-name'>{i.id}</p>
              {i.id === 'Color' ?

                <div className='attributes-type'>
                  {i.items.map(i => (
                    <div style={{ backgroundColor: `${i.value}` }} className='attributes-type-item color' />
                  ))}
                </div> :

                <div className='attributes-type'>
                  {i.items.map(i => (
                    <div className='attributes-type-item'>{i.value}</div>
                  ))}
                </div>
              }
            </div>
          ))}
        </div>
        <button className='product__info__about-button'>ADD TO CART</button>
        <div className='product__info__about-description'></div>
      </div>
    </div>
  )
}

export default ProductInfo