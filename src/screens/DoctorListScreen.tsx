import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DoctorListScreen = () => {
  const [doctors, setDoctors] = useState<{ _id: string, name: string; location: string; specialist: { name: string; description: string }[] }[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  useEffect(() => {
    const fetchPekanbaruDoctors = async () => {
      try {
        const response = await fetch('http://172.20.10.4:5000/api/doctors?location=Pekanbaru');
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error('Error fetching Pekanbaru doctors:', error);
      }
    };

    fetchPekanbaruDoctors();
  }, []);

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderDoctor = ({ item }: { item: { name: string; location: string; specialist: { name: string; description: string }[] } }) => (
    <View style={styles.card}>
      <Image
        source={require('../../assets/img/doctors.png')}
        style={styles.image}
      />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.specialist}>
        {item.specialist.length > 0 ? item.specialist[0].name : 'Specialty not available'}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Dokter di Pekanbaru</Text>
      </View>
      <FlatList
        data={filteredDoctors}
        renderItem={renderDoctor}
        keyExtractor={(item) => item.name}
        numColumns={2}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8fbf4',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 14,
    paddingTop: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  viewMore: {
    fontSize: 14,
    color: '#10b981',
  },
  grid: {
    paddingBottom: 16,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    margin: 8,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  specialist: {
    fontSize: 14,
    textAlign: 'center',
    color: '#10b981',
    marginBottom: 8,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
});

export default DoctorListScreen;
