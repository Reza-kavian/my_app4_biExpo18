//my-app/App.tsx   ////zare_nk_050428_okk(1)
import React, { useEffect, useState } from "react";
import { Alert, Linking } from "react-native";   ////zare_nk_050419_nokteh(Linking ke betoonim az in apk be  biroon(masalan site ha) dar moroorgar hedayat konim)
import AsyncStorage from "@react-native-async-storage/async-storage";
import DeviceInfo from "react-native-device-info";
import AppNavigator from "./src/navigation/AppNavigator";
import { lightTheme, darkTheme } from "./src/constants/theme";
import { ThemeContext } from "./src/context/ThemeContext";

import { NavigationContainer } from "@react-navigation/native";

import { NextJsApiUrl, NextJsApiAuthUrl } from "./src/constants/Urls";
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
// const VERSION_CHECK_URL = "https://your-domain.com/api/app-version";  ////zare_nk_050419_added(baraye downloade noskheye jadid)

// 📝 متن تغییرات هر نسخه
const CHANGELOG: Record<string, string[]> = {
  // "1.0.0": [
  //   "✅ رفع مشکل اعتبارسنجی توکن",
  //   "🚀 بهبود سرعت اجرای برنامه",
  // ],
  // "1.0.1": [
  //   "✨ اضافه شدن اسکنر جدید",
  //   "🐞 رفع چند باگ جزئی",
  //   "✅ رفع مشکل اعتبارسنجی ورود به سیستم",
  //   "✅ رفع مشکل ها",
  // ], 
  "1.0.0": [
    // `رفع باگ${"\u200C"}های گزارش${"\u200C"}شده`,  ////zare_k_050420_nokteh(ijade nimSpace ba {"\u200C"})
    `رفع باگ‌های گزارش‌شده`,  ////zare_k_050420_nokteh(ijade nimSpace ba feshordane kelid haye tarkibiye Ctrl + Shift + 2)
    "بهبود سرعت اجرای برنامه",
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
        ////zare_nk_050420_nokteh_st(in sharte currentVersion=='1.0.0' ra basteh be saligham baraye versione 1.0.0(avvalin verion) comment mikonam ya uncomment)
        // if(currentVersion=='1.0.0'){
        //     console.log('zare_nk_050420_avvlin versione ke,emkanate jadid nemikhad');
        //     return;
        // }
        ////zare_nk_050420_nokteh_end(in sharte currentVersion=='1.0.0' ra basteh be saligham baraye versione 1.0.0(avvalin verion) comment mikonam ya uncomment)
        const lastSeenVersion = await AsyncStorage.getItem(LAST_SEEN_VERSION_KEY);

        console.log('050420-lastSeenVersion: ' + lastSeenVersion + '-currentVersion: ' + currentVersion);
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
      console.log('zare_nk_050420-checkLatestVersion called!');
      // var urlInsertToSabad = 'https://testotmapi.sarinmehr.com/api/v1/Hyper/Api_getAppVersion';
      var urlInsertToSabad = NextJsApiUrl + "Api_getAppVersion";
      try {
        const currentVersion = DeviceInfo.getVersion();
        const currentVersionCode = Number(DeviceInfo.getBuildNumber());  ////zare_nk_050423_added(chon getBuildNumber string barmigardooneh man be adad tabdilesh kardam)

        // const response = await fetch(VERSION_CHECK_URL);
        const response = await fetch(urlInsertToSabad, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: "Bearer " + token,     /////zare_nk_050325_commented(chon in api niazi be online boodan nadareh)
          },
          body: JSON.stringify({}),
          // credentials: "include", //zare_nk_040402_commented
        });
        console.log('zare_nk_050420-inja!');
        if (response.ok) {
          console.log('zare_nk_050420-response.status is ok- is: ' + response.status +
            '-response.statusText: ' + response.statusText + '-response: ' + JSON.stringify(response));
          const data = await response.json();
          console.log('zare_nk_050420-inja');
          var result = data;
          if (result.status != 0) {
            console.log('zare_nk_050420-response.status  ok- is: ' + response.status);
            // setIsOpenedMymodalForWarning(true);
            // setWarningTextInMymodalForWarning(result.message);
            // // const bootstrap = await getBootstrap();
            // // const mymodalForWarning = new bootstrap.Modal(
            // //     document.getElementById("mymodalForWarning")
            // // );
            // // mymodalForWarning.show();
            // // const span = document.querySelector(
            // //     "#mymodalForWarning .modal-body span"
            // // );
            // // if (span instanceof HTMLElement) {
            // //     span.innerText = result.message;
            // // }
            return;
          }
          if (result.data.list == undefined) {
            console.log("050325-getIdShobeFrom-result.data.list == undefined");
            // setIsOpenedMymodalForWarning(true);
            // setWarningTextInMymodalForWarning(() => {
            //   return (
            //     result.message.length == 0
            //       ? "شما خارج از محدوده فروشگاه هستید"
            //       : result.message + '-شما خارج از محدوده فروشگاه هستید'
            //   )
            // }); 
            return;
          }
          var parsedList = JSON.parse(result.data.list);
          if (parsedList.length == 0) {
            console.log("050325-getIdShobeFrom-parsedList.length == 0");
            // setIsOpenedMymodalForWarning(true);
            // setWarningTextInMymodalForWarning('شما خارج از محدوده فروشگاه هستید');
            // await AsyncStorage.removeItem("currentLocation");   ////zare_nk_050415_added
            return;
          }
          /* نمونه پاسخ API:
            {
              latestVersion:"1.0.6",
              "latestVersionCode":2,  ////zare_nk_050423_added
              forceUpdate:false,
              downloadUrl:"https://..."
            } */
          ////zare_nk_050423_added_st
          const item = parsedList[0];

          if (item == null) {
            console.log("No version information received.");
            return;
          }
          const latestVersion = item.latestVersion;
          // const latestVersionCode = Number(parsedList[0].latestVersionCode);
          const latestVersionCodeRaw = item.latestVersionCode;

          if (
            typeof latestVersion !== "string" ||
            latestVersion.trim() === "" ||
            latestVersionCodeRaw == null ||   ////zare_nk_050428_nokteh(chon null isNaN nist joda neveshtim(masalan undefined isNaN hast va dar sherte paein migonjeh))
            isNaN(Number(latestVersionCodeRaw))
          ) {
            console.log("Invalid version info from server.");
            return;
          }
          const latestVersionCode = Number(latestVersionCodeRaw);

          const hasNewVersion =
            latestVersionCode > currentVersionCode &&
            isNewerVersion(latestVersion, currentVersion);
          if (hasNewVersion) {
            ////zare_nk_050423_added_end
            // if (parsedList[0].latestVersion && isNewerVersion(parsedList[0].latestVersion, currentVersion)) {  ////zare_nk_050423_commented
            console.log('zare_nk_050420-niaz be update hast');
            // اگر آپدیت اجباری باشد
            if (item.forceUpdate === true) {
              console.log('zare_nk_050420-niaz be update hast-ejbari');
              Alert.alert("نیاز به بروزرسانی",
                `برای ادامه استفاده از برنامه، لطفاً نسخه جدید ${item.latestVersion} را نصب کنید.`,
                [{
                  text: "آپدیت", onPress: async () => {
                    try {
                      if (item.downloadUrl) {
                        await Linking.openURL(
                          item.downloadUrl
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
              console.log('zare_nk_050420-niaz be update hast-gheire ejbari');
              Alert.alert(`نسخه جدید ${item.latestVersion} موجود است`,
                `آیا مایل به دریافت نسخه جدید هستید؟`,
                [{ text: "بعداً" },
                {
                  text: "دانلود", onPress: async () => {
                    try {
                      if (item.downloadUrl) {
                        await Linking.openURL(
                          item.downloadUrl
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
          else {
            console.log('zare_nk_050420-niaz be update nist');
          }
        }
        else {
          console.log('zare_nk_050420-response.status not ok- is: ' + response.status +
            '-response.statusText: ' + response.statusText + '-response: ' + JSON.stringify(response));
          if (response.status == 401) {
            console.log('zare_nk_050420-response.status not ok-response.status == 401: ' + response.status);
            // setIsOpenedMymodalForWarning(true);
            // setWarningTextInMymodalForWarning("لطفا ابتدا وارد حساب کاربری شوید");
          }
          else {
            console.log('zare_nk_050420-response.status not ok-response.status != 401: ' + response.status);
            // setIsOpenedMymodalForWarning(true);
            // setWarningTextInMymodalForWarning("ارتباط با سرور برقرار نشد");
          }
        }
      } catch (e) {
        console.log("zare_nk_050420-catch-error:", e);
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