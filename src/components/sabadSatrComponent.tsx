////zare_nk_050413_okk(1)
import { useState, useEffect, useRef, useMemo, memo } from "react";
import {
    View, Text, Image, TouchableOpacity, StyleSheet, ViewStyle, TextStyle, Alert,
    useWindowDimensions,
    StyleProp, Modal, Button, Animated, TextInput,
    Platform, ToastAndroid, LayoutChangeEvent, FlatList, ScrollView, Dimensions
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { NextJsApiUrl, NextJsApiAuthUrl } from "../constants/Urls";

import { RefObject } from "react";
import { MouseEvent } from "react";
import ReusableButton from "./ReusableButton";
import { SvgUri } from "react-native-svg";

import type { RootStackParamList } from "../types/navigation";

////zare_nk_050315_nokteh_st(rahe1 baraye taeine noe parametre navigation ke az file digari be componente jari pas dadeh shod)
// import { NativeStackScreenProps } from "@react-navigation/native-stack";
// type Props = NativeStackScreenProps<RootStackParamList, "shoppingbasket">;
////zare_nk_050315_nokteh_end(rahe1 baraye taeine noe parametre navigation ke az file digari be componente jari pas dadeh shod)
////zare_nk_050315_nokteh_st(rahe2 baraye taeine noe parametre navigation ke az file digari be componente jari pas dadeh shod)
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
type NavigationType = NativeStackNavigationProp<
    RootStackParamList,
    "shoppingbasket"
>;
////zare_nk_050315_nokteh_end(rahe2 baraye taeine noe parametre navigation ke az file digari be componente jari pas dadeh shod)

import AddRemBtnsAndCountPackege from './addRemBtnsAndCountPackege';

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
    JamForoosh: number;
    father: any;
    refForfather: RefObject<string | null>;
    fromShowDetails: boolean;
    idTag: string;
};

type SabadSatrProps = {
    SabadRow: SabadRowType
    handlerForAddClick: (
        addRemParam: addRemParamType,
    ) => void;
    handlerForRemClick: (
        addRemParam: addRemParamType,
    ) => void;
    openprodDetModal: (barcodeKala: string) => void;
    // navigation: Props["navigation"];  ////zare_nk_050315_nokteh(rahe1 baraye taeine noe parametre navigation ke az file digari be componente jari pas dadeh shod)
    navigation: NavigationType;   ////zare_nk_050315_nokteh(rahe2 baraye taeine noe parametre navigation ke az file digari be componente jari pas dadeh shod)
};

