////zare_nk_041113_added_st
// import { notFound } from "next/navigation";
// import Image from "next/image";
// import styles from "@/styles/components/home.module.css";
// import Image002 from "@/assets/images/002.jpg"; 
// import { metadata as layoutMetadata } from "../layout"; //zare_nk_040131_nokteh(mitavan metadata ra az layout import nakard,inja import kardam ta roosh dastkari konam)
// export const metadata = { //zare_nk_041013_nokteh(be khatere in dastkari majboor shodim metadata ra az layout import konim vagarnah barnameh automat metadata ra dar tage html title gharar midad)
//     title: `${layoutMetadata.title} - About`,
// };
////zare_nk_041028_commented_end
import React, { useEffect, useState, useCallback, useRef } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";  //zare_nk_041027_added
import ReusableButton from "../components/ReusableButton";     //zare_nk_041027_added

import SplashIcon from "../assets/splash-icon.png"; //zare_nk_041107_nokteh(TypeScript zatan faghat .ts .tsx .js .json ro beonvane module mojaze import kardan mishnase
// be haminkhater ma majboorim ke dar file images.d.ts type png ra beonvane mojaz tarif konim va be typeScript begim be in type hengame import kardanaha gire sepich nedeh!
// darzemn behtare ke dar tsconfig.json ham dar include name file images.d.ts ra gheid konim(makhsoosan age images.d.ts dar risheye projeh nabashe,
// albateh chon alan dar risheye projeh hast mamoolan gir nemideh age dar tsconfig.json lahaz nakonim))

export default function Page() {
    ////zare_nk_041028_commented_st
    //   if (process.env.NODE_ENV === "production") { 
    //     console.log('zare_nk_040522_process.env.NODE_ENV === "production"');
    //     notFound(); //نمایش صفحه 404
    //     // یا redirect("/") // به صفحه اصلی بفرست
    //     return null;
    //   }
    ////zare_nk_041028_commented_end
    return (
        <>
            {/* <h1 className={styles.shape}>salam 002</h1> */}
            <Text
                style={[
                    styles.idUSerTextStyle,
                    { fontFamily: "IRANSansWeb_UltraLight" },
                ]}
            >
                salam 002
            </Text>

            {/* <img src="./images/002.jpg" style={{ border: "4px dashed silver" }} /> */}
            <Image
                // source={require("../assets/icon.png")} 
                source={{ uri: "https://img.tochikala.com/Logo/photo14359415832-Copy.jpg" }}
                style={[styles.logo]}
            />

            <br />
            {/* <Image alt="ggg" src={Image002} style={{ border: "4px dashed yellow" }} /> */}
            <Image
                source={require("../assets/icon.png")}
                // source={{ uri: "https://img.tochikala.com/Logo/photo14359415832-Copy.jpg" }}
                style={[styles.logo]}
            />
            <br />
            {/* <img
                src="https://www.tutorialspoint.com/market/public/assets/newDesign/img/heroSliderItem6.svg"
                style={{ border: "6px dotted blue" }}
            /> */}
              <Image
                source={require("../assets/favicon.png")}
                // source={{ uri: "https://img.tochikala.com/Logo/photo14359415832-Copy.jpg" }}
                style={[styles.logo]}
            />
            <br />
            {/* <img
                src="https://www.netafraz.com//images/standard_service.png"
                style={{ border: "6px dotted blue" }}
            /> */}
             <Image
                source={require("../assets/icon.png")}
                // source={{ uri: "https://img.tochikala.com/Logo/photo14359415832-Copy.jpg" }}
                style={[styles.logo]}
            />
            <br />
            {/* <Image
                alt="Image003"
                width="300"
                height="200"
                src="https://www.netafraz.com/images/standard_service.png"
                style={{ border: "4px dashed orange" }}
            /> */}
              {/* <Image
                source={require("../assets/splash-icon.png")}
                // source={{ uri: "https://img.tochikala.com/Logo/photo14359415832-Copy.jpg" }}
                style={[styles.logo]}
            /> */}

            <Image source={SplashIcon}  style={[styles.logo]} />
        </>
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
});