//zare_nk_041011_okk
import React, { useState, useEffect, useRef } from "react";
import { View, Text, Button, Modal, StyleSheet, Alert, Animated } from "react-native";
import { Camera, useCameraDevice, useCodeScanner, useCameraPermission } from "react-native-vision-camera";
import ReusableButton from "../components/ReusableButton";   //zare_nk_041007_added

const ScannerScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);    //zare_nk_040923(halat namayesh modal)
  const [isScanning, setIsScanning] = useState(true); //zare_nk_040923(halat anjam scan kardan)
  const { hasPermission, requestPermission } = useCameraPermission();  //zare_nk_040923(darkhaste ejazeh dastresiye doorbin be karbar)
  const [torch, setTorch] = useState<'on' | 'off'>('off');  //zare_nk_040927_added(baraye modiriate faal boodan ya naboodane flash)

  const device = useCameraDevice("back");   //zare_nk_040923(doorbin ra doorbine aghab moshakhas mikonim)

  const [scannedValue, setScannedValue] = useState<string | null>(null);   //zare_nk_041007_added
  const [resultModalVisible, setResultModalVisible] = useState(false);     //zare_nk_041007_added

  const scanLineAnim = useRef(new Animated.Value(0)).current; //zare_nk_041004_added(baraye khatte pareshkone vasate kardr. new Animated.Value(0) yek object bar migardooneh,be hamin khater baraye console gereftane meghdaresh bayad mannande dastoore x01 az addListener estefadeh kard)

  // const blinkAnim = useRef(new Animated.Value(1)).current; //zare_nk_041004_added(baraye khatte cheshmakzane vasate kardr)

  useEffect(() => {
    requestPermission();   //zare_nk_040923(dar avalin render darkhaste dastresi be doorbin ra midahim )
  }, []);
  ////zare_nk_041004_added_st(baraye khatte pareshkone vasate kardr)
  useEffect(() => {
    if (!modalVisible || !isScanning) {
      scanLineAnim.stopAnimation();
      return;
    }
    ////zare_nk_041007_added_st(age bekhaim meghdare scanLineAnim ra bebinim)
    scanLineAnim.addListener(({ value }) => { //dastoore x01
      console.log(value);
    });
    ////zare_nk_041007_added_end(age bekhaim meghdare scanLineAnim ra bebinim)
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanLineAnim, { //zare_nk_041007_nokteh(timing yek tabe ketabkhaneye Animated hast ke animation ba zamanbandiye khatti misazeh(meghdare Animated.Value ra be tadrij yani 1500 milisaniye az meghdare feli be meghdare hadaf tagheir mideh))
          toValue: 1, //zare_nk_041007_nokteh(scanLineAnim meghdare feliy Animated.Value hast, va toValue: 1 meghdare hadafe Animated.Value hast)
          duration: 1500,
          useNativeDriver: true,   //zare_nk_041007_nokteh(true yani animation rooye ThreadNative ejra shavad, useNativeDriver: true baes mishe age js sholough bashe animation ravan bemooneh)
        }),
        Animated.timing(scanLineAnim, { //zare_nk_041007_nokteh(timing yek tabe ketabkhaneye Animated hast ke animation ba zamanbandiye khatti misazeh(meghdare Animated.Value ra be tadrij yani 1500 milisaniye az meghdare feli be meghdare hadaf tagheir mideh))
          toValue: 0, //zare_nk_041007_nokteh(scanLineAnim meghdare feliy Animated.Value hast, va toValue: 0 meghdare hadafe Animated.Value hast)
          duration: 1500,
          useNativeDriver: true,   //zare_nk_041007_nokteh(true yani animation rooye ThreadNative ejra shavad, useNativeDriver: true baes mishe age js sholough bashe animation ravan bemooneh)
        }),
      ])
    ).start();
  }, [modalVisible, isScanning]);
  ////zare_nk_041004_added_end(baraye khatte pareshkone vasate kardr)
  ////zare_nk_041004_added_st(baraye khatte cheshmakzane vasate kardr)
  // useEffect(() => {
  //   if (!modalVisible || !isScanning) {
  //     blinkAnim.stopAnimation();
  //     return;
  //   }

  //   Animated.loop(
  //     Animated.sequence([
  //       Animated.timing(blinkAnim, {
  //         toValue: 0.2,    // کم شدن نور خط
  //         duration: 500,
  //         useNativeDriver: true,
  //       }),
  //       Animated.timing(blinkAnim, {
  //         toValue: 1,      // زیاد شدن نور خط
  //         duration: 500,
  //         useNativeDriver: true,
  //       }),
  //     ])
  //   ).start();
  // }, [modalVisible, isScanning]);
  ////zare_nk_041004_added_end(baraye khatte cheshmakzane vasate kardr)

  const codeScanner = useCodeScanner({  //zare_nk_040923(metodi baraye scan kardan code ha)
    codeTypes: ["qr", "ean-13", "upc-a"],    //zare_nk_040923(anvae code haei ke mikhahim shenasaei konim ra moshakhas mikonim ) 
    onCodeScanned: (codes) => {    //zare_nk_040923(vaghti code shenasaei shod in tabe ejra mishavad )
      if (!isScanning) return;    //zare_nk_040923(agar dar halat scan nabashim chizi anjam nemidahim)

      for (const code of codes) {    //zare_nk_040923(baraye har code shenasaei shode anjam midahim )
        if (code.value) {   //zare_nk_040923(agar code value dasht anjam midahim )
          setIsScanning(false);    //zare_nk_040923(age scan anjam shod digar scan anjam nemidahim ta zamani ke karbar ok bede)
          // می‌توان ویبره یا صدا هم اضافه کرد
          console.log(`Scanned: ${code.value}`);
          ////zare_nk_041007_commented_st(baraye jaygoziniye alert ba modal)
          // Alert.alert("بارکد شناسایی شد", `مقدار: ${code.value}`, [
          //   {
          //     text: "تایید",
          //     onPress: () => {    //zare_nk_040923( vaghti karbar ok zad in tabe ejra mishavad )
          //       setModalVisible(false);    //zare_nk_040923(baste shodan modal)
          //       setIsScanning(true);      //zare_nk_040923(bazgasht be halat scan )
          //     },
          //   },
          // ]);
          ////zare_nk_041007_commented_end(baraye jaygoziniye alert ba modal)
          ////zare_nk_041007_added_st(baraye jaygoziniye alert ba modal)  
          setScannedValue(code.value);
          setResultModalVisible(true);
          ////zare_nk_041007_added_end(baraye jaygoziniye alert ba modal)

          break;  //zare_nk_040923(baraie jologiri az anjam scan haye bishtar dar yek bar )
        }
      }
    },
  });

  if (!device) return <Text style={styles.centerText}>دوربین یافت نشد</Text>; {/*zare_nk_040923(agar doorbin peyda nashod in matn neshan dade mishavad)*/ }
  if (!hasPermission) return <Text style={styles.centerText}>نیاز به دسترسی دوربین</Text>; {/*zare_nk_040923(agar dastresi be doorbin nadashte bashim in matn neshan dade mishavad)*/ }
  const hasTorch = device?.hasTorch ?? false;  //zare_nk_040927_added_st(baraye danestane flash dashtane dastgah)
  return (
    <View style={styles.container}>
      {/*zare_nk_040923(dokmeye baraye baz kardan modal baraye scan kardan)*/}

      <ReusableButton
        title="بازکردن بارکدخوان"
        onPress={() => {
          setIsScanning(true); {/*zare_nk_040923(bazgasht be halat scan )*/ }
          setModalVisible(true); {/*zare_nk_040923(namayesh modal )*/ }
        }}
        backgroundColor="green"
        textColor="white"
        width="80%"
      />

      <Modal   //zare_nk_040923(komponent modal baraye namayesh doorbin va scan kardan)
        visible={modalVisible}    //zare_nk_040923(halat namayesh modal)
        animationType="slide"     //zare_nk_040923(ta'sir gozashtan rooye namayesh modal)  //ye bar fade bezaram bebinam chi mishe!
        onRequestClose={() => setModalVisible(false)}   //zare_nk_040923(agar karbar dokmeye back android ra zad modal baste shavad)
      >
        {/*zare_nk_040923(konteyner dakhele modal)*/}
        <View style={styles.modalContainer}>
          <Camera   //zare_nk_040923(komponent doorbin)
            style={StyleSheet.absoluteFill}
            device={device}      //zare_nk_040923(moshakhas kardan doorbin estefade shode)
            isActive={modalVisible}    //zare_nk_040923(faghat vaghti modal baz ast doorbin faal bashad)
            codeScanner={codeScanner}  //zare_nk_040923(seda zadane tabee codeScanner baraye scan kardan code ha)
            enableZoomGesture={true}   //zare_nk_040923(ghabeleiat zoome kardan ba do angosht be doorbin)
            torch={hasTorch ? torch : 'off'}  //zare_nk_040927_added(age dastgah flash dasht vaziate feliye off ya on boodane torch lahaz beshe,vagarna hamishe off)
          />
          {/*zare_nk_040923(baraye namayesh kadr rahnama)*/}
          <View style={styles.overlay}>
            {/*zare_nk_040923(kadre rahnama baraye gharar dadane barcode dar an(tookhali))*/}
            {/*<View style={styles.scanFrame} />*/}
            {/*zare_nk_041003_added_st(kadre rahnama baraye gharar dadane barcode dar an(haviye khatte pareshkon))*/}
            <View style={styles.scanFrame}>
              {/*zare_nk_040923(Animated.View haman khat hast ke ba translateY jabeja mishe,nokteye jaleb ine Animated.View niaz be rendere mojadade component ba setState
               nadare va dar haman rendere feli taghir mikoneh! va in maziyate khoobe ThreadNative hast ke bedoone rendere mojadade react taghirat ra roye UI anjam mideh)*/}
              <Animated.View
                style={[
                  styles.scanLine,
                  {
                    transform: [
                      {
                        translateY: scanLineAnim.interpolate({//zare_nk_04107_nokteh(scanLineAnim hokme chalangar ra beine bazeye sefroyeki va pixeli darad )
                          inputRange: [0, 1],   //zare_nk_04107_nokteh(range Animated.Value ke bazeye beine 0 va 1 hast)
                          outputRange: [0, 230], // ارتفاع فریم - ضخامت خط  //zare_nk_04107_nokteh(range UI ke bar asase pixel hast)
                        }),
                      },
                    ],
                  },
                ]}
              />
            </View>
            {/*zare_nk_041003_added_end(kadre rahnama baraye gharar dadane barcode dar an(haviye khatte pareshkon))*/}
            {/*zare_nk_041003_added_st(kadre rahnama baraye gharar dadane barcode dar an(haviye khatte cheshmakzan))*/}
            {/* <View style={styles.scanFrame}>
              <Animated.View
                style={[
                  styles.scanLine,
                  { opacity: blinkAnim }  // چشمک زدن
                ]}
              />
            </View> */}
            {/*zare_nk_041003_added_end(kadre rahnama baraye gharar dadane barcode dar an(haviye khatte cheshmakzan))*/}
            {/*zare_nk_040923(matni baraye rahnamayi karbar)*/}
            <Text style={styles.text}>بارکد را در کادر قرار دهید</Text>
            {/*zare_nk_040923(dokmeye baraye baste shodan modal)*/}
            {/* zare_nk_041007_commented(baraye jaygoziniye button ba ReusableButton) */}
            {/* <Button title="بستن" color="red" onPress={() => setModalVisible(false)} /> */}
            {/* zare_nk_041007_added(baraye jaygoziniye button ba ReusableButton) */}
            <ReusableButton
              title="بستن"
              onPress={() => setModalVisible(false)}
              backgroundColor="red"
              textColor="white"
              width={250}
            />

            {/*zare_nk_040926(baraye off va on kardane flash,albate age dastgah flash nadash dokmeh neshoon nadeh)*/}
            {hasTorch && (
              <ReusableButton
                title={torch === 'on' ? 'فلش خاموش' : 'فلش روشن'}
                onPress={() => setTorch(p => (p === 'on' ? 'off' : 'on'))}
                backgroundColor="green"
                textColor="white"
                width={250}
              />
            )}
          </View>
        </View>
      </Modal>

      {/* zare_nk_041007_added_st(baraye jaygoziniye alert ba modal) */}
      {/* zare_nk_041007_nokteh(transparent mizarim poshte modal mohtavaye feli mimooneh vali tar mishe,age nazarim poshte modal kollan sefid neshoon mideh ta zamani modal baze) */}
      <Modal
        visible={resultModalVisible}
        transparent
        animationType="fade"
      >
        <View style={styles.resultOverlay}>
          <View style={styles.resultBox}>
            <Text style={styles.resultTitle}>✅ بارکد شناسایی شد</Text>

            <Text style={styles.resultValue}>
              {scannedValue}
            </Text>

            <Button
              title="تأیید"
              onPress={() => {
                setResultModalVisible(false);
                setModalVisible(false);
                setScannedValue(null);
                setIsScanning(true);
              }}
            />
          </View>
        </View>
      </Modal>

      {/* zare_nk_041007_added_end(baraye jaygoziniye alert ba modal) */}
    </View>
  );
};