// export default function SabadSatrComponent({
//     SabadRow,
//     handlerForAddClick,
//     handlerForRemClick,
//     openprodDetModal,
//     navigation,
// }: SabadSatrProps) {
const SabadSatrComponent = ({
    SabadRow,
    handlerForAddClick,
    handlerForRemClick,
    openprodDetModal,
    navigation,
}: SabadSatrProps) => {
    const [productImageError, setproductImageError] = useState<boolean>(false); ////zare_nk_050316_added(baraye modirite load nashodane tasvire kala jahate jaigoziniye akse pishfarze tochi)
    const [isLoadedIroductImage, setIsLoadedIroductImage] = useState(false); ////zare_nk_050316_added(baraye modirite load nashodane tasvire kala jahate hazfe backgrounde khakestariye(range khakestariye ghbleloadi hast))
    var Tedad = SabadRow.tedadInSabadOrDet;
    var bishAzMaxTedadYaMojoodi = 0;
    if (SabadRow.MaxTedad != null) {
        if (SabadRow.MaxTedad <= Tedad) {
            bishAzMaxTedadYaMojoodi = 1;
        }
    } else {
        if (SabadRow.Mojoodi <= Tedad) {
            bishAzMaxTedadYaMojoodi = 1;
        }
    }

    // const ForCartContentsDesignTypeLet = useMemo(() => {
    const tedadInSabadOrDetToNumber = Number(SabadRow.tedadInSabadOrDet);
    const ZaribForooshToNumber = Number(SabadRow.ZaribForoosh);

    const ForCartContentsDesignTypeLet =
        tedadInSabadOrDetToNumber === 0 ? 0 :
            tedadInSabadOrDetToNumber > ZaribForooshToNumber ? 2 :
                tedadInSabadOrDetToNumber === ZaribForooshToNumber ? 1 :
                    0;
    // }, [SabadRow]);  

    return (
        <View
            // id={`flxpedar2-${SabadRow.IdKala}`}
            // className="flxpedar2_new"
            style={{
                display: "flex",
                flexDirection: "column",
                // paddingVertical: 5,  /////zare_nk_050315_commented
                // paddingVertical: 24,    /////zare_nk_050316_commented(dar okala hast va kheili ziadeh!)
                paddingVertical: 20,    /////zare_nk_050316_added
                paddingHorizontal: 0,

                // textAlign: "right",
                direction: "rtl",
                position: "relative",

                borderStyle: 'solid',
                borderBottomColor: '#e7e7e7',
                borderBottomWidth: 1,
            }}>
            <View
                // id={`ContInflxpedar2-${SabadRow.IdKala}`}
                // className="ContInflxpedar2"
                style={{
                    display: "flex",
                    flexDirection: "row",
                    // textAlign: "right",
                    direction: "rtl",
                    position: "relative",
                    //  borderStyle:'dashed',
                    //  borderColor:'red',
                    //  borderWidth:1,
                }}
            >
                <View
                    // id={`sath1ImgCont2-${SabadRow.IdKala}`}
                    // className="sath1ImgCont2_new"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        position: "relative",
                        marginLeft: 5,  ////zare_nk_041209_tahlilshe(sotoonre aks va chapesh)
                        // borderStyle: 'dashed',
                        // borderColor: 'black',
                        // borderWidth: 1,
                        justifyContent: 'center',  ////zare_nk_050316_added
                    }}
                >
                    <TouchableOpacity
                        onPress={(event) => openprodDetModal(SabadRow.BarcodeKala)}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            // flex: "0 0 auto",
                            flexGrow: 0,
                            flexShrink: 0,
                            flexBasis: 'auto',
                            padding: 0,
                            ////zare_nk_041203_added_st
                            borderRadius: 10,
                            overflow: 'hidden',
                            // boxShadow: "#5e5e5e 0px 0px 3px 0px",  ////zare_nk_050316_commented
                            ////zare_nk_041203_added_end  
                            // borderStyle: 'dashed',
                            // borderColor: 'red',
                            // borderWidth: 1,
                        }}
                    // className="GotToDet"
                    >
                        <View
                            // className="imgcont"
                            // id={`imgcontainerInSabadKesho-${SabadRow.IdKala}`}
                            style={{
                                width: 92,
                                // display: "flex",
                                flexDirection: "column",
                                // height: "min-content",  

                                // borderStyle: 'dashed',
                                // borderColor: 'blue',
                                // borderWidth: 1,
                            }}
                        >
                            {/* <img
                                loading="lazy"
                                src={`https://img.tochikala.com/Product/${SabadRow.IdKala}.webp`}
                                className="sath1Img2_new"
                                alt={SabadRow.NameKala ? SabadRow.NameKala : ''}
                                style={{ backgroundColor: "#EFEFEF", width: "100%" }}
                            /> */}
                            {/* <Image
                                source={{ uri: `https://img.tochikala.com/Product/${SabadRow.IdKala}.webp` }}
                                style={{ backgroundColor: "#efefef", width: "100%", height: 92, }}
                            ////zare_nk_050130_nokteh(resizeMode:'contain' test beshe bejaye height dadan)
                            /> */}
                            <Image
                                onError={() => {
                                    setproductImageError(true);
                                }}
                                onLoad={() => { setIsLoadedIroductImage(true); }}
                                source={{ uri: !productImageError ? `https://img.tochikala.com/Product/${SabadRow.IdKala}.webp` : 'https://img.tochikala.com/Logo/tochi.png' }}
                                style={{
                                    backgroundColor: isLoadedIroductImage ? "#ffffff" : "#efefef",
                                    width: "100%", height: 92,
                                }}
                            />


                            {/* <Image
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
                                onLoad={() => console.log('Image loaded')}
                                // source={{ uri: `https://img.tochikala.com/Product/${SabadRow.IdKala}.webp` }}  //zare_nk_041207_commented
                                source={{ uri: imgUriForDet }}   //zare_nk_041207_added
                                style={{
                                    backgroundColor: "#EFEFEF", width: "100%",   //zare_nk_041211_alan
                                    ...(productHeightForDet === 0
                                        ? { aspectRatio: 1 }
                                        : { height: productHeightForDet }),
                                }}
                            /> */}


                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        // data-id={j}
                        // id={`updateTedad-${SabadRow.IdKala}`}
                        // className="updateTedad btn btn-danger"
                        style={{
                            display: "none",
                            borderRadius: 10,
                            // fontSize: 12,
                            // marginTop: 10,  ////zare_nk_050316_commented
                            paddingLeft: 8,
                            paddingRight: 8,
                            // borderStyle: 'dashed',
                            // borderColor: 'black',
                            // borderWidth: 1,
                        }}
                    >
                        <Text>بروزرسانی تعداد</Text>
                    </TouchableOpacity>
                </View>

                <View
                    // id={`dflx22_new-${SabadRow.IdKala}`}
                    style={{
                        // flex: "1 1 auto",
                        flexGrow: 1,
                        flexShrink: 1,
                        flexBasis: 'auto',
                        display: "flex",
                        flexDirection: "column",
                        // justifyContent: "center",  //zare_nk_041202_comemnted
                        justifyContent: 'space-around',  //zare_nk_041202_added
                        overflow: "hidden",
                        borderRadius: 5,
                        // padding: 5, //zare_nk_041209_comemnted
                        // borderWidth: 1,
                        // borderColor: 'yellow',
                        // borderStyle: 'dashed',
                    }}
                >
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: 'center',  ////zare_nk_050316_added
                            // borderWidth: 1,
                            // borderColor: 'black',
                            // borderStyle: 'dashed',
                        }}
                    >
                        <View
                            // className="titleInsabad text-truncate"
                            style={{
                                // display: "inline-block", 
                                // whiteSpace: "nowrap",
                                overflow: "hidden",
                                marginLeft: 10,
                                ////zare_nk_050316_added_st
                                display: 'flex',
                                flexDirection: "row",
                                alignItems: 'center',
                                flexGrow: 0,
                                flexShrink: 1,
                                flexBasis: 'auto',
                                ////zare_nk_050316_added_end
                                // borderStyle: 'dashed', borderWidth: 2, borderColor: 'yellow',
                            }}
                        >
                            <Text
                                ////zare_nk_041203_added_st
                                numberOfLines={2}
                                ellipsizeMode="tail"
                                ////zare_nk_041203_added_end
                                style={{ fontFamily: "IRANSansWeb(FaNum)_Medium", fontSize: 13, color: '#4f4f4f', }}>{SabadRow.NameKala}</Text>
                        </View>

                        <View
                            // id={`darsadTakhfifInsabad-${SabadRow.IdKala}`}
                            // className="darsadTakhfifInsabad rounded-pill"
                            style={{
                                backgroundColor: "#ff3151",
                                width: 39,
                                height: 20,
                                // flex: "0 0 auto",
                                display: 'flex',
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: 'center',
                                flexGrow: 0,
                                flexShrink: 0,
                                flexBasis: 'auto',
                                marginLeft: 5,
                                borderRadius: 100,
                                // borderStyle: 'dashed', borderWidth: 2, borderColor: 'yellow',
                            }}
                        >
                            <Text
                                // id={`forDiscount-${SabadRow.IdKala}`} 
                                // className="forDiscount"
                                numberOfLines={1}
                                style={{
                                    fontSize: 12,
                                    color: "white",
                                    opacity: 1,
                                    fontFamily: "IRANSansWeb(FaNum)_Medium",
                                    // borderRadius: 8,
                                }}
                            >
                                {`${SabadRow.DarsadTakhfif}%`}
                            </Text>
                        </View>
                    </View>

                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            // borderWidth: 1,
                            // borderColor: 'red',
                            // borderStyle: 'dashed',
                        }}
                    >
                        <View
                            // id={`ForCartContInProdDet-${SabadRow.IdKala}`}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",

                                // borderWidth: 1,
                                // borderColor: 'green',
                                // borderStyle: 'dashed',
                            }}
                        >
                            {/* <MiddleCountTedadSefr */}
                            <AddRemBtnsAndCountPackege
                                refForfather={SabadRow.refForfather}
                                fromShowDetails={SabadRow.fromShowDetails}
                                IdKala={SabadRow.IdKala}
                                idTag={SabadRow.idTag}
                                tedadInSabadOrDet={SabadRow.tedadInSabadOrDet}
                                // handlerForAddClick={(e) => {  //zare_nk_041127_commented
                                handlerForAddClick={() => {  //zare_nk_041127_added
                                    return handlerForAddClick(
                                        {
                                            tedadInSabadOrDet: SabadRow.tedadInSabadOrDet,
                                            ZaribForoosh: SabadRow.ZaribForoosh,
                                            IdKala: SabadRow.IdKala,
                                            NameKala: SabadRow.NameKala,
                                            DarsadTakhfif: SabadRow.DarsadTakhfif,
                                            NameBerand: SabadRow.NameBerand,  //zare_nk_041118_nokteh(dar api selectKalaShobeh NameBerand dar pasokh hast pas ma meghdaresh ro dadim)
                                            FeeForoosh: SabadRow.FeeForoosh,
                                            FeeMasraf: SabadRow.FeeMasraf,
                                            BarcodeKala: SabadRow.BarcodeKala,
                                            Mojoodi: SabadRow.Mojoodi,
                                            MaxTedad: SabadRow.MaxTedad,
                                            father: SabadRow.father,
                                            bishAzMaxTedadYaMojoodi: bishAzMaxTedadYaMojoodi,
                                            fromShowDetails: false,
                                            // event: e,  //zare_nk_041127_commented
                                            event: null,  //zare_nk_041127_added
                                        }
                                    );
                                }}
                                // handlerForRemClick={(e) => {  //zare_nk_041127_commented
                                handlerForRemClick={() => {  //zare_nk_041127_added
                                    return handlerForRemClick(
                                        {
                                            tedadInSabadOrDet: SabadRow.tedadInSabadOrDet,
                                            ZaribForoosh: SabadRow.ZaribForoosh,
                                            IdKala: SabadRow.IdKala,
                                            NameKala: SabadRow.NameKala,
                                            DarsadTakhfif: SabadRow.DarsadTakhfif,
                                            NameBerand: SabadRow.NameBerand,  //zare_nk_041118_nokteh(dar api selectKalaShobeh NameBerand dar pasokh hast pas ma meghdaresh ro dadim)
                                            FeeForoosh: SabadRow.FeeForoosh,
                                            FeeMasraf: SabadRow.FeeMasraf,
                                            BarcodeKala: SabadRow.BarcodeKala,
                                            Mojoodi: SabadRow.Mojoodi,
                                            MaxTedad: SabadRow.MaxTedad,
                                            father: SabadRow.father,
                                            bishAzMaxTedadYaMojoodi: bishAzMaxTedadYaMojoodi,
                                            fromShowDetails: false,
                                            // event: e,  //zare_nk_041127_commented
                                            event: null,  //zare_nk_041127_added
                                        }
                                    );
                                }}
                                ForCartContentsDesignType={ForCartContentsDesignTypeLet}
                                bishAzMaxTedadYaMojoodi={bishAzMaxTedadYaMojoodi}
                                navigation={navigation}  //zare_nk_041128_added
                            />
                        </View>

                        <View
                            style={{
                                display: "flex",
                                flexGrow: 1,
                                flexShrink: 0,
                                flexBasis: 'auto',
                                flexDirection: "column",
                                // paddingTop: 5,  ////zare_nk_050316_commented
                                paddingRight: 10,  ////zare_nk_050316_added
                                // borderWidth: 1,
                                // borderStyle: 'dashed',
                                // borderColor: 'black',
                            }}
                        >
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    // marginBottom: 10,  ////zare_nk_050316_commented
                                    justifyContent: 'space-between',
                                    // borderWidth: 1,
                                    // borderStyle: 'dashed',
                                    // borderColor: 'red',
                                }}
                            >
                                <View
                                    // className="titleInsabad"
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        // marginLeft: 10,
                                        // borderWidth: 1,
                                        // borderStyle: 'dashed',
                                        // borderColor: 'blue',
                                    }}
                                >
                                    <Text style={{ color: "#6d6d6d", fontFamily: "IRANSansWeb(FaNum)_Medium", fontSize: 12, }}>قیمت ما</Text>
                                </View>
                                <View
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: 'flex-end',
                                        // borderWidth: 1,
                                        // borderStyle: 'dashed',
                                        // borderColor: 'black',
                                    }}>
                                    <View
                                        // className="gheimatForooshInsabad titleStyle"
                                        style={{
                                            // display: "flex",
                                            flexDirection: "row",
                                            marginLeft: 2,
                                            // borderWidth:2,
                                            // borderStyle:'solid',
                                            // borderColor:'yellow',
                                        }}
                                    >
                                        <Text style={{ color: "#3d3d3d", fontFamily: "IRANSansWeb(FaNum)_Medium", fontSize: 13, }}>  {SabadRow.FeeForoosh != null ? SabadRow.FeeForoosh.toLocaleString() : 0}</Text>
                                    </View>

                                    <View
                                        // className="rialInsabad valueStyle"
                                        style={{
                                            display: "flex", flexDirection: "row",
                                            // borderWidth:2,
                                            // borderStyle:'solid',
                                            // borderColor:'brown',
                                        }}
                                    >
                                        <Text style={{
                                            color: "#6d6d6d", fontFamily: "IRANSansWeb(FaNum)_Medium", fontSize: 12,
                                            // borderWidth:2,
                                            // borderStyle:'solid',
                                            // borderColor:'red',
                                        }}>ریال</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={{
                                display: "flex", flexDirection: "row",
                                justifyContent: 'space-between',
                                // borderWidth: 1,
                                // borderStyle: 'dashed',
                                // borderColor: 'red',
                            }}>
                                <View
                                    // className="titleInsabad"
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        // marginLeft: 10,
                                    }}
                                >
                                    <Text
                                        numberOfLines={1}
                                        ellipsizeMode="tail"
                                        style={{ color: "#6d6d6d", fontFamily: "IRANSansWeb(FaNum)_Medium", fontSize: 12, }}>مجموع سطر</Text>
                                </View>
                                <View
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: 'flex-end',
                                        // borderWidth:3,
                                        // borderStyle:'dashed',
                                        // borderColor:'black',
                                    }}>
                                    <View
                                        // id={`majmooGheimatForooshSatrInsabad-${SabadRow.IdKala}`}
                                        // className="majmooGheimatForooshSatrInsabad titleStyle"
                                        style={{
                                            // display: "flex",
                                            flexDirection: "row",
                                            marginLeft: 2,
                                            // borderWidth:2,
                                            // borderStyle:'solid',
                                            // borderColor:'yellow',
                                        }}
                                    >
                                        <Text style={{ color: "#3d3d3d", fontFamily: "IRANSansWeb(FaNum)_Medium", fontSize: 13, }}>{SabadRow.JamForoosh ? SabadRow.JamForoosh.toLocaleString() : 0}</Text>
                                    </View>
                                    <View // className="rialInsabad valueStyle"
                                        style={{ display: "flex", flexDirection: "row" }} >
                                        <Text style={{
                                            color: "#6d6d6d", fontFamily: "IRANSansWeb(FaNum)_Medium", fontSize: 12,
                                            // borderWidth:2,
                                            // borderStyle:'solid',
                                            // borderColor:'blue',
                                        }}>
                                            ریال
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

            <View
                style={{
                    display: "none",
                    flexDirection: "row",
                    paddingBottom: 5,
                }}
            >
                <Text style={{ marginRight: 10, fontSize: 12, color: "red" }}>
                    قیمت این کالا تغییر کرده است
                </Text>
            </View>
        </View>
    );
}

export default memo(SabadSatrComponent);