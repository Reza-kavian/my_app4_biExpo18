//my-app/App.tsx   //zare_nk_041004_okk
import { useState } from "react"; 
import AppNavigator from "./src/navigation/AppNavigator";
import { lightTheme, darkTheme } from "./src/constants/theme";
import { ThemeContext } from "./src/context/ThemeContext";

// import * as Linking from "expo-linking"; //zare_nk_040604_nokteh(age az ghabeliate ezafiye expo bekhaim estefadeh konim)
// import { Linking } from "react-native";  //zare_nk_040604_nokteh(age az ghabeliate mamoolitare react-native bekhaim estefadeh konim)
import { NavigationContainer } from "@react-navigation/native";
////zare_nk_040928_added_st(ijade Deep Linking ke az biroon masalan site ha dar moroorgar link konim be in apk)
const linking = {
  prefixes: ["myapp://"], // همون scheme که در app.json تعریف کردی
  config: {
    screens: {
      AuthCallback: "auth/callback", // my-app://auth/callback  // اینجا وارد AuthCallbackScreen میشه
      Welcome: "welcome", // my-app://welcome
      Splash: "splash", // اگه لازم داری
      Profile: "profile", // اگه لازم داری
      Login: "login", // my-app://login
      Scanner: "scanner", // my-app://scanner  //zare_nk_040926_added
      Home: "home", // my-app://home  //zare_nk__040926_added
    },
  },
};
////zare_nk_040928_added_end(ijade Deep Linking ke az biroon masalan site ha dar moroorgar link konim be in apk)

export default function App() {
  // 🔹 مدیریت تم
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => setIsDark((prev) => !prev);
  const theme = isDark ? darkTheme : lightTheme;
  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, theme }}>
      <NavigationContainer linking={linking}>
        <AppNavigator />
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}