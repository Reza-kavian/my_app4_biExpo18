// shoppingbasketScreen.tsx  //zare_nk_050413_okk(1)
// "use client";  //zare_nk_041127_commented
// import { useRouter } from "next/navigation";  //zare_nk_041127_commented
import { useState, useEffect, useRef, useMemo } from "react";
import {  ////zare_nk_041127_added
    View, Text, Image, TouchableOpacity, StyleSheet, ViewStyle, TextStyle, Alert,
    useWindowDimensions,
    StyleProp, Modal, Button, Animated, TextInput,
    Platform, ToastAndroid, LayoutChangeEvent, FlatList, ScrollView, Dimensions
} from "react-native";

import { Camera, useCameraDevice, useCodeScanner, useCameraPermission } from "react-native-vision-camera";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { NextJsApiUrl, NextJsApiAuthUrl } from "../constants/Urls";    //zare_nk_050130_nokteh(in ro begonjoonam age mishe)

import { RefObject } from "react";
import { MouseEvent } from "react";
import ReusableButton from "../components/ReusableButton";
import { SvgUri } from "react-native-svg";

import SabadSatrComponent from '../components/sabadSatrComponent';  ////zare_nk_050315_added
import AddRemBtnsAndCountPackege from '../components/addRemBtnsAndCountPackege';  ////zare_nk_050315_added

const showNoStock = () => {
    if (Platform.OS === "android") {
        ToastAndroid.show("موجودی کافی نیست", ToastAndroid.SHORT);
    } else {
        // Alert.alert("خطا", "موجودی کافی نیست");
    }
};

type addRemParamType = {
    tedadInSabadOrDet: number;
    ZaribForoosh: number;
    IdKala: number;
    NameKala: string | null;
    DarsadTakhfif: number | null;
    NameBerand: string | null;
    FeeForoosh: number;
    FeeMasraf: number;
    BarcodeKala: string;
    Mojoodi: number;
    MaxTedad: number;
    father: any;
    bishAzMaxTedadYaMojoodi: number | null;
    fromShowDetails: boolean;
    // event?: MouseEvent<HTMLAnchorElement> | null | undefined;  //zare_nk_041127_commented
    event?: null;  //zare_nk_041127_added
};

type ForCartContInProdDetValType = {
    tedadInSabadOrDet: number;
    ZaribForoosh: number;
    IdKala: number;
    NameKala: string | null;
    DarsadTakhfif: number | null;
    NameBerand: string | null;
    FeeForoosh: number;
    FeeMasraf: number;
    BarcodeKala: string;
    Mojoodi: number;
    MaxTedad: number;
    father: any;
    refForfather: RefObject<string | null>;
    bishAzMaxTedadYaMojoodi: number | null;
    fromShowDetails: boolean;
    ForCartContentsDesignType: number;
    idTag: string;
};

type SabadRowType = {
    tedadInSabadOrDet: number;
    ZaribForoosh: number;
    IdKala: number;
    NameKala: string | null;
    DarsadTakhfif: number | null;
    NameBerand: string | null;
    FeeForoosh: number;
    FeeMasraf: number;
    BarcodeKala: string;
    Mojoodi: number;
    MaxTedad: number;
    MasrafSatr: number;
    father: any;
    refForfather: RefObject<string | null>;
    fromShowDetails: boolean;
    idTag: string;

    ////zare_nk_050326_added_st(jaigozine state haye .... ke baese reRender mishodand)
    soodAzKharid: number;
    MablaghNahaee: number;
    ////zare_nk_050326_added_end(jaigozine state haye .... ke baese reRender mishodand)
};

type SabadTitrType = {
    IdSabadKharidTitr: number;
    SumFeeMasraf: number;
    soodAzKharid: number;
    MablaghNahaee: number;
    [key: string]: any;
};

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

// export default function shoppingbasketComponent(){  //zare_nk_041127_commented
////zare_nk_041127_added_st
import type { RootStackParamList } from "../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<RootStackParamList, "shoppingbasket">;

