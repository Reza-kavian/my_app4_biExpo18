//my-app/src/screens/LoginScreen.tsx   //zare_nk_050227_okk
import React, { useRef, useState, useEffect } from "react";
import {
  View, Text, Image, TouchableOpacity, StyleSheet, ViewStyle, TextStyle, Alert, TextInput, Button,
  useWindowDimensions, //zare_nk_041126_added(moadele @media baraye responsive kardane site)
  StyleProp, Modal, Linking, ScrollView, TextInputEndEditingEvent, TextInputChangeEvent, KeyboardAvoidingView,
   Platform,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";
import ReusableButton from "../components/ReusableButton";
import { NextJsApiUrl, NextJsApiAuthUrl } from "../constants/Urls";
import { SvgUri } from "react-native-svg";
import type { RootStackParamList } from "../types/navigation";

//  import LoginIcon from "../assets/images/login-icon-dimcolor.svg";    ////zare_nk_050313_nokteh(importe mostaghime file svg(sorate loade barname bekhatere tahlile barname dar khandane codehaye svg kamtar mishe)) 
import LoginIcon from "../components/icons/images/LoginIconDimcolor";  ////zare_nk_050313_nokteh(import az khoroojiye @svgr/cli(ke dar tanzimate package.json moshakhas kardim)(sorate loade barname bekhatere tabdile 
// //// svg be Componente reacte amadeh kheili behinehtare))  

import logoKerfu from "../assets/images/logo-kerfu.jpg";

import ReturnToMobilenumberIcon from "../components/icons/images/ReturnToMpbilenumber";
import RequestAgainIcon from "../components/icons/images/RequestAgain";


//zare_nk_040530_commented_st(rahe1)
// import { useNavigation } from "@react-navigation/native";
// import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
// type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Login">;
// export default function LoginScreen() {
//const navigation = useNavigation<NavigationProp>();
//zare_nk_040530_commented_end(rahe1)

//zare_nk_040530_added_st(rahe2-baraye masalan SplashScreen va tamame safahate dige ham karbord dare-parameterhaye voroodi ra barname automat az React Navigation migire)
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
  const [mobileError, setMobileError] = useState<string | null>(null);   //zare_nk_041214_added
  const [smsError, setSmsError] = useState<string | null>(null); //zare_nk_040531_nokteh(state ke errore formate varedeye sms ra negah midareh)
  const [isDisabledMobileCheckBtn, setIsDisabledMobileCheckBtn] = //zare_nk_040531_nokteh(state ke disable ya enable boodane dokmeye MobileCheckBtn ra negah midareh)
    useState(true);
  const [isDisabledCheckSmsBtn, setIsDisabledCheckSmsBtn] = useState(false); //zare_nk_040531_nokteh(state ke disable ya enable boodane dokmeye CheckSmsBtn ra negah midareh)
  const [isDisabledResendCode, setIsDisabledResendCode] = useState(true); //zare_nk_040531_nokteh(state ke disable ya enable boodane dokmeye ResendCode ra negah midareh)
  const [isDisabledRemovTimerBtn, setIsDisabledRemovTimerBtn] = useState(true); //zare_nk_040531_nokteh(state ke disable ya enable boodane dokmeye RemovTimerBtn ra negah midareh)
  // const [timer, setTimer] = useState(40000);  //zare_nk_040431_commented
  const [timer, setTimer] = useState(0); //zare_nk_040431_added    //zare_nk_040531_nokteh(state ke meghdare timer ra negah midareh)
  // const [removTimer, setRemovTimer] = useState(false); //zare_nk_040531_nokteh(state ke hazf kardane timer ya reset nakardanesh dar rendere jari ra negah midareh)  //zare_nk_041020_commented(bejash setTimmer(0) lahaz shod)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null); //zare_nk_040531_nokteh(useRef ke baraye modiriate timer estefadeh mishe)
  console.log('zare_nk_041020_LoginScreen called!!');

  const [arrayForSmsVal, setArrayForSmsVal] = useState(['', '', '', '', '']);  ////zare_nk_050312_added
  // const SmsInputRefs = useRef<HTMLInputElement[]>(Array(5).fill(null));  ////zare_nk_050312_added 
  const SmsInputRefs = useRef<(TextInput | null)[]>(Array(5).fill(null));  ////zare_nk_050312_added
  const [newSmsVal, setNewSmsVal] = useState('');  ////zare_nk_050312_added
  // const [timerDisplay, setTimerDisplay] = useState("flex");  ////zare_nk_050312_added

  const { height } = useWindowDimensions();

  ////zare_nk_041020_commented_st
  // useEffect(() => {   //0021
  ////zare_nk_040531_nokteh(dar har render age nobate safhe tagheir kard va meghdaresh secondPage bood dokmeye ResendCode disable bashe va dokmeye RemovTimerBtn enable bashe, 
  //// chon timer be 4000 refresh mishe va ta sefr shodan nabayad darkhaste mojadade ersale code dad)
  //   if (step === "secondPage") {
  //     // setTimer(40000);  //zare_nk_040431_commented(bordim be dastoore 0010 ta az rendere ezafi jologiri beshe,ye bar setStep("secondPage") baese render shod
  //     // ,setTimer(40000) ke inja bashe mojebe rendere mojadade component mishe,pas behtere setTimer(40000) dar kenare setStep("secondPage") gharar begire,yani hamoon dstoore 0010)
  //     setIsDisabledResendCode(true);
  //     setIsDisabledRemovTimerBtn(false);
  //   }
  // }, [step]);
  ////zare_nk_041020_commented_end

  useEffect(() => {
    ////zare_nk_050211_nokteh_st(chon dastoorate in nokteh ra dar tabee cleanUp niz moshakhas kardim,in ghesmat tekrariye va comment kardim(cleanUp ghable ejraye 
    //// dastoorate ebtedaye useEffect(yani hamin khotoot) ejra mishe va in khotoote clearInterval ezafian, age dar cleanUp cleanUp ro seda nemizadim clearInterval ro 
    //// inja ro az comment dar miavordim ))
    // if (intervalRef.current) {
    //   clearInterval(intervalRef.current);
    // }
    ////zare_nk_050211_nokteh_end(chon dastoorate in nokteh ra dar tabee cleanUp niz moshakhas kardim,in ghesmat tekrariye va comment kardim(cleanUp ghable ejraye 
    //// dastoorate ebtedaye useEffect(yani hamin khotoot) ejra mishe va in khotoote clearInterval ezafian, age dar cleanUp cleanUp ro seda nemizadim clearInterval ro 
    //// inja ro az comment dar miavordim ))

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
        // if (removTimer || prev <= 0) {  ////zare_nk_041020_commented
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
    ////zare_nk_050211_nokteh_st(tabee cleanUp ke dar onMounte component va hamchenin seda zadeh shodane mojadade useEffect dar hamin component ghabl az ejraye useEffect seda Zade mishe)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      //zare_nk_040530_commented(molahezeh mishe ke dar har render bayad dar entehaye useEffect intervalRef.current ra hazf konim,
      // bekhatere mahiate intervalRef ke meghdare jadid ke begire meghdare ghadimesh az pardazeshe cpu hazf nemishe va amal mikoneh
      // va dar renderhaye mokhtalef ba anboohi az maghadire intervalRef movajeh mishavim ke har kodoom timer ra meghdardehi mikonan va ba ham tadakhol khahand dasht )
    };
    ////zare_nk_050211_nokteh_end(tabee cleanUp ke dar onMounte component va hamchenin seda zadeh shodane mojadade useEffect dar hamin component ghabl az ejraye useEffect seda Zade mishe)

    // }, [removTimer, timer]);//zare_nk_041020_commented(mani nadare timer taghir kard in useEffect seda zadeh beshe ke toosh dobare setTimer darim, va removTimer ke kollan hazf shod)
  }, [step]);//zare_nk_041020_added(dakhele useEffect ham goftim: step secondPage shod interval ijad va firstPage shod interval hazf mikonim) 

  const mobileButtonClick = async () => {
    if (!/^09\d{9}$/.test(mobileVal)) {
      setMobileError("شماره موبایل معتبر نیست");
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
          setIsDisabledResendCode(true);   ////zare_nk_050314_added
          setMobileError(null);
        } else {
          await AsyncStorage.removeItem("token");
          setMobileError(data.errors || "خطا در ارسال شماره موبایل");
          //zare_nk_040218-data: {"status":-2,"message":"","data":1,"errors":["6 ثانیه ی دیگر مجددا تلاش کنید"]}
        }
      } else {
        await AsyncStorage.removeItem("token");
        setMobileError("متاسفانه خطایی رخ داده است");
      }
    } catch (error) {
      await AsyncStorage.removeItem("token");
      console.error("zare_nk_040218-resendcode-in catch:", error);
      if (error instanceof Error) {
        console.error("zare_nk_040218-resendcode-in catch-2:", error.message);
        setMobileError("متاسفانه خطایی رخ داده است:" + error.message);
      } else {
        console.error("zare_nk_040218-resendcode-in catch-3:", String(error));
        setMobileError("متاسفانه خطایی رخ داده است333:" + String(error));
      }
    } finally {
      setIsDisabledMobileCheckBtn(false);
    }
  };
  ////zare_nk_050312_commented_st
  // const checkSmsForLogin = async () => {
  //   if (!smsVal || smsVal.length < 4) {
  //     await AsyncStorage.removeItem("token");
  //     setSmsError("کد وارد شده معتبر نیست");
  //     return;
  //   }
  //   try {
  //     setIsDisabledCheckSmsBtn(true);
  //     const res = await axios.post(NextJsApiUrl + "User/Api_LoginUser2", {
  //       mobile: mobileVal,
  //       smsCode: smsVal,
  //       Password: ""
  //     });
  //     console.log("zare_nk_041207-01");
  //     const ApiLoginUser2Result = res.data; // await res.json();
  //     console.log("zare_nk_041207-02");
  //     console.log("zare_nk_041207-03-ApiLoginUser2Result: " + ApiLoginUser2Result);
  //     console.log(
  //       "zare_nk_041207-03-JSON.stringify(ApiLoginUser2Result): " +
  //       JSON.stringify(ApiLoginUser2Result)
  //     );
  //     //zare_nk_0409225_alan
  //     //040530-03-JSON.stringify(ApiLoginUser2Result): {"status":-9,"message":"","data":null,"errors":["کد پیامکی وارد شده اشتباه است"]}
  //     //040530-03-JSON.stringify(ApiLoginUser2Result): {"status":-11,"message":"","data":null,"errors":["کد ورود شما منقضی شده است. لطفا مجددا درخواست کد پیامکی کنید"]}
  //     //040530-03-JSON.stringify(ApiLoginUser2Result): {"status":0,"message":"",
  //     // "data":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIwMTA5IiwiQ29kZU1vc2h0YXJpIjoiMjAxMDkiLCJNb2JpbGUiOiI5MzUxMDkxMjg3IiwiTmFtZU1vc2h0YXJpIjoiIiwibmJmIjoxNzY1ODgxNDczLCJleHAiOjE3NjY0ODYyNzMsImlhdCI6MTc2NTg4MTQ3M30.JTsMQ1DO0C7QEWw90eElmaSSFVGxtpf52xG9dgsp7BA"}
  //     // ,"errors":[]}
  //     // if (res.status === 200) {
  //     if (res.status === 200 && ApiLoginUser2Result.status == 0) {
  //       // if (ApiLoginUser2Result.status == 0) {
  //       let token = ApiLoginUser2Result.data.token;
  //       console.log("zare_nk_041207-03-token: " + token);
  //       //040530-03-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIwMTA5IiwiQ29kZU1vc2h0YXJpIjoiMjAxMDkiLCJNb2JpbGUiOiI5MzUxMDkxMjg3IiwiTmFtZU1vc2h0YXJpIjoiIiwibmJmIjoxNzY1ODgxNDczLCJleHAiOjE3NjY0ODYyNzMsImlhdCI6MTc2NTg4MTQ3M30.JTsMQ1DO0C7QEWw90eElmaSSFVGxtpf52xG9dgsp7BA
  //       // try {
  //       const response = await fetch(NextJsApiAuthUrl + "verifyToken", {
  //         ////zare_nk_040428_added_nokteh(dar reactnative ke kollan samte client hast code samte server ke behesh api bezanim nadarin 
  //         // pas masire verifyToken bayad dar yek projeye dige mesle nextjs ya .net core bayad bashe va az reactnative faghat behesh api bezanim)
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ token }),
  //       });
  //       console.log("zare_nk_041207-1");
  //       console.log("zare_nk_041207-a-1-response: " + response);
  //       console.log("zare_nk_041207-a-2-JSON response: " + JSON.stringify(response));
  //       // console.log("zare_nk_041207-a-3-data: " + JSON.stringify(data));
  //       const data = await response.json();

  //       if (response.status === 200) { // YA if (response.ok) {  zare_nk_040928_updated(response.status==2xx mesle 204 ya 209 dar response.ok lahaz mishavand vali man chon hamvareh dar pasokhe movafagh data daram pas hamvareh dar 2xx man 200 darmam)
  //         //// 1. ذخیره توکن به همراه زمان انقضا (مثلاً 1 ساعت بعد)
  //         const expires = new Date(
  //           Date.now() + 20000 * 60 * 1000
  //         ).toISOString();
  //         // const expires =data.decoded.exp;  //zare_nk_040219-nokteh(zamane monghazi ra az dadeye parsafar taein kardam)
  //         let tokenni = await AsyncStorage.getItem("token");  //zare_nk_040925_added_pakkardani
  //         console.log("0-zare_nk_041207-tokenni is: " + tokenni);//zare_nk_040925_added_pakkardani
  //         await AsyncStorage.setItem("token", token); //moadele cooki dar reactnative ast 
  //         await AsyncStorage.setItem("token_expires", expires);
  //         tokenni = await AsyncStorage.getItem("token");//zare_nk_040925_added_pakkardani
  //         console.log("1-zare_nk_041207-tokenni is: " + tokenni);//zare_nk_040925_added_pakkardani

  //         ////zare_nk_041207_commented_st
  //         // const validRoutes = [
  //         //   "AboutScreen",
  //         //   "AuthCallback",
  //         //   "discountsAndOffers",
  //         //   "folder02",
  //         //   "folder03",
  //         //   "Home",
  //         //   "Login",
  //         //   "ordersHistory",
  //         //   "Profile",
  //         //   "Scanner",
  //         //   "shoppingbasket",
  //         //   "Splash",
  //         //   "SupperApp",
  //         //   "SupperGame",
  //         //   "TicTacToe",
  //         //   "Welcome",
  //         // ] as const;

  //         // type RouteName = (typeof validRoutes)[number]; //number yani har kodoom az andis haye in araye,darvaghe har kodoom az 4 khooneye araye

  //         // const redirectRaw = await AsyncStorage.getItem("redirect");

  //         // const redirect = validRoutes.includes(redirectRaw as RouteName)
  //         //   ? (redirectRaw as RouteName)
  //         //   : "Home"; // یا هر صفحه‌ای که بخوای پیش‌فرض باشه

  //         //// 3. حذف مسیر redirect از AsyncStorage
  //         // await AsyncStorage.removeItem("redirect"); 
  //         //// 4. هدایت به مسیر redirect
  //         // navigation.replace(redirect);   
  //         ////zare_nk_041207_commented_end
  //         ////zare_nk_041207_added_st
  //         const redirect = (await AsyncStorage.getItem("redirect")) || "Home";
  //         await AsyncStorage.removeItem("redirect");
  //         navigation.replace(redirect as keyof RootStackParamList);
  //         ////zare_nk_041207_added_end
  //       } else {
  //         console.log("❌ zare_nk_041207-verifyToken failed");
  //         setSmsError("خطا در ورود با کد تایید");  //zare_nk_040926_added
  //         await AsyncStorage.removeItem("token");
  //         // Alert.alert("❌ verifyToken failed");
  //       }
  //       // } catch (error) {
  //       //   alert("catch in checkSmsForLogin-AsyncStorage.removeItem('token')");
  //       //   console.error("❌ خطا در JWT:", error);  //[TypeError: "tokenni" is read-only]
  //       //   await AsyncStorage.removeItem("token"); //zare_nk_040429_added
  //       //   setError("متاسفانه خطایی رخ داده است999:" + error);
  //       // }
  //       // } else {  //ok2
  //       //   alert(
  //       //     "data.status != 0 in checkSmsForLogin-AsyncStorage.removeItem('token')"
  //       //   );
  //       //   await AsyncStorage.removeItem("token"); //zare_nk_040429_added 
  //       //   setError("متاسفانه خطایی رخ داده است34:eeee" + ApiLoginUser2Result.errors[0]);    //zare_nk_040925_updated 
  //       // }
  //     } else {
  //       // Alert.alert(
  //       //   "res.status !== 200 or data.status != 0  in checkSmsForLogin-AsyncStorage.removeItem('token')"
  //       // );
  //       console.log("zare_nk_041207-!!response.ok");
  //       await AsyncStorage.removeItem("token");
  //       setSmsError(ApiLoginUser2Result.errors ? ApiLoginUser2Result.errors[0] : "متاسفانه خطایی رخ داده است34:eeee");
  //     }

  //     ////zare_nk_040428_added_end
  //   } catch (err: any) {
  //     // Alert.alert(
  //     //   "zare_nk_041207-second catch in checkSmsForLogin-AsyncStorage.removeItem('token')-err: " + err
  //     // );
  //     console.log(
  //       "zare_nk_041207-second catch in checkSmsForLogin-AsyncStorage.removeItem('token')-err: " + err
  //     );
  //     await AsyncStorage.removeItem("token");
  //     setSmsError(err.response?.data?.message || "خطا در ورود با کد تایید");
  //   } finally {
  //     setIsDisabledCheckSmsBtn(false);
  //   }
  // };
  ////zare_nk_050312_commented_end
  ////zare_nk_050312_added_st  
  const checkSmsForLogin = async (sms: string) => {
    if (!sms || sms.length < 4) {
      await AsyncStorage.removeItem("token");
      setSmsError("کد وارد شده معتبر نیست");
      return;
    }
    try {
      setIsDisabledCheckSmsBtn(true);
      const res = await axios.post(NextJsApiUrl + "User/Api_LoginUser2", {
        mobile: mobileVal,
        smsCode: sms,
        Password: ""
      });
      console.log("zare_nk_041207-01");
      const ApiLoginUser2Result = res.data; // await res.json();
      console.log("zare_nk_041207-02");
      console.log("zare_nk_041207-03-ApiLoginUser2Result: " + ApiLoginUser2Result);
      console.log(
        "zare_nk_041207-03-JSON.stringify(ApiLoginUser2Result): " +
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
        console.log("zare_nk_041207-03-token: " + token);
        //040530-03-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIwMTA5IiwiQ29kZU1vc2h0YXJpIjoiMjAxMDkiLCJNb2JpbGUiOiI5MzUxMDkxMjg3IiwiTmFtZU1vc2h0YXJpIjoiIiwibmJmIjoxNzY1ODgxNDczLCJleHAiOjE3NjY0ODYyNzMsImlhdCI6MTc2NTg4MTQ3M30.JTsMQ1DO0C7QEWw90eElmaSSFVGxtpf52xG9dgsp7BA
        // try {
        const response = await fetch(NextJsApiAuthUrl + "verifyToken", {
          ////zare_nk_040428_added_nokteh(dar reactnative ke kollan samte client hast code samte server ke behesh api bezanim nadarin 
          // pas masire verifyToken bayad dar yek projeye dige mesle nextjs ya .net core bayad bashe va az reactnative faghat behesh api bezanim)
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        console.log("zare_nk_041207-1");
        console.log("zare_nk_041207-a-1-response: " + response);
        console.log("zare_nk_041207-a-2-JSON response: " + JSON.stringify(response));
        // console.log("zare_nk_041207-a-3-data: " + JSON.stringify(data));
        const data = await response.json();

        if (response.status === 200) { // YA if (response.ok) {  zare_nk_040928_updated(response.status==2xx mesle 204 ya 209 dar response.ok lahaz mishavand vali man chon hamvareh dar pasokhe movafagh data daram pas hamvareh dar 2xx man 200 darmam)
          //// 1. ذخیره توکن به همراه زمان انقضا (مثلاً 1 ساعت بعد)
          const expires = new Date(
            Date.now() + 20000 * 60 * 1000
          ).toISOString();
          // const expires =data.decoded.exp;  //zare_nk_040219-nokteh(zamane monghazi ra az dadeye parsafar taein kardam)
          let tokenni = await AsyncStorage.getItem("token");  //zare_nk_040925_added_pakkardani
          console.log("0-zare_nk_041207-tokenni is: " + tokenni);//zare_nk_040925_added_pakkardani
          await AsyncStorage.setItem("token", token); //moadele cooki dar reactnative ast 
          await AsyncStorage.setItem("token_expires", expires);
          tokenni = await AsyncStorage.getItem("token");//zare_nk_040925_added_pakkardani
          console.log("1-zare_nk_041207-tokenni is: " + tokenni);//zare_nk_040925_added_pakkardani

          ////zare_nk_041207_commented_st
          // const validRoutes = [
          //   "AboutScreen",
          //   "AuthCallback",
          //   "discountsAndOffers",
          //   "folder02",
          //   "folder03",
          //   "Home",
          //   "Login",
          //   "ordersHistory",
          //   "Profile",
          //   "Scanner",
          //   "shoppingbasket",
          //   "Splash",
          //   "SupperApp",
          //   "SupperGame",
          //   "TicTacToe",
          //   "Welcome",
          // ] as const;

          // type RouteName = (typeof validRoutes)[number]; //number yani har kodoom az andis haye in araye,darvaghe har kodoom az 4 khooneye araye

          // const redirectRaw = await AsyncStorage.getItem("redirect");

          // const redirect = validRoutes.includes(redirectRaw as RouteName)
          //   ? (redirectRaw as RouteName)
          //   : "Home"; // یا هر صفحه‌ای که بخوای پیش‌فرض باشه

          //// 3. حذف مسیر redirect از AsyncStorage
          // await AsyncStorage.removeItem("redirect"); 
          //// 4. هدایت به مسیر redirect
          // navigation.replace(redirect);   
          ////zare_nk_041207_commented_end
          ////zare_nk_041207_added_st
          const redirect = (await AsyncStorage.getItem("redirect")) || "Home";
          await AsyncStorage.removeItem("redirect");
          navigation.replace(redirect as keyof RootStackParamList);
          ////zare_nk_041207_added_end
        } else {
          console.log("❌ zare_nk_041207-verifyToken failed");
          setSmsError("خطا در ورود با کد تایید");  //zare_nk_040926_added
          await AsyncStorage.removeItem("token");
          // Alert.alert("❌ verifyToken failed");
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
        // Alert.alert(
        //   "res.status !== 200 or data.status != 0  in checkSmsForLogin-AsyncStorage.removeItem('token')"
        // );
        console.log("zare_nk_041207-!!response.ok");
        await AsyncStorage.removeItem("token");
        setSmsError(ApiLoginUser2Result.errors ? ApiLoginUser2Result.errors[0] : "متاسفانه خطایی رخ داده است34:eeee");
      }
      ////zare_nk_040428_added_end
    } catch (err: any) {
      // Alert.alert(
      //   "zare_nk_041207-second catch in checkSmsForLogin-AsyncStorage.removeItem('token')-err: " + err
      // );
      console.log(
        "zare_nk_041207-second catch in checkSmsForLogin-AsyncStorage.removeItem('token')-err: " + err
      );
      await AsyncStorage.removeItem("token");
      setSmsError(err.response?.data?.message || "خطا در ورود با کد تایید");
    } finally {
      setIsDisabledCheckSmsBtn(false);
    }
  };
  ////zare_nk_050312_added_end

  const ResendCodefunc = async () => {
    try {
      // setIsDisabledResendCode(true); ////zare_nk_050314_commented
      setIsDisabledRemovTimerBtn(false);
      const response = await axios.post(NextJsApiUrl + "User/Api_LoginUser1", { mobile: mobileVal });
      const data = await response.data;
      if (response.status == 200) {
        console.log("zare_nk_040218-data: " + JSON.stringify(data) + '-response.status: ' + response.status);
        //zare_nk_040218-data: {"status":0,"message":"","data":1,"errors":[]}-response.status: 200
        //zare_nk_040218-data: {"status":-1,"message":"","data":null,"errors":[]}-response.status: 200
        //zare_nk_040218-data: {"status":-2,"message":"","data":null,"errors":["کاربر یافت نشد"]}-response.status: 200
        if (data.status == 0) {
          // Alert.alert('ddd');
          setTimer(40000);
          // setError(null);  ////zare_nk_050314_commented
          setSmsError(null);  ////zare_nk_050314_added
          setIsDisabledResendCode(true);  ////zare_nk_050314_added
        } else {
          // setError(data.errors || "خطا در ارسال شماره موبایل");  ////zare_nk_050314_commented
          setSmsError(data.errors || "خطا در ارسال شماره موبایل"); ////zare_nk_050314_added
          //zare_nk_040218-data: {"status":-2,"message":"","data":1,"errors":["6 ثانیه ی دیگر مجددا تلاش کنید"]}
        }
      } else {
        // setError("متاسفانه خطایی رخ داده است");   ////zare_nk_050314_commented
        setSmsError("متاسفانه خطایی رخ داده است");   ////zare_nk_050314_added
      }
    } catch (error) {
      console.error("zare_nk_040218-resendcode-in catch:", error);
      if (error instanceof Error) {
        console.error("zare_nk_040218-resendcode-in catch-2:", error.message);
        // setError("متاسفانه خطایی رخ داده است:" + error.message);  ////zare_nk_050314_commented
        setSmsError("متاسفانه خطایی رخ داده است:" + error.message);  ////zare_nk_050314_added
      } else {
        console.error("zare_nk_040218-resendcode-in catch-3:", String(error));
        // setError("متاسفانه خطایی رخ داده است333:" + String(error));  ////zare_nk_050314_commented
        setSmsError("متاسفانه خطایی رخ داده است333:" + String(error));  ////zare_nk_050314_added
      }
    } finally {
      // setIsDisabledResendCode(false);  ////zare_nk_050314_commented
    }
  };

  const getQueryParam = (url: string, key: string) => {
    const match = url.match(new RegExp(`[?&]${key}=([^&]+)`));
    return match ? decodeURIComponent(match[1]) : null;
  };

  ////zare_nk_040603_added_st(rahe1)
  useEffect(() => {
    const subscription = Linking.addListener("url", async ({ url }) => {  ////zare_nk_041007_nokteh(yani harvaght appe man ba yek linke khareji baz 
      // shod in tabe ro ejra kon(android in link ro motevajjeh mishe va dar in tabe be ma mideh,masalan myapp://auth/callback?token=eyJhbGciOiJIUzI1...))
      // const token = new URL(url).searchParams.get("token");  //zare_nk_040926_commented
      const token = getQueryParam(url, "token");
      // Alert.alert('useEffect called!!-token: ' + token);
      if (token) {
        // Alert.alert('useEffect called!!-040603_JWT: ' + token);
        ////zare_nk_040929_added_st
        const expires = new Date(
          Date.now() + 15 * 60 * 1000
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
        // Alert.alert('useEffect called!!-redirectRaw: ' + redirectRaw);
        const redirect = validRoutes.includes(redirectRaw as RouteName)
          ? (redirectRaw as RouteName)
          : "Welcome"; // یا هر صفحه‌ای که بخوای پیش‌فرض باشه
        // Alert.alert('useEffect called!!-redirect: ' + redirect);
        // 3. حذف مسیر redirect از AsyncStorage
        await AsyncStorage.removeItem("redirect");

        // 4. هدایت به مسیر redirect
        navigation.replace(redirect); // نیازمند useNavigation از React Navigation
        ///////////////////////////////////zare_nk_040929_added_end
      }
      ////////////////////////////////////zare_nk_040929_added_st
      else {
        // Alert.alert('useEffect called!!-token nadarim ke: ' + token);
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

  ////zare_nk_041214_added_st
  //  const mobileChanged= async (e:TextInputChangeEvent) => {  
  const mobileChanged = async (textVaredeh: string) => {
    setError("");
    // e.currentTarget.src = 'https://img.tochikala.com/Logo/tochi.png';  //zare_nk_041214_added_olgu
    // e.currentTarget.style.backgroundColor = 'white';  //zare_nk_041214_added_olgu

    // let input: HTMLInputElement | null = null;
    // let vall: string = "";
    // if (eventOrElement && "target" in eventOrElement) {
    //   input = eventOrElement.target;
    //   vall = input.value;
    // } else { 
    //   //zare_nk_040224_nokteh(age ba taghire mohtavaye mobileTxt tavasote dokmeye backBtnClick biaim dar methode mobileChanged)
    //   ////zare_nk_040409_commented_st
    //   // input = refForMobileInput.current[0];
    //   // vall = input.value;
    //   ////zare_nk_040409_commented_end
    //   ////zare_nk_040409_added_st
    //   input = eventOrElement;
    //   vall = input?.value ?? "";
    //   ////zare_nk_040409_added_st
    // }
    let vall: string = textVaredeh;

    var pat = new RegExp("^[0]{1}[0123456789]{10}$");
    var isMobileNum = pat.test(vall);
    if (!vall) {
      // if (input) {
      //   input.classList.remove("valid");
      //   input.classList.add("invalid");
      // } 
      setMobileError("ورود شماره تماس الزامی است"); //zare_nk_040224_added(rahe3-ba useState-reactpasandtarine) 
      setIsDisabledMobileCheckBtn(true);  ////zare_nk_04022_added(javab dad chon meghdare ebtedaeiye disabled ra dar khatte tarife MobileCheckBtn ba meghdare isDisabledMobileCheckBtn dadim
      ////  va setIsDisabledMobileCheckBtn tavanaeiye tagheiresho dare )
      // if (refForMobileCheckBtn.current) {
      //   refForMobileCheckBtn.current.classList.add(Styles.disabledBtn);
      //   refForMobileCheckBtn.current.classList.remove(Styles.btn);
      // }
    } else if (!isMobileNum) {
      // if (input) {
      //   input.classList.remove("valid");
      //   input.classList.add("invalid");
      // }

      setMobileError("فرمت شماره تماس وارده نادرست است"); //zare_nk_040224_added(rahe3-ba useState-reactpasandtarine)
      setIsDisabledMobileCheckBtn(true);
      // if (refForMobileCheckBtn.current) {
      //   refForMobileCheckBtn.current.classList.add(Styles.disabledBtn);
      //   refForMobileCheckBtn.current.classList.remove(Styles.btn);
      // }
    } else {
      // if (input) {
      //   input.classList.remove("invalid");
      //   input.classList.add("valid");
      // }

      setMobileError(""); //zare_nk_040224_added(rahe3-ba useState-reactpasandtarine) 
      setIsDisabledMobileCheckBtn(false);
      // if (refForMobileCheckBtn.current) {
      //   refForMobileCheckBtn.current.classList.remove(Styles.disabledBtn);
      //   refForMobileCheckBtn.current.classList.add(Styles.btn);
      // }
    }
    // if (input) {
    // setMobileVal(input.value);
    // } 
    setMobileVal(vall);
  }

  // function smsTxtChanged(event: React.ChangeEvent<HTMLInputElement>) {
  const smsTxtChanged = async (textVaredeh: string) => {
    setError("");
    // var input = null;
    // var vall = null;
    // if (event.target != undefined) {
    //   //zare_nk_040224_nokteh(age ba taghire mohtavaye smsValTxt tavasote karbar biaim dar methode smsTxtChanged)
    //   input = event.target;
    //   vall = input.value;
    // } else {
    //   //zare_nk_040224_nokteh(age ba taghire mohtavaye smsValTxt tavasote dokmeye mobileCheckBtn biaim dar methode smsTxtChanged)
    //   input = refForSmsInput.current[0];
    //   vall = input?.value;
    // }
    let vall: string = textVaredeh;
    if (!vall) {
      // if (input !== null) {
      //   input.classList.remove("valid");
      //   input.classList.add("invalid");
      // }
      setSmsError("ورود کد پیامکی الزامی است");
      setIsDisabledCheckSmsBtn(true);
      // refForCheckSmsBtn.current?.classList.add(Styles.disabledBtn);
      // refForCheckSmsBtn.current?.classList.remove(Styles.btn);
    } else {
      // if (input !== null) {
      //   input.classList.remove("invalid");
      //   input.classList.add("valid");
      // }
      setSmsError("");
      setIsDisabledCheckSmsBtn(false);
      // refForCheckSmsBtn.current?.classList.remove(Styles.disabledBtn);
      // refForCheckSmsBtn.current?.classList.add(Styles.btn);
    }

    // if (input) {
    // setSmsVal(input.value);
    // }
    setSmsVal(vall);
  }
  ////zare_nk_041214_added_end

  ////zare_nk_050312_added_st
  // function newSmsTxtChanged(textVaredeh: string, index: number) {
  function newSmsTxtChanged(tempArrayForSmsVal: string[], index: number) {
    setError("");
    // let vall: string = textVaredeh;
    let tempnewSmsVal = '';
    console.log('rahe ghabli-tempnewSmsVal: ' + tempnewSmsVal);

    // SmsInputRefs.current.map((inputItem, index) => {
    //   // SmsInputRefs.current.forEach((inputItem, index) => {
    //   // let inputItemVal = SmsInputRefs.current[index].value;
    //   if (!inputItem) {
    //     return;
    //   }
    //   let inputItemVal = inputItem;

    //   tempnewSmsVal += inputItemVal;
    //   console.log('index: ' + index + '-tempnewSmsVal: ' + tempnewSmsVal);
    //   if (index == 4) {
    //     console.log('index is chahar-tempnewSmsVal: ' + tempnewSmsVal);
    //     setNewSmsVal(tempnewSmsVal);
    //   }
    // });
    SmsInputRefs.current.map((inputItem, index) => {
      // SmsInputRefs.current.forEach((inputItem, index) => {
      // let inputItemVal = SmsInputRefs.current[index]?.textContent;  ////zare_nk_050314_commented(dar reactnative ba ref nemitoonim ve mohtavaye tag ha 
      // dastresi dashteh bashim va faghat mishe selevt va clear kard tagharo, yani rooshoon bazi methodharo anjam dad, na inke mohtavashoon ro get 
      // kard, textContent ham faghat esmesh ghalatandaze va mohtavaye textbox nist!)
      // let inputItemVal=arrayForSmsVal[index];  ////zare_nk_050314_added(and 050314_commented(chon newSmsTxtChanged ra dar hamin rendere jari seda zadim va hanooz arrayForSmsVal berooz nashodeh dar in render))
      let inputItemVal = tempArrayForSmsVal[index];  ////zare_nk_050314_added(chon newSmsTxtChanged ra dar hamin rendere jari seda zadim va hanooz arrayForSmsVal berooz nashodeh dar in render, pas majboor shodim tempArrayForSmsVal ra be parametre voroodiye newSmsTxtChanged pas bedim)

      console.log('inde224: ' + inputItemVal);
      if (!inputItemVal) {
        return;
      }
      // let inputItemVal = inputItem;

      tempnewSmsVal += inputItemVal;
      console.log('index8: ' + index + '-tempnewSmsVal: ' + tempnewSmsVal);
      if (index == 4) {
        console.log('index is chahar-tempnewSmsVal: ' + tempnewSmsVal);
        setNewSmsVal(tempnewSmsVal);
      }
    });

    if (!tempnewSmsVal) {
      // Alert.alert('!tempnewSmsVal');
      // setFocusItem(0);  //zare_nk_050105_aaded(shayad niazi behesh nabashe!)
      SmsInputRefs.current[0]?.focus();
      setSmsError("ورود کد پیامکی الزامی است");
      setIsDisabledCheckSmsBtn(true);
    } else {
      // Alert.alert('tempnewSmsVal');
      setSmsError("");
      setIsDisabledCheckSmsBtn(false);
      if (index < 4) {
        // Alert.alert('index < 4');
        SmsInputRefs.current[index + 1]?.focus();
      }
      else {
        // Alert.alert('index == 4');
        checkSmsForLogin(tempnewSmsVal);
      }
    }
  }

  const smsInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (event.key === " " || event.key === "Space") {
      event.preventDefault();
    }
    if (event.key === "Enter") {
      SmsInputRefs.current[index + 1]?.focus();
    }
    if (event.key === "ArrowRight") {
      SmsInputRefs.current[index + 1]?.focus();
    }
    if (event.key === "ArrowLeft") {
      SmsInputRefs.current[index - 1]?.focus();
    }
  };
  ////zare_nk_050312_added_end
  // Alert.alert(mobileVal)
  return (
    <KeyboardAvoidingView
      style={{
        flex: 1, ////zare_nk_050320_nokteh(age moadele 3propsiye flex:1 ra bedim emkan dare taghirate az 0 be grow ra KeyboardAvoidingView motevajjeh nashe va fekr kone chon 
        //// farzandan flexBasis: 0 daran ertefae kolle motava 0 ast va niazi be keshidane maotava dar balayash nabashad va khodesh faghat bala miad va mohtava miran ziresh )
        ////zare_nk_050320_nokteh_st(sabke 3propsi(moadele flex:1) ke baraye kar ba KeyboardAvoidingView javab nemideh)
        // flexBasis: 0,
        // flexShrink: 0,
        // flexGrow: 1,
        ////zare_nk_050320_nokteh_end(sabke 3propsi(moadele flex:1) ke baraye kar ba KeyboardAvoidingView javab nemideh)
        // borderWidth: 3,
        // borderColor: '#df1b1b',
        // borderStyle: 'dashed',
      }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}   ////zare_nk_050320_nokteh(in bayad basheh) 
      keyboardVerticalOffset={0} ////zare_nk_050320_nokteh(migim alaveh bar bala keshidane mohtava tebghe ertefaeshan, masalan 20 pixel bishtar ham bala bekesh mohtava ra(yani margine
    ////  20 pixel balaye keyboard mireh))
    >
      <ScrollView horizontal={false}
        style={{
          // height: "100%",
          width: '100%',
          // overflow: "hidden",  ////zare_nk_nokteh(overflow: "hidden" baes mishe age mohtevaye ScrollView azash bishtar bood ghesmate ezafi ra hidden konad va dige niazi be scroll nabashe! )
          backgroundColor: 'white',
          // borderWidth: 3,
          // borderColor: '#020202',
          // borderStyle: 'dotted',
        }}
        contentContainerStyle={{
          display: "flex",
          flexDirection: "column",
          justifyContent: 'center',
          alignItems: "center",
        }}
        keyboardShouldPersistTaps="handled"  ////zare_nk_050320_nokteh(baraye taamole ScrollView ba KeyboardAvoidingView pishnahad mishe(albateh comment kardam ham farghi nakard))
      >
        <View
          style={{
            // borderWidth: 4,
            // borderColor: 'red',
            // borderStyle: 'dashed',
            display: "flex",
            flexDirection: "column",
            // justifyContent: 'center',  ////zare_nk_050312_commented 
            alignItems: "center",
            width: '100%',
            minHeight: height,
            paddingVertical: 20,
            paddingHorizontal: 7,
          }}>
          <View
            // id="loginForm"
            // onSubmit={(event) => {
            //   event.preventDefault();
            // }}
            // className={`${Styles.loginForm} ${Styles.valueStyle}`}
            style={[styles.loginForm,
            {
              direction: "rtl",
            }
            ]}
          >
            <View
              // className={Styles.formsRow}
              style={[styles.formsRow, {
                justifyContent: "center",
                flexGrow: 0,
                flexShrink: 0,
                flexBasis: 'auto',
              }]}
            >
              {/* <Image
              source={{ uri: "https://img.tochikala.com/Logo/photo14359415832-Copy.jpg" }}
              // style={{ width: 55, height: 55, }}
              style={{ width: 155, height: 155, }}
            /> */}
              {/* zare_nk_050313_nokteh_st(rahe1-tosiyeh nemishe chon ba load az site khareji kond load mishe) */}
              {/* <SvgUri
              // source={require("../assets/favicon.png")}
              uri="https://img.tochikala.com/tochikala/login-icon.svg"
              // uri="https://img.tochikala.com/tochikala/back-icon-in-cardcontainer.svg" 
              width={200}
              height={200}  
            />    */}
              {/* zare_nk_050313_nokteh_end(rahe1-tosiyeh nemishe chon ba load az site khareji kond load mishe) */}
              {/* zare_nk_050313_nokteh_st(rahe2-tosiyeh mishe chon ba load az directoriye dakheli saritar load mishe(ham mitoonim file svg ra mostaghim import konim , va 
            ham mitoonim az @svgr/cli estefadeh konim ke be component tabdil konim dar masire masiri ke dar package.json moshakhas mikonim, ke sorate loade barname ba 
            @svgr/cli kheili behinehtare(file svgr-cli-rules moroor shavad ta har bar file svg ezafe kardim, npm run convert-svg  ra bezanim va ghavanine dastkariye svg ha) )) */}
              <LoginIcon width={300} height={300} />
              {/* zare_nk_050313_nokteh_end(rahe2-tosiyeh mishe chon ba load az directoriye dakheli saritar load mishe(ham mitoonim file svg ra mostaghim import konim , va 
            ham mitoonim az @svgr/cli estefadeh konim ke be component tabdil konim dar masire masiri ke dar package.json moshakhas mikonim, ke sorate loade barname ba 
            @svgr/cli kheili behinehtare(file svgr-cli-rules moroor shavad ta har bar file svg ezafe kardim, npm run convert-svg  ra bezanim va ghavanine dastkariye svg ha) )) */}
            </View>
            {/* {error && <Text style={styles.error}>{error}</Text>} */}
            {error && (
              <View
                // className={`${Styles.formsRow} ${Styles.warningCont}`}
                style={[styles.formsRow,
                {
                  justifyContent: 'center',
                  marginVertical: 10,
                }
                ]}
              >
                <Text
                  // className="forErrorMobile error"
                  style={[styles.errorTextStyle,
                  {
                    fontSize: 14,
                    // borderColor: 'red',
                    // borderStyle: 'dashed',
                    // borderWidth: 2,
                  }]}
                >{error}</Text>
              </View>
            )}
            {step === "firstPage" ? (
              <View
                style={{
                  flexGrow: 1,
                  flexShrink: 0,
                  flexBasis: 'auto',
                  // borderColor: 'blue',
                  // borderStyle: 'dashed',
                  // borderWidth: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                }}
              >
                {/* zare_nk_050312_added_st */}
                {/* <View
                style={{
                  flexGrow: 0,
                  flexShrink: 0,
                  flexBasis: 'auto',
                  // borderColor: 'blue',
                  // borderStyle: 'dashed',
                  // borderWidth: 2,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Image
                  source={logoKerfu}
                  style={{ width: 30, height: 30, }}
                />
              </View> */}
                {/* zare_nk_050312_added_end */}
                <View
                  // className={`${Styles.formsRow} ${Styles.boldTextStyle}`}
                  style={[styles.formsRow,
                  {
                    justifyContent: 'flex-start',
                    marginBottom: 20,

                    // borderColor: 'red',
                    // borderStyle: 'dashed',
                    // borderWidth: 2,
                  }
                  ]}
                >
                  <Text style={[styles.boldTextStyle,
                  {
                    // color: '#4b4949',
                    color: '#1b1c1d',   ////zare_nk_050315_tapsifoodi
                    // borderColor: 'blue',
                    // borderStyle: 'dashed',
                    // borderWidth: 2,
                  }]} >عضویت یا ورود </Text>
                </View>

                <View
                  // className={`${Styles.lablAndInputCont}  `} 
                  style={[styles.lablAndInputCont, {
                    justifyContent: 'flex-start',
                    marginBottom: 5,
                  }]}
                >
                  <Text style={[
                    styles.mediumTextStyle,
                    {
                      marginBottom: 10,
                      // color: "#6a6a6a",
                      color: '#878b92',   ////zare_nk_050315_tapsifoodi
                      // borderColor: 'blue',
                      // borderStyle: 'dashed',
                      // borderWidth: 2,
                    }]}>
                    شماره تلفن همراه:
                  </Text>

                  <TextInput
                    style={[styles.txtBox, styles.mediumTextStyle,
                    {
                      textAlign: "center",
                      color: '#878b92',
                    }]}
                    placeholder="شماره موبایل"
                    placeholderTextColor="#b0b4bb"  ////zare_nk_050315_added
                    value={mobileVal}
                    onChangeText={(textVaredeh) => {
                      mobileChanged(textVaredeh);
                    }}
                    keyboardType="phone-pad"
                  />
                </View>

                {mobileError && (
                  <View
                    // className={`${Styles.formsRow} ${Styles.warningCont}`}
                    style={[styles.formsRow]}
                  >
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      // className="forErrorMobile error"
                      style={[styles.errorTextStyle,
                      {
                        fontSize: 12,
                      }]}
                    >{mobileError}</Text>
                  </View>
                )}

                <View
                  // className={Styles.formsRow}
                  style={[styles.formsRow,
                  {
                    marginTop: 15,
                    marginBottom: 10,
                  }
                  ]}
                >
                  <TouchableOpacity
                    onPress={mobileButtonClick}
                    disabled={isDisabledMobileCheckBtn}
                    style={[{
                      ...(isDisabledMobileCheckBtn === true && styles.disabledBtn),
                      ...(!isDisabledMobileCheckBtn && styles.enableBtn),
                    },
                    {
                      padding: 7,
                      borderRadius: 7,
                      width: "100%",
                      height: 50,
                    }
                    ]}
                  >
                    <Text
                      style={[styles.mediumTextStyle,
                      {
                        ...(isDisabledMobileCheckBtn === true && { color: 'white' }),
                        ...(!isDisabledMobileCheckBtn && { color: 'white' }),
                        fontSize: 16,
                        color: (!isDisabledMobileCheckBtn ? "white" : 'white'),  //#6a6a6a
                      }]}>
                      دریافت کد تایید
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* <View
                // className={Styles.formsRow}
                style={[styles.formsRow]}
              >
                <TouchableOpacity
                  // type="button"
                  // id="handleGoogleBtn"
                  // className={Styles.btn}
                  style={[styles.enableBtn,
                  {
                    padding: 7,
                    borderRadius: 7,
                    width: "100%",
                    height: 50,
                  }
                  ]}
                  onPress={handleGoogleLogin}
                  activeOpacity={0.1}
                >
                  <Text
                    style={[styles.mediumTextStyle,
                    {
                      color: 'white',
                      fontSize: 16,
                    }]}>
                    ورود با حساب گوگل
                  </Text>
                </TouchableOpacity>
              </View> */}

              </View>
            ) : (
              <View
                style={{
                  flexGrow: 1,
                  flexShrink: 0,
                  flexBasis: 'auto',
                  // borderColor: 'blue',
                  // borderStyle: 'dashed',
                  // borderWidth: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                }}
              >
                {/* zare_nk_050312_added_st */}
                {/* <View
                style={{
                  flexGrow: 0,
                  flexShrink: 0,
                  flexBasis: 'auto',
                  // borderColor: 'blue',
                  // borderStyle: 'dashed',
                  // borderWidth: 2,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Image
                  source={logoKerfu}
                  style={{ width: 30, height: 30, }}
                />
              </View> */}

                <View
                  style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', }}>
                  <Text style={[styles.boldTextStyle,
                  { fontSize: 16, color: '#1b1c1d', marginBottom: 0, }]}>تایید شماره موبایل</Text>

                  <Text style={[styles.mediumTextStyle,
                  { fontSize: 14, color: '#878b92', marginBottom: 0, paddingTop: 4, }]}>کد تأیید ارسال&zwnj;شده به شماره
                    &zwnj;{mobileVal}&zwnj;
                    را وارد کن</Text>
                </View>

                <View style={{
                  display: 'flex', flexDirection: 'row-reverse', justifyContent: 'center', columnGap: 16, marginTop: 40,
                  // borderColor: 'red',
                  // borderStyle: 'dashed',
                  // borderWidth: 1,
                }}>
                  {
                    arrayForSmsVal.map((valueAndGrad, index) => {
                      return (
                        <View
                          key={index}
                          style={{
                            backgroundColor: 'white',
                            borderColor: '#e0e3e5',
                            borderStyle: 'solid',
                            borderWidth: 1,
                            width: 56, //  maxWidth: 56,
                            height: 56,
                            display: 'flex', justifyContent: 'center',
                            alignItems: 'center',
                            // paddingVertical: 16,     ////zare_nk_050314_commented(kolle fazaye adad ra gereft va chizi baraye tage TextInput namand)
                            // paddingHorizontal: 12,   ////zare_nk_050314_commented
                            borderRadius: 12,
                          }}>

                          <TextInput
                            key={index}
                            maxLength={1}   // فقط یک کاراکتر مجاز است
                            keyboardType="number-pad"  //zare_nk_050312_added
                            value={valueAndGrad}  //zare_nk_050312_added

                            // onChange={(e) => {
                            //   let tempArrayForSmsVal = arrayForSmsVal;
                            //   tempArrayForSmsVal[index] = e.target.value;
                            //   console.log('arrayForSmsVal is: ' + JSON.stringify(arrayForSmsVal));
                            //   setArrayForSmsVal(tempArrayForSmsVal);
                            //   newSmsTxtChanged(e.target.value, index);
                            // }}
                            onChangeText={(newtextVaredeh) => {
                              // mobileChanged(newtextVaredeh);  ////zare_nk_050314_commented(mobileChanged baraye mobile varedeh hast, na inja)
                              // let tempArrayForSmsVal = arrayForSmsVal;  //zare_nk_050312_commented(shekle copy az state nadoroste)
                              let tempArrayForSmsVal = [...arrayForSmsVal]; //zare_nk_050312_commented(shekle copy az state doroste)
                              tempArrayForSmsVal[index] = newtextVaredeh;
                              console.log('arrayForSmsVal is: ' + JSON.stringify(arrayForSmsVal));
                              console.log('arrayForSmsVal-new is: ' + JSON.stringify(tempArrayForSmsVal));
                              setArrayForSmsVal(tempArrayForSmsVal);
                              // newSmsTxtChanged(newtextVaredeh, index);   ////zare_nk_050314_commented
                              newSmsTxtChanged(tempArrayForSmsVal, index);  ////zare_nk_050314_added
                            }}

                            // onKeyDown={(e) => {
                            //   smsInputKeyDown(e, index);
                            // }}                          

                            ref={(e) => {
                              SmsInputRefs.current[index] = e;
                            }}

                            style={{
                              borderWidth: 0,
                              width: '100%', color: '#a5abb1', fontSize: 14, lineHeight: 20, textAlign: 'center',
                              // outline: '2px solid transparent'  ////zare_nk_050312_commented(dar reactnative vojood nadareh, moadelesh underlineColorAndroid hast ke gozashtam)                            
                            }}
                            underlineColorAndroid="transparent"  ////zare_nk_050312_commented(jaigozine outline: '2px solid transparent') // این خط زیرین اندروید را حذف می‌کند

                            onFocus={(e) => {
                              setTimeout(() => {
                                // e.target.select();
                                SmsInputRefs.current[index]?.setSelection(0, 1);
                                // SmsInputRefs.current[index]?.setNativeProps({
                                //   selection: { start: 0, end: 1 },
                                // });
                              }, 0);
                            }}
                          // onBlur={handleBlur}          //zare_nk_050105_olgu

                          // autoFocus={index===0?true:false}

                          />

                        </View>
                      )
                    })
                  }
                </View>

                {smsError && (
                  <View
                    // className={`${Styles.formsRow} ${Styles.warningCont}`}
                    style={[styles.formsRow, { marginBottom: 20, }]}
                  >
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      // className="forErrorMobile error"
                      style={[styles.errorTextStyle,
                      {
                        fontSize: 12,
                        // borderStyle: 'dashed',
                        // borderWidth: 2,
                        // borderColor: 'green',
                        color: 'red',
                      }]}
                    >{smsError}</Text>
                  </View>
                )}

                <View style={{
                  display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
                  paddingBottom: 20, paddingLeft: 20, paddingRight: 20, marginTop: 28,
                }}>
                  {!isDisabledResendCode ?
                    (<TouchableOpacity
                      // id="ResendCode"
                      // ref={refForResendCode}

                      // onClick={ResendCodefunc}
                      onPress={ResendCodefunc}

                      disabled={isDisabledResendCode}
                      //  className={`${Styles.BackBtn}  ${Styles.buttonHover}`}
                      style={{
                        padding: 10,
                        borderRadius: 7,
                        display: 'flex',
                        flexDirection: 'row',
                        //  border: none;
                        // borderWidth: 0,
                        backgroundColor: 'inherit',
                        //  fontFamily: "IRANSansWeb_Medium(adad_fa)",
                        direction: 'rtl',

                        // borderColor: 'red',
                        // borderStyle: 'dashed',
                        // borderWidth: 1,
                      }}
                    >
                      <View style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        //  background-color: inherit;
                        marginLeft: 10,
                        // borderColor: 'red',
                        // borderStyle: 'dashed',
                        // borderWidth: 1,
                      }}>
                        {/* <img
                        src="/images/login/request-again.svg"
                        style={{ width: "18px" }}
                        alt="درخواست مجدد"
                      /> */}
                        <RequestAgainIcon width={18} height={18} />
                      </View>
                      <View style={{
                        flexGrow: 0,
                        flexShrink: 0,
                        flexBasis: 'auto',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        // borderColor: 'red',
                        // borderStyle: 'dashed',
                        // borderWidth: 1,
                      }}>
                        <Text style={[styles.mediumTextStyle,
                        { color: '#ff5900', fontSize: 14, }]}>درخواست دوباره</Text>
                      </View>
                    </TouchableOpacity>
                    ) :
                    (
                      <View
                        // ref={refForTimer}
                        // id="timermoveOpportunityCont"
                        // style={[styles.formsRow,
                        style={{
                          //  display: timerDisplay,
                          display: "flex",
                          flexDirection: "row",
                          alignItems: 'center',
                          // borderColor: 'red',
                          // borderStyle: 'dashed',
                          // borderWidth: 1,
                        }}
                      >
                        <Text
                          style={[styles.mediumTextStyle,
                          {
                            display: "flex", flexDirection: "row", color: "red",
                            // borderColor: 'blue',
                            // borderStyle: 'dashed',
                            // borderWidth: 1,
                          }]}>
                          تایمر: {Math.floor(timer / 1000)} ثانیه
                        </Text>
                      </View>
                    )
                  }
                  {/* zare_nk_050102_added_st */}
                  {/* <div className={Styles.formsRow} style={{ direction: "rtl" }}> */}
                  <TouchableOpacity
                    id="backToFirsPage"
                    // className={`${Styles.BackBtn} ${Styles.buttonHover}`}
                    style={{
                      padding: 10,
                      borderRadius: 7,
                      display: 'flex',
                      flexDirection: 'row',
                      //  border: none;
                      // borderWidth: 0,
                      //  background-color: inherit;
                      //  fontFamily: "IRANSansWeb_Medium(adad_fa)",
                      direction: 'rtl',
                      // borderColor: 'red',
                      // borderStyle: 'dashed',
                      // borderWidth: 1,
                    }}
                    // onClick={backBtnClick} 
                    onPress={() => setStep("firstPage")}
                  >
                    <View style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      //  background-color: inherit;
                      marginLeft: 10,
                      // borderColor: 'red',
                      // borderStyle: 'dashed',
                      // borderWidth: 1,
                    }}>
                      {/* <img 
                      src="/images/login/return-to-mpbilenumber.svg"
                      style={{ width: "18px" }}
                      alt="ویرایش موبایل"
                    /> */}
                      <ReturnToMobilenumberIcon width={18} height={18} />

                    </View>
                    <View style={{
                      //  flex: 0 0 auto;
                      flexGrow: 0,
                      flexShrink: 0,
                      flexBasis: 'auto',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      // borderColor: 'blue',
                      // borderStyle: 'dashed',
                      // borderWidth: 1,
                    }}>
                      <Text style={[styles.mediumTextStyle,
                      { color: '#ff5900', fontSize: 14, }]}>ویرایش موبایل</Text>
                      {/* fontFamily: "IRANSansWeb_Medium(adad_fa)", */}
                    </View>
                  </TouchableOpacity>
                  {/* </div> */}
                  {/* zare_nk_050102_added_end */}
                </View>
                {/* zare_nk_050312_added_end */}
                {/* zare_nk_050312_commented_st */}
                {/* <View
                // ref={refForTimerCont}
                // id="timermoveOpportunityCont"
                style={[styles.formsRow,
                {
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 5,
                  // borderStyle: 'dashed',
                  // borderColor: 'red',
                  // borderWidth: 2,
                }
                ]}
              >
                <View
                  // ref={refForTimer}
                  // id="timermoveOpportunity"
                  style={[styles.formsRow,
                  {
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    // borderStyle: 'dashed',
                    // borderColor: 'green',
                    // borderWidth: 2,
                  }
                  ]}
                >
                  <Text
                    style={[styles.timerTextStyle,
                    {
                      // borderStyle: 'dashed',
                      // borderColor: 'black',
                      // borderWidth: 2,
                    }]}>
                    تایمر: {Math.floor(timer / 1000)} ثانیه
                  </Text>
                </View>

                <TouchableOpacity
                  // id="backToFirsPage"
                  // className={`${Styles.BackBtn}  ${Styles.buttonHover}`}
                  onPress={() => setStep("firstPage")}
                  style={[styles.BackBtn,
                  {
                    // borderStyle: 'dashed',
                    // borderWidth: 2,
                    // borderColor: 'blue',
                  }
                  ]}

                  activeOpacity={0.1}
                >
                  <View
                    // className={`${Styles.BackImgCont} `}
                    style={[styles.BackImgCont]}
                  >
                    <SvgUri
                      uri="https://img.tochikala.com/tochikala/back-icon-in-cardcontainer.svg"
                      width={18}
                      height={15}
                    />
                  </View>
                  <View
                    // className={`${Styles.BackBtnTitleCont} `}
                    style={[styles.BackBtnTitleCont,
                    {
                      //  borderStyle:'dashed',
                      // borderWidth:2,
                      // borderColor:'green',
                    }
                    ]}
                  >
                    <Text
                      style={[styles.mediumTextStyle,
                      {
                        fontSize: 14,
                        // borderStyle:'dashed',
                        // borderWidth:2,
                        // borderColor:'red',
                      }
                      ]}>
                      بازگشت
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View
                // className={`${Styles.lablAndInputCont}  `}
                style={[styles.lablAndInputCont,
                {
                  marginBottom: 5,
                }]}
              >
                <Text
                  style={[styles.boldTextStyle,
                  {
                    fontSize: 14, marginBottom: 10,
                  }
                  ]}>
                  کد تایید را وارد کنید
                </Text>
                
                <TextInput
                  style={[styles.txtBox,
                  {
                    textAlign: "center"
                  }]}
                  placeholder="کد تایید"
                  value={smsVal}
                  // onChangeText={setSmsVal}
                  onChangeText={(textVaredeh) => {
                    smsTxtChanged(textVaredeh);
                  }}
                  keyboardType="numeric"
                />
              </View>

              {smsError && (
                <View
                  // className={`${Styles.formsRow} ${Styles.warningCont}`}
                  style={[styles.formsRow]}
                >
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    // className="forErrorMobile error"
                    style={[styles.errorTextStyle,
                    {
                      fontSize: 12,
                      // borderStyle: 'dashed',
                      // borderWidth: 2,
                      // borderColor: 'green',
                    }]}
                  >{smsError}</Text>
                </View>
              )}

              <View
                // className={Styles.formsRow}
                style={[styles.formsRow,
                {
                  marginTop: 15,
                  marginBottom: 10,
                }
                ]}
              >
                <TouchableOpacity
                  // id="backToFirsPage"
                  // className={`${Styles.BackBtn}  ${Styles.buttonHover}`}
                  onPress={checkSmsForLogin}
                  disabled={isDisabledCheckSmsBtn}


                  style={[{
                    ...(isDisabledCheckSmsBtn === true && styles.disabledBtn),
                    ...(!isDisabledCheckSmsBtn && styles.enableBtn),
                  },
                  {
                    padding: 7,
                    borderRadius: 7,
                    width: "100%",
                    height: 50,
                  }
                  ]}
                  activeOpacity={0.1}
                >
                  <Text
                    style={[styles.mediumTextStyle,
                    {
                      ...(isDisabledCheckSmsBtn === true && { color: 'white' }),
                      ...(!isDisabledCheckSmsBtn && { color: 'white' }),
                      fontSize: 16,
                    }]}>

                    ورود</Text>
                </TouchableOpacity>
              </View>

              <View
                // className={Styles.formsRow}
                style={[styles.formsRow,
                {
                  marginBottom: 10,
                }
                ]}
              >
                <TouchableOpacity
                  onPress={ResendCodefunc}
                  disabled={isDisabledResendCode}
                  style={[{
                    ...(isDisabledResendCode === true && styles.disabledBtn),
                    ...(!isDisabledResendCode && styles.enableBtn),
                  },
                  {
                    padding: 7,
                    borderRadius: 7,
                    width: "100%",
                    height: 50,
                  }
                  ]}
                  activeOpacity={0.1}
                >
                  <Text
                    style={[styles.mediumTextStyle,
                    {
                      ...(isDisabledResendCode === true && { color: 'white' }),
                      ...(!isDisabledResendCode && { color: 'white' }),
                      fontSize: 16,
                    }]}>
                    ارسال مجدد
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                //  className={Styles.formsRow}
                style={[styles.formsRow,
                {
                  marginBottom: 10,
                }
                ]}
              >
                <TouchableOpacity
                  onPress={() => setTimer(0)}
                  disabled={isDisabledRemovTimerBtn}
                  style={[{
                    ...(isDisabledRemovTimerBtn === true && styles.disabledBtn),
                    ...(!isDisabledRemovTimerBtn && styles.enableBtn),
                  },
                  {
                    padding: 7,
                    borderRadius: 7,
                    width: "100%",
                    height: 50,
                  }
                  ]}
                  activeOpacity={0.1}
                >
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={[styles.mediumTextStyle,
                    {
                      ...(isDisabledRemovTimerBtn === true && { color: 'white' }),
                      ...(!isDisabledRemovTimerBtn && { color: 'white' }),
                      fontSize: 16,
                    }]}>
                    ریست تایمر
                  </Text>
                </TouchableOpacity>
              </View> */}
                {/* zare_nk_050312_commented_end */}
              </View>
            )}

          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  errorTextStyle: {
    fontFamily: "IRANSansWeb(FaNum)_Medium",
    color: "red",
  },
  link: {
    color: "blue",
    marginBottom: 10,
    textDecorationLine: "underline",
  },
  ////////////////////////////////////////////////////////////az nextJs
  loginForm: {
    ////zare_nk_050312_commented_st
    // borderWidth: 1,
    // borderColor: "#a9a9a9",
    // borderStyle: 'solid',
    // borderRadius: 20,
    // boxShadow: "#5e5e5e 0px 0px 3px 0px",
    // backgroundColor: "#f6f6f6",
    ////zare_nk_050312_commented_end
    width: "100%",
    height: '100%',   ////zare_nk_050312_added(ta borderdare vasatamoodi neshe!)
    // height: 350,  //zare_nk_041211_commented
    //  minHeight: "min-content", 
    // paddingVertical: 20,  ////zare_nk_050312_commented
    paddingVertical: 40,  ////zare_nk_050312_added
    paddingHorizontal: 10,
    marginHorizontal: 5,
    ////zare_nk_050312_added_st
    display: 'flex',
    flexDirection: 'column',
    // justifyContent:'flex-end',
    ////zare_nk_050312_added_end
  },
  mediumTextStyle: {
    fontFamily: "IRANSansWeb(FaNum)_Medium",
    // color: "#6a6a6a",   ////zare_nk_050315_commented
  },
  timerTextStyle: {
    fontFamily: "IRANSansWeb(FaNum)_Medium",
    color: "#d9534f",
  },

  formsRow: {
    display: "flex",
    flexDirection: "row",
  },

  boldTextStyle: {
    fontFamily: "IRANSansWeb(FaNum)_Bold",
    // color: '#4b4949',   ////zare_nk_050315_commented
  },
  lablAndInputCont: {
    display: "flex",
    flexDirection: "column",
  },

  txtBox: {
    height: 50,
    borderRadius: 12,
    // border: 1px solid silver;
    borderWidth: 1,
    borderColor: "#e0e3e5",
    borderStyle: 'solid',
  },
  // .txtBox:focus {
  //   outline: none;
  //   border: 1px solid red;
  //   box-shadow: 0px 0px 3px 0px red;
  // }


  disabledBtn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: "#6f6b6e",
    backgroundColor: "#eef0f1",  ////zare_nk_050314_nokteh(tapsifoodi)

    // opacity: 0.5, ////zare_nk_050314_commented
  },

  enableBtn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#ff5900",
  },
  // .btn:hover {
  //   background-color: #969596;
  //   box-shadow: 0px 0px 5px 3px #6f6b6e inset;
  // }

  BackBtn: {
    // padding: 10, //zare_nk_041214_commented
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
    backgroundColor: "inherit",
    marginLeft: 10,
  },
  BackBtnTitleCont: {
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 'auto',
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    fontSize: 14,
  },
});
