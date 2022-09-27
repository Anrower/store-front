import { useAppSelector } from '../../../hooks/redux';
import styles from './popup.module.scss';

interface Iprops {
  children: JSX.Element,
}

const Popup = (props: Iprops) => {
  const { overlayIsOpen } = useAppSelector(state => state.cartReducer);
  const { children } = props;

  return (overlayIsOpen) ? (
    <div className={styles.popup} >
      <div className={styles.popup__inner}>
        {children}
      </div>
    </div >
  ) : null;
}

export default Popup