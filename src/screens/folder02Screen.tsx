////src/screens/folder02Screen.tsx  //zare_nk_041124_okk
// "use client";  //zare_nk_041024_commented
// import { useRouter, useParams, useSearchParams } from "next/navigation";  //zare_nk_041025_commented
import React, { useEffect, useState, useCallback, useRef } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";   //zare_nk_041025_added
import { NextJsApiUrl, NextJsApiAuthUrl } from "../constants/Urls";   //zare_nk_041027_added
import ReusableButton from "../components/ReusableButton";     //zare_nk_041027_added

////zare_nk_041025_commented_st
// function getCookie(name: any) {
//   const value = `; ${document.cookie}`;  
//   const parts = value.split(`; ${name}=`); 
//   if (parts.length === 2) { 
//     return parts.pop()?.split(";").shift() ?? null; 
//   }
//   return null;
// }
////zare_nk_041025_commented_end
////zare_nk_041025_added_st
async function getCookie(name: any) {
    // await AsyncStorage.removeItem("token");
    let cookieGeted = await AsyncStorage.getItem(name);
    Alert.alert("cookieGeted in getCookie: " + cookieGeted);
    // await AsyncStorage.setItem("token", token); //moadele cooki dar reactnative ast 
    // await AsyncStorage.setItem("token_expires", expires);
    // console.log("1-zare_nk_041009-tokenni is: " + tokenni);
    // const redirectRaw = await AsyncStorage.getItem("redirect");
    // await AsyncStorage.removeItem("redirect");
    // await AsyncStorage.setItem("token", token); 
    // await AsyncStorage.setItem("token_expires", expires); 
    if (cookieGeted) {
        return cookieGeted;
    }
    return null;
}
////zare_nk_041025_added_end

// export default function ProductPage() {  //zare_nk_041026_commented
////zare_nk_041026_added_st 
import type { RootStackParamList } from "../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<RootStackParamList, "folder02">;

export default function ProductPage({
    navigation,
    route,
}:  // back,  //zare_nk_040530(ekhtiariye va chon azash estefadeh nakardim commentent kardim)
    // route, //zare_nk_040530(ekhtiariye va chon azash estefadeh nakardim commentent kardim)
    // options, //zare_nk_040530(ekhtiariye va chon azash estefadeh nakardim commentent kardim)
    Props) {
    ////zare_nk_041026_added_end

    ////zare_nk_041024_added_olgu_st
    // const [BtnsColor, setBtnsColor] = useState<
    //     ("default" | "clicked" | "wined" | "lineWined")[]
    // >(Array(9).fill("default"));

    // refForBtn: React.RefObject<(HTMLButtonElement | null)[]>;


    // const [error, setError] = useState<string | null>(null);
    // setError("خطا در احراز هویت با گوگل");
    // setError("");
    // { error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p> }
    //const [error, setError] = useState("");
    ////zare_nk_041024_added_olgu_end

    // const idUSerRef = useRef<HTMLHeadingElement | null>(null);  //zare_nk_041024_commented
    // const [idUSerText, setIdUSerText] = useState<(string | null)[]>(Array(1).fill(""));   //zare_nk_041024_added(and zare_nk_041027_commented(chon niaz be araye aslan nist va manteghi ham nist!))
    const [idUSerText, setIdUSerText] = useState<string | null>("");  //zare_nk_041027_added 

    // const router = useRouter();  //zare_nk_041026_commented 
    ////zare_nk_041026_added_st_olgu
    // navigation.replace(redirect);
    // navigation.navigate("Home");
    // navigation.navigate("Splash", { target: "Profile" })
    ////zare_nk_041026_added_end_olgu

    useEffect(() => {
        async function asyncFunctionInUseEffect() {
            const token = await getCookie("token");
            Alert.alert('token in ProductPage: ' + token);
            if (token != null) {
                try {
                    // const response = await fetch("/api/auth/verifyToken", {  //zare_nk_041027_commented
                    const response = await fetch(NextJsApiAuthUrl + "verifyToken", { //zare_nk_041027_added
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ token }),
                    });
                    const data = await response.json();

                    if (response.status === 200) {   //ya if (response.ok) { 
                        var idUser = data.decoded.IdUser;
                        var email = data.decoded.email;
                        ////zare_nk_041027_commented_st
                        // if (idUSerRef.current) {
                        //   document.getElementById("idUSer")!.innerText =
                        //     idUser != null ? idUser : email;
                        // }
                        ////zare_nk_041027_commented_end
                        ////zare_nk_041026_added_st
                        let idUserTextLet = (idUser != null ? idUser : email);
                        setIdUSerText(idUserTextLet);
                        ////zare_nk_041026_added_end
                    } else {
                        ////zare_nk_041027_commented_st
                        // const idUSerRefTag = idUSerRef.current;
                        // if (idUSerRefTag instanceof HTMLElement) {
                        //     idUSerRefTag.innerText = "ffffffferer----" + data.errorMessage; //zare_nk_041027_commented
                        // }
                        ////zare_nk_041027_commented_end
                        ////zare_nk_041026_added_st 
                        setIdUSerText(data.errorMessage);
                        ////zare_nk_041026_added_end
                    }
                }
                catch (error) {
                    console.error("❌ خطااااااااااااااااااای JWT:", error);
                    if (error instanceof Error) {
                        // idUSerRef.current!.innerText = error.message;  //zare_nk_041027_commented
                        setIdUSerText(error.message);   //zare_nk_041026_added
                    } else {
                        // idUSerRef.current!.innerText = String(error);  //zare_nk_041027_commented
                        setIdUSerText(String(error));   //zare_nk_041026_added
                    }
                }
            }
            else {
                ////zare_nk_041026_commented_st
                //      if (idUSerRef.current) {   
                //   idUSerRef.current.innerText = "offlinim";
                // }
                ////zare_nk_041026_commented_end
                setIdUSerText("offlinim");   //zare_nk_041026_added
            }
        }
        asyncFunctionInUseEffect();
    });

    ////zare_nk_041027_commented_st
    // const params = useSearchParams(); // دریافت پارامترهای مسیر
    // const id = params.get("id") || "Unknown"; // دریافت مقدار id
    // const name = params.get("name") || "Unknown"; // دریافت مقدار id
    ////zare_nk_041027_commented_end
    ////zare_nk_041027_added_st
    const id = route.params?.id || "Unknown";
    const name = route.params?.name || "Unknown";
    ////zare_nk_041027_added_end

    const handleClick = () => {
        // router.push("/folder03?tab=comments2");  //zare_nk_041027_commented 
        navigation.navigate("folder03", { tab: "comments2", category2: 'cat01', z: 'z01' });  //zare_nk_041027_added 
    };

    const loginClick = () => {
        // router.push("/login");  //zare_nk_041027_commented
        navigation.navigate("Login");  //zare_nk_041027_added
    };

    return (
        <div>
            {/* <h1 id="idUSer" ref={idUSerRef}>
                this is:: /folder02
            </h1> */}
            <Text
                style={[
                    styles.idUSerTextStyle,
                    { fontFamily: "IRANSansWeb_UltraLight" },
                ]}
            >
                {idUSerText}
            </Text>
            <h1>Product {id}</h1>
            <p>This is the product page for name: {name}</p>

            {/* <button onClick={handleClick}>go to folder03 </button> */}
            <ReusableButton
                title="go to folder03"
                onPress={() => { return (handleClick) }}
                backgroundColor="green"
                textColor="white"
                width="80%"
            />

            {/* <button onClick={loginClick}>go to login </button> */}
            <ReusableButton
                title="go to login"
                onPress={() => { return (loginClick) }}
                backgroundColor="blue"
                textColor="white"
                width="80%"
            />
        </div>
    );
}

