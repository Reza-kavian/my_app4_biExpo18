// src/navigation/AppNavigator.tsx    //zare_nk_050201_okk
// import { NavigationContainer } from "@react-navigation/native";  //zare_nk_040604_commented
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../screens/SplashScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import AuthCallbackScreen from "../screens/AuthCallbackScreen";
import ScannerScreen from "../screens/ScannerScreen";
import TicTacToeScreen from "../screens/TicTacToeScreen";
import SupperGameScreen from "../screens/SupperGameScreen";
import discountsAndOffersScreen from "../screens/discountsAndOffersScreen";
import folder02Screen from "../screens/folder02Screen";
import folder03Screen from "../screens/folder03Screen";
import shoppingbasketScreen from "../screens/shoppingbasketScreen";
import ordersHistoryScreen from "../screens/ordersHistoryScreen";

import type { RootStackParamList } from "../types/navigation";
import MyCustomHeader from "../components/MyCustomHeader";

// import "@/styles/globals.css";  //zare_nk_040609_added

const Stack = createNativeStackNavigator<RootStackParamList>();
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
const AppNavigator = () => {
  return (
    // <NavigationContainer>  //zare_nk_040604_commented(NavigationContainer ra dar App.tsx lahaz kardim)
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={({ navigation }) => ({
        // header: (props) => <MyCustomHeader {...props} />, //zare_nk_041007_commented(dorosteh va noesh pishfarz any manzoor misheh, vali chon nazashtim doostdare typeScript nist)
        header: (props: NativeStackHeaderProps) => <MyCustomHeader {...props} />, //zare_nk_041007_added(doostdare typeScript hast)
        ////zare_nk_050201_nokteh(<MyCustomHeader {...props} /> moadel ast ba : <MyCustomHeader navigation={...} route={...} options={...} />)
        ////zare_nk_050201_nokteh(<MyCustomHeader props={props} /> molahezeh mishe ke az raveshe classice seda zadane component va meghdar dehiye parametrhayash estefadeh kardim )

        headerShown: true,  //zare_nk_050129_added(pish farz inja true hast, man jahate moroor gozashtam)
      })}
    >
      <Stack.Screen name="Home" component={HomeScreen}
        options={({ navigation }) => ({
          //header: (props) => <MyCustomHeader {...props} />, //zare_nk_040530_commented(chon dar pedarash yani Stack.Navigator 
          // MyCustomHeader ra baraye kolle safahat manzoor kardim inja baraye tak tak safahat zekr nemikonim)
          title: "همیار خرید",   //zare_nk_041008_nokteh(options.title === "همیار خرید")
          headerShown: true,
        })}
      />

      <Stack.Screen name="Splash" component={SplashScreen} />

      <Stack.Screen
        name="Welcome"  //zare_nk_041008_nokteh(route.name === "Profile")
        component={WelcomeScreen}
        options={({ navigation }) => ({
          //header: (props) => <MyCustomHeader {...props} />,//zare_nk_040530_commented(chon dar pedarash yani Stack.Navigator MyCustomHeader ra baraye kolle safahat manzoor kardim inja baraye tak tak safahat zekr nemikonim)
          title: "ولکام",   //zare_nk_041008_nokteh(options.title === "ولکام")
          headerShown: true,
        })}
      />

      <Stack.Screen name="Profile" component={ProfileScreen} />

      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      {/* zare_nk_040608_added */}
      <Stack.Screen name="AuthCallback" component={AuthCallbackScreen} />

      <Stack.Screen name="Scanner" component={ScannerScreen} />

      <Stack.Screen
        name="TicTacToe"
        component={TicTacToeScreen}
        options={({ navigation }) => ({
          title: "گیم",
          headerShown: true,
        })}
      />

      <Stack.Screen
        name="discountsAndOffers"
        component={discountsAndOffersScreen}
        options={({ navigation }) => ({
          title: "تخفیفات و پیشنهادات",
          headerShown: true,
        })}
      />

      <Stack.Screen
        name="folder02"
        component={folder02Screen}
        options={({ navigation }) => ({
          title: " فولدر 02",
          headerShown: true,
        })}
      />

      <Stack.Screen
        name="folder03"
        component={folder03Screen}
        options={({ navigation }) => ({
          title: " فولدر 03",
          headerShown: true,
        })}
      />

      <Stack.Screen
        name="SupperGame"
        component={SupperGameScreen}
        options={({ navigation }) => ({
          title: "سوپرگیم",
          headerShown: true,
        })}
      />

      <Stack.Screen
        name="shoppingbasket"
        component={shoppingbasketScreen}
        options={({ navigation }) => ({
          title: "سبد خرید",
          headerShown: true,
        })}
      />

      <Stack.Screen
        name="ordersHistory"
        component={ordersHistoryScreen}
        options={({ navigation }) => ({
          title: "تاریخچه سفارش",
          headerShown: true,
        })}
      />

    </Stack.Navigator>
    // </NavigationContainer>  //zare_nk_040604_commented(NavigationContainer ra dar App.tsx lahaz kardim)
  );
};

export default AppNavigator;
