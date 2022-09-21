import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../hooks/redux';
import { IAttribute } from '../../../../models/IAttribute';
import './attributeType.scss';

interface IProps {
  productIdx?: number; // product index
  attName: string;
  items: IAttribute[];
  overlay?: boolean;
  selectType: (
    event: React.MouseEvent<HTMLDivElement>,
    name: string,
    idx: number,
    productIdx?: number) => void;
}

const AttributeType = (props: IProps) => {
  const { products } = useAppSelector(state => state.cartReducer);
  const [selectAttribute, setSelectAttribute] = useState<number>(0);
  let selectIndex: number = 0;
  const {
    attName,
    items,
    selectType,
    productIdx = null,
    overlay
  } = props;


  if (productIdx !== null) {
    const selectAtt = products[productIdx].selectAtt;
    const selectName = `${attName}idx`;
    selectIndex = selectAtt[selectName];
  }

  useEffect(() => {
    setSelectAttribute(selectIndex);
  }, [])

  const handleClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    attName: string,
    idx: number,
    productIdx?: number | null,
  ) => {
    setSelectAttribute(idx)
    if (typeof productIdx === 'number') {
      selectType(event, attName, idx, productIdx);
    } else {
      selectType(event, attName, idx);
    }

  }

  return (
    <>
      <p
        className={overlay
          ? 'attributes-type_overlay-name'
          : 'attributes-type-name'
        }
      >
        {attName}:
      </p>
      <div
        className={overlay
          ? 'attributes-type_overlay'
          : 'attributes-type'
        }
      >
        {items.map((i, idx) => (
          <div
            key={i.value}
            style={attName === 'Color' ? {
              background: i.value,
              filter: 'grayscale(40%)'
            } : undefined}
            className={overlay
              ? (idx === selectAttribute ?
                `attributes-type_overlay-item ${attName} active` :
                `attributes-type_overlay-item ${attName}`)
              :
              (idx === selectAttribute ?
                `attributes-type-item ${attName} active` :
                `attributes-type-item ${attName}`)
            }
            data-value={i.value}
            data-select-idx={idx}
            onClick={event => handleClick(event, attName, idx, productIdx)}
          >
            {attName !== 'Color' ? i.value : null}
          </div>
        ))}
      </div>
    </>
  )
}

export default AttributeType
