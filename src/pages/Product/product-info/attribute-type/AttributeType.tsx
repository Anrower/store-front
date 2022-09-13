import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { IAttribute } from '../../../../models/IAttribute';
import './attributeType.scss';
import { updateSelectProduct } from '../../../../store/reducers/SelectProductSlice';

interface IProps {
  attName: string;
  attributes: IAttribute[];
  selectType: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, name: string) => void;
}

const AttributeType = (props: IProps) => {
  const dispatch = useAppDispatch();
  const { selectProudct } = useAppSelector(store => store.SelectProductReducer)
  const { currencyIndex } = useAppSelector(store => store.currencyReducer)
  const { attName, attributes, selectType } = props;
  const [selectAttribute, setSelectAttribute] = useState(0);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, attName: string, idx: number) => {
    setSelectAttribute(idx)
    selectType(event, attName);
  }

  useEffect(() => {
    dispatch(updateSelectProduct({ ...selectProudct, [attName]: attributes[0].value, [attName]: attributes[1].value }))
  }, [])


  return (
    <div className='attributes-type'>
      {attributes.map((i, idx) => (
        <div
          key={i.value}
          style={attName === 'Color' ? {
            background: i.value,
            filter: 'grayscale(40%)'
          } : undefined}
          className={idx === selectAttribute ?
            `attributes-type-item ${attName} active` :
            `attributes-type-item ${attName}`}
          data-value={i.value}
          onClick={event => handleClick(event, attName, idx)}
        >{attName !== 'Color' ? i.value : null}</div>
      ))}
    </div>
  )
}

export default AttributeType