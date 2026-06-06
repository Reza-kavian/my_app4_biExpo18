import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgAddToCartTapsi = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="#fff"
    className="add-to-cart-tapsi_svg__absolute add-to-cart-tapsi_svg__z-10 add-to-cart-tapsi_svg__h-5 add-to-cart-tapsi_svg__w-5 add-to-cart-tapsi_svg__fill-white"
    style={{
      border: '1px dashed #00f',
    }}
    viewBox="0 0 24 24"
    {...props}
  >
    <Path d="M18 11.25h-5.25V6c0-.41-.34-.75-.75-.75s-.75.34-.75.75v5.25H6c-.41 0-.75.34-.75.75s.34.75.75.75h5.25V18c0 .41.34.75.75.75s.75-.34.75-.75v-5.25H18c.41 0 .75-.34.75-.75s-.34-.75-.75-.75" />
  </Svg>
);
export default SvgAddToCartTapsi;
