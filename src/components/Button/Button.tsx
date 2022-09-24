import './button.scss';

type TSize = 'overlay' | 'tall';

interface IProps {
  title: string
  disabled?: boolean
  size?: TSize
  important: 'primary' | 'secondary'
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const PrimBtn = (props: IProps) => {
  const { title, size, important, handleClick, disabled } = props;
  return (
    <button
      className={important === 'primary' ?
        `btn_primary ${size}` :
        `btn_secondary ${size}`
      }
      disabled={disabled}
      onClick={handleClick}
    >
      {title}
    </button >
  )
}

export default PrimBtn
