import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgOrdersIcon = (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    // className="orders-icon_svg__size-6 orders-icon_svg__fill-foreground"
    {...props}
  >
    <Path
      fill="#000000"  ////zare_nk_050525_nokteh(chon dota path darim va har kodoom ye fill joda daran pas dar hamin tarife component fill ra meghdar 
      ////midim, na dar seda zadane component dar safahatemoon, chon dar sedazadan age fill bedim be svg dadeh mishe va nemitoonim baraye har path jodaganeh bedim)
      d="M4.222 2h15.556C21 2 22 3 22 4.222v15.556C22 21 21 22 19.778 22H4.222C3 22 2 21 2 19.778V4.222C2 3 3 2 4.222 2" />
    <Path
      // style={{ fill: "#000000" }}  ////zare_nk_050525_nokteh(path nemitooneh style={{}} begireh va faghat svg mitooneh!(pas baraye pas az atribute mostaghime fill estefadeh kardim))
      fill="#fff"  ////zare_nk_050525_nokteh(chon dota path darim va har kodoom ye fill joda daran pas dar hamin tarife component fill ra meghdar 
      ////midim, na dar seda zadane component dar safahatemoon, chon dar sedazadan age fill bedim be svg dadeh mishe va nemitoonim baraye har path jodaganeh bedim)
      d="M9 14H7c-.3 0-.5-.1-.7-.3S6 13.3 6 13s.1-.5.3-.7.4-.3.7-.3h2c.3 0 .5.1.7.3s.3.4.3.7-.1.5-.3.7-.4.3-.7.3M13 18H7c-.3 0-.5-.1-.7-.3S6 17.3 6 17s.1-.5.3-.7.4-.3.7-.3h6c.3 0 .5.1.7.3s.3.4.3.7-.1.5-.3.7-.4.3-.7.3M8 2h8v7c0 .3-.1.5-.3.7s-.4.3-.7.3c-.2 0-.5-.1-.5-.1L12 8.5 9.5 9.9s-.3.1-.5.1-.3 0-.5-.1-.3-.2-.4-.4S8 9 8 9z"
    />
  </Svg>
);
export default SvgOrdersIcon;
