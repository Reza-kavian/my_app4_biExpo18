// "use client";   //zare_nk_041130_commented
// import { useRouter } from "next/navigation";   //zare_nk_041130_commented
import { useState, useEffect, useRef } from "react";
import { //zare_nk_041129_added
    View, Text, Image, TouchableOpacity, StyleSheet, ViewStyle, TextStyle, Alert,
    useWindowDimensions,
    StyleProp, Modal, Button, Animated, TextInput,
    Platform, ToastAndroid
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";   //zare_nk041129_added
import { NextJsApiUrl, NextJsApiAuthUrl } from "../constants/Urls";   //zare_nk_041129_added 

  const [isOpenedMymodalForWarning, setIsOpenedMymodalForWarning] = useState(false); //zare_nk_041128_added
  const [warningTextInMymodalForWarning, setWarningTextInMymodalForWarning] = useState(''); //zare_nk_041128_added

// import "bootstrap/dist/css/bootstrap.min.css"; //zare_nk_041129_commented 
// let cachedBootstrap: typeof import("bootstrap") | null = null; //zare_nk_041129_commented 
// import "@/styles/ordersHistoryCss.css"; //zare_nk_041129_commented

import { RefObject } from "react";
import { MouseEvent } from "react";
import ReusableButton from "../components/ReusableButton";

////zare_nk_041129_commented_st
// async function getBootstrap() {
//   if (!cachedBootstrap) {
//     cachedBootstrap = await import("bootstrap");
//   }
//   return cachedBootstrap;
// }
////zare_nk_041129_commented_end

////zare_nk_041128_commented_st
// function getCookie(name: any) {
//     const value = `; ${document.cookie}`; // برای اطمینان از یافتن کوکی‌ها
//     const parts = value.split(`; ${name}=`); // تفکیک کوکی‌ها
//     if (parts.length === 2) {
//         // return parts.pop().split(";").shift(); //zare_nk_040406_commented
//         return parts.pop()?.split(";").shift() ?? null; //zare_nk_040406_added
//     }
//     return null; // اگر کوکی پیدا نشد
// }
////zare_nk_041128_commented_end
////zare_nk_041128_added_st
async function getCookie(name: any) {
    ////zare_nk_041128_added_st_olgu 
    // await AsyncStorage.setItem("token", token); //moadele cooki dar reactnative ast 
    // await AsyncStorage.setItem("token_expires", expires);
    // console.log("1-zare_nk_041009-tokenni is: " + tokenni);
    // const redirectRaw = await AsyncStorage.getItem("redirect");
    // await AsyncStorage.removeItem("redirect");
    // await AsyncStorage.setItem("token", token); 
    // await AsyncStorage.setItem("token_expires", expires); 
    ////zare_nk_041128_added_end_olgu
    // await AsyncStorage.removeItem("token");
    let cookieGeted = await AsyncStorage.getItem(name);
    Alert.alert("cookieGeted in getCookie: " + cookieGeted);
    if (cookieGeted) {
        return cookieGeted;
    }
    return null;
}
////zare_nk_041128_added_end 

// export default function ShallowRoutingExample(){  //zare_nk_041127_commented
////zare_nk_041127_added_st
import type { RootStackParamList } from "../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<RootStackParamList, "ordersHistory">;

export default function ShallowRoutingExample({
    navigation,
    route,
}:  // back,  //zare_nk_040530(ekhtiariye va chon azash estefadeh nakardim commentent kardim)
    // route, //zare_nk_040530(ekhtiariye va chon azash estefadeh nakardim commentent kardim)
    // options, //zare_nk_040530(ekhtiariye va chon azash estefadeh nakardim commentent kardim)
    Props) {
    //   const router = useRouter();  //zare_nk_041128_commented 

    type ForoshStateType = {
        ShomarehFaktorForoosh: number;
        IdFaktorForoosh: number;
        TarikhSefaresh: string;
        MablaghMasraf: number;
        JamTakhfifTitr: number;
        JamTakhfifSatr: number;
        MablaghKhales: number;
        forooshTitrRowsLength: number;
    };

    const [ForooshSatrHideForooshTitr, setForooshSatrHideForooshTitr] =
        useState<ForoshStateType | null>(null);
    const [bisatr, setBisatr] = useState(true);
    const [bisatrDarSatr, setBisatrDarSatr] = useState(true);

    type ForooshSatrType = {
        IdKala: number;
        NameKala: string;
        Tedad: number;
        IsVazni: number;
        ForooshSatr: number;
        // [key: string]: any; //yani az IdKala motmaen hastim vali fildhaye digare db ra parsa ina tagheir dadan dar in peroujeh shayad aslan
        //  be man nagan va timi kar nakonim,pas [key: string]: any; gozashtam ke kolli hast(chon hameye fieldha ro neveshtam commentesh kardam)
    };
    //   const [forooshSatrRows, setForooshSatrRows] = useState<ForooshSatrType[] | null>(null);  //zare_nk_041130_commented
    const [forooshSatrRows, setForooshSatrRows] = useState<ForooshSatrType[] | null>([]);  //zare_nk_041130_added

    type ForooshTitrType = {
        IdFaktorForoosh: number;
        NameSobe: string;
        VaziatFactor: string;
        UserFullName: string;
        TarikhSefaresh: string;
        JamKhales: number;
        ShomareFaktor: number;
        JamMasraf: number;
        JamTakhfifTitr: number;
        JamTakhfifSatr: number;
        // [key: string]: any; //yani az IdKala motmaen hastim vali fildhaye digare db ra parsa ina tagheir dadan dar in peroujeh shayad aslan 
        // be man nagan va timi kar nakonim,pas [key: string]: any; gozashtam ke kolli hast(chon hameye fieldha ro neveshtam commentesh kardam)
    };
    //   const [forooshTitrRows, setForooshTitrRows] = useState<ForooshTitrType[] | null>(null);  //zare_nk_041130_commented
    const [forooshTitrRows, setForooshTitrRows] = useState<ForooshTitrType[] | null>([]);  //zare_nk_041130_added
    const [isShowFaktorForooshSatr, setIsShowFaktorForooshSatr] = useState(false);

    const [isShowFaktorForooshTitr, setIsShowFaktorForooshTitr] = useState<string | null>(null);

    type ShowForooshSatrHideForooshTitrType = {
        ShomarehFaktorForoosh: number;
        IdFaktorForoosh: number;
        TarikhSefaresh: string;
        MablaghMasraf: number;
        JamTakhfifTitr: number;
        JamTakhfifSatr: number;
        MablaghKhales: number;
        forooshTitrRowsLength: number;
    };

    async function ShowForooshSatrHideForooshTitr({
        ShomarehFaktorForoosh,
        IdFaktorForoosh,
        TarikhSefaresh,
        MablaghMasraf,
        JamTakhfifTitr,
        JamTakhfifSatr,
        MablaghKhales,
        forooshTitrRowsLength,
    }:
        ShowForooshSatrHideForooshTitrType) {
        setIsShowFaktorForooshSatr(true);
        setIsShowFaktorForooshTitr(null);
        setForooshSatrHideForooshTitr(() => {
            return {
                ShomarehFaktorForoosh: ShomarehFaktorForoosh,
                IdFaktorForoosh: IdFaktorForoosh,
                TarikhSefaresh: TarikhSefaresh,
                MablaghMasraf: MablaghMasraf,
                JamTakhfifTitr: JamTakhfifTitr,
                JamTakhfifSatr: JamTakhfifSatr,
                MablaghKhales: MablaghKhales,
                forooshTitrRowsLength: forooshTitrRowsLength,
            };
        });
        const token =await getCookie("token");
        if (token == null) {
            setIsOpenedMymodalForWarning(true);
            setWarningTextInMymodalForWarning("لطفا ابتدا آنلاین شوید");
            // const bootstrap = await getBootstrap();
            // const mymodalForWarning = new bootstrap.Modal(
            //     document.getElementById("mymodalForWarning")
            // );
            // mymodalForWarning.show();
            // const span = document.querySelector(
            //     "#mymodalForWarning .errorInMymodalForWarning"
            // );
            // if (span instanceof HTMLElement) {
            //     span.innerText = "لطفا ابتدا آنلاین شوید";
            // } 
            return;
        } else {
            // let ApiUrl = "https://testotmapi.sarinmehr.com/api/v1/Hyper/";
            // var urlSelectFaktorForooshSatr = ApiUrl + "Api_SelectFaktorForooshSatr";
            let ApiUrl = "https://api.tochikala.com/api/";
            var urlSelectFaktorForooshSatr = ApiUrl + "User/Api_SelectForooshSatr";
            const response = await fetch(urlSelectFaktorForooshSatr, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
                body: JSON.stringify({
                    IdForooshTitr: IdFaktorForoosh,
                }),
                // credentials: "include", //zare_nk_040402_commented
            });
            const data = await response.json();
            if (response.ok) {
                if (data.status != 0) {
                    setIsOpenedMymodalForWarning(true);
                    setWarningTextInMymodalForWarning(result.errors[0]);
                    // const bootstrap = await getBootstrap();
                    // const mymodalForWarning = new bootstrap.Modal(
                    //     document.getElementById("mymodalForWarning")
                    // );
                    // mymodalForWarning.show();
                    // const span = document.querySelector(
                    //     "#mymodalForWarning .modal-body span"
                    // );
                    // if (span instanceof HTMLElement) {
                    //     span.innerText = result.errors[0];
                    // }
                } else if (data.status == 0) {
                    var result = JSON.parse(data.data.list);
                    console.log('zare_nk_041123-resultSatr: ' + JSON.stringify(result));
                    console.log('zare_nk_041123-resultSatr.length: ' + result.length);
                    if (result.length == 0) {
                        setBisatrDarSatr(true);
                        return;
                    }
                    setBisatrDarSatr(false);
                    setForooshSatrRows(result);
                }
            } else {
                if (response.status == 401) {
                    setIsOpenedMymodalForWarning(true);
                    setWarningTextInMymodalForWarning("لطفا ابتدا آنلاین شوید");
                    // const bootstrap = await getBootstrap();
                    // const mymodalForWarning = new bootstrap.Modal(
                    //     document.getElementById("mymodalForWarning")
                    // );
                    // mymodalForWarning.show();
                    // const span = document.querySelector(
                    //     "#mymodalForWarning .errorInMymodalForWarning"
                    // );
                    // if (span instanceof HTMLElement) {
                    //     span.innerText = "لطفا ابتدا آنلاین شوید";
                    // }
                }
            }
        }
    }

    useEffect(() => {
        ////zare_nk_041130_commented_st
        // const mymodalForWarning = document.getElementById("mymodalForWarning");
        // const handlerForMymodalForWarning = () => {
        //     router.refresh(); //zare_nk_040312_added-kolle safhe refresh nemishe va saritar va behtare
        //     //  window.location.reload();  //zare_nk_040312_added-faghat dar sourate niaz vaghti ke router.refresh() javab nadad
        // };
        // if (mymodalForWarning) {
        //     mymodalForWarning.addEventListener(
        //         "hidden.bs.modal",
        //         handlerForMymodalForWarning
        //     );
        // }
        // return () => {
        //     // پاکسازی رویداد در unmount
        //     if (mymodalForWarning) {
        //         mymodalForWarning.removeEventListener(
        //             "hidden.bs.modal",
        //             handlerForMymodalForWarning
        //         );
        //     }
        // };
        ////zare_nk_041130_commented_end
    }, []);

    useEffect(() => {
        if (ForooshSatrHideForooshTitr != null) {
            return;
        }
        async function tempFuncForAsync() {
            const token =await getCookie("token");
            if (token == null) {
                setIsOpenedMymodalForWarning(true);
                setWarningTextInMymodalForWarning("لطفا ابتدا آنلاین شوید");
                // const bootstrap = await getBootstrap();
                // const mymodalForWarning = new bootstrap.Modal(
                //     document.getElementById("mymodalForWarning")
                // );
                // mymodalForWarning.show();
                // const span = document.querySelector(
                //     "#mymodalForWarning .errorInMymodalForWarning"
                // );
                // if (span instanceof HTMLElement) {
                //     span.innerText = "لطفا ابتدا آنلاین شوید";
                // }  
                return;
            } else {
                // const token = getCookie("token");
                // let ApiUrl = "https://testotmapi.sarinmehr.com/api/v1/Hyper/";
                // var urlSelectFaktorForooshTitr = ApiUrl + "Api_SelectFaktorForooshTitr";
                let ApiUrl = "https://api.tochikala.com/api/";
                var urlSelectFaktorForooshTitr = ApiUrl + "User/Api_SelectForooshTitr";
                const response = await fetch(urlSelectFaktorForooshTitr, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                    // body: JSON.stringify({}),  //zare_nk_0411123_commented
                    ////zare_nk_0411123_added_st
                    body: JSON.stringify({
                        'Sort': 'IdFaktorForoosh',
                        'SortDir': 'DESC',
                    }),
                    ////zare_nk_0411123_added_end
                    // credentials: "include", //zare_nk_040402_commented
                });
                const data = await response.json();
                if (response.ok) {
                    if (data.status != 0) {
                        setIsOpenedMymodalForWarning(true);
                        setWarningTextInMymodalForWarning(data.errors[0]);
                        // const bootstrap = await getBootstrap();
                        // const mymodalForWarning = new bootstrap.Modal(
                        //     document.getElementById("mymodalForWarning")
                        // );
                        // mymodalForWarning.show();
                        // const span = document.querySelector(
                        //     "#mymodalForWarning .errorInMymodalForWarning"
                        // );
                        // if (span instanceof HTMLElement) {
                        //     span.innerText = data.errors[0];
                        // }
                    } else if (data.status == 0) {
                        var result = JSON.parse(data.data.list);
                        console.log('zare_nk_041123-result: ' + JSON.stringify(result));
                        console.log('zare_nk_041123-resresult.lengthult: ' + result.length);
                        if (result.length == 0) {
                            setBisatr(true);
                            return;
                        }
                        setBisatr(false);
                        setForooshTitrRows(result);
                    }
                } else {
                    if (response.status == 401) {
                        setIsOpenedMymodalForWarning(true);
                        setWarningTextInMymodalForWarning("لطفا ابتدا آنلاین شوید");
                        // const bootstrap = await getBootstrap();
                        // const mymodalForWarning = new bootstrap.Modal(
                        //     document.getElementById("mymodalForWarning")
                        // );
                        // mymodalForWarning.show();
                        // const span = document.querySelector(
                        //     "#mymodalForWarning .errorInMymodalForWarning"
                        // );
                        // if (span instanceof HTMLElement) {
                        //     span.innerText = "لطفا ابتدا آنلاین شوید";
                        // }
                    }
                }
            }
        }
        tempFuncForAsync();
    }, [isShowFaktorForooshTitr]);

    const onBackClick = () => {
        setIsShowFaktorForooshSatr(false);
        setIsShowFaktorForooshTitr("notNull");
        setForooshSatrHideForooshTitr(null);
    };

    return isShowFaktorForooshSatr == true ? (
        <View
            id="MyOrdersDetCont"
            style={{
                // color: "#4B4949",  //zare_nk_041130_nokteh(baraye farzandan gonjandeh beshe)
                display: "flex",
                flexDirection: "column",
                width: "100%",
                direction: "rtl",
            }}
        >
            <View
                id="MyOrderDet"
                // className="MyOrderDet"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    marginBottom: 40,
                    marginTop: 10,
                    direction: "rtl",
                }}
            >
                {/* Header */}
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginBottom: 15,
                    }}
                >
                    <View
                        // className="titleStyle"
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <h6 style={{ marginLeft: 10, fontSize: 18 }}>جزئیات سفارش</h6>
                        {ForooshSatrHideForooshTitr != null && (
                            <Text style={{ fontSize: 18, }}>{ForooshSatrHideForooshTitr.IdFaktorForoosh}</Text>
                        )}
                    </View>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: 'flex-start',
                        }}
                    >
                        <TouchableOpacity
                            // className="buttonHover titleStyle"
                            // href="#"
                            // onClick={onBackClick}
                            onPress={onBackClick}
                            style={{
                                padding: 10,
                                borderRadius: 7,
                                display: "flex",
                                flexDirection: "row",
                                // textDecoration: "none",
                                backgroundColor: "inherit",
                            }}

                            activeOpacity={0.1}
                        >
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    backgroundColor: "inherit",
                                    marginLeft: 10,
                                }}
                            >
                                {/* <img
                                    src="https://img.tochikala.com/tochikala/back-icon-in-cardcontainer.svg"
                                    style={{ width: 18 }}
                                    alt="بازگشت به لیست سفارش ها"
                                /> */}
                                <Image
                                    source={{ uri: "https://img.tochikala.com/tochikala/back-icon-in-cardcontainer.svg" }}
                                    style={{ width: 18 }}
                                />
                            </View>
                            <View
                                style={{
                                    // flex: "0 0 auto",
                                    flexGrow: 0,
                                    flexShrink: 0,
                                    flexBasis: 'auto',
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    // fontSize: 14,
                                }}
                            >
                                <Text style={{ fontSize: 14, }}>بازگشت به لیست سفارش ها</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Order Date */}
                <View
                    // className="tahvilTarikhCont"
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <View
                        // className="tahvilCont"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            // border: "1px solid #a9a9a9",
                            borderWidth: 1,
                            borderStyle: 'solid',
                            borderColor: '#a9a9a9',
                            borderRadius: 10,
                            padding: 16,
                            marginLeft: 0,
                            boxShadow: "#5e5e5e 0px 0px 3px 0px",
                            backgroundColor: "#f6f6f6",
                        }}
                    >
                        <View style={{ display: "flex", flexDirection: "row",  }}>
                            <Text
                            //  className="titleStyle"
                            style={{fontSize: 14,}}
                            >تاریخ سفارش</Text>
                            <Text style={{
                                // margin: "0 5px" ,
                                marginVertical: 0,
                                marginHorizontal: 5,
                            }}
                            >:</Text>
                            {ForooshSatrHideForooshTitr != null && (
                                <Text
                                    // className="valueStyle" 
                                    style={{ marginLeft: 5 }}>
                                    {ForooshSatrHideForooshTitr.TarikhSefaresh ?? ""}
                                </Text>
                            )}
                        </View>
                    </View>
                </View>

                {/* Product Section */}
                <View
                    // className="productJoziatCont"
                    style={{ display: "flex", marginTop: 10 }}
                >
                    {/* Product Count */}
                    <View
                        // className="productContInMyOrderDet valueStyle"
                        style={{
                            // border: "1px solid #a9a9a9",
                            borderWidth: 1,
                            borderStyle: 'solid',
                            borderColor: '#a9a9a9',
                            borderRadius: 10,
                            display: "flex",
                            flexDirection: "column",
                            padding: 16,
                            backgroundColor: "#f6f6f6",
                            boxShadow: "#5e5e5e 0px 0px 3px 0px",
                        }}
                    >
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <View style={{ display: "flex", flexDirection: "row" }}>
                                <Text
                                    // className="titleStyle"
                                    style={{ fontSize: 16 }}>
                                    محصولات
                                </Text>
                            </View>
                            <View style={{ display: "flex", flexDirection: "row" }}>
                                {/* zare_nk_041123_commented_st */}
                                {/* {ForooshSatrHideForooshTitr != null && (
                  <span style={{ marginLeft: 7 }}>
                    {ForooshSatrHideForooshTitr.forooshTitrRowsLength}
                  </span>
                )} */}
                                {/* zare_nk_041123_commented_end */}
                                {/* zare_nk_041123_added_st */}
                                {forooshSatrRows != null && (
                                    <Text style={{ marginLeft: 7, fontSize: 14, }}>
                                        {forooshSatrRows.length}
                                    </Text>
                                )}
                                {/* zare_nk_041123_added_end */}
                                <Text>کالا</Text>
                            </View>
                        </View>

                        {!bisatrDarSatr && (
                            <>
                                {forooshSatrRows?.map((item, index) => {
                                    return (
                                        <View
                                            key={index || item.IdKala}
                                            style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                // borderBottom: "1px solid #F5F5F5",
                                                borderBottomWidth: 1,
                                                borderStyle: 'solid',
                                                borderBottomColor: '#F5F5F5',
                                                // padding: "10px 0px",
                                                paddingVertical: 10,
                                                paddingHorizontal: 0,
                                            }}
                                        >
                                            <View
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    marginLeft: 10,
                                                }}
                                            >
                                                {/* <img
                                                    loading="lazy"
                                                    src={`https://img.tochikala.com/Product/${item.IdKala}.webp`}
                                                    alt={item.NameKala || ""}
                                                    style={{ width: "64px", height: "64px" }}
                                                // onError={(e) => {
                                                //   e.target.onerror = null;
                                                //   e.target.src =
                                                //     "https://img.tochikala.com/Logo/photo14359415832-Copy.webp";
                                                // }}
                                                /> */}
                                                <Image
                                                    source={{ uri: `https://img.tochikala.com/Product/${item.IdKala}.webp` }}
                                                    style={{ width: 64, height: 64, }}
                                                />
                                            </View>

                                            <View
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyContent: "space-around",
                                                }}
                                            >
                                                <View style={{ display: "flex", flexDirection: "row" }}>
                                                    <Text
                                                        style={{
                                                            fontSize: 13,
                                                            fontFamily: "IRANSansWeb(FaNum)_Medium",
                                                        }}
                                                    >
                                                        {item.NameKala || ""}
                                                    </Text>
                                                </View>

                                                <View
                                                    style={{
                                                        display: "flex",
                                                        flexDirection: "row",
                                                    }}
                                                >
                                                    <Text style={{ marginLeft: 5, fontSize: 14, }}>
                                                        {item.Tedad ?? ""}
                                                    </Text>
                                                    <Text style={{ fontSize: 14, }}>
                                                        {item.IsVazni === 0 ? "عدد" : "کیلوگرم"}
                                                    </Text>

                                                    <Text
                                                        style={{
                                                            width: 0,
                                                            height: 25,
                                                            // borderLeft: "2px solid silver",
                                                            borderLeftWidth: 2,
                                                            borderStyle: 'solid',
                                                            borderLeftColor: 'silver',
                                                            // margin: "0px 5px",
                                                            marginVertical: 0,
                                                            marginHorizontal: 5,
                                                        }}
                                                    ></Text>

                                                    <View style={{ display: "flex", flexDirection: "row" }}>
                                                        <Text style={{ marginLeft: 5 }}>
                                                            {item.ForooshSatr != null
                                                                ? item.ForooshSatr.toLocaleString()
                                                                : ""}
                                                        </Text>
                                                        <Text>ریال</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    );
                                })}
                            </>
                        )}
                    </View>

                    {/* Invoice Details */}
                    <View
                        // className="joziatFaktorCont valueStyle"
                        style={{
                            // border: "1px solid #a9a9a9",
                            borderWidth: 1,
                            borderStyle: 'solid',
                            borderColor: '#a9a9a9',
                            borderRadius: 10,
                            display: "flex",
                            flexDirection: "column",
                            padding: 16,
                            // fontSize: 14,
                            backgroundColor: "#f6f6f6",
                            // height: "fit-content",
                            boxShadow: "#5e5e5e 0px 0px 3px 0px",
                        }}
                    >
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                // borderBottom: "1px solid #F5F5F5",
                                borderBottomWidth: 1,
                                borderStyle: 'solid',
                                borderBottomColor: '#F5F5F5',
                                // padding: "10px 0",
                                paddingVertical: 10,
                                paddingHorizontal: 0,
                            }}
                        >
                            <Text
                                // className="titleStyle"
                                style={{ fontSize: 14, }}
                            >جزئیات فاکتور</Text>
                        </View>

                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                // borderBottom: "1px solid #F5F5F5",
                                borderBottomWidth: 1,
                                borderStyle: 'solid',
                                borderBottomColor: '#F5F5F5',
                                // padding: "12px 0",
                                paddingVertical: 12,
                                paddingHorizontal: 0,
                            }}
                        >
                            <View style={{ display: "flex", flexDirection: "row" }}>
                                <Text style={{ fontSize: 14, }}>مجموع خرید شما</Text>
                            </View>
                            <View style={{ display: "flex", flexDirection: "row" }}>
                                {ForooshSatrHideForooshTitr != null && (
                                    <Text style={{ marginLeft: 10, fontSize: 16 }}>
                                        {ForooshSatrHideForooshTitr.MablaghMasraf?.toLocaleString() ??
                                            ""}
                                    </Text>
                                )}
                                {/* <span style={{ marginLeft: 10, fontSize: 16 }}>{MablaghMasraf?.toLocaleString() ?? ''}</span> */}
                                <Text style={{ fontSize: 14, }}>ریال</Text>
                            </View>
                        </View>

                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                // borderBottom: "1px solid #F5F5F5",
                                borderBottomWidth: 1,
                                borderStyle: 'solid',
                                borderBottomColor: '#F5F5F5',
                                // padding: "12px 0",
                                paddingVertical: 12,
                                paddingHorizontal: 0,
                            }}
                        >
                            <View style={{ display: "flex", flexDirection: "row" }}>
                                <Text style={{ fontSize: 14, }}>سود شما از این خرید</Text>
                            </View>
                            <View style={{ display: "flex", flexDirection: "row" }}>
                                {ForooshSatrHideForooshTitr != null && (
                                    <Text style={{ marginLeft: 10, fontSize: 16 }}>
                                        {ForooshSatrHideForooshTitr.JamTakhfifSatr?.toLocaleString() ??
                                            0}
                                    </Text>
                                )}
                                {/* <span style={{ marginLeft: 10, fontSize: 16 }}>{jamTakhfifSatr?.toLocaleString() ?? ''}</span> */}
                                <Text>ریال</Text>
                            </View>
                        </View>

                        {/* zare_nk_041123_added_st(codeTakhfif zirmajmooeye JamTakhfifTitr hast) */}
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                // borderBottom: "1px solid #F5F5F5",
                                borderBottomWidth: 1,
                                borderStyle: 'solid',
                                borderBottomColor: '#F5F5F5',
                                // padding: "12px 0",
                                paddingVertical: 12,
                                paddingHorizontal: 0,
                            }}
                        >
                            <View style={{ display: "flex", flexDirection: "row" }}>
                                <Text style={{ fontSize: 14, }}>کد تخفیف</Text>
                            </View>
                            <View style={{ display: "flex", flexDirection: "row" }}>
                                {ForooshSatrHideForooshTitr != null && (
                                    <Text style={{ marginLeft: 10, fontSize: 16 }}>
                                        {ForooshSatrHideForooshTitr.JamTakhfifTitr?.toLocaleString() ??
                                            0}
                                    </Text>
                                )}
                                {/* <span style={{ marginLeft: 10, fontSize: 16 }}>{JamTakhfifTitr?.toLocaleString() ?? ''}</span> */}
                                <Text>ریال</Text>
                            </View>
                        </View>
                        {/* zare_nk_041123_added_end(codeTakhfif zirmajmooeye JamTakhfifTitr hast) */}

                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                // padding: "12px 0",
                                paddingVertical: 12,
                                paddingHorizontal: 0,
                            }}
                        >
                            <View style={{ display: "flex", flexDirection: "row" }}>
                                <Text style={{ fontSize: 14, }}>مبلغ خالص</Text>
                            </View>
                            <View style={{ display: "flex", flexDirection: "row" }}>
                                {/* <span style={{ marginLeft: 10, fontSize: 16 }}>{MablaghKhales?.toLocaleString() ?? ''}</span> */}

                                {ForooshSatrHideForooshTitr != null && (
                                    <Text style={{ marginLeft: 10, fontSize: 16 }}>
                                        {ForooshSatrHideForooshTitr.MablaghKhales?.toLocaleString() ??
                                            ""}
                                    </Text>
                                )}
                                <Text>ریال</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    ) : (
        <View
            id="MyOrdersCont"
            style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                direction: "rtl",
            }}
        >
            {!bisatr && (
                <>
                    {forooshTitrRows?.map((item, index) => {
                        return (
                            <View
                                key={item.IdFaktorForoosh}
                                // id={`MyOrder-${item.IdFaktorForoosh}`}
                                // className="MyOrder buttonHoverr"
                                style={{
                                    // cursor: "default",
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "100%",
                                    // border: "1px solid #a9a9a9",
                                    borderWidth: 1,
                                    borderStyle: 'solid',
                                    borderColor: '#a9a9a9',

                                    borderRadius: 10,
                                    // color: "#adadad",
                                    marginBottom: 15,
                                    boxShadow: "#5e5e5e 0px 0px 3px 0px",
                                    backgroundColor: "#f6f6f6",
                                }}
                            >
                                <View
                                    // className="MyOrderHead"
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        // borderBottom: "1px solid #E7E7E7",
                                        borderBottomWidth: 1,
                                        borderStyle: 'solid',
                                        borderBottomColor: '#E7E7E7',

                                        // padding: "5px 0px 5px 20px",
                                        paddingTop: 5,
                                        paddingRight: 0,
                                        paddingBottom: 5,
                                        paddingLeft: 20,
                                    }}
                                >
                                    <View style={{ display: "flex", flexDirection: "row" }}>
                                        <View
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                marginLeft: 10,
                                            }}
                                        >
                                            <View
                                                // className="rounded-pilll"
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    // padding: "0px 10px",
                                                    paddingVertical: 0,
                                                    paddingHorizontal: 10,
                                                }}
                                            >
                                                {/* <img
                                                    style={{ width: "44px" }}
                                                    src="https://img.tochikala.com/Logo/photo14359415832-Copy.jpg"
                                                    alt="هایپر&zwnj;کرفو"
                                                /> */}
                                                <Image
                                                    source={{ uri: "https://img.tochikala.com/Logo/photo14359415832-Copy.jpg" }}
                                                    style={{ width: 44 }}
                                                />
                                            </View>
                                        </View>

                                        <View
                                            style={{
                                                display: "none",
                                                flexDirection: "column",
                                                justifyContent: "space-around",
                                            }}
                                        >
                                            <View
                                                style={{
                                                    // flex: "0 0 auto",
                                                    flexGrow: 0,
                                                    flexShrink: 0,
                                                    flexBasis: 'auto',
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    // color: "#322E2E",
                                                }}
                                            >
                                                <Text
                                                    // className="nameShobe titleStyle"
                                                    style={{ fontSize: 12, color: "#322E2E", }}
                                                >
                                                    {item.NameSobe}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            display: "none",
                                            flexDirection: "column",
                                            justifyContent: "space-around",
                                        }}
                                    >
                                        <View
                                            style={{
                                                // flex: "0 0 auto",
                                                flexGrow: 0,
                                                flexShrink: 0,
                                                flexBasis: 'auto',
                                                display: "flex",
                                                flexDirection: "row",
                                                // fontSize: "15px",
                                            }}
                                        >
                                            <Text
                                                // className="valueStyle"
                                                // id={`VaziatFactor-${item.IdFaktorForoosh}`}
                                                style={{
                                                    padding: 7,
                                                    borderRadius: 7,
                                                    fontSize: 12,
                                                    color: "#adadad",
                                                }}
                                            >
                                                {item.VaziatFactor}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                <View
                                    // className="MyOrderBody"
                                    style={{ display: "flex", flexDirection: "column" }}
                                >
                                    <View
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            // fontSize: "14px",
                                            paddingBottom: 10,
                                            width: "100%",
                                        }}
                                    >
                                        <View
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                width: "100%",
                                            }}
                                        >
                                            <View
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    // margin: "7px 0px",
                                                    marginVertical: 7,
                                                    marginHorizontal: 0,
                                                }}
                                            >
                                                <Text
                                                    // className="titleStyle"
                                                    numberOfLines={1}
                                                    style={{
                                                        // whiteSpace: "nowrap",
                                                        fontFamily: "IRANSansWeb(FaNum)_Bold",
                                                        fontSize: 14,
                                                        color: "#adadad",
                                                    }}
                                                >
                                                    {" "}
                                                    نام شخص{" "}
                                                </Text>
                                                <Text style={{
                                                    // margin: "0px 5px", 
                                                    marginVertical: 0,
                                                    marginHorizontal: 5,
                                                    fontSize: 14,
                                                    color: "#adadad",
                                                }}>:</Text>
                                                {/* <span  style={{textOverflow: 'ellipsis',overflow: 'hidden',display: '-webkit-box',-webkit-line-clamp: '2',lineClamp: '2',-webkit-box-orient: 'vertical'}}>{ item.UserFullName} </span> */}
                                                <Text
                                                    // className="valueStyle"
                                                    numberOfLines={1}
                                                    ellipsizeMode="tail"
                                                    style={{
                                                        // textOverflow: "ellipsis",
                                                        // overflow: "hidden",
                                                        // display: "-webkit-box",
                                                        // lineClamp: "2",
                                                        fontSize: 14,
                                                        color: "#adadad",
                                                    }}
                                                >
                                                    {item.UserFullName}{" "}
                                                </Text>
                                            </View>

                                            <View
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    // margin: "7px 0px",
                                                    marginVertical: 7,
                                                    marginHorizontal: 0,
                                                }}
                                            >
                                                <Text
                                                    // className="titleStyle"
                                                    numberOfLines={1}
                                                    style={{
                                                        // whiteSpace: "nowrap",
                                                        fontFamily: "IRANSansWeb(FaNum)_Bold",
                                                        fontSize: 14,
                                                        color: "#adadad",
                                                    }}
                                                >
                                                    {" "}
                                                    تاریخ سفارش{" "}
                                                </Text>
                                                <Text style={{
                                                    //  margin: "0px 5px", 
                                                    marginVertical: 0,
                                                    marginHorizontal: 5,
                                                    color: "#adadad",
                                                }}>: </Text>
                                                <Text
                                                    //  className="valueStyle"
                                                    style={{ color: "#adadad", }}
                                                >{item.TarikhSefaresh}</Text>
                                            </View>
                                        </View>
                                        <View
                                            id={`imgContInMyOrder-${item.IdFaktorForoosh}`}
                                            style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center",
                                            }}
                                        ></View>
                                    </View>
                                    <View
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: 'flex-end',
                                            paddingBottom: 15,
                                        }}
                                    >
                                        <View
                                            style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                marginLeft: 10,
                                                alignItems: "center",
                                            }}
                                        >
                                            <Text
                                                // className="valueStyle"
                                                style={{ marginLeft: 5, color: "#adadad", }}
                                            >
                                                {item.JamKhales.toLocaleString()}{" "}
                                            </Text>
                                            <Text
                                                // className="valueStyle"
                                                style={{ fontSize: 14, color: "#adadad", }}>
                                                ریال
                                            </Text>
                                        </View>
                                        <TouchableOpacity
                                            // onClick={(e) => {
                                            onPress={() => {
                                                ShowForooshSatrHideForooshTitr({
                                                    ShomarehFaktorForoosh: item.ShomareFaktor,
                                                    IdFaktorForoosh: item.IdFaktorForoosh,
                                                    TarikhSefaresh: item.TarikhSefaresh,
                                                    MablaghMasraf: item.JamMasraf,
                                                    JamTakhfifTitr: item.JamTakhfifTitr,
                                                    JamTakhfifSatr: item.JamTakhfifSatr,
                                                    MablaghKhales: item.JamKhales,
                                                    forooshTitrRowsLength: forooshTitrRows.length,
                                                });
                                            }}
                                            // className="btn btn-danger fontSizeLess768 "
                                            style={{
                                                // flex: "1 1 150px",
                                                flexGrow: 1,
                                                flexShrink: 1,
                                                flexBasis: 150,
                                                maxWidth: 200,
                                                borderRadius: 10,
                                                // padding: "7px 20px",
                                                paddingVertical: 7,
                                                paddingHorizontal: 20,
                                            }}
                                            activeOpacity={0.1}
                                        >
                                            جزئیات سفارش
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        );
                    })}
                </>
            )}
        </View>
    );
}
