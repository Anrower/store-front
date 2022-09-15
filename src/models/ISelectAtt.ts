export interface ISelectAtt {
  'With USB 3 ports'?: YN | null;
  'Capacity'?: capacity | null;
  'Touch ID in keyboard'?: YN | null;
  'Color'?: color | null;
  'Size'?: size | null;
}

type size = 'S' | 'M' | 'L' | 'Xl' | '40' | '41' | '42' | '43';
type YN = 'Yes' | 'No';
type capacity = '256GB' | '512GB' | '1T';
type color = green | cyan | blue | black | white
type green = '#44FF03';
type cyan = '#03FFF7';
type blue = '#030BFF';
type black = '#000000';
type white = '#FFFFFF';
