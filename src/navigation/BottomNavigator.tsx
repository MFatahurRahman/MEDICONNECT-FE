import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import DashboardScreen from '../screens/HomeScreen';
import FavoritesScreen from '../screens/FavoriteScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ProfileScreen from '../screens/ProfileScreen';

type TabParamList = {
  Home: undefined;
  Favorite: undefined;
  Notification: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function BottomNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={DashboardScreen} />
      <Tab.Screen name="Favorite" component={FavoritesScreen} />
      <Tab.Screen name="Notification" component={NotificationScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const iconName = getIconName(route.name, isFocused);

        if (route.name === 'Discover') {
          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              style={styles.addButton}
            >
              <Icon name="compass-outline" size={32} color="#000" />
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={styles.tabButton}
          >
            <Icon name={iconName} size={24} color={isFocused ? '#10b981' : '#A1A1A1'} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const getIconName = (routeName: string, isFocused: boolean) => {
  switch (routeName) {
    case 'Home':
      return isFocused ? 'browsers' : 'browsers-outline';
    case 'Favorite':
      return isFocused ? 'star' : 'star-outline';
    case 'Notification':
      return isFocused ? 'calendar' : 'calendar-outline';
    case 'Profile':
      return isFocused ? 'person' : 'person-outline';
    default:
      return 'ellipse-outline';
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    height: 95,
    borderRadius: 40,
    marginHorizontal: 0,
    marginBottom: -10,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  addButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#4E6EE3',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -35,
    elevation: 5,
  },
  tabBar: {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    height: 90,
  },
});
