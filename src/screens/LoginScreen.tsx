//my-app/src/screens/LoginScreen.tsx   //zare_nk_041124_okk
import React, { useRef, useState, useEffect } from "react";
import {
  View, Text, Image, TouchableOpacity, StyleSheet, ViewStyle, TextStyle, Alert, TextInput, Button,
  useWindowDimensions, //zare_nk_041126_added(moadele @media baraye responsive kardane site)
  StyleProp, Modal, Linking,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";
import ReusableButton from "../components/ReusableButton";
import { NextJsApiUrl, NextJsApiAuthUrl } from "../constants/Urls";
//zare_nk_040530_commented_st(rahe1)
// import { useNavigation } from "@react-navigation/native";
// import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
// type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Login">;
// export default function LoginScreen() {
//const navigation = useNavigation<NavigationProp>();
//zare_nk_040530_commented_end(rahe1)

//zare_nk_040530_added_st(rahe2-baraye masalan SplashScreen va tamame safahate dige ham karbord dare-parameterhaye voroodi ra barname automat az React Navigation migire)
import type { RootStackParamList } from "../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<RootStackParamList, "Login">;
export default function LoginScreen({
  navigation,
}: // back,  //zare_nk_040530(ekhtiariye va chon azash estefadeh nakardim commentent kardim)
  // route, //zare_nk_040530(ekhtiariye va chon azash estefadeh nakardim commentent kardim)
  // options, //zare_nk_040530(ekhtiariye va chon azash estefadeh nakardim commentent kardim)
  Props) {
  //zare_nk_040530_added_end(rahe2-baraye masalan SplashScreen va tamame safahate dige ham karbord dare-parameterhaye voroodi ra barname automat az React Navigation migire)
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [step, setStep] = useState<"firstPage" | "secondPage">("firstPage"); //zare_nk_040531_nokteh(state ke nobate kodoom safhe ast ra negah midareh)
  const [mobileVal, setMobileVal] = useState(""); //zare_nk_040531_nokteh(state ke shomaremobile varedeh ra negah midareh)
  const [smsVal, setSmsVal] = useState(""); //zare_nk_040531_nokteh(state ke sms varedeh ra negah midareh)
  const [error, setError] = useState<string | null>(null); //zare_nk_040531_nokteh(state ke errore formate varedeye mobile ra negah midareh)
  const [smsError, setSmsError] = useState<string | null>(null); //zare_nk_040531_nokteh(state ke errore formate varedeye sms ra negah midareh)
  const [isDisabledMobileCheckBtn, setIsDisabledMobileCheckBtn] = //zare_nk_040531_nokteh(state ke disable ya enable boodane dokmeye MobileCheckBtn ra negah midareh)
    useState(false);
  const [isDisabledCheckSmsBtn, setIsDisabledCheckSmsBtn] = useState(false); //zare_nk_040531_nokteh(state ke disable ya enable boodane dokmeye CheckSmsBtn ra negah midareh)
  const [isDisabledResendCode, setIsDisabledResendCode] = useState(true); //zare_nk_040531_nokteh(state ke disable ya enable boodane dokmeye ResendCode ra negah midareh)
  const [isDisabledRemovTimerBtn, setIsDisabledRemovTimerBtn] = useState(true); //zare_nk_040531_nokteh(state ke disable ya enable boodane dokmeye RemovTimerBtn ra negah midareh)
  // const [timer, setTimer] = useState(40000);  //zare_nk_040431_commented
  const [timer, setTimer] = useState(0); //zare_nk_040431_added    //zare_nk_040531_nokteh(state ke meghdare timer ra negah midareh)
  // const [removTimer, setRemovTimer] = useState(false); //zare_nk_040531_nokteh(state ke hazf kardane timer ya reset nakardanesh dar rendere jari ra negah midareh)  //zare_nk_041020_commented(bejash setTimmer(0) lahaz shod)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null); //zare_nk_040531_nokteh(useRef ke baraye modiriate timer estefadeh mishe)
  console.log('zare_nk_041020_LoginScreen called!!');
  ////zare_nk_041020_commented_st
  // useEffect(() => {   //0021
  //   //zare_nk_040531_nokteh(dar har render age nobate safhe tagheir kard va meghdaresh secondPage bood dokmeye ResendCode disable bashe va dokmeye RemovTimerBtn enable bashe,chon timer be 4000 refresh mishe va ta sefr shodan nabayad darkhaste mojadade ersale code dad)
  //   if (step === "secondPage") {
  //     // setTimer(40000);  //zare_nk_040431_commented(bordim be dastoore 0010 ta az rendere ezafi jologiri beshe,ye bar setStep("secondPage") baese render shod
  //     // ,setTimer(40000) ke inja bashe mojebe rendere mojadade component mishe,pas behtere setTimer(40000) dar kenare setStep("secondPage") gharar begire,yani hamoon dstoore 0010)
  //     setIsDisabledResendCode(true);
  //     setIsDisabledRemovTimerBtn(false);
  //   }
  // }, [step]);
  ////zare_nk_041020_commented_end

  useEffect(() => {
    ////zare_nk_041020_added_st
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    ////zare_nk_041020_added_end
    // if (step !== "secondPage") return;    //zare_nk_041020_commented
    //zare_nk_041020_added_st
    if (step !== "secondPage") {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    setIsDisabledResendCode(true);   //zare_nk_041020_added(az useEffecte 0021 hazf shodan)
    setIsDisabledRemovTimerBtn(false);   //zare_nk_041020_added(az useEffecte 0021 hazf shodan)

    //zare_nk_041020_added_end
    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        // if (removTimer || prev <= 0) {  //zare_nk_041020_commented
        if (prev <= 0) {   //zare_nk_041020_added
          // if (intervalRef.current) clearInterval(intervalRef.current);  //zare_nk_041020_added(and commented(chon age Interval dar cpu bemooneh kheili kond nemikoneh va 
          // midoonim aslan rabti be reRender shodane component nadare, khodesham dar entehaye useEfffect clearInterval gozashtim va age az safhe berim hazf mishe))
          // Alert.alert('removTimer || prev <= 0000');  //zare_nk_041020_commented
          // Alert.alert('prev <= 0');  //zare_nk_041020_added
          setIsDisabledResendCode(false);
          setIsDisabledRemovTimerBtn(true);
          // setRemovTimer(false); //zare_nk_041020_commented
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      //zare_nk_040530_commented(molahezeh mishe ke dar har render bayad dar entehaye useEffect intervalRef.current ra hazf konim,
      // bekhatere mahiate intervalRef ke meghdare jadid ke begire meghdare ghadimesh az pardazeshe cpu hazf nemishe va amal mikoneh
      // va dar renderhaye mokhtalef ba anboohi az maghadire intervalRef movajeh mishavim ke har kodoom timer ra meghdardehi mikonan va ba ham tadakhol khahand dasht )
    };
    // }, [removTimer, timer]);//zare_nk_041020_commented(mani nadare timer taghir kard in useEffect seda zadeh beshe ke toosh dobare setTimer darim, va removTimer ke kollan hazf shod)
  }, [step]);//zare_nk_041020_added(dakhele useEffect ham goftim: step secondPage shod interval ijad va firstPage shod interval hazf mikonim) 

  const mobileButtonClick = async () => {
    if (!/^09\d{9}$/.test(mobileVal)) {
      setError("شماره موبایل معتبر نیست");
      return;
    }
    try {
      setIsDisabledMobileCheckBtn(true);
      const response = await axios.post(NextJsApiUrl + "User/Api_LoginUser1", { mobile: mobileVal });   //zare_nk_041114_added
      const data = await response.data;
      if (response.status == 200) {
        console.log("zare_nk_040218-data: " + JSON.stringify(data) + '-response.status: ' + response.status);
        //zare_nk_040218-data: {"status":0,"message":"","data":1,"errors":[]}-response.status: 200
        //zare_nk_040218-data: {"status":-1,"message":"","data":null,"errors":[]}-response.status: 200
        //zare_nk_040218-data: {"status":-2,"message":"","data":null,"errors":["کاربر یافت نشد"]}-response.status: 200
        if (data.status == 0) {
          setStep("secondPage");
          setTimer(40000); //zare_nk_040431_added(dastoore 0010)
          setError(null);
        } else {
          await AsyncStorage.removeItem("token");
          setError(data.errors || "خطا در ارسال شماره موبایل");
          //zare_nk_040218-data: {"status":-2,"message":"","data":1,"errors":["6 ثانیه ی دیگر مجددا تلاش کنید"]}
        }
      } else {
        await AsyncStorage.removeItem("token");
        setError("متاسفانه خطایی رخ داده است");
      }
    } catch (error) {
      await AsyncStorage.removeItem("token");
      console.error("zare_nk_040218-resendcode-in catch:", error);
      if (error instanceof Error) {
        console.error("zare_nk_040218-resendcode-in catch-2:", error.message);
        setError("متاسفانه خطایی رخ داده است222:" + error.message);
      } else {
        console.error("zare_nk_040218-resendcode-in catch-3:", String(error));
        setError("متاسفانه خطایی رخ داده است333:" + String(error));
      }
    } finally {
      setIsDisabledMobileCheckBtn(false);
    }
  };

  const checkSmsForLogin = async () => {
    if (!smsVal || smsVal.length < 4) {
      await AsyncStorage.removeItem("token");
      setSmsError("کد وارد شده معتبر نیست");
      return;
    }
    try {
      setIsDisabledCheckSmsBtn(true);
      const res = await axios.post(NextJsApiUrl + "User/Api_LoginUser2", {
        mobile: mobileVal,
        smsCode: smsVal,
        Password: ""
      });
      console.log("040530-01");
      const ApiLoginUser2Result = res.data; // await res.json();
      console.log("040530-02");
      console.log("040530-03-ApiLoginUser2Result: " + ApiLoginUser2Result);
      console.log(
        "040530-03-JSON.stringify(ApiLoginUser2Result): " +
        JSON.stringify(ApiLoginUser2Result)
      );
      //zare_nk_0409225_alan
      //040530-03-JSON.stringify(ApiLoginUser2Result): {"status":-9,"message":"","data":null,"errors":["کد پیامکی وارد شده اشتباه است"]}
      //040530-03-JSON.stringify(ApiLoginUser2Result): {"status":-11,"message":"","data":null,"errors":["کد ورود شما منقضی شده است. لطفا مجددا درخواست کد پیامکی کنید"]}
      //040530-03-JSON.stringify(ApiLoginUser2Result): {"status":0,"message":"",
      // "data":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIwMTA5IiwiQ29kZU1vc2h0YXJpIjoiMjAxMDkiLCJNb2JpbGUiOiI5MzUxMDkxMjg3IiwiTmFtZU1vc2h0YXJpIjoiIiwibmJmIjoxNzY1ODgxNDczLCJleHAiOjE3NjY0ODYyNzMsImlhdCI6MTc2NTg4MTQ3M30.JTsMQ1DO0C7QEWw90eElmaSSFVGxtpf52xG9dgsp7BA"}
      // ,"errors":[]}
      // if (res.status === 200) {
      if (res.status === 200 && ApiLoginUser2Result.status == 0) {
        // if (ApiLoginUser2Result.status == 0) {
        let token = ApiLoginUser2Result.data.token;
        console.log("040530-03-token: " + token);
        //040530-03-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIwMTA5IiwiQ29kZU1vc2h0YXJpIjoiMjAxMDkiLCJNb2JpbGUiOiI5MzUxMDkxMjg3IiwiTmFtZU1vc2h0YXJpIjoiIiwibmJmIjoxNzY1ODgxNDczLCJleHAiOjE3NjY0ODYyNzMsImlhdCI6MTc2NTg4MTQ3M30.JTsMQ1DO0C7QEWw90eElmaSSFVGxtpf52xG9dgsp7BA
        // try {
        const response = await fetch(NextJsApiAuthUrl + "verifyToken", {
          ////zare_nk_040428_added_nokteh(dar reactnative ke kollan samte client hast code samte server ke behesh api bezanim nadarin 
          // pas masire verifyToken bayad dar yek projeye dige mesle nextjs ya .net core bayad bashe va az reactnative faghat behesh api bezanim)
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        console.log("040530-1");
        const data = await response.json();
        console.log("040928-a-1-response: " + response);
        console.log("040928-a-2-JSON response: " + JSON.stringify(response));
        console.log("040928-a-3-data: " + JSON.stringify(data));
        if (response.status === 200) { // YA if (response.ok) {  zare_nk_040928_updated(response.status==2xx mesle 204 ya 209 dar response.ok lahaz mishavand vali man chon hamvareh dar pasokhe movafagh data daram pas hamvareh dar 2xx man 200 darmam)
          //// 1. ذخیره توکن به همراه زمان انقضا (مثلاً 1 ساعت بعد)
          const expires = new Date(
            Date.now() + 1 * 60 * 1000
          ).toISOString();
          // const expires =data.decoded.exp;  //zare_nk_040219-nokteh(zamane monghazi ra az dadeye parsafar taein kardam)
          let tokenni = await AsyncStorage.getItem("token");  //zare_nk_040925_added_pakkardani
          console.log("0-zare_nk_040925-tokenni is: " + tokenni);//zare_nk_040925_added_pakkardani
          await AsyncStorage.setItem("token", token); //moadele cooki dar reactnative ast 
          await AsyncStorage.setItem("token_expires", expires);
          tokenni = await AsyncStorage.getItem("token");//zare_nk_040925_added_pakkardani
          console.log("1-zare_nk_041009-tokenni is: " + tokenni);//zare_nk_040925_added_pakkardani
          //// 2. گرفتن مسیر ریدایرکت (اگر از قبل ذخیره کرده باشی)
          //   const redirect =
          //     (await AsyncStorage.getItem("redirect")) || "Home";

          const validRoutes = [
            "Login",
            "Profile",
            "Splash",
            "Welcome",
          ] as const;

          type RouteName = (typeof validRoutes)[number]; //number yani har kodoom az andis haye in araye,darvaghe har kodoom az 4 khooneye araye

          const redirectRaw = await AsyncStorage.getItem("redirect");

          const redirect = validRoutes.includes(redirectRaw as RouteName)
            ? (redirectRaw as RouteName)
            : "Welcome"; // یا هر صفحه‌ای که بخوای پیش‌فرض باشه

          // 3. حذف مسیر redirect از AsyncStorage
          await AsyncStorage.removeItem("redirect");

          // 4. هدایت به مسیر redirect
          navigation.replace(redirect); // نیازمند useNavigation از React Navigation
        } else {
          console.log("❌ verifyToken failed");
          setSmsError("خطا در ورود با کد تایید");  //zare_nk_040926_added
          await AsyncStorage.removeItem("token");
          Alert.alert("❌ verifyToken failed");
        }
        // } catch (error) {
        //   alert("catch in checkSmsForLogin-AsyncStorage.removeItem('token')");
        //   console.error("❌ خطا در JWT:", error);  //[TypeError: "tokenni" is read-only]
        //   await AsyncStorage.removeItem("token"); //zare_nk_040429_added
        //   setError("متاسفانه خطایی رخ داده است999:" + error);
        // }
        // } else {  //ok2
        //   alert(
        //     "data.status != 0 in checkSmsForLogin-AsyncStorage.removeItem('token')"
        //   );
        //   await AsyncStorage.removeItem("token"); //zare_nk_040429_added 
        //   setError("متاسفانه خطایی رخ داده است34:eeee" + ApiLoginUser2Result.errors[0]);    //zare_nk_040925_updated 
        // }
      } else {
        Alert.alert(
          "res.status !== 200 or data.status != 0  in checkSmsForLogin-AsyncStorage.removeItem('token')"
        );
        console.log("zare_nk_040218-!!response.ok");
        await AsyncStorage.removeItem("token");
        setError(ApiLoginUser2Result.errors ? ApiLoginUser2Result.errors[0] : "متاسفانه خطایی رخ داده است34:eeee");
      }

      ////zare_nk_040428_added_end
    } catch (err: any) {
      Alert.alert(
        "second catch in checkSmsForLogin-AsyncStorage.removeItem('token')-err: " + err
      );
      console.log(
        "second catch in checkSmsForLogin-AsyncStorage.removeItem('token')-err: " + err
      );
      await AsyncStorage.removeItem("token");
      setSmsError(err.response?.data?.message || "خطا در ورود با کد تایید");
    } finally {
      setIsDisabledCheckSmsBtn(false);
    }
  };

  const ResendCodefunc = async () => {
    try {
      setIsDisabledResendCode(true);
      setIsDisabledRemovTimerBtn(false);
      const response = await axios.post(NextJsApiUrl + "User/Api_LoginUser1", { mobile: mobileVal });
      const data = await response.data;
      if (response.status == 200) {
        console.log("zare_nk_040218-data: " + JSON.stringify(data) + '-response.status: ' + response.status);
        //zare_nk_040218-data: {"status":0,"message":"","data":1,"errors":[]}-response.status: 200
        //zare_nk_040218-data: {"status":-1,"message":"","data":null,"errors":[]}-response.status: 200
        //zare_nk_040218-data: {"status":-2,"message":"","data":null,"errors":["کاربر یافت نشد"]}-response.status: 200
        if (data.status == 0) {
          setTimer(40000);
          setError(null);
        } else {
          setError(data.errors || "خطا در ارسال شماره موبایل");
          //zare_nk_040218-data: {"status":-2,"message":"","data":1,"errors":["6 ثانیه ی دیگر مجددا تلاش کنید"]}
        }
      } else {
        setError("متاسفانه خطایی رخ داده است");
      }
    } catch (error) {
      console.error("zare_nk_040218-resendcode-in catch:", error);
      if (error instanceof Error) {
        console.error("zare_nk_040218-resendcode-in catch-2:", error.message);
        setError("متاسفانه خطایی رخ داده است222:" + error.message);
      } else {
        console.error("zare_nk_040218-resendcode-in catch-3:", String(error));
        setError("متاسفانه خطایی رخ داده است333:" + String(error));
      }
    } finally {
      setIsDisabledResendCode(false);
    }
  };

  const getQueryParam = (url: string, key: string) => {
    const match = url.match(new RegExp(`[?&]${key}=([^&]+)`));
    return match ? decodeURIComponent(match[1]) : null;
  };

  ////zare_nk_040603_added_st(rahe1)
  useEffect(() => {
    const subscription = Linking.addListener("url", async ({ url }) => { //zare_nk_041007_nokteh(yani harvaght appe man ba yek linke khareji baz 
      // shod in tabe ro ejra kon(android in link ro motevajjeh mishe va dar in tabe be ma mideh,masalan myapp://auth/callback?token=eyJhbGciOiJIUzI1...))
      // const token = new URL(url).searchParams.get("token");  //zare_nk_040926_commented
      const token = getQueryParam(url, "token");
      Alert.alert('useEffect called!!-token: ' + token);
      if (token) {
        Alert.alert('useEffect called!!-040603_JWT: ' + token);
        ////zare_nk_040929_added_st
        const expires = new Date(
          Date.now() + 1 * 60 * 1000
        ).toISOString();
        ////zare_nk_040929_added_end
        console.log("040603_JWT:", token);
        // ذخیره توکن در AsyncStorage یا state
        await AsyncStorage.setItem("token", token);
        ///////////////////////////////////zare_nk_040929_added_st
        await AsyncStorage.setItem("token_expires", expires);

        const validRoutes = [
          "Login",
          "Profile",
          "Splash",
          "Welcome",
        ] as const;

        type RouteName = (typeof validRoutes)[number]; //number yani har kodoom az andis haye in araye,darvaghe har kodoom az 4 khooneye araye

        const redirectRaw = await AsyncStorage.getItem("redirect");
        Alert.alert('useEffect called!!-redirectRaw: ' + redirectRaw);
        const redirect = validRoutes.includes(redirectRaw as RouteName)
          ? (redirectRaw as RouteName)
          : "Welcome"; // یا هر صفحه‌ای که بخوای پیش‌فرض باشه
        Alert.alert('useEffect called!!-redirect: ' + redirect);
        // 3. حذف مسیر redirect از AsyncStorage
        await AsyncStorage.removeItem("redirect");

        // 4. هدایت به مسیر redirect
        navigation.replace(redirect); // نیازمند useNavigation از React Navigation
        ///////////////////////////////////zare_nk_040929_added_end
      }
      ////////////////////////////////////zare_nk_040929_added_st
      else {
        Alert.alert('useEffect called!!-token nadarim ke: ' + token);
        const error = getQueryParam(url, "error");
        if (error) {
          setError('khata dar ehraze hoviat ba google!: ' + error);
        }
      }
      ////////////////////////////////////zare_nk_040929_added_end
    });

    return () => {
      subscription.remove(); // پاک کردن listener هنگام unmount
    };
  }, []);
  ////zare_nk_040603_added_end(rahe1)
  ////zare_nk_040603_added_st(rahe2)
  // useEffect(() => {
  //   const handleDeepLink = (event: Linking.EventType) => {
  //     const url = event.url;
  //     const { queryParams } = Linking.parse(url);
  //     if (queryParams?.token) {
  //       console.log("JWT:", queryParams.token);
  //       // TODO: ذخیره توکن در AsyncStorage و انتقال کاربر
  //       navigation.navigate("Home");
  //     }
  //   };

  //   const subscription = Linking.addEventListener("url", handleDeepLink);
  //   return () => subscription.remove();
  // }, []);
  ////zare_nk_040603_added_end(rahe2)
  ////zare_nk_040603_added_st
  // const handleGoogleLogin = () => {
  //   alert("handleGoogleLogin");
  //   // window.location.href = `/api/auth/google`; // هدایت به گوگل  //zare_nk_040603_commented
  //   // window.location.href = `https://testotm.sarinmehr.com/api/auth/google`; //zare_nk_040603_added
  // };

  const handleGoogleLogin = async () => {
    // const url = "https://testotm.sarinmehr.com/api/auth/google?source=mobile";    //zare_nk_041002_commented 
    const url = "https://testotm.sarinmehr.com/api/auth/google/mobile";     //zare_nk_041002_added 
    // const url = "https://localhost:3000/api/auth/google?source=mobile";
    // const url = "https://192.168.3.226:3000/api/auth/google?source=mobile";
    ////zare_nk_040929_commented_st(canOpenURL baraye mailto: va tel: va geo: va myapp:// aali amal mikone vali baraye https:// bad amal mikone va be eshtebah false barmigardooneh!)
    // const supported = await Linking.canOpenURL(url);
    // if (supported) {
    //   // Alert.alert("001");
    //   await Linking.openURL(url);
    // } else {
    //   console.log("Can't open URL:", url);
    // }
    ////zare_nk_040929_commented_end(canOpenURL baraye mailto: va tel: va geo: va myapp:// aali amal mikone vali baraye https:// bad amal mikone va be eshtebah false barmigardooneh!)
    ////zare_nk_040929_added_end(monasebe https://)
    try {
      console.log("1212-verryyy Can open URL" + url);
      await Linking.openURL(url);
    } catch (e) {
      console.log("1212-Can't open URL" + url + '-cause error: ' + e);
    }
    ////zare_nk_040929_added_end(monasebe https://)
  };

  return (
    <View
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        // minHeight: "100vh",
        minHeight: "100%",
        alignItems: "center",
        backgroundColor: 'white',
      }}
    >
      <View
        // id="loginForm"
        // onSubmit={(event) => {
        //   event.preventDefault();
        // }}
        // className={`${Styles.loginForm} ${Styles.valueStyle}`}
        style={[styles.loginForm, styles.valueStyle]}
      >
        <View
          // className={Styles.formsRow}
          style={[styles.formsRow, { display: "flex", justifyContent: "center" }]}
        >
          {/* <img
            src="https://img.tochikala.com/Logo/photo14359415832-Copy.jpg"
            style={{ width: "55px" }}
            alt="کرفو"
          ></img> */}
          <Image
            source={{ uri: "https://img.tochikala.com/Logo/photo14359415832-Copy.jpg" }}
            style={{ width: 55 }}
          />
        </View>
        {/* {error && <Text style={styles.error}>{error}</Text>} */}
        {step === "firstPage" ? (
          <>
            <View
              // className={`${Styles.formsRow} ${Styles.titleStyle}`}
              style={[styles.formsRow]}
            >
              <Text style={[styles.titleStyle]}>ورود | ثبت نام</Text>
            </View>
            <View
              // className={`${Styles.lablAndInputCont}  `}
              style={[styles.lablAndInputCont, { marginBottom: 15 }]}
            >
              <Text style={{ marginLeft: 15, marginBottom: 10 }}>
                شماره تماس
              </Text>
              {/* <input
          style={{ textAlign: "center" }}
          className={Styles.txtBox}
          id="mobileTxt"
          value={mobileVal}
          onChange={mobileChanged}
          ref={(e) => {
            refForMobileInput.current[0] = e;
          }}
        /> */}
              <TextInput
                style={[styles.txtBox, { textAlign: "center" }]}
                placeholder="شماره موبایل"
                value={mobileVal}
                onChangeText={setMobileVal}
                keyboardType="phone-pad"
              />
            </View>

            {/* {mobileError && (
        <div className={`${Styles.formsRow} ${Styles.warningCont}`}>
          <span className="forErrorMobile error">{mobileError}</span>
        </div>
      )} */}
            {error && <Text style={styles.error}>{error}</Text>}
            {error && (
              <View
                // className={`${Styles.formsRow} ${Styles.warningCont}`}
                style={[styles.formsRow]}
              >
                <Text
                  // className="forErrorMobile error"
                  style={[styles.warningCont]}
                >{error}</Text>
              </View>
            )}

            <View
              // className={Styles.formsRow}
              style={[styles.formsRow]}
            >
              {/* <button
          ref={refForMobileCheckBtn}
          id="mobileCheckBtn"
          className={Styles.disabledBtn}
          onClick={mobileButtonClick}
          disabled={isDisabledMobileCheckBtn}
        >
          {children}
        </button> */}

              <TouchableOpacity
                onPress={mobileButtonClick}
                disabled={isDisabledMobileCheckBtn}
                style={[styles.disabledBtn]}
              >
                تایید
              </TouchableOpacity>


            </View>
            <View
              // className={Styles.formsRow}
              style={[styles.formsRow]}
            >
              <TouchableOpacity
                // type="button"
                // id="handleGoogleBtn"
                // className={Styles.btn}
                style={[styles.btn]}
                onPress={handleGoogleLogin}
                activeOpacity={0.1}
              >
                <Text> ورود با حساب گوگل</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <View
              // ref={refForTimerCont}
              // id="timermoveOpportunityCont"
              style={{
                // display: timerDisplay,
                flexDirection: "row",
              }}
            >
              <View
                // ref={refForTimer}
                // id="timermoveOpportunity"
                style={{ display: "flex", flexDirection: "row" }}
              >
                <Text style={{ marginTop: 15, color: "red" }}>
                  تایمر: {Math.floor(timer / 1000)} ثانیه
                </Text>
              </View>
            </View>

            <View
              //  className={Styles.formsRow}
              style={[styles.formsRow, { direction: "rtl" }]}
            >
              <TouchableOpacity
                // id="backToFirsPage"
                // className={`${Styles.BackBtn}  ${Styles.buttonHover}`}
                style={[styles.BackBtn]}
                onPress={() => setStep("firstPage")}
                activeOpacity={0.1}
              >
                <View
                  // className={`${Styles.BackImgCont} `}
                  style={[styles.BackImgCont]}
                >
                  {/* <img
                    src="https://img.tochikala.com/tochikala/back-icon-in-cardcontainer.svg"
                    style={{ width: "18px" }}
                    alt="بازگشت به صفحه شماره تماس"
                  /> */}
                  <Image
                    source={{ uri: "https://img.tochikala.com/tochikala/back-icon-in-cardcontainer.svg" }}
                    style={{ width: 18 }}
                  />
                </View>
                <View
                  // className={`${Styles.BackBtnTitleCont} `}
                  style={[styles.BackBtnTitleCont]}
                >
                  <Text>بازگشت</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View
              // className={`${Styles.formsRow}  ${Styles.darkFont}`}
              style={[styles.formsRow]}
            >
              <Text>کد تایید را وارد کنید</Text>
            </View>

            <View
              // className={`${Styles.lablAndInputCont}  `}
              style={[styles.lablAndInputCont, { marginBottom: 15 }]}
            >
              <Text style={{ marginLeft: 15, marginBottom: 10 }}>
                کد تایید
              </Text>
              {/* <input
          className={Styles.txtBox}
          id="smsValTxt"
          value={smsVal}
          onChange={smsTxtChanged}
          onKeyDown={smsTxtKeyDown}
          ref={(e) => {
            refForSmsInput.current[0] = e;
          }}
        /> */}
              <TextInput
                style={styles.txtBox}
                placeholder="کد تایید"
                value={smsVal}
                onChangeText={setSmsVal}
                keyboardType="numeric"
              />

            </View>

            {smsError && (
              <View
                //  className={`${Styles.formsRow} ${Styles.warningCont}`}
                style={[styles.formsRow]}
              >
                <Text
                  // className="forErrorMobile error"
                  style={[styles.warningCont]}
                >{smsError}</Text>
              </View>
            )}

            <View
              // className={Styles.formsRow}
              style={[styles.formsRow]}
            >
              {/* <button
          ref={refForCheckSmsBtn}
          className={Styles.disabledBtn}
          onClick={checkSmsForLogin}
          disabled={isDisabledCheckSmsBtn}
        >
          ورود
        </button> */}

              <TouchableOpacity
                // id="backToFirsPage"
                // className={`${Styles.BackBtn}  ${Styles.buttonHover}`}
                style={[styles.disabledBtn]}
                onPress={checkSmsForLogin}
                disabled={isDisabledCheckSmsBtn}
                activeOpacity={0.1}
              >
                <Text>ورود</Text>
              </TouchableOpacity>

            </View>

            <View 
            // className={Styles.formsRow}
            style={[styles.formsRow]}
            >
              {/* <button
          id="ResendCode"
          ref={refForResendCode}
          className={Styles.btn}
          onClick={ResendCodefunc}
          disabled={isDisabledResendCode}
        >
          ارسال مجدد
        </button> */}
              <TouchableOpacity 
                style={[styles.btn]}
                onPress={ResendCodefunc}
                disabled={isDisabledResendCode}
                activeOpacity={0.1}
              >
                <Text> ارسال مجدد</Text>
              </TouchableOpacity>

            </View>

            <View
            //  className={Styles.formsRow}
             style={[styles.formsRow]}
             >
              {/* <button
          ref={refForRemovTimer}
          className={Styles.btn}
          onClick={() => {
            return setRemovTimer(true);
          }}
          disabled={isDisabledRemovTimerBtn}
        >
          ریست تایمر
        </button> */}
              <TouchableOpacity
                style={[styles.btn]}
                onPress={() => setTimer(0)}
                disabled={isDisabledRemovTimerBtn}
                activeOpacity={0.1}
              >
                <Text>  ریست تایمر</Text>
              </TouchableOpacity> 
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ////////////////////////////////////////////////////////////sakhte ebtedaei
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    width: "100%",
    borderRadius: 5,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  link: {
    color: "blue",
    marginBottom: 10,
    textDecorationLine: "underline",
  },
  ////////////////////////////////////////////////////////////az nextJs
  loginForm: {
    borderWidth: 1,
    borderColor: "#a9a9a9",
    borderStyle: 'solid',
    borderRadius: 20,
    boxShadow: "#5e5e5e 0px 0px 3px 0px",
    backgroundColor: "#f6f6f6",
    width: "100%",
    height: 350,
    //  minHeight: "min-content", 
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
  valueStyle: {
    fontFamily: "IRANSansWeb(FaNum)_Medium",
  },
  formsRow: {
    marginBottom: 20,
  },

  titleStyle: {
    fontFamily: "IRANSansWeb(FaNum)_Bold",
  },
  lablAndInputCont: {
    direction: "rtl",
    display: "flex",
    flexDirection: "column",
  },

  txtBox: {
    height: 50,
    borderRadius: 7,
    // border: 1px solid silver;
    borderWidth: 1,
    borderColor: "silver",
    borderStyle: 'solid',
  },
  // .txtBox:focus {
  //   outline: none;
  //   border: 1px solid red;
  //   box-shadow: 0px 0px 3px 0px red;
  // }
  warningCont: {
    fontSize: 12,
    color: "red",
  },

  disabledBtn: {
    padding: 7,
    borderRadius: 7,
    backgroundColor: "#6f6b6e",
    opacity: 0.5,
    color: "white",
    width: "100%",
    height: 50,
  },

  btn: {
    padding: 7,
    borderRadius: 7,
    backgroundColor: "#6f6b6e",
    color: "white",
    width: "100%",
    height: 50,
  },
  // .btn:hover {
  //   background-color: #969596;
  //   box-shadow: 0px 0px 5px 3px #6f6b6e inset;
  // }

  BackBtn: {
    padding: 10,
    borderRadius: 7,
    display: "flex",
    flexDirection: "row",
    // backgroundColor: "inherit",
    fontFamily: "IRANSansWeb(FaNum)_Medium",
    direction: "rtl",
  },
  // .BackBtn:hover {
  //   background-color: #f7f7f7;
  // }

  BackImgCont: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    // backgroundColor: "inherit",
    marginLeft: 10,
  },
  BackBtnTitleCont: {
    // flex: 0 0 auto;
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 'auto',
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    fontSize: 14,
  },
});
