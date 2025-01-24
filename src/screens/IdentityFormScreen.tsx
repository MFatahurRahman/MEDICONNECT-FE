import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

const IdentityFormScreen = ({navigation} : any) => {
  const [gender, setGender] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.circle}></View>
        <Text style={styles.title}>Isi Identitas Kamu!</Text>
      </View>

      {/* Input Fields Section */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Nama Panjang"
          style={styles.input}
          placeholderTextColor="#9CA3AF"
        />
        <TextInput
          placeholder="Alamat Lengkap"
          style={styles.input}
          placeholderTextColor="#9CA3AF"
        />
      </View>

      {/* Gender Section */}
      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[
            styles.genderButton,
            gender === 'Laki-Laki' && styles.genderButtonActive,
          ]}
          onPress={() => setGender('Laki-Laki')}
        >
          <Text
            style={[
              styles.genderText,
              gender === 'Laki-Laki' && styles.genderTextActive,
            ]}
          >
            Laki-Laki
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.genderButton,
            gender === 'Perempuan' && styles.genderButtonActive,
          ]}
          onPress={() => setGender('Perempuan')}
        >
          <Text
            style={[
              styles.genderText,
              gender === 'Perempuan' && styles.genderTextActive,
            ]}
          >
            Perempuan
          </Text>
        </TouchableOpacity>
      </View>

      {/* Date of Birth Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Tanggal Lahir</Text>
        <View style={styles.dateContainer}>
          <TextInput
            placeholder="Tahun"
            style={styles.dateInput}
            placeholderTextColor="#9CA3AF"
          />
          <TextInput
            placeholder="Bulan"
            style={styles.dateInput}
            placeholderTextColor="#9CA3AF"
          />
          <TextInput
            placeholder="Hari"
            style={styles.dateInput}
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      {/* Physical Info Section */}
      <View style={styles.physicalInfoContainer}>
        <TextInput
          placeholder="Tinggi Badan (Cm)"
          style={styles.physicalInput}
          placeholderTextColor="#9CA3AF"
        />
        <TextInput
          placeholder="Berat Badan (Kg)"
          style={styles.physicalInput}
          placeholderTextColor="#9CA3AF"
        />
      </View>

        <TouchableOpacity
          style={styles.identityButton}
          onPress={() => navigation.replace('Home')}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fdf4',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  circle: {
    backgroundColor: '#10b981',
    width: 200,
    height: 200,
    borderRadius: 100,
    position: 'absolute',
    top: -100,
    left: -180,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 100,
  },
  inputContainer: {
    width: 350,
    marginVertical: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#10b981',
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    fontSize: 16,
    color: '#000',
    backgroundColor: '#fff',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
    marginBottom: 20,
  },
  genderButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 20,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#10b981',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  genderButtonActive: {
    backgroundColor: '#10b981',
  },
  genderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10b981',
  },
  genderTextActive: {
    color: '#fff',
  },
  sectionContainer: {
    width: '85%',
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#10b981',
    padding: 20,
    borderRadius: 20,
  },
  sectionTitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#10b981',
    borderRadius: 10,
    padding: 16,
    flex: 1,
    marginHorizontal: 5,
    fontSize: 16,
    color: '#000',
    backgroundColor: '#fff',
  },
  physicalInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width:'88%',
    marginVertical: 20,
  },
  physicalInput: {
    borderWidth: 1,
    borderColor: '#10b981',
    borderRadius: 10,
    padding: 16,
    flex: 1,
    marginHorizontal: 10,
    fontSize: 16,
    color: '#000',
    backgroundColor: '#fff',
  },
  identityButton: {
    backgroundColor: '#10b980',
    marginTop: 50,
    borderRadius: 30,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '85%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginRight: 6,
  },
});

export default IdentityFormScreen;
