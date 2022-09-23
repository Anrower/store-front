import { ICartProductAttUpd } from "../store/reducers/СartSlice";

export const useUpdateSelectType = (
  event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  name: string,
  idx: number,
  productIdx?: number,
) => {
  const attValue = event.currentTarget.getAttribute('data-value');

  if (attValue !== null && productIdx !== undefined) {
    //   const indexName = `${name}idx`
    //   const obj: ICartProductAttUpd = {
    //     productIndex: productIdx,
    //     selectAtt: {
    //       [name]: attValue,
    //       [indexName]: idx,
    //     }
    //   }
    //   return obj;
  }
}