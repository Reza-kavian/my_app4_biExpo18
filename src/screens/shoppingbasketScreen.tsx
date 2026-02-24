// shoppingbasketScreen.tsx  //zare_nk_041127_okk
// "use client";  //zare_nk_041127_commented
// import { useRouter } from "next/navigation";  //zare_nk_041127_commented
import { useState, useEffect, useRef, useMemo } from "react";
import { //zare_nk_041127_added
    View, Text, Image, TouchableOpacity, StyleSheet, ViewStyle, TextStyle, Alert,
    useWindowDimensions,
    StyleProp, Modal, Button, Animated, TextInput,
    Platform, ToastAndroid  //zare_nk_041127_added
} from "react-native";

import { Camera, useCameraDevice, useCodeScanner, useCameraPermission } from "react-native-vision-camera";

import AsyncStorage from "@react-native-async-storage/async-storage";   //zare_nk041128_added
import { NextJsApiUrl, NextJsApiAuthUrl } from "../constants/Urls";   //zare_nk_041128_added

// let cachedBootstrap: typeof import("bootstrap") | null = null;  //zare_nk_041127_commented
// import "@/styles/shoppingbasketCss.css";  //zare_nk_041127_commented

import { RefObject } from "react";
import { MouseEvent } from "react";
import ReusableButton from "../components/ReusableButton";

import { SvgUri } from "react-native-svg";  //zare_nk_041202_added

import { ScrollView } from "react-native";  //zare_nk_041203_added

////zare_nk_041127_commented_st
// async function getBootstrap() {
//   if (!cachedBootstrap) {
//     cachedBootstrap = await import("bootstrap");
//   }
//   return cachedBootstrap;
// }
////zare_nk_041127_commented_end

////zare_nk_041127_added_st

const showNoStock = () => {
    if (Platform.OS === "android") {
        ToastAndroid.show("موجودی کافی نیست", ToastAndroid.SHORT);
    } else {
        // Alert.alert("خطا", "موجودی کافی نیست");
    }
};
////zare_nk_041127_added_end

type MiddleCountTedadSefrType = {
    refForfather: RefObject<string | null>;
    fromShowDetails: boolean;
    IdKala: number;
    idTag: string;
    tedadInSabadOrDet: number;

    //   handlerForAddClick: (e?: MouseEvent<HTMLAnchorElement>) => void;  //zare_nk_041127_commented(chon behtare dar mobile vabastegi be event hazf gardad,barakse web)
    handlerForAddClick: () => void;  //zare_nk_041127_addeded(chon behtare dar mobile vabastegi be event hazf gardad,barakse web)
    //   handlerForRemClick: (e?: MouseEvent<HTMLAnchorElement>) => void;  //zare_nk_041127_commented(chon behtare dar mobile vabastegi be event hazf gardad,barakse web)
    handlerForRemClick: () => void;  //zare_nk_041127_addeded(chon behtare dar mobile vabastegi be event hazf gardad,barakse web)
    ForCartContentsDesignType: number;
    bishAzMaxTedadYaMojoodi: number | null;
    navigation: Props["navigation"];  //zare_nk_041127_added
};

