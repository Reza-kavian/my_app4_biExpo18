////zare_nk_041113_okk
import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import axios from "axios";
import { NextJsApiAuthUrl } from "../constants/Urls";
import { protectedScreens } from "../utils/protectedRoutes";
import type { RouteProp } from "@react-navigation/native";
import { Alert } from "react-native"; //zare_nk_040926_added

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Splash">;
type SplashRoute = RouteProp<RootStackParamList, "Splash">;

export default function SplashScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<SplashRoute>();

  useEffect(() => {
    const checkTo23ken = async () => {
      const token = await AsyncStorage.getItem("token");
      Alert.alert('01');
      // نام صفحه‌ای که کاربر قصد ورود دارد
      const targetScreen = route.params?.target || "Welcome";   //zare_nk_040608_added(noe in parametre target bayad RootStackParamList dahkele navigation.ts ezafeh 
      // beshe va meghdaresh ham dar <Stack.Screen ... /> tooye AppNavigator anjam mishe )  //zare_nk_041021_nokteh(albateh meghdaresh dar hengame hedayat behesh ba navigation.navigate taein mishe,
      // mesle navigation.navigate("Splash", { target: "Profile" }))

      if (protectedScreens.includes(targetScreen)) {
        Alert.alert('02');
        if (token) {
          Alert.alert('04');
          try {
            const tokenExpires = await AsyncStorage.getItem("token_expires");
            if (tokenExpires) {
              Alert.alert('06');
              const expiresDate = new Date(tokenExpires).getTime();
              if (expiresDate <= Date.now()) {
                Alert.alert('08');
                // توکن منقضی شده، باید حذفش کنی و کاربر رو لاگ اوت کنی 
                // مثلا هدایت به لاگین یا splash                
                await goToLogin(targetScreen);
              } else {
                Alert.alert('09');
                // توکن هنوز معتبره، می‌تونی استفاده کنی
                const res = await axios.post(NextJsApiAuthUrl + "verifyToken", {
                  token,
                });

                if (res.status === 200) {
                  Alert.alert('10');
                  navigation.replace(targetScreen); // moadele const response = NextResponse.next();
                } else {
                  Alert.alert('11');
                  await goToLogin(targetScreen);
                }
              }
            } else {
              Alert.alert('07');
              // توکن یا تاریخ انقضا وجود نداره، احتمالا لاگین نیست 
              await goToLogin(targetScreen);
            }
          } catch (e) {
            await goToLogin(targetScreen);
          }
        } else {
          Alert.alert('05');
          await goToLogin(targetScreen);
        }
      } else {
        Alert.alert('03');
        navigation.replace(targetScreen); // صفحه آزاد
      }
    };
    checkToken();
  }, []);

  const goToLogin = async (targetScreen: any) => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("token_expires");
    await AsyncStorage.setItem("redirect", targetScreen);
    navigation.replace("Login");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator
        size="small"
        color="orange"
        style={{ marginTop: 30 }}
        animating={true}
      />
    </View>
  );
}