import './primBtn.scss';


interface Iprops {
  title: string,
  height?: 'tall';
  // customClick?: (a: string) => void
}

const PrimBtn = (props: Iprops) => {
  const { title, height } = props;
  return (
    <button className={`btn_primary ${height}`}>
      {title}
    </button >
  )
}

export default PrimBtn