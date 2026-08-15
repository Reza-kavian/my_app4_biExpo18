// src/components/MyCustomHeader.tsx    ////zare_nk_050517_okk(1)
import React, { useEffect, useState, useCallback } from "react";
import {
  View, Text, Image, TouchableOpacity, StyleSheet,
  //SafeAreaView,  ////zare_nk_040431_commented(in navar vaziate balaye gooshi ro lahaz nemikone va mohtavash va navar ghati mishe!!)
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context"; ////zare_nk_040431_added(in navar vaziate balaye gooshi ro lahaz mikone va mohtavash paeine navarvaziat mire va bahash ghati nemishe)
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useFocusEffect, useRoute, RouteProp } from "@react-navigation/native";
import { HeaderBackButton } from "@react-navigation/elements";

//zare_nk_040530_commented_st(rahe1)
// import { useNavigation } from "@react-navigation/native";
// import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import type { RootStackParamList } from "../types/navigation";
// type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Welcome">;
// type WelcomeRoute = RouteProp<RootStackParamList, "Welcome">;
// const MyCustomHeader = () => {
// const navigation = useNavigation<NavigationProp>();
// const route = useRoute<WelcomeRoute>();
//zare_nk_040530_commented_end(rahe1)
//zare_nk_040530_added_st(rahe2-baraye masalan SplashScreen va tamame safahate dige ham karbord dare-
// parameterhaye voroodi ra barname automat az React Navigation migire)
import { NativeStackHeaderProps } from "@react-navigation/native-stack"; ////zare_nk_040530_added

// import BackButtonIcon from "../components/icons/images/BackButton";   ////zare_nk_050317_added
import BackButtonWhiteIcon from "../components/icons/images/BackButtonWhite";   ////zare_nk_050317_added

import { useAuthentication } from '../context/AuthenticationContext';   ////zare_nk_050318_added

////zare_nk_050523_added_st
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";
////zare_nk_050523_added_end

interface MyJwtPayload {
  ////zare_nk_050501_commented_st(dar api tochikala)
  // FullName: string|null;
  // Mobile: string|null;
  // name: string|null;
  ////zare_nk_050501_commented_end(dar api tochikala)
  ////zare_nk_050501_commented_st(dar api hamyarForoosh)
  NameMoshtari: string | null;
  unique_name: string | null;
  Mobile: string | null;
  // exp: number| null;  ////zare_nk_050501_nokteh(dar in safhe be exp niazi nadaram va mikham az tokene token_expires ke az hamin exp meghdar gereft dar login)
  ////zare_nk_050501_commented_end(dar api hamyarForoosh)

  // exp: number;
  // .
  // .
  [key: string]: any;
}

