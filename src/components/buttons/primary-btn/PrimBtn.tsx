import './primBtn.scss';


interface Iprops {
  title: string,
  height?: 'tall';
  customClick?: () => void
}

const PrimBtn = (props: Iprops) => {
  const { title, height, customClick } = props;
  return (
    <button
      className={`btn_primary ${height}`}
      onClick={customClick}>
      {title}
    </button >
  )
}

export default PrimBtn