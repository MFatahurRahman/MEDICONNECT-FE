import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SplashScreen1 = ({ navigation }: { navigation: any }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Landing');
    }, 1000); 

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../assets/img/logo1.png')}
        style={styles.logo}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0fdf4',
  },
  logo: {
    width: 250,
    height: 300,
    resizeMode: 'contain',
  },
  title: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#047857',
  },
});

export default SplashScreen1;
