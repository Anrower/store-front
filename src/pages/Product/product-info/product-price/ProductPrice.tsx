import { ICurrencySymbol } from '../../../../models/ICurrencySymbol';
import styles from './productPrice.module.scss';

interface IProps {
  symbol: ICurrencySymbol,
  price: number,
}

const ProductPrice = (props: IProps) => {
  const { symbol, price } = props;
  return (
    <>
      <p className={styles.price}>
        <span>{symbol}</span>
        {price}
      </p>
    </>
  )
}

export default ProductPrice