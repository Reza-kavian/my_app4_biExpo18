//// context/AuthenticationContext.js   ////zare_nk_050517_okk(1)
// 'use client';  ////zare_nk_050518_commented 

// import { jwtDecode } from "jwt-decode";  ////zare_nk_050518_commented

import React, { useState, useEffect, useRef, useCallback, createContext, useContext } from "react";
import {
    View, Text, Image, TouchableOpacity, StyleSheet, ViewStyle, TextStyle, Alert,
    useWindowDimensions,
    StyleProp, Modal, Button, Animated, TextInput,
    Platform, ToastAndroid, LayoutChangeEvent, FlatList, ScrollView, Dimensions,
    PermissionsAndroid
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { jwtDecode } from "jwt-decode";

interface MyJwtPayload {
    ////zare_nk_050518_commented_st
    // FullName: string | null;
    // Mobile: string | null;
    // IdUser: number | null;
    ////zare_nk_050518_commented_end
    ////zare_nk_050518_added_st
    NameMoshtari: string | null;
    unique_name: string | null;
    Mobile: string | null;
    ////zare_nk_050518_added_end
    exp: number | null;
    // .
    // .
    [key: string]: any;
}

interface setIsLoginAndInfType {
    isLogin: boolean | null;
    ////zare_nk_050518_commented_st
    // FullName: string | null;
    // Mobile: string | null;
    // IdUser: number | null;
    ////zare_nk_050518_commented_end
    ////zare_nk_050518_added_st
    NameMoshtari: string | null;
    unique_name: string | null;
    Mobile: string | null;
    ////zare_nk_050518_added_end
}
////zare_nk_050518_commented_st
// function getCookie(name: string) {
//     if (typeof document === 'undefined') {
//         return null; // برای جلوگیری از خطای عدم وجود document
//     }
//     const value = `; ${document.cookie}`; // برای اطمینان از یافتن کوکی‌ها
//     const parts = value.split(`; ${name}=`); // تفکیک کوکی‌ها
//     if (parts.length === 2) {
//         const raw = parts.pop();
//         if (!raw) throw new Error("No parts found");
//         const value = raw.split(";").shift();
//         if (!value) throw new Error("Invalid cookie format");
//         return decodeURIComponent(value);
//     }
//     return null; //اگر کوکی پیدا نشد
// }
////zare_nk_050518_commented_end
////zare_nk_050518_added_st
async function getCookie(name: any) {
    let cookieGeted = await AsyncStorage.getItem(name);
    if (cookieGeted) {
        return cookieGeted;
    }
    return null;
}
////zare_nk_050518_added_end

const AuthenticationContext = createContext<{
    isLoginAndInf: setIsLoginAndInfType| null,
    refreshLoginStatus: () => void,
    ////zare_nk_050518_added_st(ye jahaei dar safahate mokhtalef bedoone
    ////  barresiye methode refreshLoginStatus bekhaim mostaghim IsLoginAndInf ro meghdar bedim(masalan clicke dokmeye logout ke age hatta yek saniyeye pish 
    //// logim movaghagh dasht karbar mostaghim IsLoginAndInf ro khali koneh(dige be zamani exp va vojoode token kari nadarim ke barrasi konim ba refreshLoginStatus))
    setIsLoginAndInf: React.Dispatch<React.SetStateAction<setIsLoginAndInfType | null>>
    ////zare_nk_050518_added_end(ye jahaei dar safahate mokhtalef bedoone
    ////  barresiye methode refreshLoginStatus bekhaim mostaghim IsLoginAndInf ro meghdar bedim(masalan clicke dokmeye logout ke age hatta yek saniyeye pish 
    //// logim movaghagh dasht karbar mostaghim IsLoginAndInf ro khali koneh(dige be zamani exp va vojoode token kari nadarim ke barrasi konim ba refreshLoginStatus))
}>({
    isLoginAndInf: {
        isLogin: null,
        ////zare_nk_050518_commented_st
        // FullName: null,
        // Mobile: null,
        // IdUser: null,
        ////zare_nk_050518_commented_end
        ////zare_nk_050518_added_st
        NameMoshtari: null,
        unique_name: null,
        Mobile: null,
        ////zare_nk_050518_added_end
    },
    refreshLoginStatus: () => { },
    setIsLoginAndInf: () => { },  ////zare_nk_050518_added
});

export function AuthenticationProvider({ children }: { children: React.ReactNode }) {
    console.log('050329-AuthenticationProvider rendered!!');
    const [isLoginAndInf, setIsLoginAndInf] = useState<setIsLoginAndInfType|null>({
        isLogin: null,
        ////zare_nk_050518_commented_st
        // FullName: null,
        // Mobile: null,
        // IdUser: null,
        ////zare_nk_050518_commented_end
        ////zare_nk_050518_added_st
        NameMoshtari: null,
        unique_name: null,
        Mobile: null,
        ////zare_nk_050518_added_end
    });

    const refreshLoginStatus = useCallback(async () => {
        console.log('zare_nk_050505_rere_01.01-refreshLoginStatus called');
        const token = await getCookie("token");
        if (token) {
            console.log(token);
            ////zare_nk_050504_nokteh_st(raveshe 1-estelame samte client(amniate kamtar vali saritar, chon api nemizanim, vali chon baraye hameye api
            ////  haye .netcore ke be token niaz darand parsafar monghazi ya namotabar boodane token ra barrasi mikoneh man baraye amali mesle
            ////  namayeshe login bodan ya logout boodane karbar az hamin raveshe avvale samte client estefadeh mikonam ke saritare va baraye in 
            //// mavarede sadeh be /src/app/api/auth/verifyToken/ api nemizanam))
            try {
                const DecodeToken = jwtDecode<MyJwtPayload>(token);
                console.log('zare_nk_050504_token: ' + JSON.stringify(DecodeToken));
                ////zare_nk_050504_token: {"IdUser":"10006","Mobile":"9351091287","FullName":"رضا کاویان","Type":"User","nbf":1785067797,"exp":1787659797,"iat":1785067797}
                ////zare_nk_050518_commented_st
                // var FullName = DecodeToken.FullName;
                // var Mobile = DecodeToken.Mobile;
                // var IdUser = DecodeToken.IdUser;
                ////zare_nk_050518_commented_end
                ////zare_nk_050518_added_st
                var NameMoshtari = DecodeToken.NameMoshtari;
                var unique_name = DecodeToken.unique_name;
                var Mobile = DecodeToken.Mobile;
                ////zare_nk_050518_added_end

                const expires = (DecodeToken.exp ?? 0) * 1000;
                if (expires) {
                    console.log('zare_nk_050504_1-expires: ' + expires);
                    const expiresTime = Number(expires);
                    if (expiresTime <= Date.now()) {
                        console.log('zare_nk_050504_2-expiresTime <= Date.now()');
                        ////zare_nk_050518_commented_st
                        // document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;                     
                        // document.cookie = `currentShobe=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
                        // document.cookie = `chosenAddress=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
                        ////zare_nk_050518_commented_end
                        ////zare_nk_050518_added_st
                        await AsyncStorage.removeItem("token");
                        await AsyncStorage.removeItem("token_expires");
                        ////zare_nk_050518_added_end

                        setIsLoginAndInf({
                            isLogin: false,
                            ////zare_nk_050518_commented_st
                            // FullName: null,
                            // Mobile: null,
                            // IdUser: null,
                            ////zare_nk_050518_commented_end
                            ////zare_nk_050518_added_st
                            NameMoshtari: null,
                            unique_name: null,
                            Mobile: null,
                            ////zare_nk_050518_added_end
                        });
                    } else {
                        console.log('zare_nk_050504_3-expiresTime > Date.now()');
                        setIsLoginAndInf({
                            isLogin: true,
                            ////zare_nk_050518_commented_st
                            // FullName: FullName,
                            // Mobile: Mobile,
                            // IdUser: IdUser,
                            ////zare_nk_050518_commented_end
                            ////zare_nk_050518_added_st
                            NameMoshtari: NameMoshtari,
                            unique_name: unique_name,
                            Mobile: Mobile,
                            ////zare_nk_050518_added_end
                        });
                    }
                }
                else {
                    console.log('zare_nk_050504_4-!expires');

                    ////zare_nk_050518_commented_st
                    // document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;                     
                    // document.cookie = `currentShobe=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
                    // document.cookie = `chosenAddress=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
                    ////zare_nk_050518_commented_end
                    ////zare_nk_050518_added_st
                    await AsyncStorage.removeItem("token");
                    await AsyncStorage.removeItem("token_expires");
                    ////zare_nk_050518_added_end

                    setIsLoginAndInf({
                        isLogin: false,
                        ////zare_nk_050518_commented_st
                        // FullName: null,
                        // Mobile: null,
                        // IdUser: null,
                        ////zare_nk_050518_commented_end
                        ////zare_nk_050518_added_st
                        NameMoshtari: null,
                        unique_name: null,
                        Mobile: null,
                        ////zare_nk_050518_added_end
                    });
                }
            } catch {
                ////zare_nk_050518_commented_st
                // document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;                     
                // document.cookie = `currentShobe=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
                // document.cookie = `chosenAddress=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
                ////zare_nk_050518_commented_end
                ////zare_nk_050518_added_st
                await AsyncStorage.removeItem("token");
                await AsyncStorage.removeItem("token_expires");
                ////zare_nk_050518_added_end

                setIsLoginAndInf({
                    isLogin: false,
                    ////zare_nk_050518_commented_st
                    // FullName: null,
                    // Mobile: null,
                    // IdUser: null,
                    ////zare_nk_050518_commented_end
                    ////zare_nk_050518_added_st
                    NameMoshtari: null,
                    unique_name: null,
                    Mobile: null,
                    ////zare_nk_050518_added_end
                });
            }
            ////zare_nk_050504_nokteh_end(raveshe 1-estelame samte client(amniate kamtar vali saritar, chon api nemizanim, vali chon baraye hameye api
            ////  haye .netcore ke be token niaz darand parsafar monghazi ya namotabar boodane token ra barrasi mikoneh man baraye amali mesle
            ////  namayeshe login bodan ya logout boodane karbar az hamin raveshe avvale samte client estefadeh mikonam ke saritare va baraye in 
            //// mavarede sadeh be /src/app/api/auth/verifyToken/ api nemizanam))
            ////zare_nk_050504_nokteh_st(raveshe 2-estelame samte server(amniate bishtar vali kondtar, chon api mizanim))
            // try {
            //     const response = await fetch("/api/auth/verifyToken", {  //zare_nk_041115_nokteh(methode Api_LoginUser2 tavassote aghaye parsafar chek mishe dar morede dorostiye sms va zamane monghazi shodanesh,
            //         //vali man mikham bedoonam tokeni ke methode Api_LoginUser2 be man mideh ba secretKey amn shodeh bashe,va projeye samte cllient hatman bayad kelide dastresi ro dashteh bashe ta kasi 
            //         //ba sooeestefade token ro natooneh vakeshi koneh(masalan dar proje haye haker ha),pas az methode verifyToken ke ba dastoore jwt.verify az ma secretKey mikhad estefadeh kardam)
            //         method: "POST",
            //         headers: { "Content-Type": "application/json" },
            //         body: JSON.stringify({ token }),
            //     });
            //     const data = await response.json();
            //     if (response.ok) {
            //         console.log("zare_nk_040925-decodedToken: " + JSON.stringify(data.decoded));
            //         setIsLoginAndInf({
            //             isLogin: true,
            //             FullName: data.decoded.FullName,
            //             Mobile: data.decoded.Mobile,
            //             IdUser: data.decoded.IdUser,
            //         });
            //     } else {
            //         document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
            //         setIsLoginAndInf({
            //             isLogin: false,
            //             FullName: null,
            //             Mobile: null,
            //             IdUser: null,
            //         });
            //     }
            // } catch (error) {
            //     document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
            //     setIsLoginAndInf({
            //         isLogin: false,
            //         FullName: null,
            //         Mobile: null,
            //         IdUser: null,
            //     });

            //     if (error instanceof Error) {
            //         console.log("متاسفانه خطایی رخ داده است323:" + error.message);
            //     } else {
            //         console.log("متاسفانه خطایی رخ داده است343:" + String(error));
            //     }
            // }
            ////zare_nk_050504_nokteh_end(raveshe 2-estelame samte server(amniate bishtar vali kondtar, chon api mizanim))
        }
        else {
            console.log('zare_nk_050504_4-!token');

            ////zare_nk_050518_commented_st
            // document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;                     
            // document.cookie = `currentShobe=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
            // document.cookie = `chosenAddress=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
            ////zare_nk_050518_commented_end
            ////zare_nk_050518_added_st
            await AsyncStorage.removeItem("token");
            await AsyncStorage.removeItem("token_expires");
            ////zare_nk_050518_added_end

            setIsLoginAndInf({
                isLogin: false,
                ////zare_nk_050518_commented_st
                // FullName: null,
                // Mobile: null,
                // IdUser: null,
                ////zare_nk_050518_commented_end
                ////zare_nk_050518_added_st
                NameMoshtari: null,
                unique_name: null,
                Mobile: null,
                ////zare_nk_050518_added_end
            });
        }
    }, []);

    return (
        // <AuthenticationContext.Provider value={{ isLoginAndInf, refreshLoginStatus }}>  ////zare_nk_050518_commented(ye jahaei dar safahate mokhtalef bedoone
        ////  barresiye methode refreshLoginStatus bekhaim mostaghim IsLoginAndInf ro meghdar bedim(masalan clicke dokmeye logout ke age hatta yek saniyeye pish 
        //// logim movaghagh dasht karbar mostaghim IsLoginAndInf ro khali koneh(dige be zamani exp va vojoode token kari nadarim ke barrasi konim ba refreshLoginStatus))

        ////zare_nk_050518_added_st(ye jahaei dar safahate mokhtalef bedoone
        ////  barresiye methode refreshLoginStatus bekhaim mostaghim IsLoginAndInf ro meghdar bedim(masalan clicke dokmeye logout ke age hatta yek saniyeye pish 
        //// logim movaghagh dasht karbar mostaghim IsLoginAndInf ro khali koneh(dige be zamani exp va vojoode token kari nadarim ke barrasi konim ba refreshLoginStatus))
        <AuthenticationContext.Provider value={{ isLoginAndInf:isLoginAndInf, refreshLoginStatus:refreshLoginStatus, setIsLoginAndInf:setIsLoginAndInf }}>
            {/* zare_nk_050518_added_end(ye jahaei dar safahate mokhtalef bedoone
            barresiye methode refreshLoginStatus bekhaim mostaghim IsLoginAndInf ro meghdar bedim(masalan clicke dokmeye logout ke age hatta yek saniyeye pish
            logim movaghagh dasht karbar mostaghim IsLoginAndInf ro khali koneh(dige be zamani exp va vojoode token kari nadarim ke barrasi konim ba refreshLoginStatus)) */}
            {children}
        </AuthenticationContext.Provider>
    );
}

export const useAuthentication = () => {
    return useContext(AuthenticationContext);
};