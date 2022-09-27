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
  attributesOptions: IAttribute[]
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
    attributesOptions,
    selectType,
    productIdx = null,
    warning,
    setWarning,
    overlay
  } = props;

  const getselectAttributeIndex = (
    attributValue: string | undefined,
    attributeOptions: IAttribute[]
  ): number => {
    const index = attributeOptions
      .findIndex((attribute) => attribute.value === attributValue);
    return index;
  }

  useEffect(() => {
    if (warning && setWarning) {
      let timer = setTimeout(() => setWarning(false), 1200)
      return () => {
        clearTimeout(timer)
      }
    }
  }, [warning, setWarning, selectAttribute])

  useEffect(() => {
    if (productIdx !== null) {
      const selectOptions = products[productIdx].selectAtt;
      const optionValue = selectOptions[attributeName];
      const index = getselectAttributeIndex(optionValue, attributesOptions);
      setSelectAttribute(index);
    }
  }, [attributeName, attributesOptions, productIdx, products])

  const handleClick = (
    attributeName: string,
    atributeValue?: string,
    productIdx?: number | null,
  ) => {
    const index = getselectAttributeIndex(atributeValue, attributesOptions);
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
        {attributesOptions.map((attribute, idx) => (
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
            } : undefined}
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