export default function ShoppingbasketComponent({
    navigation,
    route,
}:  // back,  //zare_nk_040530(ekhtiariye va chon azash estefadeh nakardim commentent kardim)
    // route, //zare_nk_040530(ekhtiariye va chon azash estefadeh nakardim commentent kardim)
    // options, //zare_nk_040530(ekhtiariye va chon azash estefadeh nakardim commentent kardim)
    Props) {
    ////zare_nk_041127_added_end
    console.log('shoppingbasketComponent called!!');

    const [productHeightForDet, setProductHeightForDet] = useState<number>(0);
    const [productWidthForDet, setProductWidthForDet] = useState<number>(0);  //zare_nk_041208_dded
    const productUriForDet = ''; // `https://img.tochikala.com/Product/${ForCartContInProdDetVal.IdKala}.webp`; // تبدیل به متغیر 
    const [imgUriForDet, setImgUriForDet] = useState<string>('');

    const refForBarcodeValue = useRef<string | null>(null);   ////zare_nk_050312_added(in ref movaghat baraye namayeshe barcode be owner estefadeh mishe(esbate barcodekhani))

    const [isLoadedIroductImage, setIsLoadedIroductImage] = useState(false);   ////zare_nk_050318_added

    ////zare_nk_041202_added_st(moadele @media baraye responsive kardane site) 
    const { width } = useWindowDimensions();
    //////responsive_for_sabadItemsAndTotalInf_added_st
    let sabadItemsAndTotalInf: StyleProp<ViewStyle>;
    if (width <= 576) {
        sabadItemsAndTotalInf = styles.sabadItemsAndTotalInf_STH576;
    }
    else if (width >= 576) {
        sabadItemsAndTotalInf = styles.sabadItemsAndTotalInf_BTH576;
    }
    else if (width >= 768) {
        sabadItemsAndTotalInf = styles.sabadItemsAndTotalInf_BTH768;
    }
    else if (width >= 992) {
        sabadItemsAndTotalInf = styles.sabadItemsAndTotalInf_BTH992;
    }
    //////responsive_for_sabadItemsAndTotalInf_added_st

    //////responsive_for_sabadItemsCont_added_st
    let sabadItemsCont: StyleProp<ViewStyle>;
    if (width <= 576) {
        sabadItemsCont = styles.sabadItemsCont_STH576;
    }
    else if (width >= 576) {
        sabadItemsCont = styles.sabadItemsCont_BTH576;
    }
    else if (width >= 768) {
        sabadItemsCont = styles.sabadItemsCont_BTH768;
    }
    else if (width >= 992) {
        sabadItemsCont = styles.sabadItemsCont_BTH992;
    }
    //////responsive_for_sabadItemsCont_added_end
    //////responsive_for_sabadItemsCont_added_st
    let sabadSafhe: StyleProp<ViewStyle>;
    if (width <= 576) {
        sabadSafhe = styles.sabadSafhe_STH576;
    }
    else if (width >= 576) {
        sabadSafhe = styles.sabadSafhe_BTH576;
    }
    else if (width >= 768) {
        sabadSafhe = styles.sabadSafhe_BTH768;
    }
    else if (width >= 992) {
        sabadSafhe = styles.sabadSafhe_BTH992;
    }
    //////responsive_for_sabadItemsCont_added_end

    //////responsive_for_sabadItemsAndTotalInf_added_st
    let DetailsImgAndInfoContResponse: StyleProp<ViewStyle>;
    if (width < 576) {
        DetailsImgAndInfoContResponse = styles.DetailsImgAndInfoCont_STH576;
    }
    else if (width >= 576) {
        DetailsImgAndInfoContResponse = styles.DetailsImgAndInfoCont_BTH576;
    }
    //////responsive_for_sabadItemsAndTotalInf_added_end

    //////responsive_for_sabadItemsAndTotalInf_added_st
    let CurrentImgContResponse: StyleProp<ViewStyle>;
    if (width < 576) {
        CurrentImgContResponse = styles.CurrentImgCont_STH576;
    }
    else if (width >= 576) {
        CurrentImgContResponse = styles.CurrentImgCont_BTH576;
    }
    //////responsive_for_sabadItemsAndTotalInf_added_end

    //////responsive_for_sabadItemsAndTotalInf_added_st
    let DetailsInfoContResponse: StyleProp<ViewStyle>;
    if (width < 576) {
        DetailsInfoContResponse = styles.DetailsInfoCont_STH576;
    }
    else if (width >= 576) {
        DetailsInfoContResponse = styles.DetailsInfoCont_BTH576;
    }
    //////responsive_for_sabadItemsAndTotalInf_added_end
    ////zare_nk_041202_added_end(moadele @media baraye responsive kardane site) 

    ////zare_nk_041209_added_st(baraye mohasebeye nesbate width be heighte tasvir chon height:auto dar reactNative amal nemikoneh)
    const onImageLayoutForDet = (event: LayoutChangeEvent) => {
        let { width } = event.nativeEvent.layout; // عرض واقعی خود Image
        setProductWidthForDet(width);  //zare_nk_041208_added
        // محاسبه ارتفاع بر اساس نسبت واقعی تصویر
        Image.getSize(productUriForDet, (imgWidth, imgHeight) => {
            let ratio = imgHeight / imgWidth;
            setProductHeightForDet(width * ratio);
        });
    };
    ////zare_nk_041209_added_end(baraye mohasebeye nesbate width be heighte tasvir chon height:auto dar reactNative amal nemikoneh)

    // const router = useRouter();  //zare_nk_041128_commented 
    ////zare_nk_041128_added_st_olgu
    // navigation.replace(redirect);
    // navigation.navigate("Home");
    // navigation.navigate("Splash", { target: "Profile" })
    ////zare_nk_041128_added_end_olgu

    const [ForCartContInProdDetVal, setForCartContInProdDetVal] =
        useState<ForCartContInProdDetValType>();
    const refForfather = useRef<string | null>(null);
    ////zare_nk_041115_added_st(albate felan niazam nemisheh)
    const [sabadTitr, setSabadTitr] = useState<SabadTitrType[] | null>(null);
    ////zare_nk_041115_added_end(albate felan niazam nemisheh)

    const [bisatr, setBisatr] = useState(true);
    const [bisatrInProductDet, setBisatrInProductDet] = useState(true); //zare_nk_041128_added

    const [sabadRows, setSabadRows] = useState<SabadRowType[]>([]);

    const [addOrRemChanged, setAddOrRemChanged] = useState<string | null>(null);
    const [jamKol, setJamKol] = useState<number | null>(null);
    const [jamKolTakhfif, setJamKolTakhfif] = useState<number | null>(null);
    const [jamKolNahaei, setJamKolNahaei] = useState<number | null>(null);

    const [isOpenedProdDetModal, setIsOpenedProdDetModal] = useState(false);
    // const [isOpenedSeePricesModal, setIsOpenedSeePricesModal] = useState(false);  //zare_nk_041205_commented(forUpdateName)
    const [isOpenedCodeScannerModal, setIsOpenedCodeScannerModal] = useState(false);  //zare_nk_041205_added(forUpdateName)
    const [isOpenedMymodalForWarning, setIsOpenedMymodalForWarning] = useState(false); //zare_nk_041128_added
    const [warningTextInMymodalForWarning, setWarningTextInMymodalForWarning] = useState(''); //zare_nk_041128_added

    const [isScanning, setIsScanning] = useState(true); //zare_nk_040923(halat anjam scan kardan)
    const { hasPermission, requestPermission } = useCameraPermission();  //zare_nk_040923(darkhaste ejazeh dastresiye doorbin be karbar)
    const [torch, setTorch] = useState<'on' | 'off'>('off');  //zare_nk_040927_added(baraye modiriate faal boodan ya naboodane flash)
    const device = useCameraDevice("back");   //zare_nk_040923(doorbin ra doorbine aghab moshakhas mikonim)
    const [scannedValue, setScannedValue] = useState<string | null>(null);   //zare_nk_041007_added
    // const [resultModalVisible, setResultModalVisible] = useState(false);     //zare_nk_041128_commented(resultModalVisible baraye namayeshe barcode ast ke niazi nist dar projeyeman, bejash dar productModal lahaz mikonim barcode ra)

    const scanLineAnim = useRef(new Animated.Value(0)).current; //zare_nk_041004_added (baraye khatte pareshkone vasate kadr. new Animated.Value(0))

    const [manualBarcode, setManualBarcode] = useState(String);

    useEffect(() => {
        requestPermission();   //zare_nk_040923(dar avalin render darkhaste dastresi be doorbin ra midahim )
    }, []);

    useEffect(() => {
        if (!isOpenedCodeScannerModal || !isScanning) {
            scanLineAnim.stopAnimation();
            return;
        }
        ////zare_nk_041007_added_st(age bekhaim meghdare scanLineAnim ra bebinim)
        scanLineAnim.addListener(({ value }) => {
            console.log(value);
        });
        ////zare_nk_041007_added_end(age bekhaim meghdare scanLineAnim ra bebinim)
        Animated.loop(
            Animated.sequence([
                Animated.timing(scanLineAnim, { ////zare_nk_041007_nokteh(timing yek tabe ketabkhaneye Animated hast ke animation ba zamanbandiye khatti 
                    // misazeh(meghdare Animated.Value ra be tadrij yani 1500 milisaniye az meghdare feli be meghdare hadaf tagheir mideh))
                    toValue: 1, ////zare_nk_041007_nokteh(scanLineAnim meghdare feliy Animated.Value hast, va toValue: 1 meghdare hadafe Animated.Value hast)
                    duration: 1500,
                    useNativeDriver: true,   ////zare_nk_041007_nokteh(true yani animation rooye ThreadNative ejra shavad, useNativeDriver: true baes mishe age js sholough bashe animation ravan bemooneh)
                }),
                Animated.timing(scanLineAnim, { ////zare_nk_041007_nokteh(timing yek tabe ketabkhaneye Animated hast ke animation ba zamanbandiye khatti
                    // misazeh(meghdare Animated.Value ra be tadrij yani 1500 milisaniye az meghdare feli be meghdare hadaf tagheir mideh))
                    toValue: 0, //zare_nk_041007_nokteh(scanLineAnim meghdare feliy Animated.Value hast, va toValue: 0 meghdare hadafe Animated.Value hast)
                    duration: 1500,
                    useNativeDriver: true,   ////zare_nk_041007_nokteh(true yani animation rooye ThreadNative ejra shavad, useNativeDriver: true baes mishe age js sholough bashe animation ravan bemooneh)
                }),
            ])
        ).start();
    }, [isOpenedCodeScannerModal, isScanning]);

    ////zare_nk_041128_commented_st
    // async function ShowCamera() {
    //     // تنظیم ZXing برای پشتیبانی از QR کد و بارکدهای 1D
    //     const { BrowserMultiFormatReader } = await import("@zxing/browser");
    //     const codeReader = new BrowserMultiFormatReader();
    //     codeReader
    //         .decodeFromVideoDevice(
    //             undefined,
    //             "videoForzxing",
    //             async (result, err, control) => {
    //                 if (result) {
    //                     const text = result.getText();
    //                     // متوقف کردن اسکن پس از شناسایی
    //                     control.stop();
    //                     const bootstrap = await getBootstrap();
    //                     const modal = new bootstrap.Modal(
    //                         document.getElementById("seePricesModal")
    //                     );
    //                     modal.hide();
    //                     openprodDetModal(text);
    //                 } else {
    //                     const { NotFoundException } = await import("@zxing/library");
    //                     if (err && !(err instanceof NotFoundException)) {
    //                         console.log("zare_nk_040321-in zxing-err: " + err);
    //                     }
    //                 }
    //             }
    //         )
    //         .catch((err) => {
    //             console.log("zare_nk_040321-in zxing-err in catch: " + err);
    //         });
    // }
    ////zare_nk_041128_commented_end

    const codeScanner = useCodeScanner({
        // codeTypes: ["qr", "ean-13", "upc-a"],  ////zare_nk_050310_commented
        codeTypes: ["ean-13"],  ////zare_nk_050310_added(upc-a ra hazf kardam, mamollan dar amrika estefadeh mishe na iran)
        onCodeScanned: (codes) => {
            if (!isScanning) return;
            for (const code of codes) {
                if (code.value) {
                    console.log(`050329-Scanned: ${code.value}`);
                    setIsScanning(false);
                    // setScannedValue(code.value);  //zare_nk_041129_commented

                    ////baste shodane modal 
                    setIsOpenedCodeScannerModal(false);
                    setManualBarcode('');
                    ////shenasaei va openprodDetModal 
                    // ShowDetails(code.value);  ////zare_nk_050311_commented
                    addDetectedToCart(code.value.toString());  ////zare_nk_050328_commented(movaghat, chon kalahaye kerfu pisham nist scan konam)
                    // addDetectedToCart("6262961900810");  ////zare_nk_050328_added(movaghat, chon kalahaye kerfu pisham nist scan konam)
                    refForBarcodeValue.current = code.value.toString()     ////zare_nk_050312_added(in ref movaghat baraye namayeshe barcode be owner estefadeh mishe(esbate barcodekhani))

                    // setIsOpenedProdDetModal(true);   ////zare_nk_050317_commented(hatman tahlilshe)          
                    setAddOrRemChanged(null);
                    break;
                }
            }
        },
    });

    async function openprodDetModal(barcodeKala: string) {   ////zare_nk_050224_nokteh(methode openprodDetModal methode ShowDetails ra seda mizanad, setIsOpenedProdDetModal ra 
        //// true mikoneh, setAddOrRemChanged ra ham null mikoneh)
        console.log('050331-shoppingbasketComponent called-openprodDetModal called!!-barcodeKala: '+barcodeKala);
        await ShowDetails(barcodeKala);
        setIsOpenedProdDetModal(true);
        setAddOrRemChanged(null);
    }

    async function ShowDetails(barcodeKala: any) {
        // Alert.alert('ShowDetails called!!');
        const token = await getCookie("token");
        ////zare_nk_050318_commented_st
        // if (token == null) {
        //     setIsOpenedMymodalForWarning(true);
        //     setWarningTextInMymodalForWarning("لطفا ابتدا آنلاین شوید");
        //     // const bootstrap = await getBootstrap();
        //     // const mymodalForWarning = new bootstrap.Modal(
        //     //     document.getElementById("mymodalForWarning")
        //     // );
        //     // mymodalForWarning.show();
        //     // const span = document.querySelector(
        //     //     "#mymodalForWarning .errorInMymodalForWarning"
        //     // );
        //     // if (span instanceof HTMLElement) {
        //     //     span.innerText = "لطفا ابتدا آنلاین شوید";
        //     // }
        // }
        ////zare_nk_050318_commented_end


        ////zare_nk_050325_commented_st(agheire api be hamyarForoosh)
        // let ApiUrl = "https://api.tochikala.com/api/";
        // var urlApi_SelectShobehJashnvareh = ApiUrl + "User/Api_SelectKalaShobeh";
        ////zare_nk_050325_commented_end(agheire api be hamyarForoosh)
        ////zare_nk_050325_add_st(agheire api be hamyarForoosh) 
        var urlApi_SelectShobehJashnvareh = NextJsApiUrl + "Api_SelectKala";
        ////zare_nk_050325_added_end(agheire api be hamyarForoosh)  
        try {
            const currentShobeh = await AsyncStorage.getItem("currentShobeh");  ////zare_nk_050326_added
            const response = await fetch(urlApi_SelectShobehJashnvareh, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
                body: JSON.stringify({
                    BarcodeKala: barcodeKala,
                    IdShobeh: Number(currentShobeh), ////zare_nk_050326_added(age kerfue biad 12 hast)
                    // IdKala: 1111 //zare_nk_041115_nokteh(api Api_SelectKalaShobeh ham BarcodeKala ro voroodi migireh ham IdKala ro.ma alan chon dar 
                    //// barkode kala hanooz kala va keshi nashodeh va IdKala nadarim pas hamoon BarcodeKala ro miferestim va IdKala ro comment mikonim,meghdare 1111 ha soori neveshtam)
                }),
                // credentials: "include", //zare_nk_040402_commented
            });
            if (response.ok) {
                const data = await response.json();
                var result = data;
                if (result.status != 0) {
                    setIsOpenedMymodalForWarning(true);
                    setWarningTextInMymodalForWarning(result.errors[0] + '-aaa');
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
                } else if (result.status == 0) {
                    if (result.data.list == undefined) {
                        setIsOpenedMymodalForWarning(true);
                        setWarningTextInMymodalForWarning(() => {
                            return (
                                result.message.length == 0
                                    ? "ارتباط با سرور برقرار نشد"
                                    : result.message
                            )
                        });
                        // const bootstrap = await getBootstrap();
                        // const mymodalForWarning = new bootstrap.Modal(
                        //     document.getElementById("mymodalForWarning")
                        // );
                        // mymodalForWarning.show();
                        // const span = document.querySelector(
                        //     "#mymodalForWarning .modal-body span"
                        // );
                        // if (span instanceof HTMLElement) {
                        //     span.innerText =
                        //         result.message.length == 0
                        //             ? "ارتباط با سرور برقرار نشد"
                        //             : result.message;
                        // }
                        return;
                    }
                    var parsedList = JSON.parse(result.data.list);
                    if (parsedList.length == 0) {
                        setBisatrInProductDet(true);
                        // const productExist = document.getElementById("productExist");
                        // if (productExist instanceof HTMLElement) {
                        //     productExist.style.display = "none";
                        // }
                        // const productNotExist = document.getElementById("productNotExist");
                        // if (productNotExist instanceof HTMLElement) {
                        //     productNotExist.style.display = "flex";
                        // }
                        return;
                    }
                    setBisatrInProductDet(false);
                    // const productExist = document.getElementById("productExist");
                    // if (productExist instanceof HTMLElement) {
                    //     productExist.style.display = "flex";
                    // }
                    // const productNotExist = document.getElementById("productNotExist");
                    // if (productNotExist instanceof HTMLElement) {
                    //     productNotExist.style.display = "none";
                    // }
                    console.log("rr-parsedList: " + JSON.stringify(parsedList) + '-parsedList.length: ' + parsedList.length + '-parsedList[0].IdKala : ' + parsedList[0].IdKala);

                    //C:\pub\projects\1.ne…ingExample.tsx:1332 rr-parsedList: [{
                    // "IdKala":9354,"BarcodeKala":6260806400020,"IdBerand":81,"IdTaminkonnande":174,"IdG1":6,"IdG2":36,"IdG3":54,"IdG4":88,"Faal":1,"NameKala":"کوکاکولا نوشابه کولا 1.5 لیتری (6)","IsVazni":0,"ZaribForoosh":1,"NameG1":"نوشیدنی","NameG2":"نوشیدنی سرد","NameG3":"نوشابه","NameG4":"نوشابه مشکی","NameBerand":"کوکاکولا","Mojoodi":122,"IdJashnvare":6,"IdShobehJashnvareh":10240,"FeeMasraf":850000,"MaxTedad":12,"FeeForoosh":663000,"DarsadTakhfif":22,"TedadDarSabad":12,"IsJashnvareh":1,"IsFavorite":1,"TedadForooshShobeh":234,"TedadKharidUser":0}]

                    // var isChange = null;  zare_nk_041118_commented
                    ////zare_nk_041118_added_st
                    // var Tedad = parsedList[0].Tedad ? parsedList[0].Tedad : parsedList[0].TedadDarSabad;  //zare_nk_041118_commented
                    // var Tedad = parsedList[0].TedadDarSabad;  //zare_nk_041118_added
                    var bishAzMaxTedadYaMojoodi = 0;
                    if (parsedList[0].MaxTedad != null) {
                        if (parsedList[0].MaxTedad <= parsedList[0].TedadDarSabad) {
                            bishAzMaxTedadYaMojoodi = 1;
                        }
                    } else {
                        if (parsedList[0].Mojoodi <= parsedList[0].TedadDarSabad) {
                            bishAzMaxTedadYaMojoodi = 1;
                        }
                    }

                    refForfather.current = "#DetailsInfoCont";
                    let ForCartContentsDesignTypeLet = 0

                    if (parsedList[0].TedadDarSabad == 0) {
                        ForCartContentsDesignTypeLet = 0;
                    }
                    else if (parsedList[0].TedadDarSabad > parsedList[0].ZaribForoosh) {
                        ForCartContentsDesignTypeLet = 2;
                    }
                    else if (parsedList[0].TedadDarSabad == parsedList[0].ZaribForoosh) {
                        ForCartContentsDesignTypeLet = 1;
                    }

                    const idTag = "ForCart-" + parsedList[0].IdKala;
                    setImgUriForDet(`https://img.tochikala.com/Product/${parsedList[0].IdKala}.webp`);  //zare_nk_050318_added
                    setForCartContInProdDetVal(() => {
                        return {
                            tedadInSabadOrDet: parsedList[0].TedadDarSabad,
                            ZaribForoosh: parsedList[0].ZaribForoosh,
                            IdKala: parsedList[0].IdKala,
                            NameKala: parsedList[0].NameKala,
                            DarsadTakhfif: parsedList[0].MM,  ////zare_nk_050330_updated(MM bejaye DarsadTakhfif)
                            NameBerand: parsedList[0].NameBerand,
                            FeeForoosh: parsedList[0].FeeForoosh,
                            FeeMasraf: parsedList[0].FeeMasraf,
                            BarcodeKala: parsedList[0].BarcodeKala1,  ////zare_nk_050330_nokteh(pasokhe apiye select_kala hamyar BarcodeKala1s(ba c koochike!))
                            Mojoodi: parsedList[0].Mojoodi,
                            MaxTedad: parsedList[0].MaxTedad,
                            father: "#DetailsInfoCont",
                            refForfather: refForfather,
                            bishAzMaxTedadYaMojoodi: bishAzMaxTedadYaMojoodi,
                            fromShowDetails: true,
                            ForCartContentsDesignType: ForCartContentsDesignTypeLet,
                            idTag: idTag,
                        };
                    });
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
                ////zare_nk_050311_added_st
                else {
                    setIsOpenedMymodalForWarning(true);
                    setWarningTextInMymodalForWarning("ارتباط با سرور برقرار نشد");
                }
                ////zare_nk_050311_added_end
            }
        } catch (error) {
            ////zare_nk_050317_added_st(tahlilshe)
            setImgUriForDet('');
            setForCartContInProdDetVal(undefined);
            setIsOpenedProdDetModal(false);
            ////zare_nk_050317_added_end(tahlilshe)
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
                    WarningText = '22درخواست نا موفق بود';
                }
            } else {
                WarningText = String(error);
            }

            setWarningTextInMymodalForWarning(() => {
                return (WarningText)
            });
            // alert('catch: ' + error + 'modal: ' + modal)
            // const bootstrap = await getBootstrap();
            // modal?.hide();
            // const mymodalForWarning = new bootstrap.Modal(
            //   document.getElementById("mymodalForWarning")
            // );
            // mymodalForWarning.show();
            // const span = document.querySelector(
            //   "#mymodalForWarning .modal-body span"
            // );
            // if (span instanceof HTMLElement) {
            //   if (error instanceof Error) {
            //     span.innerText = error.message
            //     if (error.message === "Failed to fetch") {
            //       span.innerText = "❌ اتصال اینترنت برقرار نیست یا سرور در دسترس نمی‌باشد";
            //     }
            //   } else {
            //     alert('2')
            //     span.innerText = String(error);
            //   }
            // } 
        }
    }

    useEffect(() => {
        ////zare_nk_050317_added_st(hatman tahlilshe)
        if (!isOpenedProdDetModal) {
            setForCartContInProdDetVal(undefined);
        }
        ////zare_nk_050317_added_end(hatman tahlilshe)

        // if (isOpenedProdDetModal == false) {
        //     return;
        // }
        ////zare_nk_041128_commented_st
        // const productExist = document.getElementById("productExist");
        // if (productExist instanceof HTMLElement) {
        //     productExist.style.display = "flex";
        // }
        // const productNotExist = document.getElementById("productNotExist");
        // if (productNotExist instanceof HTMLElement) {
        //     productNotExist.style.display = "none";
        // }

        // const groupsInDetailsPageCont = document.getElementById(
        //     "groupsInDetailsPageCont"
        // );
        // if (groupsInDetailsPageCont instanceof HTMLElement) {
        //     groupsInDetailsPageCont.style.display = "none";
        // }
        // const handlerForProdDetModal = () => {
        //     const ImageColectionInDetails = document.getElementById(
        //         "ImageColectionInDetails"
        //     );
        //     if (ImageColectionInDetails instanceof HTMLElement)
        //         ImageColectionInDetails.style.display = "none";
        // };

        // const hiddenHandlerForProdDetModal = () => {
        //     setIsOpenedProdDetModal(false);
        //     setAddOrRemChanged("notNull");
        // };
        ////zare_nk_041128_commented_end
        // const prodDetModal = document.getElementById("prodDetModal");
        // async function tempFuncForAsyncGetBootstrap() {
        // if (prodDetModal && isOpenedProdDetModal) {
        // prodDetModal.addEventListener("shown.bs.modal", handlerForProdDetModal);
        // prodDetModal.addEventListener(
        //     "hidden.bs.modal",
        //     hiddenHandlerForProdDetModal
        // );
        // const bootstrap = await getBootstrap();
        // const modal = new bootstrap.Modal(prodDetModal);
        // modal.show();
        // }
        // }
        // tempFuncForAsyncGetBootstrap();
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
        //     if (prodDetModal) {
        //         prodDetModal.removeEventListener(
        //             "shown.bs.modal",
        //             handlerForProdDetModal
        //         );
        //     }
        // };
    }, [isOpenedProdDetModal]); //zare_nk_041205_forUpdateName

    useEffect(() => {
        // const seePricesModal = document.getElementById("seePricesModal");
        // const handlerForSeePricesModal = () => {
        //     const input = document.getElementById("manualInputBarcode");
        //     if (input instanceof HTMLInputElement) {
        //         input.value = "";
        //     }
        //     ShowCamera();
        // };

        // const hiddenHandlerForSeePricesModal = () => {
        //     setIsOpenedSeePricesModal(false);
        //     setAddOrRemChanged("notNull");
        // };
        // async function tempFuncForAsyncGetBootstrap() {
        //     if (seePricesModal) {
        // seePricesModal.addEventListener(
        //     "shown.bs.modal",
        //     handlerForSeePricesModal
        // );
        // seePricesModal.addEventListener(
        //     "hidden.bs.modal",
        //     hiddenHandlerForSeePricesModal
        // );
        // const bootstrap = await getBootstrap();
        // const modal = new bootstrap.Modal(seePricesModal);
        // modal.show();
        //     }
        // }
        // tempFuncForAsyncGetBootstrap();
    }, [isOpenedCodeScannerModal]);

    ////zare_nk_041119_added_st_testi
    useEffect(() => {
        // console.log('0-041119-sabadRows: ' + JSON.stringify(sabadRows));  //zare_nk_041120_commented
    }, [sabadRows]);
    useEffect(() => {
        console.log('0-041119-ForCartContInProdDetVal: ' + JSON.stringify(ForCartContInProdDetVal));
    }, [ForCartContInProdDetVal]);
    ////zare_nk_041119_added_end_testi

    ////zare_nk_041115_added_st
    async function getSabadItems(IdSabadKharidTitr: number, token: string) {
        console.log('050326-010-result is IdSabadKharidTitr: ' + IdSabadKharidTitr + '-token: ' + token);
        ////zare_nk_050326_commented_st(chon dar hamyar SabadTitr nadarim)
        // if (IdSabadKharidTitr == -22) {
        //     // Alert.alert('bisatrrre!!!');
        //     setBisatr(true);
        //     return;
        // }
        ////zare_nk_050326_commented_end(chon dar hamyar SabadTitr nadarim)    

        ////zare_nk_050325_commented_st(agheire api be hamyarForoosh)
        // let ApiUrl = "https://api.tochikala.com/api/";
        // var urlSelectSabad = ApiUrl + "User/Api_SelectSabadKharidSatr";
        ////zare_nk_050325_commented_end(agheire api be hamyarForoosh)
        ////zare_nk_050325_add_st(agheire api be hamyarForoosh) 
        var urlSelectSabad = NextJsApiUrl + "Api_SelectSabad";
        ////zare_nk_050325_added_end(agheire api be hamyarForoosh) 
        console.log('050326-011-urlSelectSabad: ' + urlSelectSabad);
        try {
            const currentShobeh = await AsyncStorage.getItem("currentShobeh");  ////zare_nk_050326_added
            const response = await fetch(urlSelectSabad, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
                body: JSON.stringify({
                    IdShobeh: Number(currentShobeh),        ////zare_nk_050326_added(age kerfue biad 12 hast)
                    // IdSabadKharidTitr: IdSabadKharidTitr,   ////zare_nk_050326_commented(chon dar hamyar sabadTitr nadarim)
                }),
            });
            console.log('050326-013');
            const data = await response.json();
            console.log('050326-014-data is sabad: ' + JSON.stringify(data));
            if (response.ok) {
                ////zare_nk_050326_added_st(jaigozine state haye .... ke baese reRender mishan)
                const jameKolTakhfif = JSON.parse(data.data.jamKolTakhfif);  //jameKolTakhfif  
                setJamKolTakhfif(jameKolTakhfif);
                const jameKol = JSON.parse(data.data.jamKol);   //jameKol  
                setJamKolNahaei(jameKol);
                // const [jamKol, setJamKol] = useState<number | null>(null);
                // const [jamKolTakhfif, setJamKolTakhfif] = useState<number | null>(null);
                // const [jamKolNahaei, setJamKolNahaei] = useState<number | null>(null);

                ////zare_nk_050326_added_end(jaigozine state haye .... ke baese reRender mishan)

                var result = JSON.parse(data.data.list);
                console.log('050326-015-result is sabad: ' + JSON.stringify(result));
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
                    if (result.length == 0) {
                        setBisatr(true);
                        return;
                    }
                    console.log('041120-result in Api_SelectSabadKharidSatr: ' + JSON.stringify(result));
                    setBisatr(false);
                    refForfather.current = "#sabadItemsContInSafhe";

                    // ////zare_nk_041119_added_st_olgu_1(dorost ba return va akoolad va parantezbandi)
                    // setSabadRows(() => {
                    //   return (
                    //     result.map((item: any) => {
                    //       return ({
                    //         tedadInSabadOrDet: item.Tedad,
                    //         // بقیه فیلدها
                    //       })
                    //     })
                    //   )
                    // });
                    // ////zare_nk_041119_added_end_olgu_1(dorost ba return va akoolad va parantezbandi)
                    // ////zare_nk_041119_added_st_olgu_2(dorost ba return va akoolad va parantezbandi)
                    // setSabadRows(
                    //   result.map((item: any) => ({
                    //     tedadInSabadOrDet: item.Tedad,
                    //     // بقیه فیلدها اینجا
                    //   }))
                    // );
                    // ////zare_nk_041119_added_end_olgu_2(dorost ba return va akoolad va parantezbandi)
                    ////zare_nk_041119_added_st
                    setSabadRows(() => {
                        return (
                            result.map((item: any) => {
                                return ({
                                    tedadInSabadOrDet: item.Tedad,
                                    ZaribForoosh: item.ZaribForoosh,
                                    IdKala: item.IdKala,
                                    NameKala: item.NameKala,
                                    DarsadTakhfif: item.DarsadTakhfif,
                                    NameBerand: item.NameBerand,
                                    FeeForoosh: item.FeeForoosh,
                                    FeeMasraf: item.FeeMasraf,
                                    BarcodeKala: item.BarcodeKala,
                                    Mojoodi: item.Mojoodi,
                                    MaxTedad: item.MaxTedad,
                                    MasrafSatr: item.MasrafSatr,
                                    father: "#sabadItemsContInSafhe",
                                    refForfather: refForfather,
                                    fromShowDetails: false,
                                    idTag: "ForCart-" + item.IdKala,

                                    //    majmooeKharidMasraf = result[0].SumFeeMasraf;
                                    soodAzKharid: jameKolTakhfif,
                                    // Kerayeh = result[0].HazineErsal;
                                    MablaghNahaee: jameKol,
                                })
                            })
                        )
                    });
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
                ////zare_nk_050311_added_st
                else {
                    setIsOpenedMymodalForWarning(true);
                    setWarningTextInMymodalForWarning("ارتباط با سرور برقرار نشد");
                }
                ////zare_nk_050311_added_end
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
                    WarningText = '33درخواست نا موفق بود';
                }
            } else {
                WarningText = String(error);
            }

            setWarningTextInMymodalForWarning(() => {
                return (WarningText)
            });
        }
    }

    useEffect(() => {
        if (isOpenedProdDetModal == true) {
            return;
        }
        async function tempFuncForAsync() {
            ////zare_nk_050326_commented_st(chon dar hamyar sabadTitr nadarim)
            // const token = await getCookie("token");
            // if (token == null) {
            //     setIsOpenedMymodalForWarning(true);
            //     setWarningTextInMymodalForWarning("لطفا ابتدا آنلاین شوید");
            //     // const bootstrap = await getBootstrap();
            //     // const mymodalForWarning = new bootstrap.Modal(
            //     //     document.getElementById("mymodalForWarning")
            //     // );
            //     // mymodalForWarning.show();
            //     // const span = document.querySelector(
            //     //     "#mymodalForWarning .errorInMymodalForWarning"
            //     // );
            //     // if (span instanceof HTMLElement) {
            //     //     span.innerText = "لطفا ابتدا آنلاین شوید";
            //     // }
            //     return;
            // } else {
            //     let ApiUrl = "https://api.tochikala.com/api/";
            //     var urlSelectSabadTitr = ApiUrl + "User/Api_SelectSabadKharidTitr";

            //     const response = await fetch(urlSelectSabadTitr, {
            //         method: "POST",
            //         headers: {
            //             "Content-Type": "application/json",
            //             Authorization: "Bearer " + token,
            //         },
            //         body: JSON.stringify({
            //             IdShobeh: 6,
            //         }),
            //     });
            //     const data = await response.json();
            //     if (response.ok) {
            //         var majmooeKharidMasraf = 0;
            //         var soodAzKharid = 0;
            //         var Kerayeh = 0;
            //         var MablaghNahaee = 0;
            //         var KafKharid = 0;
            //         var IdSabadKharidTitr = 0;
            //         var result = JSON.parse(data.data.list);
            //         console.log('result22: ' + JSON.stringify(result)); //zare_nk_041120_commented
            //         if (data.status != 0) {
            //             console.log('data.status: ' + data.status)
            //             setIsOpenedMymodalForWarning(true);
            //             setWarningTextInMymodalForWarning(data.errors[0]);
            //             // const bootstrap = await getBootstrap();
            //             // const mymodalForWarning = new bootstrap.Modal(
            //             //     document.getElementById("mymodalForWarning")
            //             // );
            //             // mymodalForWarning.show();
            //             // const span = document.querySelector(
            //             //     "#mymodalForWarning .errorInMymodalForWarning"
            //             // );
            //             // if (span instanceof HTMLElement) {
            //             //     span.innerText = data.errors[0];
            //             // }
            //         } else if (data.status == 0) {
            //             if (result.length == 0) {
            //                 console.log('result.length == 0: ' + result.length)
            //                 ///zare_nk_041129_added_st
            //                 setSabadTitr(null);
            //                 IdSabadKharidTitr = 0;
            //                 majmooeKharidMasraf = 0;
            //                 soodAzKharid = 0;
            //                 Kerayeh = 0;
            //                 MablaghNahaee = 0;
            //                 KafKharid = 0;
            //                 setJamKol(0);
            //                 setJamKolTakhfif(0);
            //                 setJamKolNahaei(0);
            //                 getSabadItems(-22, token);
            //                 ///zare_nk_041129_added_end
            //                 return;
            //             }
            //             setSabadTitr(result);
            //             IdSabadKharidTitr = result[0].IdSabadKharidTitr;
            //             majmooeKharidMasraf = result[0].SumFeeMasraf;
            //             soodAzKharid = result[0].Sood;
            //             Kerayeh = result[0].HazineErsal;
            //             MablaghNahaee = result[0].MablaghNahaee;
            //             KafKharid = result[0].KafKharid;

            //             setJamKol(majmooeKharidMasraf);
            //             setJamKolTakhfif(soodAzKharid);
            //             setJamKolNahaei(MablaghNahaee);
            //             // console.log('majmooeKharidMasraf: ' + majmooeKharidMasraf + '-soodAzKharid: ' + soodAzKharid + '-MablaghNahaee: ' + MablaghNahaee);  //zare_nk_041120_commented
            //             getSabadItems(IdSabadKharidTitr, token);
            //         }
            //     } else {
            //         console.log('!!response.ok')
            //         if (response.status == 401) {
            //             setIsOpenedMymodalForWarning(true);
            //             setWarningTextInMymodalForWarning("لطفا ابتدا آنلاین شوید");
            //             // const bootstrap = await getBootstrap();
            //             // const mymodalForWarning = new bootstrap.Modal(
            //             //     document.getElementById("mymodalForWarning")
            //             // );
            //             // mymodalForWarning.show();
            //             // const span = document.querySelector(
            //             //     "#mymodalForWarning .errorInMymodalForWarning"
            //             // );
            //             // if (span instanceof HTMLElement) {
            //             //     span.innerText = "لطفا ابتدا آنلاین شوید";
            //             // }
            //         }
            //         ////zare_nk_050311_added_st
            //         else {
            //             setIsOpenedMymodalForWarning(true);
            //             setWarningTextInMymodalForWarning("ارتباط با سرور برقرار نشد");
            //         }
            //         ////zare_nk_050311_added_end
            //     }
            // }
            ////zare_nk_050326_commented_end(chon dar hamyar sabadTitr nadarim)
            ////zare_nk_050326_added_st(chon dar hamyar sabadTitr nadarim)
            const token = await getCookie("token");
            if (token == null) {
                setIsOpenedMymodalForWarning(true);
                setWarningTextInMymodalForWarning("لطفا ابتدا آنلاین شوید");
                return;
            }
            //    majmooeKharidMasraf = result[0].SumFeeMasraf;
            //             soodAzKharid = result[0].Sood;
            //             Kerayeh = result[0].HazineErsal;
            //             MablaghNahaee = result[0].MablaghNahaee; 
            getSabadItems(0, token);  //zare_nk_050326_nokteh(meghdare 0 ra soori gozashtam(chon dar hamyar sabadTitr nadarim))
            ////zare_nk_050326_added_end(chon dar hamyar sabadTitr nadarim)

        }
        tempFuncForAsync();
    }, [addOrRemChanged]);

    async function addDetectedToCart(BarcodeKala: string) {
        const token = await getCookie("token");
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
        }

        ////zare_nk_050325_commented_st(tagheire api be hamyarForoosh)
        // let ApiUrl = "https://api.tochikala.com/api/";
        // var urlApi_SelectShobehJashnvareh = ApiUrl + "User/Api_SelectKalaShobeh";
        ////zare_nk_050325_commented_end(tagheire api be hamyarForoosh)
        ////zare_nk_050325_added_st(tagheire api be hamyarForoosh) 
        var urlApi_SelectShobehJashnvareh = NextJsApiUrl + "Api_SelectKala";
        ////zare_nk_050325_added_end(tagheire api be hamyarForoosh)

        console.log('050328-adddet-01-BarcodeKala: '+BarcodeKala);
        try {
            const currentShobeh = await AsyncStorage.getItem("currentShobeh");  ////zare_nk_050326_added
            const response = await fetch(urlApi_SelectShobehJashnvareh, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
                body: JSON.stringify({
                    BarcodeKala: BarcodeKala,
                    IdShobeh: Number(currentShobeh), ////zare_nk_050326_added(age kerfue biad 12 hast)
                    // IdKala: 1111 //zare_nk_041115_nokteh(api Api_SelectKalaShobeh ham BarcodeKala ro voroodi migireh ham IdKala ro.ma alan chon dar 
                    //// barkode kala hanooz kala va keshi nashodeh va IdKala nadarim pas hamoon BarcodeKala ro miferestim va IdKala ro comment mikonim,meghdare 1111 ha soori neveshtam)
                }),
                // credentials: "include", //zare_nk_040402_commented
            });
            console.log('050328-adddet-02');
            if (response.ok) {
                const data = await response.json();
                console.log('050328-adddet-03-data: ' + JSON.stringify(data));
                //// 050328-adddet-03-data: 
                // {
                //"status":0,
                // "message":"",
                // "data":
                // {"list":"[
                // {\"IdKala\":66440,\"NameKala\":\"آنیکا خیارشور درجه یک 1500 گرم شیشه (6)\",\"IdBerand\":1458,\"NameBerand\":\"آنیکا \",\"IdGoroohKala\":6,\"TedadDarKarton\":6,
                // \"TedadDarBasteh\":0,\"BarcodeKala\":6262961900810,\"VaznKhales\":0.0,\"IdNoeVazni\":0,\"FeeKharid\":0,\"FeeForoosh\":1426000,\"FeeMasraf\":2300000,\"MM\":38,
                // \"Mojoodi\":123.0,\"TedadDarSabad\":2.0,\"MaxTedad\":10,\"ZaribForoosh\":1,\"IsChangeTedad\":1}
                // ]",

                // "isChange":1
                // },

                // "errors":[]}

                ////050328-adddet-03-data: {"status":0,"message":"","data":{"list":"[{\"IdKala\":30384,\"NameKala\":\"سی کلاس لاک غلط گیر 12میل (12)\",\"IdBerand\":2601,\"NameBerand\":\"لوازم التحریر \",\"IdGoroohKala\":12,\"TedadDarKarton\":0,\"TedadDarBasteh\":0,\"BarcodeKala\":null,\"VaznKhales\":0.0,\"IdNoeVazni\":0,\"FeeKharid\":0,\"FeeForoosh\":143800,\"FeeMasraf\":143800,\"MM\":0,\"Mojoodi\":2.0,\"TedadDarSabad\":0.0,\"MaxTedad\":10,\"ZaribForoosh\":1,\"IsChangeTedad\":1}]","isChange":1},"errors":[]}
                var result = data;
                if (result.status != 0) {
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
                } else if (result.status == 0) {
                    if (result.data.list == undefined) {
                        setIsOpenedMymodalForWarning(true);
                        setWarningTextInMymodalForWarning(() => {
                            return (
                                result.message.length == 0
                                    ? "ارتباط با سرور برقرار نشد"
                                    : result.message
                            )
                        });
                        // const bootstrap = await getBootstrap();
                        // const mymodalForWarning = new bootstrap.Modal(
                        //     document.getElementById("mymodalForWarning")
                        // );
                        // mymodalForWarning.show();
                        // const span = document.querySelector(
                        //     "#mymodalForWarning .modal-body span"
                        // );
                        // if (span instanceof HTMLElement) {
                        //     span.innerText =
                        //         result.message.length == 0
                        //             ? "ارتباط با سرور برقرار نشد"
                        //             : result.message;
                        // }
                        return;
                    }
                    var parsedList = JSON.parse(result.data.list);
                    console.log('050328-adddet-result in Api_SelectKalaShobeh: ' + JSON.stringify(parsedList));

                    if (parsedList.length == 0) {
                        setBisatrInProductDet(true);

                        ////zare_nk_050317_added_st
                        setIsOpenedMymodalForWarning(true);
                        // setWarningTextInMymodalForWarning('کالای مورد نظر یافت نشد ');
                        setWarningTextInMymodalForWarning('کالایی با بارکد  ' + BarcodeKala + ' یافت نشد');
                        ////zare_nk_050317_added_end

                        // const productNotExist = document.getElementById("productNotExist");
                        // if (productNotExist) {
                        //     productNotExist.style.display = "flex";
                        // }
                        return;
                    }
                    console.log('050328-adddet-BarcodeKala is: ' + parsedList[0].BarcodeKala + '-BarcodeKala: ' + BarcodeKala)
                    setBisatrInProductDet(false);
                    // const productNotExist = document.getElementById("productNotExist");
                    // if (productNotExist) {
                    //     productNotExist.style.display = "none";
                    // }
                    ////zare_nk_041120_added_st
                    let bishAzMaxTedadYaMojoodi = 0;
                    if (parsedList[0].MaxTedad != null) {
                        if (parsedList[0].MaxTedad <= parsedList[0].TedadDarSabad) {
                            bishAzMaxTedadYaMojoodi = 1;
                        }
                    } else {
                        if (parsedList[0].Mojoodi <= parsedList[0].TedadDarSabad) {
                            bishAzMaxTedadYaMojoodi = 1;
                        }
                    }
                    ////zare_nk_041120_added_end

                    // handlerForAddClick(parsedList[0]);  //zare_nk_041120_commented
                    handlerForAddClick(
                        {
                            tedadInSabadOrDet: parsedList[0].TedadDarSabad,
                            ZaribForoosh: parsedList[0].ZaribForoosh,
                            IdKala: parsedList[0].IdKala,
                            NameKala: parsedList[0].NameKala,
                            DarsadTakhfif: parsedList[0].DarsadTakhfif,
                            NameBerand: parsedList[0].NameBerand,  //zare_nk_041118_nokteh(dar api selectKalaShobeh NameBerand dar pasokh hast pas ma meghdaresh ro dadim)
                            FeeForoosh: parsedList[0].FeeForoosh,
                            FeeMasraf: parsedList[0].FeeMasraf,
                            BarcodeKala: parsedList[0].BarcodeKala,
                            Mojoodi: parsedList[0].Mojoodi,
                            MaxTedad: parsedList[0].MaxTedad,
                            father: "#sabadItemsContInSafhe",
                            bishAzMaxTedadYaMojoodi: bishAzMaxTedadYaMojoodi,
                            fromShowDetails: false,
                            event: null,
                        }
                    );
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
                ////zare_nk_050311_added_st
                else {
                    setIsOpenedMymodalForWarning(true);
                    setWarningTextInMymodalForWarning("ارتباط با سرور برقرار نشد");
                }
                ////zare_nk_050311_added_end
            }
        } catch (error) {
            ////zare_nk_050317_added_st(tahlilshe)
            setImgUriForDet('');
            setForCartContInProdDetVal(undefined);
            setIsOpenedProdDetModal(false);
            ////zare_nk_050317_added_end(tahlilshe)
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
                    WarningText = '44درخواست نا موفق بود';
                }
            } else {
                WarningText = String(error);
            }

            setWarningTextInMymodalForWarning(() => {
                return (WarningText)
            });

        }

    }
 
    ////zare_nk_041128_commened_st
    // async function ManualInputBarcode(
    //     event: React.KeyboardEvent<HTMLInputElement>
    // ) {
    //     const inputElement = event.target as HTMLInputElement;
    //     const tagVal = inputElement.value;
    //     if (
    //         event.key === "Enter" && // مدرن‌تر و درست‌تر از keyCode
    //         tagVal.trim().length &&
    //         inputElement.classList.contains("valid")
    //     ) {
    //         let text = parseFloat(tagVal);
    //         const modalElement = document.getElementById("seePricesModal");
    //         if (modalElement) {
    //             const bootstrap = await getBootstrap();
    //             const modal = bootstrap.Modal.getInstance(modalElement);
    //             if (modal) {
    //                 modal.hide();
    //             }
    //         }
    //         addDetectedToCart(text.toString());
    //     }
    // }
    ////zare_nk_041128_commented_end
    ////zare_nk_041128_added_st

    async function ManualInputBarcode(
        manualBarcode: string
    ) {
        // const inputElement = event.target as HTMLInputElement;
        // const tagVal = inputElement.value;
        if (
            // event.key === "Enter" && // مدرن‌تر و درست‌تر از keyCode
            manualBarcode.length // tagVal.trim().length &&
            // inputElement.classList.contains("valid")
        ) {
            let text = parseFloat(manualBarcode);
            // const modalElement = document.getElementById("seePricesModal");
            // if (modalElement) {
            //     const bootstrap = await getBootstrap();
            //     const modal = bootstrap.Modal.getInstance(modalElement);
            //     if (modal) {
            //         modal.hide();
            //     }
            // }
            setIsOpenedCodeScannerModal(false); //reza_nk_041128_added  //zare_nk_041205_forUpdateName
            setManualBarcode('');  //zare_nk_041205_added
            addDetectedToCart(text.toString());
        }
    }
    ////zare_nk_041128_added_end
    // const seePrices = () => {  //zare_nk_041205_commented(forUpdateName)
    const forOpenCodeScanner = () => {  //zare_nk_041205_added(forUpdateName) 
        setIsOpenedProdDetModal(false); //zare_nk_040325_nokteh(shayad niaziam nabood!chon baste beshe modalDet setIsOpenedProdDetModal(false) seda zadeh mishe!!)
        setIsOpenedCodeScannerModal(true);//zare_nk_041205_forUpdateName
        setAddOrRemChanged(null);
        setIsScanning(true);  //zare_nk_041203_added
    };

    async function addToCartInIndex(
        addRemParam: addRemParamType,
    ) {
        // Alert.alert('444');
        console.log('041203-addToCartInIndex called!-addRemParam: ' + addRemParam.NameKala);
        console.log('050329-addToCartInIndex called!-addRemParam01: ' + JSON.stringify(addRemParam)); //zare_nk_041120_commented(error mideh:    // console.log('041120-addToCartInIndex called!-addRemParam: ' + JSON.stringify(addRemParam)); //zare_nk_041120_commented_tahlilshe(error mideh:TypeError: Converting circular structure to JSON)
        ////zare_nk_041129_commented_st
        // if (addRemParam.event != null) {
        //     addRemParam.event.stopPropagation();
        //     addRemParam.event.preventDefault();
        // }
        ////zare_nk_041129_commented_end
        const token = await getCookie("token");
        if (token == null) {
            setIsOpenedMymodalForWarning(true);
            setWarningTextInMymodalForWarning("لطفا ابتدا آنلاین شوید");
            ////zare_nk_041129_commented_st
            //   const bootstrap = await getBootstrap();
            //   const mymodalForWarning = new bootstrap.Modal(
            //     document.getElementById("mymodalForWarning")
            //   );
            //   mymodalForWarning.show();
            //   const span = document.querySelector(
            //     "#mymodalForWarning .errorInMymodalForWarning"
            //   );
            //   if (span instanceof HTMLElement) {
            //     span.innerText = "لطفا ابتدا آنلاین شوید";
            //   }
            ////zare_nk_041129_commented_end
            return;
        }
        //else {  ////zare_nk_050326_commented(dar sharte token == null return gozashtim dige else nemikhaim)
        try {
            console.log('041120-addToCartInIndex-else 1');
            var TedadOut = 0;
            var TedadOuttoAjax = 0;
            const zarib = parseFloat(String(addRemParam.ZaribForoosh ?? 0));
            TedadOut = addRemParam.tedadInSabadOrDet + zarib;
            TedadOuttoAjax = addRemParam.ZaribForoosh;
            console.log('041203-addToCartInIndex-tedad ii: ' + addRemParam.tedadInSabadOrDet + '-zarib: ' + addRemParam.ZaribForoosh + '-TedadOut: ' + TedadOut);
            // console.log('041120-addToCartInIndex-token: ' + token? JSON.parse(token):'' );
            console.log('041203-addToCartInIndex-token isss22: ' + JSON.stringify(token));

            ////zare_nk_050325_commented_st(agheire api be hamyarForoosh)
            // let ApiUrl = "https://api.tochikala.com/api/";
            // var urlInsertToSabad = ApiUrl + "User/Api_AddRemoveSabadKharidSatr";
            ////zare_nk_050325_commented_end(agheire api be hamyarForoosh)
            ////zare_nk_050325_added_st(agheire api be hamyarForoosh) 
            var urlInsertToSabad = NextJsApiUrl + "Api_InsertToSabad";
            console.log('050326-001-urlInsertToSabad: ' + urlInsertToSabad);
            ////zare_nk_050325_added__end(agheire api be hamyarForoosh)
            const currentShobeh = await AsyncStorage.getItem("currentShobeh");  ////zare_nk_050326_added
            const response = await fetch(urlInsertToSabad, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
                body: JSON.stringify({
                    BarcodeKala: addRemParam.BarcodeKala,
                    // Tedad: TedadOut,  ////zare_nk_050326_commented(chon dar Api_InsertToSabade hamyar TedadOut nemidim va khodesh mohaaebeh mikoneh)
                    Tedad: zarib,  ////zare_nk_050326_added(chon dar Api_InsertToSabade hamyar TedadOut nemidim va khodesh mohaaebeh mikoneh)

                    // IdKala: addRemParam.IdKala,  ////zare_nk_050326_commented(chon dar Api_InsertToSabade hamyar ehtemalan IdKala nemikhad)
                    IdShobeh: Number(currentShobeh), ////zare_nk_050326_added(age kerfue biad 12 hast) 
                    // IdAddress: 23990  ////zare_nk_050326_commented(chon dar Api_InsertToSabade hamyar ehtemalan IdAddress nemikhad)
                }),
            });
            //  const text = await response.text();
            //  console.log('041203-addToCartInIndex-text: ' + text);
            console.log('050329-addToCartInIndex-response.status: ' + response.status);
            const data = await response.json();
            if (response.ok) {
                console.log('050329-addToCartInIndex-else 5 IdKala response.ok-data: ' + JSON.stringify(data));
                setAddOrRemChanged(addRemParam.BarcodeKala + "-" + TedadOut);
                var result = data;
                if (result.status != 0) {
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
                } else if (result.status == 0) {
                    // let satrInoInResult = JSON.parse(result.data.satr)[0];  ////zare_nk_050327_nokteh(dar pasokhe api tochi) 
                    let satrInoInResult = JSON.parse(result.data)[0];    ////zare_nk_050327_nokteh(dar pasokhe api hamyar)  
                    let Tedad = satrInoInResult.Tedad;

                    var bishAzMaxTedadYaMojoodi = 0;
                    if (addRemParam.MaxTedad != null) {
                        if (addRemParam.MaxTedad <= Tedad) {
                            bishAzMaxTedadYaMojoodi = 1;
                        }
                    } else {
                        if (addRemParam.Mojoodi <= Tedad) {
                            bishAzMaxTedadYaMojoodi = 1;
                        }
                    }

                    refForfather.current = addRemParam.father;

                    let ForCartContentsDesignTypeLet = 0

                    if (Tedad == 0) {
                        ForCartContentsDesignTypeLet = 0;
                    }
                    else if (Tedad > addRemParam.ZaribForoosh) {
                        ForCartContentsDesignTypeLet = 2;
                    }
                    else if (Tedad == addRemParam.ZaribForoosh) {
                        ForCartContentsDesignTypeLet = 1;
                    }
                    if (addRemParam.fromShowDetails) {
                        setImgUriForDet(`https://img.tochikala.com/Product/${addRemParam.IdKala}.webp`);  //zare_nk_050318_added
                        setForCartContInProdDetVal(() => {
                            const idTag = "ForCart-" + addRemParam.IdKala;
                            return {
                                tedadInSabadOrDet: Tedad,
                                ZaribForoosh: addRemParam.ZaribForoosh,
                                IdKala: addRemParam.IdKala,
                                NameKala: addRemParam.NameKala,
                                DarsadTakhfif: addRemParam.DarsadTakhfif,
                                NameBerand: addRemParam.NameBerand,
                                FeeForoosh: addRemParam.FeeForoosh,
                                FeeMasraf: addRemParam.FeeMasraf,
                                BarcodeKala: addRemParam.BarcodeKala,
                                Mojoodi: addRemParam.Mojoodi,
                                MaxTedad: addRemParam.MaxTedad,
                                father: "#DetailsInfoCont",
                                refForfather: refForfather,
                                bishAzMaxTedadYaMojoodi: bishAzMaxTedadYaMojoodi,
                                fromShowDetails: addRemParam.fromShowDetails,
                                ForCartContentsDesignType: ForCartContentsDesignTypeLet,
                                idTag: idTag,
                            };
                        });
                    }
                }
            } else {
                console.log('041120-addToCartInIndex-else 6 IdKala !!!!response.ok');
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
                ////zare_nk_050311_added_st
                else {
                    setIsOpenedMymodalForWarning(true);
                    setWarningTextInMymodalForWarning("ارتباط با سرور برقرار نشد");
                }
                ////zare_nk_050311_added_end

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
                    WarningText = '55درخواست نا موفق بود';
                }
            } else {
                WarningText = String(error);
            }

            setWarningTextInMymodalForWarning(() => {
                return (WarningText)
            });
        }
        // } ////zare_nk_050326_commented(dar sharte token == null return gozashtim dige else nemikhaim)
    }

    async function remveFromCartInIndex(
        addRemParam: addRemParamType,
    ) {
        console.log('050329-001.01');
        // Alert.alert('remveFromCartInIndex');
        ////zare_nk_041129_commented_st
        // if (addRemParam.event != null) {
        //     addRemParam.event.stopPropagation();
        //     addRemParam.event.preventDefault();
        // }
        ////zare_nk_041129_commented_st
        const token = await getCookie("token");
        if (token == null) {
            setIsOpenedMymodalForWarning(true);
            setWarningTextInMymodalForWarning("لطفا ابتدا آنلاین شوید");
            ////zare_nk_041129_commented_st
            //   const bootstrap = await getBootstrap();
            //   const mymodalForWarning = new bootstrap.Modal(
            //     document.getElementById("mymodalForWarning")
            //   );
            //   mymodalForWarning.show();
            //   const span = document.querySelector(
            //     "#mymodalForWarning .errorInMymodalForWarning"
            //   );
            //   if (span instanceof HTMLElement) {
            //     span.innerText = "لطفا ابتدا آنلاین شوید";
            //   }
            ////zare_nk_041129_commented_end
            return;
        }
        //else {  ////zare_nk_050326_commented(dar sharte token == null return gozashtim dige else nemikhaim)
        try {
            console.log('050329-001.02');
            var TedadOut = 0;
            var TedadOuttoAjax = 0;
            const zarib = parseFloat(String(addRemParam.ZaribForoosh ?? 0));
            TedadOut = addRemParam.tedadInSabadOrDet - zarib;
            TedadOuttoAjax = -(addRemParam.ZaribForoosh);
            // const token = await getCookie("token");

            ////zare_nk_050325_commented_st(agheire api be hamyarForoosh)
            // let ApiUrl = "https://api.tochikala.com/api/";
            // var urlInsertToSabad = ApiUrl + "User/Api_AddRemoveSabadKharidSatr";
            ////zare_nk_050325_commented_end(agheire api be hamyarForoosh)
            ////zare_nk_050325_added_st(agheire api be hamyarForoosh) 
            var urlInsertToSabad = NextJsApiUrl + "Api_InsertToSabad";
            console.log('050329-001-urlInsertToSabad: ' + urlInsertToSabad);
            ////zare_nk_050325_added__end(agheire api be hamyarForoosh) 
            const currentShobeh = await AsyncStorage.getItem("currentShobeh");  ////zare_nk_050326_added
            const response = await fetch(urlInsertToSabad, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
                body: JSON.stringify({
                    BarcodeKala: addRemParam.BarcodeKala,
                    // Tedad: TedadOut,  ////zare_nk_050326_commented(chon dar Api_InsertToSabade hamyar TedadOut nemidim va khodesh mohaaebeh mikoneh)
                    Tedad: -zarib,  ////zare_nk_050326_added(chon dar Api_InsertToSabade hamyar TedadOut nemidim va khodesh mohaaebeh mikoneh)

                    // IdKala: addRemParam.IdKala,  ////zare_nk_050326_commented(chon dar Api_InsertToSabade hamyar ehtemalan IdKala nemikhad)
                    IdShobeh: Number(currentShobeh), ////zare_nk_050326_added(age kerfue biad 12 hast) 
                    // IdAddress: 23990  ////zare_nk_050326_commented(chon dar Api_InsertToSabade hamyar ehtemalan IdAddress nemikhad)
                }),
            });

            const data = await response.json();
            if (response.ok) {
                var result = data;
                if (result.status == -1000) {
                    ////zare_nk_041129_commented_st
                    // const inputGroup = document.querySelector(
                    //     ".ForCart-" + addRemParam.IdKala + " .input-group"
                    // );
                    // if (inputGroup) {
                    //     let parent = inputGroup.closest(".flxpedar2_new");    
                    //     if (parent) {
                    //         parent.remove();
                    //     }
                    // } 
                    // var hisFather = null;
                    // let eventCurrentTargetTag;
                    // if (addRemParam.event) {
                    //     eventCurrentTargetTag = addRemParam.event.currentTarget as HTMLElement;
                    // }

                    // const hisFatherTag = eventCurrentTargetTag?.closest(".gfForAddRemm");
                    // if (hisFatherTag) {
                    //     hisFather = hisFatherTag.id;
                    // }
                    ////zare_nk_041129_commented_end
                    refForfather.current = addRemParam.father;
                    setIsOpenedMymodalForWarning(true);
                    setWarningTextInMymodalForWarning(result.errors[0]);
                    // const bootstrap = await getBootstrap();
                    // const adameSabteNahaeiModal = new bootstrap.Modal(
                    //     document.getElementById("adameSabteNahaeiModal")
                    // );
                    // adameSabteNahaeiModal.show();
                    // const HoshdarInAdameSabteNahaeiModalTag = document.getElementById(
                    //     "HoshdarInAdameSabteNahaeiModal"
                    // );
                    // if (HoshdarInAdameSabteNahaeiModalTag instanceof HTMLElement) {
                    //     HoshdarInAdameSabteNahaeiModalTag.innerText = result.errors[0];
                    // }
                }
                if (result.status != 0) {
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
                } else if (result.status == 0) {
                    console.log('050329-result.status == 0-data: ' + JSON.stringify(result));

                    ////050329-result.status == 0-data: 
                    // {
                    //"status":0,
                    // "message":"افزودن با موفقیت انجام شد",

                    // "data":
                    // "[
                    // {\"IdPishfaktor\":9862950,\"ShomarePishFaktor\":9351091287,\"IsJayzeh\":0,\"BarcodeKala\":6262961900810,\"IdKala\":66440,\"NameKala\":\"آنیکا خیارشور درجه یک 1500 گرم شیشه (6)\",
                    // \"Tedad\":2.0,\"FeeMasraf\":2300000,\"FeeForoosh\":1426000,\"FeeJayzeh\":0,\"DarsadTakhfif\":38,\"VaznKala\":0.0,\"GheimatTedadi\":0,\"NoeVazni\":0,\"IdAnbar\":0,\"IsMashmool\":0,
                    // \"IdUser\":null,\"DatePish\":\"2026-06-16T08:23:21.153\",\"JamMasraf\":4600000.0,\"JamForoosh\":2852000.0,\"JamVazn\":0.0,\"TakhfifMoshtari\":0,\"JamJayze\":0.0,
                    // \"TakhfifiMoshtariNoe\":0,\"Radif\":74,\"ShoTarakonesh\":9351091287,\"IdSandoogh\":null,\"JamKol\":2852000.0,\"TakhfifKol\":0,\"IdBrand\":1458,\"IdTaminKonande\":67,
                    // \"IsChangeTedad\":1,\"Mojoodi\":10,\"MaxTedad\":10,\"ZaribForoosh\":1}
                    // ]",

                    // "errors":[]

                    //}

                    setAddOrRemChanged(addRemParam.BarcodeKala + "-" + TedadOut);
                    console.log('050329-result.status == 0-01');
                    // let satrInoInResult = JSON.parse(result.data.satr)[0];  ////zare_nk_050327_nokteh(dar pasokhe api tochi) 
                    let satrInoInResult = JSON.parse(result.data)[0];    ////zare_nk_050327_nokteh(dar pasokhe api hamyar)  
                    let Tedad = satrInoInResult === undefined ? 0 : satrInoInResult.Tedad;
                    console.log('050329-result.status == 0-02');
                    var bishAzMaxTedadYaMojoodi = 0;
                    if (addRemParam.MaxTedad != null) {
                        if (addRemParam.MaxTedad <= Tedad) {
                            bishAzMaxTedadYaMojoodi = 1;
                        }
                    } else {
                        if (addRemParam.Mojoodi <= Tedad) {
                            bishAzMaxTedadYaMojoodi = 1;
                        }
                    }
                    refForfather.current = addRemParam.father;
                    console.log('050329-result.status == 0-03');
                    let ForCartContentsDesignTypeLet = 0

                    if (Tedad == 0) {
                        ForCartContentsDesignTypeLet = 0;
                    }
                    else if (Tedad > addRemParam.ZaribForoosh) {
                        ForCartContentsDesignTypeLet = 2;
                    }
                    else if (Tedad == addRemParam.ZaribForoosh) {
                        ForCartContentsDesignTypeLet = 1;
                    }
                    console.log('050329-result.status == 0-04');
                    if (addRemParam.fromShowDetails) {
                        console.log('050329-result.status == 0-05');
                        setImgUriForDet(`https://img.tochikala.com/Product/${addRemParam.IdKala}.webp`);  //zare_nk_050318_added
                        setForCartContInProdDetVal(() => {
                            const idTag = "ForCart-" + addRemParam.IdKala;
                            return {
                                tedadInSabadOrDet: Tedad,
                                ZaribForoosh: addRemParam.ZaribForoosh,
                                IdKala: addRemParam.IdKala,
                                NameKala: addRemParam.NameKala,
                                DarsadTakhfif: addRemParam.DarsadTakhfif,
                                NameBerand: addRemParam.NameBerand,
                                FeeForoosh: addRemParam.FeeForoosh,
                                FeeMasraf: addRemParam.FeeMasraf,
                                BarcodeKala: addRemParam.BarcodeKala,
                                Mojoodi: addRemParam.Mojoodi,
                                MaxTedad: addRemParam.MaxTedad,
                                father: "#DetailsInfoCont",
                                refForfather: refForfather,
                                bishAzMaxTedadYaMojoodi: bishAzMaxTedadYaMojoodi,
                                fromShowDetails: addRemParam.fromShowDetails,
                                ForCartContentsDesignType: ForCartContentsDesignTypeLet,
                                idTag: idTag,
                            };
                        });
                    }
                    console.log('050329-result.status == 0-06');

                    if (Tedad == 0) {
                        ////zare_nk_041129_commented_st
                        // const inputGroup = document.querySelector(
                        //     ".ForCart-" + addRemParam.IdKala + " .input-group"
                        // );
                        // if (inputGroup) {
                        //     let parent = inputGroup.closest(".flxpedar2_new");   
                        //     if (parent) {
                        //         if (JSON.parse(result.data.titr).length == 0) {
                        //             parent.remove();
                        //         }
                        //     }
                        // }
                        ////zare_nk_041129_commented_st
                    }
                    else if (Tedad == addRemParam.ZaribForoosh) {
                        ////zare_nk_041129_commented_st
                        // let htmlTag;
                        // if (addRemParam.event) {
                        //     htmlTag = addRemParam.event.target as HTMLElement;
                        // }

                        // const wrapper = htmlTag?.closest(     
                        //     ".flxpedar2_new"
                        // ) as HTMLElement | null;
                        // if (wrapper) {
                        //     wrapper.style.backgroundColor = "inherit";
                        // }
                        ////zare_nk_041129_commented_end
                    }
                }
            } else {
                console.log('050329-!!response.ok');
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
                ////zare_nk_050311_added_st
                else {
                    setIsOpenedMymodalForWarning(true);
                    setWarningTextInMymodalForWarning("ارتباط با سرور برقرار نشد");
                }
                ////zare_nk_050311_added_end
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
                    WarningText = '66درخواست نا موفق بود';
                    console.log("050329-error.message: " + error.message)
                }
            } else {
                WarningText = String(error);
            }

            setWarningTextInMymodalForWarning(() => {
                return (WarningText)
            });
        }
        // }  ////zare_nk_050326_commented(dar sharte token == null return gozashtim dige else nemikhaim) 
    }

    const handlerForAddClick: (
        addRemParam: addRemParamType,
    ) => void = (addRemParam) => {
        // addRemParam.event && addRemParam.event.stopPropagation(); 
        // Alert.alert('333');
        addToCartInIndex(
            addRemParam
        );
    };

    const handlerForRemClick: (
        addRemParam: addRemParamType,
    ) => void = (addRemParam) => {
        // Alert.alert('handlerForRemClick');
        remveFromCartInIndex(
            addRemParam
        );
    };
    // if (!device) return <Text style={styles.centerText}>دوربین یافت نشد</Text>;  //zare_nk_041201
    // if (!hasPermission) return <Text style={styles.centerText}>نیاز به دسترسی دوربین</Text>;    //zare_nk_041201
    const hasTorch = device?.hasTorch ?? false;  //zare_nk_040927_added_st(baraye danestane flash dashtane dastgah)

    return (
        <>
            <Modal
                visible={isOpenedMymodalForWarning}
                transparent
                animationType="fade"
                onRequestClose={() => {
                    setIsOpenedMymodalForWarning(false);
                    setScannedValue(null);
                    setIsScanning(true);
                }}
            >
                <View style={styles.resultOverlay}>
                    <View style={styles.resultBox}>
                        <Text style={styles.resultValue}>
                            {warningTextInMymodalForWarning}
                        </Text>

                        {/* <Button
                            title="تأیید"
                            onPress={() => {
                                setIsOpenedMymodalForWarning(false);
                                setScannedValue(null);
                                setIsScanning(true);
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
                                setScannedValue(null);
                                setIsScanning(true);
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
            {isOpenedProdDetModal == true ? (
                <Modal   //zare_nk_040923(komponent modal baraye namayesh doorbin va scan kardan)
                    visible={isOpenedProdDetModal}    //zare_nk_040923(halat namayesh modal)
                    animationType="slide"  //zare_nk_040923(ta'sir gozashtan rooye namayesh modal)  //ye bar fade bezaram bebinam chi mishe!
                    onRequestClose={() => {
                        ////zare_nk_041128_nokteh(moadele methode hiddenHandlerForProdDetModal)
                        setIsOpenedProdDetModal(false);
                        setAddOrRemChanged("notNull");
                        setBisatrInProductDet(false);
                        setIsScanning(true);  //zare_nk_041203_added
                    }}   //zare_nk_040923(agar karbar dokmeye back android ra zad modal baste shavad)
                >
                    <ScrollView horizontal={false}
                        style={{
                            height: "100%",
                            overflow: "hidden",
                        }}
                        contentContainerStyle={[styles.ProdDetModalmodalContainer, {
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center", //zare_nk_041209_added
                            alignItems: 'center', //zare_nk_041209_added
                            paddingHorizontal: 10, //zare_nk_041209_added
                            paddingVertical: 10, //zare_nk_041209_added 
                        }]}>
                        {/* zare_nk_041128_added_st */}
                        {/* <View
                                 // className="inModalBody"
                                 style={{
                                   display: "flex",
                                   flexDirection: "column",
                                   height: "100%",
                   
                                   justifyContent: "center", //zare_nk_041209_added
                                   alignItems: 'center', //zare_nk_041209_added
                                   paddingHorizontal: 10, //zare_nk_041209_added
                                   paddingVertical: 10, //zare_nk_041209_added
                                   borderWidth: 2,
                                   borderStyle: 'dashed',
                                   borderColor: 'red',
                                 }}
                               > */}
                        {/* <View
                                   // className="scrollContInModal"
                                   // id="prodDetCont"
                                   style={{
                                     // flex: "1 1 auto",  
                                     flexGrow: 1,
                                     flexShrink: 1,
                                     flexBasis: 'auto',
                                     // display: "flex",
                                     flexDirection: "column",
                                     overflow: "hidden",
                                   }}
                                 > */}
                        <View
                            style={{
                                flexGrow: 0,
                                flexShrink: 0,
                                flexBasis: "auto",
                                width: '100%',
                                display: "flex",
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <Text
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                style={{
                                    fontFamily: "IRANSansWeb(FaNum)_Medium",
                                    color: "#444343",
                                }}
                            >
                                جزئیات محصول
                            </Text>
                            <TouchableOpacity
                                style={{
                                    borderRadius: 8,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    cursor: 'pointer',
                                    padding: 4,
                                    borderWidth: 1,
                                    borderStyle: 'solid',
                                    borderColor: 'rgb(165, 165, 165)',
                                    width: 30,
                                    height: 30,
                                }}
                                onPress={() => {
                                    // Alert.alert('close btn clicked in modalprodDet');
                                    setIsOpenedProdDetModal(false);
                                    setAddOrRemChanged("notNull");
                                    setBisatrInProductDet(false);
                                    setIsScanning(true);  //zare_nk_041203_added
                                }}
                                activeOpacity={0.6}
                            >
                                {/* <Image
                                             source={{ uri: "https://img.tochikala.com/tochikala/close-modal.svg" }}
                                             style={{ width: 32, }}
                                           /> */}
                                <SvgUri
                                    uri="https://img.tochikala.com/tochikala/close-modal.svg"
                                    width='100%'
                                    height='100%'
                                />
                            </TouchableOpacity>
                        </View>

                        <View
                            // id="productExist"
                            style={{
                                flexGrow: 1,
                                flexShrink: 1,
                                flexBasis: "auto",
                                display: bisatrInProductDet === true ? "none" : "flex", //zare_nk_041129_rahe2(tosiye mishe)
                                justifyContent: "center",
                                width: '100%',
                            }}
                        >
                            <View
                                // id="DetailsPageCont"
                                style={{
                                    marginTop: 10,
                                    overflow: "hidden",
                                    width: "100%",
                                    display: 'flex',
                                    flexDirection: 'row',
                                }}
                            >
                                <View
                                    // id="groupsInDetailsPageCont"
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        marginTop: 0,
                                        // marginRight: 10, //zare_nk_041209_commented
                                        // marginBottom: 10, //zare_nk_041209_commented
                                        marginLeft: 0,
                                    }}
                                >
                                    {/* <Text style={{ fontSize: 14, }}></Text> */}
                                </View>
                                {/* zare_nk_041212_nokteh_st(faghat intoo barresi beshe baraye responsivi) */}
                                <View
                                    // id="DetailsImgAndInfoCont"
                                    style={[{
                                        display: 'flex',
                                        width: '100%',
                                    }, DetailsImgAndInfoContResponse]}
                                >
                                    <View
                                        // id="ImgAndSwiperCont"
                                        style={[{
                                            // marginBottom: 7, 
                                            padding: 3,
                                            display: 'flex',
                                            flexDirection: 'row',
                                            flexBasis: 'auto',
                                            flexGrow: 0,
                                            flexShrink: 0,
                                        }, CurrentImgContResponse]}
                                    >
                                        <View
                                            // id="ImageColectionInDetails"
                                            // className="swiper"
                                            style={{
                                                display: 'none',
                                                marginLeft: 10,
                                                padding: 7,
                                                borderRadius: 10,
                                                // border: "none",
                                                boxShadow: "0px 0px 3px 0px silver",
                                                marginRight: 0,
                                            }}
                                        >
                                            <View
                                            // className="swiper-wrapper"
                                            ></View>
                                            <View
                                            // className="swiper-pagination"
                                            ></View>
                                            <View
                                            // className="swiper-scrollbar"
                                            ></View>
                                        </View>

                                        <View
                                            // id="CurrentImgCont"
                                            style={[{
                                                // // paddingVertical: 15,
                                                paddingHorizontal: 0,
                                                overflow: "hidden",
                                                borderTopRightRadius: 15,
                                                borderBottomRightRadius: 0,
                                                borderBottomLeftRadius: 0,
                                                borderTopLeftRadius: 15,
                                                position: "relative",
                                                boxShadow: "0px 0px 3px 1px silver",
                                                display: "flex",
                                                justifyContent: "center",
                                                backgroundColor: "white",
                                                borderWidth: 0,
                                                borderStyle: 'solid',
                                                borderColor: 'silver',
                                                width: '100%',
                                            },]}
                                        >
                                            <View
                                                id="heartContInDetails"
                                                style={{
                                                    display: "none",
                                                    zIndex: 898,
                                                    cursor: "pointer",
                                                    position: "absolute",
                                                    top: 7,
                                                    right: 7,
                                                    opacity: 0.7,
                                                    backgroundColor: "inherit",
                                                }}
                                            >
                                                {/* <img    
                                                                                       id="heartImgInDetails"
                                                                                       style={{ width: "32px" }}
                                                                                       src="https://img.tochikala.com/icon/heart/heart01(0).svg"
                                                                                       alt="علاقه&zwnj;مندی&zwnj;ها"
                                                                                   /> */}
                                                <Image
                                                    source={{ uri: "https://img.tochikala.com/icon/heart/heart01(0).svg" }}
                                                    style={{ width: 32, }}
                                                />
                                            </View>
                                            {ForCartContInProdDetVal != undefined && (
                                                // <img
                                                //     loading="lazy"
                                                //     id="CurrentImg"
                                                //     style={{ height: "fit-content" }}
                                                //     src={`https://img.tochikala.com/Product/${ForCartContInProdDetVal.IdKala}.webp`}
                                                //     alt={ForCartContInProdDetVal.NameKala ?? ""}
                                                // /> 
                                                // <Image
                                                //   source={{ uri: `https://img.tochikala.com/Product/${ForCartContInProdDetVal.IdKala}.webp` }}
                                                //   style={{
                                                //     backgroundColor: "#efefef", width: "100%", height: 92,

                                                //     borderWidth: 3,
                                                //     borderColor: 'black',
                                                //   }} 
                                                // /> 

                                                <Image
                                                    onLayout={onImageLayoutForDet}
                                                    onError={() => {
                                                        const productUriOnError = 'https://img.tochikala.com/Logo/tochi.png';
                                                        setImgUriForDet(productUriOnError);
                                                        if (productWidthForDet > 0) {
                                                            Image.getSize(productUriOnError, (imgWidth, imgHeight) => {
                                                                const ratio = imgHeight / imgWidth;
                                                                setProductHeightForDet(productWidthForDet * ratio);
                                                            });
                                                        }
                                                    }}
                                                    onLoad={() => { setIsLoadedIroductImage(true); }}
                                                    // source={{ uri: `https://img.tochikala.com/Product/${SabadRow.IdKala}.webp` }}  //zare_nk_041207_commented
                                                    source={{ uri: imgUriForDet }}   //zare_nk_041207_added
                                                    style={{
                                                        backgroundColor: isLoadedIroductImage ? "#ffffff" : "#efefef",
                                                        width: "100%",
                                                        ...(productHeightForDet === 0
                                                            ? { aspectRatio: 1 }
                                                            : { height: productHeightForDet }),
                                                    }}
                                                />
                                            )}
                                        </View>
                                    </View>
                                    {/* zar_nk_injam_komak_st */}
                                    <View
                                        // id="DetailsInfoCont"
                                        // className="hisGrandFather WantCompress"
                                        style={[{
                                            // justifyContent: "space-between",
                                            backgroundColor: "white",
                                            padding: 3,
                                            // borderRadius: "0px 0px 15px 15px",
                                            // boxShadow: "0px 0px 3px 0px silver",  
                                        }, DetailsInfoContResponse]}
                                    >
                                        <View
                                            style={{
                                                justifyContent: "space-between",
                                                backgroundColor: "white",
                                                padding: 7,
                                                borderRadius: "0px 0px 15px 15px",
                                                boxShadow: "0px 0px 3px 1px silver",

                                                borderWidth: 0,
                                                borderStyle: 'solid',
                                                borderColor: 'silver',
                                            }}
                                        >
                                            <View
                                                // id="titleAndGeoupInDetailsInfoCont"
                                                style={{
                                                    // display: "flex",
                                                    flexDirection: "column",
                                                    width: "100%",
                                                }}
                                            >
                                                {ForCartContInProdDetVal != null && (
                                                    <Text
                                                        // id="nameKalaInDetailsInfoCont"
                                                        numberOfLines={2}
                                                        ellipsizeMode="tail"
                                                        style={{

                                                            // lineHeight: "2.0",
                                                            // lineHeight: 32, // تقریبی: fontSize * 2
                                                            // textOverflow: "ellipsis",
                                                            // overflow: "hidden",
                                                            // display: "-webkit-box",
                                                            // WebkitLineClamp: "2",
                                                            // lineClamp: "2",
                                                            // WebkitBoxOrient: "vertical", 
                                                            fontSize: 16,
                                                            marginBottom: 30,
                                                            fontFamily: "IRANSansWeb(FaNum)_Medium",
                                                            textAlign: "right",
                                                        }}
                                                    >
                                                        {ForCartContInProdDetVal.NameKala}
                                                    </Text>
                                                )}

                                                <View style={{
                                                    display: "flex", flexDirection: "row",
                                                }}>

                                                    <View
                                                        style={{
                                                            // flex: "1 1 30%",  
                                                            flexGrow: 1,
                                                            flexShrink: 1,
                                                            flexBasis: ' 30%',
                                                            // display: "flex",
                                                            flexDirection: "column",
                                                            paddingLeft: 5,
                                                            // alignItems: "center",
                                                            alignItems: 'flex-end',
                                                            justifyContent: "space-around",
                                                        }}
                                                    >
                                                        <View
                                                            style={{
                                                                // display: "flex",
                                                                flexDirection: "row",
                                                                flexGrow: 0,
                                                                flexShrink: 0,
                                                                flexBasis: 'auto',
                                                            }}
                                                        >
                                                            <Text
                                                                numberOfLines={1}
                                                                ellipsizeMode="tail"
                                                                style={{
                                                                    fontFamily: "IRANSansWeb(FaNum)_Medium", color: "#888888",
                                                                }}>برند</Text>
                                                        </View>
                                                        <View
                                                            style={{
                                                                // flex: "0 0 auto",
                                                                flexGrow: 0,
                                                                flexShrink: 0,
                                                                flexBasis: 'auto',
                                                                // display: "flex",
                                                                flexDirection: "row",
                                                                paddingLeft: 5,
                                                                alignItems: "center",
                                                            }}
                                                        >
                                                            {ForCartContInProdDetVal != null && (
                                                                <Text
                                                                    // id="nameBerandInDetailsInfoCont"
                                                                    style={{
                                                                        fontFamily: "IRANSansWeb(FaNum)_Bold", color: "#322E2E",
                                                                    }}
                                                                >
                                                                    {ForCartContInProdDetVal.NameBerand}
                                                                </Text>
                                                            )}
                                                        </View>
                                                    </View>

                                                    <View
                                                        style={{
                                                            // display: "flex",
                                                            flexDirection: "row",
                                                            alignContent: "center",
                                                            alignItems: "center",
                                                            // padding: "0px 8px 0px 8px",
                                                            paddingVertical: 0,
                                                            paddingHorizontal: 8,
                                                        }}
                                                    >
                                                        <View
                                                            style={{
                                                                width: 0,
                                                                height: 30,
                                                                borderLeftWidth: 1,
                                                                borderLeftColor: "#ccc",
                                                                borderStyle: 'solid',

                                                            }}
                                                        ></View>
                                                    </View>

                                                    <View
                                                        style={{
                                                            // display: "flex",
                                                            flexDirection: "column",
                                                            // flex: "1 1 30%",
                                                            flexGrow: 1,
                                                            flexShrink: 1,
                                                            flexBasis: '30%',
                                                            // alignItems: "center",
                                                            alignItems: 'flex-end',
                                                            justifyContent: 'space-between',
                                                        }}
                                                    >
                                                        {ForCartContInProdDetVal != null &&
                                                            ForCartContInProdDetVal.DarsadTakhfif != 0 && (
                                                                <View
                                                                    style={{
                                                                        display: "flex",
                                                                        flexDirection: "row",
                                                                        marginBottom: 10,
                                                                        // borderWidth: 1,
                                                                        // borderStyle: 'solid',
                                                                        // borderColor: 'blue',
                                                                    }}
                                                                >
                                                                    {/* {ForCartContInProdDetVal != null &&
                                                 ForCartContInProdDetVal.DarsadTakhfif != 0 && ( */}
                                                                    <View
                                                                        // id="gheimatMasrafInDetailsInfoCont"
                                                                        // className="gheimatMasrafInsabad"
                                                                        style={{
                                                                            // display: "none",
                                                                            display: Number(ForCartContInProdDetVal.DarsadTakhfif) === 0 ? "none" : "flex",
                                                                            flexDirection: "row",
                                                                            justifyContent: 'flex-end',
                                                                            alignItems: "center",
                                                                        }}
                                                                    >
                                                                        {/* {ForCartContInProdDetVal != null && ( */}
                                                                        <Text style={{
                                                                            fontSize: 14, textDecorationLine: "line-through",
                                                                            fontFamily: "IRANSansWeb(FaNum)_Medium", color: "#322E2E",
                                                                        }}>
                                                                            {ForCartContInProdDetVal.FeeMasraf}
                                                                        </Text>
                                                                        {/* )} */}
                                                                    </View>
                                                                    {/* )} */}
                                                                </View>
                                                            )}
                                                        <View
                                                            style={{
                                                                // display: "flex",
                                                                flexDirection: "row-reverse",
                                                                height: 35,
                                                                alignContent: "center",
                                                                // borderWidth: 1,
                                                                // borderStyle: 'solid',
                                                                // borderColor: 'red',
                                                            }}
                                                        >
                                                            <View
                                                                // id="gheimatForooshInDetailsInfoCont"
                                                                // className="gheimatForooshInsabad"
                                                                style={{
                                                                    // display: "flex",
                                                                    flexDirection: "row",
                                                                    marginLeft: 5,
                                                                    alignItems: "center",
                                                                    // borderWidth: 1,
                                                                    // borderStyle: 'solid',
                                                                    // borderColor: 'green',
                                                                }}
                                                            >
                                                                {ForCartContInProdDetVal != null && (
                                                                    <Text style={{
                                                                        fontSize: 16,
                                                                        fontFamily: "IRANSansWeb(FaNum)_Medium", color: "#322E2E",
                                                                    }}>
                                                                        {ForCartContInProdDetVal.FeeForoosh}
                                                                    </Text>
                                                                )}
                                                            </View>
                                                            <View
                                                                // className="rialInsabad  valueStyle"
                                                                style={{
                                                                    // display: "flex",
                                                                    flexDirection: "row",
                                                                    alignItems: "center",
                                                                    // borderWidth: 1,
                                                                    // borderStyle: 'solid',
                                                                    // borderColor: 'yellow',
                                                                }}
                                                            ><Text style={{
                                                                fontSize: 12,
                                                                fontFamily: "IRANSansWeb(FaNum)_Medium", color: "#322E2E",
                                                            }}> ریال</Text>

                                                            </View>
                                                        </View>
                                                    </View>

                                                    {ForCartContInProdDetVal != null &&
                                                        ForCartContInProdDetVal.DarsadTakhfif != 0 && (
                                                            <View
                                                                // id="lastDividerInDetails"
                                                                style={{
                                                                    // display: "flex",
                                                                    display: Number(ForCartContInProdDetVal.DarsadTakhfif) === 0 ? "none" : "flex",
                                                                    flexDirection: "row",
                                                                    alignContent: "center",
                                                                    alignItems: "center",
                                                                    // padding: "0px 8px 0px 8px",
                                                                    paddingVertical: 0,
                                                                    paddingHorizontal: 8,
                                                                }}
                                                            >
                                                                <View
                                                                    style={{
                                                                        width: 0,
                                                                        height: 30,
                                                                        // borderLeft: "2px solid silver",
                                                                        borderLeftWidth: 1,   //rezaaam
                                                                        borderLeftColor: "#ccc",
                                                                        borderStyle: 'solid',
                                                                    }}
                                                                ></View>
                                                            </View>
                                                        )}

                                                    {ForCartContInProdDetVal != null &&
                                                        ForCartContInProdDetVal.DarsadTakhfif != 0 && (
                                                            <View
                                                                id="DiscountContInDetails"
                                                                style={{
                                                                    // display: "flex",
                                                                    display: Number(ForCartContInProdDetVal.DarsadTakhfif) === 0 ? "none" : "flex",
                                                                    flexDirection: "column",
                                                                    // flex: "1 1 30%",
                                                                    flexGrow: 1,
                                                                    flexShrink: 1,
                                                                    flexBasis: '30%',
                                                                    alignItems: "center",
                                                                    // justifyContent: "space-around",
                                                                    justifyContent: "center",
                                                                    // borderWidth: 3,
                                                                    // borderStyle: 'solid',
                                                                    // borderColor: 'red',
                                                                }}
                                                            >
                                                                <View
                                                                    style={{
                                                                        // display: "flex",
                                                                        flexDirection: "row",
                                                                        // marginBottom: 10,  //zare_nk_041209_commented
                                                                        width: "100%",
                                                                        justifyContent: "center",
                                                                    }}
                                                                >
                                                                    <View
                                                                        // id="darsadTakhfifInDetails"
                                                                        // className="darsadTakhfifInDetails"
                                                                        style={{
                                                                            flexDirection: "row",
                                                                            backgroundColor: "red",
                                                                            // flex: "0 0 auto",
                                                                            flexGrow: 0,
                                                                            flexShrink: 0,
                                                                            flexBasis: 'auto',
                                                                            display: "flex",
                                                                            justifyContent: "center",
                                                                            alignItems: "center",
                                                                            // marginLeft: 15,  //zare_nk_041209_commented

                                                                            borderRadius: 15,
                                                                            width: "100%",
                                                                            maxWidth: 70,
                                                                            height: 50,
                                                                        }}
                                                                    >
                                                                        <Text
                                                                            style={{
                                                                                color: "white",
                                                                                opacity: 1,
                                                                                fontSize: 16,
                                                                                fontFamily: "IRANSansWeb(FaNum)_Medium",
                                                                            }}
                                                                        >
                                                                            %
                                                                        </Text>

                                                                        {/* {ForCartContInProdDetVal != null && ( */}
                                                                        <Text
                                                                            // id="forDiscountInDetails"
                                                                            // className="forDiscount"
                                                                            style={{
                                                                                color: "white",
                                                                                opacity: 1,
                                                                                fontSize: 18,
                                                                                fontFamily: "IRANSansWeb(FaNum)_Medium",
                                                                            }}
                                                                        >
                                                                            {ForCartContInProdDetVal.DarsadTakhfif}
                                                                        </Text>
                                                                        {/* )} */}
                                                                    </View>
                                                                </View>
                                                            </View>
                                                        )}
                                                </View>
                                            </View>
                                            <View
                                                // id="CartAndPriceInDetailsInfoCont"
                                                style={{
                                                    // display: "flex",
                                                    flexDirection: "column",
                                                    width: "100%",
                                                    marginTop: 10,
                                                }}
                                            >
                                                <View
                                                    // id="InCartAndPriceInDetailsInfoCont"
                                                    style={{
                                                        width: "100%",
                                                        // display: "flex",
                                                        flexDirection: "row",
                                                        justifyContent: 'flex-end',
                                                    }}
                                                >
                                                    <View
                                                        // id="ForCartContInProdDet"  
                                                        style={{
                                                            // display: "flex",
                                                            flexDirection: "column",
                                                            justifyContent: 'flex-end',
                                                        }}
                                                    >
                                                        {ForCartContInProdDetVal != null && (
                                                            // <MiddleCountTedadSefr
                                                            <AddRemBtnsAndCountPackege
                                                                // SabadRow={ForCartContInProdDetVal}  //zare_nk_041120_commented
                                                                ////zare_nk_041120_added_st
                                                                refForfather={ForCartContInProdDetVal.refForfather}
                                                                fromShowDetails={ForCartContInProdDetVal.fromShowDetails}
                                                                IdKala={ForCartContInProdDetVal.IdKala}
                                                                idTag={ForCartContInProdDetVal.idTag}
                                                                tedadInSabadOrDet={ForCartContInProdDetVal.tedadInSabadOrDet}
                                                                ////zare_nk_041120_added_end
                                                                // handlerForAddClick={(e) => {   //zare_nk_041129_commented  
                                                                handlerForAddClick={() => {  //zare_nk_041129_added
                                                                    return handlerForAddClick(
                                                                        {
                                                                            tedadInSabadOrDet: ForCartContInProdDetVal.tedadInSabadOrDet,
                                                                            ZaribForoosh: ForCartContInProdDetVal.ZaribForoosh,
                                                                            IdKala: ForCartContInProdDetVal.IdKala,
                                                                            NameKala: ForCartContInProdDetVal.NameKala,
                                                                            DarsadTakhfif: ForCartContInProdDetVal.DarsadTakhfif,
                                                                            NameBerand: ForCartContInProdDetVal.NameBerand,  //zare_nk_041118_nokteh(dar api selectKalaShobeh NameBerand dar pasokh hast pas ma meghdaresh ro dadim)
                                                                            FeeForoosh: ForCartContInProdDetVal.FeeForoosh,
                                                                            FeeMasraf: ForCartContInProdDetVal.FeeMasraf,
                                                                            BarcodeKala: ForCartContInProdDetVal.BarcodeKala,
                                                                            Mojoodi: ForCartContInProdDetVal.Mojoodi,
                                                                            MaxTedad: ForCartContInProdDetVal.MaxTedad,
                                                                            father: refForfather.current,
                                                                            bishAzMaxTedadYaMojoodi: ForCartContInProdDetVal.bishAzMaxTedadYaMojoodi,
                                                                            fromShowDetails: true,
                                                                            // event: e,  //zare_nk_041127_commented
                                                                            event: null,  //zare_nk_041127_added
                                                                        }
                                                                    );
                                                                }}
                                                                // handlerForRemClick={(e) => {   //zare_nk_041129_commented  
                                                                handlerForRemClick={() => {  //zare_nk_041129_added
                                                                    return handlerForRemClick(
                                                                        {
                                                                            tedadInSabadOrDet: ForCartContInProdDetVal.tedadInSabadOrDet,
                                                                            ZaribForoosh: ForCartContInProdDetVal.ZaribForoosh,
                                                                            IdKala: ForCartContInProdDetVal.IdKala,
                                                                            NameKala: ForCartContInProdDetVal.NameKala,
                                                                            DarsadTakhfif: ForCartContInProdDetVal.DarsadTakhfif,
                                                                            NameBerand: ForCartContInProdDetVal.NameBerand,  //zare_nk_041118_nokteh(dar api selectKalaShobeh NameBerand dar pasokh hast pas ma meghdaresh ro dadim)
                                                                            FeeForoosh: ForCartContInProdDetVal.FeeForoosh,
                                                                            FeeMasraf: ForCartContInProdDetVal.FeeMasraf,
                                                                            BarcodeKala: ForCartContInProdDetVal.BarcodeKala,
                                                                            Mojoodi: ForCartContInProdDetVal.Mojoodi,
                                                                            MaxTedad: ForCartContInProdDetVal.MaxTedad,
                                                                            father: refForfather.current,
                                                                            bishAzMaxTedadYaMojoodi: ForCartContInProdDetVal.bishAzMaxTedadYaMojoodi,
                                                                            fromShowDetails: true,
                                                                            // event: e,  //zare_nk_041127_commented
                                                                            event: null,  //zare_nk_041127_added
                                                                        }
                                                                    );
                                                                }}
                                                                ForCartContentsDesignType={ForCartContInProdDetVal.ForCartContentsDesignType}
                                                                bishAzMaxTedadYaMojoodi={ForCartContInProdDetVal.bishAzMaxTedadYaMojoodi}
                                                                navigation={navigation}  //zare_nk_041128_added
                                                            />
                                                        )}
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>

                                    {/* <View
                                     //  id="imgzoomed"
                                     ></View> */}
                                </View>
                                {/* zare_nk_041212_nokteh_end(faghat intoo barresi beshe baraye responsivi) */}
                                <View
                                    // id="navContInDetCont"
                                    style={{
                                        display: "none",
                                        flexDirection: "column",
                                        // borderBottom: "1px solid #E7E7E0",
                                        borderBottomWidth: 1,
                                        borderStyle: 'solid',
                                        borderBottomColor: '#E7E7E0',
                                        padding: 0,
                                    }}
                                >
                                    <View
                                    // className="navContInDet"
                                    >
                                        <View
                                        // className="tab-content"
                                        // style={{ color: "#545454" }}
                                        >
                                            <View
                                            // id="home" className="containerr tab-pane active"
                                            >
                                                <View
                                                    style={{
                                                        // display: "flex",
                                                        flexDirection: "row",
                                                        justifyContent: "center",
                                                        // justifyItems: "center",
                                                        alignContent: "center",
                                                        // padding: "10px 0px",
                                                        paddingVertical: 10,
                                                        paddingHorizontal: 0,
                                                    }}
                                                >
                                                    <Text style={{ margin: 0, color: "#545454" }}>
                                                        ویژگی برای این محصول وجود ندارد
                                                    </Text>
                                                </View>
                                            </View>
                                            <View
                                            // id="menu1" className="containerr tab-pane fade"
                                            >
                                                <View
                                                    // id="ProductDescription"
                                                    style={{
                                                        marginTop: 15,
                                                        flexDirection: "column",
                                                        position: "relative",
                                                        paddingBottom: 48,
                                                    }}
                                                >
                                                    <View
                                                        // id="contentContInProdDes"
                                                        style={{
                                                            marginBottom: 10,
                                                            // display: "flex",
                                                            flexDirection: "column",
                                                            maxHeight: 120,
                                                            overflow: "hidden",
                                                        }}
                                                    >
                                                        <Text style={{ color: "#545454" }}></Text>
                                                    </View>
                                                    <View
                                                        style={{
                                                            // display: "flex",
                                                            flexDirection: "column",
                                                            position: "absolute",
                                                            right: 10,
                                                            bottom: 10,
                                                        }}
                                                    >
                                                        <TouchableOpacity
                                                            // id="bishtarInProdDes"
                                                            // className="buttonHover"
                                                            // href="#ProductDescription"
                                                            style={{
                                                                padding: 10,
                                                                borderRadius: 7,
                                                                // display: "flex",
                                                                flexDirection: "row",
                                                                // textDecoration: "none",
                                                                // color: "rgb(2, 160, 164)",
                                                                backgroundColor: "inherit",
                                                            }}
                                                        >
                                                            <View
                                                                style={{
                                                                    // flex: "0 0 auto",
                                                                    flexGrow: 0,
                                                                    flexShrink: 0,
                                                                    flexBasis: 'auto',
                                                                    // display: "flex",
                                                                    flexDirection: "row",
                                                                    paddingLeft: 5,
                                                                    alignItems: "center",
                                                                }}
                                                            >
                                                                <Text
                                                                    // id="TextInBishtarInProdDes"
                                                                    style={{ color: "rgb(2, 160, 164)", }}
                                                                >
                                                                    نمایش بیشتر{" "}
                                                                </Text>
                                                            </View>
                                                            <View
                                                                style={{
                                                                    // display: "flex",
                                                                    flexDirection: "column",
                                                                    justifyContent: "center",
                                                                }}
                                                            >
                                                                <View
                                                                    // className="rounded-pill"
                                                                    style={{
                                                                        display: "flex",
                                                                        flexDirection: "row",
                                                                        backgroundColor: "inherit",
                                                                    }}
                                                                >
                                                                    {/* <img
                                                                                                           src="https://img.tochikala.com/tochikala/left-arrow.svg"
                                                                                                           style={{ width: "15px" }}
                                                                                                           alt="نمایش بیشتر"
                                                                                                       /> */}
                                                                    <Image
                                                                        source={{ uri: "https://img.tochikala.com/tochikala/left-arrow.svg" }}
                                                                        style={{ width: 15 }}
                                                                    />
                                                                </View>
                                                            </View>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                            <View
                                            // id="menu2" className="containerr tab-pane fade"
                                            >
                                                <Text style={{ color: "#545454" }}>salam menu2</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View
                            // id="productNotExist"
                            style={{
                                flexGrow: 1,
                                flexShrink: 1,
                                flexBasis: "auto",
                                //   ...(bisatrInProductDet === true && { display: 'none' }),  //zare_nk_041129_rahe1(tosiye nemishe, shayad error bede)
                                display: bisatrInProductDet === true ? "flex" : "none", //zare_nk_041129_rahe2(tosiye mishe)
                                justifyContent: "center",
                                // marginBottom: 30,
                                // color: "red", 
                                // borderWidth: 2,
                                // borderStyle: 'dashed',
                                // borderColor: 'black',
                            }}
                        >
                            <Text
                                numberOfLines={1}
                                ellipsizeMode="tail"        
                                style={{
                                    color: "red",
                                    fontFamily: "IRANSansWeb(FaNum)_Medium",
                                    // borderWidth: 2,
                                    // borderStyle: 'dashed',
                                    // borderColor: 'black',
                                }}>کالای مورد نظر یافت نشد({refForBarcodeValue.current})</Text>
                            {/* zare_nk_050312_added(in ref movaghat baraye namayeshe barcode be owner estefadeh mishe(esbate barcodekhani)) */}
                        </View>
                        {/* </View> */}
                        {/* </View> */}

                        {/* div span */}
                        {/* zare_nk_041128_added_end */}
                    </ScrollView>
                </Modal>
                ////zare_nk_041209_modale
            ) : isOpenedCodeScannerModal == true ? (
                !device ? (<Text style={styles.centerText}>دوربین یافت نشد</Text>) :
                    (!hasPermission ? (<Text style={styles.centerText}>نیاز به دسترسی دوربین</Text>) :
                        (<Modal   //zare_nk_040923(komponent modal baraye namayesh doorbin va scan kardan)
                            visible={isOpenedCodeScannerModal}    //zare_nk_040923(halat namayesh modal)  //zare_nk_041205_forUpdateName
                            animationType="slide"     //zare_nk_040923(ta'sir gozashtan rooye namayesh modal)  //ye bar fade bezaram bebinam chi mishe!
                            onRequestClose={() => {
                                setIsOpenedCodeScannerModal(false);  //zare_nk_041205_forUpdateName
                                setManualBarcode('');  //zare_nk_041205_added
                                setAddOrRemChanged("notNull");  //zare_nk_041203_added
                            }}   //zare_nk_040923(agar karbar dokmeye back android ra zad modal baste shavad)
                        >
                            {/*zare_nk_040923(konteyner dakhele modal)*/}
                            <View style={[styles.CodeScannermodalContainer, { overflow: "hidden" }]}>
                                {/*zare_nk_041204_okk_st(baraye namayesh kadr rahnama)*/}
                                <View style={[styles.overlay,
                                {
                                    // backgroundColor: '#cdf3e6',
                                    backgroundColor: 'rgba(0,0,0,0.6)',
                                    zIndex: 0,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    paddingHorizontal: 10,
                                    paddingVertical: 10,
                                }
                                ]}>
                                    <Text style={styles.text}>لطفا بارکد را در کادر قرار دهید</Text>
                                    <View
                                        style={{
                                            display: 'flex',
                                            // borderStyle: 'dashed',
                                            // borderWidth: 3,
                                            // borderColor: 'red',
                                            position: 'relative',
                                            marginBottom: 20,
                                            borderRadius: 11,
                                            overflow: "hidden",
                                        }}
                                    >{/* bazkardane view pedare doorbin va kadr */}
                                        {/* zare_nk_041205_nokteh(View ba positione statice komaki baraye inke tage pedar ke position: 'relative' dare ertefae
                                         sefr nagire,chon farzandani ke absolute bashan ertefae pedar ro barabare contente khodeshoon nemikonan) */}
                                        <View style={[styles.scanFrame,]}></View>
                                        <Camera //zare_nk_040923(komponent doorbin)
                                            style={[styles.scanFrame,
                                            // StyleSheet.absoluteFill,
                                            { zIndex: 3, position: 'absolute', top: 0, left: 0, overflow: "hidden" }]}
                                            device={device}      //zare_nk_040923(moshakhas kardan doorbin estefade shode)
                                            isActive={isOpenedCodeScannerModal}    //zare_nk_040923(faghat vaghti modal baz ast doorbin faal bashad)  //zare_nk_041205_forUpdateName
                                            codeScanner={codeScanner}  //zare_nk_040923(seda zadane tabee codeScanner baraye scan kardan code ha)
                                            enableZoomGesture={true}   //zare_nk_040923(ghabeleiat zoome kardan ba do angosht be doorbin)
                                            torch={hasTorch ? torch : 'off'}  //zare_nk_040927_added(age dastgah flash dasht vaziate feliye off ya on boodane torch lahaz beshe,vagarna hamishe off)
                                        />

                                        {/*zare_nk_040923(kadre rahnama baraye gharar dadane barcode dar an(tookhali))*/}
                                        {/*<View style={styles.scanFrame} />*/}
                                        {/*zare_nk_041003_added_st(kadre rahnama baraye gharar dadane barcode dar an(haviye khatte pareshkon))*/}
                                        <View style={[styles.scanFrame, { zIndex: 4, position: 'absolute', top: 0, left: 0, }]}>
                                            {/*zare_nk_040923(Animated.View haman khat hast ke ba translateY jabeja mishe,nokteye jaleb ine Animated.View niaz be rendere mojadade component ba setState
               nadare va dar haman rendere feli taghir mikoneh! va in maziyate khoobe ThreadNative hast ke bedoone rendere mojadade react taghirat ra roye UI anjam mideh)*/}
                                            <Animated.View
                                                style={[
                                                    styles.scanLine,
                                                    {
                                                        transform: [
                                                            {
                                                                translateY: scanLineAnim.interpolate({//zare_nk_04107_nokteh(scanLineAnim hokme chalangar ra beine bazeye sefroyeki va pixeli darad )
                                                                    inputRange: [0, 1],   //zare_nk_04107_nokteh(range Animated.Value ke bazeye beine 0 va 1 hast)
                                                                    outputRange: [0, 295], // ارتفاع فریم - ضخامت خط  //zare_nk_04107_nokteh(range UI ke bar asase pixel hast)
                                                                }),
                                                            },
                                                        ],
                                                    },
                                                ]}
                                            />
                                        </View>
                                        {/*zare_nk_041204_okk_end(baraye namayesh kadr rahnama)*/}
                                        {/*zare_nk_041003_added_end(kadre rahnama baraye gharar dadane barcode dar an(haviye khatte pareshkon))*/}

                                    </View>
                                    {/* bastane view pedare doorbin va kadr */}
                                    {/*zare_nk_040923(matni baraye rahnamayi karbar)*/}

                                    {/*zare_nk_040923(dokmeye baraye baste shodan modal)*/}
                                    {/* zare_nk_041007_commented(baraye jaygoziniye button ba ReusableButton) */}
                                    {/* <Button title="بستن" color="red" onPress={() => setIsOpenedSeePricesModal(false)} /> */}
                                    {/* zare_nk_041007_added(baraye jaygoziniye button ba ReusableButton) */}

                                    <View
                                        // className="contAndHoshdarCont"
                                        style={{
                                            // flex: "1 1 auto",
                                            flexGrow: 0,  //zare_nk_041204_nokteh(flexGrow va flexShrink ra 0 dadim ta hameye overlay ra nopooshoneh(chon zIndex bozorgtari dare mire rooye overlay))
                                            flexShrink: 0,
                                            flexBasis: 'auto',
                                            display: "flex",
                                            flexDirection: "column",
                                            // backgroundColor: 'white',
                                            zIndex: 1,
                                            marginBottom: 10,
                                        }}
                                    >
                                        <View
                                            // className="cont"
                                            style={{
                                                position: "relative",
                                                width: 300,
                                                // display: "flex",
                                                flexDirection: "row",
                                                justifyContent: "center",
                                                // justifyItems: "center",
                                                // alignContent: "center",
                                                alignItems: "center",

                                                // borderStyle: 'dashed',
                                                // borderWidth: 3,
                                                // borderColor: 'orange',
                                            }}
                                        >
                                            <View
                                                // className="labelcreator absol"
                                                style={{
                                                    // flex: "0 0 auto"
                                                    flexGrow: 0,
                                                    flexShrink: 0,
                                                    flexBasis: 'auto',
                                                    top: -13,
                                                    right: 10,
                                                    position: 'absolute',
                                                    zIndex: 2,
                                                }}
                                            >
                                                {/* <Text
                                                    //  className="valueStyle"
                                                    style={{
                                                        width: "100%",
                                                        backgroundColor: 'white',
                                                        // color:"white",
                                                        borderColor: '#a0a0a0',
                                                        // borderWidth:1,
                                                        // borderStyle:'solid',

                                                        borderRadius: 7,
                                                        paddingHorizontal: 3,
                                                        paddingVertical: 3,
                                                        boxShadow: "#5e5e5e 0px 0px 3px 0px",
                                                    }}>
                                                    بارکد دستی
                                                </Text> */}
                                                <TouchableOpacity
                                                    style={{
                                                        width: "100%",
                                                        backgroundColor: 'white',
                                                        borderColor: '#a0a0a0',
                                                        borderRadius: 7,
                                                        paddingHorizontal: 3,
                                                        paddingVertical: 3,
                                                        boxShadow: "#5e5e5e 0px 0px 3px 0px",
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        flexDirection: 'row',
                                                    }}
                                                    onPress={() => { return ManualInputBarcode(manualBarcode); }}
                                                    activeOpacity={0.1}
                                                >
                                                    <Text
                                                        //  className="valueStyle"
                                                        style={{
                                                            width: "100%",
                                                        }}>
                                                        بارکد دستی
                                                    </Text>
                                                </TouchableOpacity>

                                            </View>
                                            <View style={{
                                                // flex: "1 1 auto"
                                                flexGrow: 1,
                                                flexShrink: 1,
                                                flexBasis: 'auto',
                                            }}>
                                                <TextInput
                                                    placeholder="باردکد دستی"
                                                    value={manualBarcode}
                                                    onChangeText={setManualBarcode}
                                                    onSubmitEditing={() => {
                                                        ManualInputBarcode(manualBarcode);
                                                    }}
                                                    ////zare_nk_050130_nokteh(vaghti karbar matni ra dar TextInput vared kard va sepas rooye dokmeye 'done' dar keyboard zarbeh zad,
                                                    // tabee tooye onSubmitEditing seda zadeh mishe(noe dokmeh tavassote propertiye returnKeyType taein mishe,dar inje 'done' lahaz kardim) )                                               
                                                    style={styles.input}
                                                    returnKeyType="done"
                                                />
                                            </View>
                                        </View>
                                        <View style={{
                                            display: "none",
                                            flexDirection: "row",
                                        }}>
                                            <Text
                                                // className="forError forErrorFormanualBarcode"
                                                style={{
                                                    width: "100%",
                                                    fontSize: 14,
                                                    color: "red",
                                                    // borderBlockColor: 'red',
                                                    // borderStyle: 'dashed',
                                                    // borderWidth: 2,
                                                }}
                                            ></Text>
                                        </View>
                                    </View>

                                    {/*zare_nk_040926(baraye off va on kardane flash,albate age dastgah flash nadash dokmeh neshoon nadeh)*/}
                                    {hasTorch && (
                                        <ReusableButton
                                            title={torch === 'on' ? 'خاموش کردن فلش' : 'روشن کردن فلش'}
                                            onPress={() => setTorch(p => (p === 'on' ? 'off' : 'on'))}
                                            backgroundColor="green"
                                            textColor="white"
                                            width={300}
                                            marginTop={0}
                                            marginBottom={10}
                                        />
                                    )}

                                    <ReusableButton
                                        title="بستن بارکدخوان"
                                        onPress={() => {
                                            setIsOpenedCodeScannerModal(false);   //zare_nk_041205_forUpdateName
                                            setManualBarcode('');  //zare_nk_041205_added
                                            setAddOrRemChanged("notNull");  //zare_nk_041203_added
                                        }}
                                        backgroundColor="red"
                                        textColor="white"
                                        width={300}
                                        marginTop={0}
                                        marginBottom={0}
                                    />

                                </View>
                            </View>
                        </Modal>
                        )
                    )
            ) : (
                <ScrollView horizontal={false}
                    // id="sabadSafhe"
                    style={[{
                        width: "100%",
                        //overfloww: "hidden",   //zare_nk_041203_commented
                        ////zare_nk_041203_added_st 
                        // overflow: 'scroll',  //zare_nk_041203_commented(chon dar react native overflow: 'scroll' karbord nadare va overflow faghat maghadire visible va hidden migireh
                        // va baraye scroll dadan be jaye tage View az tage ScrollView estefadeh mishe ke scrolle amoodi mideh,baraye scrolle ofoghi attribute horizontal={true} ra ezafeh mikonim)
                        // borderWidth: 2,
                        // borderColor: "#d00cc3",
                        // borderStyle: 'dashed',
                        backgroundColor: 'white',
                        ////zare_nk_041203_added_end
                    }]}
                    contentContainerStyle={[{
                        // paddingBottom: 45
                    }, sabadSafhe]}
                >
                    <View
                        // className="list-groupp"
                        // id="listGroupAccordionInSafhe"
                        style={[{
                            // marginTop: "5px",
                            // paddingTop: "5px",
                            direction: "rtl",
                            position: "relative",
                            display: "flex",
                            width: "100%",
                        }
                            , sabadItemsAndTotalInf
                        ]}
                    >
                        <View
                            // id="sabadHeaderAndItemsCont"
                            // className="sabadHeaderAndItems"
                            style={[{
                                // flex: "1 1 auto",
                                flexGrow: 1,
                                flexShrink: 1,
                                flexBasis: 'auto',
                                // borderWidth: 1,
                                // borderColor: "#a9a9a9",
                                // borderStyle: 'solid',
                                // borderRadius: 10,    ////zare_nk_050315_commented
                                // padding: 7,  //zare_nk_041209_commented
                                paddingTop: 7,  //zare_nk_041209_added
                                // backgroundColor: "#f6f6f6",    ////zare_nk_050315_commented
                                // boxShadow: "#5e5e5e 0px 0px 3px 0px",   ////zare_nk_050315_commented
                            }, sabadItemsCont]}
                        >
                            <View
                                // className="sabadHeader"
                                // id="sabadSafheHeader-FORTITR"
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    // marginBottom: 10,  ////zare_nk_050316_commented
                                    marginRight: 5,  ////zare_nk_050316_added                                   
                                }}
                            >
                                <View
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: 'flex-start',
                                        // fontSize: 14,
                                        // color: "#322E2E", 
                                    }}
                                >
                                    {/* <Text
                                        id="adToSabadWidthBarCodeScan"
                                    > */}
                                    <TouchableOpacity
                                        // className="BarCodeScan btn btn-danger"
                                        style={{
                                            borderRadius: 10,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            flexDirection: 'row',
                                            padding: 7,
                                            backgroundColor: '#ff3151'
                                        }}
                                        onPress={() => { return forOpenCodeScanner(); }}  //zare_nk_041205_forUpdateName
                                        activeOpacity={0.1}
                                    >
                                        <Text style={{ fontSize: 14, color: "white", fontFamily: "IRANSansWeb(FaNum)_Medium" }}> اضافه به سبد</Text>
                                    </TouchableOpacity>
                                    {/* </Text> */}
                                </View>
                            </View>

                            <View
                                // className="usersSabad"
                                style={{
                                    // padding: "0px 5px",
                                    paddingVertical: 0,
                                    paddingHorizontal: 5,
                                    flexDirection: "column",
                                }}
                            >
                                <Text>{" "}</Text>
                            </View>

                            <View
                                // className="addressKharejInSabadCont"
                                style={{
                                    display: "none", flexDirection: "row",
                                    marginRight: 5,  ////zare_nk_050316_added
                                }}
                            >
                                <Text style={{ color: "red" }}
                                // className="addressKharejInSabad"
                                >
                                    شما خارج از محدوده ارسال هستید
                                </Text>
                            </View>

                            <View
                                // className="StoresTitleCont"
                                // id="sabadSafheHeader"
                                style={{
                                    display: 'flex',
                                    flexDirection: "column",
                                    marginRight: 5,  ////zare_nk_050316_added
                                }}
                            >
                                <View style={{
                                    display: "flex",
                                    flexDirection: "row",
                                }}>
                                    <View
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            // marginLeft: 10,  ////zare_nk_050316_commented
                                        }}
                                    >
                                        <View
                                            // className="rounded-pilll"
                                            style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                // padding: 10,  ////zare_nk_050316_commented
                                                marginLeft: 10,  ////zare_nk_050316_added 
                                            }}
                                        >
                                            {/* <img
                                        style={{ width: "64px", borderRadius: "12px" }}
                                        src="https://img.tochikala.com/Logo/photo14359415832-Copy.jpg"
                                        alt="هایپر‌کرفو"
                                    /> */}
                                            <Image
                                                source={{ uri: "https://img.tochikala.com/Logo/photo14359415832-Copy.jpg" }}
                                                style={{ width: 64, height: 64, borderRadius: 12 }}
                                            />
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            // display: "flex",
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
                                                // display: "flex",
                                                flexDirection: "row",
                                            }}
                                        >
                                            <Text
                                                numberOfLines={1}
                                                ellipsizeMode="tail"
                                                //  className="nameShobe titleStyle"
                                                style={{ fontFamily: "IRANSansWeb(FaNum)_Bold", }}
                                            >هاپر کرفو</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View
                                // id="sabadItemsContInSafhe"
                                // className="sabadItemsCont hisGrandFather"
                                style={{
                                    flexDirection: "column",
                                    paddingVertical: 0,
                                    paddingHorizontal: 5,
                                }}
                            >
                                {!bisatr && (
                                    <>
                                        {sabadRows?.map((item, index) => {
                                            return (
                                                <SabadSatrComponent
                                                    key={index || item.IdKala}
                                                    SabadRow={item}
                                                    handlerForAddClick={handlerForAddClick}
                                                    handlerForRemClick={handlerForRemClick}
                                                    openprodDetModal={openprodDetModal}
                                                    navigation={navigation}  //zare_nk_041127_added
                                                />
                                            );
                                        })}
                                    </>
                                )}
                            </View>
                        </View>

                        <View
                            // className="FtCollapsi"
                            // id="footerInSabadSafhe"
                            style={{
                                // flex: "0 1 30%",
                                flexGrow: 0,
                                flexShrink: 0,
                                flexBasis: 'auto',
                                flexDirection: "column",
                                // borderWidth: 1,
                                // borderColor: "#a9a9a9",
                                // borderStyle: 'solid',
                                // borderRadius: 10,    ////zare_nk_050315_commented
                                // backgroundColor: "#f6f6f6",    ////zare_nk_050315_commented
                                // boxShadow: "#5e5e5e 0px 0px 3px 0px",    ////zare_nk_050315_commented
                            }}
                        >
                            <View
                                // className="footerInSabadContent"
                                // id="footerInSabadSafheContent"
                                style={{
                                    padding: 10,
                                    flexDirection: "column",
                                    borderRadius: 10,
                                }}
                            >
                                <View
                                    // className="footerInSabadContent"
                                    // id="footerInSabadSafheContent"
                                    style={{
                                        padding: 10,
                                        flexDirection: "column",
                                        borderRadius: 10,
                                    }}
                                >
                                    <View
                                        // className="footerCalc"
                                        style={{
                                            // display: "flex",
                                            flexDirection: "column",
                                            paddingBottom: 10,
                                        }}
                                    >
                                        <View
                                            // className="harSefareshCalcCont"
                                            style={{
                                                // display: "flex",   ////zare_nk_050326_commented
                                                display: "none",   ////zare_nk_050326_added
                                                flexDirection: "row",
                                                justifyContent: "space-between",
                                                marginBottom: 5,
                                                // fontSize: 14, 
                                            }}
                                        >
                                            <Text
                                                // id="jamKolSpan"
                                                style={{
                                                    fontSize: 12, color: "#878b92", fontFamily: "IRANSansWeb(FaNum)_Medium",
                                                }}
                                            >جمع کل :</Text>
                                            {/* <Text>{" "}</Text> */}
                                            <View style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                // justifyContent: "space-between", 
                                            }}>
                                                <Text
                                                    // id="kolGheymatInSabad"  .75rem
                                                    style={{ fontSize: 12, color: '#313335', fontFamily: "IRANSansWeb(FaNum)_Medium", marginLeft: 3, }}
                                                >
                                                    {jamKol ? jamKol.toLocaleString() : jamKol}
                                                </Text>
                                                <Text style={{ fontSize: 12, fontFamily: "IRANSansWeb(FaNum)_Medium", color: '#6d6d6d', }}>
                                                    تومان
                                                </Text>
                                            </View>

                                        </View>

                                        <View
                                            // className="harSefareshCalcCont"
                                            style={{
                                                display: "none",
                                                flexDirection: "row",
                                                justifyContent: "space-between",
                                                marginBottom: 5,
                                                // fontSize: 14,
                                            }}
                                        >
                                            <Text style={{ fontSize: 14, fontFamily: "IRANSansWeb(FaNum)_Medium" }}>هزینه ارسال:</Text>
                                            <Text style={{ fontSize: 14, color: "#6a6a6a", fontFamily: "IRANSansWeb(FaNum)_Medium" }}
                                            // id="hazinePostInSabad"
                                            >۰</Text>
                                        </View>

                                        <View
                                            // className="harSefareshCalcCont"
                                            style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                justifyContent: "space-between",
                                                marginBottom: 5,
                                            }}
                                        >
                                            <Text
                                                // className="titleStyle"
                                                style={{ fontSize: 12, color: "#1a9f49", fontFamily: "IRANSansWeb(FaNum)_Medium" }}
                                            >سود شما از خرید : </Text>

                                            <View style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                // justifyContent: "space-between", 
                                            }}>
                                                <Text
                                                    //  className="valueStyle" id="soodKolInSabad"
                                                    style={{ fontSize: 12, color: "#313335", fontFamily: "IRANSansWeb(FaNum)_Medium", marginLeft: 3, }}
                                                >
                                                    {jamKolTakhfif ? jamKolTakhfif.toLocaleString() : 0}
                                                </Text>
                                                <Text style={{ fontSize: 12, fontFamily: "IRANSansWeb(FaNum)_Medium", color: '#6d6d6d', }}>
                                                    تومان
                                                </Text>

                                            </View>

                                        </View>

                                        <View
                                            // className="harSefareshCalcCont"
                                            style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                justifyContent: "space-between",
                                                marginBottom: 5,
                                            }}
                                        >
                                            <Text
                                                // className="titleStyle"
                                                style={{ fontSize: 12, color: "#878b92", fontFamily: "IRANSansWeb(FaNum)_Medium" }}
                                            >مبلغ قابل پرداخت :</Text>

                                            <View style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                // justifyContent: "space-between", 
                                            }}>
                                                <Text
                                                    // id="kolGheymatInSabad"  .75rem
                                                    style={{ fontSize: 12, color: '#313335', fontFamily: "IRANSansWeb(FaNum)_Medium", marginLeft: 3, }}
                                                >
                                                    {/* {jamKol ? jamKol.toLocaleString() : 0} */}
                                                    {jamKolNahaei ? jamKolNahaei.toLocaleString() : 0}
                                                </Text>
                                                <Text style={{ fontSize: 12, fontFamily: "IRANSansWeb(FaNum)_Medium", color: '#6d6d6d', }}>
                                                    تومان
                                                </Text>

                                            </View>

                                        </View>
                                    </View>

                                    <View style={{ paddingTop: 10 }}>

                                    </View>
                                </View>
                            </View>

                            <View
                                style={{ backgroundColor: 'red', display: 'none', }}
                            >
                                <Text>111111111111111111111111111111111111111111111111111111111111111111</Text>
                                <Text>22222222</Text>
                                <Text>33333333</Text>
                                <Text>44444444</Text>
                                <Text>55555555</Text>
                                <Text>666666666666</Text>
                                <Text>777777777777</Text>
                                <Text>88888888888</Text>
                                <Text>99999999</Text>
                                <Text>llllllll</Text>
                                <Text>22222222</Text>
                                <Text>33333333</Text>
                                <Text>44444444</Text>
                                <Text>55555555</Text>
                                <Text>666666666666</Text>
                                <Text>777777777777</Text>
                                <Text>88888888888</Text>
                                <Text>99999999</Text>
                            </View>

                        </View>
                    </View>
                </ScrollView>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    CodeScannermodalContainer: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: "auto",
        backgroundColor: "black",
    },

    ProdDetModalmodalContainer: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 'auto',
        backgroundColor: "white",
    },

    overlay: {
        ...StyleSheet.absoluteFill,  //zare_nk_040923(moadele css: position: absolute; top: 0; left: 0; right: 0; bottom: 0;)
        justifyContent: "center",
        alignItems: "center",
    },
    centerText: {
        textAlign: "center",
        marginTop: 50,
        fontSize: 18,
    },
    scanFrame: {
        width: 280,
        height: 280,

        borderWidth: 2,
        borderColor: "#00FF00",
        // borderColor: "#2ED573",

        borderStyle: "solid",
        backgroundColor: "transparent",
        // marginBottom: 20,
        borderRadius: 10,
    },
    scanLine: {
        position: "absolute",
        top: 0,
        left: 5,
        right: 5,
        height: 2,
        backgroundColor: "#00FF00",
        opacity: 0.8,
        borderRadius: 2,
    },
    text: {
        color: "white",
        fontSize: 18,
        marginBottom: 10,
        // backgroundColor: "rgba(0,0,0,0.6)", 
        // padding: 10,
        // borderRadius: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        width: "100%",
        borderRadius: 8,
        backgroundColor: 'white',
    },
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
    sabadItemsAndTotalInf_STH576: {
        flexDirection: 'column',
    },
    sabadItemsAndTotalInf_BTH576: {
        flexDirection: 'row',
    },
    sabadItemsAndTotalInf_BTH768: {
        flexDirection: 'row',
    },
    sabadItemsAndTotalInf_BTH992: {
        flexDirection: 'row',
    },

    sabadItemsCont_STH576: {
        marginBottom: 10,
    },
    sabadItemsCont_BTH576: {
        marginLeft: 10,
    },
    sabadItemsCont_BTH768: {
        marginLeft: 10,
    },
    sabadItemsCont_BTH992: {
        marginLeft: 10,
    },

    sabadSafhe_STH576: {
        paddingTop: 7,
        paddingBottom: 12,  //zare_nk_041203_nokteh(chon scroll mikoneh dar reactNative ta enteha nemireh scroll! va majboorim paddingBotom ra kami bishtar bedim)
        paddingHorizontal: 7,  //zare_nk_041209_tahlilshe
    },
    sabadSafhe_BTH576: {
        paddingTop: 10,
        paddingBottom: 15,
        paddingHorizontal: 10,
    },
    sabadSafhe_BTH768: {
        paddingTop: 10,
        paddingBottom: 15,
        paddingHorizontal: 10,
    },
    sabadSafhe_BTH992: {
        paddingTop: 15,
        paddingBottom: 20,
        paddingHorizontal: 15,
    },


    DetailsImgAndInfoCont_STH576: {
        flexDirection: 'column',
    },
    DetailsImgAndInfoCont_BTH576: {
        flexDirection: 'row-reverse',
    },

    CurrentImgCont_STH576: {
        width: '100%',
        marginBottom: 3,
    },
    CurrentImgCont_BTH576: {
        width: 150,
        marginLeft: 3,
    },

    DetailsInfoCont_STH576: {
        width: '100%',

    },
    DetailsInfoCont_BTH576: {
        flexBasis: 'auto',
        flexGrow: 1,
        flexShrink: 1,
    }
    /////////////////////////////////////////////zare_nk_041202_added_end(for responsives @media) 

});