import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgBackButtonWhite = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="inherit"
    className="backButton-white_svg__size-6 backButton-white_svg__text-foreground"
    {...props}
  >
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M13.929 4.929 21 12l-7.071 7.071-1.414-1.414L17.17 13H4v-2h13.17l-4.655-4.657z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgBackButtonWhite;
