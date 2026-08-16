import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgHomeIconKamrang = (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    // fill="#878b92"
    // className="home-icon-kamrang_svg__size-6 home-icon-kamrang_svg__fill-gray home-icon-kamrang_svg__*:fill-gray"
    {...props}
  >
    <Path
      // fill="inherit"
      fillRule="evenodd"
      d="m22.515 9.143-10.507-6.31-10.522 6.31 1.028 1.715.486-.292V18l.006.15A2 2 0 0 0 5 20h14l.15-.006A2 2 0 0 0 21 18v-7.434l.485.291zM5 9.367l7.006-4.201L19 9.365V18H5z"
      clipRule="evenodd"
    />
    <Path fill="inherit" d="M9.5 14a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v6h-5z" />
  </Svg>
);
export default SvgHomeIconKamrang;
