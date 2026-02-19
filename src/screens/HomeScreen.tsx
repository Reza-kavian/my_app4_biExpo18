// "use client";  
// import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { //zare_nk_041127_added
  View, Text, Image, TouchableOpacity, StyleSheet, ViewStyle, TextStyle, Alert,
  useWindowDimensions,
  StyleProp, Modal, Button, Animated, TextInput,
  Platform, ToastAndroid  //zare_nk_041127_added
} from "react-native";

import { Camera, useCameraDevice, useCodeScanner, useCameraPermission } from "react-native-vision-camera";

import AsyncStorage from "@react-native-async-storage/async-storage";   //zare_nk041128_added
import { NextJsApiUrl, NextJsApiAuthUrl } from "../constants/Urls";   //zare_nk_041128_added
import "bootstrap/dist/css/bootstrap.min.css";
//zare_nk_041130_commented_st
// let cachedBootstrap: typeof import("bootstrap") | null = null;

// import "@/styles/shoppingbasketCss.css";
// import Link from "next/link";  

// async function getBootstrap() {
//   if (!cachedBootstrap) {
//     cachedBootstrap = await import("bootstrap");
//   }
//   return cachedBootstrap;
// }
//zare_nk_041130_commented_end

import { RefObject } from "react";
import { MouseEvent } from "react";
import ReusableButton from "../components/ReusableButton";

