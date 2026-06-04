import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgRequestAgain = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="#ff5900"
    className="request-again_svg__h-5 request-again_svg__w-5 request-again_svg__fill-primary"
    {...props}
  >
    <Path
      fill="inherit"
      d="M12.88 4.24c-3.38 0-6.2 2.17-7.17 5.21l-.73-1.72a.71.71 0 0 0-.94-.38c-.37.15-.54.58-.38.94l1.54 3.65c.12.27.38.44.66.44.09 0 .19-.02.28-.06l3.63-1.54c.37-.15.54-.58.38-.94a.71.71 0 0 0-.94-.38l-2.27.96c.61-2.7 3.07-4.75 5.94-4.75a6.09 6.09 0 0 1 6.08 6.08 6.09 6.09 0 0 1-6.08 6.08c-2 0-3.87-.98-5.02-2.63a.713.713 0 0 0-1-.18c-.33.23-.41.68-.18 1a7.56 7.56 0 0 0 6.2 3.25c4.15 0 7.52-3.37 7.52-7.52s-3.37-7.52-7.52-7.52z"
    />
  </Svg>
);
export default SvgRequestAgain;
