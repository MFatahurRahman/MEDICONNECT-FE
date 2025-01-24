import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = ({navigation} : any ) => {
  const { user } = useAuth();
  const [doctors, setDoctors] = useState<{ _id: string, name: string; location: string; specialist: { name: string; description: string }[] }[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://172.20.10.4:5000/api/doctors');
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const favoriteDoctors = doctors.filter((doctor) =>
    user?.favorites?.some((fav) => fav._id === doctor._id && fav.type === 'doctor')
  );

  const renderDoctor = ({ item }: { item: { name: string; location: string; specialist: { name: string; description: string }[] } }) => (
    <View style={styles.doctorCard}>
      <Image
        source={require('../../assets/img/doctors.png')}
        style={styles.doctorImage}
      />
      <Text style={styles.doctorName}>{item.name}</Text>
      <Text style={styles.doctorSpecialty}>
        {item.specialist.length > 0 ? item.specialist[0].name : 'Specialty not available'}
      </Text>
      <Text style={styles.doctorLocation}>{item.location}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hi {user?.name}!</Text>
            <View style={styles.locationContainer}>
              <Ionicons name="location" size={20} color="#fff" />
              <Text style={styles.location}>Pekanbaru</Text>
            </View>
          </View>
          <Image
            source={require('../../assets/img/logo2.png')}
            style={styles.profileImage}
          />
        </View>
        <TouchableOpacity
          style={styles.searchContainer}
          onPress={() => navigation.navigate('SearchDoctor')}
        >
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <Text style={styles.searchInput}>Cari dokter...</Text>
          <Ionicons name="arrow-forward" size={20} color="#9CA3AF" />
        </TouchableOpacity>

        {/* Categories */}
        <Text style={styles.sectionTitle}>Jenis Penyakit</Text>
        <View style={styles.categoriesContainer}>
          {['happy', 'eye', 'walk', 'thermometer'].map((icon, index) => (
            <View style={styles.categoryItem} key={index}>
              <Ionicons name={icon} size={30} color="#fff" />
            </View>
          ))}
        </View>

        {/* Doctors */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Dokter Pekanbaru</Text>
          <TouchableOpacity onPress={() => navigation.navigate('DoctorList')}>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={filteredDoctors}
          horizontal
          keyExtractor={(item) => item.name}
          renderItem={renderDoctor}
          contentContainerStyle={styles.doctorList}
          showsHorizontalScrollIndicator={false}
        />

        {/* Favorite Doctors */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Favorite Dokter</Text>
        </View>
        {favoriteDoctors.length > 0 ? (
          <FlatList
            data={favoriteDoctors}
            horizontal
            keyExtractor={(item) => item.name}
            renderItem={renderDoctor}
            contentContainerStyle={styles.doctorList}
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <Text style={styles.noFavoritesText}>No favorite doctors found.</Text>
        )}

        {/* Spacer */}
        <View style={styles.blank} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fdf4',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20, // Ruang ekstra di bawah
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#10b981',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 25,
    paddingTop: 60,
    paddingBottom: 40,
  },
  greeting: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  doctorLocation: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 5,
    textAlign: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  location: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 5,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginHorizontal: 20,
    marginTop: -25,
    height: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 16,
    color: '#000',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginHorizontal: 20,
    marginTop: 40,
    marginVertical: 10,
    marginBottom: 20,
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginHorizontal: 14,
    gap: 10,
  },
  categoryItem: {
    width: 90,
    height: 100,
    borderRadius: 35,
    backgroundColor: '#10b981',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 0,
    marginBottom: 10,
  },
  seeAll: {
    color: '#10b981',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
    marginRight: 24
  },
  doctorList: {
    paddingHorizontal: 16,
  },
  doctorCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 15,
    marginRight: 15,
    width: 180,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  doctorImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
    textAlign: 'center',
  },
  doctorSpecialty: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 5,
    textAlign: 'center',
  },
  noFavoritesText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#6B7280',
    marginVertical: 20,
  },
  blank: {
    height: 150,
  }
});

export default HomeScreen;
