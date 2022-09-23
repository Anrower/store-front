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
      <h2
        className={overlay
          ? `${styles.overlay}`
          : `${styles.title}`
        }
      >
        {title}
      </h2>
      <p
        className={overlay
          ? `${styles.overlay}`
          : `${styles.subtitle}`
        }
      >
        {subtitle}
      </p>
    </>

  )
}

export default ProductTitle