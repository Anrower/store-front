interface IClassListObject {
  [key: string]: any,
}

export const getClassName = (classList: IClassListObject) => {
  let resultClassName = '';
  Object.keys(classList).forEach((className) => {
    if (classList[className]) {
      resultClassName += ` ${className}`;
    }
  });
  return resultClassName;
}
