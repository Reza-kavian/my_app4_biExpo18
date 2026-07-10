//my-app/App.tsx   ////zare_nk_050411_okk(1)
import React, { useEffect, useState } from "react";
import { Alert, Linking } from "react-native";   ////zare_nk_050419_nokteh(Linking ke betoonim az in apk be  biroon(masalan site ha) dar moroorgar hedayat konim)
import AsyncStorage from "@react-native-async-storage/async-storage";
import DeviceInfo from "react-native-device-info";
import AppNavigator from "./src/navigation/AppNavigator";
import { lightTheme, darkTheme } from "./src/constants/theme";
import { ThemeContext } from "./src/context/ThemeContext";

import { NavigationContainer } from "@react-navigation/native";
////zare_nk_040928_added_st(ijade DeepLinking baraye modiriate inke age az biroon(masalan site ha) dar moroorgar link konim be in apk)
const navigationLinking = {
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
////zare_nk_040928_added_end(ijade DeepLinking baraye modiriate inke age az biroon(masalan site ha) dar moroorgar link konim be in apk)

// 🔑 کلید ذخیره آخرین ورژن دیده‌شده
const LAST_SEEN_VERSION_KEY = "last_seen_version";

// 🌐 آدرس API بررسی نسخه
const VERSION_CHECK_URL = "https://your-domain.com/api/app-version";  ////zare_nk_050419_added(baraye downloade noskheye jadid)

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

////zare_nk_050419_added_st(baraye downloade noskheye jadid)
// مقایسه نسخه‌ها
// مثال:
// compareVersions("1.0.6","1.0.5") => true
const isNewerVersion = (
  latestVersion: string,
  currentVersion: string
) => {

  const latest = latestVersion.split(".").map(Number);
  const current = currentVersion.split(".").map(Number);

  for (let i = 0; i < Math.max(latest.length, current.length); i++) {

    const l = latest[i] || 0;
    const c = current[i] || 0;

    if (l > c) return true;
    if (l < c) return false;
  }
  return false;
};
////zare_nk_050419_added_end(baraye downloade noskheye jadid)

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

    ////zare_nk_050419_added_st(baraye downloade noskheye jadid)
    // بررسی وجود نسخه جدید از سرور
    const checkLatestVersion = async () => {
      try {
        const currentVersion = DeviceInfo.getVersion();
        const response = await fetch(VERSION_CHECK_URL);

        if (!response.ok) {
          return;
        }

        const data = await response.json();
        /* نمونه پاسخ API:
          {
            latestVersion:"1.0.6",
            forceUpdate:false,
            downloadUrl:"https://..."
          } */
        if (data.latestVersion && isNewerVersion(data.latestVersion, currentVersion)) {
          // اگر آپدیت اجباری باشد
          if (data.forceUpdate === true) {
            Alert.alert("نیاز به بروزرسانی",
              `نسخه جدید ${data.latestVersion} منتشر شده است.\n\nبرای ادامه استفاده از برنامه، لطفاً نسخه جدید را نصب کنید.`,
              [{
                text: "آپدیت", onPress: async () => {
                  try {
                    if (data.downloadUrl) {
                      await Linking.openURL(
                        data.downloadUrl
                      );
                    }
                  } catch (e) {
                    console.log(
                      "Open download url error:",
                      e
                    );
                  }
                }
              }],
              {
                cancelable: false ////zare_nk_040519_nokteh(baes mishe karbar natooneh alert ro bebandeh(che ba clicke biroone modal va che ba clicke backe gooshish))
              }
            );
          }
          // اگر آپدیت اختیاری باشد
          else {
            Alert.alert("نسخه جدید موجود است",
              `نسخه ${data.latestVersion} منتشر شده است.\n\nآیا مایل به دریافت نسخه جدید هستید؟`,
              [{ text: "بعداً" },
              {
                text: "دانلود", onPress: async () => {
                  try {
                    if (data.downloadUrl) {
                      await Linking.openURL(
                        data.downloadUrl
                      );
                    }
                  } catch (e) {
                    console.log(
                      "Open download url error:",
                      e
                    );
                  }
                }
              }]
            );
          }
        }
      } catch (e) {

        console.log(
          "Update check error:",
          e
        );

      }
    };

    checkLatestVersion();
    ////zare_nk_050419_added_end(baraye downloade noskheye jadid)

  }, []);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, theme }}>
      <NavigationContainer linking={navigationLinking}>
        <AppNavigator />
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}