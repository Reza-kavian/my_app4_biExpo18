//src/types/navigation.ts     //zare_nk_050223_okk
export type RootStackParamList = {
  Splash: { target?: keyof RootStackParamList } | undefined;  //zare_nk_041003_nokteh(yani target shamele yeki az anasore hamin RootStackParamList
  // basheh(mesle Welcome ya Profile va ...))
  Welcome: undefined;
  Profile: undefined;
  Login: undefined;
  AuthCallback: { token: string } | undefined;
  Home: undefined;
  Scanner: undefined;
  TicTacToe: undefined;
  folder02: { id: string, name: string } | undefined;  
  folder03: { tab: string, category2: string, z: string } | undefined;  
  SupperGame: undefined;  
  SupperApp: undefined;  
  discountsAndOffers: undefined;  
  shoppingbasket: undefined;  
  ordersHistory: undefined;   
};
