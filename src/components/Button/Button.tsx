import './button.scss';

type TSize = 'overlay' | 'tall';

interface IProps {
  title: string,
  size?: TSize;
  important: 'primary' | 'secondary';
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const PrimBtn = (props: IProps) => {
  const { title, size, important, ...rest } = props;
  return (
    <button
      className={important === 'primary' ?
        `btn_primary ${size}` :
        `btn_secondary ${size}`
      }
      {...rest}
    >
      {title}
    </button >
  )
}

export default PrimBtn
