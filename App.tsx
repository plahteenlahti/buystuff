import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";
import Purchases from "react-native-purchases";
import RevenueCatUI from "react-native-purchases-ui";

export default function App() {
  const [images, setImages] = useState<string[]>([]);
  const [showPaywall, setShowPaywall] = useState(false);

  useEffect(() => {
    Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG);
    Purchases.configure({ apiKey: "" });
  }, []);

  useEffect(() => {
    const imageUrls = Array.from(
      { length: 10 },
      (_, i) => `https://picsum.photos/800/800?random=${i}`
    );
    setImages(imageUrls);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Buy Stuff</Text>
      </View>
      <ScrollView style={styles.container}>
        <StatusBar style="auto" />
        {images.map((imageUrl, index) => (
          <TouchableOpacity
            key={index}
            style={styles.imageContainer}
            onPress={() => setShowPaywall(true)}
          >
            <Image
              source={{ uri: imageUrl }}
              style={styles.image}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal
        presentationStyle="pageSheet"
        visible={showPaywall}
        animationType="slide"
        onRequestClose={() => setShowPaywall(false)}
      >
        <RevenueCatUI.Paywall
          style={{ flex: 1 }}
          onDismiss={() => setShowPaywall(false)}
          options={{ displayCloseButton: true }}
        />
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageContainer: {
    padding: 10,
  },
  image: {
    width: "100%",
    height: 400,
    borderRadius: 10,
  },
  headerContainer: {
    padding: 20,
    backgroundColor: "#fff",
  },
  headerText: {
    fontSize: 32,
    fontWeight: "bold",
  },
});
