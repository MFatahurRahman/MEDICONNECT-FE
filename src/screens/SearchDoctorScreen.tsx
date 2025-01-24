import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SearchDoctorScreen = ({ navigation }: any) => {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://172.20.10.4:5000/api/doctors');
        const data = await response.json();
        setDoctors(
          data.map((doctor: any) => ({
            ...doctor,
            createdAt: doctor.createdAt || '2020-01-01T00:00:00Z', // Tambahkan default `createdAt`
            bookings: doctor.bookings || Math.floor(Math.random() * 100), // Random `bookings`
          }))
        );
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };
    fetchDoctors();
  }, []);

  const calculateExperience = (createdAt: string) => {
    const now = new Date();
    const createdDate = new Date(createdAt);
    if (isNaN(createdDate.getTime())) return 0; // Jika `createdAt` tidak valid
    return now.getFullYear() - createdDate.getFullYear(); // Selisih tahun
  };

  const calculateSuccessRate = (createdAt: string) => {
    const createdDate = new Date(createdAt);
    if (isNaN(createdDate.getTime())) return 80; // Jika `createdAt` tidak valid
    const baseRate = (new Date().getTime() - createdDate.getTime()) % 20; // Selisih waktu
    return Math.min(100, 80 + baseRate); // Batas 80%-100%
  };

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderDoctor = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <Image
          source={require('../../assets/img/doctors.png')}
          style={styles.image}
        />
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.specialist}>
            {item.specialist.length > 0 ? item.specialist[0].name : 'Specialty not available'}
          </Text>
          <Text style={styles.experience}>
            {`${calculateExperience(item.createdAt)} Years experience`}
          </Text>
          <View style={styles.stats}>
            <View style={styles.statsItem}>
              <Ionicons name="ellipse" size={8} color="#10b981" />
              <Text style={styles.successRate}>
                {`${calculateSuccessRate(item.createdAt)}%`}
              </Text>
            </View>
            <View style={styles.statsItem}>
              <Ionicons name="ellipse" size={8} color="#6B7280" />
              <Text style={styles.patientStories}>{item.bookings} Patient Stories</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.cardBottom}>
        <View style={styles.nextCard}>
          <Text style={styles.nextAvailable}>Next Available:</Text>
          <Text>10:00 AM tomorrow</Text>
        </View>
        <TouchableOpacity
        style={styles.consultButton}
        onPress={() => navigation.navigate('SelectTime', { doctor: item })}
        >
        <Text style={styles.consultButtonText}>Konsultasi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.searchHeader}>
        <Ionicons name="arrow-back" size={24} color="#000" onPress={() => navigation.goBack()} />
        <TextInput
          placeholder="Cari Dokter"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Ionicons
          name="close"
          size={24}
          color="#9CA3AF"
          onPress={() => setSearchQuery('')}
          style={styles.clearIcon}
        />
      </View>

      {/* Doctor List */}
      <FlatList
        data={filteredDoctors}
        keyExtractor={(item: any) => item._id}
        renderItem={renderDoctor}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F4F1',
  },
  searchHeader: {
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E7E9',
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    padding: 20,
    borderRadius: 8,
    fontSize: 16,
    marginLeft: 12,
  },
  clearIcon: {
    marginLeft: 8,
  },
  list: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  specialist: {
    color: '#10B981',
    fontSize: 14,
    marginVertical: 4,
  },
  experience: {
    color: '#6B7280',
    fontSize: 12,
    marginBottom: 4,
  },
  stats: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  statsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  successRate: {
    color: '#10B981',
    fontSize: 12,
    marginLeft: 4,
  },
  patientStories: {
    color: '#6B7280',
    fontSize: 12,
    marginLeft: 4,
  },
  nextAvailable: {
    color: '#10B981',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  consultButton: {
    backgroundColor: '#10B981',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 10,
  },
  consultButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  favoriteIcon: {
    marginLeft: 16,
  },
  nextCard: {
    flexDirection: 'column',
  },
});

export default SearchDoctorScreen;
