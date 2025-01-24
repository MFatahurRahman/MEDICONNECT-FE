import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useAuth } from "../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen: React.FC = ({navigation} : any) => {
  const { setUser } = useAuth();
  const { user } = useAuth();  

  const handleLogout = async () => {
    try {
      console.log("Removing user from AsyncStorage...");
      await AsyncStorage.removeItem("user");

      console.log("Setting user to null...");
      setUser(null);

      Alert.alert("Logout Successful", "You have been logged out.");
      navigation.replace("LoginScreen");
    } catch (error) {
      console.error("Logout Error:", error);
      Alert.alert("Logout Failed", "Something went wrong. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.timeText}>23.50</Text>
        <View style={styles.profilePictureContainer}>
          <Image
            source={{
              uri: "https://via.placeholder.com/150",
            }}
            style={styles.profilePicture}
          />
          <TouchableOpacity style={styles.cameraIcon}>
            <Ionicons name="camera-outline" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <Text style={styles.profileName}>{user?.name}</Text>
        <Text style={styles.profileLocation}>
          <Ionicons name="location-outline" size={14} /> Pekanbaru
        </Text>
      </View>

      {/* Personal Information Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Informasi Pribadi</Text>

        <View style={styles.infoItem}>
          <Text style={styles.label}>Name</Text>
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} value="MediConnect" editable={false} />
            <TouchableOpacity>
              <Ionicons name="pencil-outline" size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.label}>Contact Number</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value="+62123456789"
              editable={false}
            />
            <TouchableOpacity>
              <Ionicons name="pencil-outline" size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.label}>Date of birth</Text>
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} value="1/1/2001" editable={false} />
            <TouchableOpacity>
              <Ionicons name="pencil-outline" size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.label}>Location</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value="Indonesia, Riau, Pekanbaru"
              editable={false}
            />
            <TouchableOpacity>
              <Ionicons name="location-outline" size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Add Medical History Button */}
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Tambahkan Riwayat Penyakit</Text>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

      {/* Footer Navigation */}
      <View style={styles.footerNav}>
        <Ionicons name="home-outline" size={28} color="#9CA3AF" />
        <Ionicons name="heart-outline" size={28} color="#9CA3AF" />
        <Ionicons name="chatbubble-outline" size={28} color="#9CA3AF" />
        <Ionicons name="person-outline" size={28} color="#10B981" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6F4F1",
  },
  header: {
    backgroundColor: "#10B981",
    paddingBottom: 40,
    paddingTop: 20,
    alignItems: "center",
  },
  timeText: {
    fontSize: 14,
    color: "#FFFFFF",
    marginBottom: 10,
  },
  profilePictureContainer: {
    position: "relative",
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 10,
    backgroundColor: "#6B7280",
    padding: 8,
    borderRadius: 20,
  },
  profileName: {
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: "bold",
    marginTop: 10,
  },
  profileLocation: {
    fontSize: 14,
    color: "#FFFFFF",
    marginTop: 4,
  },
  infoContainer: {
    padding: 16,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
  },
  infoItem: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 4,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E7E9",
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#333333",
  },
  addButton: {
    backgroundColor: "#10B981",
    marginHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: "#F87171",
    marginHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  logoutButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  footerNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 16,
    borderTopWidth: 1,
    borderColor: "#E0E7E9",
    marginTop: "auto",
  },
});

export default ProfileScreen;
