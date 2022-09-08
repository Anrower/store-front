import './categoryCard.scss'
import { IProduct } from '../../../models/IProduct';
import { useAppSelector } from '../../../hooks/redux';

interface IProps {
  product: IProduct
}

const CategoryCard = (props: IProps) => {
  const { product } = props;
  const { currencyIndex } = useAppSelector(store => store.currencyReducer)

  return (
    <div className='categoryCard'>
      <div className='categoryCard__image-wrapper'>
        <img className='categoryCard-image' src={product.gallery[0]} alt={product.name} />
      </div>
      <div className='categoryCard__description'>
        <p className='categoryCard__description-title'>{product.name}</p>
        <p className='categoryCard__description-price'>
          <span>{product.prices[currencyIndex].currency.symbol}</span>
          {product.prices[currencyIndex].amount}</p>
      </div>
    </div>
  )
}

export default CategoryCard