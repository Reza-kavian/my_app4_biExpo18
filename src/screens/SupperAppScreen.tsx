////zare_nk_041126_okk
////zare_nk_041029_added_st
// "use client";   
// import "bootstrap/dist/css/bootstrap.min.css";
// // import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
// import * as bootstrap from "bootstrap";
// import Link from "next/link";  
////zare_nk_041029_added_end
import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  View, Text, Image, TouchableOpacity, StyleSheet, ViewStyle, TextStyle, Alert,
  useWindowDimensions, //zare_nk_041126_added(moadele @media baraye responsive kardane site)
  StyleProp, Modal
} from "react-native";
import ReusableButton from "../components/ReusableButton";
import superMarketIcon from "../assets/images/logoes/superMarket.png";
import gameIcon from "../assets/images/logoes/game.png";
import checklistIcon from "../assets/images/logoes/checklist.png";
import orderIcon from "../assets/images/logoes/order-icon.svg";
import DiscountsAndOffersIcon from "../assets/images/logoes/DiscountsAndOffers.png";

// export default function SupperAppScreen() {  //zare_nk_041029_commented
////zare_nk_041029_added_st
import type { RootStackParamList } from "../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<RootStackParamList, "SupperApp">;
export default function SupperAppScreen({
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
  //////responsive_for_SubprogramsCont_added_end

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

  const goshoppingbasket = () => {
    navigation.replace('shoppingbasket');
  };
  const goGame = () => {
    navigation.replace('folder02');
  };
  const gochecklist = () => {
    navigation.replace('folder02');
  };
  const goOrders = () => {
    navigation.replace('folder02');
  };
  const goDiscountsAndOffers = () => {
    navigation.replace('folder02');
  };

  return (
    <>
      {/* <Modal
        visible={seePricesModalVisible}
        transparent
        animationType="fade"
      >
        <View style={styles.resultOverlay}>
          <View style={styles.resultBox}>
            <Text style={styles.resultTitle}>✅ بارکد شناسایی شد</Text>

            <Text style={styles.resultValue}>
              {scannedValue}
            </Text>

            <Button
              title="تأیید"
              onPress={() => {
                setResultModalVisible(false);
                setModalVisible(false);
                setScannedValue(null);
                setIsScanning(true);
              }}
            />
          </View>
        </View>
      </Modal> */}


      <View style={{ display: "flex", flexDirection: "column", direction: "rtl" }}>
        <View
          style={[styles.SubprogramsCont, SubprogramsContResponse]}
        >
          <View
            style={[styles.Subprograms, SubprogramsResponse]}
          >
            <TouchableOpacity
              style={[styles.buttonInSubprograms]}
              onPress={() => { return (goshoppingbasket) }}
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
                    <Image source={superMarketIcon} style={[styles.logo]} />
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
                        fontFamily: "IRANSansWeb(FaNum)_Bold",
                        color: '#4b4949',
                      }, titleStyleResponse]}>
                      سبد خرید
                    </Text>
                  </View>
                  <View
                    style={{ flexDirection: "row", }}>
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={[{
                          fontFamily: "IRANSansWeb(FaNum)_Medium",
                          color: "#6a6a6a",
                          fontSize: 12,
                        }, valueStyleResponse,]}>
                        امکان مشاهده و ویرایش سبد خرید
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
            style={[styles.Subprograms, SubprogramsResponse]}
          >
            <TouchableOpacity
              style={[styles.buttonInSubprograms]}
              onPress={() => { return (gochecklist) }}
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
                    <Image source={checklistIcon} style={[styles.logo]} />
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
                        fontFamily: "IRANSansWeb(FaNum)_Bold",
                        color: '#4b4949',
                      }, titleStyleResponse]}>
                      مشاهده قیمت ها
                    </Text>
                  </View>
                  <View
                    style={{ flexDirection: "row", }}>
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={[{
                          fontFamily: "IRANSansWeb(FaNum)_Medium",
                          color: "#6a6a6a",
                          fontSize: 12,
                        }, valueStyleResponse,]}>
                        مشاهده اطلاعات کالا با اسکن بارکد
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
            style={[styles.Subprograms, SubprogramsResponse]}
          >
            <TouchableOpacity
              style={[styles.buttonInSubprograms]}
              onPress={() => { return (goOrders) }}
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
                    <Image source={orderIcon} style={[styles.logo]} />
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
                        fontFamily: "IRANSansWeb(FaNum)_Bold",
                        color: '#4b4949',
                      }, titleStyleResponse]}>
                      تاریخچه سفارشات
                    </Text>
                  </View>
                  <View
                    style={{ flexDirection: "row", }}>
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={[{
                          fontFamily: "IRANSansWeb(FaNum)_Medium",
                          color: "#6a6a6a",
                          fontSize: 12,
                        }, valueStyleResponse,]}>
                        گزارش جزئیات سفارشات قبلی
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
            style={[styles.Subprograms, SubprogramsResponse]}
          >
            <TouchableOpacity
              style={[styles.buttonInSubprograms]}
              onPress={() => { return (goDiscountsAndOffers) }}
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
                    <Image source={DiscountsAndOffersIcon} style={[styles.logo]} />
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
                        fontFamily: "IRANSansWeb(FaNum)_Bold",
                        color: '#4b4949',
                      }, titleStyleResponse]}>
                      تخفیفات و پیشنهادات
                    </Text>
                  </View>
                  <View
                    style={{ flexDirection: "row", }}>
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={[{
                          fontFamily: "IRANSansWeb(FaNum)_Medium",
                          color: "#6a6a6a",
                          fontSize: 12,
                        }, valueStyleResponse,]}>
                        مشاهده کالاهای پیشنهادی و پرتخفیف
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
            //  id="Subprograms-1"
            //             className="Subprograms"
            //             style={{
            //               display: "flex",
            //               flexFlow: "row",
            //             }} 
            style={[styles.Subprograms, SubprogramsResponse]}
          >

            <TouchableOpacity
              style={[styles.buttonInSubprograms]}
              onPress={() => { return (goGame) }}
              activeOpacity={0.1}
            >
              <View
                // className="imgAndTextInSubprograms"
                style={[styles.imgAndTextInSubprograms, imgAndTextInSubprogramsResponse]}
              >
                <View
                  // className="roundedPillsCont"
                  style={[styles.roundedPillsCont, roundedPillsContResponse]}
                >
                  <View
                    // className="rounded-pill"
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
                      // width: 'fit-content',
                      minHeight: 85.6,
                    }}
                  >
                    <Image source={gameIcon} style={[styles.logo]} />
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
                      //  flex: "0 0 auto", 
                      flexGrow: 0,
                      flexShrink: 0,
                      flexBasis: 'auto',
                      flexDirection: "row",
                      marginBottom: 7,
                    }}
                  >
                    <Text
                      // className="titleStyle"
                      style={[{
                        fontFamily: "IRANSansWeb(FaNum)_Bold",
                        color: '#4b4949',
                      }, titleStyleResponse]}>
                      بازی و سرگرمی
                    </Text>
                  </View>
                  <View
                    style={{ flexDirection: "row", }}
                  // className="decsInSubprograms"
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        // className="valueStyle"
                        style={[{
                          fontFamily: "IRANSansWeb(FaNum)_Medium",
                          color: "#6a6a6a",
                          fontSize: 12,
                        }, valueStyleResponse,]}>
                        لحظات خوش کودکان در محیط هایپر!
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                // className="leftArrowInSubprograms" 
                style={{ flexDirection: "row" }}>
                {/* <img
                style={{ width: "20px" }}
                src="https://img.tochikala.com/tochikala/left-arrow-03.svg"
                alt="بزن بریم"
              /> */}
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

    </>
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

  resultOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  /////////////////////////////////////////////zare_nk_041126_added_st(for responsives @media) 
  SubprogramsCont_STH576: {
    // padding: 15px 0px;
    paddingVertical: 15,
    paddingHorizontal: 0,

    // margin: 20px 10px 15px 10px;
    marginTop: 20,
    marginHorizontal: 10, // راست و چپ
    marginBottom: 15,
  },
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

