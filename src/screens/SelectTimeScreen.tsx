import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";

const SelectTimeScreen = ({ navigation, route }: any) => {
  const { doctor } = route.params;
  const { user, fetchBookings } = useAuth();


  const [selectedDay, setSelectedDay] = useState<"today" | "tomorrow" | "next">("today");
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const schedules: { [key: string]: string[] } = {
    today: ["1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM"],
    tomorrow: ["10:00 AM", "10:30 AM", "11:00 AM"],
    next: [],
  };

const handleBooking = async () => {
  if (!selectedTime) {
    Alert.alert("Error", "Please select a time before confirming.");
    return;
  }

  if (!user) {
    Alert.alert("Error", "You must be logged in to book an appointment.");
    return;
  }

  const bookingData = {
    user: user.id,
    entity: "doctor",
    entityId: doctor._id,
    service: {
      name: doctor.name,
      description: doctor.specialist?.[0]?.description || "General Consultation",
    },
    date: selectedDay === "today" ? "2025-01-01" : "2025-01-02",
    time: selectedTime,
  };

  try {
    const response = await axios.post("http://172.20.10.4:5000/api/bookings", bookingData);
    Alert.alert("Success", "Booking confirmed!");

    await fetchBookings(user.id);

    navigation.navigate("BookingSuccess", {
    doctorName: doctor.name,
    specialist: doctor.specialist?.[0]?.name || "General Consultation",
    date: selectedDay === "today" ? "December 1" : "December 2",
    time: selectedTime,
    });

  } catch (error) {
    console.error("Error creating booking:", error);
    Alert.alert("Error", "Failed to create booking. Please try again.");
  }
};


  const renderSchedule = () => {
    if (schedules[selectedDay].length === 0) {
      return <Text style={styles.noScheduleText}>Tidak ada jadwal yang tersedia</Text>;
    }

    return (
      <FlatList
        data={schedules[selectedDay]}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.timeBox,
              selectedTime === item && styles.selectedTimeBox,
            ]}
            onPress={() => setSelectedTime(item)}
          >
            <Text style={[styles.timeText, selectedTime === item && styles.selectedTimeText]}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} onPress={() => navigation.goBack()} />
        <Text style={styles.headerTitle}>Select Time</Text>
      </View>

      {/* Doctor Information */}
      <View style={styles.doctorCard}>
        <Image source={require("../../assets/img/doctors.png")} style={styles.doctorImage} />
        <View style={styles.doctorInfo}>
          <Text style={styles.doctorName}>{doctor.name}</Text>
          <Text style={styles.doctorSpecialist}>
            {doctor.specialist?.[0]?.name || "Specialist not available"}
          </Text>
          <Text style={styles.doctorLocation}>{doctor.location || "Location not available"}</Text>
        </View>
        <Ionicons name="heart" size={24} color="red" />
      </View>

      {/* Day Selector */}
      <View style={styles.daySelector}>
        {Object.keys(schedules).map((key) => (
          <TouchableOpacity
            key={key}
            style={[styles.dayBox, selectedDay === key && styles.activeDayBox]}
            onPress={() => {
              setSelectedDay(key as "today" | "tomorrow" | "next");
              setSelectedTime(null);
            }}
          >
            <Text style={[styles.dayText, selectedDay === key && styles.activeDayText]}>
              {key === "today" && "Hari ini, 1 Des"}
              {key === "tomorrow" && "Besok, 2 Des"}
              {key === "next" && "Selanjutnya"}
            </Text>
            <Text style={[styles.daySubText, selectedDay === key && styles.activeDaySubText]}>
              {schedules[key].length} Jadwal
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Schedule */}
      <Text style={styles.scheduleTitle}>
        {selectedDay === "today" && "Today, 1 Des"}
        {selectedDay === "tomorrow" && "Tomorrow, 2 Des"}
        {selectedDay === "next" && "Next Available"}
      </Text>
      <View style={styles.scheduleContainer}>{renderSchedule()}</View>

      {/* Action Buttons */}
      <TouchableOpacity style={styles.primaryButton} onPress={handleBooking}>
        <Text style={styles.primaryButtonText}>Konfirmasi</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F4F1',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingTop: 24,
  },
  selectedTimeBox: {
    backgroundColor: "#10B981",
    borderColor: "#10B981",
  },
  selectedTimeText: {
    color: "#FFFFFF",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  doctorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  doctorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  doctorSpecialist: {
    fontSize: 14,
    color: '#10B981',
    marginVertical: 4,
  },
  doctorLocation: {
    fontSize: 12,
    color: '#6B7280',
  },
  daySelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dayBox: {
    flex: 1,
    padding: 16,
    marginHorizontal: 4,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E7E9',
  },
  activeDayBox: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  dayText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6B7280',
    textAlign: 'center',
  },
  activeDayText: {
    color: '#FFFFFF',
  },
  daySubText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
  },
  activeDaySubText: {
    color: '#FFFFFF',
  },
  scheduleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333333',
  },
  scheduleContainer: {
    flex: 1,
  },
  row: {
    justifyContent: 'space-between',
  },
  timeBox: {
    flex: 1,
    padding: 24,
    margin: 4,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E7E9',
  },
  timeText: {
    fontSize: 14,
    color: '#6B7280',
  },
  noScheduleText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 16,
  },
  primaryButton: {
    backgroundColor: '#10B981',
    paddingVertical: 18,
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 10,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  orText: {
    textAlign: 'center',
    color: '#9CA3AF',
    marginVertical: 16,
    fontSize: 12,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#10B981',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#10B981',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default SelectTimeScreen;
