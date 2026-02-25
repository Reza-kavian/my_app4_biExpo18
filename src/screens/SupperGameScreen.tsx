import React, { useEffect, useState, useCallback, useRef } from "react";
import { //zare_nk_041127_added
  View, Text, Image, TouchableOpacity, StyleSheet, ViewStyle, TextStyle, Alert,
  useWindowDimensions,
  StyleProp, Modal, Button, Animated, TextInput,
  Platform, ToastAndroid  //zare_nk_041127_added
} from "react-native";
import { SvgUri } from "react-native-svg";  //zare_nk_041202_added

import ticTacToeImage from "../assets/images/logoes/TIC-TAC-TOE.jpg";

import { ScrollView } from "react-native";  //zare_nk_041206_added

// export default function ShallowRoutingExample() {  //zare_nk_041029_commented
////zare_nk_041029_added_st
import type { RootStackParamList } from "../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<RootStackParamList, "SupperGame">;
export default function SupperGameScreen({
  navigation,
  route,
}: // back,  //zare_nk_040530(ekhtiariye va chon azash estefadeh nakardim commentent kardim)
  // route, //zare_nk_040530(ekhtiariye va chon azash estefadeh nakardim commentent kardim)
  // options, //zare_nk_040530(ekhtiariye va chon azash estefadeh nakardim commentent kardim)
  Props) {
  Alert.alert('041206');
  ////zare_nk_041206_added_st(moadele @media baraye responsive kardane site) 
  const { width } = useWindowDimensions();
  //////responsive_for_sabadItemsAndTotalInf_added_st
  let SubprogramsContResponse: StyleProp<ViewStyle>;
  if (width < 576) {
    SubprogramsContResponse = styles.SubprogramsCont_STH576;
  }
  else if (width >= 576) {
    SubprogramsContResponse = styles.SubprogramsCont_BTH576;
  }
  else if (width >= 768) {
    SubprogramsContResponse = styles.SubprogramsCont_BTH576;
  }
  else if (width >= 992) {
    SubprogramsContResponse = styles.SubprogramsCont_BTH576;
  }
  //////responsive_for_sabadItemsAndTotalInf_added_end

  //////responsive_for_Subprograms_added_st
  let SubprogramsResponse: StyleProp<ViewStyle> = styles.Subprograms_BaseResponse;
  if (width >= 576) {
    SubprogramsResponse = styles.Subprograms_BTH576;
  }
  if (width >= 992) {
    SubprogramsResponse = styles.Subprograms_BTH992;
  } 
 
  //////responsive_for_Subprograms_added_end

  //////responsive_for_imgAndTextInSubprograms_added_st
  let imgAndTextInSubprogramsResponse: StyleProp<ViewStyle> = styles.imgAndTextInSubprograms_baseResponsive;
  if (width >= 576) {
    imgAndTextInSubprogramsResponse = styles.imgAndTextInSubprograms_BTH576;
  }
  else if (width >= 768) {
    imgAndTextInSubprogramsResponse = styles.imgAndTextInSubprograms_BTH768;
  }
  //////responsive_for_imgAndTextInSubprograms_added_end

  //////responsive_for_roundedPillsCont_added_st
  let roundedPillsContResponse: StyleProp<ViewStyle> = styles.roundedPillsCont_baseResponsive;
  if (width >= 576) {
    roundedPillsContResponse = styles.roundedPillsCont_BTH576;
  }
  else if (width >= 768) {
    roundedPillsContResponse = styles.roundedPillsCont_BTH768;
  }
  //////responsive_for_roundedPillsCont_added_end

  //////responsive_for_subSysTextCont_added_st
  let subSysTextContResponse: StyleProp<ViewStyle> = styles.subSysTextCont_baseResponsive;
  if (width >= 576) {
    subSysTextContResponse = styles.subSysTextCont_BTH576;
  }
  else if (width >= 768) {
    subSysTextContResponse = styles.subSysTextCont_BTH768;
  }
  //////responsive_for_subSysTextCont_added_end

  //////responsive_for_titleStyle_added_st
  let titleStyleResponse: StyleProp<TextStyle> = styles.titleStyleResponse_baseResponsive;
  if (width >= 576) {
    titleStyleResponse = styles.titleStyleResponse_BTH576;
  }
  else if (width >= 768) {
    titleStyleResponse = styles.titleStyleResponse_BTH768;
  }
  //////responsive_for_titleStyle_added_end

  //////responsive_for_valueStyle_added_st
  let valueStyleResponse: StyleProp<TextStyle> = styles.valueStyleResponse_baseResponsive;
  if (width >= 576) {
    valueStyleResponse = styles.valueStyleResponse_BTH576;
  }
  else if (width >= 768) {
    valueStyleResponse = styles.valueStyleResponse_BTH768;
  }
  //////responsive_for_valueStyle_added_end

  ////zare_nk_041206_added_end(moadele @media baraye responsive kardane site) 


  const goTicTacToeScreen = () => {
    navigation.navigate("TicTacToe");
  };
  return (
    <ScrollView horizontal={false}
      style={{ display: "flex", flexDirection: "column", direction: "rtl" }}>
      <View
        // id="SubprogramsCont"
        style={[{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          // gap: 30, //zare_nk_041206_added(beine farzandan margin automat mindaze, jaigozine .Subprograms:nth-child(odd) kardim)
        }, SubprogramsContResponse]}
      >
        <View
          // id="Subprograms-1"
          // className="Subprograms"
          style={[{
            display: "flex",
            flexDirection: "row",
          }, SubprogramsResponse]}
        >
          <TouchableOpacity
            // className="vorsab"
            // href="/shoppingbasket"
            onPress={() => { return navigation.replace("Splash", { target: "TicTacToe" }); }}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              // padding: 15,   //zare_nk_041206_commented
              // alignItems: "center",   //zare_nk_041206_commented
              borderWidth: 1,
              borderColor: "#a9a9a9",
              borderStyle: 'solid',
              boxShadow: "#5e5e5e 0px 0px 3px 0px",
              borderRadius: 25,
              backgroundColor: "white",
              overflow: "hidden",
            }}
            activeOpacity={0.1}
          >
            <View
              // className="imgAndTextInSubprograms"
              style={[{
                display: "flex",
                //  flexDirection: "row",
                borderWidth: 1,
                borderColor: "#47e91e",
                borderStyle: 'dashed',
                flexGrow: 1,
                flexShrink: 0,
                flexBasis: 'auto',
              }, imgAndTextInSubprogramsResponse]}
            >
              <View
                // className="roundedPillsCont"
                style={[{
                  display: "flex",
                  flexDirection: "row",
                  // width: "fit-content",
                  borderWidth: 1,
                  borderColor: "#e91e83",
                  borderStyle: 'dashed',
                }, roundedPillsContResponse]}
              >
                <View   //zare_nk_041205_updated(kolle style update she)  //zare_nk_041206_okk
                  // className="rounded-pill"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: 'center',
                    // border: "1px solid #E7E7E7",
                    borderWidth: 1,
                    borderColor: "#E7E7E7",
                    borderStyle: 'solid',
                    padding: 10,
                    borderRadius: "50%",
                    overflow: 'hidden',
                    minHeight: 85.6,
                    // width:86
                  }}
                >
                  <Image
                    source={ticTacToeImage}
                    style={{ backgroundColor: "#efefef", width: 64, height: 64 }}
                  />
                </View>
              </View>
              <View
                style={[{
                  display: "flex",
                  flexDirection: "column",
                  // justifyContent: "space-around",   //zare_nk_041205_commented //zare_nk_041206_okk
                  justifyContent: "center", //zare_nk_041205_added  //zare_nk_041206_okk
                  // width: "fit-content",

                  borderWidth: 1,
                  borderColor: "#691010",
                  borderStyle: 'dashed',
                }, subSysTextContResponse]}
              >
                <View
                  style={{
                    // flex: "0 0 auto",
                    flexGrow: 0,
                    flexShrink: 0,
                    flexBasis: 'auto',
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: 7,  //zare_nk_041205_added  //zare_nk_041206_okk
                  }}
                >
                  <Text
                    //  className="titleStyle"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={[{
                      fontFamily: "IRANSansWeb(FaNum)_Bold",
                      color: '#4b4949',
                      borderStyle: 'dashed',
                      borderColor: 'red',
                      borderWidth: 2,
                    }, titleStyleResponse]}
                  >TIC-TAC-TOE</Text>
                </View>
                <View
                  style={{ flexDirection: "row", }}
                // className="decsInSubprograms"
                >
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <Text
                      // className="valueStyle"
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={[{
                        fontFamily: "IRANSansWeb(FaNum)_Medium",
                        color: "#6a6a6a",
                        fontSize: 12,
                      }, valueStyleResponse,]}
                    >
                      بازی دوز 9 خانه ای(3*3)
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              // className="leftArrowInSubprograms"
              style={{
                display: 'flex', flexDirection: "row", alignItems: 'center',
                borderWidth: 1,
                borderColor: "#e91ed8",
                borderStyle: 'dashed',
              }}
            >
              {/* <Image
                    source={{ uri: "https://img.tochikala.com/tochikala/left-arrow-03.svg" }}
                    style={{ width: 20, height:20 }}
                  /> */}
              <SvgUri
                uri="https://img.tochikala.com/tochikala/left-arrow-03.svg"
                width={20}
                height={20}
              />
            </View>
          </TouchableOpacity>
        </View>
 

        {/* zare_nk_041206_nokteh(be khatere dadane gap dar css az taktike ijade view haye tookhaliye komakiye akhare container ejtenab mikonim,
vagarna barnameh automat ba akharin viewei ke ghable in komakiha hast va mohtava ham dare ye gape bimored mideh ke shahede ye marginLefte
 bimored hastem ke chon viewye hamsaye ash tookhaliye va dideh nemishe in marginLefti ke dar asare gap migire bimorede(pas age az gap 
 estefadeh mishe view haye komaki tookhali ra hazf mikonim) ) */}
        <View
          // id="Subprograms-temp-1"
          // className="Subprograms"
          // style={{ display: "flex", flexDirection: "row", }}
          style={[{
            display: "flex",
            flexDirection: "row",
          }, SubprogramsResponse]}
        ></View>
        <View
          // id="Subprograms-temp-2"
          // className="Subprograms"
          // style={{ display: "flex", flexDirection: "row", }}
          style={[{
            display: "flex",
            flexDirection: "row",
            margin:0,
          }, SubprogramsResponse]}
        ></View>
         
      </View>
    </ScrollView>
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

  /////////////////////////////////////////////zare_nk_041206_added_st(for responsives @media) 
  SubprogramsCont_STH576: {
    // padding: 15px 0px;
    paddingVertical: 15,
    paddingHorizontal: 10,
    gap: 10,
    // margin: 20px 10px 15px 10px;
    // marginTop: 20,
    // marginHorizontal: 10, // راست و چپ
    // marginBottom: 15,
  },
  SubprogramsCont_BTH576: {
    // padding: 15px 0px;
    paddingVertical: 15,
    paddingHorizontal: 10,
    gap: 10,
    // margin: 20px 10px 15px 10px;
    // marginTop: 20,
    // marginHorizontal: 10, // راست و چپ
    // marginBottom: 15,
  },

  SubprogramsCont_BTH992: {
    // padding: 15px 0px;
    paddingVertical: 15,
    paddingHorizontal: 50,
    gap: 15,
    // margin: 20px 10px 15px 10px;
    // marginTop: 20,
    // marginHorizontal: 50, // راست و چپ
    // marginBottom: 15,
  },

  SubprogramsCont_BTH1400: {
    // padding: 15px 0px;
    paddingVertical: 15,
    paddingHorizontal: 200,

    // margin: 20px 10px 15px 10px;
    // marginTop: 20,
    // marginHorizontal: 200, // راست و چپ
    // marginBottom: 15,
  },

  //////////////////////
  Subprograms_BaseResponse: {
    // flex: 1 1 45%; 
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '95%',
    // marginBottom: 10,  //zare_nk_041206_commented
    // borderWidth: 2,
    // borderStyle: 'dashed',
    // borderColor: 'orange',
  },
  Subprograms_BTH576: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '45%',
    // marginBottom: 10,  //zare_nk_041206_commented
    //  borderWidth: 2,
    // borderStyle: 'dashed',
    // borderColor: 'orange',
  },
  Subprograms_BTH992: {
    // flex: 1 1 31%; 
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '31%',
    // marginBottom: 10,  //zare_nk_041206_commented
  },
   
  //////////////////////
  imgAndTextInSubprograms_baseResponsive: {
    flexDirection: 'row',
    width: 'auto',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: 'red',
  },

  imgAndTextInSubprograms_BTH576: {
    flexDirection: 'column',
    width: '100%',
  },
  imgAndTextInSubprograms_BTH768: {
    flexDirection: 'row',
    width: 'auto',
  },
  ////////////////////////
  roundedPillsCont_baseResponsive: {
    marginLeft: 10,
    marginBottom: 0,
    justifyContent: 'flex-start',  //zare_nk_041206_added
  },
  roundedPillsCont_BTH576: {
    marginLeft: 0,
    marginBottom: 10,
    justifyContent: 'center',  //zare_nk_041206_added
  },
  roundedPillsCont_BTH768: {
    marginLeft: 10,
    marginBottom: 0,
    justifyContent: 'flex-start',  //zare_nk_041206_added
  },
  ///////////////////////
  subSysTextCont_baseResponsive: {
    width: 0,
    // flex: 1 1 auto;
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 'auto',
    alignItems: 'flex-start',
  },

  subSysTextCont_BTH576: {
    width: '100%',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 'auto',
    alignItems: 'center',
  },

  subSysTextCont_BTH768: {
    width: 0,
    // flex: 1 1 auto;
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 'auto',
    alignItems: 'flex-start',
  },
  //////////////////////
  titleStyleResponse_baseResponsive: { textAlign: 'right', },
  titleStyleResponse_BTH576: { textAlign: 'center', },
  titleStyleResponse_BTH768: { textAlign: 'right', },
  ///////////////////////
  valueStyleResponse_baseResponsive: { textAlign: 'right', },
  valueStyleResponse_BTH576: { textAlign: 'center', },
  valueStyleResponse_BTH768: { textAlign: 'right', },
  ////////////////////////////

  /////////////////////////////////////////////zare_nk_041206_added_end(for responsives @media) 
});