export default ScannerScreen;
// zare_nk_040923(dar stylesheet dispalay pishfarz flex ast va flexDirection: 'column' ast,age bekhaim row beshe bayad flexDirection ra be 'row' taghir dahim)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centerText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "black", 
  },
  overlay: {
    ...StyleSheet.absoluteFill,  //zare_nk_040923(moadele css: position: absolute; top: 0; left: 0; right: 0; bottom: 0;)
    justifyContent: "center",
    alignItems: "center",
  },
  scanFrame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: "#00FF00",
    borderStyle:"solid",
    backgroundColor: "transparent",
    marginBottom: 20,
    borderRadius: 10,
  },
  text: {
    color: "white",
    fontSize: 18,
    marginBottom: 50,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 10,
    borderRadius: 5,
  },
  ////zare_nk_041004_added_st(baraye khatte pareshkone vasate kardr)
  scanLine: {
    position: "absolute",
    top: 0,
    left: 5,
    right: 5,
    height: 2,
    backgroundColor: "#00FF00",
    opacity: 0.8,
    borderRadius: 2,
  },
  ////zare_nk_041004_added_end(baraye khatte pareshkone vasate kardr)
  ////zare_nk_041004_added_st(baraye khatte cheshmakzan vasate kardr)
  // scanLine: {
  //   position: "absolute",
  //   top: "50%",          // وسط فریم
  //   left: 5,
  //   right: 5,
  //   height: 2,
  //   backgroundColor: "#00FF00",
  //   borderRadius: 2,
  //   transform: [{ translateY: -1 }], // نیمه ارتفاع خط برای دقیق وسط
  // },
  ////zare_nk_041004_added_end(baraye khatte cheshmakzan vasate kardr)
  ////zare_nk_041007_added_st(baraye jaygoziniye alert ba modal)
  resultOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  resultBox: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#2e7d32",
  },
  resultValue: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  ////zare_nk_041007_added_end(baraye jaygoziniye alert ba modal)
});
