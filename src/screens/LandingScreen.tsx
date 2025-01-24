import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

const SplashScreen2 = ({ navigation }: { navigation: any }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/img/logo2.png')}
          style={styles.logo}
        />
      </View>

      {/* Deskripsi */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>
            Temukan<Text style={styles.bold}> Dokter</Text> Dengan Mudah Untuk <Text style={styles.bold}>Penyakit</Text> Anda
        </Text>
      </View>

      {/* Ilustrasi */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/img/splash1.png')} // Ganti dengan ilustrasi Anda
          style={styles.illustration}
        />
      </View>

      {/* Tombol Navigasi */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace('Login')} // Navigasi manual
      >
        <Text style={styles.buttonText}>Lanjutkan</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fdf4',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  logoContainer: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  textContainer: {
    marginTop: 80,
    marginBottom: -100,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    color: '#000',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#4b5563',
  },
  bold: {
    fontWeight: 'bold',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustration: {
    width: 450,
    height: 350,
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: '#10b981',
    paddingVertical: 15,
    paddingHorizontal: 100,
    marginTop: -60,
    borderRadius: 30,
    marginBottom: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SplashScreen2;
