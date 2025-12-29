//src/types/navigation.ts     //zare_nk_041008_okk
export type RootStackParamList = {
  Splash: { target?: keyof RootStackParamList } | undefined;  //zare_nk_041003_nokteh(yani target shamele yeki az anasore hamin RootStackParamList basheh(mesle Welcome ya Profile va ...))
  Welcome: undefined;
  Profile: undefined;
  //   Profile: { userId: string } | undefined; // یا هر پارامتری که نیاز داری
  Login: undefined;
  AuthCallback: { token: string } | undefined;  
  Home: undefined;  
  Scanner: undefined;
};
