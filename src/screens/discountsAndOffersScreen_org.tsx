////zare_nk_050231_okk
// "use client";  //zare_nk_041129_commente
// import { useRouter } from "next/navigation";  //zare_nk_041129_commente
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { //zare_nk_041129_added
  View, Text, Image, TouchableOpacity, StyleSheet, ViewStyle, TextStyle, Alert,
  useWindowDimensions,
  StyleProp, Modal, Button, Animated, TextInput,
  Platform, ToastAndroid, LayoutChangeEvent, FlatList, ScrollView, Dimensions
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";   //zare_nk041129_added
import { NextJsApiUrl, NextJsApiAuthUrl } from "../constants/Urls";   ////zare_nk_041129_added 
// let cachedBootstrap: typeof import("bootstrap") | null = null; //zare_nk_041129_commented 
// import "@/styles/DiscountsAndOffersCss.css";   //zare_nk_041129_commented 

import { RefObject } from "react";
import { MouseEvent } from "react";
import ReusableButton from "../components/ReusableButton";

import { SvgUri } from "react-native-svg";  //zare_nk_041202_added

////zare_nk_050315_nokteh_st 
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
type NavigationType = NativeStackNavigationProp<
  RootStackParamList,
  //"shoppingbasket"   ////zare_nk_050318_commented
  "discountsAndOffers"   ////zare_nk_050318_added
>;
////zare_nk_050315_nokteh_end 

import SpecialOfferIcon from "../components/icons/images/SpecialOffer";   ////zare_nk_050316_added
import AddRemBtnsAndCountPackege from '../components/addRemBtnsAndCountPackege';   ////zare_nk_050316_added

import type { ListRenderItem } from 'react-native';    ////zare_nk_050319_added

import OfferSatrComponent from '../components/OfferSatrComponent';  ////zare_nk_050319_added

////zare_nk_041129_commented_st
// async function getBootstrap() {
//   if (!cachedBootstrap) {
//     cachedBootstrap = await import("bootstrap");
//   }
//   return cachedBootstrap;
// }
////zare_nk_041129_commented_end

////zare_nk_041127_added_st
const showNoStock = () => {
  if (Platform.OS === "android") {
    ToastAndroid.show("موجودی کافی نیست", ToastAndroid.SHORT);
  } else {
    // Alert.alert("خطا", "موجودی کافی نیست");
  }
};
////zare_nk_041127_added_end

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
  // event?: MouseEvent<HTMLAnchorElement> | null | undefined;  ////zare_nk_041127_commented
  event?: null;  ////zare_nk_041127_added
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

////zare_nk_050319_commented_st(bordim be componente joda)
// type OfferSatrComponentType = {
//   offerRow: ForCartContInProdDetValType
//   handlerForAddClick: (
//     addRemParam: addRemParamType,
//   ) => void;
//   handlerForRemClick: (
//     addRemParam: addRemParamType,
//   ) => void;
//   openprodDetModal: (barcodeKala: string) => void;
//   // navigation: Props["navigation"];  ////zare_nk_050315_nokteh(rahe1 baraye taeine noe parametre navigation ke az file digari be componente jari pas dadeh shod)
//   navigation: NavigationType;   ////zare_nk_050315_nokteh(rahe2 baraye taeine noe parametre navigation ke az file digari be componente jari pas dadeh shod)
// };

// export function OfferSatrComponent({
//   offerRow,
//   handlerForAddClick,
//   handlerForRemClick,
//   openprodDetModal,
//   navigation,  
// }: OfferSatrComponentType) {

//   const [isLoadedIroductImage, setIsLoadedIroductImage] = useState(false);   ////zare_nk_050318_added

//   ////zare_nk_041207_added_st
//   const [productHeight, setProductHeight] = useState<number>(0);
//   const [productWidth, setProductWidth] = useState<number>(0);  //zare_nk_041208_dded
//   const productUri = `https://img.tochikala.com/Product/${offerRow.IdKala}.webp`; // تبدیل به متغیر
//   const [imgUri, setImgUri] = useState(productUri);
//   ////zare_nk_041207_added_end
//   ////zare_nk_041206_added_st(moadele @media baraye responsive kardane site) 
//   const { width } = useWindowDimensions();
//   //////responsive_for_Subprograms_added_st
//   let SubprogramsResponse: StyleProp<ViewStyle> = styles.Subprograms_BaseResponse;
//   if (width >= 576) {
//     SubprogramsResponse = styles.Subprograms_BTH576;
//   }
//   if (width >= 992) {
//     SubprogramsResponse = styles.Subprograms_BTH992;
//   }
//   //////responsive_for_Subprograms_added_end 
//   ////zare_nk_041206_added_end(moadele @media baraye responsive kardane site) 

//   // Alert.alert("offerRow.Mojoodi: "+offerRow.Mojoodi);
//   var Tedad = offerRow.tedadInSabadOrDet;
//   var bishAzMaxTedadYaMojoodi = 0;
//   if (offerRow.MaxTedad != null) {
//     if (offerRow.MaxTedad <= Tedad) {
//       bishAzMaxTedadYaMojoodi = 1;
//     }
//   } else {
//     if (offerRow.Mojoodi <= Tedad) {
//       bishAzMaxTedadYaMojoodi = 1;
//     }
//   }

//   console.log('zare_nk_041121-offerRow: ' + JSON.stringify(offerRow));
//   // const ForCartContentsDesignTypeLet = useMemo(() => {
//   const tedadInSabadOrDetToNumber = Number(offerRow.tedadInSabadOrDet);
//   const ZaribForooshToNumber = Number(offerRow.ZaribForoosh);

//   const ForCartContentsDesignTypeLet =
//     tedadInSabadOrDetToNumber === 0 ? 0 :
//       tedadInSabadOrDetToNumber > ZaribForooshToNumber ? 2 :
//         tedadInSabadOrDetToNumber === ZaribForooshToNumber ? 1 :
//           0;
//   // }, [offerRow]);  
//   // Alert.alert("ForCartContentsDesignTypeLet: "+ForCartContentsDesignTypeLet);

//   ////zare_nk_041207_added_st(baraye mohasebeye nesbate width be heighte tasvir chon height:auto dar reactNative amal nemikoneh)
//   const onImageLayout = (event: LayoutChangeEvent) => {
//     const { width } = event.nativeEvent.layout; // عرض واقعی خود Image
//     setProductWidth(width);  //zare_nk_041208_added
//     // محاسبه ارتفاع بر اساس نسبت واقعی تصویر
//     Image.getSize(productUri, (imgWidth, imgHeight) => {
//       const ratio = imgHeight / imgWidth;
//       setProductHeight(width * ratio);
//     });
//   };
//   ////zare_nk_041207_added_end(baraye mohasebeye nesbate width be heighte tasvir chon height:auto dar reactNative amal nemikoneh)

//   return (
//     <View
//       // id="Subprograms-1"
//       // className="Subprograms"
//       style={[{
//         display: "flex",
//         flexDirection: "row",
//       }, SubprogramsResponse]}
//     >
//       <TouchableOpacity
//         // id={`cardd-${offerRow.IdKala}`}
//         // type="button"
//         // onClick={(event) => openprodDetModal(offerRow.BarcodeKala)}
//         onPress={(event) => openprodDetModal(offerRow.BarcodeKala)}
//         // onMouseEnter={(event) => {
//         //   event.currentTarget.style.boxShadow = "0px 0px 2px 0px #D7D6D6";
//         // }}
//         // onMouseLeave={(event) => {
//         //   event.currentTarget.style.boxShadow = "none";
//         // }}
//         // className="cardd Mainslides GotToDet"
//         style={{
//           // color: "inherit",
//           // textDecoration: "none",
//           // display: "inline-block",

//           width: "100%",
//           display: "flex",
//           flexDirection: "column",

//           // direction: "rtl",
//           // padding: "0px 2px 5px 2px",
//           paddingTop: 0,
//           paddingRight: 2,
//           paddingBottom: 5,
//           paddingLeft: 2,
//           marginLeft: -1,
//           marginBottom: -1,
//           // margin: 3,  
//           // border: "1px solid #e4e4e4",  

//           height: "auto",
//           // borderWidth: 1,
//           ////zare_nk_050316_commented_st
//           // borderColor: "#a9a9a9",  
//           // borderStyle: 'solid',   
//           // boxShadow: "#5e5e5e 0px 0px 3px 0px",  
//           ////zare_nk_050316_commented_end
//           // borderRadius: 25,
//           borderRadius: 16,
//           backgroundColor: "white",
//           overflow: "hidden",
//         }}
//       >
//         <View
//           style={{
//             // display: "flex", 
//             flexDirection: "column",
//             position: "relative"
//           }}
//         >





//           {(offerRow.DarsadTakhfif != null && offerRow.DarsadTakhfif != 0) && (
//             <View
//               // id={`darsadTakhfifInsabad-${offerRow.IdKala}`}
//               // className="darsadTakhfifInsabad rounded-pill"
//               style={{
//                 position: "absolute",
//                 top: 7,
//                 left: 7,
//                 display: 'flex',

//                 flexDirection: "row",
//                 justifyContent: "center",
//                 alignItems: 'center',
//                 backgroundColor: "#ff3151",
//                 width: 39,
//                 height: 20,
//                 // flexGrow: 0,
//                 // flexShrink: 0,
//                 // flexBasis: 'auto',
//                 marginLeft: 5,
//                 borderRadius: 100,
//                 zIndex: 2,
//                 // borderWidth:1,
//                 // borderStyle:'dashed',
//                 // borderColor:'red',
//               }}
//             >
//               <Text
//                 // className="forDiscount"
//                 style={{
//                   fontSize: 12,
//                   color: "white",
//                   opacity: 1,
//                   fontFamily: "IRANSansWeb(FaNum)_Medium",
//                   // borderWidth: 2,
//                   // borderStyle: 'dashed',
//                   // borderColor: 'black',
//                 }}
//               >
//                 {`${offerRow.DarsadTakhfif}%`}
//               </Text>
//             </View>
//           )}

//           {/* {((offerRow.DarsadTakhfif ?? 0) >= 30) &&(  */}
//           {(offerRow.DarsadTakhfif != null && offerRow.DarsadTakhfif >= 15) && (
//             <View
//               // className={`specialOffer-${offerRow.IdKala}`}
//               style={{
//                 position: "absolute",
//                 top: 7,
//                 right: 7,
//                 display: "flex",
//                 // fontSize: "100%",
//                 backgroundColor: "inherit",
//                 zIndex: 2,
//                 // borderWidth:1,
//                 // borderStyle:'dashed',
//                 // borderColor:'red', 
//               }}
//             >
//               {/* <img
//               style={{ width: "64px" }}
//               src="https://img.tochikala.com/Icon/special-offer.svg"
//               alt="علاقه&zwnj;مندی&zwnj;ها"
//             /> */}
//               {/* <Image
//                 source={{ uri: "https://img.tochikala.com/Icon/special-offer.svg" }}
//                 style={{ width: 64, height: 14 }}
//               /> */}
//               {/* <SvgUri
//                 uri="https://img.tochikala.com/Icon/special-offer.svg"
//                 width={64}
//                 height={14}
//               /> */}
//               <SpecialOfferIcon />
//             </View>
//           )}

//           <View
//             // className="imgcontainer"
//             // id={`imgcontainer-${offerRow.IdKala}`} 
//             style={{
//               width: "100%",
//               // display: "flex",
//               flexDirection: "column",
//               // height: "min-content",
//               position: 'relative',
//               // borderWidth: 2,
//               // borderStyle: 'dashed',
//               // borderColor: 'red',
//             }}
//           >
//             {/* <img
//             loading="lazy"
//             src={`https://img.tochikala.com/Product/${offerRow.IdKala}.webp`}
//             id={`card-img-top-${offerRow.IdKala}`}
//             className="card-img-top"
//             alt={offerRow.NameKala ? offerRow.NameKala : ''}
//             style={{ width: "100%", backgroundColor: "#EFEFEF" }}
//           //  onError={this.onerror=null;this.src=\'https://img.tochikala.com/Logo/tochi.png\';$(this).css(\'height\',\'auto\') }}
//           //  onLoad="$(this).css(\'background-color\',\'inherit\');$(this).css(\'height\',\'auto\');"
//           /> */}
//             <Image
//               onLayout={onImageLayout}  ////zare_nk_041207_added
//               onError={() => {
//                 const productUriOnError = 'https://img.tochikala.com/Logo/tochi.png';
//                 setImgUri(productUriOnError);

//                 if (productWidth > 0) {
//                   Image.getSize(productUriOnError, (imgWidth, imgHeight) => {
//                     const ratio = imgHeight / imgWidth;
//                     setProductHeight(productWidth * ratio);
//                   });
//                 }
//               }}
//               onLoad={() => { setIsLoadedIroductImage(true); }}
//               // source={{ uri: `https://img.tochikala.com/Product/${offerRow.IdKala}.webp` }}  //zare_nk_041207_commented
//               source={{ uri: imgUri }}   //zare_nk_041207_added
//               style={{
//                 backgroundColor: isLoadedIroductImage ? "#ffffff" : "#efefef",
//                 width: "100%",
//                 // height: 'auto',  //zare_nk_041207_comemnted(height: 'auto' dar reactNative dorost amal nemikoneh)
//                 //// aspectRatio: 1,   //zare_nk_041207_added(height ra nesbat be width mohasebe mikoneh(monasebe zamani ke nesbate width/height ra midanim))(rahe aspectRatioye ertefa)
//                 // height: productHeight,   //zare_nk_041207_added(height ra nesbat be width mohasebe mikoneh(monasebe zamani ke nesbate width/height ra midanim))(rahe onLayoutiye ertefa)

//                 ////zare_nk_041208_added_st(rahe tarkibiye ertefa)
//                 ...(productHeight === 0
//                   ? { aspectRatio: 1 }
//                   : { height: productHeight }),
//                 ////zare_nk_041208_added_end(rahe tarkibiye ertefa)

//                 // borderWidth: 2,
//                 // borderStyle:'dashed',
//                 // borderColor: 'blue',
//               }}
//             />
//           </View>

//           <View
//             // id={`ForCartContInProdDet-${offerRow.IdKala}`}
//             style={{
//               // display: "flex",
//               flexDirection: "column",
//               justifyContent: "center",
//               marginTop: 7,
//               // padding: "0px 10px",
//               paddingVertical: 0,
//               paddingHorizontal: 10,
//               position: 'absolute',
//               bottom: 0,
//               right: 0,
//             }}
//           >
//             {/* <MiddleCountTedadSefr */}
//             <AddRemBtnsAndCountPackege
//               refForfather={offerRow.refForfather}
//               fromShowDetails={offerRow.fromShowDetails}
//               IdKala={offerRow.IdKala}
//               idTag={offerRow.idTag}
//               tedadInSabadOrDet={offerRow.tedadInSabadOrDet}

//               // handlerForAddClick={(e) => {  //zare_nk_041127_commented
//               handlerForAddClick={() => {  //zare_nk_041127_added
//                 return handlerForAddClick(
//                   {
//                     tedadInSabadOrDet: offerRow.tedadInSabadOrDet,
//                     ZaribForoosh: offerRow.ZaribForoosh,
//                     IdKala: offerRow.IdKala,
//                     NameKala: offerRow.NameKala,
//                     DarsadTakhfif: offerRow.DarsadTakhfif,
//                     NameBerand: offerRow.NameBerand,
//                     FeeForoosh: offerRow.FeeForoosh,
//                     FeeMasraf: offerRow.FeeMasraf,
//                     BarcodeKala: offerRow.BarcodeKala,
//                     Mojoodi: offerRow.Mojoodi,
//                     MaxTedad: offerRow.MaxTedad,
//                     father: offerRow.father,
//                     bishAzMaxTedadYaMojoodi: bishAzMaxTedadYaMojoodi,
//                     fromShowDetails: false,
//                     // event: e,  //zare_nk_041127_commented
//                     event: null,  //zare_nk_041127_added
//                   }
//                 );
//               }}
//               // handlerForRemClick={(e) => {  //zare_nk_041127_commented
//               handlerForRemClick={() => {  //zare_nk_041127_added
//                 return handlerForRemClick(
//                   {
//                     tedadInSabadOrDet: offerRow.tedadInSabadOrDet,
//                     ZaribForoosh: offerRow.ZaribForoosh,
//                     IdKala: offerRow.IdKala,
//                     NameKala: offerRow.NameKala,
//                     DarsadTakhfif: offerRow.DarsadTakhfif,
//                     NameBerand: offerRow.NameBerand,
//                     FeeForoosh: offerRow.FeeForoosh,
//                     FeeMasraf: offerRow.FeeMasraf,
//                     BarcodeKala: offerRow.BarcodeKala,
//                     Mojoodi: offerRow.Mojoodi,
//                     MaxTedad: offerRow.MaxTedad,
//                     father: offerRow.father,
//                     bishAzMaxTedadYaMojoodi: bishAzMaxTedadYaMojoodi,
//                     fromShowDetails: false,
//                     // event: e,  //zare_nk_041127_commented
//                     event: null,  //zare_nk_041127_added
//                   }
//                 );
//               }}
//               ForCartContentsDesignType={ForCartContentsDesignTypeLet}
//               bishAzMaxTedadYaMojoodi={bishAzMaxTedadYaMojoodi}
//               navigation={navigation}  //zare_nk_041128_added
//             />

//           </View>
//         </View>

//         <View
//           style={{
//             height: 37,
//             display: "flex",
//             flexWrap: "wrap",
//             flexDirection: "row",
//             marginTop: 7,
//             marginBottom: 5,
//             // padding: "0px 10px 0px 10px",
//             paddingVertical: 0,
//             paddingHorizontal: 10,
//             justifyContent: 'flex-start',
//             alignItems: 'flex-start',
//             width: "100%",
//             //             borderWidth: 1,
//             // borderStyle: 'dashed',
//             // borderColor: 'red',
//           }}
//         >
//           <Text
//             numberOfLines={2}
//             ellipsizeMode="tail"
//             style={{
//               fontFamily: "IRANSansWeb(FaNum)_Medium",
//               fontSize: 13,
//               color: '#454545',  ////zare_nk_050316_added
//               lineHeight: 18,  ////zare_nk_050316_added
//               // borderWidth: 1,
//               // borderStyle: 'dashed',
//               // borderColor: 'red',
//             }}
//           >
//             {offerRow.NameKala}
//           </Text>
//         </View>

//         {/* {((offerRow.DarsadTakhfif ?? 0) != 0) ? ( */}
//         {(offerRow.DarsadTakhfif != null && offerRow.DarsadTakhfif != 0) ? (
//           <View
//             // id={`PriceBeforeDiscount-${offerRow.IdKala}`}
//             style={{
//               // visibility: "visible",  ////zare_nk_050316_commented(dar react native visibility nadarim)
//               opacity: 1,  ////zare_nk_050316_added(dar react native visibility nadarim)
//               display: "flex",
//               flexDirection: "row",
//               paddingLeft: 10,
//               justifyContent: 'flex-end',
//               alignItems: "center",
//               width: "100%",
//               // borderWidth: 1,
//               // borderStyle: 'dashed',
//               // borderColor: 'red',
//             }}
//           >
//             <Text
//               // className="PriceBeforeDiscount"
//               style={{
//                 fontSize: 11,
//                 textDecorationLine: "line-through",
//                 color: '#888',  ////zare_nk_050316_added
//                 fontFamily: "IRANSansWeb(FaNum)_Medium",
//                 lineHeight: 10,  ////zare_nk_050316_added
//               }}
//             >
//               {offerRow.FeeMasraf.toLocaleString()}
//             </Text>
//           </View>
//         ) : (
//           <View
//             // id={`PriceBeforeDiscount-${offerRow.IdKala}`}
//             style={{
//               // visibility: "hidden",  ////zare_nk_050316_commented(dar react native visibility nadarim)
//               opacity: 0,  ////zare_nk_050316_added(dar react native visibility nadarim)
//               display: "flex",
//               flexDirection: "row",
//               paddingLeft: 10,
//               justifyContent: 'flex-end',
//               alignItems: "center",
//               width: "100%",
//               // borderWidth: 1,
//               // borderStyle: 'dashed',
//               // borderColor: 'blue',
//             }}
//           >
//             <Text
//               // className="PriceBeforeDiscount"
//               style={{
//                 fontSize: 11,
//                 // opacity: 0.7,  
//                 textDecorationLine: "line-through",
//                 color: '#888',  ////zare_nk_050316_added
//                 fontFamily: "IRANSansWeb(FaNum)_Medium",
//                 lineHeight: 10,  ////zare_nk_050316_added
//               }}
//             >
//               {offerRow.FeeMasraf.toLocaleString()}
//             </Text>
//           </View>
//         )}

//         <View
//           style={{
//             display: "flex",
//             flexWrap: "wrap",
//             flexDirection: "row",
//             marginTop: 0,
//             marginBottom: 5,
//             // padding: "0px 10px 0px 10px",
//             paddingVertical: 0,
//             paddingHorizontal: 10,
//             // justifyContent: 'space-between',  ////zare_nk_050316_commented
//             justifyContent: 'flex-start',  ////zare_nk_050316_added
//             alignItems: "center",
//             width: "100%",
//             // borderWidth: 1,
//             // borderStyle: 'dashed',
//             // borderColor: 'black',
//           }}
//         >

//           {/* {((offerRow.DarsadTakhfif ?? 0) != 0) &&(  */}
//           {/* {(offerRow.DarsadTakhfif != null && offerRow.DarsadTakhfif != 0) && (
//             <View
//               // id={`darsadTakhfifInsabad-${offerRow.IdKala}`}
//               // className="darsadTakhfifInsabad rounded-pill"
//               style={{
//                 backgroundColor: "#ff3151",
//                 width: 39,
//                 height: 20,
//                 // flex: "0 0 auto",
//                 display: 'flex',
//                 flexDirection: "row",
//                 justifyContent: "center",
//                 alignItems: 'center',
//                 flexGrow: 0,
//                 flexShrink: 0,
//                 flexBasis: 'auto',
//                 marginLeft: 5,
//                 borderRadius: 100,
//               }}
//             >
//               <Text
//                 // className="forDiscount"
//                 style={{
//                   fontSize: 12,
//                   color: "white",
//                   opacity: 1,
//                   fontFamily: "IRANSansWeb(FaNum)_Medium",
//                   // borderWidth: 2,
//                   // borderStyle: 'dashed',
//                   // borderColor: 'black',
//                 }}
//               >
//                 {`${offerRow.DarsadTakhfif}%`}
//               </Text>
//             </View>
//           )} */}
//           <View
//             style={{
//               // flex: "1 0 auto", 
//               flexGrow: 1,
//               flexShrink: 0,
//               flexBasis: 'auto',
//               display: "flex",
//               flexDirection: 'row',
//               justifyContent: 'flex-end',
//               // borderWidth: 1,
//               // borderStyle: 'dashed',
//               // borderColor: 'green',
//             }}
//           >
//             <Text
//               //  className="mablagh" 
//               style={{
//                 fontSize: 13,
//                 marginLeft: 5,
//                 fontFamily: "IRANSansWeb(FaNum)_Medium",
//                 color: '#3d3d3d',   ////zare_nk_050316_added
//               }}>
//               {offerRow.FeeForoosh.toLocaleString()}
//             </Text>
//             <Text
//               style={{ fontSize: 12, fontFamily: "IRANSansWeb(FaNum)_Medium", color: '#6d6d6d', }}
//             >تومان</Text>
//           </View>
//         </View>

//         {/* zare_nk_041121_commented_st(felan chon fielde TozihatKala ra nagonjandim) */}
//         {/* <div
//         className="TozihatforKala-' + parsedList[j].IdKala + '"
//         style={{
//           padding: "5px",
//           borderRadius: "15px",
//           display: "flex",
//           flexWrap: "wrap",
//           flexFlow: "row",
//           margin: "0px 3px 5px 3px",
//           justifyContent: "start",
//           color: "red",
//           alignItems: "center",
//         }}
//       >
//         <h6
//           style={{
//             textAlign: "center",
//             fontSize: "12px",
//             margin: "0px",
//             lineHeight: "2.0",
//             textOverflow: "ellipsis",
//             overflow: "hidden",
//             lineClamp: "2",
//           }}
//         >
//           {TozihatKala == null ? "" : TozihatKala}
//         </h6>
//       </div> */}
//         {/* zare_nk_041121_commented_end(felan chon fielde TozihatKala ra nagonjandim) */}
//       </TouchableOpacity>
//     </View>
//   );
// }
////zare_nk_050319_commented_end(bordim be componente joda)

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
import { LoginIcon } from "../components/icons/images";
type Props = NativeStackScreenProps<RootStackParamList, "discountsAndOffers">;

export default function ShallowRoutingExample({
  navigation,
  route,
}:  // back,  ////zare_nk_040530(ekhtiariye va chon azash estefadeh nakardim commentent kardim)
  // route, ////zare_nk_040530(ekhtiariye va chon azash estefadeh nakardim commentent kardim)
  // options, ////zare_nk_040530(ekhtiariye va chon azash estefadeh nakardim commentent kardim)
  Props) {
  // console.log('041210-1-ShallowRoutingExample called!!');
  // const [windowWidth, setWindowWidth] = useState(Dimensions.get("window").width);

  const [isLoadedIroductImage, setIsLoadedIroductImage] = useState(false);

  // useEffect(() => {
  //   const subscription = Dimensions.addEventListener("change", ({ window }) => {
  //     Alert.alert("window.width: " + window.width);
  //     setWindowWidth(window.width); // این باعث میشه FlatList رندر مجدد بشه
  //   });
  //   return () => subscription?.remove();
  // }, []);

  ////zare_nk_041209_added_st
  const [productHeightForDet, setProductHeightForDet] = useState<number>(0);
  const [productWidthForDet, setProductWidthForDet] = useState<number>(0);  //zare_nk_041208_dded
  const productUriForDet = '';  //// `https://img.tochikala.com/Product/${ForCartContInProdDetVal.IdKala}.webp`; // تبدیل به متغیر 
  const [imgUriForDet, setImgUriForDet] = useState<string>('');
  ////zare_nk_041209_added_end
  ////zare_nk_041206_added_st(moadele @media baraye responsive kardane site) 
  const { width } = useWindowDimensions();   ////zare_nk_041208_nokteh(useWindowDimensions tosiye mishe bejaye Dimensions, chon useWindowDimensions ba taghire size
  //  arze safhe(masalan ofoghi va amoodai kardane mobile baese rerendere automate componenti ke tooshe mishe, vali Dimensions ghadimitare va bayad ye state 
  // baraye reRendere dastiye component tarif konim va baraye Dimensions addEventListenere change benevisim ke ba tagheire sizesh ba setState yadshodeh component ra rafresh konim ))
  //////responsive_for_sabadItemsAndTotalInf_added_st
  let SubprogramsContResponse: StyleProp<ViewStyle>;
  if (width < 576) {
    SubprogramsContResponse = styles.SubprogramsCont_STH576;
  }
  else if (width >= 576) {
    SubprogramsContResponse = styles.SubprogramsCont_BTH576;
  }
  else if (width >= 992) {
    SubprogramsContResponse = styles.SubprogramsCont_BTH992;
  }
  //////responsive_for_sabadItemsAndTotalInf_added_end
  //////responsive_for_Subprograms_added_st
  let numSubprogramsResponseInPerRow = 2;
  let SubprogramsResponse: StyleProp<ViewStyle> = styles.Subprograms_BaseResponse;
  if (width >= 576) {
    SubprogramsResponse = styles.Subprograms_BTH576;
    numSubprogramsResponseInPerRow = 4;
  }
  if (width >= 992) {
    SubprogramsResponse = styles.Subprograms_BTH992;
    numSubprogramsResponseInPerRow = 6;
  }
  //////responsive_for_Subprograms_added_end

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


  ////zare_nk_041206_added_end(moadele @media baraye responsive kardane site) 


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


  ////zare_nk_041127_added_end 
  // const router = useRouter();  //zare_nk_041128_commented 
  const [ForCartContInProdDetVal, setForCartContInProdDetVal] =
    useState<ForCartContInProdDetValType>();
  const refForfather = useRef<string | null>(null);
  ////zare_nk_041115_added_st(albate felan niazam nemisheh)
  // const [sabadTitr, setSabadTitr] = useState<SabadTitrType[] | null>(null); //zare_nk_041207_commented
  ////zare_nk_041115_added_end(albate felan niazam nemisheh)

  const [bisatr, setBisatr] = useState(true);
  const [bisatrInProductDet, setBisatrInProductDet] = useState(true); //zare_nk_041128_added

  const [offerRows, setOfferRows] = useState<ForCartContInProdDetValType[]>([]);

  const [addOrRemChanged, setAddOrRemChanged] = useState<string | null>(null);
  const [jamKol, setJamKol] = useState<number | null>(null);
  const [jamKolTakhfif, setJamKolTakhfif] = useState<number | null>(null);
  const [jamKolNahaei, setJamKolNahaei] = useState<number | null>(null);

  const [isOpenedProdDetModal, setIsOpenedProdDetModal] = useState(false);
  const [isOpenedSeePricesModal, setIsOpenedSeePricesModal] = useState(false);
  const [isOpenedMymodalForWarning, setIsOpenedMymodalForWarning] = useState(false); //zare_nk_041128_added
  const [warningTextInMymodalForWarning, setWarningTextInMymodalForWarning] = useState(''); //zare_nk_041128_added
  // console.log('041210-2-ShallowRoutingExample called!!');

  // async function ShowDetails(barcodeKala: any) {   ////zare_nk_050319_commented(for use callback)
  const ShowDetails = useCallback(async (barcodeKala: any) => {  ////zare_nk_050319_added(for use callback)
    const token = await getCookie("token");
    ////zare_nk_050318_commented_st
    // if (token == null) {
    //   setIsOpenedMymodalForWarning(true);
    //   setWarningTextInMymodalForWarning("لطفا ابتدا لاگین شوید");
    //   // const bootstrap = await getBootstrap();
    //   // const mymodalForWarning = new bootstrap.Modal(
    //   //     document.getElementById("mymodalForWarning")
    //   // );
    //   // mymodalForWarning.show();
    //   // const span = document.querySelector(
    //   //     "#mymodalForWarning .errorInMymodalForWarning"
    //   // );
    //   // if (span instanceof HTMLElement) {
    //   //     span.innerText = "لطفا ابتدا لاگین شوید";
    //   // }
    //   return;  //zare_nk_041130_added
    // }
    ////zare_nk_050318_commented_end

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
        IdShobeh: 6,
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
        // console.log("rr-parsedList: " + JSON.stringify(parsedList) + '-parsedList.length: ' + parsedList.length + '-parsedList[0].IdKala : ' + parsedList[0].IdKala);

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
        // console.log('parsedList[0].NameKala: ' + parsedList[0].NameKala + '-parsedList[0].TedadDarSabad: ' + parsedList[0].TedadDarSabad);
        const idTag = "ForCart-" + parsedList[0].IdKala;
        setImgUriForDet(`https://img.tochikala.com/Product/${parsedList[0].IdKala}.webp`);  //zare_nk_041209_added
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

    // }  ////zare_nk_050319_commented(for use callback)
  }, []);  ////zare_nk_050319_added(for use callback)

  // async function openprodDetModal(barcodeKala: string) {  ////zare_nk_050319_commented(for use callback)
  const openprodDetModal = useCallback(async (barcodeKala: string) => { ////zare_nk_050319_added(for use callback)
    // console.log('ShallowRoutingExample called-openprodDetModal called!!');
    await ShowDetails(barcodeKala);
    setIsOpenedProdDetModal(true);
    setAddOrRemChanged(null);
    // }  ////zare_nk_050319_commented(for use callback)
  }, [ShowDetails]);  ////zare_nk_050319_added(for use callback)

  useEffect(() => {
    // if (isOpenedProdDetModal == false) {
    //   return;
    // }
    // const productExist = document.getElementById("productExist");
    // if (productExist instanceof HTMLElement) {
    //   productExist.style.display = "flex";
    // }
    // const productNotExist = document.getElementById("productNotExist");
    // if (productNotExist instanceof HTMLElement) {
    //   productNotExist.style.display = "none";
    // }

    // const groupsInDetailsPageCont = document.getElementById(
    //   "groupsInDetailsPageCont"
    // );
    // if (groupsInDetailsPageCont instanceof HTMLElement) {
    //   groupsInDetailsPageCont.style.display = "none";
    // }
    // const handlerForProdDetModal = () => {
    //   const ImageColectionInDetails = document.getElementById(
    //     "ImageColectionInDetails"
    //   );
    //   if (ImageColectionInDetails instanceof HTMLElement)
    //     ImageColectionInDetails.style.display = "none";
    // };
    // const hiddenHandlerForProdDetModal = () => {
    //   setIsOpenedProdDetModal(false);
    //   setAddOrRemChanged("notNull");
    // };
    // const prodDetModal = document.getElementById("prodDetModal");
    // async function tempFuncForAsyncGetBootstrap() {
    //   if (prodDetModal != null && isOpenedProdDetModal != null) {
    //     prodDetModal.addEventListener("shown.bs.modal", handlerForProdDetModal);
    //     prodDetModal.addEventListener(
    //       "hidden.bs.modal",
    //       hiddenHandlerForProdDetModal
    //     );
    //     const bootstrap = await getBootstrap();
    //     const modal = new bootstrap.Modal(prodDetModal);
    //     modal.show();
    //   }
    // }
    // tempFuncForAsyncGetBootstrap();
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
    // return () => {
    //   // پاکسازی رویداد در unmount
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
  }, [isOpenedProdDetModal]);

  useEffect(() => {
    // console.log('041210-3-addOrRemChanged in useEffect!!');
    if (isOpenedProdDetModal == true) {
      // console.log('041210-4-addOrRemChanged in useEffect-isOpenedProdDetModal == true');
      return;
    }
    // console.log('041210-5-addOrRemChanged in useEffect-isOpenedProdDetModal != true');
    async function tempFuncForAsync() {
      const token = await getCookie("token");
      ////zare_nk_050318_commented_st
      // if (token == null) { 
      // console.log('041210-6-addOrRemChanged in useEffect-token == null');
      // setIsOpenedMymodalForWarning(true);
      // setWarningTextInMymodalForWarning("لطفا ابتدا لاگین شوید");
      // // const bootstrap = await getBootstrap();
      // // const mymodalForWarning = new bootstrap.Modal(
      // //     document.getElementById("mymodalForWarning")
      // // );
      // // mymodalForWarning.show();
      // // const span = document.querySelector(
      // //     "#mymodalForWarning .errorInMymodalForWarning"
      // // );
      // // if (span instanceof HTMLElement) {
      // //     span.innerText = "لطفا ابتدا لاگین شوید";
      // // }
      // return; 
      // } else {
      ////zare_nk_050318_commented_end
      // console.log('041210-7-addOrRemChanged in useEffect-token != null');
      type InputDataType = {
        IdShobeh: number;
        IsJashnvareh: number;
        NameKala: string;
        IdG1: number;
        IdG2: number;
        IdG3: number;
        IdG4: number;
        IsMostBuy: number;
        Sort: number;
        IsFavorite: number;
        IdVitrin: number;
      };

      const inputData: InputDataType = {
        IdShobeh: 6,
        // IsJashnvareh: 1,  //zare_nk_041208_commented_testi
        IsJashnvareh: -1,  //zare_nk_041208_added_testi
        NameKala: "",
        // IdG1: -1,//zare_nk_041208_commented_testi
        IdG1: 1,//zare_nk_041208_added_testi
        IdG2: -1,
        IdG3: -1,
        IdG4: -1,
        IsMostBuy: -1,
        Sort: -1,
        IsFavorite: -1,
        IdVitrin: -1,
      };
      // console.log('041210-8-addOrRemChanged in useEffect-token != null');
      let ApiUrl = "https://api.tochikala.com/api/";
      var urlSelectKalaShobeh = ApiUrl + "User/Api_SelectKalaShobeh";
      const response = await fetch(urlSelectKalaShobeh, {   //zare_nk_041121_added(for shopToDiscount)
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          IdShobeh: inputData.IdShobeh,
          IsJashnvareh: inputData.IsJashnvareh,
          NameKala: inputData.NameKala,
          IdG1: inputData.IdG1,
          IdG2: inputData.IdG2,
          IdG3: inputData.IdG3,
          IdG4: inputData.IdG4,
          IsMostBuy: inputData.IsMostBuy,
          Sort: inputData.Sort,
          IsFavorite: inputData.IsFavorite,
          IdVitrin: inputData.IdVitrin,
        }),
      });
      // console.log('041210-9-addOrRemChanged in useEffect');
      const data = await response.json();
      // console.log('041210-10-addOrRemChanged in useEffect');
      if (response.ok) {
        // console.log('041210-10-addOrRemChanged in useEffect-response.ok');
        var result = JSON.parse(data.data.list);
        // console.log('041210-10-addOrRemChanged in useEffect-result: ' + JSON.stringify(result));
        // console.log('041210-11-addOrRemChanged in useEffect-data.status: ' + data.status);
        if (data.status != 0) {
          // console.log('041210-12-data.status != 0');
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
          // console.log('041210-12-data.status == 0');
          if (result.length == 0) {
            // console.log('041210-13-result.length == 0');
            // console.log('result.length == 0: ' + result.length)
            setBisatr(true);
            return;
          }
          // console.log('041210-14-result.length == 0');
          setBisatr(false);
          refForfather.current = "#cardcontainer2";
          // console.log('041210-15');
          setOfferRows(() => {
            return (
              result.map((item: any) => {
                var bishAzMaxTedadYaMojoodi = 0;
                if (item.MaxTedad != null) {
                  if (item.MaxTedad <= item.TedadDarSabad) {
                    bishAzMaxTedadYaMojoodi = 1;
                  }
                } else {
                  if (item.Mojoodi <= item.TedadDarSabad) {
                    bishAzMaxTedadYaMojoodi = 1;
                  }
                }

                let ForCartContentsDesignTypeLet = 0

                if (item.TedadDarSabad == 0) {
                  ForCartContentsDesignTypeLet = 0;
                }
                else if (item.TedadDarSabad > item.ZaribForoosh) {
                  ForCartContentsDesignTypeLet = 2;
                }
                else if (item.TedadDarSabad == item.ZaribForoosh) {
                  ForCartContentsDesignTypeLet = 1;
                }
                return ({
                  tedadInSabadOrDet: item.TedadDarSabad,
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
                  father: "#cardcontainer2",
                  refForfather: refForfather,
                  bishAzMaxTedadYaMojoodi: bishAzMaxTedadYaMojoodi,  //zare_nk_041121_added(for shopToDiscount)
                  fromShowDetails: false,
                  ForCartContentsDesignType: ForCartContentsDesignTypeLet,  //zare_nk_041121_added(for shopToDiscount)
                  idTag: "ForCart-" + item.IdKala,
                })
              })
            )
          });
          ////zare_nk_041121_added_end(for shopToDiscount)
        }
      } else {
        // console.log('!!response.ok')
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
      // }////zare_nk_050318_commented
    }
    tempFuncForAsync();
  }, [addOrRemChanged]);

  async function addToCartInIndex(
    addRemParam: addRemParamType,
  ) {
    // console.log('041120-addToCartInIndex called!-addRemParam: ' + addRemParam.FeeForoosh);
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
      setWarningTextInMymodalForWarning("لطفا ابتدا لاگین شوید");
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
      //     span.innerText = "لطفا ابتدا لاگین شوید";
      //   }
      ////zare_nk_041129_commented_end
      return;
    } else {
      // console.log('041120-addToCartInIndex-else 1');
      var TedadOut = 0;
      var TedadOuttoAjax = 0;
      const zarib = parseFloat(String(addRemParam.ZaribForoosh ?? 0));
      TedadOut = addRemParam.tedadInSabadOrDet + zarib;
      TedadOuttoAjax = addRemParam.ZaribForoosh;
      const token = await getCookie("token");
      // console.log('041120-addToCartInIndex-tedad: ' + addRemParam.tedadInSabadOrDet + '-zarib: ' + addRemParam.ZaribForoosh + '-TedadOut: ' + TedadOut);

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
          IdShobeh: 6,
          IdAddress: 23990
        }),
      });
      const data = await response.json();
      if (response.ok) {
        // console.log('041120-addToCartInIndex-else 5 IdKala response.ok-data: ' + JSON.stringify(data));
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
            setImgUriForDet(`https://img.tochikala.com/Product/${addRemParam.IdKala}.webp`);  //zare_nk_041209_added
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
        // console.log('041120-addToCartInIndex-else 6 IdKala !!!!response.ok');
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
    const token = await getCookie("token");
    if (token == null) {
      setIsOpenedMymodalForWarning(true);
      setWarningTextInMymodalForWarning("لطفا ابتدا لاگین شوید");
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
      //     span.innerText = "لطفا ابتدا لاگین شوید";
      //   }
      ////zare_nk_041129_commented_end
      return;
    } else {
      // console.log('041116-001');
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
          IdShobeh: 6,
          IdAddress: 23990
        }),
      });

      const data = await response.json();
      if (response.ok) {
        var result = data;
        if (result.status == -1000) {
          ////zare_nk_041129_commented_st
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
          // refForfather.current = addRemParam.father;
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
          ////zare_nk_041129_commented_end
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
          // console.log('041116-result.status == 0');
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
            setImgUriForDet(`https://img.tochikala.com/Product/${addRemParam.IdKala}.webp`);  //zare_nk_041209_added
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
            // alert('areeee');
            ////zare_nk_041129_commented_st
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
            ////zare_nk_041129_commented_end
          }
          else if (Tedad == addRemParam.ZaribForoosh) {
            ////zare_nk_041129_commented_st
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
            ////zare_nk_041129_commented_end
          }
        }
      } else {
        // console.log('041116-!!response.ok');
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
    }
  }

  ////zare_nk_050319_added_st(rahe1- bedoone callback ))
  // const handlerForAddClick: (
  //   addRemParam: addRemParamType,
  // ) => void = (addRemParam) => {
  //   // addRemParam.event && addRemParam.event.stopPropagation();
  //   addToCartInIndex(
  //     addRemParam
  //   );
  // };
  ////zare_nk_050319_added_end(rahe1- bedoone callback ))
  ////zare_nk_050319_added_st(rahe2- tabee voroodish ke addToCartInIndex hast ham niaz be useCalback dare(chon addToCartInIndex ham mesle handlerForAddClick tabe hast ))
  // const handlerForAddClick = useCallback((addRemParam: addRemParamType) => {
  //   addToCartInIndex(addRemParam);
  // }, [addToCartInIndex]);  
  ////zare_nk_050319_added_end(rahe2- tabee voroodish ke addToCartInIndex hast ham niaz be useCalback dare(chon addToCartInIndex ham mesle handlerForAddClick tabe hast ))
  const handlerForAddClick = useCallback(addToCartInIndex, [addToCartInIndex]);  ////zare_nk_050319_added_st(rahe3- tabee voroodish ke addToCartInIndex hast dige niazi be useCalback nadare)

  ////zare_nk_050319_added_st(rahe1- bedoone callback ))
  // const handlerForRemClick: (
  //   addRemParam: addRemParamType,
  // ) => void = (addRemParam) => {
  //   remveFromCartInIndex(
  //     addRemParam
  //   );
  // };
  ////zare_nk_050319_added_end(rahe1- bedoone callback ))
  ////zare_nk_050319_added_st(rahe2- tabee voroodish ke remveFromCartInIndex hast ham niaz be useCalback dare(chon remveFromCartInIndex ham mesle handlerForRemClick tabe hast ))
  // const handlerForRemClick = useCallback((addRemParam: addRemParamType) => {
  //   remveFromCartInIndex(addRemParam);
  // }, [remveFromCartInIndex]);  
  ////zare_nk_050319_added_end(rahe2- tabee voroodish ke remveFromCartInIndex hast ham niaz be useCalback dare(chon remveFromCartInIndex ham mesle handlerForRemClick tabe hast ))
  const handlerForRemClick = useCallback(remveFromCartInIndex, [remveFromCartInIndex]);  ////zare_nk_050319_added_st(rahe3- tabee voroodish ke remveFromCartInIndex hast dige niazi be useCalback nadare)

  ////zare_nk_050319_added_st(az useCallback baraye sorate bishtar estefadeh kardim) 
  const renderOfferItem: ListRenderItem<ForCartContInProdDetValType> = useCallback(({ item }) => (
    <OfferSatrComponent
      offerRow={item}
      handlerForAddClick={handlerForAddClick}
      handlerForRemClick={handlerForRemClick}
      openprodDetModal={openprodDetModal}
      navigation={navigation}
    />
  ), [
    handlerForAddClick,
    handlerForRemClick,
    openprodDetModal,
    navigation
  ]);
  ////zare_nk_050319_added_end(az useCallback baraye sorate bishtar estefadeh kardim)
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
      {isOpenedProdDetModal == true ? (
        <Modal   //zare_nk_040923(component modal baraye namayesh doorbin va scan kardan)
          visible={isOpenedProdDetModal}    ////zare_nk_040923(halat namayesh modal)
          animationType="slide"  ////zare_nk_040923(ta'sir gozashtan rooye namayesh modal)  //ye bar fade bezaram bebinam chi mishe!
          onRequestClose={() => {
            // Alert.alert('onRequestClose in modalprodDet');
            ////zare_nk_041128_nokteh(moadele methode hiddenHandlerForProdDetModal)
            setIsOpenedProdDetModal(false);
            setAddOrRemChanged("notNull");
            setBisatrInProductDet(false);
          }}   ////zare_nk_040923(agar karbar dokmeye back android ra zad modal baste shavad)
        >
          {/*zare_nk_040923(konteyner dakhele modal)*/}
          {/* zare_nk_041128_okk */}
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
                        {/* <Image
                          source={{ uri: "https://img.tochikala.com/icon/heart/heart01(0).svg" }}
                          style={{ width: 32, }}
                        /> */}
                        <SvgUri
                          uri="https://img.tochikala.com/icon/heart/heart01(0).svg"
                          width={32}
                          height={32}
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
                          // source={{ uri: `https://img.tochikala.com/Product/${offerRow.IdKala}.webp` }}  //zare_nk_041207_commented
                          source={{ uri: imgUriForDet }}   //zare_nk_041207_added
                          style={{
                            backgroundColor: isLoadedIroductImage ? "#ffffff" : "#efefef",
                            width: "100%",   //zare_nk_041211_alan
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
                            // id="ForCartContInProdDet"  navigation
                            style={{
                              // display: "flex",
                              flexDirection: "column",
                              justifyContent: 'flex-end',
                            }}
                          >
                            {ForCartContInProdDetVal != null && (
                              //  <MiddleCountTedadSefr
                              <AddRemBtnsAndCountPackege
                                // offerRow={ForCartContInProdDetVal}  //zare_nk_041120_commented
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
                                  {/* <Image
                                    source={{ uri: "https://img.tochikala.com/tochikala/left-arrow.svg" }}
                                    style={{ width: 15 }}
                                  /> */}
                                  <SvgUri
                                    uri="https://img.tochikala.com/tochikala/left-arrow.svg"
                                    width={15}
                                    height={15}
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
                }}>کالای مورد نظر یافت نشد</Text>
            </View>
            {/* </View> */}
            {/* </View> */}

            {/* div span */}
            {/* zare_nk_041128_added_end */}
          </ScrollView>
        </Modal>
      ) : (
        // <ScrollView
        //   // id="cardcontainer2"
        //   // className="mtt-1 gfForAddRemm WantCompress hisGrandFather"
        //   style={{
        //     width: "100%",
        //     overflow: "hidden",
        //   }}
        //   contentContainerStyle={[{
        //     display: "flex",
        //     flexDirection: "row",
        //     // justifyContent: 'flex-start',  //zare_nk_041207_commented
        //     justifyContent: "space-between",  //zare_nk_041207_added
        //     flexWrap: "wrap",
        //     direction: "rtl",
        //   }, SubprogramsContResponse]}
        // >
        <>
          {!bisatr && (
            <>
              {/* zare_nk_041121_added_st(for shopToDiscount) */}
              {/* {offerRows?.map((item, index) => { 
                return (
                  <SabadSatrComponent
                    key={index || item.IdKala}
                    offerRow={item}
                    handlerForAddClick={handlerForAddClick}
                    handlerForRemClick={handlerForRemClick}
                    openprodDetModal={openprodDetModal}
                    navigation={navigation}  //zare_nk_041127_added
                  />
                );

              })}   */}
              {/* zare_nk_050319_added_st(rahe2-ba FlatList(kolle offerRows ra load nemikoneh balke faghat halghehhaei ke dar namayesh dide mishe ro load mikoneh, va baghiyeye halghehhaei ba scroll load mishan(pas behineh hast dar tedadhaye ziad))) */}
              {/* zare_nk_041208_nokteh(baraye load shodane farzandan faghat zamane scroll shodan az FlatList estefadeh kardim ta sorate barname balatar bere,
              <FlatList ra jaigozine <ScrollView kardim,chon ScrollView faghat haviye scrol bood vali FlatList ham scrol darad ham loade farzandanash faghat 
              hengame dideh shodan dar scorl ha,albate FlatList baraye mavaredi mesle sabade kharid ke tedad Itemha khaili ziad nist lazem nist,vali masalan
              baraye safheye pishnahadat ke masalan 500 kala miad baraye jologiri az kond shodane loade yekjaye 500 farzand,mofideh)*/}
              <FlatList
                key={width}  //zare_nk_050224_nokteh(key age avaz beshe react componente <FlatList /> ra kamelan destroy va mojadad mount mikoneh)
                data={offerRows}
                keyExtractor={(item) => item.IdKala.toString()}  //zare_nk_050224_nokteh(keyExtractor marboot be itemhaye list hast(dar inja goftim har ozv az offerRows))
                ////zare_nk_050319_commented_st(az useCallback baraye sorate bishtar estefadeh kardim)
                // renderItem={({ item }) => ( 
                //   <OfferSatrComponent 
                //     offerRow={item}
                //     handlerForAddClick={handlerForAddClick}
                //     handlerForRemClick={handlerForRemClick}
                //     openprodDetModal={openprodDetModal}
                //     navigation={navigation}  //zare_nk_041127_added
                //   />
                // )}
                ////zare_nk_050319_commented_end(az useCallback baraye sorate bishtar estefadeh kardim)
                renderItem={renderOfferItem}    ////zare_nk_050319_added(az useCallback baraye sorate bishtar estefadeh kardim)
                style={{
                  width: "100%",
                  overflow: "hidden",
                  // borderColor: 'blue',
                  // borderStyle: 'solid',
                  // borderWidth: 3,
                }}
                contentContainerStyle={[{
                  display: "flex",
                  // flexDirection: "row",
                  // justifyContent: "space-between",  
                  // flexWrap: "wrap",
                  direction: "rtl",
                }, SubprogramsContResponse]}
                columnWrapperStyle={{
                  // justifyContent: "space-between",
                  // marginBottom: 10,
                }}
                numColumns={numSubprogramsResponseInPerRow}
                showsVerticalScrollIndicator={false}
              />
              {/* zare_nk_050319_added_end(rahe2-ba FlatList(kolle offerRows ra load nemikoneh balke faghat halghehhaei ke dar namayesh dide mishe ro load mikoneh, va baghiyeye halghehhaei ba scroll load mishan(pas behineh hast dar tedadhaye ziad))) */}
              {/* zare_nk_050319_added_st(rahe1-ba ScrollView va map(kolle offerRows ra load mikoneh va behineh naist dar tedadhaye ziad)) */}
              {/* <ScrollView horizontal={false}
                style={[{
                  width: "100%",
                  overflow: "hidden",
                  display: "flex",
                  direction: "rtl",
                }, SubprogramsContResponse]}
              >
                <View
                  style={[{
                    width: "100%",
                    overflow: "hidden",
                    display: "flex",
                    direction: "rtl",
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }, SubprogramsContResponse]} >
                  {offerRows?.map((item, index) => {
                    return (
                      <OfferSatrComponent
                        key={index || item.IdKala}
                        offerRow={item}
                        handlerForAddClick={handlerForAddClick}
                        handlerForRemClick={handlerForRemClick}
                        openprodDetModal={openprodDetModal}
                        navigation={navigation}
                      />
                    );
                  })}
                </View>
              </ScrollView> */}
              {/* zare_nk_050319_added_end(rahe1-ba ScrollView va map(kolle offerRows ra load mikoneh va behineh naist dar tedadhaye ziad)) */}

              {/* zare_nk_041121_added_end(for shopToDiscount) */}

              {/* zare_nk_041207_added_st(be khatere estefadeh az maxWidth baraye farzandan ejazeye ziad shodane arze farzandane satre 
              akhar ra nemidahim,pas satrhaye komaki dege niazi nist va commenteshoon kardim) */}
              {/* {offerRows?.slice(0, 2).map((item) => (
                <View
                  style={[{
                    display: "flex",
                    flexDirection: "row",
                    borderStyle: 'dashed',
                    borderColor: 'black',
                    borderWidth: 2,

                  }, SubprogramsResponse]}
                ></View>
              ))} */}
              {/* zare_nk_041207_added_end(be khatere estefadeh az maxWidth baraye farzandan ejazeye ziad shodane arze farzandane satre 
              akhar ra nemidahim,pas satrhaye komaki dege niazi nist va commenteshoon kardim) */}

            </>
          )}
          {/* </ScrollView> */}
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
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
  /////////////////////////////////////////////zare_nk_041206_added_st(for responsives @media) 
  SubprogramsCont_STH576: {
    // padding: 15px 0px;
    paddingVertical: 15,
    paddingHorizontal: 0,

    // gap: 10, //zare_nk_041208_nokteh(gap baraye FlatList naghese va faghat amoodi lahaz mishe nadare chon be lahaze ofoghi har
    //  zatresh ye farzande vahed darnazar gerefte mishe va baraye Card haye toosh emal nemishe!,pas az gap sarfenazarkardim)
  },
  SubprogramsCont_BTH576: {
    // padding: 15px 0px;
    paddingVertical: 15,
    paddingHorizontal: 5,
    // gap: 10,  //zare_nk_041208_nokteh(gap baraye FlatList naghese va faghat amoodi lahaz mishe nadare chon be lahaze ofoghi har
    //  zatresh ye farzande vahed darnazar gerefte mishe va baraye Card haye toosh emal nemishe!,pas az gap sarfenazarkardim)
  },

  SubprogramsCont_BTH992: {
    // padding: 15px 0px;
    paddingVertical: 15,
    paddingHorizontal: 45,
    // gap: 15, //zare_nk_041208_nokteh(gap baraye FlatList naghese va faghat amoodi lahaz mishe nadare chon be lahaze ofoghi har
    //  zatresh ye farzande vahed darnazar gerefte mishe va baraye Card haye toosh emal nemishe!,pas az gap sarfenazarkardim)
  },

  SubprogramsCont_BTH1400: {
    paddingVertical: 15,
    paddingHorizontal: 195,
    // gap: 15, //zare_nk_041208_nokteh(gap baraye FlatList naghese va faghat amoodi lahaz mishe nadare chon be lahaze ofoghi har
    //  zatresh ye farzande vahed darnazar gerefte mishe va baraye Card haye toosh emal nemishe!,pas az gap sarfenazarkardim)
  },

  //////////////////////
  Subprograms_BaseResponse: {
    flexGrow: 1,
    flexShrink: 1,
    // flexBasis: '45%', //zare_nk_041208_nokteh(chon az <FlatList ../> estefadeh shodeh az ghabeliate numColumns khode FlatList baraye responsive
    //  estefade shode va dige flexBasise darsadi be farzandan nadadim)
    maxWidth: '50%', //zare_nk_041208_nokteh(jaigozine farzandane tookhaliye komaki baraye satre akhar shodeh)
    padding: 5,
  },
  Subprograms_BTH576: {
    flexGrow: 1,
    flexShrink: 1,
    // flexBasis: '21%',//zare_nk_041208_nokteh(chon az <FlatList ../> estefadeh shodeh az ghabeliate numColumns khode FlatList baraye responsive
    //  estefade shode va dige flexBasise darsadi be farzandan nadadim)
    maxWidth: '25%', //zare_nk_041208_nokteh(jaigozine farzandane tookhaliye komaki baraye satre akhar shodeh)
    padding: 5,
  },
  Subprograms_BTH992: {
    flexGrow: 1,
    flexShrink: 1,
    // flexBasis: '15%',//zare_nk_041208_nokteh(chon az <FlatList ../> estefadeh shodeh az ghabeliate numColumns khode FlatList baraye responsive
    //  estefade shode va dige flexBasise darsadi be farzandan nadadim)
    maxWidth: '16.6%', //zare_nk_041208_nokteh(jaigozine farzandane tookhaliye komaki baraye satre akhar shodeh)
    padding: 5,
  },
  //////////////////////////

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
  /////////////////////////////////////////////zare_nk_041206_added_end(for responsives @media) 
});