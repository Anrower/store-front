import './categoryCard.scss'
import { IProduct } from '../../../models/IProduct';
import { useAppSelector } from '../../../hooks/redux';
import { useNavigate } from "react-router-dom";
import { usePrice } from '../../../hooks/usePrice';


interface IProps {
  product: IProduct
}

const CategoryCard = (props: IProps) => {
  let navigate = useNavigate();
  const { product } = props;
  const { current } = useAppSelector(store => store.currencyReducer)

  const price = usePrice(product, current);

  return (
    <div className="categoryCard" onClick={() => navigate(`${product.id}`)}>
      {!product.inStock ? <span className="categoryCard__image_sold-out">OUT OF STOCK</span> : null}
      <div style={!product.inStock ? { filter: 'opacity(60%)' } : undefined} className="categoryCard__wrapper">
        <div className="categoryCard__image-wrapper">
          <img className="categoryCard-image" src={product.gallery[0]} alt={product.name} />
        </div>
        <div className="categoryCard__description">
          <p className="categoryCard__description-title">{product.name}</p>
          <p className="categoryCard__description-price">
            <span>{price?.currency.symbol}</span>
            {price?.amount}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CategoryCard
