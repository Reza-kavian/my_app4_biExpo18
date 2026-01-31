////zare_nk_041108_okk
import React from "react";    
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

type SquareProps = {
  value: string | null;
  onSquareClick: () => void;
  andis: number;
  
  //refForBtn: React.RefObject<(HTMLButtonElement | null)[]>; //zare_nk_041017_commented(chon ref dar reactnative manteghi nist bekhatere inke ref dar DOM tasir mizasht ke ba web mach bood)
  colorState: "default" | "clicked" | "wined" | "lineWined"; //zare_nk_041017_added
  
  //className?: string; //zare_nk_041017_commented(chon tage className dar reactnative vojood nadareh)
};

export default function Square({
  value,
  onSquareClick,
  andis,
  colorState,   //zare_nk_041017_nokteh(jaigozine refForBtne next)
}: SquareProps) {
  const getBackgroundColor = () => {
    switch (colorState) {
      case "clicked":
        return styles.mohrehCliked;
      case "wined":
        return styles.mohrehWined;
      case "lineWined":
        return styles.lineWined;
      default:
        return styles.mohreh;
    }
  };

  return (
    <View style={styles.tripleInRow}>
      <TouchableOpacity style={getBackgroundColor()} onPress={onSquareClick}>
        <Text style={styles.text}>{value}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tripleInRow: {
    flex: 1,
    minHeight: "23%",
    margin: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  mohreh: {
    width: "100%",
    height: "100%",
    backgroundColor: "#d7d6d6",
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  mohrehCliked: {
    width: "100%",
    height: "100%",
    backgroundColor: "orange",
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  mohrehWined: {
    width: "100%",
    height: "100%",
    backgroundColor: "green",
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  lineWined: {
    width: "100%",
    height: "100%",
    backgroundColor: "red",
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});

