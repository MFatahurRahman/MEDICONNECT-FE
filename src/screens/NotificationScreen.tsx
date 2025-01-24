import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

interface Booking {
  _id: string;
  service: {
    name: string;
    description: string;
  };
  date: string;
  time: string;
  status: string;
  entityId: {
    name: string;
    specialist: string;
    [key: string]: any; // Tambahkan properti tambahan jika diperlukan
  };
}

const NotificationScreen: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { user, fetchBookings } = useAuth();

    const fetchBookingsData = async () => {
    try {
        setLoading(true);
        if (!user?.id) {
        throw new Error("User ID not found");
        }
        const response = await axios.get(`http://172.20.10.4:5000/api/bookings/${user.id}`);
        console.log("Fetched bookings data:", response.data); // Debugging log
        setBookings(response.data);
    } catch (error) {
        console.error("Error fetching bookings:", error);
        Alert.alert("Error", "Failed to load bookings. Please try again.");
    } finally {
        setLoading(false);
    }
    };


    const renderBooking = ({ item }: { item: Booking }) => (
    <View style={styles.bookingCard}>
        <View style={styles.bookingInfo}>
        {/* Pastikan hanya mengambil property string */}
        <Text style={styles.bookingService}>
            {item.service?.name || "No service name"}
        </Text>
        <Text style={styles.bookingDescription}>
            {item.service?.description || "No description"}
        </Text>
        <Text style={styles.bookingDate}>
            {item.date || "No date"} - {item.time || "No time"}
        </Text>
        <Text style={styles.bookingStatus}>
            Status: {item.status || "No status"}
        </Text>
        </View>
        <Text style={styles.bookingDoctor}>
        {item.entityId?.name || "No doctor name"}
        </Text>
        <Text style={styles.bookingSpecialist}>
        {item.entityId?.specialist || "No specialist"}
        </Text>
    </View>
    );

  useEffect(() => {
    fetchBookingsData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#10B981" />
        <Text>Loading bookings...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>My Bookings</Text>
      {bookings.length > 0 ? (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item._id}
          renderItem={renderBooking}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text>No bookings found.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6F4F1",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
  bookingCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  bookingInfo: {
    marginBottom: 8,
  },
  bookingService: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
  bookingDescription: {
    fontSize: 14,
    color: "#6B7280",
    marginVertical: 4,
  },
  bookingDate: {
    fontSize: 14,
    color: "#10B981",
    marginBottom: 4,
  },
  bookingStatus: {
    fontSize: 14,
    color: "#F59E0B",
  },
  bookingDoctor: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
  bookingSpecialist: {
    fontSize: 14,
    color: "#6B7280",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NotificationScreen;
