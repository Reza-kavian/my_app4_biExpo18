import React, { useState, useEffect } from "react";
import { View, Text, Button, Modal, StyleSheet, Alert } from "react-native";
import { Camera, useCameraDevice, useCodeScanner, useCameraPermission } from "react-native-vision-camera";

const ScannerScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isScanning, setIsScanning] = useState(true); // جلوگیری از اسکن رگباری
  const { hasPermission, requestPermission } = useCameraPermission();

  // گرفتن دیوایس دوربین عقب
  const device = useCameraDevice("back");

  useEffect(() => {
    requestPermission();
  }, []);

  // تعریف اسکنر بدون Worklets
  const codeScanner = useCodeScanner({
    codeTypes: ["qr", "ean-13", "upc-a"], // فقط نوع کدهایی که نیاز داریم
    onCodeScanned: (codes) => {
      if (!isScanning) return;

      for (const code of codes) {
        if (code.value) {
          setIsScanning(false); // توقف موقت اسکن

          // می‌توان ویبره یا صدا هم اضافه کرد
          console.log(`Scanned: ${code.value}`);

          Alert.alert("بارکد شناسایی شد", `مقدار: ${code.value}`, [
            {
              text: "تایید",
              onPress: () => {
                setModalVisible(false);
                setIsScanning(true); // آماده‌سازی برای دفعه بعد
              },
            },
          ]);
          break; // فقط اولین کد کافیست
        }
      }
    },
  });

  if (!device) return <Text style={styles.centerText}>دوربین یافت نشد</Text>;
  if (!hasPermission) return <Text style={styles.centerText}>نیاز به دسترسی دوربین</Text>;

  return (
    <View style={styles.container}>
      <Button
        title="باز کردن بارکدخوان"
        onPress={() => {
          setIsScanning(true);
          setModalVisible(true);
        }}
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={modalVisible} // فقط وقتی مودال باز است فعال شود
            codeScanner={codeScanner} // متد جدید بدون Frame Processor
            enableZoomGesture={true} // زوم برای فوکوس بهتر روی بارکد
          />

          {/* کادر راهنما */}
          <View style={styles.overlay}>
            <View style={styles.scanFrame} />
            <Text style={styles.text}>بارکد را در کادر قرار دهید</Text>
            <Button title="بستن" color="red" onPress={() => setModalVisible(false)} />
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
