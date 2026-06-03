import * as React from 'react';
import Svg, { Defs, ClipPath, Path, G } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgLoginIcon2 = (props: SvgProps) => (
  <Svg
    width={500}
    height={500}
    style={{
      width: '100%',
      height: '100%',
      transform: 'translate3d(0,0,0)',
      contentVisibility: 'visible',
    }}
    {...props}
  >
    <Defs>
      <ClipPath id="login-icon-2_svg__a">
        <Path d="M0 0h500v500H0z" />
      </ClipPath>
    </Defs>
    <G clipPath="url(#login-icon-2_svg__a)">
      <G
        style={{
          display: 'block',
        }}
      >
        <Path
          fill="#DFE3E4"
          d="M250 152.852c-22.899 0-41.635 18.736-41.635 41.635s18.736 41.635 41.635 41.635 41.635-18.736 41.635-41.635c0-23.593-18.736-41.635-41.635-41.635"
        />
        <Path
          fill="#F5F5F6"
          d="M250 172.282c9.198 0 16.654 7.456 16.654 16.654S259.198 205.59 250 205.59s-16.654-7.456-16.654-16.654 7.456-16.654 16.654-16.654"
        />
        <Path
          fill="#B6BDC2"
          d="M250 236.121q15.613 0 27.063-10.408c-2.776-11.103-13.879-15.266-27.063-15.266s-24.287 4.163-27.063 15.266c6.939 6.939 16.654 10.408 27.063 10.408"
        />
      </G>
      <Path
        fill="#EDF0F1"
        d="M76.33-13.878v27.756H-76.33v-27.756z"
        style={{
          display: 'block',
        }}
        transform="translate(250 270.817)"
      />
      <Path
        fill="#CCD0D4"
        d="M55.929-4.8v9.6H-55.93v-9.6z"
        style={{
          display: 'block',
        }}
        transform="matrix(.76977 0 0 1 226.482 270.817)"
      />
    </G>
  </Svg>
);
export default SvgLoginIcon2;
