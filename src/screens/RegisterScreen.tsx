import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Alert, Image } from 'react-native';
import api from '../../utils/api';

interface FormState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterScreen = ({ navigation }: { navigation: any }) => {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleRegister = async () => {
    const { name, email, password, confirmPassword } = form;

    if (password !== confirmPassword) {
      return Alert.alert('Error', 'Passwords do not match');
    }

    try {
      const response = await api.post('/auth/register', { name, email, password });
      Alert.alert('Success', response.data.message, [
        { text: 'OK', onPress: () => navigation.navigate('Login') },
      ]);
    } catch (error: unknown) {
      const errorMsg =
        (error as { response?: { data?: { error?: string } } }).response?.data?.error ||
        'Something went wrong';
      Alert.alert('Error', errorMsg);
    }
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setForm({ ...form, [field]: value });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/img/logo2.png')}
          style={styles.logo}
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>Register now!</Text>
        <Text style={styles.subtitle}>Enter your information below</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Full Name"
          style={styles.input}
          onChangeText={(text) => handleChange('name', text)}
          value={form.name}
        />
        <TextInput
          placeholder="Email Address"
          style={styles.input}
          onChangeText={(text) => handleChange('email', text)}
          value={form.email}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          onChangeText={(text) => handleChange('password', text)}
          value={form.password}
        />
        <TextInput
          placeholder="Confirm Password"
          style={styles.input}
          secureTextEntry
          onChangeText={(text) => handleChange('confirmPassword', text)}
          value={form.confirmPassword}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fdf4',
    paddingHorizontal: 20,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 110,
    height: 150,
    resizeMode: 'contain',
  },
  textContainer: {
    marginTop: 20,
    alignItems: 'flex-start',
    marginLeft: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '300',
  },
  inputContainer: {
    width: '100%',
    marginTop: 8,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#10b981',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    fontSize: 14,
    color: '#000',
  },
  button: {
    backgroundColor: '#10b981',
    paddingVertical: 20,
    width: '92%',
    borderRadius: 20,
    marginLeft: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
