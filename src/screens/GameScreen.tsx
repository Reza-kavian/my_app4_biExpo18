// src/screens/GameScreen.tsx
import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet, View, Alert } from "react-native";

/* ------------------ Square ------------------ */
type SquareProps = {
    value: string | null;
    onSquareClick: () => void;
    andis: number;

    //refForBtn: React.RefObject<(HTMLButtonElement | null)[]>; //zare_nk_041017_commented(chon ref dar reactnative manteghi nist bekhatere inke ref dar DOM tasir mizasht ke ba web mach bood)
    colorState: "default" | "clicked" | "wined" | "lineWined"; //zare_nk_041017_added

    //className?: string; //zare_nk_041017_commented(chon tage className dar reactnative vojood nadareh)
};

function Square({ value, onSquareClick, andis, colorState }: SquareProps) {//zare_nk_041017_nokteh(colorState jaigozine refForBtne next)
    const getBackgroundColor = () => {
        switch (colorState) {  //zare_nk_041017_nkteh(jaigozine refForBtn ke range dokmeh ha ro migereft masalan(refForBtn.current[index]?.classList.add(Styles.mohrehCliked);))
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

/* ------------------ Board ------------------ */
function Board() {
    const [squares, setSquares] = useState<Squares>(Array(9).fill(null));

    //zare_nk_041017_nokteh(jaigozine  const BtnsColor: (string | null)[] = [...Array(9)].map(() => null); dar nextJs hast)
    const [BtnsColor, setBtnsColor] = useState<("default" | "clicked" | "wined" | "lineWined")[]>(Array(9).fill("default"));

    const handleClick = (index: number) => {
        if (squares[index]) return; // اگر قبلاً انتخاب شده بود، کاری نکن

        const nextSquares = [...squares];
        nextSquares[index] = "X"; // فعلاً همه X می‌زنیم
        setSquares(nextSquares);

        const nextBtnsColor = [...BtnsColor];
        nextBtnsColor[index] = "clicked";
        setBtnsColor(nextBtnsColor);

        const winner = calculateWinner(nextSquares);
        if (winner) {  //zare_nk_041017_nokteh(age barandeh moshakhas shod satre moadel dar BtnsColor bayad range lineWined begirand)
            const [winnerValue, a, b, c] = winner;
            const updatedColors = [...nextBtnsColor];
            [a, b, c].forEach(i => updatedColors[i] = "lineWined");
            setBtnsColor(updatedColors);
            Alert.alert("Winner!", `Player ${winnerValue} won!`);
        }
    };

    return (
        <View style={styles.container}>
            {squares.map((value, index) => (
                <Square
                    key={index}
                    value={value}
                    onSquareClick={() => handleClick(index)}
                    andis={index}
                    colorState={BtnsColor[index]} // الان مشکلی نیست
                />
            ))}
        </View>
    );
}

/* ------------------ GameScreen ------------------ */
export default function GameScreen() {
    return (
        <View style={{ flex: 1 }}>
            <Board />
        </View>
    );
}

/* ------------------ Calculate Winner ------------------ */
type SquareValue = string | null;
type Squares = SquareValue[];
type WinnerResult = [SquareValue, number, number, number];

/**
 * بررسی برنده بازی
 * @param squares آرایه 9 خانه‌ای X/O/null
 * @returns [X|O, index1, index2, index3] یا null
 */
function calculateWinner(squares: Squares): WinnerResult | null {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    for (let line of lines) {
        const [a, b, c] = line;
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return [squares[a], a, b, c];
        }
    }

    return null;
}

/* ------------------ Styles ------------------ */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#fff",
    },
    tripleInRow: {
        width: "30%",
        aspectRatio: 1,
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
