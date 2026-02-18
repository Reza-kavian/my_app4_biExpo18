import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  View, Text, Image, TouchableOpacity, StyleSheet, ViewStyle, TextStyle, Alert,
  useWindowDimensions, //zare_nk_041126_added(moadele @media baraye responsive kardane site)
  StyleProp,
} from "react-native"; 
import ticTacToeIcon from "../assets/images/logoes/TIC-TAC-TOE.jfif";

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
  ////zare_nk_041126_added_st(moadele @media baraye responsive kardane site) 
  const { width } = useWindowDimensions();
  //////responsive_for_SubprogramsCont_added_st
  let SubprogramsContResponse: StyleProp<ViewStyle>;
  if (width >= 576) {
    SubprogramsContResponse = styles.SubprogramsCont_BTH576;
  }
  else if (width >= 992) {
    SubprogramsContResponse = styles.SubprogramsCont_BTH992;
  }
  else if (width >= 1400) {
    SubprogramsContResponse = styles.SubprogramsCont_BTH1400;
  }
  //////responsive_for_SubprogramsCont_added_st

  //////responsive_for_Subprograms_added_st
  let SubprogramsResponse: StyleProp<ViewStyle> = styles.Subprograms_BaseResponse;
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
  //////responsive_for_subSysTextCont_added_st
  let titleStyleResponse: StyleProp<TextStyle> = styles.titleStyleResponse_baseResponsive;
  if (width >= 576) {
    titleStyleResponse = styles.titleStyleResponse_BTH576;
  }
  else if (width >= 768) {
    titleStyleResponse = styles.titleStyleResponse_BTH768;
  }
  //////responsive_for_subSysTextCont_added_end
  //////responsive_for_subSysTextCont_added_st
  let valueStyleResponse: StyleProp<TextStyle> = styles.valueStyleResponse_baseResponsive;
  if (width >= 576) {
    valueStyleResponse = styles.valueStyleResponse_BTH576;
  }
  else if (width >= 768) {
    valueStyleResponse = styles.valueStyleResponse_BTH768;
  }
  //////responsive_for_subSysTextCont_added_end
  ////zare_nk_041126_added_end(moadele @media baraye responsive kardane site)

  const goSuperMarket = () => {
    navigation.replace('folder02');
  };
  const goTicTacToeScreen = () => {
    navigation.navigate("TicTacToe"); 
  }; 
  return (
    <View style={{ display: "flex", flexDirection: "column", direction: "rtl" }}>
      <View 
        style={[styles.SubprogramsCont, SubprogramsContResponse]}
      >       
        <View
          style={[styles.Subprograms, SubprogramsResponse]}
        >
          <TouchableOpacity
            style={[styles.buttonInSubprograms]}
            onPress={() => { return (goTicTacToeScreen) }}
            activeOpacity={0.1}
          >
            <View
              style={[styles.imgAndTextInSubprograms, imgAndTextInSubprogramsResponse]}
            >
              <View
                style={[styles.roundedPillsCont, roundedPillsContResponse]}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: "#E7E7E7",
                    borderStyle: 'solid',
                    borderRadius: "50%",
                    padding: 10,
                    overflow: 'hidden',
                    minHeight: 85.6,
                  }}
                >
                  <Image source={ticTacToeIcon} style={[styles.logo]} />
                </View>
              </View>
              <View
                style={[{
                  display: "flex",
                  flexDirection: "column",
                }, subSysTextContResponse]}
              >
                <View
                  style={{
                    flexGrow: 0,
                    flexShrink: 0,
                    flexBasis: 'auto',
                    flexDirection: "row",
                    marginBottom: 7,
                  }}
                >
                  <Text
                    style={[{
                      fontFamily: "IRANSansWeb_Bold(adad_fa)",
                      color: '#4b4949',
                    }, titleStyleResponse]}>
                    TIC-TAC-TOE 
                  </Text>
                </View>
                <View
                  style={{ flexDirection: "row", }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={[{
                        fontFamily: "IRANSansWeb_Medium(adad_fa)",
                        color: "#6a6a6a",
                        fontSize: 12,
                      }, valueStyleResponse,]}>
                     بازی دوز 3*3
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{ flexDirection: "row" }}>
              <Image
                source={{ uri: "https://img.tochikala.com/tochikala/left-arrow-03.svg" }}
                style={{ width: 20 }}
              />
            </View>
          </TouchableOpacity>
        </View> 

        <View
          // id="Subprograms-temp-1"
          // className="Subprograms"
          style={[styles.Subprograms, SubprogramsResponse, { display: "none", }]}
        ></View>
        <View
          // id="Subprograms-temp-2"
          // className="Subprograms"
          style={[styles.Subprograms, SubprogramsResponse, { display: "none", }]}
        ></View>
        <View
          // id="Subprograms-temp-3"
          // className="Subprograms"
          style={[styles.Subprograms, SubprogramsResponse, { display: "none", }]}
        ></View>
        <View
          // id="Subprograms-temp-4"
          // className="Subprograms"
          style={[styles.Subprograms, SubprogramsResponse, { display: "none", }]}
        ></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  SubprogramsCont: {
    // paddingTop: 15,
    // paddingBottom: 15,
    // marginTop: 20,
    // marginRight: 10,
    // marginBottom: 15,
    // marginLeft: 10
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 30, //zare_nk_041126_added(beine farzandan margin automat mindaze, jaigozine .Subprograms:nth-child(odd) kardim)
  },

  Subprograms: {
    flexDirection: 'row',
  },

  buttonInSubprograms: {
    width: '100%', flexDirection: 'row', justifyContent: 'space-between', padding: 15,
    alignItems: 'center', borderWidth: 1, borderColor: "#E7E7E7", borderStyle: 'solid',
    boxShadow: "#D7D6D6 0px 0px 2px 0px", borderRadius: 25, backgroundColor: 'white', overflow: 'hidden'
  },

  imgAndTextInSubprograms: {
    // flex: 1 0 auto; 
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 'auto',
    alignItems: 'center',
  },

  roundedPillsCont: {
    display: "flex",
    flexDirection: "column",
    // width: "fit-content",
  },

  logo: {
    width: 64,
    // height: 40,
    // resizeMode: "contain",
  },
  /////////////////////////////////////////////zare_nk_041126_added_st(for responsives @media) 
  SubprogramsCont_BTH576: {
    // padding: 15px 0px;
    paddingVertical: 15,
    paddingHorizontal: 0,

    // margin: 20px 10px 15px 10px;
    marginTop: 20,
    marginHorizontal: 10, // راست و چپ
    marginBottom: 15,
  },

  SubprogramsCont_BTH992: {
    // padding: 15px 0px;
    paddingVertical: 15,
    paddingHorizontal: 0,

    // margin: 20px 10px 15px 10px;
    marginTop: 20,
    marginHorizontal: 50, // راست و چپ
    marginBottom: 15,
  },

  SubprogramsCont_BTH1400: {
    // padding: 15px 0px;
    paddingVertical: 15,
    paddingHorizontal: 0,

    // margin: 20px 10px 15px 10px;
    marginTop: 20,
    marginHorizontal: 200, // راست و چپ
    marginBottom: 15,
  },

  Subprograms_BaseResponse: {
    // flex: 1 1 45%; 
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '45%',
    marginBottom: 30,
  },

  Subprograms_BTH992: {
    // flex: 1 1 31%; 
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '31%',
    marginBottom: 30,
  },

  imgAndTextInSubprograms_baseResponsive: {
    flexDirection: 'row',
    width: 'auto',
  },

  imgAndTextInSubprograms_BTH576: {
    flexDirection: 'column',
    width: '100%',
  },
  imgAndTextInSubprograms_BTH768: {
    flexDirection: 'row',
    width: 'auto',
  },

  roundedPillsCont_baseResponsive: {
    marginLeft: 10,
    marginBottom: 0,
  },
  roundedPillsCont_BTH576: {
    marginLeft: 0,
    marginBottom: 10,
  },
  roundedPillsCont_BTH768: {
    marginLeft: 10,
    marginBottom: 0,
  },

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

  titleStyleResponse_baseResponsive: { textAlign: 'right', },
  titleStyleResponse_BTH576: { textAlign: 'center', },
  titleStyleResponse_BTH768: { textAlign: 'right', },

  valueStyleResponse_baseResponsive: { textAlign: 'right', },
  valueStyleResponse_BTH576: { textAlign: 'center', },
  valueStyleResponse_BTH768: { textAlign: 'right', },
  /////////////////////////////////////////////zare_nk_041126_added_end(for responsives @media)  
});

