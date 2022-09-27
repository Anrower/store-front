import { getClassName } from '../../../../helpers/getClassName';
import styles from './productTitle.module.scss';

interface IProps {
  title: string,
  subtitle: string,
  overlay?: boolean,
}

const ProductTitle = (props: IProps) => {
  const { title, subtitle, overlay } = props;
  return (
    <>
      <h2 className={getClassName({
        [styles.title]: true,
        [styles.overlay]: overlay
      })}
      >
        {title}
      </h2>
      <p
        className={getClassName({
          [styles.subtitle]: true,
          [styles.overlay]: overlay
        })}
      >
        {subtitle}
      </p>
    </>

  )
}

export default ProductTitle