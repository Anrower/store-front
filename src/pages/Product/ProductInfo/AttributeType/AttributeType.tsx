import { useEffect, useState } from 'react';
import { getClassName } from '../../../../helpers/getClassName';
import { useAppSelector } from '../../../../hooks/redux';
import { IAttribute } from '../../../../models/IAttribute';
import './attributeType.scss';
interface IProps {
  warning?: boolean
  setWarning?: (a: boolean) => void
  productIdx?: number
  attributeName: string
  attributeOptions: IAttribute[]
  overlay?: boolean
  selectType: (
    attributeName: string,
    atributeValue?: string,
    productIdx?: number,
  ) => void
}

const AttributeType = (props: IProps) => {
  const { products } = useAppSelector(state => state.cartReducer);
  const [selectAttribute, setSelectAttribute] = useState<number>(-1);
  const {
    attributeName,
    attributeOptions,
    selectType,
    productIdx = null,
    warning,
    setWarning,
    overlay
  } = props;

  useEffect(() => {
    if (warning && setWarning) {
      let timer = setTimeout(() => setWarning(false), 1200)
      return () => {
        clearTimeout(timer)
      }
    }
  }, [warning, setWarning, selectAttribute])

  if (productIdx !== null) {
    const selectAtt = products[productIdx].selectAtt;
    const selectName = `${attributeName}idx`;
    // selectIndex = selectAtt[selectName];
  }

  const selectAttributeOption = (
    attributValue: string | undefined,
    attributeOptions: IAttribute[]
  ): number => {
    const index = attributeOptions
      .findIndex((attribute) => attribute.value === attributValue);
    return index;
  }

  // useEffect(() => {
  //   setSelectAttribute(selectIndex);
  // }, [selectIndex])

  const handleClick = (
    attributeName: string,
    atributeValue?: string,
    productIdx?: number | null,
  ) => {
    const index = selectAttributeOption(atributeValue, attributeOptions);
    setSelectAttribute(index);
    if (typeof productIdx === 'number') {
      selectType(attributeName, atributeValue, productIdx);
    } else {
      selectType(attributeName, atributeValue);
    }
  }

  return (
    <>
      <p
        className={overlay
          ? "attributes-type_overlay-name"
          : "attributes-type-name"
        }
      >
        {attributeName}:
      </p>
      <div
        className={overlay
          ? "attributes-type_overlay"
          : "attributes-type"
        }
      >
        {attributeOptions.map((attribute, idx) => (
          <div
            className={getClassName({
              [`attributes-type_overlay-item ${attributeName} active`]: overlay && idx === selectAttribute,
              [`attributes-type_overlay-item ${attributeName}`]: overlay,
              [`attributes-type-item ${attributeName} active`]: idx === selectAttribute,
              [`attributes-type-item_warning ${attributeName}`]: warning && selectAttribute === -1,
              [`attributes-type-item ${attributeName}`]: true,
            })}
            key={attribute.value}
            style={attributeName === 'Color' ? {
              background: attribute.value,
              filter: 'grayscale(40%)'
            } : undefined}
            // className={overlay
            //   ? (idx === selectAttribute ?
            //     `attributes-type_overlay-item ${attributeName} active` :
            //     `attributes-type_overlay-item ${attributeName}`)
            //   :
            //   (idx === selectAttribute ?
            //     `attributes-type-item ${attributeName} active` :
            //     `attributes-type-item ${attributeName}`)
            // }
            onClick={() => handleClick(attributeName, attribute.value, productIdx,)}
          >
            {attributeName !== "Color" ? attribute.value : null}
          </div>
        ))}
      </div>
    </>
  )
}

export default AttributeType
