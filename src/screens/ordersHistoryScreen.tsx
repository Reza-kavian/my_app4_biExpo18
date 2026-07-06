////zare_nk_050413_okk(1)
// "use client";   //zare_nk_050227_commented
// import { useRouter } from "next/navigation";   //zare_nk_041130_commented
import { useState, useEffect, useRef } from "react";
import { //zare_nk_041129_added
    View, Text, Image, TouchableOpacity, StyleSheet, ViewStyle, TextStyle, Alert,
    useWindowDimensions,
    StyleProp, Modal, Button, Animated, TextInput,
    Platform, ToastAndroid, LayoutChangeEvent, FlatList, ScrollView, Dimensions
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";   //zare_nk041129_added
import { NextJsApiUrl, NextJsApiAuthUrl } from "../constants/Urls";   //zare_nk_041129_added 

import { SvgUri } from "react-native-svg";

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
    // Alert.alert("cookieGeted in getCookie: " + cookieGeted);
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

    const [isOpenedMymodalForWarning, setIsOpenedMymodalForWarning] = useState(false); //zare_nk_041128_added
    const [warningTextInMymodalForWarning, setWarningTextInMymodalForWarning] = useState(''); //zare_nk_041128_added

    ////zare_nk_041202_added_st(moadele @media baraye responsive kardane site) 
    const { width } = useWindowDimensions();
    //////responsive_for_sabadItemsAndTotalInf_added_st
    let productJoziatContResponse: StyleProp<ViewStyle>;
    if (width <= 576) {
        productJoziatContResponse = styles.productJoziatCont_STH576;
    }
    else if (width >= 576) {
        productJoziatContResponse = styles.productJoziatCont_BTH576;
    }
    //////responsive_for_sabadItemsAndTotalInf_added_st
    //////responsive_for_sabadItemsAndTotalInf_added_st
    let joziatFaktorContResponse: StyleProp<ViewStyle>;
    if (width <= 576) {
        joziatFaktorContResponse = styles.joziatFaktorCont_STH576;
    }
    else if (width >= 576) {
        joziatFaktorContResponse = styles.joziatFaktorCont_BTH576;
    }
    //////responsive_for_sabadItemsAndTotalInf_added_st

    ////zare_nk_041202_added_end(moadele @media baraye responsive kardane site) 

    type sumValsForForooshSatrType = {
        // ShomarehFaktorForoosh: number; ////zare_nk_050328_commented
        IdFaktorForoosh: number;
        TarikhSefaresh: string;
        MablaghMasraf: number;
        JamTakhfifTitr: number;
        // JamTakhfifSatr: number;  ////zare_nk_050328_commented
        MablaghKhales: number;
        forooshTitrRowsLength: number;
    };

    const [ForooshSatrHideForooshTitr, setForooshSatrHideForooshTitr] =
        useState<sumValsForForooshSatrType | null>(null);
    const [bisatr, setBisatr] = useState(true);
    const [bisatrDarSatr, setBisatrDarSatr] = useState(true);

    type ForooshSatrType = {
        IdKala: number;
        NameKala: string;
        Tedad: number;
        // IsVazni: number;  ////zare_nk_050328_commented(baraye tochi)
        IdNoeVazni: number;  ////zare_nk_050328_added(baraye hamyar)
        // ForooshSatr: number;  ////zare_nk_050328_commented(baraye tochi)
        MablaghKhalesForooshSatr: number; ////zare_nk_050328_added(baraye hamyar)
        // [key: string]: any; //yani az IdKala motmaen hastim vali fildhaye digare db ra parsa ina tagheir dadan dar in peroujeh shayad aslan
        //  be man nagan va timi kar nakonim,pas [key: string]: any; gozashtam ke kolli hast(chon hameye fieldha ro neveshtam commentesh kardam)
    };
    //   const [forooshSatrRows, setForooshSatrRows] = useState<ForooshSatrType[] | null>(null);  //zare_nk_041130_commented
    const [forooshSatrRows, setForooshSatrRows] = useState<ForooshSatrType[] | null>([]);  //zare_nk_041130_added

    type ForooshTitrType = {
        IdFaktorForoosh: number;
        IdShobe: number;  ////zare_nk_050328_added 
        NameSobe: string;
        // VaziatFactor: string; ////zare_nk_050328_commented
        TaeedFaktorForoosh: number;  ////zare_nk_050328_added
        // UserFullName: string; ////zare_nk_050328_commented
        NameMoshtari: string;  ////zare_nk_050328_added
        // TarikhSefaresh: string;  ////zare_nk_050328_commented
        TarikhShamsiTaeed: string;  ////zare_nk_050328_added
        // JamKhales: number;  ////zare_nk_050328_commented
        MablaghKhales: number;  ////zare_nk_050328_added
        ShomareFaktor: number;
        // JamMasraf: number; ////zare_nk_050328_commented
        MablaghKolMasraf: number;   ////zare_nk_050328_added
        // JamTakhfifTitr: number; ////zare_nk_050328_commented
        TakhfifTitr: number;  ////zare_nk_050328_added
        // JamTakhfifSatr: number;    ////zare_nk_050328_commented(tahlilshe-chera dar titr oomad?!)
        // [key: string]: any; //yani az IdKala motmaen hastim vali fildhaye digare db ra parsa ina tagheir dadan dar in peroujeh shayad aslan 
        // be man nagan va timi kar nakonim,pas [key: string]: any; gozashtam ke kolli hast(chon hameye fieldha ro neveshtam commentesh kardam)
    };
    //   const [forooshTitrRows, setForooshTitrRows] = useState<ForooshTitrType[] | null>(null);  //zare_nk_041130_commented
    const [forooshTitrRows, setForooshTitrRows] = useState<ForooshTitrType[] | null>([]);  //zare_nk_041130_added
    const [isShowFaktorForooshSatr, setIsShowFaktorForooshSatr] = useState(false);

    const [isShowFaktorForooshTitr, setIsShowFaktorForooshTitr] = useState<string | null>(null);

    type ShowForooshSatrHideForooshTitrType = {
        // ShomarehFaktorForoosh: number;   ////zare_nk_050328_commented
        IdFaktorForoosh: number;
        TarikhSefaresh: string;
        MablaghMasraf: number;
        JamTakhfifTitr: number;
        // JamTakhfifSatr: number;  ////zare_nk_050328_commented
        MablaghKhales: number;
        forooshTitrRowsLength: number;
    };

    async function ShowForooshSatrHideForooshTitr({
        // ShomarehFaktorForoosh,  ////zare_nk_050328_commented
        IdFaktorForoosh,
        TarikhSefaresh,
        MablaghMasraf,
        JamTakhfifTitr,
        // JamTakhfifSatr,  ////zare_nk_050328_commented
        MablaghKhales,
        forooshTitrRowsLength,
    }:
        ShowForooshSatrHideForooshTitrType) {
        setIsShowFaktorForooshSatr(true);
        setIsShowFaktorForooshTitr(null);
        setForooshSatrHideForooshTitr(() => {
            return {
                // ShomarehFaktorForoosh: ShomarehFaktorForoosh,  ////zare_nk_050328_commented
                IdFaktorForoosh: IdFaktorForoosh,
                TarikhSefaresh: TarikhSefaresh,
                MablaghMasraf: MablaghMasraf,
                JamTakhfifTitr: JamTakhfifTitr,
                // JamTakhfifSatr: JamTakhfifSatr,
                MablaghKhales: MablaghKhales,
                forooshTitrRowsLength: forooshTitrRowsLength,
            };
        });
        const token = await getCookie("token");
        if (token == null) {
            setIsOpenedMymodalForWarning(true);
            setWarningTextInMymodalForWarning("لطفا ابتدا لاگین شوید");
            // const bootstrap = await getBootstrap();
            // const mymodalForWarning = new bootstrap.Modal(
            //     document.getElementById("mymodalForWarning")
            // );
            // mymodalForWarning.show();
            // const span = document.querySelector(
            //     "#mymodalForWarning .errorInMymodalForWarning"
            // );
            // if (span instanceof HTMLElement) {
            //     span.innerText = "لطفا ابتدا لاگین شوید";
            // } 
            return;
        } else {
            ////zare_nk_050325_commented_st(tagheire api be hamyarForoosh)
            // let ApiUrl = "https://api.tochikala.com/api/";
            // var urlSelectFaktorForooshSatr = ApiUrl + "User/Api_SelectForooshSatr";
            ////zare_nk_050325_commented_end(tagheire api be hamyarForoosh)
            ////zare_nk_050325_added_st(tagheire api be hamyarForoosh) 
            var urlSelectFaktorForooshSatr = NextJsApiUrl + "Api_SelectFaktorForooshSatr";
            ////zare_nk_050325_added_end(tagheire api be hamyarForoosh) 
            try {
                const response = await fetch(urlSelectFaktorForooshSatr, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                    body: JSON.stringify({
                        // IdForooshTitr: IdFaktorForoosh,   ////zare_nk_050327_nokteh(parametre api tochikala)
                        IdFaktorForooshTitr: IdFaktorForoosh,   ////zare_nk_050327_nokteh(parametre api hamyar)
                    }),
                    // credentials: "include", //zare_nk_040402_commented
                });
                const data = await response.json();
                console.log("050326-data-rere: " + +JSON.stringify(data));
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
                        setWarningTextInMymodalForWarning("لطفا ابتدا لاگین شوید");
                        // const bootstrap = await getBootstrap();
                        // const mymodalForWarning = new bootstrap.Modal(
                        //     document.getElementById("mymodalForWarning")
                        // );
                        // mymodalForWarning.show();
                        // const span = document.querySelector(
                        //     "#mymodalForWarning .errorInMymodalForWarning"
                        // );
                        // if (span instanceof HTMLElement) {
                        //     span.innerText = "لطفا ابتدا لاگین شوید";
                        // }
                    }
                }
            } catch (error) {
                ////zare_nk_050325_commented_st(tahlilshe(catch ra az showDetails coppy kardam, fekr mikonam inha inja ezafian)) 
                // setForCartContInProdDetVal(undefined);
                // setIsOpenedProdDetModal(false);
                ////zare_nk_050325_commented_end(tahlilshe(catch ra az showDetails coppy kardam, fekr mikonam inha inja ezafian)) 
                setIsOpenedMymodalForWarning(true);
                let WarningText = '';
                if (error instanceof Error) {
                    WarningText = error.message
                    if (error.message === "Failed to fetch") {
                        WarningText = "❌ اتصال اینترنت برقرار نیست یا سرور در دسترس نمی‌باشد";
                    }
                    else if (error.message === "Network request failed") {
                        WarningText = "درخواست شبکه ناموفق بود";
                    }
                    else {
                        WarningText = '2درخواست نا موفق بود';
                    }
                } else {
                    WarningText = String(error);
                }
                setWarningTextInMymodalForWarning(() => {
                    return (WarningText)
                });
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
            const token = await getCookie("token");
            if (token == null) {
                setIsOpenedMymodalForWarning(true);
                setWarningTextInMymodalForWarning("لطفا ابتدا لاگین شوید");
                // const bootstrap = await getBootstrap();
                // const mymodalForWarning = new bootstrap.Modal(
                //     document.getElementById("mymodalForWarning")
                // );
                // mymodalForWarning.show();
                // const span = document.querySelector(
                //     "#mymodalForWarning .errorInMymodalForWarning"
                // );
                // if (span instanceof HTMLElement) {
                //     span.innerText = "لطفا ابتدا لاگین شوید";
                // }  
                return;
            } else {
                // const token = getCookie("token");                
                ////zare_nk_050325_commented_st(tagheire api be hamyarForoosh)
                // let ApiUrl = "https://api.tochikala.com/api/";
                // var urlSelectFaktorForooshTitr = ApiUrl + "User/Api_SelectForooshTitr";
                ////zare_nk_050325_commented_end(tagheire api be hamyarForoosh)
                ////zare_nk_050325_added_st(tagheire api be hamyarForoosh) 
                var urlSelectFaktorForooshTitr = NextJsApiUrl + "Api_SelectFaktorForooshTitr";
                ////zare_nk_050325_added_end(tagheire api be hamyarForoosh)
                try {
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
                    console.log("050326-data-rere22: " + JSON.stringify(data));
                    //{"status":1,"message":"","data":null,"errors":["متاسفانه عملیات با خطا مواجه شد. لطفا مجددا تلاش کنید"]}
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
                            console.log('zare_nk_050415-Api_SelectFaktorForooshTitr-result: ' + JSON.stringify(result));
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
                            setWarningTextInMymodalForWarning("لطفا ابتدا لاگین شوید");
                            // const bootstrap = await getBootstrap();
                            // const mymodalForWarning = new bootstrap.Modal(
                            //     document.getElementById("mymodalForWarning")
                            // );
                            // mymodalForWarning.show();
                            // const span = document.querySelector(
                            //     "#mymodalForWarning .errorInMymodalForWarning"
                            // );
                            // if (span instanceof HTMLElement) {
                            //     span.innerText = "لطفا ابتدا لاگین شوید";
                            // }
                        }
                    }
                } catch (error) {
                    ////zare_nk_050325_commented_st(tahlilshe(catch ra az showDetails coppy kardam, fekr mikonam inha inja ezafian)) 
                    // setForCartContInProdDetVal(undefined);
                    // setIsOpenedProdDetModal(false);
                    ////zare_nk_050325_commented_end(tahlilshe(catch ra az showDetails coppy kardam, fekr mikonam inha inja ezafian)) 
                    setIsOpenedMymodalForWarning(true);
                    let WarningText = '';
                    if (error instanceof Error) {
                        WarningText = error.message
                        if (error.message === "Failed to fetch") {
                            WarningText = "❌ اتصال اینترنت برقرار نیست یا سرور در دسترس نمی‌باشد";
                        }
                        else if (error.message === "Network request failed") {
                            WarningText = "درخواست شبکه ناموفق بود";
                        }
                        else {
                            WarningText = '1درخواست نا موفق بود';
                        }
                    } else {
                        WarningText = String(error);
                    }

                    setWarningTextInMymodalForWarning(() => {
                        return (WarningText)
                    });

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

    // return isShowFaktorForooshSatr == true ? (
    return (
        <>
            <Modal
                visible={isOpenedMymodalForWarning}
                transparent
                animationType="fade"
            >
                <View style={styles.resultOverlay}>
                    <View style={styles.resultBox}>
                        {/* <Text style={styles.resultTitle}>✅ بارکد شناسایی شد</Text> */}
                        <Text style={styles.resultValue}>
                            {warningTextInMymodalForWarning}
                        </Text>

                        {/* <Button
                            title="تأیید"
                            onPress={() => {
                                setIsOpenedMymodalForWarning(false);
                                // setScannedValue(null);
                                // setIsScanning(true);
                            }}
                        /> */}
                        <TouchableOpacity
                            style={{
                                borderRadius: 8,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                cursor: 'pointer',
                                // padding: 4,
                                // borderWidth: 1,
                                // borderStyle: 'solid',
                                // borderColor: 'rgb(165, 165, 165)',
                                backgroundColor: 'red',
                                width: 120,
                                height: 40,
                            }}
                            onPress={() => {
                                setIsOpenedMymodalForWarning(false);
                                // setScannedValue(null);
                                // setIsScanning(true);
                            }}
                            activeOpacity={0.6}
                        >
                            <Text
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                style={{
                                    fontFamily: "IRANSansWeb(FaNum)_Medium",
                                    color: "white",
                                }}
                            >
                                تأیید
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {isShowFaktorForooshSatr == true ? (
                <ScrollView horizontal={false}
                    // id="MyOrdersDetCont"
                    style={{
                        width: "100%",
                        direction: "rtl",
                    }}
                    contentContainerStyle={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: 'center',
                        alignItems: "center",
                        // paddingVertical: 20,س
                        paddingHorizontal: 7,
                    }}
                >
                    <View
                        // id="MyOrderDet"
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
                                <Text style={{
                                    marginLeft: 3,
                                    //  fontSize: 18 ,
                                    fontFamily: "IRANSansWeb(FaNum)_Medium",
                                }}>جزئیات سفارش</Text>
                                {ForooshSatrHideForooshTitr != null && (
                                    <Text style={{
                                        //  fontSize: 18, 
                                        fontFamily: "IRANSansWeb(FaNum)_Medium", color: "#888888",
                                    }}>{ForooshSatrHideForooshTitr.IdFaktorForoosh}</Text>
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
                                        // backgroundColor: "inherit",



                                        //  borderRadius: 10, 

                                        justifyContent: 'center',
                                        alignItems: 'center',

                                        // padding: 7,
                                        // backgroundColor: '#d9534f'
                                    }}

                                    activeOpacity={0.1}
                                >
                                    <View
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignContent: 'center',

                                            backgroundColor: "inherit",
                                            marginLeft: 10,

                                        }}
                                    >
                                        {/* <img
                                    src="https://img.tochikala.com/tochikala/back-icon-in-cardcontainer.svg"
                                    style={{ width: 18 }}
                                    alt="بازگشت به لیست سفارش ها"
                                /> */}
                                        {/* <Image
                                            source={{ uri: "https://img.tochikala.com/tochikala/back-icon-in-cardcontainer.svg" }}
                                            style={{ width: 18 ,height:18,}}
                                        /> */}
                                        <SvgUri
                                            uri="https://img.tochikala.com/tochikala/back-icon-in-cardcontainer.svg"
                                            width={18}
                                            height={15}
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
                                        <Text style={{ fontSize: 14, color: "#444343", fontFamily: "IRANSansWeb(FaNum)_Medium", }}>بازگشت به لیست سفارش ها</Text>
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
                                    // borderWidth: 1,
                                    // borderStyle: 'solid',
                                    // borderColor: '#a9a9a9',
                                    borderRadius: 10,
                                    // padding: 16,
                                    marginLeft: 0,
                                    boxShadow: "#5e5e5e 0px 0px 3px 1px",
                                    backgroundColor: "#f6f6f6",
                                    paddingHorizontal: 10,
                                    paddingVertical: 15,
                                }}
                            >
                                <View style={{ display: "flex", flexDirection: "row", }}>
                                    <Text
                                        //  className="titleStyle"
                                        style={{ fontSize: 14, color: "#444343", fontFamily: "IRANSansWeb(FaNum)_Medium", }}
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
                                            style={{ marginLeft: 5, fontSize: 14, color: "#888888", fontFamily: "IRANSansWeb(FaNum)_Medium", }}>
                                            {ForooshSatrHideForooshTitr.TarikhSefaresh ?? ""}
                                        </Text>
                                    )}
                                </View>
                            </View>
                        </View>

                        {/* Product Section */}
                        <View
                            // className="productJoziatCont"
                            style={[{ display: "flex", marginTop: 10 }
                                , productJoziatContResponse]}
                        >
                            {/* Product Count */}
                            <View
                                // className="productContInMyOrderDet valueStyle"
                                style={{
                                    // border: "1px solid #a9a9a9",
                                    // borderWidth: 1,
                                    // borderStyle: 'solid',
                                    // borderColor: '#a9a9a9',
                                    borderRadius: 10,
                                    display: "flex",
                                    flexDirection: "column",
                                    padding: 16,
                                    backgroundColor: "#f6f6f6",
                                    boxShadow: "#5e5e5e 0px 0px 3px 1px",
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
                                            style={{ fontSize: 14, color: "#444343", fontFamily: "IRANSansWeb(FaNum)_Medium", }}>
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
                                            <Text style={{ marginLeft: 7, fontSize: 14, color: "#888888", fontFamily: "IRANSansWeb(FaNum)_Medium", }}>
                                                {forooshSatrRows.length}
                                            </Text>
                                        )}
                                        {/* zare_nk_041123_added_end */}
                                        <Text
                                            style={{ fontSize: 14, color: "#888888", fontFamily: "IRANSansWeb(FaNum)_Medium", }}
                                        >کالا</Text>
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
                                                            borderRadius: 10,
                                                            overflow: 'hidden',
                                                            boxShadow: "#5e5e5e 0px 0px 3px 0px ",
                                                            flexBasis: 'auto',
                                                            flexShrink: 0,
                                                            flexGrow: 0,
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
                                                            flexBasis: 'auto',
                                                            flexShrink: 1,
                                                            flexGrow: 1,
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            justifyContent: "space-around",
                                                        }}
                                                    >
                                                        <View style={{ display: "flex", flexDirection: "row" }}>
                                                            <Text
                                                                numberOfLines={2}
                                                                ellipsizeMode="tail"
                                                                style={{
                                                                    fontSize: 13, color: "#444343", fontFamily: "IRANSansWeb(FaNum)_Medium",

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
                                                            <Text style={{ marginLeft: 5, fontSize: 14, color: "#888888", fontFamily: "IRANSansWeb(FaNum)_Medium", }}>
                                                                {item.Tedad ?? ""}
                                                            </Text>
                                                            <Text style={{ fontSize: 14, color: "#888888", fontFamily: "IRANSansWeb(FaNum)_Medium", }}>
                                                                {/* zare_nk_050328_nokteh(dar tochi IsVazni va dar hamyar IdNoeVazni) */}
                                                                {/* {item.IsVazni === 0 ? "عدد" : "کیلوگرم"} */}
                                                                {item.IdNoeVazni === 0 ? "عدد" : "کیلوگرم"}
                                                            </Text>

                                                            <Text
                                                                style={{
                                                                    width: 0,
                                                                    height: 25,
                                                                    // borderLeft: "2px solid silver",
                                                                    borderLeftWidth: 1,
                                                                    borderStyle: 'solid',
                                                                    borderLeftColor: "#ccc",
                                                                    // margin: "0px 5px",
                                                                    marginVertical: 0,
                                                                    marginHorizontal: 5,
                                                                }}
                                                            ></Text>

                                                            <View style={{ display: "flex", flexDirection: "row" }}>
                                                                <Text style={{
                                                                    marginLeft: 5,
                                                                    fontSize: 14, color: "#888888", fontFamily: "IRANSansWeb(FaNum)_Medium",
                                                                }}>
                                                                    {/* zare_nk_050328_nokteh(dar tochi ForooshSatr va dar hamyar MablaghKhalesForooshSatr) */}
                                                                    {/* {item.ForooshSatr != null
                                                                        ? item.ForooshSatr.toLocaleString()
                                                                        : ""} */}
                                                                    {item.MablaghKhalesForooshSatr != null
                                                                        ? item.MablaghKhalesForooshSatr.toLocaleString()
                                                                        : ""}
                                                                </Text>
                                                                <Text
                                                                    style={{ fontSize: 12, color: "#888888", fontFamily: "IRANSansWeb(FaNum)_Medium", }}>
                                                                    ریال
                                                                </Text>
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
                                style={[{
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
                                }, joziatFaktorContResponse]}
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
                                                {/* {ForooshSatrHideForooshTitr.JamTakhfifSatr?.toLocaleString() ?? 0} */}
                                                {ForooshSatrHideForooshTitr.JamTakhfifTitr?.toLocaleString() ?? 0}
                                            </Text>
                                        )}
                                        {/* <span style={{ marginLeft: 10, fontSize: 16 }}>{jamTakhfifSatr?.toLocaleString() ?? ''}</span> */}
                                        <Text>ریال</Text>
                                    </View>
                                </View>

                                {/* zare_nk_041123_added_st(codeTakhfif zirmajmooeye JamTakhfifTitr hast) */}
                                <View
                                    style={{
                                        display: "none",
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
                </ScrollView>
            ) : (
                <ScrollView horizontal={false}
                    // id="MyOrdersCont" 
                    style={{
                        width: "100%",
                        direction: "rtl",
                        // borderWidth: 4,
                        // borderColor: 'blue',
                        // borderStyle: 'dashed',
                    }}
                    contentContainerStyle={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: 'center',
                        alignItems: "center",
                        paddingVertical: 20,
                        paddingHorizontal: 7,
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
                                            // borderWidth: 1,
                                            // borderStyle: 'solid',
                                            // borderColor: '#a9a9a9',

                                            borderRadius: 10,
                                            // color: "#adadad",
                                            marginBottom: 10,
                                            boxShadow: "#5e5e5e 0px 0px 3px 0px",
                                            backgroundColor: "#f6f6f6",
                                            paddingHorizontal: 10,
                                        }}
                                    >
                                        <View
                                            // className="MyOrderHead"
                                            style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                justifyContent: "space-between",
                                                borderBottomWidth: 1,
                                                borderStyle: 'solid',
                                                borderBottomColor: '#E7E7E7',

                                                // padding: "5px 0px 5px 20px",
                                                paddingTop: 10,
                                                paddingBottom: 7,
                                            }}
                                        >
                                            <View style={{ display: "flex", flexDirection: "row" }}>
                                                {/* zare_nk_050415_commented_st(be khatere static aksGozashtane kerfu(badan age shobe ha daraye icon boodand va apie parsafar baram ferestad dynamic lahaz mikonam)) */}
                                                {/* <View
                                                    style={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        marginLeft: 10,
                                                    }}
                                                >
                                                    <View // className="rounded-pilll"
                                                        style={{
                                                            display: "flex",
                                                            flexDirection: "row",
                                                            // padding: "0px 10px",
                                                            // paddingVertical: 0,
                                                            // paddingHorizontal: 10,
                                                        }}> 
                                                        <Image
                                                            source={{ uri: "https://img.tochikala.com/Logo/photo14359415832-Copy.jpg" }}
                                                            style={{ width: 44, height: 44, }}
                                                        />
                                                    </View>
                                                </View> */}
                                                {/* zare_nk_050415_commented_end(be khatere static aksGozashtane kerfu(badan age shobe ha daraye icon boodand va apie parsafar baram ferestad dynamic lahaz mikonam) */}
                                                <View
                                                    style={{
                                                        display: "none",
                                                        flexDirection: "column",
                                                        justifyContent: "space-around",
                                                    }} >
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
                                                            style={{ fontSize: 12, color: "#444343", }}
                                                        >
                                                            {/* zare_nk_050328_nokteh(felan dar pasokhe api hamyar parsafar nazasht NameSobe ra) */}
                                                            {/* {item.NameSobe} */}
                                                            {item.IdShobe}
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
                                                        {/* zare_nk_050328_nokteh(felan dar pasokhe api hamyar parsafar nazasht NameSobe ra) */}
                                                        {/* {item.VaziatFactor} */}
                                                        {item.TaeedFaktorForoosh}
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
                                                                // color: "#adadad",
                                                                color: "#444343",
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
                                                                color: "#888888",
                                                                fontFamily: "IRANSansWeb(FaNum)_Bold",
                                                            }}
                                                        >
                                                            {/* zare_nk_050328_nokteh(dar pasokhe api tochi UserFullName hast va dar hamyar NameMoshtari hast) */}
                                                            {/* {item.UserFullName}{" "} */}
                                                            {item.NameMoshtari}{" "}
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
                                                                color: "#444343",
                                                            }}
                                                        >
                                                            {" "}
                                                            تاریخ سفارش{" "}
                                                        </Text>
                                                        <Text style={{
                                                            //  margin: "0px 5px", 
                                                            marginVertical: 0,
                                                            marginHorizontal: 5,
                                                        }}>: </Text>
                                                        <Text
                                                            //  className="valueStyle"
                                                            style={{
                                                                fontFamily: "IRANSansWeb(FaNum)_Bold",
                                                                fontSize: 14,
                                                                color: "#888888",
                                                            }}
                                                        >
                                                            {/* zare_nk_050328_nokteh(dar pasokhe api tochi TarikhSefaresh hast va dar hamyar TarikhShamsiTaeed hast) */}
                                                            {/* {item.TarikhSefaresh} */}
                                                            {item.TarikhShamsiTaeed}
                                                        </Text>
                                                    </View>
                                                </View>
                                                <View
                                                    // id={`imgContInMyOrder-${item.IdFaktorForoosh}`}
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
                                                        style={{
                                                            marginLeft: 5,
                                                            fontFamily: "IRANSansWeb(FaNum)_Bold",
                                                            fontSize: 14,
                                                            color: "#888888",
                                                        }}
                                                    >
                                                        {/* zare_nk_050328_nokteh(dar pasokhe api tochi JamKhales hast va dar hamyar MablaghKhales hast) */}
                                                        {/* {item.JamKhales.toLocaleString()}{" "} */}
                                                        {item.MablaghKhales.toLocaleString()}{" "}
                                                    </Text>
                                                    <Text
                                                        // className="valueStyle"
                                                        style={{
                                                            fontSize: 12,
                                                            fontFamily: "IRANSansWeb(FaNum)_Bold",
                                                            color: "#888888",
                                                        }}>
                                                        ریال
                                                    </Text>
                                                </View>
                                                <TouchableOpacity
                                                    // onClick={(e) => {
                                                    onPress={() => {
                                                        ShowForooshSatrHideForooshTitr({
                                                            // ShomarehFaktorForoosh: item.ShomareFaktor,  ////zare_nk_050328_commented(baraye tochikala) 
                                                            IdFaktorForoosh: item.IdFaktorForoosh,
                                                            // TarikhSefaresh: item.TarikhSefaresh,  ////zare_nk_050328_commented(baraye tochikala)
                                                            TarikhSefaresh: item.TarikhShamsiTaeed, ////zare_nk_050328_added(baraye hamyar)
                                                            // MablaghMasraf: item.JamMasraf,  ////zare_nk_050328_commented(baraye tochikala)
                                                            MablaghMasraf: item.MablaghKolMasraf,    ////zare_nk_050328_added(baraye hamyar)

                                                            // JamTakhfifTitr: item.JamTakhfifTitr,  ////zare_nk_050328_commented(baraye tochikala)
                                                            JamTakhfifTitr: item.TakhfifTitr,  ////zare_nk_050328_added(baraye hamyar)

                                                            // JamTakhfifSatr: item.JamTakhfifSatr,  ////zare_nk_050328_commented(tahlilshe-baraye tochikala-vali chera dar pasokhe api faktorTitr oomad?!!)
                                                            // MablaghKhales: item.JamKhales,  ////zare_nk_050328_commented(baraye tochikala)
                                                            MablaghKhales: item.MablaghKhales,   ////zare_nk_050328_added(baraye hamyar)
                                                            forooshTitrRowsLength: forooshTitrRows.length,
                                                        });
                                                    }}
                                                    // className="btn btn-danger fontSizeLess768 "
                                                    style={{
                                                        // flex: "1 1 150px",
                                                        flexGrow: 1,
                                                        flexShrink: 1,
                                                        flexBasis: 150,
                                                        maxWidth: 150,

                                                        paddingVertical: 7,
                                                        paddingHorizontal: 20,

                                                        borderRadius: 10,
                                                        ////zare_nk_041202_added_st
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        flexDirection: 'row',
                                                        // padding: 7,
                                                        backgroundColor: '#d9534f'
                                                        ////zare_nk_041202_added_end
                                                    }}
                                                    activeOpacity={0.1}
                                                >
                                                    <Text
                                                        style={{ fontSize: 14, color: "white", fontFamily: "IRANSansWeb(FaNum)_Medium" }}
                                                    > جزئیات سفارش</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                );
                            })}
                        </>
                    )}
                </ScrollView>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    resultOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "center",
        alignItems: "center",
    },
    resultBox: {
        width: "80%",
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 12,
        alignItems: "center",
    },
    resultTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 12,
        color: "#2e7d32",
    },
    resultValue: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: "center",
        color: "#333",
    },
    /////////////////////////////////////////////zare_nk_041202_added_st(for responsives @media) 
    productJoziatCont_STH576: {
        flexDirection: 'column',
    },
    productJoziatCont_BTH576: {
        flexDirection: 'row',
    },

    joziatFaktorCont_STH576: {
        marginTop: 10,
        width: '100%',
    },
    joziatFaktorCont_BTH576: {
        marginRight: 10,
        flexBasis: 'auto',
        flexGrow: 1,
        flexShrink: 1,
    },
    /////////////////////////////////////////////zare_nk_041202_added_end(for responsives @media) ب
});
