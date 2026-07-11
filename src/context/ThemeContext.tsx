//my-app/src/context/ThemeContext    //zare_nk_050420_okk(1)
import { createContext } from 'react';
import { lightTheme } from '../constants/theme';

export const ThemeContext = createContext({  
  isDark: false,
  toggleTheme: () => { },
  theme: lightTheme,
});