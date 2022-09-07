import './categoryCard.scss'
import { IProduct } from '../../../models/IProduct';

interface IProps {
  product: IProduct
}

const CategoryCard = (props: IProps) => {
  const { product } = props;

  return (
    <div className='categoryCard'>
      <div className='categoryCard__image-wrapper'>
        <img className='categoryCard-image' src={product.gallery[0]} alt={product.name} />
      </div>
      <div className='categoryCard__description'>
        <p className='categoryCard__description-title'>{product.name}</p>
        <p className='categoryCard__description-price'>
          <span>{product.prices[0].currency.symbol}</span>
          {product.prices[0].amount}</p>
      </div>
    </div>
  )
}

export default CategoryCard