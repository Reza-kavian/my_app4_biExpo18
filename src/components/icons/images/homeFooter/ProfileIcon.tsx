import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgProfileIcon = (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    // className="profile-icon_svg__size-6 profile-icon_svg__fill-foreground"
    {...props}
  >
    <Path
      // fill="currentColor"
      fillRule="evenodd"
      d="M12 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10M7.5 14a4 4 0 0 0 0 8h9a4 4 0 0 0 0-8z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgProfileIcon;
