//src/screens/folder03Screen.tsx  //zare_nk_041124_okk
// "use client";  //zare_nk_041027_commented
// import { usePathname, useRouter, useSearchParams } from "next/navigation";  //zare_nk_041027_commented
import React, { useEffect, useState, useCallback, useRef } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";  //zare_nk_041027_added
import ReusableButton from "../components/ReusableButton";     //zare_nk_041027_added

// import Link from "next/link";  //zare_nk_041027_commented
// import styles from "@/styles/components/home.module.css";  //zare_nk_041027_commented
// import "@/styles/globals.css";  //zare_nk_041027_commented

// export default function folder03Screen(): React.JSX.Element{   //zare_nk_041027_commented
////zare_nk_041027_added_st
import type { RootStackParamList } from "../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<RootStackParamList, "folder03">;
export default function folder03Screen({
  navigation,
  route,
}: // back,  //zare_nk_040530(ekhtiariye va chon azash estefadeh nakardim commentent kardim)
  // route, //zare_nk_040530(ekhtiariye va chon azash estefadeh nakardim commentent kardim)
  // options, //zare_nk_040530(ekhtiariye va chon azash estefadeh nakardim commentent kardim)
  Props):React.JSX.Element {
  ////zare_nk_041027_added_end

  ////zare_nk_041027_commented_st
  // const fer1 = useRef("z");
  // const router = useRouter();
  // const pathname = usePathname();
  // var searchParams = useSearchParams(); // خواندن کوئری‌های فعلی
  ////zare_nk_041027_commented_end

  const changeCategory = () => {
    ////zare_nk_041027_commented_st
    // const params = new URLSearchParams(searchParams); // ایجاد یک کپی از کوئری‌های فعلی  //zare_nk_041011_nokteh(useSearchParams faghat khandani hast va niaz be URLSearchParams darim baraye set kardan dar params)
    // params.set("category2", "category2Value"); // تغییر مقدار category
    // params.set(fer1.current, "electronics"); // تغییر مقدار category
    // alert("full: " + pathname + '---' + searchParams + '----params: ' + params);
    // router.push(pathname + "?" + params);
    // fer1.current = fer1.current + "a";
    ////zare_nk_041027_commented_end
    ////zare_nk_041027_added_st
    let zVal = 2;
    navigation.navigate("folder03", { tab: 'tab002', category2: "category2Value", z: zVal.toString() });
    ////zare_nk_041027_added_end
  };

  const gofolder02BaPush = () => {
    // router.push("/folder02");      //zare_nk_041027_commented
    navigation.navigate("folder02");  //zare_nk_041027_added
  };
  const gofolder02BaRep = () => {
    // router.replace("/folder02");   //zare_nk_041027_commented
    navigation.replace('folder02');   //zare_nk_041027_added
  };

  return (
    <div>
      {/* <button onClick={changeCategory}>Change Category</button> */}
      <ReusableButton
        title="Change Category"
        onPress={() => { return (changeCategory) }}
        backgroundColor="red"
        textColor="blue"
        width="80%"
      />

      <br />
      {/* <button onClick={gofolder02BaRep}> با ریپلیس folder02</button> */}
      <ReusableButton
        title="با ریپلیس folder02"
        onPress={() => { return (gofolder02BaRep) }}
        backgroundColor="yellow"
        textColor="white"
        width="80%"
      />

      {/* <h2 className={styles.shape}>
        <Link href="/folder02">برو به folder02</Link>
      </h2> */}
      --------------------------------------------------------------------------------
      <div style={{ backgroundColor: "red" }}>
        {/* <button onClick={gofolder02BaPush}> با پوش folder02</button> */}
        <ReusableButton
          title="با پوش folder02"
          onPress={() => { return (gofolder02BaPush) }}
          backgroundColor="yellow"
          textColor="white"
          width="80%"
        />

        <br />
        {/* <button onClick={gofolder02BaRep}> با ریپلیس folder02</button> */}
        <ReusableButton
          title="با ریپلیس folder02"
          onPress={() => { return (gofolder02BaRep) }}
          backgroundColor="yellow"
          textColor="white"
          width="80%"
        />

        {/* <br />
        <Link href="/folder02">با Link</Link>
        <br />
        <Link href="/folder02" replace>با Link</Link>
        <br />
        <a href="/folder02">تگ a</a>
        <br /> */}

      </div>
    </div>
  );
}


