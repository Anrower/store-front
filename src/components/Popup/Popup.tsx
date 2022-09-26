import { useAppSelector } from '../../hooks/redux';
import styles from './popup.module.scss';

interface Iprops {
  children: JSX.Element,
}

const Popup = (props: Iprops) => {
  const { isOpen } = useAppSelector(state => state.popupReducer);
  const { children } = props;

  return (isOpen) ? (
    <div className={styles.popup} >
      <div className={styles.popup__inner}>
        {children}
      </div>
    </div >
  ) : null;
}

export default Popup