const MyCustomHeader = ({
  navigation,
  back,
  route,
  options,
}: NativeStackHeaderProps) => {
  const { theme, toggleTheme, isDark } = useContext(ThemeContext);  ////zare_nk_050523_added

  ////zare_nk_040530_added_end(rahe2-baraye masalan SplashScreen va tamame safahate dige ham karbord dare-
  //// parameterhaye voroodi ra barname automat az React Navigation migire)  ////zare_nk_041020_nokteh(albateh dar safahat be jaye NativeStackHeaderProps az NativeStackScreenProps estefadeh mikonim))
  ////zare_nk_050518_commented_st(for use AuthenticationContext)
  // const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);  //
  // const [usersCodeOrName, setUsersCodeOrName] = useState<MyJwtPayload>({
  //   NameMoshtari: null,
  //   unique_name: null,
  //   Mobile: null,
  // });
  ////zare_nk_050518_commented_end(for use AuthenticationContext)

  const { isLoginAndInf, refreshLoginStatus, setIsLoginAndInf } = useAuthentication();  ////zare_nk_050518_added(for use AuthenticationContext)

  ////zare_nk_050518_nokteh_st(donyaye nextJs(jahate yadavari gozashtam bemooneh))
  // const pathname = usePathname();
  // useEffect(() => {
  // console.log('zare_nk_050505_rere_01-useEffect pathname called');
  // refreshLoginStatus();
  // }, [pathname]); 
  ////zare_nk_050518_nokteh_end(donyaye nextJs(jahate yadavari gozashtam bemooneh))
  ////zare_nk_050518_nokteh_st(donyaye reactNative)
  useFocusEffect(
    ////zare_nk_040431(har bar ke karbar ba zadane back be componente MyCustomHeader biad focus soorat migire va useFocusEffect seda zadeh mishe, 
    //// vali age useEffect(...,[]) bezanim va az safheye 1 back bezanim biaim safhe 2 chon MyCustomHeader unmount nashode(chon dar layout hast 
    //// va layout shamele har do safhe ast) eseEffect(...,[]) seda zadeh nemishe )
    useCallback(() => {
      ////zare_nk_040431_nokteh(useCallback be hamrahe useFocusEffect tosiyeh mishe)
      const checkLoginStatus = async () => {  ////zare_nk_051020_nokteh(dar useCallback ham manande useEffect nemitavan az lafze async estefadeh kard va be methode komaki niaz darim mesle checkLoginStatus)
        ////zare_nk_050518_commented_st(for use AuthenticationContext)
        // const token = await AsyncStorage.getItem("token");
        // if (token) {
        //   try {
        //     const tokenExpires = await AsyncStorage.getItem("token_expires");
        //     if (tokenExpires) {
        //       ////zare_nk_050504_nokteh_st(raveshe 1-estelame samte client(amniate kamtar vali saritar, chon api nemizanim, vali chon baraye hameye api
        //       ////  haye .netcore ke be token niaz darand parsafar monghazi ya namotabar boodane token ra barrasi mikoneh man baraye amali mesle
        //       ////  namayeshe login bodan ya logout boodane karbar az hamin raveshe avvale samte client estefadeh mikonam ke saritare va baraye in 
        //       //// mavarede sadeh be /src/app/api/auth/verifyToken/ api nemizanam))
        //       const expiresDate = new Date(tokenExpires).getTime();
        //       if (expiresDate <= Date.now()) {
        //         await handleLogout();
        //       } else {
        //         ////zare_nk_050504_nokteh_end(raveshe 1-estelame samte client(amniate kamtar vali saritar, chon api nemizanim, vali chon baraye hameye api
        //         ////  haye .netcore ke be token niaz darand parsafar monghazi ya namotabar boodane token ra barrasi mikoneh man baraye amali mesle
        //         ////  namayeshe login bodan ya logout boodane karbar az hamin raveshe avvale samte client estefadeh mikonam ke saritare va baraye in 
        //         //// mavarede sadeh be /src/app/api/auth/verifyToken/ api nemizanam))
        //         try {
        //           ////zare_nk_050504_nokteh_st(raveshe 2-estelame samte server(amniate bishtar vali kondtar, chon api mizanim)-azash doori mikonam chon nemikham az projehye vasete
        //           ////  nextjs estefadeh konam va projehye .netcore khodesh verify mikoneh token ro)
        //           // const res = await axios.post(  ////barrasi she age mohtaj be projeye https://testotm.sarinmehr.com nist haminja barrase koneh va api nazaneh(az middleware.tsx projeye https://testotm.sarinmehr.com elham begiram ke az jose estefadeh mikard)
        //           //   NextJsApiAuthUrl + "verifyToken",
        //           //   {
        //           //     token,
        //           //   }
        //           // );
        //           // const data = res.data;
        //           // // console.log("040928-b-1res: " + res);
        //           // // console.log("040928-b-2-JSON res: " + JSON.stringify(res));
        //           // // console.log("040928-b-3-data: " + JSON.stringify(data));
        //           // ////zare_nk_041008_nokteh(meghdare JSON.stringify(data) age logine movafagh ba code payamaki samte api parsafar bashe besoorate 
        //           // // rooberoo hast){"decoded":{"unique_name":"20109","CodeMoshtari":"20109","Mobile":"9351091287","NameMoshtari":"","nbf":1765873441,"exp":1766478241,"iat":1765873441}}
        //           // ////zare_nk_041008_nokteh(age az google login movafagh biad dar callback token rooberoo ra ijad mikonim){IdUser: null,email: decoded?.email ?? null,user_name: null,name: decoded?.name ?? null,},  
        //           // if (
        //           //   res.status === 200
        //           // ) {
        //           ////zare_nk_050504_nokteh_end(raveshe 2-estelame samte server(amniate bishtar vali kondtar, chon api mizanim)-azash doori mikonam chon nemikham az projehye vasete
        //           ////  nextjs estefadeh konam va projehye .netcore khodesh verify mikoneh token ro)

        //           setIsLoggedIn(true);

        //           // alert("data: "+data);
        //           // alert("data.decoded: "+data.decoded);
        //           // alert("data.decoded.NameMoshtari: "+data.decoded.NameMoshtari);
        //           // alert("data.decoded.Mobile: "+data.decoded.Mobile);
        //           // alert("data-stringify: "+JSON.stringify(data));

        //           // var codeMoshtari = data.decoded.CodeMoshtari;  //zare_nk_041115_commented(from api testotmapi)
        //           // var nameMoshtari = data.decoded.NameMoshtari;  //zare_nk_041115_commented(from api testotmapi)
        //           const DecodeToken = jwtDecode<MyJwtPayload>(token);
        //           console.log('zare_nk_050431_DecodeToken is: ' + JSON.stringify(DecodeToken));
        //           ////zare_nk_050431_DecodeToken is: {"unique_name":"9351091287","CodeMoshtari":"9649","Mobile":"9351091287","NameMoshtari":"غلامرضا کاویان","nbf":1784822288,"exp":1785427088,"iat":1784822288}
        //           var NameMoshtari = DecodeToken.NameMoshtari;
        //           var unique_name = DecodeToken.unique_name;
        //           var Mobile = DecodeToken.Mobile;

        //           setUsersCodeOrName((prev) => {
        //             return {
        //               ...prev,
        //               NameMoshtari: NameMoshtari,  //zare_nk_041008_nokteh(age az code payamaki login shim)
        //               unique_name: unique_name,  //zare_nk_041008_nokteh(age az code payamaki login shim)
        //               Mobile: Mobile,  //zare_nk_041008_nokteh(age az google login shim)
        //             };
        //           });
        //           // if (idUSerRef.current) {
        //           //   document.getElementById("idUSer")!.innerText =
        //           //     NameMoshtari != null ? NameMoshtari : CodeMoshtari;
        //           // }    
        //           ////zare_nk_050431_commented_st(chon nemikham az projehye vasete nextjs estefadeh konam va projehye .netcore khodesh verify mikoneh token ro)               
        //           // } else {
        //           //   await handleLogout();
        //           // }
        //           ////zare_nk_050431_commented_end(chon nemikham az projehye vasete nextjs estefadeh konam va projehye .netcore khodesh verify mikoneh token ro)
        //         } catch (err) {
        //           console.log("خطا در بررسی اعتبار توکن:", err);
        //           await handleLogout();
        //         }
        //       }
        //     } else {
        //       // توکن یا تاریخ انقضا وجود نداره، احتمالا لاگین نیست
        //       await handleLogout();
        //     }
        //   } catch (e) {
        //     console.log("Error reading token:", e);
        //     await handleLogout();
        //   }
        // } else {
        //   await handleLogout();
        // }
        ////zare_nk_050518_commented_end(for use AuthenticationContext)
        refreshLoginStatus();  ////zare_nk_050518_added(for use AuthenticationContext)
      };
      checkLoginStatus();
    }, [])
  );
  ////zare_nk_050518_nokteh_end(donyaye reactNative)

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("token_expires");
    // setIsLoggedIn(false);  ////zare_nk_050518_commented(for use AuthenticationContext)
    ////zare_nk_050518_added_st(for use AuthenticationContext)
    setIsLoginAndInf({
      isLogin: false,
      NameMoshtari: null,
      unique_name: null,
      Mobile: null,
    });
    ////zare_nk_050518_added_end(for use AuthenticationContext) 
  };

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={[styles.container,
    {
      // borderWidth: 2,
      // borderColor: "black",
      // borderStyle: 'dashed',
    }]}
      edges={["top"]}>

      <View style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        // borderWidth: 2,
        // borderColor: "silver",
        // borderStyle: 'dashed',
        ////zare_nk_050515_nokteh_end(sabke sefarzandi ke vasati vasat bashe ba positione absolute be vasati)
        position: "relative",
        justifyContent: "space-between",
        ////zare_nk_050515_nokteh_end(sabke sefarzandi ke vasati vasat bashe ba positione absolute be vasati)
      }}>
        {/* لوگو سمت چپ */}
        <View style={[styles.buttonsContainer,
        {
          display: 'flex',
          flexDirection: 'row',
          // borderWidth: 2,
          // borderColor: "green",
          // borderStyle: 'dashed',
          ////zare_nk_050515_nokteh_st(sabke sefarzandi ke vasati vasat bashe ba flex:1 1 31%)
          // flexBasis: '31%',
          // flexGrow: 1,
          // flexShrink: 1,
          ////zare_nk_050515_nokteh_end(sabke sefarzandi ke vasati vasat bashe ba flex:1 1 31%)
          ////zare_nk_050515_nokteh_st(sabke sefarzandi ke vasati vasat bashe ba positione absolute be vasati(farzandane rast va chap tebghe mohtavayeshan ya 
          //// masalan widthe sabete 50px ya har ideye digeh ei mitoonan begiran va hatman nabayad beheshon beghim yeksevvome pedar ro begiran, chon mohem baraye
          //// ma farzande vasati hast ke vasat bashe va hamoon width:100%; va position:absolute daghighan mindazatesh vasate pedar))
          zIndex: 2,
          ////zare_nk_050515_nokteh_end(sabke sefarzandi ke vasati vasat bashe ba positione absolute be vasati(farzandane rast va chap tebghe mohtavayeshan ya 
          //// masalan widthe sabete 50px ya har ideye digeh ei mitoonan begiran va hatman nabayad beheshon beghim yeksevvome pedar ro begiran, chon mohem baraye
          //// ma farzande vasati hast ke vasat bashe va hamoon width:100%; va position:absolute daghighan mindazatesh vasate pedar))
        }]}>
          {/* zare_nk_050518_commented(for use AuthenticationContext) */}
          {/* {isLoggedIn ? ( */}
          {/* zare_nk_050518_added(for use AuthenticationContext) */}
          {isLoginAndInf?.isLogin ? (
            <View style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
              <TouchableOpacity
                onPress={handleLogout}
                style={[styles.button,]}>
                <Text style={styles.buttonText}>خروج</Text>
              </TouchableOpacity>
              <Text style={styles.buttonText}>
                {/* zare_nk_050518_commented(for use AuthenticationContext) */}
                {/* {usersCodeOrName?.NameMoshtari
                  ? usersCodeOrName.NameMoshtari
                  :
                  (usersCodeOrName?.unique_name
                    ? usersCodeOrName.unique_name
                    : usersCodeOrName.Mobile
                  )
                } */}
                {/* zare_nk_050518_added(for use AuthenticationContext) */}
                {isLoginAndInf?.NameMoshtari
                  ? isLoginAndInf.NameMoshtari
                  :
                  (isLoginAndInf?.unique_name
                    ? isLoginAndInf.unique_name
                    : isLoginAndInf.Mobile
                  )
                }
              </Text>
            </View>
          ) : (
            <View style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
              <TouchableOpacity
                onPress={handleLogin}
                style={[styles.button,]}>
                <Text style={styles.buttonText}>ورود</Text>
              </TouchableOpacity>
              <Text style={styles.buttonText}>
                {/* {options.title ?? route.name} */}
                {/* options.title ro mitoonim dar componente AppNavigator dar Stack.Screene tarife safheha benevisim ke ekhtiariye*/}
              </Text>
            </View>
          )}
        </View>

        {/* عنوان وسط */}
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          // borderWidth: 2,
          // borderColor: "blue",
          // borderStyle: 'dashed',
          ////zare_nk_050515_nokteh_st(sabke sefarzandi ke vasati vasat bashe ba flex:1 1 31%)
          // flexBasis: '31%',
          // flexGrow: 1,
          // flexShrink: 1,
          // overflow:'hidden',
          ////zare_nk_050515_nokteh_end(sabke sefarzandi ke vasati vasat bashe ba flex:1 1 31%)
          ////zare_nk_050515_nokteh_st(sabke sefarzandi ke vasati vasat bashe ba positione absolute be vasati)
          width: '100%',
          position: 'absolute',
          ////zare_nk_050515_nokteh_end(sabke sefarzandi ke vasati vasat bashe ba positione absolute be vasati)
        }}>
          {/* zare_nk_050415_commented_st(be khatere static aksGozashtane kerfu(badan age shobe ha daraye icon boodand va apie parsafar baram ferestad dynamic lahaz mikonam) */}
          {/* <TouchableOpacity
            onPress={() => {
              navigation.navigate("Home")
            }}
            style={{
              borderWidth: 1,
              borderColor: "black",
              borderStyle: 'dashed',
            }}>
            <Image
            source={{ uri: "https://img.tochikala.com/Logo/photo14359415832-Copy.jpg" }}
            style={{ width: 40, height: 40, borderRadius: 7 }}
          /> 
          </TouchableOpacity> */}
          {/* zare_nk_050415_commented_end(be khatere static aksGozashtane kerfu(badan age shobe ha daraye icon boodand va apie parsafar baram ferestad dynamic lahaz mikonam) */}
        </View>

        {/* دکمه‌ها سمت راست */}
        <View style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          direction: 'ltr',
          // borderWidth: 2,
          // borderColor: "green",
          // borderStyle: 'dashed',
          ////zare_nk_050515_nokteh_st(sabke sefarzandi ke vasati vasat bashe ba flex:1 1 31%)
          // flexBasis: '31%',
          // flexGrow: 1,
          // flexShrink: 1,
          ////zare_nk_050515_nokteh_end(sabke sefarzandi ke vasati vasat bashe ba flex:1 1 31%)
          ////zare_nk_050515_nokteh_st(sabke sefarzandi ke vasati vasat bashe ba positione absolute be vasati)
          zIndex: 2,
          ////zare_nk_050515_nokteh_end(sabke sefarzandi ke vasati vasat bashe ba positione absolute be vasati)
        }}>
          {/* <TouchableOpacity
            onPress={() => {
              navigation.navigate("Home")
            }}>
            <Image
              source={{ uri: "https://img.tochikala.com/Logo/photo14359415832-Copy.jpg" }}
              style={{ width: 40, height: 40, borderRadius: 7 }}
            />
          </TouchableOpacity> */}
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[styles.buttonText,
            {
              // borderWidth: 1,
              // borderColor: "white",
              // borderStyle: 'dashed',
            }
            ]}>
            {options.title ?? route.name}
            {/* options.title ro mitoonim dar componente AppNavigator dar Stack.Screene tarife safheha benevisim ke ekhtiariye*/}
          </Text>

          {back ? (
            <>
              <HeaderBackButton
                onPress={navigation.goBack}
                tintColor="white"
                backImage={() => <BackButtonWhiteIcon />}  ////zare_nk_050317_nokteh(age backImage nadim reactnative khodeshe icone pishfarzi ro jahate android lahaz 
              //// mikoneh, vali man khastam sefareshi konam )
              />
            </>
          ) : null}
        </View>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: "#459cff",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  title: {
    fontSize: 18,
    fontFamily: "IRANSansWeb(FaNum)_Bold",
    color: "white",
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "orange",
    borderRadius: 5,
    // boxShadow: "#5e5e5e 0px 0px 3px 1px",  ////zare_nk_050317_commented(nabashe ghashangtare)
  },
  buttonText: {
    color: "white",
    // fontWeight: "600",
    fontFamily: "IRANSansWeb(FaNum)_Medium",
  },
});

export default MyCustomHeader;
