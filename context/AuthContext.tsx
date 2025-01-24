import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

interface User {
  id: string;
  name: string;
  email: string;
  favorites: { _id: string; type: "doctor" }[];
  bookings?: Booking[];
}

export interface Booking {
  user: string;
  date: string;
  service: { name: string; description: string };
  entityId?: { name: string; location: string };
  status: "Progress" | "Confirmed" | "Done" | "Cancelled";
  time: string;
}

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  fetchBookings: (userId: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error("Failed to load user from storage:", error);
      }
    };
    fetchUser();
  }, []);

  const fetchBookings = async (userId: string) => {
    try {
      const response = await axios.get(`http://172.20.10.4:5000/api/bookings/${userId}`);
      const bookings: Booking[] = response.data;

      setUser((prevUser) => {
        if (!prevUser) return prevUser;
        const updatedUser: User = {
          ...prevUser,
          bookings,
        };
        return updatedUser;
      });
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, fetchBookings }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
