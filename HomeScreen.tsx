import React from 'react';   
import { StyleSheet, Text, View } from 'react-native';

function HomeScreen(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello React Native 003!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'silver',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
    borderWidth:1,borderColor:'yellow',borderStyle:'dashed'
  },
});

export default HomeScreen;