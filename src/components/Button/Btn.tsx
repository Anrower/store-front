import './btn.scss';

type TSize = 'overlay' | 'tall';

interface Iprops {
  title: string,
  size?: TSize;
  important: 'primary' | 'secondary';
  customClick?: () => void
}

const PrimBtn = (props: Iprops) => {
  const { title, size, customClick, important } = props;
  console.log(size);
  return (
    <button
      className={important === 'primary' ?
        `btn_primary ${size}` :
        `btn_secondary ${size}`
      }
      onClick={customClick}>
      {title}
    </button >
  )
}

export default PrimBtn