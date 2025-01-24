import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import LandingScreen from '../screens/LandingScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import IdentityFormScreen from '../screens/IdentityFormScreen';
import DoctorListScreen from '../screens/DoctorListScreen';
import SearchDoctorScreen from '../screens/SearchDoctorScreen';
import SelectTimeScreen from '../screens/SelectTimeScreen';
import BookingSuccessScreen from '../screens/BookingSuccessScreen';
import NotificationScreen from '../screens/NotificationScreen';
import BottomNavigator from '../navigation/BottomNavigator';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
      <Stack.Navigator initialRouteName="Splash">
         <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Landing"
          component={LandingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="IdentityForm"
          component={IdentityFormScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DoctorList"
          component={DoctorListScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SearchDoctor"
          component={SearchDoctorScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SelectTime"
          component={SelectTimeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BookingSuccess"
          component={BookingSuccessScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Notification"
          component={NotificationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={BottomNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
  );
};

export default AppNavigator;
