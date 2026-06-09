import { useState, useEffect, useRef, useMemo, useCallback,memo } from "react";
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
import type { RootStackParamList } from "../types/navigation";
 
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
type NavigationType = NativeStackNavigationProp<
  RootStackParamList,
  //"shoppingbasket"   ////zare_nk_050318_commented
  "discountsAndOffers"   ////zare_nk_050318_added
>; 

import SpecialOfferIcon from "../components/icons/images/SpecialOffer";   ////zare_nk_050316_added
import AddRemBtnsAndCountPackege from '../components/addRemBtnsAndCountPackege';   ////zare_nk_050316_added

import type { ListRenderItem } from 'react-native';    ////zare_nk_050319_added

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

type OfferSatrComponentType = {
  offerRow: ForCartContInProdDetValType
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

// export default function OfferSatrComponent({ 
//   offerRow,
//   handlerForAddClick,
//   handlerForRemClick,
//   openprodDetModal,
//   navigation,  
// }: OfferSatrComponentType) {
const OfferSatrComponent = ({
  offerRow,
  handlerForAddClick,
  handlerForRemClick,
  openprodDetModal,
  navigation,   
}: OfferSatrComponentType) => {

  const [isLoadedIroductImage, setIsLoadedIroductImage] = useState(false);   ////zare_nk_050318_added

  ////zare_nk_041207_added_st
  const [productHeight, setProductHeight] = useState<number>(0);
  const [productWidth, setProductWidth] = useState<number>(0);  //zare_nk_041208_dded
  const productUri = `https://img.tochikala.com/Product/${offerRow.IdKala}.webp`; // تبدیل به متغیر
  const [imgUri, setImgUri] = useState(productUri);
  ////zare_nk_041207_added_end
  ////zare_nk_041206_added_st(moadele @media baraye responsive kardane site) 
  const { width } = useWindowDimensions();
  //////responsive_for_Subprograms_added_st
  let SubprogramsResponse: StyleProp<ViewStyle> = styles.Subprograms_BaseResponse;
  if (width >= 576) {
    SubprogramsResponse = styles.Subprograms_BTH576;
  }
  if (width >= 992) {
    SubprogramsResponse = styles.Subprograms_BTH992;
  }
  //////responsive_for_Subprograms_added_end 
  ////zare_nk_041206_added_end(moadele @media baraye responsive kardane site) 

  // Alert.alert("offerRow.Mojoodi: "+offerRow.Mojoodi);
  var Tedad = offerRow.tedadInSabadOrDet;
  var bishAzMaxTedadYaMojoodi = 0;
  if (offerRow.MaxTedad != null) {
    if (offerRow.MaxTedad <= Tedad) {
      bishAzMaxTedadYaMojoodi = 1;
    }
  } else {
    if (offerRow.Mojoodi <= Tedad) {
      bishAzMaxTedadYaMojoodi = 1;
    }
  }

//   console.log('zare_nk_041121-offerRow: ' + JSON.stringify(offerRow));
  // const ForCartContentsDesignTypeLet = useMemo(() => {
  const tedadInSabadOrDetToNumber = Number(offerRow.tedadInSabadOrDet);
  const ZaribForooshToNumber = Number(offerRow.ZaribForoosh);

  const ForCartContentsDesignTypeLet =
    tedadInSabadOrDetToNumber === 0 ? 0 :
      tedadInSabadOrDetToNumber > ZaribForooshToNumber ? 2 :
        tedadInSabadOrDetToNumber === ZaribForooshToNumber ? 1 :
          0;
  // }, [offerRow]);  
  // Alert.alert("ForCartContentsDesignTypeLet: "+ForCartContentsDesignTypeLet);

  ////zare_nk_041207_added_st(baraye mohasebeye nesbate width be heighte tasvir chon height:auto dar reactNative amal nemikoneh)
  const onImageLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout; // عرض واقعی خود Image
    setProductWidth(width);  //zare_nk_041208_added
    // محاسبه ارتفاع بر اساس نسبت واقعی تصویر
    Image.getSize(productUri, (imgWidth, imgHeight) => {
      const ratio = imgHeight / imgWidth;
      setProductHeight(width * ratio);
    });
  };
  ////zare_nk_041207_added_end(baraye mohasebeye nesbate width be heighte tasvir chon height:auto dar reactNative amal nemikoneh)

  return (
    <View
      // id="Subprograms-1"
      // className="Subprograms"
      style={[{
        display: "flex",
        flexDirection: "row",
      }, SubprogramsResponse]}
    >
      <TouchableOpacity
        // id={`cardd-${offerRow.IdKala}`}
        // type="button"
        // onClick={(event) => openprodDetModal(offerRow.BarcodeKala)}
        onPress={(event) => openprodDetModal(offerRow.BarcodeKala)}
        // onMouseEnter={(event) => {
        //   event.currentTarget.style.boxShadow = "0px 0px 2px 0px #D7D6D6";
        // }}
        // onMouseLeave={(event) => {
        //   event.currentTarget.style.boxShadow = "none";
        // }}
        // className="cardd Mainslides GotToDet"
        style={{
          // color: "inherit",
          // textDecoration: "none",
          // display: "inline-block",

          width: "100%",
          display: "flex",
          flexDirection: "column",

          // direction: "rtl",
          // padding: "0px 2px 5px 2px",
          paddingTop: 0,
          paddingRight: 2,
          paddingBottom: 5,
          paddingLeft: 2,
          marginLeft: -1,
          marginBottom: -1,
          // margin: 3,  
          // border: "1px solid #e4e4e4",  

          height: "auto",
          // borderWidth: 1,
          ////zare_nk_050316_commented_st
          // borderColor: "#a9a9a9",  
          // borderStyle: 'solid',   
          // boxShadow: "#5e5e5e 0px 0px 3px 0px",  
          ////zare_nk_050316_commented_end
          // borderRadius: 25,
          borderRadius: 16,
          backgroundColor: "white",
          overflow: "hidden",
        }}
      >
        <View
          style={{
            // display: "flex", 
            flexDirection: "column",
            position: "relative"
          }}
        > 

          {(offerRow.DarsadTakhfif != null && offerRow.DarsadTakhfif != 0) && (
            <View
              // id={`darsadTakhfifInsabad-${offerRow.IdKala}`}
              // className="darsadTakhfifInsabad rounded-pill"
              style={{
                position: "absolute",
                top: 7,
                left: 7,
                display: 'flex',

                flexDirection: "row",
                justifyContent: "center",
                alignItems: 'center',
                backgroundColor: "#ff3151",
                width: 39,
                height: 20,
                // flexGrow: 0,
                // flexShrink: 0,
                // flexBasis: 'auto',
                marginLeft: 5,
                borderRadius: 100,
                zIndex: 2,
                // borderWidth:1,
                // borderStyle:'dashed',
                // borderColor:'red',
              }}
            >
              <Text
                // className="forDiscount"
                style={{
                  fontSize: 12,
                  color: "white",
                  opacity: 1,
                  fontFamily: "IRANSansWeb(FaNum)_Medium",
                  // borderWidth: 2,
                  // borderStyle: 'dashed',
                  // borderColor: 'black',
                }}
              >
                {`${offerRow.DarsadTakhfif}%`}
              </Text>
            </View>
          )}

          {/* {((offerRow.DarsadTakhfif ?? 0) >= 30) &&(  */}
          {(offerRow.DarsadTakhfif != null && offerRow.DarsadTakhfif >= 15) && (
            <View
              // className={`specialOffer-${offerRow.IdKala}`}
              style={{
                position: "absolute",
                top: 7,
                right: 7,
                display: "flex",
                // fontSize: "100%",
                backgroundColor: "inherit",
                zIndex: 2,
                // borderWidth:1,
                // borderStyle:'dashed',
                // borderColor:'red', 
              }}
            >
              {/* <img
              style={{ width: "64px" }}
              src="https://img.tochikala.com/Icon/special-offer.svg"
              alt="علاقه&zwnj;مندی&zwnj;ها"
            /> */}
              {/* <Image
                source={{ uri: "https://img.tochikala.com/Icon/special-offer.svg" }}
                style={{ width: 64, height: 14 }}
              /> */}
              {/* <SvgUri
                uri="https://img.tochikala.com/Icon/special-offer.svg"
                width={64}
                height={14}
              /> */}
              <SpecialOfferIcon />
            </View>
          )}

          <View
            // className="imgcontainer"
            // id={`imgcontainer-${offerRow.IdKala}`} 
            style={{
              width: "100%",
              // display: "flex",
              flexDirection: "column",
              // height: "min-content",
              position: 'relative',
              // borderWidth: 2,
              // borderStyle: 'dashed',
              // borderColor: 'red',
            }}
          >
            {/* <img
            loading="lazy"
            src={`https://img.tochikala.com/Product/${offerRow.IdKala}.webp`}
            id={`card-img-top-${offerRow.IdKala}`}
            className="card-img-top"
            alt={offerRow.NameKala ? offerRow.NameKala : ''}
            style={{ width: "100%", backgroundColor: "#EFEFEF" }}
          //  onError={this.onerror=null;this.src=\'https://img.tochikala.com/Logo/tochi.png\';$(this).css(\'height\',\'auto\') }}
          //  onLoad="$(this).css(\'background-color\',\'inherit\');$(this).css(\'height\',\'auto\');"
          /> */}
            <Image
              onLayout={onImageLayout}  ////zare_nk_041207_added
              onError={() => {
                const productUriOnError = 'https://img.tochikala.com/Logo/tochi.png';
                setImgUri(productUriOnError);

                if (productWidth > 0) {
                  Image.getSize(productUriOnError, (imgWidth, imgHeight) => {
                    const ratio = imgHeight / imgWidth;
                    setProductHeight(productWidth * ratio);
                  });
                }
              }}
              onLoad={() => { setIsLoadedIroductImage(true); }}
              // source={{ uri: `https://img.tochikala.com/Product/${offerRow.IdKala}.webp` }}  //zare_nk_041207_commented
              source={{ uri: imgUri }}   //zare_nk_041207_added
              style={{
                backgroundColor: isLoadedIroductImage ? "#ffffff" : "#efefef",
                width: "100%",
                // height: 'auto',  //zare_nk_041207_comemnted(height: 'auto' dar reactNative dorost amal nemikoneh)
                //// aspectRatio: 1,   //zare_nk_041207_added(height ra nesbat be width mohasebe mikoneh(monasebe zamani ke nesbate width/height ra midanim))(rahe aspectRatioye ertefa)
                // height: productHeight,   //zare_nk_041207_added(height ra nesbat be width mohasebe mikoneh(monasebe zamani ke nesbate width/height ra midanim))(rahe onLayoutiye ertefa)

                ////zare_nk_041208_added_st(rahe tarkibiye ertefa)
                ...(productHeight === 0
                  ? { aspectRatio: 1 }
                  : { height: productHeight }),
                ////zare_nk_041208_added_end(rahe tarkibiye ertefa)

                // borderWidth: 2,
                // borderStyle:'dashed',
                // borderColor: 'blue',
              }}
            />
          </View>

          <View
            // id={`ForCartContInProdDet-${offerRow.IdKala}`}
            style={{
              // display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginTop: 7,
              // padding: "0px 10px",
              paddingVertical: 0,
              paddingHorizontal: 10,
              position: 'absolute',
              bottom: 0,
              right: 0,
            }}
          >
            {/* <MiddleCountTedadSefr */}
            <AddRemBtnsAndCountPackege
              refForfather={offerRow.refForfather}
              fromShowDetails={offerRow.fromShowDetails}
              IdKala={offerRow.IdKala}
              idTag={offerRow.idTag}
              tedadInSabadOrDet={offerRow.tedadInSabadOrDet}

              // handlerForAddClick={(e) => {  //zare_nk_041127_commented
              handlerForAddClick={() => {  //zare_nk_041127_added
                return handlerForAddClick(
                  {
                    tedadInSabadOrDet: offerRow.tedadInSabadOrDet,
                    ZaribForoosh: offerRow.ZaribForoosh,
                    IdKala: offerRow.IdKala,
                    NameKala: offerRow.NameKala,
                    DarsadTakhfif: offerRow.DarsadTakhfif,
                    NameBerand: offerRow.NameBerand,
                    FeeForoosh: offerRow.FeeForoosh,
                    FeeMasraf: offerRow.FeeMasraf,
                    BarcodeKala: offerRow.BarcodeKala,
                    Mojoodi: offerRow.Mojoodi,
                    MaxTedad: offerRow.MaxTedad,
                    father: offerRow.father,
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
                    tedadInSabadOrDet: offerRow.tedadInSabadOrDet,
                    ZaribForoosh: offerRow.ZaribForoosh,
                    IdKala: offerRow.IdKala,
                    NameKala: offerRow.NameKala,
                    DarsadTakhfif: offerRow.DarsadTakhfif,
                    NameBerand: offerRow.NameBerand,
                    FeeForoosh: offerRow.FeeForoosh,
                    FeeMasraf: offerRow.FeeMasraf,
                    BarcodeKala: offerRow.BarcodeKala,
                    Mojoodi: offerRow.Mojoodi,
                    MaxTedad: offerRow.MaxTedad,
                    father: offerRow.father,
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
        </View>

        <View
          style={{
            height: 37,
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            marginTop: 7,
            marginBottom: 5,
            // padding: "0px 10px 0px 10px",
            paddingVertical: 0,
            paddingHorizontal: 10,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            width: "100%",
            //             borderWidth: 1,
            // borderStyle: 'dashed',
            // borderColor: 'red',
          }}
        >
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={{
              fontFamily: "IRANSansWeb(FaNum)_Medium",
              fontSize: 13,
              color: '#454545',  ////zare_nk_050316_added
              lineHeight: 18,  ////zare_nk_050316_added
              // borderWidth: 1,
              // borderStyle: 'dashed',
              // borderColor: 'red',
            }}
          >
            {offerRow.NameKala}
          </Text>
        </View>

        {/* {((offerRow.DarsadTakhfif ?? 0) != 0) ? ( */}
        {(offerRow.DarsadTakhfif != null && offerRow.DarsadTakhfif != 0) ? (
          <View
            // id={`PriceBeforeDiscount-${offerRow.IdKala}`}
            style={{
              // visibility: "visible",  ////zare_nk_050316_commented(dar react native visibility nadarim)
              opacity: 1,  ////zare_nk_050316_added(dar react native visibility nadarim)
              display: "flex",
              flexDirection: "row",
              paddingLeft: 10,
              justifyContent: 'flex-end',
              alignItems: "center",
              width: "100%",
              // borderWidth: 1,
              // borderStyle: 'dashed',
              // borderColor: 'red',
            }}
          >
            <Text
              // className="PriceBeforeDiscount"
              style={{
                fontSize: 11,
                textDecorationLine: "line-through",
                color: '#888',  ////zare_nk_050316_added
                fontFamily: "IRANSansWeb(FaNum)_Medium",
                lineHeight: 10,  ////zare_nk_050316_added
              }}
            >
              {offerRow.FeeMasraf.toLocaleString()}
            </Text>
          </View>
        ) : (
          <View
            // id={`PriceBeforeDiscount-${offerRow.IdKala}`}
            style={{
              // visibility: "hidden",  ////zare_nk_050316_commented(dar react native visibility nadarim)
              opacity: 0,  ////zare_nk_050316_added(dar react native visibility nadarim)
              display: "flex",
              flexDirection: "row",
              paddingLeft: 10,
              justifyContent: 'flex-end',
              alignItems: "center",
              width: "100%",
              // borderWidth: 1,
              // borderStyle: 'dashed',
              // borderColor: 'blue',
            }}
          >
            <Text
              // className="PriceBeforeDiscount"
              style={{
                fontSize: 11,
                // opacity: 0.7,  
                textDecorationLine: "line-through",
                color: '#888',  ////zare_nk_050316_added
                fontFamily: "IRANSansWeb(FaNum)_Medium",
                lineHeight: 10,  ////zare_nk_050316_added
              }}
            >
              {offerRow.FeeMasraf.toLocaleString()}
            </Text>
          </View>
        )}

        <View
          style={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            marginTop: 0,
            marginBottom: 5,
            // padding: "0px 10px 0px 10px",
            paddingVertical: 0,
            paddingHorizontal: 10,
            // justifyContent: 'space-between',  ////zare_nk_050316_commented
            justifyContent: 'flex-start',  ////zare_nk_050316_added
            alignItems: "center",
            width: "100%",
            // borderWidth: 1,
            // borderStyle: 'dashed',
            // borderColor: 'black',
          }}
        >

          {/* {((offerRow.DarsadTakhfif ?? 0) != 0) &&(  */}
          {/* {(offerRow.DarsadTakhfif != null && offerRow.DarsadTakhfif != 0) && (
            <View
              // id={`darsadTakhfifInsabad-${offerRow.IdKala}`}
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
              }}
            >
              <Text
                // className="forDiscount"
                style={{
                  fontSize: 12,
                  color: "white",
                  opacity: 1,
                  fontFamily: "IRANSansWeb(FaNum)_Medium",
                  // borderWidth: 2,
                  // borderStyle: 'dashed',
                  // borderColor: 'black',
                }}
              >
                {`${offerRow.DarsadTakhfif}%`}
              </Text>
            </View>
          )} */}
          <View
            style={{
              // flex: "1 0 auto", 
              flexGrow: 1,
              flexShrink: 0,
              flexBasis: 'auto',
              display: "flex",
              flexDirection: 'row',
              justifyContent: 'flex-end',
              // borderWidth: 1,
              // borderStyle: 'dashed',
              // borderColor: 'green',
            }}
          >
            <Text
              //  className="mablagh" 
              style={{
                fontSize: 13,
                marginLeft: 5,
                fontFamily: "IRANSansWeb(FaNum)_Medium",
                color: '#3d3d3d',   ////zare_nk_050316_added
              }}>
              {offerRow.FeeForoosh.toLocaleString()}
            </Text>
            <Text
              style={{ fontSize: 12, fontFamily: "IRANSansWeb(FaNum)_Medium", color: '#6d6d6d', }}
            >تومان</Text>
          </View>
        </View>

        {/* zare_nk_041121_commented_st(felan chon fielde TozihatKala ra nagonjandim) */}
        {/* <div
        className="TozihatforKala-' + parsedList[j].IdKala + '"
        style={{
          padding: "5px",
          borderRadius: "15px",
          display: "flex",
          flexWrap: "wrap",
          flexFlow: "row",
          margin: "0px 3px 5px 3px",
          justifyContent: "start",
          color: "red",
          alignItems: "center",
        }}
      >
        <h6
          style={{
            textAlign: "center",
            fontSize: "12px",
            margin: "0px",
            lineHeight: "2.0",
            textOverflow: "ellipsis",
            overflow: "hidden",
            lineClamp: "2",
          }}
        >
          {TozihatKala == null ? "" : TozihatKala}
        </h6>
      </div> */}
        {/* zare_nk_041121_commented_end(felan chon fielde TozihatKala ra nagonjandim) */}
      </TouchableOpacity>
    </View>
  );
}

export default memo(OfferSatrComponent);

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