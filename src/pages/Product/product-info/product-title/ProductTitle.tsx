import styles from './productTitle.module.scss';

interface IProps {
  title: string,
  subtitle: string,
}

const ProductTitle = (props: IProps) => {
  const { title, subtitle } = props;
  return (
    <>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.subtitle}>{subtitle}</p>
    </>

  )
}

export default ProductTitle