function MiddleCountTedadSefr({
    refForfather,
    fromShowDetails,
    IdKala,
    idTag,
    tedadInSabadOrDet,
    handlerForAddClick,
    handlerForRemClick,
    ForCartContentsDesignType,
    bishAzMaxTedadYaMojoodi,
    navigation,  //zare_nk_041127_added
}: MiddleCountTedadSefrType) {
    // Alert.alert("tedadInSabadOrDet: " + tedadInSabadOrDet);
    console.log('ShallowRoutingExample called-MiddleCountTedadSefr-ForCartContentsDesignType: ' + ForCartContentsDesignType);
    useEffect(() => {
        ////zare_nk_041120_commented_st
        // console.log('2-041119-SabadRow: ' + JSON.stringify(SabadRow));
        // console.log('2-041119-ForCartContentsDesignType: ' + ForCartContentsDesignType);
        // console.log('2-041119-bishAzMaxTedadYaMojoodi: ' + bishAzMaxTedadYaMojoodi);
        ////zare_nk_041120_commented_end
    });

    useEffect(() => {
        ////zare_nk_041127_commented_st
        // refForfather.current = fromShowDetails
        //     ? "#DetailsInfoCont"
        //     : "#sabadItemsContInSafhe"; 

        // if (ForCartContentsDesignType == 0) {
        //     if (IdKala) {
        //         const ForCartWidth = document.querySelector(
        //             refForfather.current +
        //             " #ForCart-" +
        //             IdKala +
        //             " .input-group"
        //         );
        //         if (ForCartWidth instanceof HTMLElement) {
        //             ForCartWidth.style.width = "35px";
        //         }
        //     }
        // } else if (ForCartContentsDesignType == 1) {
        //     if (IdKala) {
        //         const ForCartWidth = document.querySelector(
        //             refForfather.current +
        //             " #ForCart-" +
        //             IdKala +
        //             " .input-group"
        //         );
        //         if (ForCartWidth instanceof HTMLElement) {
        //             ForCartWidth.style.width = "auto";
        //         }
        //     }
        // } else if (ForCartContentsDesignType == 2) {
        //     if (IdKala) {
        //         const ForCartWidth = document.querySelector(
        //             refForfather.current +
        //             " #ForCart-" +
        //             IdKala +
        //             " .input-group"
        //         );
        //         if (ForCartWidth instanceof HTMLElement) {
        //             ForCartWidth.style.width = "auto";
        //         }
        //     }
        // }
        ////zare_nk_041127_commented_end
    });

    if (ForCartContentsDesignType == 0) {
        return (
            <View
                // className={`text-center align-items-center justify-content-center ForCart ${idTag}`}
                // id={`${idTag}`}
                // style={{ width: "100%", display: "flex" }}
                style={{
                    width: "100%", display: "flex", alignItems: 'center', justifyContent: 'center',
                }}
            >
                <View
                    // className="input-group rounded-pill"
                    style={{
                        backgroundColor: "white",
                        height: 35,
                        display: "flex",
                        flexWrap: "nowrap",
                        justifyContent: "center",
                        alignItems: "center",
                        alignContent: "center",
                        // border: "1px solid red",
                        borderWidth: 1,
                        borderColor: "red",
                        borderStyle: 'solid',
                        overflow: "hidden",
                        width: 35,  //zare_nk_041127_added
                        // borderRadius: '50%',  //zare_nk_041127_added
                        direction: 'rtl',  //zare_nk_041127_added

                        flexDirection: 'row-reverse',  //zare_nk_041202_added
                        borderRadius: 17,  //zare_nk_041202_added
                    }}
                // dir="ltr" 
                >
                    <View
                        // className="addremmCont"
                        // id={`removeCont-${IdKala}`}
                        style={{
                            height: "100%",
                            // flex: "1 1 auto",
                            flexGrow: 1,
                            flexShrink: 1,
                            flexBasis: 'auto',
                            display: "none",
                        }}
                    >
                        <View
                            style={{
                                height: "100%",
                                // display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                alignContent: "center",
                                overflow: "hidden",
                            }}
                        >
                            {/* <a
                                data-baz="0"
                                style={{
                                    flex: "1 1 auto",
                                    height: "100%",
                                    padding: "0px 2px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    textDecoration: "none",
                                    borderRadius: "50%",
                                }}
                                className={`rem-${IdKala}`}
                                href="/login"
                            >
                                <button
                                    style={{
                                        height: "80%",
                                        backgroundColor: "white",
                                        border: "none",
                                        padding: "0",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                    className="plussMinus"
                                >
                                    <img
                                        src="https://img.tochikala.com/tochikala/remove-icon.svg"
                                        alt="حذف از سبد"
                                        className="d-inline-block"
                                        style={{ objectFit: "contain", width: "20px" }}
                                    />
                                </button>
                            </a> */}
                            <TouchableOpacity
                                data-baz="0"
                                style={[
                                    {
                                        flexGrow: 1,
                                        flexShrink: 1,
                                        flexBasis: 'auto',
                                        height: "100%",
                                        paddingVertical: 0,
                                        paddingHorizontal: 2,
                                        justifyContent: "center",
                                        alignItems: "center",

                                        // borderRadius: "50%", //zare_nk_041202_commented
                                        borderRadius: 17, //zare_nk_041202_added
                                        opacity: Number(bishAzMaxTedadYaMojoodi) === 1 ? 0.3 : 1, //zare_nk_041203_added 
                                    }
                                ]}
                                // onPress={() => { return navigation.replace('Login'); }}
                                onPress={() => { handlerForRemClick() }}
                                activeOpacity={0.1}
                            >
                                <Text
                                    style={{
                                        height: "80%",
                                        backgroundColor: "white",
                                        ////zare_nk_041202_commented_st
                                        // padding: 0,
                                        // alignItems: "center",
                                        // justifyContent: "center",
                                        ////zare_nk_041202_commented_end
                                    }}
                                // className="plussMinus"
                                >
                                    <Image
                                        source={{ uri: "https://img.tochikala.com/tochikala/remove-icon.svg" }}
                                        style={{ objectFit: "contain", width: 20, flexDirection: "row" }}
                                    />
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </View>

                    <View
                        // className={`middleCount-${IdKala}`}
                        style={{
                            height: "100%",
                            flexGrow: 1,
                            flexShrink: 1,
                            flexBasis: '45%',
                            flexDirection: "column",
                            ////zare_nk_041202_added_st
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            alignContent: "center",
                            overflow: "hidden",
                            ////zare_nk_041202_added_end
                        }}
                    >
                        <Text
                            style={{
                                height: "100%",
                                ////zare_nk_041202_commented_st
                                // display: "flex",
                                // justifyContent: "center",
                                // alignItems: "center",
                                // alignContent: "center",
                                // overflow: "hidden",
                                ////zare_nk_041202_commented_end
                            }}
                        >
                            {/* <a
                                data-baz="1"
                                style={{
                                    flex: "1 1 auto",
                                    height: "100",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    textDecoration: "none",
                                    borderRadius: "50%",
                                }}
                                className={`add-${IdKala}`}
                                href="/login"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handlerForAddClick(e);
                                }}
                            >
                                <button
                                    id={`inp-${IdKala}`}
                                    style={{
                                        color: "red",
                                        fontSize: "14px",
                                        height: "80%",
                                        backgroundColor: "white",
                                        border: "none",
                                        padding: "0",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                    className="plussMinus card-linkk text-dangerr fa fa-plus"
                                ></button>
                            </a> */}
                            <TouchableOpacity
                                data-baz="1"
                                style={[
                                    {
                                        //flex: "1 1 auto",
                                        flexGrow: 1,
                                        flexShrink: 1,
                                        flexBasis: 'auto',
                                        height: "100%",
                                        paddingVertical: 0,
                                        paddingHorizontal: 2,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        // borderRadius: "50%",  //zare_nk_041202_commented
                                        borderRadius: 17,  //zare_nk_041202_added
                                        opacity: Number(bishAzMaxTedadYaMojoodi) === 1 ? 0.3 : 1, //zare_nk_041203_added 
                                    }
                                ]}
                                onPress={() => { handlerForAddClick() }}
                                activeOpacity={0.1}
                            >
                                <Text
                                    style={{
                                        color: "red",
                                        fontSize: 14,
                                        height: "80%",
                                        backgroundColor: "white",
                                        ////zare_nk_041202_commented_st
                                        // padding: 0,
                                        // alignItems: "center",
                                        // justifyContent: "center",
                                        ////zare_nk_041202_commented_end
                                    }}
                                // className="plussMinus"
                                >
                                    {/* + */}
                                    <SvgUri
                                        uri="https://img.tochikala.com/tochikala/add-to-cart.svg"
                                        width={20}
                                        height={20}
                                    />
                                </Text>
                            </TouchableOpacity>

                        </Text>
                    </View>

                    <View
                        // className="addremmCont"
                        // id={`addCont-${IdKala}`}
                        style={{
                            height: "100%",
                            //  flex: "1 1 auto",
                            flexGrow: 1,
                            flexShrink: 1,
                            flexBasis: 'auto',
                            display: "none"
                        }}
                    >
                        <View
                            style={{
                                height: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                alignContent: "center",
                                overflow: "hidden",
                            }}
                        >
                            {/* <a
                                data-baz="0"
                                style={{
                                    flex: "1 1 auto",
                                    height: "100%",
                                    padding: "0px 2px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    textDecoration: "none",
                                    borderRadius: "50%",
                                }}
                                className={`add-${IdKala}`}
                                href="/login"
                            >
                                <button
                                    style={{
                                        height: "80%",
                                        backgroundColor: "white",
                                        border: "none",
                                        padding: "0",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                    className="plussMinus"
                                >
                                    <img
                                        src="https://img.tochikala.com/tochikala/add-to-cart.svg"
                                        alt="اضافه به سبد"
                                        className="d-inline-block"
                                        style={{ objectFit: "contain", width: "20px" }}
                                    />
                                </button>
                            </a> */}


                            <TouchableOpacity
                                data-baz="0"
                                style={[
                                    {
                                        flexGrow: 1,
                                        flexShrink: 1,
                                        flexBasis: 'auto',
                                        height: "100%",
                                        paddingVertical: 0,
                                        paddingHorizontal: 2,
                                        justifyContent: "center",
                                        alignItems: "center",

                                        // borderRadius: "50%",  //zare_nk_041202_commented
                                        borderRadius: 17,  //zare_nk_041202_added
                                    }
                                ]}
                                // onPress={() => { return navigation.replace('Login'); }}
                                onPress={() => { handlerForAddClick() }}
                                activeOpacity={0.1}
                            >

                                <Text
                                    style={{
                                        color: "red",
                                        fontSize: 14,
                                        // height: "80%",  //zare_nk_041202_commented
                                        backgroundColor: "white",
                                        ////zare_nk_041202_commented_st
                                        // padding: 0,
                                        // alignItems: "center",
                                        // justifyContent: "center",
                                        ////zare_nk_041202_commented_end
                                    }}
                                // className="plussMinus"
                                >
                                    {/* <Image
                                        source={{ uri: "https://img.tochikala.com/tochikala/add-to-cart.svg" }}
                                        style={{ objectFit: "contain", width: 20, flexDirection: "row" }}
                                    /> */}
                                    <SvgUri
                                        uri="https://img.tochikala.com/tochikala/add-to-cart.svg"
                                        width={20}
                                        height={20}
                                    />
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View >
        );
    } else if (ForCartContentsDesignType == 1) {
        return (
            <View
                // className={`text-center align-items-center justify-content-center ForCart ${idTag}`}
                // id={`${idTag}`}
                // style={{ width: "100%", display: "flex" }}
                style={{
                    width: "100%", display: "flex", alignItems: 'center', justifyContent: 'center',
                }}
            >
                <View
                    // className="input-group rounded-pill"
                    style={{
                        backgroundColor: "white",
                        height: 35,
                        display: "flex",
                        flexWrap: "nowrap",
                        justifyContent: "center",
                        alignItems: "center",
                        alignContent: "center",
                        // border: "1px solid red",
                        borderWidth: 1,
                        borderColor: "red",
                        borderStyle: 'solid',
                        overflow: "hidden",
                        width: "auto",  //zare_nk_041127_added
                        // borderRadius: '50%',  //zare_nk_041127_added
                        direction: 'rtl',  //zare_nk_041127_added
                        flexDirection: 'row-reverse',  //zare_nk_041202_added
                        borderRadius: 17,  //zare_nk_041202_added 
                    }}

                >
                    <View
                        // className="addremmCont"
                        // id={`removeCont-${IdKala}`}
                        style={{
                            height: "100%",
                            // flex: "1 1 auto",
                            flexGrow: 1,
                            flexShrink: 1,
                            flexBasis: 'auto',
                        }}
                    >
                        <View
                            style={{
                                height: "100%",
                                // display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                alignContent: "center",
                                overflow: "hidden",
                            }}
                        >
                            {/* <a
                                data-baz="1"
                                style={{
                                    flex: "1 1 auto",
                                    height: "100%",
                                    padding: "0px 2px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: "50%",
                                }}
                                className={`rem-${IdKala}`}
                                href="/login"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handlerForRemClick(e);
                                }}
                            >
                                <button
                                    style={{
                                        height: "80%",
                                        backgroundColor: "white",
                                        border: "none",
                                        padding: "0",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                    className="plussMinus"
                                >
                                    <img
                                        src="https://img.tochikala.com/tochikala/remove-icon.svg"
                                        alt="حذف از سبد"
                                        className="d-inline-block"
                                        style={{ objectFit: "contain", width: "20px" }}
                                    />
                                </button>
                            </a> */}


                            <TouchableOpacity
                                data-baz="1"
                                style={[
                                    {
                                        //flex: "1 1 auto",
                                        flexGrow: 1,
                                        flexShrink: 1,
                                        flexBasis: 'auto',
                                        height: "100%",
                                        //padding: "0px 2px", 
                                        paddingVertical: 0,
                                        paddingHorizontal: 2,
                                        justifyContent: "center",
                                        alignItems: "center",

                                        // borderRadius: "50%",
                                        borderRadius: 17,
                                    }
                                ]}
                                onPress={() => { handlerForRemClick(); }}   //be login befresteh dar adtoocart be jaye bazi ba e.preventdefault...
                                activeOpacity={0.1}
                            >
                                <Text
                                    style={{
                                        // height: "80%",  //zare_nk_041202_commented
                                        backgroundColor: "white",
                                        ////zare_nk_041202_commented_st
                                        // padding: 0,
                                        // alignItems: "center",
                                        // justifyContent: "center",
                                        ////zare_nk_041202_commented_end
                                    }}
                                // className="plussMinus"
                                >
                                    {/* <Image
                                        source={{ uri: "https://img.tochikala.com/tochikala/remove-icon.svg" }}
                                        style={{ objectFit: "contain", width: 20, flexDirection: "row" }}
                                    /> */}
                                    <SvgUri
                                        uri="https://img.tochikala.com/tochikala/remove-icon.svg"
                                        width={20}
                                        height={20}
                                    />
                                </Text>
                            </TouchableOpacity>


                        </View>
                    </View>

                    <View
                        // className={`middleCount-${IdKala}`}
                        style={{
                            height: "100%",
                            flexDirection: "row",
                            ////zare_nk_041202_added_st
                            width: 40,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: 'center',
                            alignContent: "center",
                            ////zare_nk_041202_added_end 
                        }}
                    >
                        <Text
                            // id={`inp-${IdKala}`}
                            // className="text-center titleStyle"
                            style={{
                                backgroundColor: "white",
                                ////zare_nk_041202_commented_st 
                                // flexGrow: 1,
                                // flexShrink: 0,
                                // flexBasis: '40%',
                                // width: 40, 
                                // display: "flex",
                                // justifyContent: "center",
                                // alignItems: "center",
                                // alignContent: "center",
                                ////zare_nk_041202_commented_end 
                                fontFamily: "IRANSansWeb(FaNum)_Medium",
                            }}
                        >
                            {tedadInSabadOrDet}
                        </Text>
                        <Text> </Text>
                    </View>

                    <View
                        // className="addremmCont"
                        // id={`addCont-${IdKala}`}
                        style={{
                            height: "100%",
                            //  flex: "1 1 auto" ,
                            flexGrow: 1,
                            flexShrink: 1,
                            flexBasis: 'auto',
                        }}
                    >
                        <View
                            style={{
                                height: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                alignContent: "center",
                                overflow: "hidden",
                            }}
                        >
                            {/* <a
                                data-baz="1"
                                style={{
                                    flex: "1 1 auto",
                                    height: "100%",
                                    padding: "0px 2px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: "50%",
                                }}
                                className={`add-${IdKala}`}
                                href="/login"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handlerForAddClick(e);
                                }}
                            >
                                <button
                                    title={Number(bishAzMaxTedadYaMojoodi) === 1 ? "موجودی کافی نیست" : ""}
                                    style={{
                                        height: "80%",
                                        backgroundColor: "white",
                                        border: "none",
                                        padding: "0",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        ...(Number(bishAzMaxTedadYaMojoodi) === 1 && { opacity: 0.3 }),
                                    }}
                                    className="plussMinus"
                                    disabled={Boolean(Number(bishAzMaxTedadYaMojoodi))}
                                >
                                    <img
                                        src="https://img.tochikala.com/tochikala/add-to-cart.svg"
                                        alt="اضافه به سبد"
                                        className="d-inline-block"
                                        style={{ objectFit: "contain", width: "20px" }}
                                    />
                                </button>
                            </a> */}

                            <TouchableOpacity
                                data-baz="1"
                                style={[
                                    {
                                        flexGrow: 1,
                                        flexShrink: 1,
                                        flexBasis: 'auto',
                                        height: "100%",
                                        paddingVertical: 0,
                                        paddingHorizontal: 2,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        // borderRadius: "50%",
                                        borderRadius: 17,
                                        opacity: Number(bishAzMaxTedadYaMojoodi) === 1 ? 0.3 : 1, //zare_nk_041203_added 
                                    }
                                ]}

                                activeOpacity={0.1}


                                disabled={Boolean(Number(bishAzMaxTedadYaMojoodi))}
                                // title={Number(bishAzMaxTedadYaMojoodi) === 1 ? "موجودی کافی نیست" : ""}   //zare_nk_041127_commented
                                //  onPress={() => { handlerForAddClick(); }}   //be /login befresteh dar adtoocart be jaye bazi ba e.preventdefault...     //zare_nk_041127_commented
                                onPress={() => {
                                    if (Boolean(Number(bishAzMaxTedadYaMojoodi))) {
                                        showNoStock();
                                    } else {
                                        handlerForAddClick();
                                    }
                                }}
                            >

                                <Text
                                    //  title={Number(bishAzMaxTedadYaMojoodi) === 1 ? "موجودی کافی نیست" : ""} 
                                    style={{
                                        // height: "80%",  //zare_nk_041202_commented
                                        backgroundColor: "white",
                                        ////zare_nk_041202_commented_st
                                        // padding: 0,
                                        // alignItems: "center",
                                        // justifyContent: "center",
                                        ////zare_nk_041202_commented_end
                                        ...(Number(bishAzMaxTedadYaMojoodi) === 1 && { opacity: 0.3 }),
                                    }}
                                // className="plussMinus"
                                // disabled={Boolean(Number(bishAzMaxTedadYaMojoodi))}
                                >
                                    {/* <Image
                                        source={{ uri: "https://img.tochikala.com/tochikala/add-to-cart.svg" }}
                                        style={{ objectFit: "contain", width: 20, flexDirection: "row" }}
                                    /> */}
                                    <SvgUri
                                        uri="https://img.tochikala.com/tochikala/add-to-cart.svg"
                                        width={20}
                                        height={20}
                                    />
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
        //////////////////////////view
    } else if (ForCartContentsDesignType == 2) {
        return (
            <View
                // className={`text-center align-items-center justify-content-center ForCart ${idTag}`}
                // id={`${idTag}`}
                // style={{ width: "100%", display: "flex" }}
                style={{ width: "100%", display: "flex", alignItems: 'center', justifyContent: 'center', }}
            >
                <View
                    // className="input-group rounded-pill"
                    style={{
                        backgroundColor: "white",
                        height: 35,
                        display: "flex",
                        flexWrap: "nowrap",
                        justifyContent: "center",
                        alignItems: "center",
                        alignContent: "center",
                        // border: "1px solid red",
                        borderWidth: 1,
                        borderColor: "red",
                        borderStyle: 'solid',
                        overflow: "hidden",
                        width: "auto",  //zare_nk_041127_added
                        // borderRadius: '50%',  //zare_nk_041127_added
                        direction: 'rtl',  //zare_nk_041127_added

                        flexDirection: 'row-reverse',  //zare_nk_041202_added
                        borderRadius: 17,  //zare_nk_041202_added
                    }}
                >
                    <View
                        // className="addremmCont"
                        // id={`removeCont-${IdKala}`}
                        style={{
                            height: "100%",
                            // flex: "1 1 auto",
                            flexGrow: 1,
                            flexShrink: 1,
                            flexBasis: 'auto',
                        }}
                    >
                        <View
                            style={{
                                height: "100%",
                                // display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                alignContent: "center",
                                overflow: "hidden",
                            }}
                        >
                            {/* <a
                                data-baz="1"
                                style={{
                                    flex: "1 1 auto",
                                    height: "100%",
                                    padding: "0px 2px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: "50%",
                                }}
                                className={`rem-${IdKala}`}
                                href="/login"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handlerForRemClick(e);
                                }}
                            >
                                <button
                                    style={{
                                        height: "80%",
                                        backgroundColor: "white",
                                        border: "none",
                                        padding: "0",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                    className="plussMinus"
                                >
                                    <img
                                        src="https://img.tochikala.com/tochikala/remove-from-cart.svg"
                                        alt="حذف از سبد"
                                        className="d-inline-block"
                                        style={{ objectFit: "contain", width: "20px" }}
                                    />
                                </button>
                            </a> */}
                            <TouchableOpacity
                                data-baz="1"
                                style={[
                                    {
                                        flexGrow: 1,
                                        flexShrink: 1,
                                        flexBasis: 'auto',
                                        height: "100%",
                                        paddingVertical: 0,
                                        paddingHorizontal: 2,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        // borderRadius: "50%",  //zare_nk_041202_comemnted
                                        borderRadius: 17,    //zare_nk_041202_added
                                    }
                                ]}

                                activeOpacity={0.1}

                                onPress={() => { handlerForRemClick(); }}   //be /login befresteh dar adtoocart be jaye bazi ba e.preventdefault...     //zare_nk_041127_commented                                
                            >

                                <Text
                                    //  title={Number(bishAzMaxTedadYaMojoodi) === 1 ? "موجودی کافی نیست" : ""} 
                                    style={{
                                        // height: "80%",  //zare_nk_041202_commented
                                        backgroundColor: "white",
                                        ////zare_nk_041202_commented_st
                                        // padding: 0,
                                        // alignItems: "center",
                                        // justifyContent: "center",
                                        ////zare_nk_041202_commented_end
                                    }}
                                // className="plussMinus" 
                                >
                                    {/* <Image
                                        source={{ uri: "https://img.tochikala.com/tochikala/remove-from-cart.svg" }}
                                        style={{ objectFit: "contain", width: 20, flexDirection: "row" }}
                                    /> */}


                                    <SvgUri
                                        uri="https://img.tochikala.com/tochikala/remove-from-cart.svg"
                                        width={20}
                                        height={20}
                                    />
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </View>

                    <View
                        // className={`middleCount-${IdKala}`}
                        style={{
                            height: "100%",
                            // display: "flex",
                            ////zare_nk_041202_added_st
                            flexDirection: "column",
                            width: 40,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: 'center',
                            alignContent: "center",
                            ////zare_nk_041202_added_end
                        }}
                    >
                        <Text
                            // id={`inp-${IdKala}`}
                            // className="text-center titleStyle"
                            style={{
                                backgroundColor: "white",
                                ////zare_nk_041202_commented_st
                                // flexGrow: 1,
                                // flexShrink: 0,
                                // flexBasis: '40%',
                                // width: 40,
                                // display: "flex",
                                // justifyContent: "center",
                                // alignItems: 'center',
                                // alignContent: "center",
                                ////zare_nk_041202_commented_end
                                fontFamily: "IRANSansWeb(FaNum)_Medium",
                            }}
                        >
                            {tedadInSabadOrDet}
                        </Text>
                        {/* <Text> </Text> */}
                    </View>

                    <View
                        // className="addremmCont"
                        // id={`addCont-${IdKala}`}
                        style={{
                            height: "100%",
                            //  flex: "1 1 auto" ,
                            flexGrow: 1,
                            flexShrink: 1,
                            flexBasis: 'auto',
                        }}
                    >
                        <View
                            style={{
                                height: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                alignContent: "center",
                                overflow: "hidden",
                            }}
                        >

                            {/* <a
                                data-baz="1"
                                style={{
                                    flex: "1 1 auto",
                                    height: "100%",
                                    padding: "0px 2px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: "50%",
                                }}
                                className={`add-${IdKala}`}
                                href="/login"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handlerForAddClick(e);
                                }}
                            >
                                <button
                                    title={Number(bishAzMaxTedadYaMojoodi) === 1 ? "موجودی کافی نیست" : ""}
                                    style={{
                                        height: "80%",
                                        backgroundColor: "white",
                                        border: "none",
                                        padding: "0",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        ...(Number(bishAzMaxTedadYaMojoodi) === 1 && { opacity: 0.3 }),
                                    }}
                                    className="plussMinus"
                                    disabled={Boolean(Number(bishAzMaxTedadYaMojoodi))}
                                >
                                    <img
                                        src="https://img.tochikala.com/tochikala/add-to-cart.svg"
                                        alt="اضافه به سبد"
                                        className="d-inline-block"
                                        style={{ objectFit: "contain", width: "20px" }}
                                    />
                                </button>
                            </a> */}

                            <TouchableOpacity
                                data-baz="1"
                                style={[
                                    {
                                        flexGrow: 1,
                                        flexShrink: 1,
                                        flexBasis: 'auto',
                                        height: "100%",
                                        paddingVertical: 0,
                                        paddingHorizontal: 2,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        // borderRadius: "50%",  //zare_nk_041202_commented
                                        borderRadius: 17,  //zare_nk_041202_added 
                                        opacity: Number(bishAzMaxTedadYaMojoodi) === 1 ? 0.3 : 1, //zare_nk_041203_added 
                                    }
                                ]}

                                activeOpacity={0.1}

                                disabled={Boolean(Number(bishAzMaxTedadYaMojoodi))}
                                // title={Number(bishAzMaxTedadYaMojoodi) === 1 ? "موجودی کافی نیست" : ""}   //zare_nk_041127_commented
                                //  onPress={() => { handlerForAddClick(); }}   //be /login befresteh dar adtoocart be jaye bazi ba e.preventdefault...     //zare_nk_041127_commented
                                onPress={() => {
                                    if (Boolean(Number(bishAzMaxTedadYaMojoodi))) {
                                        // Alert.alert('111');
                                        showNoStock();
                                    } else {
                                        // Alert.alert('222');
                                        handlerForAddClick();
                                    }
                                }}
                            >

                                <Text
                                    //  title={Number(bishAzMaxTedadYaMojoodi) === 1 ? "موجودی کافی نیست" : ""} 
                                    style={{
                                        // height: "80%",  //zare_nk_041202_commented
                                        backgroundColor: "white",
                                        ////zare_nk_041202_commented_st
                                        // padding: 0,
                                        // alignItems: "center",
                                        // justifyContent: "center",
                                        ////zare_nk_041202_commented_end
                                        ...(Number(bishAzMaxTedadYaMojoodi) === 1 && { opacity: 0.3 }),
                                    }}
                                // className="plussMinus"
                                // disabled={Boolean(Number(bishAzMaxTedadYaMojoodi))}
                                >
                                    {/* <Image
                                        source={{ uri: "https://img.tochikala.com/tochikala/add-to-cart.svg" }}
                                        style={{ objectFit: "contain", width: 20, flexDirection: "row" }}
                                    /> */}
                                    <SvgUri
                                        uri="https://img.tochikala.com/tochikala/add-to-cart.svg"
                                        width={20}
                                        height={20}
                                    />
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

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
};

type SabadTitrType = {
    IdSabadKharidTitr: number;
    SumFeeMasraf: number;
    soodAzKharid: number;
    MablaghNahaee: number;
    [key: string]: any;
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
    navigation: Props["navigation"];  //zare_nk_041127_added
};

function SabadSatrComponent({
    SabadRow,
    handlerForAddClick,
    handlerForRemClick,
    openprodDetModal,
    navigation, //zare_nk_041127_added
}: SabadSatrProps) {
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
                // padding: "5px 0px",
                paddingVertical: 5,
                paddingHorizontal: 0,
                // textAlign: "right",
                direction: "rtl",
                position: "relative",
            }}
        >
            <View
                // id={`ContInflxpedar2-${SabadRow.IdKala}`}
                // className="ContInflxpedar2"
                style={{
                    display: "flex",
                    flexDirection: "row",
                    // textAlign: "right",
                    direction: "rtl",
                    position: "relative",
                }}
            >
                <View
                    // id={`sath1ImgCont2-${SabadRow.IdKala}`}
                    // className="sath1ImgCont2_new"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        position: "relative",
                        marginLeft: 5,
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
                            // boxShadow: "#5e5e5e 0px 0px 3px 0px",
                            boxShadow: "#5e5e5e 0px 0px 3px 0px ",
                            ////zare_nk_041203_added_end
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
                            }}
                        >
                            {/* <img
                                loading="lazy"
                                src={`https://img.tochikala.com/Product/${SabadRow.IdKala}.webp`}
                                className="sath1Img2_new"
                                alt={SabadRow.NameKala ? SabadRow.NameKala : ''}
                                style={{ backgroundColor: "#EFEFEF", width: "100%" }}
                            /> */}
                            <Image
                                source={{ uri: `https://img.tochikala.com/Product/${SabadRow.IdKala}.webp` }}
                                style={{ backgroundColor: "#efefef", width: "100%", height: 92, }}
                            />
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
                            marginTop: 10,
                            paddingLeft: 8,
                            paddingRight: 8,
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
                        padding: 5,
                    }}
                >
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <View
                            // className="titleInsabad text-truncate"
                            style={{
                                // display: "inline-block",
                                flexDirection: "column",
                                // whiteSpace: "nowrap",
                                overflow: "hidden",
                                marginLeft: 10,
                            }}
                        >
                            <Text
                                ////zare_nk_041203_added_st
                                numberOfLines={2}
                                ellipsizeMode="tail"
                                ////zare_nk_041203_added_end
                                style={{ fontFamily: "IRANSansWeb(FaNum)_Medium", }}>{SabadRow.NameKala}</Text>
                        </View>

                        <View
                            // id={`darsadTakhfifInsabad-${SabadRow.IdKala}`}
                            // className="darsadTakhfifInsabad rounded-pill"
                            style={{
                                backgroundColor: "#dc3545",
                                width: 35,
                                height: 20,
                                // flex: "0 0 auto",
                                flexGrow: 0,
                                flexShrink: 0,
                                flexBasis: 'auto',
                                display: "none",
                                justifyContent: "center",
                                alignItems: "center",
                                marginLeft: 5,
                            }}
                        >
                            <Text
                                // id={`forDiscount-${SabadRow.IdKala}`} 
                                // className="forDiscount"
                                style={{
                                    fontSize: 12,
                                    color: "white",
                                    opacity: 1,
                                    borderRadius: 8,
                                }}
                            >
                                {SabadRow.DarsadTakhfif}٪
                            </Text>
                        </View>
                    </View>

                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <View
                            // id={`ForCartContInProdDet-${SabadRow.IdKala}`}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                            }}
                        >
                            <MiddleCountTedadSefr
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
                                flexDirection: "column",
                                paddingTop: 5,
                            }}
                        >
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    marginBottom: 10,
                                    justifyContent: 'flex-end',
                                }}
                            >
                                <View
                                    // className="titleInsabad"
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        marginLeft: 10,
                                    }}
                                >
                                    <Text style={{ color: "#444343", fontFamily: "IRANSansWeb(FaNum)_Medium" }}>قیمت کرفو</Text>
                                </View>
                                <View
                                    // className="gheimatForooshInsabad titleStyle"
                                    style={{
                                        // display: "flex",
                                        flexDirection: "row",
                                        marginLeft: 5,
                                    }}
                                >
                                    <Text style={{ color: "#444343", fontFamily: "IRANSansWeb(FaNum)_Medium" }}>  {SabadRow.FeeForoosh != null ? SabadRow.FeeForoosh.toLocaleString() : 0}</Text>
                                </View>
                                <View
                                    // className="rialInsabad valueStyle"
                                    style={{ display: "flex", flexDirection: "row" }}
                                >
                                    <Text style={{ color: "#444343", fontFamily: "IRANSansWeb(FaNum)_Medium" }}>ریال</Text>
                                </View>
                            </View>

                            <View style={{ display: "flex", flexDirection: "row" }}>
                                <View
                                    // className="titleInsabad"
                                    style={{
                                        // display: "flex",
                                        flexDirection: "row",
                                        marginLeft: 10,
                                    }}
                                >
                                    <Text style={{ color: "#444343", fontFamily: "IRANSansWeb(FaNum)_Medium" }}>مجموع سطر</Text>
                                </View>
                                <View
                                    // id={`majmooGheimatForooshSatrInsabad-${SabadRow.IdKala}`}
                                    // className="majmooGheimatForooshSatrInsabad titleStyle"
                                    style={{
                                        // display: "flex",
                                        flexDirection: "row",
                                        marginLeft: 5,
                                    }}
                                >
                                    <Text style={{ color: "#444343", fontFamily: "IRANSansWeb(FaNum)_Medium" }}>{SabadRow.MasrafSatr ? SabadRow.MasrafSatr.toLocaleString() : 0}</Text>
                                </View>
                                <View
                                    // className="rialInsabad valueStyle"
                                    style={{ display: "flex", flexDirection: "row" }}
                                >
                                    <Text style={{ color: "#444343", fontFamily: "IRANSansWeb(FaNum)_Medium" }}> ریال</Text>
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
type Props = NativeStackScreenProps<RootStackParamList, "shoppingbasket">;

