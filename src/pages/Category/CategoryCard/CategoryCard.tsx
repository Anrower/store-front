import './categoryCard.scss'
import { IProduct } from '../../../models/IProduct';
import { useAppSelector } from '../../../hooks/redux';
import { useNavigate } from "react-router-dom";
import { usePrice } from '../../../hooks/usePrice';
import { getClassName } from '../../../helpers/getClassName';

interface IProps {
  product: IProduct
}

const CategoryCard = (props: IProps) => {
  let navigate = useNavigate();
  const { product } = props;
  const { inStock, id, gallery, name } = product;
  const { currentCurrency } = useAppSelector(store => store.currencyReducer);
  const price = usePrice(product, currentCurrency);

  return (
    <div
      className="categoryCard"
      onClick={() => { navigate(id); }}
    >
      {!inStock && (
        <span className="categoryCard__image_sold-out">
          OUT OF STOCK
        </span>
      )}

      <div
        className={getClassName({
          'categoryCard__wrapper': true,
          'categoryCard__wrapper_filter': !inStock
        })}
      >
        <div className="categoryCard__image-wrapper">
          <img
            className="categoryCard-image"
            src={gallery[0]}
            alt={name}
          />
        </div>

        <div className="categoryCard__description">
          <p className="categoryCard__description-title">
            {name}
          </p>

          <p className="categoryCard__description-price">
            <span>{price?.currency.symbol}</span>

            {price?.amount}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CategoryCard;
