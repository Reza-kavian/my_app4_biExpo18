import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgAddToCart = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={26}
    height={26}
    aria-hidden="true"
    className="add-to-cart_svg__MuiSvgIcon-root"
    style={{
      fontSize: 26,
    }}
    viewBox="0 0 24 24"
    {...props}
  >
    <Path fill="#F01436" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z" />
  </Svg>
);
export default SvgAddToCart;
