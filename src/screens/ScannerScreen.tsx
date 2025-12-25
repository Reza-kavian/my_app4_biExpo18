//zare_nk_041004_okk
import React, { useState, useEffect, useRef } from "react";
import { View, Text, Button, Modal, StyleSheet, Alert, Animated } from "react-native";
import { Camera, useCameraDevice, useCodeScanner, useCameraPermission } from "react-native-vision-camera";

const ScannerScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);    //zare_nk_040923(halat namayesh modal)
  const [isScanning, setIsScanning] = useState(true); //zare_nk_040923(halat anjam scan kardan)
  const { hasPermission, requestPermission } = useCameraPermission();  //zare_nk_040923(darkhaste ejazeh dastresiye doorbin be karbar)
  const [torch, setTorch] = useState<'on' | 'off'>('off');  //zare_nk_040927_added(baraye modiriate faal boodan ya naboodane flash)

  const device = useCameraDevice("back");   //zare_nk_040923(doorbin ra doorbine aghab moshakhas mikonim)

  const scanLineAnim = useRef(new Animated.Value(0)).current; //zare_nk_041004_added(baraye khatte pareshkone vasate kardr)

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

    Animated.loop(
      Animated.sequence([
        Animated.timing(scanLineAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(scanLineAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
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

          Alert.alert("بارکد شناسایی شد", `مقدار: ${code.value}`, [
            {
              text: "تایید",
              onPress: () => {    //zare_nk_040923( vaghti karbar ok zad in tabe ejra mishavad )
                setModalVisible(false);    //zare_nk_040923(baste shodan modal)
                setIsScanning(true);      //zare_nk_040923(bazgasht be halat scan )
              },
            },
          ]);
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
      <Button
        title="باز کردن2 بارکدخوان"
        onPress={() => {
          setIsScanning(true); {/*zare_nk_040923(bazgasht be halat scan )*/ }
          setModalVisible(true); {/*zare_nk_040923(namayesh modal )*/ }
        }}
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
              <Animated.View
                style={[
                  styles.scanLine,
                  {
                    transform: [
                      {
                        translateY: scanLineAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, 230], // ارتفاع فریم - ضخامت خط
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
            <Button title="بستن" color="red" onPress={() => setModalVisible(false)} />
            {/*zare_nk_040926(baraye off va on kardane flash,albate age dastgah flash nadash dokmeh neshoon nadeh)*/}
            {hasTorch && (
              <Button
                title={torch === 'on' ? 'فلش خاموش' : 'فلش روشن'}
                onPress={() => setTorch(p => (p === 'on' ? 'off' : 'on'))}
              />
            )}
          </View>
        </View>
      </Modal>
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
    borderColor: "yellow",
    borderWidth: 2,
    borderStyle: "dashed",
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
});
