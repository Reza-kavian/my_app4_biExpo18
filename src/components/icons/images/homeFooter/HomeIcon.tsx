import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgHomeIcon = (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    // fill="inherit"
    // className="home-icon_svg__size-6 home-icon_svg__fill-foreground"
    {...props}
  >
    <Path
      // fill="#000"
      fillRule="evenodd"
      d="m22.515 9.143-10.507-6.31-10.522 6.31 1.028 1.715.486-.292V18l.006.15A2 2 0 0 0 5 20h4.5v-6a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v6H19l.15-.006A2 2 0 0 0 21 18v-7.434l.485.291z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgHomeIcon;
