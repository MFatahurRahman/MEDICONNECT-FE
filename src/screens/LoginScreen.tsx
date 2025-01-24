import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import api from "../../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../context/AuthContext";

const LoginScreen = ({ navigation }: any ) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuth();
  const [isPasswordVisible, setPasswordVisible] = useState(false);

    const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Validation Error", "Phone and password are required.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await api.post("/auth/login", { email, password });
      const { token, user } = response.data;

      const mappedUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        favorites: user.favorites || [],
        bookings: user.bookings || [],
      };

      await AsyncStorage.setItem("user", JSON.stringify(mappedUser));
      await AsyncStorage.setItem("token", token);

      setUser(mappedUser);

      Alert.alert("Login Successful");
      navigation.navigate("Main");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An error occurred during login.";
      Alert.alert("Login Failed", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/img/logo2.png')}
          style={styles.logo}
        />
      </View>

      {/* Content Section */}
      <View style={styles.contentContainer}>
        {/* Header */}
        <View style={styles.welcomeContainer}>
          <Text style={styles.title}>Selamat Datang!</Text>
          <Text style={styles.instruction}>Harap Login Untuk Melanjutkan</Text>
        </View>

        {/* Input Fields */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Masukkan Email"
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholderTextColor="#666"
          />
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Masukkan Sandi"
              style={styles.input}
              value={password}
              onChangeText={(text) => setPassword(text)}
              placeholderTextColor="#666"
              secureTextEntry={!isPasswordVisible}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!isPasswordVisible)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                size={24}
                color="#666"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Login Button */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin} disabled={isLoading}
        >
          <Text style={styles.buttonText}>Login</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
          <Text style={styles.registerText}>Belum punya akun? <Text style={styles.bold} onPress={() => navigation.replace('Register')}>Register</Text></Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  bold: {
    fontWeight: '700'
  },
  contentContainer: {
    flex: 2,
    paddingTop: 130,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(102, 205, 170)',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 20,
    marginTop: 40,
    marginBottom: -40
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 60,
    marginTop: -80,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: 'white',
    marginBottom: -8,
  },
  subtitle: {
    fontSize: 24,
    color: 'white',
    marginBottom: 8,
  },
  instruction: {
    fontSize: 20,
    color: 'white',
    marginTop:20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 40,
    marginTop: -10,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 22,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    color: '#333',
    marginBottom: 16,
  },
  passwordContainer: {
    position: 'relative',
    marginTop: 15,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{ translateY: -20 }],
  },
  loginButton: {
    backgroundColor: '#10b980',
    marginTop: 100,
    borderRadius: 30,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginRight: 6,
  },
  registerText: {
    fontSize: 18,
    color: 'white',
    marginTop: 25,
  },
});

export default LoginScreen;
