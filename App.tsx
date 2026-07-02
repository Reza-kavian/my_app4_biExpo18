//my-app/App.tsx   ////zare_nk_050411_okk(1)
import React, { useEffect, useState } from "react";
import { Alert } from "react-native"; 
import AsyncStorage from "@react-native-async-storage/async-storage";  
import DeviceInfo from "react-native-device-info"; 
import AppNavigator from "./src/navigation/AppNavigator";
import { lightTheme, darkTheme } from "./src/constants/theme";
import { ThemeContext } from "./src/context/ThemeContext";

// import { Linking } from "react-native";  //zare_nk_040604_nokteh(age az ghabeliate react-native bekhaim estefadeh konim)
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

// 🔑 کلید ذخیره آخرین ورژن دیده‌شده
const LAST_SEEN_VERSION_KEY = "last_seen_version";
// 📝 متن تغییرات هر نسخه
const CHANGELOG: Record<string, string[]> = {
  "1.0.4": [
    "✅ رفع مشکل اعتبارسنجی توکن",
    "🚀 بهبود سرعت اجرای برنامه",
  ], 
  "1.0.5": [
    "✨ اضافه شدن اسکنر جدید",
    "🐞 رفع چند باگ جزئی",
    "✅ رفع مشکل اعتبارسنجی ورود به سیستم",
    "✅ رفع مشکل ها",
  ],
};

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => setIsDark((prev) => !prev);
  const theme = isDark ? darkTheme : lightTheme;

  useEffect(() => {
    const checkVersionAndShowChangelog = async () => {
      try {
        const currentVersion = DeviceInfo.getVersion(); 
        const lastSeenVersion = await AsyncStorage.getItem(
          LAST_SEEN_VERSION_KEY
        );

        if (lastSeenVersion !== currentVersion) {
          const changes = CHANGELOG[currentVersion];

          if (changes && changes.length > 0) {
            Alert.alert(
              "تغییرات نسخه جدید",
              changes.map((c) => `• ${c}`).join("\n"),
              [{ text: "باشه" }]
            );
          }

          await AsyncStorage.setItem(
            LAST_SEEN_VERSION_KEY,
            currentVersion
          );
        }
      } catch (e) {
        console.log("Version check error:", e);
      }
    };

    checkVersionAndShowChangelog();
  }, []);
  
  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, theme }}> 
      <NavigationContainer linking={linking}>
        <AppNavigator />
      </NavigationContainer> 
    </ThemeContext.Provider>
  );
}