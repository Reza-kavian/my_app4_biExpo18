import { useState, useEffect, useRef, useMemo,memo } from "react";
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
import ReusableButton from "../components/ReusableButton";
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
    //"shoppingbasket" ////zare_nk_050318_commented
    "shoppingbasket" | "discountsAndOffers" | "Home"  ////zare_nk_050318_added
>;
////zare_nk_050315_nokteh_end(rahe2 baraye taeine noe parametre navigation ke az file digari be componente jari pas dadeh shod)

// import AddToCartIcon from "../components/icons/images/AddToCart";   ////zare_nk_050316_added
import AddToCartTapsiIcon from "../components/icons/images/AddToCartTapsi";   ////zare_nk_050316_added
import RemoveFromCartTapsiIcon from "../components/icons/images/RemoveFromCartTapsi";   ////zare_nk_050316_added
import RecycleBinIcon from "../components/icons/images/RecycleBin";   ////zare_nk_050316_added

////zare_nk_050319_added_st
const showNoStock = () => {
  if (Platform.OS === "android") {
    ToastAndroid.show("موجودی کافی نیست", ToastAndroid.SHORT);
  } else {
    // Alert.alert("خطا", "موجودی کافی نیست");
  }
};
////zare_nk_050319_added_end

// type MiddleCountTedadSefrType = {
type addRemBtnsAndCountPackegeType = {
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
    // navigation: Props["navigation"];  ////zare_nk_050315_nokteh(rahe1 baraye taeine noe parametre navigation ke az file digari be componente jari pas dadeh shod)
    navigation: NavigationType;   ////zare_nk_050315_nokteh(rahe2 baraye taeine noe parametre navigation ke az file digari be componente jari pas dadeh shod)
};

 
// export default function AddRemBtnsAndCountPackege({
//     refForfather,
//     fromShowDetails,
//     IdKala,
//     idTag,
//     tedadInSabadOrDet,
//     handlerForAddClick,
//     handlerForRemClick,
//     ForCartContentsDesignType,
//     bishAzMaxTedadYaMojoodi,
//     navigation,   
// }: addRemBtnsAndCountPackegeType) {
const AddRemBtnsAndCountPackege = ({
    refForfather,
    fromShowDetails,
    IdKala,
    idTag,
    tedadInSabadOrDet,
    handlerForAddClick,
    handlerForRemClick,
    ForCartContentsDesignType,
    bishAzMaxTedadYaMojoodi,
    navigation,
}: addRemBtnsAndCountPackegeType) => {
 
    // console.log('ShallowRoutingExample called-MiddleCountTedadSefr-ForCartContentsDesignType: ' + ForCartContentsDesignType);
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
                        ////zare_nk_050316_commented_st
                        // borderWidth: 1,
                        // borderColor: "red",
                        // borderStyle: 'solid',
                        ////zare_nk_050316_commented_end
                        boxShadow: '0px 2px 5px rgba(0,0,0,.2)',  ////zare_nk_050316_added
                        overflow: "hidden",
                        width: 35,  //zare_nk_041127_added
                        // borderRadius: '50%',  //zare_nk_041127_added
                        direction: 'rtl',  //zare_nk_041127_added
                        flexDirection: 'row-reverse',  //zare_nk_041202_added
                        // borderRadius: 17,  ////zare_nk_050316_commented
                        borderRadius: 100,  ////zare_nk_050316_added
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
                                        paddingHorizontal: 4,  ////zare_nk_050316_updated(padde 2 be 4)
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
                                        // height: "80%",
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
                                    //zare_nk_050130_nokteh(ehtemalan age be pedaresh width bedim va be Image resizeMode:'contain' bedim niazi nest height ham 
                                    // bedim(alan ke resizeMode nadadim majboorim baraye inke height ra barnameh pishfarz 0 nakoneh height ham bedim!))
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
                            // flexBasis: '45%',   ////zare_nk_050316_commented
                            flexBasis: 'auto',     ////zare_nk_050316_added
                            // flexDirection: "column",   ////zare_nk_050316_commented
                            ////zare_nk_050316_added_st
                            // display: "flex",
                            // justifyContent: "center",
                            // alignItems: "center",
                            // alignContent: "center",
                            // overflow: "hidden",
                            ////zare_nk_050316_added_end
                        }}
                    >
                        <View
                            style={{
                                height: "100%",
                                ////zare_nk_050316_added_st
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                alignContent: "center",
                                overflow: "hidden",
                                paddingHorizontal: 4,
                                ////zare_nk_050316_added_end  
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
                                        flexGrow: 0,  ////zare_nk_050316_updated(1 to 0)
                                        flexShrink: 0,  ////zare_nk_050316_updated(1 to 0)
                                        flexBasis: 'auto',
                                        // height: "100%",  ////zare_nk_050316_commented
                                        // paddingVertical: 0,  ////zare_nk_050316_commented
                                        // paddingHorizontal: 4,    ////zare_nk_050316_commented
                                        justifyContent: "center",
                                        alignItems: "center",
                                        // borderRadius: "50%",  //zare_nk_041202_commented
                                        // borderRadius: 17,   ////zare_nk_050316_commented
                                        opacity: Number(bishAzMaxTedadYaMojoodi) === 1 ? 0.3 : 1, //zare_nk_041203_added 

                                        display: 'flex',
                                        flexDirection: 'row',
                                        // justifyContent:'center',
                                        // alignItems:'center',
                                        borderRadius: 100,
                                        width: 28,
                                        height: 28,
                                        backgroundColor: "#1b1c1d",
                                    }
                                ]}
                                onPress={() => { handlerForAddClick() }}
                                activeOpacity={0.1}
                            >
                                <Text
                                    style={{
                                        color: "red",
                                        // fontSize: 14,  ////zare_nk_050316_commented
                                        // height: "80%",
                                        // backgroundColor: "blue",
                                        ////zare_nk_041202_commented_st
                                        // padding: 0,
                                        // alignItems: "center",
                                        // justifyContent: "center",
                                        ////zare_nk_041202_commented_end
                                        ////zare_nk_050316_added_st
                                        ...(Number(bishAzMaxTedadYaMojoodi) === 1 && { opacity: 0.3 }),
                                        borderRadius: 100,
                                        width: 20,
                                        height: 20,
                                        ////zare_nk_050316_added_end
                                    }}
                                // className="plussMinus"
                                >
                                    {/* + */}
                                    {/* <SvgUri
                                        uri="https://img.tochikala.com/tochikala/add-to-cart.svg"
                                        width={20}
                                        height={20}
                                    /> */}
                                    <AddToCartTapsiIcon />
                                </Text>
                            </TouchableOpacity>

                        </View>
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
                                        paddingHorizontal: 4,  ////zare_nk_050316_updated(padde 2 be 4)
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
                        ////zare_nk_050316_commented_st
                        // borderWidth: 1,
                        // borderColor: "red",
                        // borderStyle: 'solid',
                        ////zare_nk_050316_commented_end
                        boxShadow: '0px 2px 5px rgba(0,0,0,.2)',  ////zare_nk_050316_added
                        overflow: "hidden",
                        width: "auto",  //zare_nk_041127_added
                        // borderRadius: '50%',  //zare_nk_041127_added
                        direction: 'rtl',  //zare_nk_041127_added
                        flexDirection: 'row-reverse',  //zare_nk_041202_added
                        // borderRadius: 17,  ////zare_nk_050316_commened
                        borderRadius: 100,    ////zare_nk_050316_added
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
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                alignContent: "center",
                                overflow: "hidden",
                                paddingHorizontal: 4,  ////zare_nk_050316_added
                            }}
                        >
                            <TouchableOpacity
                                data-baz="1"
                                style={[
                                    {
                                        //flex: "1 1 auto",
                                        flexGrow: 0,  ////zare_nk_050316_updated(padde 1 be 0)
                                        flexShrink: 0,  ////zare_nk_050316_updated(padde 1 be 0)
                                        flexBasis: 'auto',
                                        // height: "100%",  ////zare_nk_050316_commented
                                        //padding: "0px 2px", 
                                        // paddingVertical: 0,  ////zare_nk_050316_commented
                                        // paddingHorizontal: 4,  ////zare_nk_050316_commented
                                        justifyContent: "center",
                                        alignItems: "center",
                                        // borderRadius: "50%",
                                        // borderRadius: 17,  ////zare_nk_050316_commented
                                        ////zare_nk_050316_added_st
                                        display: 'flex',
                                        flexDirection: 'row',
                                        // justifyContent:'center',
                                        // alignItems:'center',
                                        borderRadius: 100,
                                        width: 28,
                                        height: 28,
                                        backgroundColor: "#e6e9ea",
                                        ////zare_nk_050316_added_end
                                    }
                                ]}
                                onPress={() => { handlerForRemClick(); }}   //be login befresteh dar adtoocart be jaye bazi ba e.preventdefault...
                                activeOpacity={0.1}
                            >
                                <Text
                                    style={{
                                        // height: "80%",  //zare_nk_041202_commented
                                        // backgroundColor: "blue",
                                        ////zare_nk_041202_commented_st
                                        // padding: 0,
                                        // alignItems: "center",
                                        // justifyContent: "center",
                                        ////zare_nk_041202_commented_end
                                        ////zare_nk_050316_added_st
                                        borderRadius: 100,
                                        width: 20,
                                        height: 20,
                                        ////zare_nk_050316_added_end
                                    }}
                                // className="plussMinus"
                                >
                                    {/* <Image
                                        source={{ uri: "https://img.tochikala.com/tochikala/remove-icon.svg" }}
                                        style={{ objectFit: "contain", width: 20, flexDirection: "row" }}
                                    /> */}
                                    {/* <SvgUri
                                        uri="https://img.tochikala.com/tochikala/remove-icon.svg"
                                        width={20}
                                        height={20}
                                    /> */}
                                    <RecycleBinIcon />
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View
                        // className={`middleCount-${IdKala}`}
                        style={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "row",
                            // width: 40, ////zare_nk_050316_commented
                            width: 30, ////zare_nk_050316_added 
                            justifyContent: "center",
                            alignItems: 'center',
                            alignContent: "center",
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
                                paddingHorizontal: 4,  ////zare_nk_050316_added
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
                                        flexGrow: 0,  ////zare_nk_050316_updated(padde 1 be 0)
                                        flexShrink: 0,  ////zare_nk_050316_updated(padde 1 be 0)
                                        flexBasis: 'auto',
                                        // height: "100%",    ////zare_nk_050316_commented
                                        // paddingVertical: 0,  ////zare_nk_050316_commented
                                        // paddingHorizontal: 4,  ////zare_nk_050316_commented
                                        justifyContent: "center",
                                        alignItems: "center",
                                        // borderRadius: "50%",
                                        // borderRadius: 17,  ////zare_nk_050316_commented
                                        opacity: Number(bishAzMaxTedadYaMojoodi) === 1 ? 0.3 : 1, //zare_nk_041203_added 

                                        display: 'flex',
                                        flexDirection: 'row',
                                        // justifyContent:'center',
                                        // alignItems:'center',
                                        borderRadius: 100,
                                        width: 28,
                                        height: 28,
                                        backgroundColor: "#1b1c1d",

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
                                        // backgroundColor: "blue",
                                        ////zare_nk_041202_commented_st
                                        // padding: 0,
                                        // alignItems: "center",
                                        // justifyContent: "center",
                                        ////zare_nk_041202_commented_end
                                        ...(Number(bishAzMaxTedadYaMojoodi) === 1 && { opacity: 0.3 }),

                                        ////zare_nk_050316_added_st
                                        // display:'flex',
                                        // flexDirection:'row',
                                        // justifyContent:'center',
                                        // alignItems:'center',
                                        borderRadius: 100,
                                        width: 20,
                                        height: 20,
                                        ////zare_nk_050316_added_end
                                    }}
                                // className="plussMinus"
                                // disabled={Boolean(Number(bishAzMaxTedadYaMojoodi))}
                                >
                                    {/* <Image
                                        source={{ uri: "https://img.tochikala.com/tochikala/add-to-cart.svg" }}
                                        style={{ objectFit: "contain", width: 20, flexDirection: "row" }}
                                    /> */}
                                    {/* <SvgUri
                                        uri="https://img.tochikala.com/tochikala/add-to-cart.svg"
                                        width={20}
                                        height={20}
                                    /> */}
                                    <AddToCartTapsiIcon />
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
                        ////zare_nk_050316_commented_st
                        // borderWidth: 1,
                        // borderColor: "red",
                        // borderStyle: 'solid',
                        ////zare_nk_050316_commented_end
                        boxShadow: '0px 2px 5px rgba(0,0,0,.2)',  ////zare_nk_050316_added
                        // boxShadow: '0px 2px 5px rgba(255, 0, 0, 0.2)',  ////zare_nk_050316_added

                        overflow: "hidden",
                        width: "auto",  //zare_nk_041127_added
                        // borderRadius: '50%',  //zare_nk_041127_added
                        direction: 'rtl',  //zare_nk_041127_added

                        flexDirection: 'row-reverse',  //zare_nk_041202_added
                        // borderRadius: 17,  ////zare_nk_050316_commened
                        borderRadius: 100,    ////zare_nk_050316_added
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
                                paddingHorizontal: 4,  ////zare_nk_050316_added
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
                                        flexGrow: 0,  ////zare_nk_050316_updated(padde 1 be 0)
                                        flexShrink: 0,  ////zare_nk_050316_updated(padde 1 be 0)
                                        flexBasis: 'auto',
                                        // height: "100%",  ////zare_nk_050316_commented
                                        // paddingVertical: 0,  ////zare_nk_050316_commented
                                        // paddingHorizontal: 4,  ////zare_nk_050316_comemnted
                                        justifyContent: "center",
                                        alignItems: "center",
                                        // borderRadius: "50%",  //zare_nk_041202_comemnted
                                        // borderRadius: 17,  ////zare_nk_050316_commented

                                        ////zare_nk_050316_added_st
                                        display: 'flex',
                                        flexDirection: 'row',
                                        // justifyContent:'center',
                                        // alignItems:'center',
                                        borderRadius: 100,
                                        width: 28,
                                        height: 28,
                                        backgroundColor: "#e6e9ea",
                                        ////zare_nk_050316_added_end
                                    }
                                ]}

                                activeOpacity={0.1}

                                onPress={() => { handlerForRemClick(); }}   //be /login befresteh dar adtoocart be jaye bazi ba e.preventdefault...     //zare_nk_041127_commented                                
                            >
                                <Text
                                    //  title={Number(bishAzMaxTedadYaMojoodi) === 1 ? "موجودی کافی نیست" : ""} 
                                    style={{
                                        // height: "80%",  //zare_nk_041202_commented
                                        // backgroundColor: "white",  ////zare_nk_050316_commented
                                        // backgroundColor: "blue",  ////zare_nk_050316_added
                                        ////zare_nk_041202_commented_st
                                        // padding: 0,
                                        // alignItems: "center",
                                        // justifyContent: "center",
                                        ////zare_nk_041202_commented_end
                                        ////zare_nk_050316_added_st  
                                        borderRadius: 100,
                                        width: 20,
                                        height: 20,
                                        ////zare_nk_050316_added_end
                                    }}
                                // className="plussMinus" 
                                >
                                    {/* <Image
                                        source={{ uri: "https://img.tochikala.com/tochikala/remove-from-cart.svg" }}
                                        style={{ objectFit: "contain", width: 20, flexDirection: "row" }}
                                    /> */}


                                    {/* <SvgUri
                                        uri="https://img.tochikala.com/tochikala/remove-from-cart.svg"
                                        width={20}
                                        height={20}
                                    />   */}
                                    <RemoveFromCartTapsiIcon />
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </View>

                    <View
                        // className={`middleCount-${IdKala}`}
                        style={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "row",
                            // width: 40, ////zare_nk_050316_commented
                            width: 30, ////zare_nk_050316_added 
                            justifyContent: "center",
                            alignItems: 'center',
                            alignContent: "center",
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
                                paddingHorizontal: 4,  ////zare_nk_050316_added
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
                                        flexGrow: 0,
                                        flexShrink: 0,
                                        flexBasis: 'auto',
                                        // height: "100%",  ////zare_nk_050316_commented
                                        // paddingVertical: 0,
                                        // paddingHorizontal: 4,  ////zare_nk_050316_updated(padde 2 be 4)
                                        justifyContent: "center",
                                        alignItems: "center",
                                        // borderRadius: "50%",  //zare_nk_041202_commented
                                        // borderRadius: 17,  //zare_nk_041202_added 
                                        opacity: Number(bishAzMaxTedadYaMojoodi) === 1 ? 0.3 : 1, //zare_nk_041203_added 

                                        // borderWidth: 1,
                                        // borderStyle: 'dashed',
                                        // borderColor: 'blue',

                                        display: 'flex',
                                        flexDirection: 'row',
                                        // justifyContent:'center',
                                        // alignItems:'center',
                                        borderRadius: 100,
                                        width: 28,
                                        height: 28,
                                        backgroundColor: "#1b1c1d",
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
                                        // backgroundColor: "white",  ////zare_nk_050316_commented
                                        // backgroundColor: "blue",  ////zare_nk_050316_added
                                        ////zare_nk_041202_commented_st
                                        // padding: 0,
                                        // alignItems: "center",
                                        // justifyContent: "center",
                                        ////zare_nk_041202_commented_end
                                        ...(Number(bishAzMaxTedadYaMojoodi) === 1 && { opacity: 0.3 }),

                                        // borderWidth: 1,
                                        // borderStyle: 'dashed',
                                        // borderColor: 'red',
                                        ////zare_nk_050316_added_st
                                        // display:'flex',
                                        // flexDirection:'row',
                                        // justifyContent:'center',
                                        // alignItems:'center',
                                        borderRadius: 100,
                                        width: 20,
                                        height: 20,
                                        ////zare_nk_050316_added_end
                                    }}
                                // className="plussMinus"
                                // disabled={Boolean(Number(bishAzMaxTedadYaMojoodi))}
                                >
                                    {/* <Image
                                        source={{ uri: "https://img.tochikala.com/tochikala/add-to-cart.svg" }}
                                        style={{ objectFit: "contain", width: 20, flexDirection: "row" }}
                                    /> */}
                                    {/* <SvgUri
                                        uri="https://img.tochikala.com/tochikala/add-to-cart.svg"
                                        width={28}
                                        height={28}
                                        style={{ 
                                            // borderWidth: 1,
                                            // borderStyle: 'dashed',
                                            // borderColor: 'blue',
                                            // borderRadius:100,
                                        }}
                                    />   */}

                                    {/* <AddToCartIcon width={28} height={28} /> */}
                                    <AddToCartTapsiIcon />

                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

export default memo(AddRemBtnsAndCountPackege);