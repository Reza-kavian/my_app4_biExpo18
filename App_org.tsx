//zare_nk_040926_okk
import React, { useState } from 'react';
import { View, Button } from 'react-native';
import HomeScreen from './HomeScreen';
import ScannerScreen from './ScannerScreen';

function App(): React.JSX.Element {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'scanner'>(
    'home',
  );

  return (
    <View style={{ flex: 1 ,borderWidth:1,borderColor:'yellow',borderStyle:'dashed'}}>
      {currentScreen === 'home' ? <HomeScreen /> : <ScannerScreen />}
      <View style={{ position: 'absolute', bottom: 50, alignSelf: 'center' }}>
        <Button
          title={currentScreen === 'home' ? 'رفتن به اسکنر' : 'برگشت به خانه'}
          onPress={() =>
            setCurrentScreen(currentScreen === 'home' ? 'scanner' : 'home')
          }
        />
      </View>
    </View>
  );
}

export default App;
