import React, { useState, useEffect } from "react";
import { View, Text, Button, Modal, StyleSheet, Alert } from "react-native";
import { Camera, useCameraDevice, useCodeScanner, useCameraPermission } from "react-native-vision-camera";

const ScannerScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isScanning, setIsScanning] = useState(true); // جلوگیری از اسکن رگباری
  const { hasPermission, requestPermission } = useCameraPermission();  //zare_nk_040923(darkhaste ejazeh dastresiye doorbin be karbar dadeh mishe)

  // گرفتن دیوایس دوربین عقب
  const device = useCameraDevice("back");   //zare_nk_040923(doorbin ra doorbine aghab moshakhas mikonim)
  
  useEffect(() => {
    requestPermission();   //zare_nk_040923(dar avalin render darkhaste dastresi be doorbin ra midahim )
  }, []);

  
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

  if (!device) return <Text style={styles.centerText}>دوربین یافت نشد</Text>;   //zare_nk_040923(agar doorbin peyda nashod in matn neshan dade mishavad)
  if (!hasPermission) return <Text style={styles.centerText}>نیاز به دسترسی دوربین</Text>; //zare_nk_040923(agar dastresi be doorbin nadashte bashim in matn neshan dade mishavad)

  return (
    <View style={styles.container}>
      <Button
        title="باز کردن بارکدخوان"
        onPress={() => {
          setIsScanning(true);    //zare_nk_040923(bazgasht be halat scan )
          setModalVisible(true);    //zare_nk_040923(namayesh modal )
        }}
      />

      <Modal
        visible={modalVisible}
        animationType="slide"   //zare_nk_040923(ta'sir gozashtan rooye namayesh modal)  //ye bar fade bezaram bebinam chi mishe!
        onRequestClose={() => setModalVisible(false)}   //zare_nk_040923(agar karbar dokmeye back android ra zad modal baste shavad)
      >
        <View style={styles.modalContainer}>     {/*zare_nk_040923(konteyner modal)*/}
          <Camera   //zare_nk_040923(komponent doorbin)
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={modalVisible}    //zare_nk_040923(faghat vaghti modal baz ast doorbin faal bashad)
            codeScanner={codeScanner} //zare_nk_040923(ersal codeScanner be doorbin baraye scan kardan code ha)
            enableZoomGesture={true} //zare_nk_040923(ghabeleiat zoome kardan ba do angosht be doorbin)
          />
 
          <View style={styles.overlay}>   {/*zare_nk_040923(baraye namayesh kadr rahnama)*/}
            <View style={styles.scanFrame} /> {/*zare_nk_040923(kadre rahnama baraye gharar dadane barcode dar an)*/}
            <Text style={styles.text}>بارکد را در کادر قرار دهید</Text> {/*zare_nk_040923(matni baraye rahnamayi karbar)*/}
            <Button title="بستن" color="red" onPress={() => setModalVisible(false)} />  {/*zare_nk_040923(dokmeye baraye baste shodan modal)*/}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ScannerScreen;

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
    ...StyleSheet.absoluteFillObject,
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
});
