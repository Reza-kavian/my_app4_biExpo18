// src/navigation/AppNavigator.tsx    //zare_nk_041124_okk
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

import discountsAndOffersScreen from "../screens/discountsAndOffersScreen";  //zare_nk_041022_added

import folder02Screen from "../screens/folder02Screen";   //zare_nk_041027_added
import folder03Screen from "../screens/folder03Screen";   //zare_nk_041027_added

import SupperAppScreen from "../screens/SupperAppScreen";   //zare_nk_041027_added
import shoppingbasketScreen from "../screens/shoppingbasketScreen";   //zare_nk_041127_added

import type { RootStackParamList } from "../types/navigation";
import MyCustomHeader from "../components/MyCustomHeader";

// import "@/styles/globals.css";  //zare_nk_040609_added

const Stack = createNativeStackNavigator<RootStackParamList>();
import { NativeStackHeaderProps } from "@react-navigation/native-stack";  //zare_nk_041007_added
const AppNavigator = () => {
  return (
    // <NavigationContainer>  //zare_nk_040604_commented(NavigationContainer ra dar App.tsx lahaz kardim)
    <Stack.Navigator
      initialRouteName="SupperApp"
      screenOptions={({ navigation }) => ({
        // header: (props) => <MyCustomHeader {...props} />, //zare_nk_041007_commented(dorosteh va noesh pishfarz any manzoor misheh, vali chon nazashtim doostdare typeScript nist)
        header: (props: NativeStackHeaderProps) => <MyCustomHeader {...props} />, //zare_nk_041007_added(doostdare typeScript hast)
      })}
    >
      <Stack.Screen name="Home" component={HomeScreen} />

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

      {/* zare_nk_041022_added_st */}
      <Stack.Screen
        name="discountsAndOffers"
        component={discountsAndOffersScreen}
        options={({ navigation }) => ({
          title: "تخفیفات و پیشنهادات",
          headerShown: true,
        })}
      />
      {/* zare_nk_041022_added_end */}


      {/* zare_nk_041027_added_st */}
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
      {/* zare_nk_041027_added_end */}

      {/* zare_nk_041029_added_st */}
      <Stack.Screen
        name="SupperGame"
        component={SupperGameScreen}
        options={({ navigation }) => ({
          title: "سوپرگیم",
          headerShown: true,
        })}
      />
      {/* zare_nk_041029_added_ثدی */}

      {/* zare_nk_041126_added_st */}
      <Stack.Screen
        name="SupperApp"
        component={SupperAppScreen}
        options={({ navigation }) => ({
          title: "سوپر اپ",
          headerShown: true,
        })}
      />
      {/* zare_nk_041126_added_end */}
      
      {/* zare_nk_041127_added_st */}
      <Stack.Screen
        name="shoppingbasket"
        component={shoppingbasketScreen}
        options={({ navigation }) => ({
          title: "سبد خرید",
          headerShown: true,
        })}
      />
      {/* zare_nk_041127_added_end */}

      

    </Stack.Navigator>
    // </NavigationContainer>  //zare_nk_040604_commented(NavigationContainer ra dar App.tsx lahaz kardim)
  );
};

export default AppNavigator;

{
  /* <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }} >   */
}
{
  /*zare_nk_040426_ screenOptions mige kolle safahat az header estefadeh nakonam */
}
{
  /* <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} /> */
}
{
  /*zare_nk_040426_ options mige in safheh az header estefadeh nakone */
}
