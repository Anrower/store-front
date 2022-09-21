import styles from './popup.module.scss';

interface Iprops {
  children: JSX.Element,
  trigger: boolean
}

const Popup = (props: Iprops) => {
  const { children, trigger } = props;

  return (trigger) ? (
    <div className={styles.popup} >
      <div className={styles.popup__inner}>
        {children}
      </div>
    </div >
  ) : null;
}

export default Popup