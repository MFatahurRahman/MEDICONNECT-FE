import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";

type NavigationProp = StackNavigationProp<RootStackParamList, "Main">;

const BookingSuccessScreen = ({ route }: any) => {
  const { doctorName, specialist, date, time } = route.params;
  const navigation = useNavigation<NavigationProp>();

  return (
    <Modal visible={true} animationType="fade" transparent={true}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Icon Success */}
          <View style={styles.iconContainer}>
            <Image
              source={require("../../assets/img/success.png")} // Ganti dengan ikon Anda
              style={styles.icon}
            />
          </View>

          {/* Success Message */}
          <Text style={styles.title}>Thank You!</Text>
          <Text style={styles.subtitle}>Your Appointment Successful</Text>

          {/* Booking Details */}
          <Text style={styles.details}>
            You booked an appointment with Dr. {doctorName},{" "}
            {specialist} on {date}, at {time}
          </Text>

          {/* Done Button */}
          <TouchableOpacity
            style={styles.doneButton}
            onPress={() => navigation.navigate("Main")}
          >
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>

          {/* Edit Appointment */}
          <TouchableOpacity onPress={() => navigation.navigate("EditAppointment")}>
            <Text style={styles.editText}>Edit your appointment</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
  },
  iconContainer: {
    backgroundColor: "#E6F4F1",
    width: 150,
    height: 150,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  icon: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333333",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 16,
  },
  details: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 20,
  },
  doneButton: {
    backgroundColor: "#10B981",
    paddingVertical: 16,
    paddingHorizontal: 100,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 12,
  },
  doneButtonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  editText: {
    fontSize: 14,
    color: "#6B7280",
  },
});

export default BookingSuccessScreen;
