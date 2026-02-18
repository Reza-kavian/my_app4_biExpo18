// src/screens/TicTacToeScreen.tsx   //zare_nk_041124_okk
import AsyncStorage from "@react-native-async-storage/async-storage";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { TouchableOpacity, Text, StyleSheet, View, Alert, ScrollView } from "react-native"; 
   
/* ------------------ Square ------------------ */
type SquareProps = {
    value: string | null;
    onSquareClick: () => void;
    andis: number;

    //refForBtn: React.RefObject<(HTMLButtonElement | null)[]>; //zare_nk_041017_commented(chon ref dar reactnative manteghi nist bekhatere inke ref dar DOM tasir mizasht ke ba web mach bood)
    colorState: "default" | "clicked" | "wined" | "lineWined"; //zare_nk_041017_added

    //className?: string; //zare_nk_041017_commented(chon tage className dar reactnative vojood nadareh)
};

function Square({ value, onSquareClick, andis, colorState }: SquareProps) {  //zare_nk_041017_nokteh(colorState jaigozine refForBtne next)
    const getBackgroundColor = () => {
        switch (colorState) {  //zare_nk_041017_nkteh(jaigozine className ke range dokmeh ha ro migereft masalan,chon dar 
        // reactNative attribute className mani nadare baraye module.css va bejash az StyleSheet estefadeh mishe(className={Styles.mohreh})
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
type BoardProps = {
    squares: Squares;
    onPlay: (nextSquares: Squares) => void;
    xIsNextState: boolean;
    setXIsNextState: React.Dispatch<React.SetStateAction<boolean>>;
    BtnsColor: ("default" | "clicked" | "wined" | "lineWined")[];
    setBtnsColor: React.Dispatch<
        React.SetStateAction<("default" | "clicked" | "wined" | "lineWined")[]>
    >;
    // setTimer: React.Dispatch<React.SetStateAction<number>>;  //zare_nk_041124_commented
    setTimer: React.Dispatch<React.SetStateAction<ReturnType<typeof setInterval>>>;   //zare_nk_041124_added
};

function Board({
    squares,
    onPlay,
    xIsNextState,
    setXIsNextState,
    BtnsColor,
    setBtnsColor,
    setTimer,
}: BoardProps) {
    const handleClick = (index: number) => {
        if (squares[index] || calculateWinner(squares)) return;
        setTimer(5);

        const nextSquares = [...squares];
        nextSquares[index] = xIsNextState ? "X" : "O";
        onPlay(nextSquares);
        setXIsNextState(!xIsNextState);

        const nextBtnsColor = [...BtnsColor];
        nextBtnsColor[index] = "clicked";
        setBtnsColor(nextBtnsColor);

        const winner = calculateWinner(nextSquares);
        if (winner) {
            const [winnerValue, a, b, c] = winner;
            const updatedColors = [...nextBtnsColor];
            [a, b, c].forEach(i => (updatedColors[i] = "lineWined"));
            setBtnsColor(updatedColors);
            setTimer(0);
            Alert.alert("Winner!", `Player ${winnerValue} won!`);
        }
    };
//zare_nk_041124(wined gonjoondeh nashod!!)
    return (
        <View style={styles.container}>
            {squares.map((value, index) => (
                <Square
                    key={index}
                    value={value}
                    onSquareClick={() => handleClick(index)}
                    andis={index}
                    colorState={BtnsColor[index]}
                />
            ))}
        </View>
    );
}

/* ------------------ TicTacToeScreen ------------------ */
export default function TicTacToeScreen() {
    const TURN_TIME = 5; // ثانیه
    const initialSquares = Array(9).fill(null);
    const [history, setHistory] = useState<Squares[]>([initialSquares]);
    const [currentMove, setCurrentMove] = useState(0);
    const [xIsNextState, setXIsNextState] = useState(true);

    const [BtnsColor, setBtnsColor] = useState<
        ("default" | "clicked" | "wined" | "lineWined")[]
    >(Array(9).fill("default"));

    const [timer, setTimer] = useState<number>(TURN_TIME);

    // const intervalRef = useRef<NodeJS.Timeout | null>(null); //zare_nk_041017_commented(makhsoose web) 
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null); //zare_nk_041017_added(jaigozin dar reactNative ke albateh dar nextjs ham javab mideh , 
    // pishnahad mishe in tarif baraye setInterval. yani khodet boro noe vagheiye khoroojiye setInterval ra dar mohtavaha kashf kon(albate in noe dar reactNative number khahad bood))

    const currentSquares = history[currentMove];
    /* -------------------- LOAD TIMER -------------------- */
    useEffect(() => {
        (async () => {
            const storedTimer = await AsyncStorage.getItem("timer");
            if (storedTimer !== null) {
                setTimer(Number(storedTimer));
            }
        })();
    }, []);

    /* -------------------- TIMER EFFECT -------------------- */
    useEffect(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        if (calculateWinner(currentSquares)) {  //zare_nk_041021_nokteh(age bazi tamoom shodeh timer ejra neshe)
            return;
        }

        intervalRef.current = setInterval(() => {
            setTimer(prev => {
                if (prev <= 1) {
                    setXIsNextState(cur => !cur);
                    return TURN_TIME;
                }
                return prev - 1;
            });
        }, 1000) as unknown as number;

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [currentMove, xIsNextState]);

    /* -------------------- SAVE TIMER -------------------- */
    useEffect(() => {
        AsyncStorage.setItem("timer", timer.toString());
    }, [timer]);

    /* -------------------- HANDLE PLAY -------------------- */
    const handlePlay = useCallback(
        (nextSquares: Squares) => {
            const nextHistory = [
                ...history.slice(0, currentMove + 1),
                nextSquares,
            ];
            setHistory(nextHistory);
            setCurrentMove(nextHistory.length - 1);
            setTimer(TURN_TIME);
        },
        [history, currentMove]
    );

    /* -------------------- JUMP TO -------------------- */
    const jumpTo = (move: number) => {
        setCurrentMove(move);
        setTimer(TURN_TIME);
        const nextSquares = history[move];
        const newBtnsColor = nextSquares.map(val =>
            val ? "clicked" : "default"
        );
        setBtnsColor(newBtnsColor);
        setXIsNextState(move % 2 === 0);  //zare_nk_041018_tahlilshe(shayad hkaneye zoj ke bayad X bashe vali bekhatere payane mohlate zamani be O taalogh gerefteh bashe! pas formoole taeine zojo fard ehtemalan daghigh nist)
    };

    /* -------------------- MOVES LIST -------------------- */
    const moves = history.map((squaresInMove:Squares, move:number) => {
        const description =
            move === currentMove
                ? `شما در آرشیو ${move + 1} هستید`
                : `برو به آرشیو ${move + 1}`;

        const mokhtasatInDescription = squaresInMove
            .map((val, idx) => (val ? idx : null))
            .filter(i => i !== null)
            .join(" - ");

        return (
            <Text
                key={move}
                onPress={() => jumpTo(move)}
                style={{
                    color: move === currentMove ? "red" : "blue",
                    marginBottom: 6,
                }}
            >
                {description}
                {mokhtasatInDescription
                    ? ` : ${mokhtasatInDescription}`
                    : ""}
            </Text>
        );
    });

    /* -------------------- UI -------------------- */
    return (
        <ScrollView style={{ flex: 1, padding: 10 }}>
            <View style={{ alignItems: "center", marginBottom: 15 }}>
                <Text style={{ fontSize: 18, color: "red" }}>
                    ⏱️ زمان باقی‌مانده: {timer}
                </Text>
                <Text style={{ marginTop: 4 }}>
                    نوبت: {xIsNextState ? "X" : "O"}
                </Text>
            </View>

            <Board
                squares={currentSquares}
                onPlay={handlePlay}
                xIsNextState={xIsNextState}
                setXIsNextState={setXIsNextState}
                BtnsColor={BtnsColor}
                setBtnsColor={setBtnsColor}
                setTimer={setTimer} // 🔹 مهم
            />
            <View style={{ marginTop: 20 }}>
                {moves}
            </View>

        </ScrollView>
    );
}

/* ------------------ Calculate Winner ------------------ */
type SquareValue = string | null;
type Squares = SquareValue[];
type WinnerResult = [SquareValue, number, number, number];

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
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
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
