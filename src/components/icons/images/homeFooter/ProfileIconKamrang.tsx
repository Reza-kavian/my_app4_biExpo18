import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgProfileIconKamrang = (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    // fill="#fff"
    // stroke="#878b92"
    // className="profile-icon-kamrang_svg__size-6 profile-icon-kamrang_svg__fill-foreground"
    {...props}
  >
    <Path
      // fill="inherit"
      fillRule="evenodd"
      // stroke="inherit"
      // strokeWidth={2}
      d="M12 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10ZM7.5 14a4 4 0 0 0 0 8h9a4 4 0 0 0 0-8z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgProfileIconKamrang;