export default function ShallowRoutingExample({
    navigation,
    route,
}:  // back,  //zare_nk_040530(ekhtiariye va chon azash estefadeh nakardim commentent kardim)
    // route, //zare_nk_040530(ekhtiariye va chon azash estefadeh nakardim commentent kardim)
    // options, //zare_nk_040530(ekhtiariye va chon azash estefadeh nakardim commentent kardim)
    Props) {
    ////zare_nk_041127_added_end
    console.log('ShallowRoutingExample called!!');
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



    ////zare_nk_041202_added_end(moadele @media baraye responsive kardane site) 

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
    const [isOpenedSeePricesModal, setIsOpenedSeePricesModal] = useState(false);
    const [isOpenedMymodalForWarning, setIsOpenedMymodalForWarning] = useState(false); //zare_nk_041128_added
    const [warningTextInMymodalForWarning, setWarningTextInMymodalForWarning] = useState(''); //zare_nk_041128_added


    ////zare_nk_041128_added_st
    const [isScanning, setIsScanning] = useState(true); //zare_nk_040923(halat anjam scan kardan)
    const { hasPermission, requestPermission } = useCameraPermission();  //zare_nk_040923(darkhaste ejazeh dastresiye doorbin be karbar)
    const [torch, setTorch] = useState<'on' | 'off'>('off');  //zare_nk_040927_added(baraye modiriate faal boodan ya naboodane flash)
    const device = useCameraDevice("back");   //zare_nk_040923(doorbin ra doorbine aghab moshakhas mikonim)
    const [scannedValue, setScannedValue] = useState<string | null>(null);   //zare_nk_041007_added
    // const [resultModalVisible, setResultModalVisible] = useState(false);     //zare_nk_041128_commented(resultModalVisible baraye namayeshe barcode ast ke niazi nist dar projeyeman, bejash dar productModal lahaz mikonim barcode ra)

    const scanLineAnim = useRef(new Animated.Value(0)).current; //zare_nk_041004_added (baraye khatte pareshkone vasate kadr. new Animated.Value(0)

    const [manualBarcode, setManualBarcode] = useState(String);
    ////zare_nk_041128_added_end 
    ////zare_nk_041203_added_st
    useEffect(() => {
        requestPermission();   //zare_nk_040923(dar avalin render darkhaste dastresi be doorbin ra midahim )
    }, []);

    useEffect(() => {
        if (!isOpenedSeePricesModal || !isScanning) {
            scanLineAnim.stopAnimation();
            return;
        }
        ////zare_nk_041007_added_st(age bekhaim meghdare scanLineAnim ra bebinim)
        scanLineAnim.addListener(({ value }) => { //dastoore x01
            console.log(value);
        });
        ////zare_nk_041007_added_end(age bekhaim meghdare scanLineAnim ra bebinim)
        Animated.loop(
            Animated.sequence([
                Animated.timing(scanLineAnim, { //zare_nk_041007_nokteh(timing yek tabe ketabkhaneye Animated hast ke animation ba zamanbandiye khatti 
                    // misazeh(meghdare Animated.Value ra be tadrij yani 1500 milisaniye az meghdare feli be meghdare hadaf tagheir mideh))
                    toValue: 1, //zare_nk_041007_nokteh(scanLineAnim meghdare feliy Animated.Value hast, va toValue: 1 meghdare hadafe Animated.Value hast)
                    duration: 1500,
                    useNativeDriver: true,   //zare_nk_041007_nokteh(true yani animation rooye ThreadNative ejra shavad, useNativeDriver: true baes mishe age js sholough bashe animation ravan bemooneh)
                }),
                Animated.timing(scanLineAnim, { //zare_nk_041007_nokteh(timing yek tabe ketabkhaneye Animated hast ke animation ba zamanbandiye khatti
                    // misazeh(meghdare Animated.Value ra be tadrij yani 1500 milisaniye az meghdare feli be meghdare hadaf tagheir mideh))
                    toValue: 0, //zare_nk_041007_nokteh(scanLineAnim meghdare feliy Animated.Value hast, va toValue: 0 meghdare hadafe Animated.Value hast)
                    duration: 1500,
                    useNativeDriver: true,   //zare_nk_041007_nokteh(true yani animation rooye ThreadNative ejra shavad, useNativeDriver: true baes mishe age js sholough bashe animation ravan bemooneh)
                }),
            ])
        ).start();
    }, [isOpenedSeePricesModal, isScanning]);
    ////zare_nk_041203_added_end 

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
        codeTypes: ["qr", "ean-13", "upc-a"],
        onCodeScanned: (codes) => {
            if (!isScanning) return;
            for (const code of codes) {
                if (code.value) {
                    console.log(`Scanned: ${code.value}`);
                    setIsScanning(false);
                    // setScannedValue(code.value);  //zare_nk_041129_commented

                    ////baste shodane modal
                    // setAddOrRemChanged("notNull");  //zare_nk_041128_commented(ehtemalan niazi nist va biasar ham hast, chon dar hamin render paeintar setAddOrRemChanged(null); ra seda zadim)
                    setIsOpenedSeePricesModal(false);  //okk 
				 	setManualBarcode('');  //zare_nk_041205_added

                    ////shenasaei va openprodDetModal 
                    ShowDetails(code.value);  //okk
                    setIsOpenedProdDetModal(true);  //okk
                    setAddOrRemChanged(null);  //okk

                    break;
                }
            }
        },
    });

    async function openprodDetModal(barcodeKala: string) {
        console.log('ShallowRoutingExample called-openprodDetModal called!!');
        await ShowDetails(barcodeKala);
        setIsOpenedProdDetModal(true);
        setAddOrRemChanged(null);
    }

    async function ShowDetails(barcodeKala: any) {
        // Alert.alert('ShowDetails called!!');
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

        let ApiUrl = "https://api.tochikala.com/api/";
        var urlApi_SelectShobehJashnvareh = ApiUrl + "User/Api_SelectKalaShobeh";
        const response = await fetch(urlApi_SelectShobehJashnvareh, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify({
                BarcodeKala: barcodeKala,
                IdShobeh: 7,
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
                setForCartContInProdDetVal(() => {
                    return {
                        tedadInSabadOrDet: parsedList[0].TedadDarSabad,
                        ZaribForoosh: parsedList[0].ZaribForoosh,
                        IdKala: parsedList[0].IdKala,
                        NameKala: parsedList[0].NameKala,
                        DarsadTakhfif: parsedList[0].DarsadTakhfif,
                        NameBerand: parsedList[0].NameBerand,
                        FeeForoosh: parsedList[0].FeeForoosh,
                        FeeMasraf: parsedList[0].FeeMasraf,
                        BarcodeKala: parsedList[0].BarcodeKala,
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
        }
    }

    useEffect(() => {
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
    }, [isOpenedProdDetModal]);

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
    }, [isOpenedSeePricesModal]);

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
        ////zare_nk_041129_added_st
        if (IdSabadKharidTitr == -22) {
            // Alert.alert('bisatrrre!!!');
            setBisatr(true);
            return;
        }
        ////zare_nk_041129_added_end
        let ApiUrl = "https://api.tochikala.com/api/";
        var urlSelectSabad = ApiUrl + "User/Api_SelectSabadKharidSatr";
        const response = await fetch(urlSelectSabad, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify({
                IdShobe: 7,  //zare_nk_041115_nokteh(dar api tochikala hast.vali dar api testotmapi nemiferestim va pishfarz IdShobe kerfu ra parsafar dar samte api lahaz mikard. IdShobe marboot be shobe 7 ra behesh dadam)
                IdSabadKharidTitr: IdSabadKharidTitr,//zare_nk_041115_nokteh(dar api tochikala hast chon chand sabad az chand shobe mishe dasht. vali dar api testotmapi IdSabadKharidTitr nadarim chon ye sabad ke bishtar nist)
            }),
        });
        const data = await response.json();
        if (response.ok) {
            var result = JSON.parse(data.data.list);
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
        }
    }

    useEffect(() => {
        if (isOpenedProdDetModal == true) {
            return;
        }
        async function tempFuncForAsync() {
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
                return;
            } else {
                let ApiUrl = "https://api.tochikala.com/api/";
                var urlSelectSabadTitr = ApiUrl + "User/Api_SelectSabadKharidTitr";

                const response = await fetch(urlSelectSabadTitr, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                    body: JSON.stringify({
                        IdShobeh: 7,
                    }),
                });
                const data = await response.json();
                if (response.ok) {
                    var majmooeKharidMasraf = 0;
                    var soodAzKharid = 0;
                    var Kerayeh = 0;
                    var MablaghNahaee = 0;
                    var KafKharid = 0;
                    var IdSabadKharidTitr = 0;
                    var result = JSON.parse(data.data.list);
                    console.log('result22: ' + JSON.stringify(result)); //zare_nk_041120_commented
                    if (data.status != 0) {
                        console.log('data.status: ' + data.status)
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
                            console.log('result.length == 0: ' + result.length)
                            ///zare_nk_041129_added_st
                            setSabadTitr(null);
                            IdSabadKharidTitr = 0;
                            majmooeKharidMasraf = 0;
                            soodAzKharid = 0;
                            Kerayeh = 0;
                            MablaghNahaee = 0;
                            KafKharid = 0;
                            setJamKol(0);
                            setJamKolTakhfif(0);
                            setJamKolNahaei(0);
                            getSabadItems(-22, token);
                            ///zare_nk_041129_added_end
                            return;
                        }
                        setSabadTitr(result);
                        IdSabadKharidTitr = result[0].IdSabadKharidTitr;
                        majmooeKharidMasraf = result[0].SumFeeMasraf;
                        soodAzKharid = result[0].Sood;
                        Kerayeh = result[0].HazineErsal;
                        MablaghNahaee = result[0].MablaghNahaee;
                        KafKharid = result[0].KafKharid;

                        setJamKol(majmooeKharidMasraf);
                        setJamKolTakhfif(soodAzKharid);
                        setJamKolNahaei(MablaghNahaee);
                        // console.log('majmooeKharidMasraf: ' + majmooeKharidMasraf + '-soodAzKharid: ' + soodAzKharid + '-MablaghNahaee: ' + MablaghNahaee);  //zare_nk_041120_commented
                        getSabadItems(IdSabadKharidTitr, token);
                    }
                } else {
                    console.log('!!response.ok')
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

        let ApiUrl = "https://api.tochikala.com/api/";
        var urlApi_SelectShobehJashnvareh = ApiUrl + "User/Api_SelectKalaShobeh";

        const response = await fetch(urlApi_SelectShobehJashnvareh, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify({
                BarcodeKala: BarcodeKala,
                IdShobeh: 7,
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
                console.log('041120-result in Api_SelectKalaShobeh: ' + JSON.stringify(parsedList));

                if (parsedList.length == 0) {
                    setBisatrInProductDet(true);
                    // const productNotExist = document.getElementById("productNotExist");
                    // if (productNotExist) {
                    //     productNotExist.style.display = "flex";
                    // }
                    return;
                }
                console.log('BarcodeKala is: ' + parsedList[0].BarcodeKala + '-BarcodeKala: ' + BarcodeKala)
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
                        event: null,  //zare_nk_041120_tahlilshe
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
            setIsOpenedSeePricesModal(false); //reza_nk_041128_added
            setManualBarcode('');  //zare_nk_041205_added
            addDetectedToCart(text.toString());
        }
    }
    ////zare_nk_041128_added_end
    const seePrices = () => {
        setIsOpenedProdDetModal(false); //zare_nk_040325_nokteh(shayad niaziam nabood!chon baste beshe modalDet setIsOpenedProdDetModal(false) seda zadeh mishe!!)
        setIsOpenedSeePricesModal(true);
        setAddOrRemChanged(null);
        setIsScanning(true);  //zare_nk_041203_added
    };

    async function addToCartInIndex(
        addRemParam: addRemParamType,
    ) {
        // Alert.alert('444');
        console.log('041203-addToCartInIndex called!-addRemParam: ' + addRemParam.NameKala);
        // console.log('041120-addToCartInIndex called!-addRemParam: ' + JSON.stringify(addRemParam)); //zare_nk_041120_commented(error mideh:    // console.log('041120-addToCartInIndex called!-addRemParam: ' + JSON.stringify(addRemParam)); //zare_nk_041120_commented_tahlilshe(error mideh:TypeError: Converting circular structure to JSON)
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
        } else {
            console.log('041120-addToCartInIndex-else 1');
            var TedadOut = 0;
            var TedadOuttoAjax = 0;
            const zarib = parseFloat(String(addRemParam.ZaribForoosh ?? 0));
            TedadOut = addRemParam.tedadInSabadOrDet + zarib;
            TedadOuttoAjax = addRemParam.ZaribForoosh;
            console.log('041203-addToCartInIndex-tedad ii: ' + addRemParam.tedadInSabadOrDet + '-zarib: ' + addRemParam.ZaribForoosh + '-TedadOut: ' + TedadOut);
            // console.log('041120-addToCartInIndex-token: ' + token? JSON.parse(token):'' );
            console.log('041203-addToCartInIndex-token isss22: ' + JSON.stringify(token));
            try {
                let ApiUrl = "https://api.tochikala.com/api/";
                var urlInsertToSabad = ApiUrl + "User/Api_AddRemoveSabadKharidSatr";
                const response = await fetch(urlInsertToSabad, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                    body: JSON.stringify({
                        BarcodeKala: addRemParam.BarcodeKala,
                        Tedad: TedadOut,
                        IdKala: addRemParam.IdKala,
                        IdShobeh: 7,
                        IdAddress: 23990
                    }),
                });
                //  const text = await response.text();
                //  console.log('041203-addToCartInIndex-text: ' + text);
                console.log('041203-addToCartInIndex-response.status: ' + response.status);
                const data = await response.json();
                if (response.ok) {
                    console.log('041203-addToCartInIndex-else 5 IdKala response.ok-data: ' + JSON.stringify(data));
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
                        let satrInoInResult = JSON.parse(result.data.satr)[0];  //zare_nk_041124_added
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
                }

            }
            catch (error) {
                console.error("zare_nk_041203-resendcode-in catch:", error);
                if (error instanceof Error) {
                    console.error("zare_nk_041203-resendcode-in catch-2:", error.message);
                } else {
                    console.error("zare_nk_041203-resendcode-in catch-3:", String(error));
                }
            }


        }
    }

    async function remveFromCartInIndex(
        addRemParam: addRemParamType,
    ) {
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
        } else {
            console.log('041116-001');
            var TedadOut = 0;
            var TedadOuttoAjax = 0;
            const zarib = parseFloat(String(addRemParam.ZaribForoosh ?? 0));
            TedadOut = addRemParam.tedadInSabadOrDet - zarib;
            TedadOuttoAjax = -(addRemParam.ZaribForoosh);
            const token = await getCookie("token");

            let ApiUrl = "https://api.tochikala.com/api/";
            var urlInsertToSabad = ApiUrl + "User/Api_AddRemoveSabadKharidSatr";
            const response = await fetch(urlInsertToSabad, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
                body: JSON.stringify({
                    BarcodeKala: addRemParam.BarcodeKala,
                    Tedad: TedadOut,
                    IdKala: addRemParam.IdKala,
                    IdShobeh: 7,
                    IdAddress: 23990
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
                    console.log('041116-result.status == 0');
                    setAddOrRemChanged(addRemParam.BarcodeKala + "-" + TedadOut);

                    let satrInoInResult = JSON.parse(result.data.satr)[0];  //zare_nk_041124_added
                    let Tedad = satrInoInResult === undefined ? 0 : satrInoInResult.Tedad;

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

                    if (Tedad == 0) {
                        ////zare_nk_041129_commented_st
                        // const inputGroup = document.querySelector(
                        //     ".ForCart-" + addRemParam.IdKala + " .input-group"
                        // );
                        // if (inputGroup) {
                        //     let parent = inputGroup.closest(".flxpedar2_new");   //tahlilshe
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
                console.log('041116-!!response.ok');
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
                ////zare_nk_041203_added_st
                onRequestClose={() => {
                    // Alert.alert('aaaaa');
                    // setAddOrRemChanged("notNull");
                    // setBisatrInProductDet(false);

                    setIsOpenedMymodalForWarning(false);
                    setScannedValue(null);
                    setIsScanning(true);
                }}
            ////zare_nk_041203_added_end
            >
                <View style={styles.resultOverlay}>
                    <View style={styles.resultBox}>
                        <Text style={styles.resultValue}>
                            {warningTextInMymodalForWarning}
                        </Text>

                        <Button
                            title="تأیید"
                            onPress={() => {
                                setIsOpenedMymodalForWarning(false);
                                setScannedValue(null);
                                setIsScanning(true);
                            }}
                        />
                    </View>
                </View>
            </Modal>
            {isOpenedProdDetModal == true ? (
                // <div
                //     className="modal px-0"
                //     id="prodDetModal"
                //     style={{ overflow: "hidden" }}
                // >
                //     <div
                //         className="modal-dialog"
                //         style={{
                //             display: "flex",
                //             justifyContent: "center",
                //             height: "100%",
                //             alignItems: "center",
                //         }}
                //     >
                //         <div
                //             className="modal-content"
                //             style={{
                //                 borderRadius: "10px",
                //                 width: "900px",
                //                 flex: "0 0 900px",
                //                 maxWidth: "100%",
                //                 display: "flex",
                //                 flexDirection: "column",
                //                 height: "fitContent",
                //                 maxHeight: "98vh",
                //                 backgroundColor: "#fcfcfc !important",
                //             }}
                //         >
                //             <div
                //                 className="modal-header"
                //                 style={{ border: "none", padding: "16px 16px 5px 16px" }}
                //             >
                //                 <div
                //                     style={{
                //                         width: "100%",
                //                         display: "flex",
                //                         flexDirection: "row",
                //                         justifyContent: "space-between",
                //                     }}
                //                 >
                //                     <div
                //                         className="spanCont"
                //                         style={{
                //                             fontFamily: "IRANSansWeb(FaNum)_Medium",
                //                             fontSize: "18px",
                //                         }}
                //                     >
                //                         <span>جزئیات محصول</span>
                //                     </div>
                //                     <div className="h4Cont"></div>
                //                     <div
                //                         className="buttonCont buttonHover"
                //                         style={{
                //                             display: "flex",
                //                             flexDirection: "row",
                //                             alignContent: "center",
                //                             alignItems: "center",
                //                         }}
                //                     >
                //                         <span
                //                             style={{
                //                                 cursor: "pointer",
                //                                 padding: "4px",
                //                                 borderRadius: "8px",
                //                                 border: "1px solid #A5A5A5",
                //                                 width: "24px",
                //                                 height: "24px",
                //                                 display: "flex",
                //                                 flexDirection: "row",
                //                                 justifyContent: "center",
                //                                 alignContent: "center",
                //                             }}
                //                             data-bs-dismiss="modal"
                //                         >
                //                             <img src="https://img.tochikala.com/tochikala/close-modal.svg" />
                //                         </span>
                //                     </div>
                //                 </div>
                //             </div>
                //             <div
                //                 className="modal-body text-center thinScroll"
                //                 style={{ flex: "1 1 auto", display: "flex", flexDirection: "column" }}
                //             >
                //                 <div
                //                     className="inModalBody"
                //                     style={{ display: "flex", flexDirection: "column", height: "100%" }}
                //                 >
                //                     <div
                //                         className="scrollContInModal"
                //                         id="prodDetCont"
                //                         style={{
                //                             flex: "1 1 auto",
                //                             display: "flex",
                //                             flexDirection: "column",
                //                             overflow: "hidden",
                //                         }}
                //                     >
                //                         <div
                //                             // id="productExist"
                //                             style={{
                //                                 height: "100%",
                //                                 display: bisatrInProductDet === false ? "flex" : "none",
                //                                 justifyContent: "center",
                //                                 marginBottom: "30px",
                //                             }}
                //                         >
                //                             <div
                //                                 id="DetailsPageCont"
                //                                 style={{
                //                                     marginTop: "10px",
                //                                     overflow: "hidden",
                //                                     width: "100%",
                //                                     paddingTop: "5px",
                //                                     height: "fit-content",
                //                                 }}
                //                             >
                //                                 <div
                //                                     id="groupsInDetailsPageCont"
                //                                     style={{
                //                                         display: "none",
                //                                         flexDirection: "row",
                //                                         alignItems: "center",
                //                                         fontSize: "14px",
                //                                         margin: "0px 10px 10px 0px",
                //                                     }}
                //                                 ></div>

                //                                 <div
                //                                     id="DetailsImgAndInfoCont"
                //                                     style={{
                //                                         paddingLeft: "3px",
                //                                         paddingRight: "3px",
                //                                         paddingBottom: "3px",
                //                                     }}
                //                                 >
                //                                     <div
                //                                         id="ImgAndSwiperCont"
                //                                         style={{ marginBottom: "7px", width: "100%" }}
                //                                     >
                //                                         <div
                //                                             id="ImageColectionInDetails"
                //                                             className="swiper"
                //                                             style={{
                //                                                 display:'none',
                //                                                 marginLeft: "10px",
                //                                                 padding: "7px",
                //                                                 borderRadius: "10px",
                //                                                 border: "none",
                //                                                 boxShadow: "0px 0px 3px 0px silver",
                //                                                 marginRight: "0px",
                //                                             }}
                //                                         >
                //                                             <div className="swiper-wrapper"></div>
                //                                             <div className="swiper-pagination"></div>
                //                                             <div className="swiper-scrollbar"></div>
                //                                         </div>
                //                                         <div
                //                                             id="CurrentImgCont"
                //                                             style={{
                //                                                 padding: "15px 0px",
                //                                                 overflow: "hidden",
                //                                                 borderRadius: "15px 15px 0px 0px",
                //                                                 position: "relative",
                //                                                 border: "none",
                //                                                 boxShadow: "0px 0px 3px 0px silver",
                //                                                 display: "flex",
                //                                                 justifyContent: "center",
                //                                                 backgroundColor: "white",
                //                                             }}
                //                                         >
                //                                             <div
                //                                                 id="heartContInDetails"
                //                                                 style={{
                //                                                     display: "none",
                //                                                     zIndex: "898",
                //                                                     cursor: "pointer",
                //                                                     position: "absolute",
                //                                                     top: "7px",
                //                                                     right: "7px",
                //                                                     fontSize: "100%",
                //                                                     opacity: "0.7",
                //                                                     backgroundColor: "inherit",
                //                                                 }}
                //                                             >
                //                                                 <img
                //                                                     id="heartImgInDetails"
                //                                                     style={{ width: "32px" }}
                //                                                     src="https://img.tochikala.com/icon/heart/heart01(0).svg"
                //                                                     alt="علاقه&zwnj;مندی&zwnj;ها"
                //                                                 />
                //                                             </div>
                //                                             {ForCartContInProdDetVal != undefined && (
                //                                                 <img
                //                                                     loading="lazy"
                //                                                     id="CurrentImg"
                //                                                     style={{ height: "fit-content" }}
                //                                                     src={`https://img.tochikala.com/Product/${ForCartContInProdDetVal.IdKala}.webp`}
                //                                                     alt={ForCartContInProdDetVal.NameKala ?? ""}
                //                                                 />
                //                                             )}
                //                                         </div>
                //                                     </div>

                //                                     <div
                //                                         id="DetailsInfoCont"
                //                                         className="hisGrandFather WantCompress"
                //                                         style={{
                //                                             justifyContent: "space-between",
                //                                             backgroundColor: "white",
                //                                             padding: "10px",
                //                                             borderRadius: "0px 0px 15px 15px",
                //                                             boxShadow: "0px 0px 3px 0px silver",
                //                                         }}
                //                                     >
                //                                         <div
                //                                             id="titleAndGeoupInDetailsInfoCont"
                //                                             style={{
                //                                                 display: "flex",
                //                                                 flexDirection: "column",
                //                                                 width: "100%",
                //                                             }}
                //                                         >
                //                                             {ForCartContInProdDetVal != null && (
                //                                                 <h1
                //                                                     id="nameKalaInDetailsInfoCont"
                //                                                     style={{
                //                                                         fontSize: "16px",
                //                                                         marginBottom: "30px",
                //                                                         fontFamily: "IRANSansWeb(FaNum)_Medium",
                //                                                         lineHeight: "2.0",
                //                                                         textOverflow: "ellipsis",
                //                                                         overflow: "hidden",
                //                                                         display: "-webkit-box",
                //                                                         WebkitLineClamp: "2",
                //                                                         lineClamp: "2",
                //                                                         WebkitBoxOrient: "vertical",
                //                                                         textAlign: "right",
                //                                                     }}
                //                                                 >
                //                                                     {ForCartContInProdDetVal.NameKala}
                //                                                 </h1>
                //                                             )}

                //                                             <div style={{ display: "flex", flexDirection: "row" }}>

                //                                                 <div
                //                                                     style={{
                //                                                         flex: "1 1 30%",
                //                                                         display: "flex",
                //                                                         flexDirection: "column",
                //                                                         paddingLeft: "5px",
                //                                                         alignItems: "center",
                //                                                         color: "#322E2E",
                //                                                         justifyContent: "space-around",
                //                                                     }}
                //                                                 >
                //                                                     <div
                //                                                         style={{
                //                                                             display: "flex",
                //                                                             flexDirection: "row",
                //                                                             fontFamily: "IRANSansWeb(FaNum)_Medium",
                //                                                             color: "#888888",
                //                                                         }}
                //                                                     >
                //                                                         <span>برند</span>
                //                                                     </div>
                //                                                     <div
                //                                                         style={{
                //                                                             flex: "0 0 auto",
                //                                                             display: "flex",
                //                                                             flexDirection: "row",
                //                                                             paddingLeft: "5px",
                //                                                             alignItems: "center",
                //                                                         }}
                //                                                     >
                //                                                         {ForCartContInProdDetVal != null && (
                //                                                             <span id="nameBerandInDetailsInfoCont">
                //                                                                 {ForCartContInProdDetVal.NameBerand}
                //                                                             </span>
                //                                                         )}
                //                                                     </div>
                //                                                 </div>
                //                                                 <div
                //                                                     style={{
                //                                                         display: "flex",
                //                                                         flexDirection: "row",
                //                                                         alignContent: "center",
                //                                                         alignItems: "center",
                //                                                         padding: "0px 8px 0px 8px",
                //                                                     }}
                //                                                 >
                //                                                     <div
                //                                                         style={{
                //                                                             width: "0px",
                //                                                             height: "30px",
                //                                                             borderLeft: "2px solid silver",
                //                                                         }}
                //                                                     ></div>
                //                                                 </div>
                //                                                 <div
                //                                                     style={{
                //                                                         display: "flex",
                //                                                         flexDirection: "column",
                //                                                         flex: "1 1 30%",
                //                                                         alignItems: "center",
                //                                                         justifyContent: "space-around",
                //                                                     }}
                //                                                 >
                //                                                     <div
                //                                                         style={{
                //                                                             display: "flex",
                //                                                             flexDirection: "row",
                //                                                             marginBottom: "10px",
                //                                                         }}
                //                                                     >
                //                                                         {ForCartContInProdDetVal != null &&
                //                                                             ForCartContInProdDetVal.DarsadTakhfif != 0 && (
                //                                                                 <div
                //                                                                     id="gheimatMasrafInDetailsInfoCont"
                //                                                                     className="gheimatMasrafInsabad"
                //                                                                     style={{
                //                                                                         // display: "none",
                //                                                                         display: Number(ForCartContInProdDetVal.DarsadTakhfif) === 0 ? "none" : "flex",
                //                                                                         flexDirection: "row",
                //                                                                         justifyContent: "end",
                //                                                                         textDecoration: "line-through",
                //                                                                         fontSize: "14px",
                //                                                                         alignItems: "center",
                //                                                                     }}
                //                                                                 >
                //                                                                     {/* {ForCartContInProdDetVal != null && ( */}
                //                                                                     <span>
                //                                                                         {ForCartContInProdDetVal.FeeMasraf}
                //                                                                     </span>
                //                                                                     {/* )} */}
                //                                                                 </div>
                //                                                             )}
                //                                                     </div>
                //                                                     <div
                //                                                         style={{
                //                                                             display: "flex",
                //                                                             flexDirection: "row-reverse",
                //                                                             height: "35px",
                //                                                             alignContent: "center",
                //                                                             fontSize: "24px",
                //                                                         }}
                //                                                     >
                //                                                         <div
                //                                                             id="gheimatForooshInDetailsInfoCont"
                //                                                             className="gheimatForooshInsabad"
                //                                                             style={{
                //                                                                 display: "flex",
                //                                                                 flexDirection: "row",
                //                                                                 marginLeft: "5px",
                //                                                                 alignItems: "center",
                //                                                                 fontSize: "16px",
                //                                                             }}
                //                                                         >
                //                                                             {ForCartContInProdDetVal != null && (
                //                                                                 <span>
                //                                                                     {ForCartContInProdDetVal.FeeForoosh}
                //                                                                 </span>
                //                                                             )}
                //                                                         </div>
                //                                                         <div
                //                                                             className="rialInsabad  valueStyle"
                //                                                             style={{
                //                                                                 display: "flex",
                //                                                                 flexDirection: "row",
                //                                                                 alignItems: "center",
                //                                                                 fontSize: "14px",
                //                                                             }}
                //                                                         >
                //                                                             ریال
                //                                                         </div>
                //                                                     </div>
                //                                                 </div>

                //                                                 {ForCartContInProdDetVal != null &&
                //                                                     ForCartContInProdDetVal.DarsadTakhfif != 0 && (
                //                                                         <div
                //                                                             id="lastDividerInDetails"
                //                                                             style={{
                //                                                                 // display: "flex",
                //                                                                 display: Number(ForCartContInProdDetVal.DarsadTakhfif) === 0 ? "none" : "flex",
                //                                                                 flexDirection: "row",
                //                                                                 alignContent: "center",
                //                                                                 alignItems: "center",
                //                                                                 padding: "0px 8px 0px 8px",
                //                                                             }}
                //                                                         >
                //                                                             <div
                //                                                                 style={{
                //                                                                     width: "0px",
                //                                                                     height: "30px",
                //                                                                     borderLeft: "2px solid silver",
                //                                                                 }}
                //                                                             ></div>
                //                                                         </div>
                //                                                     )}
                //                                                 {ForCartContInProdDetVal != null &&
                //                                                     ForCartContInProdDetVal.DarsadTakhfif != 0 && (
                //                                                         <div
                //                                                             id="DiscountContInDetails"
                //                                                             style={{
                //                                                                 // display: "flex",
                //                                                                 display: Number(ForCartContInProdDetVal.DarsadTakhfif) === 0 ? "none" : "flex",
                //                                                                 flexDirection: "column",
                //                                                                 flex: "1 1 30%",
                //                                                                 alignItems: "center",
                //                                                                 justifyContent: "space-around",
                //                                                             }}
                //                                                         >
                //                                                             <div
                //                                                                 style={{
                //                                                                     display: "flex",
                //                                                                     flexDirection: "row",
                //                                                                     marginBottom: "10px",
                //                                                                     width: "100%",
                //                                                                     justifyContent: "center",
                //                                                                 }}
                //                                                             >
                //                                                                 <div
                //                                                                     id="darsadTakhfifInDetails"
                //                                                                     className="darsadTakhfifInDetails"
                //                                                                     style={{
                //                                                                         backgroundColor: "red",
                //                                                                         flex: "0 0 auto",
                //                                                                         display: "flex",
                //                                                                         justifyContent: "center",
                //                                                                         alignItems: "center",
                //                                                                         marginLeft: "15px",
                //                                                                         borderRadius: "15px",
                //                                                                         width: "100%",
                //                                                                         maxWidth: "70px",
                //                                                                         height: "50px",
                //                                                                     }}
                //                                                                 >
                //                                                                     <span
                //                                                                         style={{
                //                                                                             color: "white",
                //                                                                             opacity: "1",
                //                                                                             fontSize: "18px",
                //                                                                         }}
                //                                                                     >
                //                                                                         %
                //                                                                     </span>

                //                                                                     {/* {ForCartContInProdDetVal != null && ( */}
                //                                                                     <span
                //                                                                         id="forDiscountInDetails"
                //                                                                         className="forDiscount"
                //                                                                         style={{
                //                                                                             color: "white",
                //                                                                             opacity: "1",
                //                                                                             fontSize: "18px",
                //                                                                         }}
                //                                                                     >
                //                                                                         {ForCartContInProdDetVal.DarsadTakhfif}
                //                                                                     </span>
                //                                                                     {/* )} */}
                //                                                                 </div>
                //                                                             </div>
                //                                                         </div>
                //                                                     )}
                //                                             </div>
                //                                         </div>
                //                                         <div
                //                                             id="CartAndPriceInDetailsInfoCont"
                //                                             style={{
                //                                                 display: "flex",
                //                                                 flexDirection: "column",
                //                                                 width: "100%",
                //                                                 marginTop: "10px",
                //                                                 paddingRight: "20px",
                //                                             }}
                //                                         >
                //                                             <div
                //                                                 id="InCartAndPriceInDetailsInfoCont"
                //                                                 style={{
                //                                                     width: "100%",
                //                                                     display: "flex",
                //                                                     flexDirection: "row",
                //                                                     justifyContent: "space-between",
                //                                                 }}
                //                                             >
                //                                                 <div
                //                                                     id="ForCartContInProdDet"
                //                                                     style={{
                //                                                         display: "flex",
                //                                                         flexDirection: "column",
                //                                                         justifyContent: "end",
                //                                                     }}
                //                                                 >
                //                                                     {ForCartContInProdDetVal != null && (
                //                                                         <MiddleCountTedadSefr
                //                                                             // SabadRow={ForCartContInProdDetVal}  //zare_nk_041120_commented
                //                                                             ////zare_nk_041120_added_st
                //                                                             refForfather={ForCartContInProdDetVal.refForfather}
                //                                                             fromShowDetails={ForCartContInProdDetVal.fromShowDetails}
                //                                                             IdKala={ForCartContInProdDetVal.IdKala}
                //                                                             idTag={ForCartContInProdDetVal.idTag}
                //                                                             tedadInSabadOrDet={ForCartContInProdDetVal.tedadInSabadOrDet}

                //                                                             // handlerForAddClick={(e) => { //zare_nk_041128_commented
                //                                                             handlerForAddClick={() => {   //zare_nk_041128_added
                //                                                                 return handlerForAddClick(
                //                                                                     {
                //                                                                         tedadInSabadOrDet: ForCartContInProdDetVal.tedadInSabadOrDet,
                //                                                                         ZaribForoosh: ForCartContInProdDetVal.ZaribForoosh,
                //                                                                         IdKala: ForCartContInProdDetVal.IdKala,
                //                                                                         NameKala: ForCartContInProdDetVal.NameKala,
                //                                                                         DarsadTakhfif: ForCartContInProdDetVal.DarsadTakhfif,
                //                                                                         NameBerand: ForCartContInProdDetVal.NameBerand,  //zare_nk_041118_nokteh(dar api selectKalaShobeh NameBerand dar pasokh hast pas ma meghdaresh ro dadim)
                //                                                                         FeeForoosh: ForCartContInProdDetVal.FeeForoosh,
                //                                                                         FeeMasraf: ForCartContInProdDetVal.FeeMasraf,
                //                                                                         BarcodeKala: ForCartContInProdDetVal.BarcodeKala,
                //                                                                         Mojoodi: ForCartContInProdDetVal.Mojoodi,
                //                                                                         MaxTedad: ForCartContInProdDetVal.MaxTedad,
                //                                                                         father: refForfather.current,
                //                                                                         bishAzMaxTedadYaMojoodi: ForCartContInProdDetVal.bishAzMaxTedadYaMojoodi,
                //                                                                         fromShowDetails: true,
                //                                                                         // event: e,  //zare_nk_041128_commented
                //                                                                         event: null,  //zare_nk_041128_added
                //                                                                     }
                //                                                                 );
                //                                                             }}
                //                                                             // handlerForRemClick={(e) => { //zare_nk_041128_commented
                //                                                             handlerForRemClick={() => {  //zare_nk_041128_added
                //                                                                 return handlerForRemClick(
                //                                                                     {
                //                                                                         tedadInSabadOrDet: ForCartContInProdDetVal.tedadInSabadOrDet,
                //                                                                         ZaribForoosh: ForCartContInProdDetVal.ZaribForoosh,
                //                                                                         IdKala: ForCartContInProdDetVal.IdKala,
                //                                                                         NameKala: ForCartContInProdDetVal.NameKala,
                //                                                                         DarsadTakhfif: ForCartContInProdDetVal.DarsadTakhfif,
                //                                                                         NameBerand: ForCartContInProdDetVal.NameBerand,  //zare_nk_041118_nokteh(dar api selectKalaShobeh NameBerand dar pasokh hast pas ma meghdaresh ro dadim)
                //                                                                         FeeForoosh: ForCartContInProdDetVal.FeeForoosh,
                //                                                                         FeeMasraf: ForCartContInProdDetVal.FeeMasraf,
                //                                                                         BarcodeKala: ForCartContInProdDetVal.BarcodeKala,
                //                                                                         Mojoodi: ForCartContInProdDetVal.Mojoodi,
                //                                                                         MaxTedad: ForCartContInProdDetVal.MaxTedad,
                //                                                                         father: refForfather.current,
                //                                                                         bishAzMaxTedadYaMojoodi: ForCartContInProdDetVal.bishAzMaxTedadYaMojoodi,
                //                                                                         fromShowDetails: true,
                //                                                                         // event: e,  //zare_nk_041128_commented
                //                                                                         event: null,  //zare_nk_041128_added
                //                                                                     }
                //                                                                 );
                //                                                             }}
                //                                                             ForCartContentsDesignType={ForCartContInProdDetVal.ForCartContentsDesignType}
                //                                                             bishAzMaxTedadYaMojoodi={ForCartContInProdDetVal.bishAzMaxTedadYaMojoodi}
                //                                                         />
                //                                                     )}
                //                                                 </div>
                //                                             </div>
                //                                         </div>
                //                                     </div>
                //                                     <div id="imgzoomed"></div>
                //                                 </div>
                //                                 <div
                //                                     id="navContInDetCont"
                //                                     style={{
                //                                         display: "none",
                //                                         flexDirection: "column",
                //                                         borderBottom: "1px solid #E7E7E0",
                //                                         padding: "0px 0px 0px 0px",
                //                                     }}
                //                                 >
                //                                     <div className="navContInDet">
                //                                         <ul className="nav nav-tabs" role="tablist">
                //                                             <li
                //                                                 className="nav-item"
                //                                                 style={{ borderBottom: "2px solid red" }}
                //                                             >
                //                                                 <a
                //                                                     className="nav-link active"
                //                                                     data-bs-toggle="tab"
                //                                                     href="#home"
                //                                                     style={{ color: "inherit" }}
                //                                                 >
                //                                                     ویژگی کالا
                //                                                 </a>
                //                                             </li>
                //                                             <li className="nav-item">
                //                                                 <a
                //                                                     className="nav-link"
                //                                                     data-bs-toggle="tab"
                //                                                     href="#menu1"
                //                                                     style={{ color: "inherit" }}
                //                                                 >
                //                                                     جزئیات کالا
                //                                                 </a>
                //                                             </li>
                //                                             <li className="nav-item" style={{ display: "none" }}>
                //                                                 <a
                //                                                     className="nav-link"
                //                                                     data-bs-toggle="tab"
                //                                                     href="#menu2"
                //                                                     style={{ color: "inherit" }}
                //                                                 >
                //                                                     Menu 2
                //                                                 </a>
                //                                             </li>
                //                                         </ul>
                //                                         <div
                //                                             className="tab-content"
                //                                             style={{ color: "#545454" }}
                //                                         >
                //                                             <div id="home" className="containerr tab-pane active">
                //                                                 <div
                //                                                     style={{
                //                                                         display: "flex",
                //                                                         flexDirection: "row",
                //                                                         justifyContent: "center",
                //                                                         justifyItems: "center",
                //                                                         alignContent: "center",
                //                                                         padding: "10px 0px",
                //                                                     }}
                //                                                 >
                //                                                     <p style={{ margin: "0px" }}>
                //                                                         ویژگی برای این محصول وجود ندارد
                //                                                     </p>
                //                                                 </div>
                //                                             </div>
                //                                             <div id="menu1" className="containerr tab-pane fade">
                //                                                 <div
                //                                                     id="ProductDescription"
                //                                                     style={{
                //                                                         marginTop: "15px",
                //                                                         flexDirection: "column",
                //                                                         position: "relative",
                //                                                         paddingBottom: "48px",
                //                                                     }}
                //                                                 >
                //                                                     <div
                //                                                         id="contentContInProdDes"
                //                                                         style={{
                //                                                             marginBottom: "10px",
                //                                                             display: "flex",
                //                                                             flexDirection: "column",
                //                                                             maxHeight: "120px",
                //                                                             overflow: "hidden",
                //                                                         }}
                //                                                     ></div>
                //                                                     <div
                //                                                         style={{
                //                                                             display: "flex",
                //                                                             flexDirection: "column",
                //                                                             position: "absolute",
                //                                                             right: "10px",
                //                                                             bottom: "10px",
                //                                                         }}
                //                                                     >
                //                                                         <a
                //                                                             id="bishtarInProdDes"
                //                                                             className="buttonHover"
                //                                                             href="#ProductDescription"
                //                                                             style={{
                //                                                                 padding: "10px",
                //                                                                 borderRadius: "7px",
                //                                                                 display: "flex",
                //                                                                 flexDirection: "row",
                //                                                                 textDecoration: "none",
                //                                                                 color: "rgb(2, 160, 164)",
                //                                                                 backgroundColor: "inherit",
                //                                                             }}
                //                                                         >
                //                                                             <div
                //                                                                 style={{
                //                                                                     flex: "0 0 auto",
                //                                                                     display: "flex",
                //                                                                     flexDirection: "row",
                //                                                                     paddingLeft: "5px",
                //                                                                     alignItems: "center",
                //                                                                 }}
                //                                                             >
                //                                                                 <span id="TextInBishtarInProdDes">
                //                                                                     نمایش بیشتر{" "}
                //                                                                 </span>
                //                                                             </div>
                //                                                             <div
                //                                                                 style={{
                //                                                                     display: "flex",
                //                                                                     flexDirection: "column",
                //                                                                     justifyContent: "center",
                //                                                                 }}
                //                                                             >
                //                                                                 <div
                //                                                                     className="rounded-pill"
                //                                                                     style={{
                //                                                                         display: "flex",
                //                                                                         flexDirection: "row",
                //                                                                         backgroundColor: "inherit",
                //                                                                     }}
                //                                                                 >
                //                                                                     <img
                //                                                                         src="https://img.tochikala.com/tochikala/left-arrow.svg"
                //                                                                         style={{ width: "15px" }}
                //                                                                         alt="نمایش بیشتر"
                //                                                                     />
                //                                                                 </div>
                //                                                             </div>
                //                                                         </a>
                //                                                     </div>
                //                                                 </div>
                //                                             </div>
                //                                             <div id="menu2" className="containerr tab-pane fade">
                //                                                 salam menu2
                //                                             </div>
                //                                         </div>
                //                                     </div>
                //                                 </div>
                //                             </div>
                //                         </div>
                //                         <View
                //                             // id="productNotExist"
                //                             style={{
                //                                 height: "100%",
                //                                 display: bisatrInProductDet === false ? "none" : "flex",
                //                                 justifyContent: "center",
                //                                 marginBottom: 30,
                //                                 // color: "red",
                //                                 // fontFamily: "IRANSansWeb(FaNum)_Medium",
                //                             }}
                //                         >
                //                             <Text style={{ color: "red", fontFamily: "IRANSansWeb(FaNum)_Medium", }}> کالای مورد نظر یافت نشد</Text>
                //                         </View>
                //                     </div>
                //                 </div>
                //             </div>
                //         </div>
                //     </div>
                // </div>
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
                    {/*zare_nk_040923(konteyner dakhele modal)*/}
                    {/* zare_nk_041128_okk */}
                    <View style={[styles.modalContainer, { overflow: "hidden" }]}>
                        {/* zare_nk_041128_added_st */}
                        <View
                            // className="inModalBody"
                            style={{ display: "flex", flexDirection: "column", height: "100%" }}
                        >
                            <View
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
                            >
                                <View
                                    // id="productExist"
                                    style={{
                                        height: "100%",
                                        // display: "flex",
                                        display: bisatrInProductDet === true ? "none" : "flex", //zare_nk_041129_rahe2(tosiye mishe)
                                        justifyContent: "center",
                                        marginBottom: 30,
                                    }}
                                >
                                    <View
                                        // id="DetailsPageCont"
                                        style={{
                                            marginTop: 10,
                                            overflow: "hidden",
                                            width: "100%",
                                            paddingTop: 5,
                                            // height: "fit-content",
                                        }}
                                    >
                                        <View
                                            // id="groupsInDetailsPageCont"
                                            style={{
                                                // display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center",
                                                // margin: "0px 10px 10px 0px", 
                                                marginTop: 0,
                                                marginRight: 10,
                                                marginBottom: 10,
                                                marginLeft: 0,
                                            }}
                                        >
                                            <Text style={{ fontSize: 14, }}></Text>
                                        </View>

                                        <View
                                            // id="DetailsImgAndInfoCont"
                                            style={{
                                                paddingLeft: 3,
                                                paddingRight: 3,
                                                paddingBottom: 3,
                                            }}
                                        >
                                            <View
                                                // id="ImgAndSwiperCont"
                                                style={{ marginBottom: 7, width: "100%" }}
                                            >
                                                <View
                                                    // id="ImageColectionInDetails"
                                                    // className="swiper"
                                                    style={{
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
                                                    style={{
                                                        // padding: "15px 0px",
                                                        paddingVertical: 15,
                                                        paddingHorizontal: 0,
                                                        overflow: "hidden",
                                                        borderRadius: "15px 15px 0px 0px",
                                                        position: "relative",
                                                        // border: "none",
                                                        boxShadow: "0px 0px 3px 0px silver",
                                                        // display: "flex",
                                                        justifyContent: "center",
                                                        backgroundColor: "white",
                                                    }}
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
                                                            style={{ width: 32 }}
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
                                                        <Image
                                                            source={{ uri: `https://img.tochikala.com/Product/${ForCartContInProdDetVal.IdKala}.webp` }}
                                                        />
                                                    )}
                                                </View>
                                            </View>

                                            <View
                                                // id="DetailsInfoCont"
                                                // className="hisGrandFather WantCompress"
                                                style={{
                                                    justifyContent: "space-between",
                                                    backgroundColor: "white",
                                                    padding: 10,
                                                    borderRadius: "0px 0px 15px 15px",
                                                    boxShadow: "0px 0px 3px 0px silver",
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
                                                            style={{

                                                                // lineHeight: "2.0",
                                                                lineHeight: 32, // تقریبی: fontSize * 2
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

                                                    <View style={{ display: "flex", flexDirection: "row" }}>

                                                        <View
                                                            style={{
                                                                // flex: "1 1 30%",  
                                                                flexGrow: 1,
                                                                flexShrink: 1,
                                                                flexBasis: ' 30%',
                                                                // display: "flex",
                                                                flexDirection: "column",
                                                                paddingLeft: 5,
                                                                alignItems: "center",

                                                                justifyContent: "space-around",
                                                            }}
                                                        >
                                                            <View
                                                                style={{
                                                                    // display: "flex",
                                                                    flexDirection: "row",
                                                                }}
                                                            >
                                                                <Text style={{ fontFamily: "IRANSansWeb(FaNum)_Medium", color: "#888888", }}>برند</Text>
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
                                                                        style={{ color: "#322E2E", }}
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
                                                                    // borderLeft: "2px solid silver",  
                                                                    borderWidth: 2,
                                                                    borderColor: "silver",
                                                                    borderStyle: 'solid',

                                                                }}
                                                            >
                                                                <Text></Text>
                                                            </View>
                                                        </View>
                                                        <View
                                                            style={{
                                                                // display: "flex",
                                                                flexDirection: "column",
                                                                // flex: "1 1 30%",
                                                                flexGrow: 1,
                                                                flexShrink: 1,
                                                                flexBasis: '30%',
                                                                alignItems: "center",
                                                                justifyContent: "space-around",
                                                            }}
                                                        >
                                                            <View
                                                                style={{
                                                                    // display: "flex",
                                                                    flexDirection: "row",
                                                                    marginBottom: 10,
                                                                }}
                                                            >
                                                                {ForCartContInProdDetVal != null &&
                                                                    ForCartContInProdDetVal.DarsadTakhfif != 0 && (
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
                                                                            <Text style={{ fontSize: 14, textDecorationLine: "line-through" }}>
                                                                                {ForCartContInProdDetVal.FeeMasraf}
                                                                            </Text>
                                                                            {/* )} */}
                                                                        </View>
                                                                    )}
                                                            </View>
                                                            <View
                                                                style={{
                                                                    // display: "flex",
                                                                    flexDirection: "row-reverse",
                                                                    height: 35,
                                                                    alignContent: "center",
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
                                                                    }}
                                                                >
                                                                    {ForCartContInProdDetVal != null && (
                                                                        <Text style={{ fontSize: 16, }}>
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
                                                                    }}
                                                                > <Text style={{ fontSize: 14, }}> ریال</Text>

                                                                </View>
                                                            </View>
                                                        </View>

                                                        {ForCartContInProdDetVal != null &&
                                                            ForCartContInProdDetVal.DarsadTakhfif != 0 && (
                                                                <View
                                                                    // id="lastDividerInDetails"
                                                                    style={{
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
                                                                            borderLeftWidth: 1,
                                                                            borderLeftColor: "#ccc",
                                                                            borderStyle: 'solid',
                                                                        }}
                                                                    >
                                                                        <Text></Text>
                                                                    </View>
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
                                                                        justifyContent: "space-around",
                                                                    }}
                                                                >
                                                                    <View
                                                                        style={{
                                                                            // display: "flex",
                                                                            flexDirection: "row",
                                                                            marginBottom: 10,
                                                                            width: "100%",
                                                                            justifyContent: "center",
                                                                        }}
                                                                    >
                                                                        <View
                                                                            // id="darsadTakhfifInDetails"
                                                                            // className="darsadTakhfifInDetails"
                                                                            style={{
                                                                                backgroundColor: "red",
                                                                                // flex: "0 0 auto",
                                                                                flexGrow: 0,
                                                                                flexShrink: 0,
                                                                                flexBasis: 'auto',
                                                                                display: "flex",
                                                                                justifyContent: "center",
                                                                                alignItems: "center",
                                                                                marginLeft: 15,
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
                                                                                    fontSize: 18,
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
                                                        paddingRight: 20,
                                                    }}
                                                >
                                                    <View
                                                        // id="InCartAndPriceInDetailsInfoCont"
                                                        style={{
                                                            width: "100%",
                                                            // display: "flex",
                                                            flexDirection: "row",
                                                            justifyContent: "space-between",
                                                        }}
                                                    >
                                                        <View
                                                            // id="ForCartContInProdDet"  navigation
                                                            style={{
                                                                // display: "flex",
                                                                flexDirection: "column",
                                                                justifyContent: 'flex-end',
                                                            }}
                                                        >
                                                            {ForCartContInProdDetVal != null && (
                                                                <MiddleCountTedadSefr
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
                                            <View
                                            //  id="imgzoomed"
                                            ></View>
                                        </View>
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
                                                {/* <ul className="nav nav-tabs" role="tablist">
                                                    <li
                                                        className="nav-item"
                                                        style={{ borderBottom: "2px solid red" }}
                                                    >
                                                        <a
                                                            className="nav-link active"
                                                            data-bs-toggle="tab"
                                                            href="#home"
                                                            style={{ color: "inherit" }}
                                                        >
                                                            ویژگی کالا
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a
                                                            className="nav-link"
                                                            data-bs-toggle="tab"
                                                            href="#menu1"
                                                            style={{ color: "inherit" }}
                                                        >
                                                            جزئیات کالا
                                                        </a>
                                                    </li>
                                                    <li className="nav-item" style={{ display: "none" }}>
                                                        <a
                                                            className="nav-link"
                                                            data-bs-toggle="tab"
                                                            href="#menu2"
                                                            style={{ color: "inherit" }}
                                                        >
                                                            Menu 2
                                                        </a>
                                                    </li>
                                                </ul> */}
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
                                        height: "100%",
                                        //   ...(bisatrInProductDet === true && { display: 'none' }),  //zare_nk_041129_rahe1(tosiye nemishe, shayad error bede)
                                        display: bisatrInProductDet === true ? "flex" : "none", //zare_nk_041129_rahe2(tosiye mishe)
                                        justifyContent: "center",
                                        marginBottom: 30,
                                        // color: "red", 
                                    }}
                                >
                                    <Text style={{ color: "red", fontFamily: "IRANSansWeb(FaNum)_Medium", }}>22 کالای مورد نظر یافت نشد</Text>
                                </View>
                            </View>
                        </View>

                        {/* div span */}
                        {/* zare_nk_041128_added_end */}
                    </View>
                </Modal>
            ) : isOpenedSeePricesModal == true ? (
                !device ? (<Text style={styles.centerText}>دوربین یافت نشد</Text>) :
                    (!hasPermission ? (<Text style={styles.centerText}>نیاز به دسترسی دوربین</Text>) :
                        (<Modal   //zare_nk_040923(komponent modal baraye namayesh doorbin va scan kardan)
                            visible={isOpenedSeePricesModal}    //zare_nk_040923(halat namayesh modal)
                            animationType="slide"     //zare_nk_040923(ta'sir gozashtan rooye namayesh modal)  //ye bar fade bezaram bebinam chi mishe!
                            onRequestClose={() => {
                                setIsOpenedSeePricesModal(false);
                                setManualBarcode('');  //zare_nk_041205_added
                                setAddOrRemChanged("notNull");  //zare_nk_041203_added
                            }}   //zare_nk_040923(agar karbar dokmeye back android ra zad modal baste shavad)
                        >
                            {/*zare_nk_040923(konteyner dakhele modal)*/}
                            <View style={[styles.modalContainer, { overflow: "hidden" }]}>
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
                                        {/* zare_nk_041205_nokteh(View ba positione statice komaki baraye inke tage pedar ke position: 'relative' dare ertefae sefr nagire,chon farzandani ke absolute bashan ertefae pedar ro barabare contente khodeshoon nemikonan) */}
                                        <View style={[styles.scanFrame,]}> </View>
                                        <Camera //zare_nk_040923(komponent doorbin)
                                            style={[styles.scanFrame,
                                            // StyleSheet.absoluteFill,
                                            { zIndex: 3, position: 'absolute', top: 0, left: 0, overflow: "hidden" }]}
                                            device={device}      //zare_nk_040923(moshakhas kardan doorbin estefade shode)
                                            isActive={isOpenedSeePricesModal}    //zare_nk_040923(faghat vaghti modal baz ast doorbin faal bashad)
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
                                            setIsOpenedSeePricesModal(false);
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
                                borderRadius: 10,
                                padding: 7,
                                backgroundColor: "#f6f6f6",
                                boxShadow: "#5e5e5e 0px 0px 3px 0px",
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
                                    marginBottom: 10,
                                }}
                            >
                                <View
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: 'flex-start',
                                        // fontSize: 14,
                                        // color: "#322E2E",
                                        paddingRight: 5,
                                    }}
                                >
                                    {/* <Text
                                        id="adToSabadWidthBarCodeScan"
                                    > */}
                                    <TouchableOpacity
                                        // className="BarCodeScan btn btn-danger"
                                        style={{
                                            borderRadius: 10,
                                            ////zare_nk_041202_added_st
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            flexDirection: 'row',
                                            padding: 7,
                                            backgroundColor: '#d9534f'
                                            ////zare_nk_041202_added_end
                                        }}
                                        onPress={() => { return seePrices(); }}
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
                                style={{ display: "none", flexDirection: "row" }}
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
                                style={{ flexDirection: "column" }}
                            >
                                <View style={{
                                    //  display: "flex",
                                    flexDirection: "row"
                                }}>
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
                                                // display: "flex",
                                                flexDirection: "row",
                                                padding: 10,
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
                                    // padding: "0px 5px" 
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
                                borderRadius: 10,
                                backgroundColor: "#f6f6f6",
                                boxShadow: "#5e5e5e 0px 0px 3px 0px",
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
                                                display: "flex",
                                                flexDirection: "row",
                                                justifyContent: "space-between",
                                                marginBottom: 5,
                                                // fontSize: 14, 
                                            }}
                                        >
                                            <Text
                                                // id="jamKolSpan"
                                                style={{ fontSize: 14, color: "#444343", fontFamily: "IRANSansWeb(FaNum)_Medium" }}
                                            // IRANSansWeb(FaNum)_Bold
                                            >جمع کل :</Text>
                                            <Text>{" "}</Text>
                                            <Text
                                                // id="kolGheymatInSabad"
                                                style={{ fontSize: 14, color: "#444343", fontFamily: "IRANSansWeb(FaNum)_Medium" }}
                                            >
                                                {jamKol ? jamKol.toLocaleString() : jamKol}
                                            </Text>
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
                                                // fontSize: 15,
                                                // color: "#B80000",
                                            }}
                                        >
                                            <Text
                                                // className="titleStyle"
                                                style={{ fontSize: 15, color: "#444343", fontFamily: "IRANSansWeb(FaNum)_Medium" }}
                                            >سود شما از خرید : </Text>
                                            <Text
                                                //  className="valueStyle" id="soodKolInSabad"
                                                style={{ fontSize: 15, color: "#444343", fontFamily: "IRANSansWeb(FaNum)_Medium" }}
                                            >
                                                {jamKolTakhfif ? jamKolTakhfif.toLocaleString() : 0}
                                            </Text>
                                        </View>

                                        <View
                                            // className="harSefareshCalcCont"
                                            style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                justifyContent: "space-between",
                                                marginBottom: 5,
                                                // fontSize: 15,
                                                // color: "#B80000",
                                            }}
                                        >
                                            <Text
                                                // className="titleStyle"
                                                style={{ fontSize: 15, color: "#444343", fontFamily: "IRANSansWeb(FaNum)_Medium" }}
                                            >مبلغ قابل پرداخت :</Text>
                                            <Text
                                                // className="valueStyle" id="ghabelePardakhtInSabad"
                                                style={{ fontSize: 15, color: "#444343", fontFamily: "IRANSansWeb(FaNum)_Medium" }}
                                            >
                                                {jamKol ? jamKol.toLocaleString() : 0}
                                            </Text>
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
    modalContainer: {
        flex: 1,
        backgroundColor: "black",
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
        paddingHorizontal: 7,
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

    /////////////////////////////////////////////zare_nk_041202_added_end(for responsives @media) 




});