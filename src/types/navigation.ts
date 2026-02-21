//src/types/navigation.ts     //zare_nk_041124_okk
export type RootStackParamList = {
  Splash: { target?: keyof RootStackParamList } | undefined;  //zare_nk_041003_nokteh(yani target shamele yeki az anasore hamin RootStackParamList basheh(mesle Welcome ya Profile va ...))
  Welcome: undefined;
  Profile: undefined;
  Login: undefined;
  AuthCallback: { token: string } | undefined;
  Home: undefined;
  Scanner: undefined;
  TicTacToe: undefined;
  folder02: { id: string, name: string } | undefined; //zare_nk_041027_added
  folder03: { tab: string, category2: string, z: string } | undefined; //zare_nk_041027_added
  SupperGame: undefined; //zare_nk_041029_added
  SupperApp: undefined; //zare_nk_041126_added

  discountsAndOffers: undefined; //zare_nk_041022_added

  shoppingbasket: undefined;  //zare_nk_041127_added
  ordersHistory: undefined;  //zare_nk_041201_added
};