////zare_nk_041127_added_st
const showNoStock = () => {
  if (Platform.OS === "android") {
    ToastAndroid.show("موجودی کافی نیست", ToastAndroid.SHORT);
  } else {
    Alert.alert("خطا", "موجودی کافی نیست");
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

export function MiddleCountTedadSefr({
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

  useEffect(() => {
    ////zare_nk_041127_commneted_st
    console.log('refForfather.current iss: ' + refForfather.current);
    // refForfather.current = fromShowDetails
    //   ? "#DetailsInfoCont"
    //   : "#sabadItemsContInSafhe";
    // console.log('041123-MiddleCountTedadSefr called!-refForfather.current: ' + refForfather.current + '-fromShowDetails: ' +
    //   fromShowDetails + '-ForCartContentsDesignType: ' + ForCartContentsDesignType + '-bishAzMaxTedadYaMojoodi: ' + bishAzMaxTedadYaMojoodi);

    // if (ForCartContentsDesignType == 0) {
    //   if (IdKala) {
    //     const ForCartWidth = document.querySelector(
    //       refForfather.current +
    //       " #ForCart-" +
    //       IdKala +
    //       " .input-group"
    //     );
    //     if (ForCartWidth instanceof HTMLElement) {
    //       ForCartWidth.style.width = "35px";
    //     }
    //   }
    // } else if (ForCartContentsDesignType == 1) {
    //   if (IdKala) {
    //     const ForCartWidth = document.querySelector(
    //       refForfather.current +
    //       " #ForCart-" +
    //       IdKala +
    //       " .input-group"
    //     );
    //     if (ForCartWidth instanceof HTMLElement) {
    //       ForCartWidth.style.width = "auto";
    //     }
    //   }
    // } else if (ForCartContentsDesignType == 2) {
    //   if (IdKala) {
    //     const ForCartWidth = document.querySelector(
    //       refForfather.current +
    //       " #ForCart-" +
    //       IdKala +
    //       " .input-group"
    //     );
    //     if (ForCartWidth instanceof HTMLElement) {
    //       ForCartWidth.style.width = "auto";
    //     }
    //   }
    // }
    ////zare_nk_041127_commneted_end
  });

  if (ForCartContentsDesignType == 0) {
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
            width: 35,  //zare_nk_041127_added
            borderRadius: '50%',  //zare_nk_041127_added
            direction: 'rtl'  //zare_nk_041127_added
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

                    //textDecoration: "none",

                    borderRadius: "50%",
                  }
                ]}
                onPress={() => { return navigation.replace('Login'); }}
                activeOpacity={0.1}
              >

                <Text
                  style={{
                    height: "80%",
                    backgroundColor: "white",
                    // border: "none",
                    padding: 0,
                    alignItems: "center",
                    justifyContent: "center",
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
              // flex: "1 1 auto",
              flexGrow: 1,
              flexShrink: 1,
              flexBasis: '45%',
              // display: "flex",
              flexDirection: "column",
            }}
          >
            <Text
              style={{
                height: "100%",
                // border: "none",
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
                    //padding: "0px 2px", 
                    paddingVertical: 0,
                    paddingHorizontal: 2,

                    justifyContent: "center",

                    alignItems: "center",

                    //textDecoration: "none",

                    borderRadius: "50%",
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
                    padding: 0,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                // className="plussMinus"
                >
                  +
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

                    //textDecoration: "none",

                    borderRadius: "50%",
                  }
                ]}
                onPress={() => { return navigation.replace('Login'); }}
                activeOpacity={0.1}
              >

                <Text
                  style={{
                    color: "red",
                    fontSize: 14,
                    height: "80%",
                    backgroundColor: "white",
                    padding: 0,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                // className="plussMinus"
                >
                  <Image
                    source={{ uri: "https://img.tochikala.com/tochikala/add-to-cart.svg" }}
                    style={{ objectFit: "contain", width: 20, flexDirection: "row" }}
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
            borderRadius: '50%',  //zare_nk_041127_added
            direction: 'rtl'  //zare_nk_041127_added
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

                    //textDecoration: "none",

                    borderRadius: "50%",
                  }
                ]}
                onPress={() => { handlerForRemClick(); }}   //be login befresteh dar adtoocart be jaye bazi ba e.preventdefault...
                activeOpacity={0.1}
              >

                <Text
                  style={{
                    height: "80%",
                    backgroundColor: "white",
                    // border: "none",
                    padding: 0,
                    alignItems: "center",
                    justifyContent: "center",
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
              //  display: "flex",
              flexDirection: "column"
            }}
          >
            <Text
              // id={`inp-${IdKala}`}
              // className="text-center titleStyle"
              style={{
                backgroundColor: "white",
                // border: "none",
                // flex: "1 0 40%",
                flexGrow: 1,
                flexShrink: 0,
                flexBasis: '40%',
                width: 40,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
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

                    //textDecoration: "none",

                    borderRadius: "50%",
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
                    height: "80%",
                    backgroundColor: "white",
                    // border: "none",
                    padding: 0,
                    alignItems: "center",
                    justifyContent: "center",
                    ...(Number(bishAzMaxTedadYaMojoodi) === 1 && { opacity: 0.3 }),
                  }}
                // className="plussMinus"
                // disabled={Boolean(Number(bishAzMaxTedadYaMojoodi))}
                >
                  <Image
                    source={{ uri: "https://img.tochikala.com/tochikala/add-to-cart.svg" }}
                    style={{ objectFit: "contain", width: 20, flexDirection: "row" }}
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
            borderRadius: '50%',  //zare_nk_041127_added
            direction: 'rtl'  //zare_nk_041127_added
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
                    borderRadius: "50%",
                  }
                ]}

                activeOpacity={0.1}

                onPress={() => { handlerForAddClick(); }}   //be /login befresteh dar adtoocart be jaye bazi ba e.preventdefault...     //zare_nk_041127_commented                                
              >

                <Text
                  //  title={Number(bishAzMaxTedadYaMojoodi) === 1 ? "موجودی کافی نیست" : ""} 
                  style={{
                    height: "80%",
                    backgroundColor: "white",
                    // border: "none",
                    padding: 0,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                // className="plussMinus" 
                >
                  <Image
                    source={{ uri: "https://img.tochikala.com/tochikala/remove-from-cart.svg" }}
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
              // display: "flex",
              flexDirection: "column"
            }}
          >
            <Text
              // id={`inp-${IdKala}`}
              // className="text-center titleStyle"
              style={{
                backgroundColor: "white",
                // border: "none",
                // flex: "1 0 40%",
                flexGrow: 1,
                flexShrink: 0,
                flexBasis: '40%',
                width: 40,
                // display: "flex",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
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
                    borderRadius: "50%",
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
                    height: "80%",
                    backgroundColor: "white",
                    // border: "none",
                    padding: 0,
                    alignItems: "center",
                    justifyContent: "center",
                    ...(Number(bishAzMaxTedadYaMojoodi) === 1 && { opacity: 0.3 }),
                  }}
                // className="plussMinus"
                // disabled={Boolean(Number(bishAzMaxTedadYaMojoodi))}
                >
                  <Image
                    source={{ uri: "https://img.tochikala.com/tochikala/add-to-cart.svg" }}
                    style={{ objectFit: "contain", width: 20, flexDirection: "row" }}
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
  IdKala: number;
  NameKala: string;
  DarsadTakhfif: string;
  [key: string]: any; //zare_nk_041021_nokteh(yani az IdKala motmaen hastim vali fildhaye digare db ra parsa ina tagheir dadan dar in peroujeh shayad aslan be man nagan va 
  // timi kar nakonim, pas [key: string]: any; gozashtam ke kolli hast)
};

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


  console.log('041123-ShallowRoutingExample called!!');
  // const router = useRouter();  //zare_nk_041128_commented 

  const [ForCartContInProdDetVal, setForCartContInProdDetVal] =
    useState<ForCartContInProdDetValType>();
  const refForfather = useRef<string | null>(null);
  const [bisatrInProductDet, setBisatrInProductDet] = useState(true); //zare_nk_041128_added
  const [addOrRemChanged, setAddOrRemChanged] = useState<string | null>(null); //zare_nk_041130_added
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
  ////zare_nk_041130_commented_st
  // var modal: bootstrap.Modal;
  // async function openprodDetModal(barcodeKala: string) {
  //   const bootstrap = await getBootstrap();
  //   modal = new bootstrap.Modal(document.getElementById("prodDetModal"));
  //   modal.show();
  //   await ShowDetails(barcodeKala);
  // }
  ////zare_nk_041130_commented_end
  ////zare_nk_041130_added_st
  async function openprodDetModal(barcodeKala: string) {
    console.log('ShallowRoutingExample called-openprodDetModal called!!');
    await ShowDetails(barcodeKala);
    setIsOpenedProdDetModal(true);
    // setAddOrRemChanged(null);  //zare_nk_041130_commented(AddOrRemChanged dar in safheh karbord nadareh)
  }
  ////zare_nk_041130_added_end

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

          ////shenasaei va openprodDetModal 
          ShowDetails(code.value);  //okk
          setIsOpenedProdDetModal(true);  //okk
          setAddOrRemChanged(null);  //okk

          break;
        }
      }
    },
  });

  useEffect(() => {
    ////zare_nk_041130_commented_st
    // const seePricesModal = document.getElementById("seePricesModal");
    // const handlerForSeePricesModal = () => {
    //   const input = document.getElementById("manualInputBarcode");
    //   if (input instanceof HTMLInputElement) {
    //     input.value = "";
    //   }
    //   ShowCamera();
    // };
    // if (seePricesModal) {
    //   seePricesModal.addEventListener(
    //     "shown.bs.modal",
    //     handlerForSeePricesModal
    //   );
    // }

    // const mymodalForWarning = document.getElementById("mymodalForWarning");
    // const handlerForMymodalForWarning = () => {
    //   router.refresh(); //zare_nk_040312_added-kolle safhe refresh nemishe va saritar va behtare
    //   //  window.location.reload();  //zare_nk_040312_added-faghat dar sourate niaz vaghti ke router.refresh() javab nadad
    // };
    // if (mymodalForWarning) {
    //   mymodalForWarning.addEventListener(
    //     "hidden.bs.modal",
    //     handlerForMymodalForWarning
    //   );
    // }

    // const handlerForProdDetModal = () => {
    //   const ImageColectionInDetails = document.getElementById(
    //     "ImageColectionInDetails"
    //   );
    //   if (ImageColectionInDetails instanceof HTMLElement)
    //     ImageColectionInDetails.style.display = "none";
    // };
    // const prodDetModal = document.getElementById("prodDetModal");
    // if (prodDetModal) {
    //   prodDetModal.addEventListener("shown.bs.modal", handlerForProdDetModal);
    // }

    // return () => {
    //   // پاکسازی رویداد در unmount 
    //   if (seePricesModal) {
    //     seePricesModal.removeEventListener(
    //       "shown.bs.modal",
    //       handlerForSeePricesModal
    //     ); //zare_nk_040526_added
    //   }

    //   if (mymodalForWarning) {
    //     mymodalForWarning.removeEventListener(
    //       "hidden.bs.modal",
    //       handlerForMymodalForWarning
    //     );
    //   }

    //   if (prodDetModal) {
    //     prodDetModal.removeEventListener(
    //       "shown.bs.modal",
    //       handlerForProdDetModal
    //     );
    //   }
    // };
    ////zare_nk_041130_commented_end
  }, []);

  async function ShowDetails(barcodeKala: any) {
    const token = getCookie("token");
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
    try {
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
          //     spa
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
          ////zare_nk_041130_commented_st
          // const CurrentImg = document.getElementById("CurrentImg");
          // if (CurrentImg instanceof HTMLElement) {
          //   CurrentImg.setAttribute("onLoad", 'event.target.style.height="auto"');
          //   CurrentImg.setAttribute("alt", parsedList[0].NameKala);
          //   CurrentImg.setAttribute(
          //     "src",
          //     `https://img.tochikala.com/Product/${parsedList[0].IdKala}.webp`
          //   );
          // }
          // const nameKalaInDetailsInfoCont = document.getElementById(
          //   "nameKalaInDetailsInfoCont"
          // );
          // if (nameKalaInDetailsInfoCont instanceof HTMLElement) {
          //   nameKalaInDetailsInfoCont.innerText = parsedList[0].NameKala;
          // }
          // const nameBerandInDetailsInfoCont = document.getElementById(
          //   "nameBerandInDetailsInfoCont"
          // );
          // if (nameBerandInDetailsInfoCont) {
          //   nameBerandInDetailsInfoCont.innerText = parsedList[0].NameBerand;
          // }

          // const gheimatMasrafInDetailsInfoCont = document.getElementById(
          //   "gheimatMasrafInDetailsInfoCont"
          // );
          // if (gheimatMasrafInDetailsInfoCont instanceof HTMLElement) {
          //   gheimatMasrafInDetailsInfoCont.innerHTML =
          //     parsedList[0].FeeMasraf.toLocaleString();
          // }

          // const gheimatForooshInDetailsInfoCont = document.getElementById(
          //   "gheimatForooshInDetailsInfoCont"
          // );
          // if (gheimatForooshInDetailsInfoCont instanceof HTMLElement) {
          //   gheimatForooshInDetailsInfoCont.innerHTML =
          //     parsedList[0].FeeForoosh.toLocaleString();
          // }
          // const forDiscountInDetails = document.getElementById(
          //   "forDiscountInDetails"
          // );
          // if (forDiscountInDetails) {
          //   forDiscountInDetails.innerHTML = parsedList[0].DarsadTakhfif;
          // }
          // if (parsedList[0].DarsadTakhfif == 0) {
          //   const darsadTakhfifInDetails = document.getElementById(
          //     "darsadTakhfifInDetails"
          //   );
          //   if (darsadTakhfifInDetails instanceof HTMLElement) {
          //     darsadTakhfifInDetails.style.display = "none";
          //   }
          //   const gheimatMasrafInDetailsInfoCont = document.getElementById(
          //     "gheimatMasrafInDetailsInfoCont"
          //   );
          //   if (gheimatMasrafInDetailsInfoCont instanceof HTMLElement) {
          //     gheimatMasrafInDetailsInfoCont.style.display = "none";
          //   }
          //   const lastDividerInDetails = document.getElementById(
          //     "lastDividerInDetails"
          //   );
          //   if (lastDividerInDetails instanceof HTMLElement) {
          //     lastDividerInDetails.style.display = "none";
          //   }
          //   const DiscountContInDetails = document.getElementById(
          //     "DiscountContInDetails"
          //   );
          //   if (DiscountContInDetails instanceof HTMLElement) {
          //     DiscountContInDetails.style.display = "none";
          //   }
          // } else {
          //   const darsadTakhfifInDetails = document.getElementById(
          //     "darsadTakhfifInDetails"
          //   );
          //   if (darsadTakhfifInDetails instanceof HTMLElement) {
          //     darsadTakhfifInDetails.style.display = "flex";
          //   }
          //   const forDiscountInDetails = document.getElementById(
          //     "forDiscountInDetails"
          //   );
          //   if (forDiscountInDetails instanceof HTMLSpanElement) {
          //     forDiscountInDetails.innerText = parsedList[0].DarsadTakhfif;
          //   }
          //   const gheimatMasrafInDetailsInfoCont = document.getElementById(
          //     "gheimatMasrafInDetailsInfoCont"
          //   );
          //   if (gheimatMasrafInDetailsInfoCont instanceof HTMLElement) {
          //     gheimatMasrafInDetailsInfoCont.style.display = "flex";
          //   }
          //   const lastDividerInDetails = document.getElementById(
          //     "lastDividerInDetails"
          //   );
          //   if (lastDividerInDetails instanceof HTMLElement) {
          //     lastDividerInDetails.style.display = "flex";
          //   }
          //   const DiscountContInDetails = document.getElementById(
          //     "DiscountContInDetails"
          //   );
          //   if (DiscountContInDetails instanceof HTMLElement) {
          //     DiscountContInDetails.style.display = "flex";
          //   }
          // }
          // const groupsInDetailsPageCont = document.getElementById(
          //   "groupsInDetailsPageCont"
          // );
          // if (groupsInDetailsPageCont instanceof HTMLElement) {
          //   groupsInDetailsPageCont.style.display = "none";
          // }
          ////zare_nk_041130_commented_end
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
          // modal?.hide();
          // const bootstrap = await getBootstrap();
          // const mymodalForWarning = new bootstrap.Modal(
          //   document.getElementById("mymodalForWarning")
          // );
          // mymodalForWarning.show();
          // const span = document.querySelector(
          //   "#mymodalForWarning .errorInMymodalForWarning"
          // );
          // if (span instanceof HTMLElement) {
          //   span.innerText = "لطفا ابتدا آنلاین شوید001";
          // }
        }
      }
    } catch (error) {
      setIsOpenedMymodalForWarning(true);
      let WarningText = '';
      if (error instanceof Error) {
        WarningText = error.message
        if (error.message === "Failed to fetch") {
          WarningText = "❌ اتصال اینترنت برقرار نیست یا سرور در دسترس نمی‌باشد";
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

  async function addToCartInIndex(
    addRemParam: addRemParamType,
  ) {
    console.log('041120-addToCartInIndex called!-addRemParam: ' + addRemParam.FeeForoosh);
    // console.log('041120-addToCartInIndex called!-addRemParam: ' + JSON.stringify(addRemParam)); //zare_nk_041120_commented(error mideh:    // console.log('041120-addToCartInIndex called!-addRemParam: ' + JSON.stringify(addRemParam)); //zare_nk_041120_commented_tahlilshe(error mideh:TypeError: Converting circular structure to JSON)
    ////zare_nk_041129_commented_st
    // if (addRemParam.event != null) {
    //     addRemParam.event.stopPropagation();
    //     addRemParam.event.preventDefault();
    // }
    ////zare_nk_041129_commented_end
    const token = getCookie("token");
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
      const token = getCookie("token");
      console.log('041120-addToCartInIndex-tedad: ' + addRemParam.tedadInSabadOrDet + '-zarib: ' + addRemParam.ZaribForoosh + '-TedadOut: ' + TedadOut);

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
        console.log('041120-addToCartInIndex-else 5 IdKala response.ok-data: ' + JSON.stringify(data));
        // setAddOrRemChanged(addRemParam.BarcodeKala + "-" + TedadOut);  //zare_nk_041123_commented
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
          let satrInoInResult = JSON.parse(result.data.satr)[0];
          let Tedad = satrInoInResult.Tedad;
          console.log('041124-result.data.satr[0]Tedad: ' + Tedad);
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
  }

  async function remveFromCartInIndex(
    addRemParam: addRemParamType,
  ) {
    ////zare_nk_041129_commented_st
    // if (addRemParam.event != null) {
    //     addRemParam.event.stopPropagation();
    //     addRemParam.event.preventDefault();
    // }
    ////zare_nk_041129_commented_st
    const token = getCookie("token");
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
      const token = getCookie("token");

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
        console.log('041120-remveFromCartInIndex-else 5 IdKala response.ok-data: ' + JSON.stringify(data));

        var result = data;

        if (result.status == -1000) {
          ////zare_nk_041130_commented_st
          // const inputGroup = document.querySelector(
          //   ".ForCart-" + addRemParam.IdKala + " .input-group"
          // );
          // if (inputGroup) {
          //   let parent = inputGroup.closest(".flxpedar2_new");
          //   if (parent) {
          //     parent.remove();
          //   }
          // }
          // var hisFather = null;
          // let eventCurrentTargetTag;
          // if (addRemParam.event) {
          //   eventCurrentTargetTag = addRemParam.event.currentTarget as HTMLElement;
          // }

          // const hisFatherTag = eventCurrentTargetTag?.closest(".gfForAddRemm");
          // if (hisFatherTag) {
          //   hisFather = hisFatherTag.id;
          // }
          ////zare_nk_041130_commented_st
          refForfather.current = addRemParam.father;
          setIsOpenedMymodalForWarning(true);
          setWarningTextInMymodalForWarning(result.errors[0]);
          // const bootstrap = await getBootstrap();
          // const adameSabteNahaeiModal = new bootstrap.Modal(
          //   document.getElementById("adameSabteNahaeiModal")
          // );
          // adameSabteNahaeiModal.show();
          // const HoshdarInAdameSabteNahaeiModalTag = document.getElementById(
          //   "HoshdarInAdameSabteNahaeiModal"
          // );
          // if (HoshdarInAdameSabteNahaeiModalTag instanceof HTMLElement) {
          //   HoshdarInAdameSabteNahaeiModalTag.innerText = result.errors[0];
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
          // setAddOrRemChanged(addRemParam.BarcodeKala + "-" + TedadOut);  //zare_nk_041123_commented
          let satrInoInResult = JSON.parse(result.data.satr)[0];  //zare_nk_041124_added
          let Tedad = satrInoInResult === undefined ? 0 : satrInoInResult.Tedad;
          console.log('041124-Tedad: ' + Tedad);
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
            // const inputGroup = document.querySelector(
            //   ".ForCart-" + addRemParam.IdKala + " .input-group"
            // );
            // if (inputGroup) {
            //   let parent = inputGroup.closest(".flxpedar2_new");
            //   if (parent) {
            //     if (JSON.parse(result.data.titr).length == 0) {
            //       parent.remove();
            //     }
            //   }
            // }
          }
          else if (Tedad == addRemParam.ZaribForoosh) {
            // let htmlTag;
            // if (addRemParam.event) {
            //   htmlTag = addRemParam.event.target as HTMLElement;
            // }

            // const wrapper = htmlTag?.closest(
            //   ".flxpedar2_new"
            // ) as HTMLElement | null;
            // if (wrapper) {
            //   wrapper.style.backgroundColor = "inherit";
            // }
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
    addToCartInIndex(
      addRemParam
    );
  };

  const handlerForRemClick: (
    addRemParam: addRemParamType,
  ) => void = (addRemParam) => {
    remveFromCartInIndex(
      addRemParam
    );
  };

  if (!device) return <Text style={styles.centerText}>دوربین یافت نشد</Text>; {/*zare_nk_040923(agar doorbin peyda nashod in matn neshan dade mishavad)*/ }
  if (!hasPermission) return <Text style={styles.centerText}>نیاز به دسترسی دوربین</Text>; {/*zare_nk_040923(agar dastresi be doorbin nadashte bashim in matn neshan dade mishavad)*/ }
  const hasTorch = device?.hasTorch ?? false;  //zare_nk_040927_added_st(baraye danestane flash dashtane dastgah)


  ////zare_nk_041128_commented_st
  // async function ManualInputBarcode(
  //   event: React.KeyboardEvent<HTMLInputElement>
  // ) {
  //   const inputElement = event.target as HTMLInputElement;
  //   const tagVal = inputElement.value;
  //   if (
  //     // event.keyCode == 13 &&
  //     event.key === "Enter" && // مدرن‌تر و درست‌تر از keyCode
  //     tagVal.trim().length &&
  //     // event.target.classList.contains("valid") //zare_nk_040408_commented
  //     inputElement.classList.contains("valid")
  //   ) {
  //     let text = parseFloat(tagVal);
  //     const modalElement = document.getElementById("seePricesModal");
  //     if (modalElement) {
  //       const bootstrap = await getBootstrap();
  //       const modal = bootstrap.Modal.getInstance(modalElement);
  //       if (modal) {
  //         modal.hide();
  //       }
  //     }
  //     openprodDetModal(text.toString());
  //   }
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
      // addDetectedToCart(text.toString());  //zare_nk_041130_commented(addDetectedToCart dar in safhe nadarim)
      openprodDetModal(text.toString());  //zare_nk_041130_added(openprodDetModal dar in safhe darim)
    }
  }
  ////zare_nk_041128_added_end

  ////zare_nk_041128_added_end
  ////zare_nk_041130_commented_st
  // const seePrices = async () => {
  //   const token = getCookie("token");
  //   if (token == null) {
  //     window.location.href = "/login";
  //     return;
  //   }
  //   const bootstrap = await getBootstrap();
  //   const modal = new bootstrap.Modal(
  //     document.getElementById("seePricesModal")
  //   );
  //   modal.show();
  // };
  ////zare_nk_041130_commented_end
  ////zare_nk_041130_added_st
  const seePrices = () => {
    const token = getCookie("token");
    if (token == null) {
      // window.location.href = "/login";
      setIsOpenedMymodalForWarning(true);
      setWarningTextInMymodalForWarning("لطفا ابتدا آنلاین شوید");
      return;
    }
    setIsOpenedProdDetModal(false); //zare_nk_040325_nokteh(shayad niaziam nabood!chon baste beshe modalDet setIsOpenedProdDetModal(false) seda zadeh mishe!!)
    setIsOpenedSeePricesModal(true);
    setAddOrRemChanged(null);
  };
  ////zare_nk_041130_added_end

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

            <Button
              title="تأیید"
              onPress={() => {
                setIsOpenedMymodalForWarning(false);
                // setModalVisible(false);
                setScannedValue(null);
                setIsScanning(true);
              }}
            />
          </View>
        </View>
      </Modal>
      {isOpenedProdDetModal == true ? (





        // <div
        //   className="modal px-0"
        //   id="prodDetModal"
        //   style={{ overflow: "hidden" }}
        // >
        //   <div
        //     className="modal-dialog"
        //     style={{
        //       display: "flex",
        //       justifyContent: "center",
        //       height: "100%",
        //       alignItems: "center",
        //     }}
        //   >
        //     <div
        //       className="modal-content"
        //       style={{
        //         borderRadius: "10px",
        //         width: "900px",
        //         flex: "0 0 900px",
        //         maxWidth: "100%",
        //         display: "flex",
        //         flexFlow: "column",
        //         height: "fitContent",
        //         maxHeight: "98vh",
        //         backgroundColor: "#fcfcfc !important",
        //       }}
        //     >
        //       <div
        //         className="modal-header"
        //         style={{ border: "none", padding: "16px 16px 5px 16px" }}
        //       >
        //         <div
        //           style={{
        //             width: "100%",
        //             display: "flex",
        //             flexFlow: "row",
        //             justifyContent: "space-between",
        //           }}
        //         >
        //           <div
        //             className="spanCont"
        //             style={{
        //               fontFamily: "IRANSansWeb_Medium(adad_fa)",
        //               fontSize: "18px",
        //             }}
        //           >
        //             <span>جزئیات محصول</span>
        //           </div>
        //           <div className="h4Cont"></div>
        //           <div
        //             className="buttonCont buttonHover"
        //             style={{
        //               display: "flex",
        //               flexFlow: "row",
        //               alignContent: "center",
        //               alignItems: "center",
        //             }}
        //           >
        //             <span
        //               style={{
        //                 cursor: "pointer",
        //                 padding: "4px",
        //                 borderRadius: "8px",
        //                 border: "1px solid #A5A5A5",
        //                 width: "24px",
        //                 height: "24px",
        //                 display: "flex",
        //                 flexFlow: "row",
        //                 justifyContent: "center",
        //                 alignContent: "center",
        //               }}
        //               data-bs-dismiss="modal"
        //             >
        //               <img src="https://img.tochikala.com/tochikala/close-modal.svg" />
        //             </span>
        //           </div>
        //         </div>
        //       </div>
        //       <div
        //         className="modal-body text-center thinScroll"
        //         style={{ flex: "1 1 auto", display: "flex", flexFlow: "column" }}
        //       >
        //         <div
        //           className="inModalBody"
        //           style={{ display: "flex", flexFlow: "column", height: "100%" }}
        //         >
        //           <div
        //             className="scrollContInModal"
        //             id="prodDetCont"
        //             style={{
        //               flex: "1 1 auto",
        //               display: "flex",
        //               flexFlow: "column",
        //               overflow: "hidden",
        //             }}
        //           >
        //             <div
        //               id="productExist"
        //               style={{
        //                 height: "100%",
        //                 display: "flex",
        //                 justifyContent: "center",
        //                 marginBottom: "30px",
        //               }}
        //             >
        //               <div
        //                 id="DetailsPageCont"
        //                 style={{
        //                   marginTop: "10px",
        //                   overflow: "hidden",
        //                   width: "100%",
        //                   paddingTop: "5px",
        //                   height: "fit-content",
        //                 }}
        //               >
        //                 <div
        //                   id="groupsInDetailsPageCont"
        //                   style={{
        //                     display: "flex",
        //                     flexFlow: "row",
        //                     alignItems: "center",
        //                     fontSize: "14px",
        //                     margin: "0px 10px 10px 0px",
        //                   }}
        //                 ></div>

        //                 <div
        //                   id="DetailsImgAndInfoCont"
        //                   style={{
        //                     paddingLeft: "3px",
        //                     paddingRight: "3px",
        //                     paddingBottom: "3px",
        //                   }}
        //                 >
        //                   <div
        //                     id="ImgAndSwiperCont"
        //                     style={{ marginBottom: "7px", width: "100%" }}
        //                   >
        //                     <div
        //                       id="ImageColectionInDetails"
        //                       className="swiper"
        //                       style={{
        //                         marginLeft: "10px",
        //                         padding: "7px",
        //                         borderRadius: "10px",
        //                         border: "none",
        //                         boxShadow: "0px 0px 3px 0px silver",
        //                         marginRight: "0px",
        //                       }}
        //                     >
        //                       <div className="swiper-wrapper"></div>
        //                       <div className="swiper-pagination"></div>
        //                       <div className="swiper-scrollbar"></div>
        //                     </div>
        //                     <div
        //                       id="CurrentImgCont"
        //                       style={{
        //                         padding: "15px 0px",
        //                         overflow: "hidden",
        //                         borderRadius: "15px 15px 0px 0px",
        //                         position: "relative",
        //                         border: "none",
        //                         boxShadow: "0px 0px 3px 0px silver",
        //                         display: "flex",
        //                         justifyContent: "center",
        //                         backgroundColor: "white",
        //                       }}
        //                     >
        //                       <div
        //                         id="heartContInDetails"
        //                         style={{
        //                           display: "none",
        //                           zIndex: "898",
        //                           cursor: "pointer",
        //                           position: "absolute",
        //                           top: "7px",
        //                           right: "7px",
        //                           fontSize: "100%",
        //                           // backgroundColor: "white",  //zare_nk_040410_commented
        //                           opacity: "0.7",
        //                           backgroundColor: "inherit",
        //                         }}
        //                       >
        //                         <img
        //                           id="heartImgInDetails"
        //                           style={{ width: "32px" }}
        //                           src="https://img.tochikala.com/icon/heart/heart01(0).svg"
        //                           alt="علاقه&zwnj;مندی&zwnj;ها"
        //                         />
        //                       </div>
        //                       <img
        //                         loading="lazy"
        //                         id="CurrentImg"
        //                       ////zare_nk_040522_commented_st
        //                       // style={{ height: "fit-content" }}
        //                       ////zare_nk_040522_commented_end
        //                       />
        //                     </div>
        //                   </div>

        //                   <div
        //                     id="DetailsInfoCont"
        //                     className="hisGrandFather WantCompress"
        //                     style={{
        //                       justifyContent: "space-between",
        //                       backgroundColor: "white",
        //                       padding: "10px",
        //                       borderRadius: "0px 0px 15px 15px",
        //                       boxShadow: "0px 0px 3px 0px silver",
        //                     }}
        //                   >
        //                     <div
        //                       id="titleAndGeoupInDetailsInfoCont"
        //                       style={{
        //                         display: "flex",
        //                         flexFlow: "column",
        //                         width: "100%",
        //                       }}
        //                     >
        //                       <h1
        //                         id="nameKalaInDetailsInfoCont"
        //                         style={{
        //                           fontSize: "16px",
        //                           marginBottom: "30px",
        //                           fontFamily: "IRANSansWeb_Medium(adad_fa)",
        //                           lineHeight: "2.0",
        //                           textOverflow: "ellipsis",
        //                           overflow: "hidden",
        //                           display: "-webkit-box",
        //                           WebkitLineClamp: "2",
        //                           lineClamp: "2",
        //                           WebkitBoxOrient: "vertical",
        //                           textAlign: "right",
        //                         }}
        //                       ></h1>

        //                       <div style={{ display: "flex", flexFlow: "row" }}>
        //                         <div
        //                           style={{
        //                             flex: "1 1 30%",
        //                             display: "flex",
        //                             flexFlow: "column",
        //                             paddingLeft: "5px",
        //                             alignItems: "center",
        //                             color: "#322E2E",
        //                             justifyContent: "space-around",
        //                           }}
        //                         >
        //                           <div
        //                             style={{
        //                               display: "flex",
        //                               flexFlow: "row",
        //                               fontFamily: "IRANSansWeb_Medium(adad_fa)",
        //                               color: "#888888",
        //                             }}
        //                           >
        //                             <span>برند</span>
        //                           </div>
        //                           <div
        //                             style={{
        //                               flex: "0 0 auto",
        //                               display: "flex",
        //                               flexFlow: "row",
        //                               paddingLeft: "5px",
        //                               alignItems: "center",
        //                             }}
        //                           >
        //                             <span id="nameBerandInDetailsInfoCont">
        //                             </span>
        //                           </div>
        //                         </div>
        //                         <div
        //                           style={{
        //                             display: "flex",
        //                             flexFlow: "row",
        //                             alignContent: "center",
        //                             alignItems: "center",
        //                             padding: "0px 8px 0px 8px",
        //                           }}
        //                         >
        //                           <div
        //                             style={{
        //                               width: "0px",
        //                               height: "30px",
        //                               borderLeft: "2px solid silver",
        //                             }}
        //                           ></div>
        //                         </div>
        //                         <div
        //                           style={{
        //                             display: "flex",
        //                             flexFlow: "column",
        //                             flex: "1 1 30%",
        //                             alignItems: "center",
        //                             justifyContent: "space-around",
        //                           }}
        //                         >
        //                           <div
        //                             style={{
        //                               display: "flex",
        //                               flexFlow: "row",
        //                               marginBottom: "10px",
        //                             }}
        //                           >
        //                             <div
        //                               id="gheimatMasrafInDetailsInfoCont"
        //                               className="gheimatMasrafInsabad"
        //                               style={{
        //                                 display: "none",
        //                                 flexFlow: "row",
        //                                 justifyContent: "end",
        //                                 textDecoration: "line-through",
        //                                 fontSize: "14px",
        //                                 alignItems: "center",
        //                               }}
        //                             ></div>
        //                           </div>
        //                           <div
        //                             style={{
        //                               display: "flex",
        //                               flexFlow: "row",
        //                               height: "35px",
        //                               alignContent: "center",
        //                               fontSize: "24px",
        //                             }}
        //                           >
        //                             <div
        //                               id="gheimatForooshInDetailsInfoCont"
        //                               className="gheimatForooshInsabad"
        //                               style={{
        //                                 display: "flex",
        //                                 flexFlow: "row",
        //                                 marginLeft: "5px",
        //                                 alignItems: "center",
        //                                 fontSize: "16px",
        //                               }}
        //                             ></div>
        //                             <div
        //                               className="rialInsabad"
        //                               style={{
        //                                 display: "flex",
        //                                 flexFlow: "row",
        //                                 alignItems: "center",
        //                                 fontSize: "14px",
        //                               }}
        //                             >
        //                               ریال
        //                             </div>
        //                           </div>
        //                         </div>
        //                         <div
        //                           id="lastDividerInDetails"
        //                           style={{
        //                             display: "flex",
        //                             flexFlow: "row",
        //                             alignContent: "center",
        //                             alignItems: "center",
        //                             padding: "0px 8px 0px 8px",
        //                           }}
        //                         >
        //                           <div
        //                             style={{
        //                               width: "0px",
        //                               height: "30px",
        //                               borderLeft: "2px solid silver",
        //                             }}
        //                           ></div>
        //                         </div>
        //                         <div
        //                           id="DiscountContInDetails"
        //                           style={{
        //                             display: "flex",
        //                             flexFlow: "column",
        //                             flex: "1 1 30%",
        //                             alignItems: "center",
        //                             justifyContent: "space-around",
        //                           }}
        //                         >
        //                           <div
        //                             style={{
        //                               display: "flex",
        //                               flexFlow: "row",
        //                               marginBottom: "10px",
        //                               width: "100%",
        //                               justifyContent: "center",
        //                             }}
        //                           >
        //                             <div
        //                               id="darsadTakhfifInDetails"
        //                               className="darsadTakhfifInDetails"
        //                               style={{
        //                                 backgroundColor: "red",
        //                                 flex: "0 0 auto",
        //                                 display: "none",
        //                                 justifyContent: "center",
        //                                 alignItems: "center",
        //                                 marginLeft: "15px",
        //                                 borderRadius: "15px",
        //                                 width: "100%",
        //                                 maxWidth: "70px",
        //                                 height: "50px",
        //                               }}
        //                             >
        //                               <span
        //                                 style={{
        //                                   color: "white",
        //                                   opacity: "1",
        //                                   fontSize: "18px",
        //                                 }}
        //                               >
        //                                 %
        //                               </span>
        //                               <span
        //                                 id="forDiscountInDetails"
        //                                 className="forDiscount"
        //                                 style={{
        //                                   color: "white",
        //                                   opacity: "1",
        //                                   fontSize: "18px",
        //                                 }}
        //                               ></span>
        //                             </div>
        //                           </div>
        //                         </div>
        //                       </div>
        //                     </div>
        //                     <div
        //                       id="CartAndPriceInDetailsInfoCont"
        //                       style={{
        //                         display: "flex",
        //                         flexFlow: "column",
        //                         width: "100%",
        //                         marginTop: "10px",
        //                         paddingRight: "20px",
        //                       }}
        //                     >
        //                       <div
        //                         id="InCartAndPriceInDetailsInfoCont"
        //                         style={{
        //                           width: "100%",
        //                           display: "flex",
        //                           flexFlow: "row",
        //                           justifyContent: "space-between",
        //                         }}
        //                       >
        //                         <div
        //                           id="ForCartContInProdDet"
        //                           style={{
        //                             display: "flex",
        //                             flexFlow: "column",
        //                             justifyContent: "end",
        //                           }}
        //                         >

        //                           {/* <MiddleCountTedadSefr
        //                             refForMiddleCount={refForMiddleCount}
        //                             IdKala={
        //                               ForCartContInProdDetVal
        //                                 ? (ForCartContInProdDetVal as any).IdKala
        //                                 : null
        //                             }
        //                             ForCartContentsDesignType={
        //                               ForCartContInProdDetVal
        //                                 ? (ForCartContInProdDetVal as any)
        //                                   .ForCartContentsDesignType
        //                                 : null
        //                             }
        //                             refForfather={refForfather}
        //                             refForParsedList={refForParsedList} 
        //                             handlerForAddClick={(e) => {
        //                               handlerForAddClick(
        //                                 ForCartContInProdDetVal
        //                                   ? (ForCartContInProdDetVal as any)
        //                                     .TedadOut
        //                                   : null,

        //                                 0,
        //                                 BarcodeKala,  
        //                                 e
        //                               );
        //                             }}

        //                             handlerForRemClick={(e) => {
        //                               return handlerForRemClick(
        //                                 ForCartContInProdDetVal
        //                                   ? (ForCartContInProdDetVal as any)
        //                                     .TedadOut
        //                                   : null,
        //                                 BarcodeKala, 
        //                                 e
        //                               );
        //                             }}
        //                             TedadOut={
        //                               ForCartContInProdDetVal
        //                                 ? (ForCartContInProdDetVal as any)
        //                                   .TedadOut
        //                                 : null
        //                             }
        //                             ForCartContInProdDetVal={
        //                               ForCartContInProdDetVal
        //                             }
        //                             idTag={
        //                               ForCartContInProdDetVal
        //                                 ? (ForCartContInProdDetVal as any).idTag
        //                                 : null
        //                             }
        //                             refForInputGroup={refForInputGroup}
        //                           /> */}

        //                           {ForCartContInProdDetVal != null && (
        //                             <MiddleCountTedadSefr
        //                               refForfather={ForCartContInProdDetVal.refForfather}
        //                               fromShowDetails={ForCartContInProdDetVal.fromShowDetails}
        //                               IdKala={ForCartContInProdDetVal.IdKala}
        //                               idTag={ForCartContInProdDetVal.idTag}
        //                               tedadInSabadOrDet={ForCartContInProdDetVal.tedadInSabadOrDet}

        //                               handlerForAddClick={(e) => {
        //                                 return handlerForAddClick(
        //                                   {
        //                                     tedadInSabadOrDet: ForCartContInProdDetVal.tedadInSabadOrDet,
        //                                     ZaribForoosh: ForCartContInProdDetVal.ZaribForoosh,
        //                                     IdKala: ForCartContInProdDetVal.IdKala,
        //                                     NameKala: ForCartContInProdDetVal.NameKala,
        //                                     DarsadTakhfif: ForCartContInProdDetVal.DarsadTakhfif,
        //                                     NameBerand: ForCartContInProdDetVal.NameBerand,  //zare_nk_041118_nokteh(dar api selectKalaShobeh NameBerand dar pasokh hast pas ma meghdaresh ro dadim)
        //                                     FeeForoosh: ForCartContInProdDetVal.FeeForoosh,
        //                                     FeeMasraf: ForCartContInProdDetVal.FeeMasraf,
        //                                     BarcodeKala: ForCartContInProdDetVal.BarcodeKala,
        //                                     Mojoodi: ForCartContInProdDetVal.Mojoodi,
        //                                     MaxTedad: ForCartContInProdDetVal.MaxTedad,
        //                                     father: refForfather.current,
        //                                     bishAzMaxTedadYaMojoodi: ForCartContInProdDetVal.bishAzMaxTedadYaMojoodi,
        //                                     fromShowDetails: true,
        //                                     event: e,
        //                                   }
        //                                 );
        //                               }}
        //                               handlerForRemClick={(e) => {
        //                                 return handlerForRemClick(
        //                                   {
        //                                     tedadInSabadOrDet: ForCartContInProdDetVal.tedadInSabadOrDet,
        //                                     ZaribForoosh: ForCartContInProdDetVal.ZaribForoosh,
        //                                     IdKala: ForCartContInProdDetVal.IdKala,
        //                                     NameKala: ForCartContInProdDetVal.NameKala,
        //                                     DarsadTakhfif: ForCartContInProdDetVal.DarsadTakhfif,
        //                                     NameBerand: ForCartContInProdDetVal.NameBerand,  //zare_nk_041118_nokteh(dar api selectKalaShobeh NameBerand dar pasokh hast pas ma meghdaresh ro dadim)
        //                                     FeeForoosh: ForCartContInProdDetVal.FeeForoosh,
        //                                     FeeMasraf: ForCartContInProdDetVal.FeeMasraf,
        //                                     BarcodeKala: ForCartContInProdDetVal.BarcodeKala,
        //                                     Mojoodi: ForCartContInProdDetVal.Mojoodi,
        //                                     MaxTedad: ForCartContInProdDetVal.MaxTedad,
        //                                     father: refForfather.current,
        //                                     bishAzMaxTedadYaMojoodi: ForCartContInProdDetVal.bishAzMaxTedadYaMojoodi,
        //                                     fromShowDetails: true,
        //                                     event: e,
        //                                   }
        //                                 );
        //                               }}
        //                               ForCartContentsDesignType={ForCartContInProdDetVal.ForCartContentsDesignType}
        //                               bishAzMaxTedadYaMojoodi={ForCartContInProdDetVal.bishAzMaxTedadYaMojoodi}
        //                             />
        //                           )}

        //                         </div>
        //                       </div>
        //                     </div>
        //                   </div>

        //                   <div id="imgzoomed"></div>
        //                 </div>

        //                 <div
        //                   id="navContInDetCont"
        //                   style={{
        //                     display: "none",
        //                     flexFlow: "column",
        //                     borderBottom: "1px solid #E7E7E0",
        //                     padding: "0px 0px 0px 0px",
        //                   }}
        //                 >
        //                   <div className="navContInDet">
        //                     <ul className="nav nav-tabs" role="tablist">
        //                       <li
        //                         className="nav-item"
        //                         style={{ borderBottom: "2px solid red" }}
        //                       >
        //                         <a
        //                           className="nav-link active"
        //                           data-bs-toggle="tab"
        //                           href="#home"
        //                           style={{ color: "inherit" }}
        //                         >
        //                           ویژگی کالا
        //                         </a>
        //                       </li>
        //                       <li className="nav-item">
        //                         <a
        //                           className="nav-link"
        //                           data-bs-toggle="tab"
        //                           href="#menu1"
        //                           style={{ color: "inherit" }}
        //                         >
        //                           جزئیات کالا
        //                         </a>
        //                       </li>
        //                       <li
        //                         className="nav-item"
        //                         style={{ display: "none" }}
        //                       >
        //                         <a
        //                           className="nav-link"
        //                           data-bs-toggle="tab"
        //                           href="#menu2"
        //                           style={{ color: "inherit" }}
        //                         >
        //                           Menu 2
        //                         </a>
        //                       </li>
        //                     </ul>
        //                     <div
        //                       className="tab-content"
        //                       style={{ color: "#545454" }}
        //                     >
        //                       <div
        //                         id="home"
        //                         className="containerr tab-pane active"
        //                       >
        //                         <div
        //                           style={{
        //                             display: "flex",
        //                             flexFlow: "row",
        //                             justifyContent: "center",
        //                             justifyItems: "center",
        //                             alignContent: "center",
        //                             padding: "10px 0px",
        //                           }}
        //                         >
        //                           <p style={{ margin: "0px" }}>
        //                             ویژگی برای این محصول وجود ندارد
        //                           </p>
        //                         </div>
        //                       </div>
        //                       <div
        //                         id="menu1"
        //                         className="containerr tab-pane fade"
        //                       >
        //                         <div
        //                           id="ProductDescription"
        //                           style={{
        //                             marginTop: "15px",
        //                             flexFlow: "column",
        //                             position: "relative",
        //                             paddingBottom: "48px",
        //                           }}
        //                         >
        //                           <div
        //                             id="contentContInProdDes"
        //                             style={{
        //                               marginBottom: "10px",
        //                               display: "flex",
        //                               flexFlow: "column",
        //                               maxHeight: "120px",
        //                               overflow: "hidden",
        //                             }}
        //                           ></div>
        //                           <div
        //                             style={{
        //                               display: "flex",
        //                               flexFlow: "column",
        //                               position: "absolute",
        //                               right: "10px",
        //                               bottom: "10px",
        //                             }}
        //                           >
        //                             <a
        //                               id="bishtarInProdDes"
        //                               className="buttonHover"
        //                               href="#ProductDescription"
        //                               style={{
        //                                 padding: "10px",
        //                                 borderRadius: "7px",
        //                                 display: "flex",
        //                                 flexFlow: "row",
        //                                 textDecoration: "none",
        //                                 color: "rgb(2, 160, 164)",
        //                                 backgroundColor: "inherit",
        //                               }}
        //                             >
        //                               <div
        //                                 style={{
        //                                   flex: "0 0 auto",
        //                                   display: "flex",
        //                                   flexFlow: "row",
        //                                   paddingLeft: "5px",
        //                                   alignItems: "center",
        //                                 }}
        //                               >
        //                                 <span id="TextInBishtarInProdDes">
        //                                   نمایش بیشتر{" "}
        //                                 </span>
        //                               </div>
        //                               <div
        //                                 style={{
        //                                   display: "flex",
        //                                   flexFlow: "column",
        //                                   justifyContent: "center",
        //                                 }}
        //                               >
        //                                 <div
        //                                   className="rounded-pill"
        //                                   style={{
        //                                     display: "flex",
        //                                     flexFlow: "row",
        //                                     backgroundColor: "inherit",
        //                                   }}
        //                                 >
        //                                   <img
        //                                     src="https://img.tochikala.com/tochikala/left-arrow.svg"
        //                                     style={{ width: "15px" }}
        //                                     alt="نمایش بیشتر"
        //                                   />
        //                                 </div>
        //                               </div>
        //                             </a>
        //                           </div>
        //                         </div>
        //                       </div>
        //                       <div
        //                         id="menu2"
        //                         className="containerr tab-pane fade"
        //                       >
        //                         salam menu2
        //                       </div>
        //                     </div>
        //                   </div>
        //                 </div>
        //               </div>
        //             </div>
        //             <div
        //               id="productNotExist"
        //               style={{
        //                 height: "100%",
        //                 display: "none",
        //                 justifyContent: "center",
        //                 marginBottom: "30px",
        //                 color: "red",
        //                 fontFamily: "IRANSansWeb_Medium(adad_fa)",
        //               }}
        //             >
        //               کالای مورد نظر یافت نشد
        //             </div>
        //           </div>
        //         </div>
        //       </div>
        //     </div>
        //   </div>
        // </div>
        <Modal   //zare_nk_040923(komponent modal baraye namayesh doorbin va scan kardan)
          visible={isOpenedProdDetModal}    //zare_nk_040923(halat namayesh modal)
          animationType="slide"  //zare_nk_040923(ta'sir gozashtan rooye namayesh modal)  //ye bar fade bezaram bebinam chi mishe!
          onRequestClose={() => {
            ////zare_nk_041128_nokteh(moadele methode hiddenHandlerForProdDetModal)
            setIsOpenedProdDetModal(false);
            // setAddOrRemChanged("notNull");  //zare_nk_041130_commented(AddOrRemChanged dar in safhe karbord nadare)
            setBisatrInProductDet(false);
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
                                fontFamily: "IRANSansWeb_Medium(adad_fa)",
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
                                <Text style={{ fontFamily: "IRANSansWeb_Medium(adad_fa)", color: "#888888", }}>برند</Text>
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
                                      borderLeftWidth: 1,
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
                  <Text style={{ color: "red", fontFamily: "IRANSansWeb_Medium(adad_fa)", }}> کالای مورد نظر یافت نشد</Text>
                </View>
              </View>
            </View>

            {/* div span */}
            {/* zare_nk_041128_added_end */}
          </View>
        </Modal>
      ) : isOpenedSeePricesModal == true ? (

        //  <div
        //         className="modal px-0"
        //         id="seePricesModal"
        //         style={{ overflow: "hidden" }}
        //       >
        //         <div
        //           className="modal-dialog"
        //           style={{ display: "flex", justifyContent: "center", height: "100%" }}
        //         >
        //           <div
        //             className="modal-content"
        //             style={{
        //               borderRadius: "10px",
        //               width: "900px",
        //               flex: "0 0 900px",
        //               maxWidth: "100%",
        //               display: "flex",
        //               flexFlow: "column",
        //               height: "fit-content",
        //               maxHeight: "98vh",
        //               backgroundColor: "#fcfcfc !important",
        //             }}
        //           >
        //             <div
        //               className="modal-header"
        //               style={{ border: "none", padding: "6px 16px 5px 16px" }}
        //             >
        //               <div
        //                 style={{
        //                   width: "100%",
        //                   display: "flex",
        //                   flexFlow: "row-reverse",
        //                   justifyContent: "space-between",
        //                 }}
        //               >
        //                 <div
        //                   className="spanCont"
        //                   style={{
        //                     fontFamily: "IRANSansWeb_Medium(adad_fa)",
        //                     fontSize: "18px",
        //                   }}
        //                 >
        //                   <span className="valueStyle">اسکن بارکد</span>
        //                 </div>
        //                 <div className="h4Cont"></div>
        //                 <div
        //                   className="buttonCont buttonHover"
        //                   style={{
        //                     display: "flex",
        //                     flexFlow: "row",
        //                     alignContent: "center",
        //                     alignItems: "center",
        //                   }}
        //                 >
        //                   <span
        //                     style={{
        //                       cursor: "pointer",
        //                       padding: "4px",
        //                       borderRadius: "8px",
        //                       border: "1px solid #A5A5A5",
        //                       width: "24px",
        //                       height: "24px",
        //                       display: "flex",
        //                       flexFlow: "row",
        //                       justifyContent: "center",
        //                       alignContent: "center",
        //                     }}
        //                     data-bs-dismiss="modal"
        //                   >
        //                     <img src="https://img.tochikala.com/tochikala/close-modal.svg" />
        //                   </span>
        //                 </div>
        //               </div>
        //             </div>
        //             <div
        //               className="modal-body text-center thinScroll"
        //               style={{
        //                 flex: "1 1 auto",
        //                 display: "flex",
        //                 flexFlow: "column",
        //                 paddingTop: "0px",
        //               }}
        //             >
        //               <div
        //                 className="inModalBody"
        //                 style={{ display: "flex", flexFlow: "column", height: "100%" }}
        //               >
        //                 <div
        //                   className="scrollContInModal"
        //                   id="seePricesCont"
        //                   style={{
        //                     flex: "1 1 auto",
        //                     display: "flex",
        //                     flexFlow: "column",
        //                     overflow: "hidden",
        //                   }}
        //                 >
        //                   <div
        //                     style={{
        //                       height: "100%",
        //                       display: "flex",
        //                       justifyContent: "center",
        //                       marginBottom: "30px",
        //                     }}
        //                   >
        //                     <video
        //                       id="videoForzxing"
        //                       style={{
        //                         width: "640px",
        //                         maxWidth: "100%",
        //                         borderRadius: "10px",
        //                       }}
        //                     ></video>
        //                   </div>
        //                   <div
        //                     className="contAndHoshdarCont"
        //                     style={{
        //                       flex: "1 1 auto",
        //                       display: "flex",
        //                       flexFlow: "column",
        //                     }}
        //                   >
        //                     <div
        //                       className="cont"
        //                       style={{
        //                         position: "relative",
        //                         width: "100%",
        //                         display: "flex",
        //                         flexFlow: "row",
        //                         justifyContent: "center",
        //                         justifyItems: "center",
        //                         alignContent: "center",
        //                         alignItems: "center",
        //                       }}
        //                     >
        //                       <div
        //                         className="labelcreator absol"
        //                         style={{ flex: "0 0 auto" }}
        //                       >
        //                         <span className="valueStyle" style={{ width: "100%" }}>
        //                           بارکد دستی
        //                         </span>
        //                       </div>
        //                       <div style={{ flex: "1 1 auto" }}>
        //                         <input
        //                           className="textcreator form-control MatnInput valid" //zare_nk_040304(valid ra pack konam)
        //                           style={{ width: "100%" }}
        //                           id="manualInputBarcode"
        //                           name="manualInputBarcode"
        //                           type="text"
        //                           onKeyDown={(event) => {
        //                             return ManualInputBarcode(event);
        //                           }}
        //                         />
        //                       </div>
        //                     </div>
        //                     <div>
        //                       <span
        //                         className="forError forErrorFormanualBarcode"
        //                         style={{
        //                           width: "100%",
        //                           display: "flex",
        //                           flexFlow: "row",
        //                           fontSize: "14px",
        //                           color: "red",
        //                         }}
        //                       ></span>
        //                     </div>
        //                   </div>
        //                 </div>
        //               </div>
        //             </div>
        //           </div>
        //         </div>
        //       </div>
        <Modal   //zare_nk_040923(komponent modal baraye namayesh doorbin va scan kardan)
          visible={isOpenedSeePricesModal}    //zare_nk_040923(halat namayesh modal)
          animationType="slide"     //zare_nk_040923(ta'sir gozashtan rooye namayesh modal)  //ye bar fade bezaram bebinam chi mishe!
          onRequestClose={() => setIsOpenedSeePricesModal(false)}   //zare_nk_040923(agar karbar dokmeye back android ra zad modal baste shavad)
        >
          {/*zare_nk_040923(konteyner dakhele modal)*/}
          <View style={[styles.modalContainer, { overflow: "hidden" }]}>
            <Camera //zare_nk_040923(komponent doorbin)
              style={StyleSheet.absoluteFill}
              device={device}      //zare_nk_040923(moshakhas kardan doorbin estefade shode)
              isActive={isOpenedSeePricesModal}    //zare_nk_040923(faghat vaghti modal baz ast doorbin faal bashad)
              codeScanner={codeScanner}  //zare_nk_040923(seda zadane tabee codeScanner baraye scan kardan code ha)
              enableZoomGesture={true}   //zare_nk_040923(ghabeleiat zoome kardan ba do angosht be doorbin)
              torch={hasTorch ? torch : 'off'}  //zare_nk_040927_added(age dastgah flash dasht vaziate feliye off ya on boodane torch lahaz beshe,vagarna hamishe off)
            />
            {/*zare_nk_040923(baraye namayesh kadr rahnama)*/}
            <View style={styles.overlay}>
              {/*zare_nk_040923(kadre rahnama baraye gharar dadane barcode dar an(tookhali))*/}
              {/*<View style={styles.scanFrame} />*/}
              {/*zare_nk_041003_added_st(kadre rahnama baraye gharar dadane barcode dar an(haviye khatte pareshkon))*/}
              <View style={styles.scanFrame}>
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
                            outputRange: [0, 230], // ارتفاع فریم - ضخامت خط  //zare_nk_04107_nokteh(range UI ke bar asase pixel hast)
                          }),
                        },
                      ],
                    },
                  ]}
                />
              </View>
              {/*zare_nk_041003_added_end(kadre rahnama baraye gharar dadane barcode dar an(haviye khatte pareshkon))*/}
              {/*zare_nk_041003_added_st(kadre rahnama baraye gharar dadane barcode dar an(haviye khatte cheshmakzan))*/}
              {/* <View style={styles.scanFrame}>
              <Animated.View
                style={[
                  styles.scanLine,
                  { opacity: blinkAnim }  // چشمک زدن
                ]}
              />
            </View> */}
              {/*zare_nk_041003_added_end(kadre rahnama baraye gharar dadane barcode dar an(haviye khatte cheshmakzan))*/}
              {/*zare_nk_040923(matni baraye rahnamayi karbar)*/}
              <Text style={styles.text}>بارکد را در کادر قرار دهید</Text>
              {/*zare_nk_040923(dokmeye baraye baste shodan modal)*/}
              {/* zare_nk_041007_commented(baraye jaygoziniye button ba ReusableButton) */}
              {/* <Button title="بستن" color="red" onPress={() => setIsOpenedSeePricesModal(false)} /> */}
              {/* zare_nk_041007_added(baraye jaygoziniye button ba ReusableButton) */}
              <ReusableButton
                title="بستن"
                onPress={() => setIsOpenedSeePricesModal(false)}
                backgroundColor="red"
                textColor="white"
                width={250}
              />

              {/*zare_nk_040926(baraye off va on kardane flash,albate age dastgah flash nadash dokmeh neshoon nadeh)*/}
              {hasTorch && (
                <ReusableButton
                  title={torch === 'on' ? 'فلش خاموش' : 'فلش روشن'}
                  onPress={() => setTorch(p => (p === 'on' ? 'off' : 'on'))}
                  backgroundColor="green"
                  textColor="white"
                  width={250}
                />
              )}
            </View>

            {/* zare_nk_041128_added_st */}
            <View
              // className="contAndHoshdarCont"
              style={{
                // flex: "1 1 auto",
                flexGrow: 1,
                flexShrink: 1,
                flexBasis: 'auto',
                // display: "flex",
                flexDirection: "column",
              }}
            >
              <View
                // id="productNotExist"
                style={{
                  height: "100%",
                  display: "none",
                  justifyContent: "center",
                  marginBottom: 30,
                }}
              >
                <Text style={{ color: "red", fontFamily: "IRANSansWeb_Medium(adad_fa)", }}> کالای مورد نظر یافت نشد</Text>
              </View>

              <View
                // className="cont"
                style={{
                  position: "relative",
                  width: "100%",
                  // display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  // justifyItems: "center",
                  // alignContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  // className="labelcreator absol"
                  style={{
                    // flex: "0 0 auto"
                    flexGrow: 0,
                    flexShrink: 0,
                    flexBasis: 'auto',
                  }}
                >
                  <Text
                    //  className="valueStyle"
                    style={{
                      width: "100%"
                    }}>
                    بارکد دستی
                  </Text>
                </View>
                <View style={{
                  // flex: "1 1 auto"
                  flexGrow: 1,
                  flexShrink: 1,
                  flexBasis: 'auto',
                }}>
                  {/* <input
                                className="textcreator form-control MatnInput valid" //zare_nk_040304(valid ra pack konam)
                                style={{ width: "100%" }}
                                id="manualInputBarcode"
                                name="manualInputBarcode"
                                type="text"
                                onKeyDown={(event) => {
                                    return ManualInputBarcode(event);
                                }}
                            /> */}

                  <TextInput
                    placeholder="باردکد دستی"
                    value={manualBarcode}
                    onChangeText={setManualBarcode}
                    onSubmitEditing={() => {
                      ManualInputBarcode(manualBarcode);
                    }}

                    // onChangeText={(text) => {
                    //   setManualBarcode(text);
                    //   ManualInputBarcode(text);
                    // }}

                    style={styles.input}
                    returnKeyType="done"
                  />

                </View>
              </View>

              <View>
                <Text
                  // className="forError forErrorFormanualBarcode"
                  style={{
                    width: "100%",
                    // display: "flex",
                    flexDirection: "row",
                    fontSize: 14,
                    color: "red",
                  }}
                ></Text>
              </View>
            </View>
            {/* zare_nk_041128_added_end */}
          </View>
        </Modal>
      ) : (

        <div style={{ display: "flex", flexFlow: "column", direction: "rtl" }}>
          <div
            id="SubprogramsCont"
            style={{
              display: "flex",
              flexFlow: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <div
              id="Subprograms-1"
              className="Subprograms"
              style={{
                display: "flex",
                flexFlow: "row",
              }}
            >
              <Link
                className="vorsab"
                href="/shoppingbasket"
                style={{
                  width: "100%",
                  display: "flex",
                  flexFlow: "row",
                  justifyContent: "space-between",
                  padding: "15px",
                  outline: "none",
                  alignItems: "center",
                  // border: "1px solid #E7E7E7",
                  // boxShadow: "#D7D6D6 0px 0px 2px 0px",
                  border: "1px solid #a9a9a9",
                  boxShadow: "#5e5e5e 0px 0px 3px 0px",
                  borderRadius: "25px",
                  backgroundColor: "white",
                  overflow: "hidden",
                }}
              >
                <div
                  className="imgAndTextInSubprograms"
                  style={{ display: "flex" }}
                >
                  <div
                    className="roundedPillsCont"
                    style={{
                      display: "flex",
                      flexFlow: "column",
                      width: "fit-content",
                    }}
                  >
                    <div
                      className="rounded-pill"
                      style={{
                        display: "flex",
                        flexFlow: "row",
                        border: "1px solid #E7E7E7",
                        padding: "10px",
                        borderRadius: "50%",
                      }}
                    >
                      <img
                        style={{ width: "64px" }}
                        src="/images/Subprograms/superMarket.png"
                        alt="هایپر&zwnj;کرفو"
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexFlow: "column",
                      justifyContent: "space-around",
                      width: "fit-content",
                    }}
                  >
                    <div
                      style={{
                        flex: "0 0 auto",
                        display: "flex",
                        flexFlow: "row",
                      }}
                    >
                      <span className="titleStyle">سبد خرید</span>
                    </div>
                    <div
                      style={{ flexFlow: "row", fontSize: "75%" }}
                      className="decsInSubprograms"
                    >
                      <div style={{ display: "flex", flexFlow: "row" }}>
                        <span className="valueStyle">
                          امکان مشاهده و ویرایش سبد خرید
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="leftArrowInSubprograms"
                  style={{ flexFlow: "row" }}
                >
                  <img
                    style={{ width: "20px" }}
                    src="https://img.tochikala.com/tochikala/left-arrow-03.svg"
                    alt="بزن بریم"
                  />
                </div>
              </Link>
            </div>

            <div
              id="Subprograms-2"
              className="Subprograms"
              style={{
                display: "flex",
                flexFlow: "row",
              }}
            >
              <Link
                onClick={seePrices}
                className="vorsab"
                href="#"
                style={{
                  width: "100%",
                  display: "flex",
                  flexFlow: "row",
                  justifyContent: "space-between",
                  padding: "15px",
                  outline: "none",
                  alignItems: "center",
                  // border: "1px solid #E7E7E7",
                  // boxShadow: "#D7D6D6 0px 0px 2px 0px",
                  border: "1px solid #a9a9a9",
                  boxShadow: "#5e5e5e 0px 0px 3px 0px",
                  borderRadius: "25px",
                  backgroundColor: "white",
                  overflow: "hidden",
                }}
              >
                <div
                  className="imgAndTextInSubprograms"
                  style={{ display: "flex" }}
                >
                  <div
                    className="roundedPillsCont"
                    style={{
                      display: "flex",
                      flexFlow: "column",
                      width: "fit-content",
                    }}
                  >
                    <div
                      className="rounded-pill"
                      style={{
                        display: "flex",
                        flexFlow: "row",
                        border: "1px solid #E7E7E7",
                        padding: "10px",
                        borderRadius: "50%",
                      }}
                    >
                      <img
                        style={{ width: "64px" }}
                        src="/images/Subprograms/checklist.png"
                        alt="هایپر&zwnj;کرفو"
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexFlow: "column",
                      justifyContent: "space-around",
                      width: "fit-content",
                    }}
                  >
                    <div
                      style={{
                        flex: "0 0 auto",
                        display: "flex",
                        flexFlow: "row",
                      }}
                    >
                      <span className="titleStyle">مشاهده قیمت ها</span>
                    </div>
                    <div
                      style={{ flexFlow: "row", fontSize: "75%" }}
                      className="decsInSubprograms"
                    >
                      <div style={{ display: "flex", flexFlow: "row" }}>
                        <span className="valueStyle">
                          مشاهده اطلاعات کالا با اسکن بارکد
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="leftArrowInSubprograms"
                  style={{ flexFlow: "row" }}
                >
                  <img
                    style={{ width: "20px" }}
                    src="https://img.tochikala.com/tochikala/left-arrow-03.svg"
                    alt="بزن بریم"
                  />
                </div>
              </Link>
            </div>

            <div
              id="Subprograms-3"
              className="Subprograms"
              style={{
                display: "flex",
                flexFlow: "row",
              }}
            >
              <Link
                className="vorsab"
                href="/ordersHistory"
                style={{
                  width: "100%",
                  display: "flex",
                  flexFlow: "row",
                  justifyContent: "space-between",
                  padding: "15px",
                  outline: "none",
                  alignItems: "center",
                  // border: "1px solid #E7E7E7",
                  // boxShadow: "#D7D6D6 0px 0px 2px 0px",
                  border: "1px solid #a9a9a9",
                  boxShadow: "#5e5e5e 0px 0px 3px 0px",
                  borderRadius: "25px",
                  backgroundColor: "white",
                  overflow: "hidden",
                }}
              >
                <div
                  className="imgAndTextInSubprograms"
                  style={{ display: "flex" }}
                >
                  <div
                    className="roundedPillsCont"
                    style={{
                      display: "flex",
                      flexFlow: "column",
                      width: "fit-content",
                    }}
                  >
                    <div
                      className="rounded-pill"
                      style={{
                        display: "flex",
                        flexFlow: "row",
                        border: "1px solid #E7E7E7",
                        padding: "10px",
                        borderRadius: "50%",
                      }}
                    >
                      <img
                        style={{ width: "64px" }}
                        src="/images/Subprograms/order-icon.svg"
                        alt="هایپر&zwnj;کرفو"
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexFlow: "column",
                      justifyContent: "space-around",
                      width: "fit-content",
                    }}
                  >
                    <div
                      style={{
                        flex: "0 0 auto",
                        display: "flex",
                        flexFlow: "row",
                      }}
                    >
                      <span className="titleStyle">تاریخچه سفارشات</span>
                    </div>
                    <div
                      style={{ flexFlow: "row", fontSize: "75%" }}
                      className="decsInSubprograms"
                    >
                      <div style={{ display: "flex", flexFlow: "row" }}>
                        <span className="valueStyle">
                          گزارش جزئیات سفارشات قبلی
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="leftArrowInSubprograms"
                  style={{ flexFlow: "row" }}
                >
                  <img
                    style={{ width: "20px" }}
                    src="https://img.tochikala.com/tochikala/left-arrow-03.svg"
                    alt="بزن بریم"
                  />
                </div>
              </Link>
            </div>

            <div
              id="Subprograms-4"
              className="Subprograms"
              style={{
                display: "flex",
                flexFlow: "row",
              }}
            >
              <Link
                className="vorsab"
                href="/discountsAndOffers"
                style={{
                  width: "100%",
                  display: "flex",
                  flexFlow: "row",
                  justifyContent: "space-between",
                  padding: "15px",
                  outline: "none",
                  alignItems: "center",
                  // border: "1px solid #E7E7E7",
                  // boxShadow: "#D7D6D6 0px 0px 2px 0px",
                  border: "1px solid #a9a9a9",
                  boxShadow: "#5e5e5e 0px 0px 3px 0px",
                  borderRadius: "25px",
                  backgroundColor: "white",
                  overflow: "hidden",
                }}
              >
                <div
                  className="imgAndTextInSubprograms"
                  style={{ display: "flex" }}
                >
                  <div
                    className="roundedPillsCont"
                    style={{
                      display: "flex",
                      flexFlow: "column",
                      width: "fit-content",
                    }}
                  >
                    <div
                      className="rounded-pill"
                      style={{
                        display: "flex",
                        flexFlow: "row",
                        border: "1px solid #E7E7E7",
                        padding: "10px",
                        borderRadius: "50%",
                      }}
                    >
                      <img
                        style={{ width: "64px" }}
                        src="/images/Subprograms/DiscountsAndOffers.png"
                        alt="هایپر&zwnj;کرفو"
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexFlow: "column",
                      justifyContent: "space-around",
                      width: "fit-content",
                    }}
                  >
                    <div
                      style={{
                        flex: "0 0 auto",
                        display: "flex",
                        flexFlow: "row",
                      }}
                    >
                      <span className="titleStyle">تخفیفات و پیشنهادات</span>
                    </div>
                    <div
                      style={{ flexFlow: "row", fontSize: "75%" }}
                      className="decsInSubprograms"
                    >
                      <div style={{ display: "flex", flexFlow: "row" }}>
                        <span className="valueStyle">
                          مشاهده کالاهای پیشنهادی و پرتخفیف
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="leftArrowInSubprograms"
                  style={{ flexFlow: "row" }}
                >
                  <img
                    style={{ width: "20px" }}
                    src="https://img.tochikala.com/tochikala/left-arrow-03.svg"
                    alt="بزن بریم"
                  />
                </div>
              </Link>
            </div>

            <div
              id="Subprograms-5"
              className="Subprograms"
              style={{
                display: "flex",
                flexFlow: "row",
              }}
            >
              <Link
                className="vorsab"
                href="/games"
                style={{
                  width: "100%",
                  display: "flex",
                  flexFlow: "row",
                  justifyContent: "space-between",
                  padding: "15px",
                  outline: "none",
                  alignItems: "center",
                  // border: "1px solid #E7E7E7",
                  // boxShadow: "#D7D6D6 0px 0px 2px 0px", 
                  border: "1px solid #a9a9a9",
                  boxShadow: "#5e5e5e 0px 0px 3px 0px",
                  backgroundColor: "white",
                  borderRadius: "25px",
                  overflow: "hidden",
                }}
              >
                <div
                  className="imgAndTextInSubprograms"
                  style={{ display: "flex" }}
                >
                  <div
                    className="roundedPillsCont"
                    style={{
                      display: "flex",
                      flexFlow: "column",
                      width: "fit-content",
                    }}
                  >
                    <div
                      className="rounded-pill"
                      style={{
                        display: "flex",
                        flexFlow: "row",
                        border: "1px solid #E7E7E7",
                        padding: "10px",
                        borderRadius: "50%",
                      }}
                    >
                      <img
                        style={{ width: "64px" }}
                        src="/images/Subprograms/game.png"
                        alt="هایپر&zwnj;کرفو"
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexFlow: "column",
                      justifyContent: "space-around",
                      width: "fit-content",
                    }}
                  >
                    <div
                      style={{
                        flex: "0 0 auto",
                        display: "flex",
                        flexFlow: "row",
                      }}
                    >
                      <span className="titleStyle">بازی و سرگرمی</span>
                    </div>
                    <div
                      style={{ flexFlow: "row", fontSize: "75%" }}
                      className="decsInSubprograms"
                    >
                      <div style={{ display: "flex", flexFlow: "row" }}>
                        <span className="valueStyle">
                          لحظات خوش کودکان در محیط هایپر!
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="leftArrowInSubprograms"
                  style={{ flexFlow: "row" }}
                >
                  <img
                    style={{ width: "20px" }}
                    src="https://img.tochikala.com/tochikala/left-arrow-03.svg"
                    alt="بزن بریم"
                  />
                </div>
              </Link>
            </div>

            <div
              id="Subprograms-6"
              className="Subprograms"
              style={{
                display: "none",
                flexFlow: "row",
              }}
            >
              <Link
                className="vorsab"
                href="/ComparePage"
                style={{
                  width: "100%",
                  display: "flex",
                  flexFlow: "row",
                  justifyContent: "space-between",
                  padding: "15px",
                  outline: "none",
                  alignItems: "center",
                  // border: "1px solid #E7E7E7",
                  // boxShadow: "#D7D6D6 0px 0px 2px 0px",
                  border: "1px solid #a9a9a9",
                  boxShadow: "#5e5e5e 0px 0px 3px 0px",
                  borderRadius: "25px",
                  backgroundColor: "white",
                  overflow: "hidden",
                }}
              >
                <div
                  className="imgAndTextInSubprograms"
                  style={{ display: "flex" }}
                >
                  <div
                    className="roundedPillsCont"
                    style={{
                      display: "flex",
                      flexFlow: "column",
                      width: "fit-content",
                    }}
                  >
                    <div
                      className="rounded-pill"
                      style={{
                        display: "flex",
                        flexFlow: "row",
                        border: "1px solid #E7E7E7",
                        padding: "10px",
                        borderRadius: "50%",
                      }}
                    >
                      <img
                        style={{ width: "64px" }}
                        src="/images/Subprograms/superMarket.png"
                        alt="هایپر&zwnj;کرفو"
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexFlow: "column",
                      justifyContent: "space-around",
                      width: "fit-content",
                    }}
                  >
                    <div
                      style={{
                        flex: "0 0 auto",
                        display: "flex",
                        flexFlow: "row",
                      }}
                    >
                      <span className="titleStyle">سرچ با تصویر</span>
                    </div>
                    <div
                      style={{ flexFlow: "row", fontSize: "75%" }}
                      className="decsInSubprograms"
                    >
                      <div style={{ display: "flex", flexFlow: "row" }}>
                        <span className="valueStyle">
                          امکان سرچ کالا با تصویر
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="leftArrowInSubprograms"
                  style={{ flexFlow: "row" }}
                >
                  <img
                    style={{ width: "20px" }}
                    src="https://img.tochikala.com/tochikala/left-arrow-03.svg"
                    alt="بزن بریم"
                  />
                </div>
              </Link>
            </div>

            <div
              id="Subprograms-temp-1"
              className="Subprograms"
              style={{ display: "flex", flexFlow: "row", border: "none" }}
            ></div>
            <div
              id="Subprograms-temp-2"
              className="Subprograms"
              style={{ display: "flex", flexFlow: "row", border: "none" }}
            ></div>
            <div
              id="Subprograms-temp-3"
              className="Subprograms"
              style={{ display: "flex", flexFlow: "row", border: "none" }}
            ></div>
            <div
              id="Subprograms-temp-4"
              className="Subprograms"
              style={{ display: "flex", flexFlow: "row", border: "none" }}
            ></div>
          </div>
        </div>
      )}
    </>
  );
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
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: "#00FF00",
    borderStyle: "solid",
    backgroundColor: "transparent",
    marginBottom: 20,
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
    marginBottom: 50,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 10,
    borderRadius: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    width: "100%",
    borderRadius: 5,
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
});