const styles = StyleSheet.create({
    idUSerTextStyle: {
        // flex: 1,
        // minHeight: "23%",
        // margin: 2,
        // justifyContent: "center",
        // alignItems: "center",
        borderWidth: 2,
        borderColor: "#ccc",
        borderStyle: 'dotted',
    },
});

// export default function ProductPage() {
//     const idUSerRef = useRef<HTMLHeadingElement | null>(null);
//     const router = useRouter();
//     useEffect(() => {
//         const asyncFunctionInUseEffect = async () => {
//             const token = getCookie("token");
//             console.log('040530-033-token: ' + token);
//             if (token != null) {
//                 try {
//                     const response = await fetch("/api/auth/verifyToken", {
//                         method: "POST",
//                         headers: { "Content-Type": "application/json" },
//                         body: JSON.stringify({ token }),
//                     });
//                     const data = await response.json();
//                     if (response.ok) {  //zare_nk_041020_tahlilshe(estefadeye response.status==200 bejaye response.ok)
//                         var idUser = data.decoded.IdUser;
//                         var email = data.decoded.email;
//                         if (idUSerRef.current) {
//                             document.getElementById("idUSer")!.innerText =
//                                 idUser != null ? idUser : email;
//                         }
//                     } else {
//                         const idUSerRefTag = idUSerRef.current;
//                         if (idUSerRefTag instanceof HTMLElement) {
//                             idUSerRefTag.innerText = "ffffffferer----" + data.errorMessage; //zare_nk_040224-nokteh(age az useState estefadeh mikardim reactpasandtar bood)
//                         }
//                     }
//                 } catch (error) {
//                     console.error("❌ خطااااااااااااااااااای JWT:", error);
//                     if (error instanceof Error) {
//                         idUSerRef.current!.innerText = error.message;
//                     } else {
//                         idUSerRef.current!.innerText = String(error);
//                     }
//                 }
//             } else {
//                 if (idUSerRef.current) {
//                     idUSerRef.current.innerText = "offlinim";
//                 }
//             }
//         };
//         asyncFunctionInUseEffect();
//     });
//     // const params = useParams(); // دریافت پارامترهای مسیر  //zare_nk_040224_comment(chon makhsoose safahate dynamic hast va inja kar nemikoneh)
//     const params = useSearchParams(); // دریافت پارامترهای مسیر
//     const id = params.get("id") || "Unknown"; // دریافت مقدار id
//     const name = params.get("name") || "Unknown"; // دریافت مقدار id
//     const handleClick = () => {
//         router.push("/folder03?tab=comments2");
//     };
//     const loginClick = () => {
//         router.push("/login");
//     };
//     return (
//         <div>
//             <h1></h1>
//             <h1 id="idUSer" ref={idUSerRef}>
//                 this is:: /folder02
//             </h1>
//             <h1>Product {id}</h1>
//             <p>This is the product page for name: {name}</p>
//             <button onClick={handleClick}>go to folder03 </button>
//             <button onClick={loginClick}>go to login </button>
//         </div>
//     );
// }
