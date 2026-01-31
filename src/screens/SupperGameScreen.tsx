////zare_nk_041029_added_st
// "use client";   
// import "bootstrap/dist/css/bootstrap.min.css";
// // import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
// import * as bootstrap from "bootstrap";
// import Link from "next/link";  
////zare_nk_041029_added_end
import React, { useEffect, useState, useCallback, useRef } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";  //zare_nk_041029_added
import ReusableButton from "../components/ReusableButton";     //zare_nk_041029_added

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
  ////zare_nk_041029_added_end

  const goGame = () => {
    navigation.replace('folder02');
  };
  ////zare_nk_041029_added_end
  return (
    <View style={{ display: "flex", flexDirection: "column", direction: "rtl" }}>
      <View
        id="SubprogramsCont"
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <View
          id="Subprograms-1"
          // className="Subprograms"          
          style={[
            styles.Subprograms, {
              flexDirection: 'row'
            }
          ]}
        >
          <ReusableButton
            onPress={() => { return (goGame) }}
            backgroundColor="yellow"
            textColor="white"
            width="80%"
          // className="vorsab"
          // href="/Game"
          // style={{
          //   width: "100%",
          //   display: "flex",
          //   flexDirection: "row",
          //   justifyContent: "space-between",
          // padding: "15px",
          // outline: "none",
          // alignItems: "center",
          // border: "1px solid #E7E7E7",
          // boxShadow: "#D7D6D6 0px 0px 2px 0px",
          // borderRadius: "25px",
          // backgroundColor: "white",
          // overflow: "hidden",
          // }}
          >
            <View
              className="imgAndTextInSubprograms"
              style={{ display: "flex" }}
            >
              <View
                className="roundedPillsCont"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "fit-content",
                }}
              >
                <View
                  className="rounded-pill"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    border: "1px solid #E7E7E7",
                    padding: "10px",
                    borderRadius: "50%",
                  }}
                >
                  <img
                    style={{ width: "64px" }}
                    src="/images/Subprograms/TIC-TAC-TOE.jfif"
                    alt="هایپر&zwnj;کرفو"
                  />
                </View>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  width: "fit-content",
                }}
              >
                <View
                  style={{
                    flex: "0 0 auto",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <span className="titleStyle">بازی و سرگرمی</span>
                </View>
                <View
                  style={{ flexDirection: "row", fontSize: "75%" }}
                  className="decsInSubprograms"
                >
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <span className="valueStyle">
                      لحظات خوش کودکان در محیط هایپر!
                    </span>
                  </View>
                </View>
              </View>
            </View>
            <View
              // className="leftArrowInSubprograms" 
              style={[styles.leftArrowInSubprograms, { flexDirection: "row" }]}>
              {/* <img
                style={{ width: "20px" }}
                src="https://img.tochikala.com/tochikala/left-arrow-03.svg"
                alt="بزن بریم"
              /> */}
              <Image
                // source={require("../assets/icon.png")} 
                source={{ uri: "https://img.tochikala.com/tochikala/left-arrow-03.svg" }}
                style={{ width: 20 }}
              />

            </View>
          </ReusableButton>
        </View>
        <View
          id="Subprograms-temp-1"
          // className="Subprograms"
          style={[
            styles.Subprograms,
            { display: "flex", flexDirection: "row" }
          ]} 
        ></View>
        <View
          id="Subprograms-temp-2"
          // className="Subprograms"
          style={[
            styles.Subprograms,
          ]}
          style={{ display: "flex", flexDirection: "row" }}
        ></View>
        <View
          id="Subprograms-temp-3"
          // className="Subprograms"
          style={[
            styles.Subprograms,
          ]}
          style={{ display: "flex", flexDirection: "row" }}
        ></View>
        <View
          id="Subprograms-temp-4"
          // className="Subprograms"
          style={[
            styles.Subprograms,
          ]}
          style={{ display: "flex", flexDirection: "row" }}
        ></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  idUSerTextStyle: {
    // flex: 1,
    // minHeight: "23%",
    // margin: 2,
    // justifyContent: "center",
    // alignItems: "center",
    borderWidth: 2,
    borderColor: "#ccc",
    borderStyle: 'dotted',
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  ////zare_nk_041029_added_st
  imgAndTextInSubprograms: {
    flexDirection: 'column',
    //flex: 1,
    alignItems: 'center'
  },

  leftArrowInSubprograms: {
    display: 'none'
  },

  roundedPillsCont: {
    marginLeft: 0,
    marginBottom: 10
  },

  navarbala: {
    justifyContent: 'space-between',
    flexDirection: 'row'
  },

  sabadLoginContFrmCont: {
    flex: 0
  },

  AddAddressCont: {
    flex: 1
  },

  sabadLoginCont: {
    flex: 0
  },

  marginLess768: {
    marginLeft: 20
  },

  SubprogramsTitle: {
    marginTop: 10,
    marginRight: 10,
    marginBottom: 15,
    marginLeft: 10
  },

  SubprogramsCont: {
    paddingTop: 15,
    paddingBottom: 15,
    marginTop: 20,
    marginRight: 10,
    marginBottom: 15,
    marginLeft: 10
  },

  Subprograms: {
    flex: 1,
    marginBottom: 30,
  },

  decsInSubprograms: {
    display: 'none'
  },

  //   .Subprograms:nth-child(odd) .vorsab {
  //     margin-left: 30px;
  //   }

  ////zare_nk_041029_added_end
});




// @media screen and (min-width: 990px) {
//   #sabadLoginContFrmCont {
//     flex: 0 0 33%;
//   }

//   #AddAddressCont {
//     flex: 0 0 33%;
//   }

//   .nearStores {
//     flex: 1 1 45%;
//   }

//   .nearStores:nth-child(odd) {
//     margin-left: 10px;
//   }

//   #SubprogramsTitle {
//     margin: 10px 50px 15px 50px;
//   }

//   #SubprogramsCont {
//     padding: 15px 0px;
//     margin: 20px 50px 15px 50px;
//     /* zare_nk_040228_added */
//     /* background-color: red; */
//   }

//   .Subprograms {
//     flex: 1 1 31%;
//     margin-bottom: 30px;
//   }

//   /* zare_nk_040228_commented_st */
//   /* .Subprograms:not(:nth-child(3n)) {
//     margin-left: 30px;
//   } */
//   /* zare_nk_040228_commented_end */
//   /* zare_nk_040228_added_st */
//   .Subprograms:not(:nth-child(3n)) .vorsab {
//     margin-left: 30px;
//   }

//   /* zare_nk_040228_added_end */

//   .decsInSubprograms {
//     display: flex;
//   }

//   .imgAndTextInSubprograms {
//     flex-flow: row;
//   }

//   .leftArrowInSubprograms {
//     display: flex;
//   }

//   .roundedPillsCont {
//     margin-left: 10px;
//   }

//   #sabadLoginCont {
//     flex: 0 0 auto;
//   }

//   #LogoAboveCont {
//     display: none;
//   }

//   #ourStorsAndLogoCont {
//     display: flex;
//     justify-content: space-between;
//   }

//   #AdressModal .modal-content,
//   #AdressLocationModal .modal-content,
//   #AdressLocationModal2 .modal-content {
//     height: 90vh;
//   }

//   #navarbala {
//     flex-flow: row-reverse;
//   }

//   .LogoAbove {
//     display: none;
//   }

//   .LogoBelow {
//     display: flex;
//   }

//   #AddAddress span {
//     max-width: 350px;
//   }

//   #ourSroresCont {
//     padding-left: 20px;
//   }

//   #LayOutFooter {
//     flex-flow: row;
//     height: 175px;
//     padding: 0px 15px;
//   }

//   #LayOutFooter #secondFotersCol .spanCont {
//     justify-content: end;
//   }

//   .FotersCol {
//     flex: 1 0 31%;
//   }

//   #RightsReserved {
//     flex-flow: row-reverse;
//   }

//   #RightsReserved img {
//     margin-left: 20px;
//   }

//   #SocialNetworksCont {
//     width: auto;
//     justify-content: start;
//   }

//   #SocialNetworksCont > div {
//     margin-left: 25px;
//   }

//   #contactSupCont {
//     display: flex;
//   }

//   #contactUsAndSuoInMobileCont {
//     display: none;
//   }

//   #TrostLogoContCont {
//     justify-content: start;
//   }

//   #TrostLogoContCont > div {
//     width: 60px;
//     height: 60px;
//   }

//   #TrostLogoContCont img {
//     width: 35px;
//   }
// }

// @media screen and (min-width: 1400px) {
//   #SubprogramsTitle {
//     margin: 10px 200px 15px 200px;
//   }

//   #SubprogramsCont {
//     padding: 15px 0px;
//     margin: 20px 200px 15px 200px;
//   }

//   .imgAndTextInSubprograms {
//     flex-flow: row;
//   }

//   .leftArrowInSubprograms {
//     display: flex;
//   }

//   .roundedPillsCont {
//     margin-left: 10px;
//   }
// }

// @media screen and (max-width: 990px) {
//   #sabadLoginContFrmCont {
//     flex: 0 0 100%;
//   }

//   #InsabadAndLogin #sabadicon {
//     margin-top: 7px;
//   }

//   #AddAddressCont {
//     flex: 0 0 100%;
//   }

//   #ourStorsAndLogoCont {
//     display: none;
//   }

//   .nearStores {
//     flex: 1 1 95%;
//   }

//   #SubprogramsTitle {
//     margin: 10px 10px 15px 10px;
//   }

//   #SubprogramsCont {
//     padding: 15px 0px;
//     margin: 20px 10px 15px 10px;
//     /* zare_nk_040228_added */
//     /* background-color: green; */
//   }

//   .Subprograms {
//     flex: 1 1 45%;
//     margin-bottom: 30px;
//   }

//   /* zare_nk_040228_commented_st */
//   /* .Subprograms:nth-child(odd) {
//     margin-left: 30px;
//   }   */
//   /* zare_nk_040228_commented_end */
//   /* zare_nk_040228_added_st */
//   .Subprograms:nth-child(odd) .vorsab {
//     margin-left: 30px;
//   }

//   /* zare_nk_040228_added_end */

//   .decsInSubprograms {
//     display: none;
//   }

//   .imgAndTextInSubprograms {
//     flex-flow: row;
//   }

//   .leftArrowInSubprograms {
//     display: flex;
//   }

//   .roundedPillsCont {
//     margin-left: 10px;
//   }

//   #sabadLoginCont {
//     flex: 1 0 auto;
//   }

//   #LogoAboveCont {
//     display: flex;
//   }

//   #ourStorsAndLogoCont {
//     justify-content: center;
//     justify-items: center;
//   }

//   #AdressModal .modal-content,
//   #AdressLocationModal .modal-content,
//   #AdressLocationModal2 .modal-content {
//     height: 100vh;
//     margin-top: 0px;
//     margin-bottom: 0px;
//     padding-top: 0px;
//     padding-bottom: 0px;
//   }

//   #navarbala {
//     flex-flow: column;
//   }

//   #AddAddressCont {
//     margin-bottom: 0px;
//   }

//   .LogoAbove {
//     display: flex;
//   }

//   .LogoBelow {
//     display: none;
//   }

//   #AddAddress span {
//     max-width: 100%;
//   }

//   #LayOutFooter {
//     flex-flow: column;
//     height: auto;
//   }

//   #LayOutFooter #secondFotersCol {
//     margin-top: 20px;
//   }

//   #LayOutFooter #secondFotersCol .spanCont {
//     justify-content: start;
//   }

//   #LayOutFooter #thirdFotersCol {
//     padding-top: 10px;
//   }

//   #secondFotersCol {
//     height: 130px;
//     border-bottom: 2px solid #f0f0f0;
//     align-content: space-between;
//   }

//   #contInThirdFotersCol {
//     width: 100%;
//   }

//   #RightsReserved {
//     flex-flow: column-reverse;
//   }

//   #SocialNetworksCont {
//     width: 100%;
//     justify-content: space-between;
//   }

//   #contactSupCont {
//     display: none;
//   }

//   #contactUsAndSuoInMobileCont {
//     display: flex;
//   }

//   #TrostLogoTitleCont {
//     display: none;
//   }

//   #TrostLogoContCont {
//     justify-content: space-between;
//   }

//   #TrostLogoContCont > div {
//     width: 70px;
//     height: 70px;
//   }

//   #TrostLogoContCont img {
//     width: 45px;
//   }
// }

// @media screen and (max-width: 768px) {
// #MyOrdersCont {
//   margin-top: 10px;
//   padding: 0px 10px;
// }

// .imgAndTextInSubprograms {
//   flex-flow: column;
//   flex: 1 0 auto;
//   align-items: center;
// }

// .leftArrowInSubprograms {
//   display: none;
//   /*zare_nk_0507(age doost dashtam namayesh dadesh flex mikonam)*/
// }

// .roundedPillsCont {
//   margin-left: 0px;
//   margin-bottom: 10px;
// }

// #navarbala {
//   justify - content: space - between;
//   flex - flow: row;
// }

// #sabadLoginContFrmCont {
//   flex: 0 0 content;
// }

// #AddAddressCont {
//   flex: 1 1 auto;
// }

// #sabadLoginCont {
//   flex: 0 0 auto;
// }

// #tempForMax768 {
//   display: flex;
// }

//   .marginLess768 {
//   margin - left: 20px;
// }
// }