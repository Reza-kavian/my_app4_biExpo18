import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgInfAnfComments = (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    // fill="inherit"
    // className="inf-anf-comments_svg__fill-primary inf-anf-comments_svg__rotate-180"
    style={{
      // transform: 'rotate(180deg)',
      transform: [{ rotate: '180deg' }],
      // fill: '#ff5900',
    }}
    {...props}
  >
    <Path
      // fill="#ff5900"
      fillRule="evenodd"
      d="M8.55 15.536 12.085 12 8.55 8.464 9.964 7.05l4.95 4.95-4.95 4.95z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgInfAnfComments;