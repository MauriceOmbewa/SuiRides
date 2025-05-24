import React from 'react';
import { Tabs } from 'expo-router';
import { View, StyleSheet, Platform, Dimensions } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS } from '@/constants/theme';
import { Home, Wallet, Award, MessageSquare, User } from 'lucide-react-native';
import ModeToggle from '@/components/ModeToggle';

// Get screen dimensions
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const isLargeScreen = SCREEN_WIDTH > 768;

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary.yellow,
        tabBarInactiveTintColor: COLORS.common.grey[400], // Changed from grey[500] to grey[400] for better visibility
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        headerShadowVisible: false,
        headerRight: () => (
          <View style={styles.headerRight}>
            <ModeToggle />
          </View>
        ),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Home size={size} color={color} />
          ),
          headerTitle: 'SuiRides',
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: 'Wallet',
          tabBarIcon: ({ color, size }) => (
            <Wallet size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="rewards"
        options={{
          title: 'Rewards',
          tabBarIcon: ({ color, size }) => (
            <Award size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Messages',
          tabBarIcon: ({ color, size }) => (
            <MessageSquare size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <User size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.primary.background,
    borderTopColor: COLORS.primary.border,
    height: Platform.OS === 'ios' ? 85 : 65,
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
    paddingTop: 10,
    // Add responsive styles for large screens
    ...(isLargeScreen && {
      height: 70,
      paddingBottom: 10,
      paddingTop: 10,
      width: '100%',
      maxWidth: 1200,
      alignSelf: 'center',
    }),
  },
  tabBarLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    marginTop: 2,
    color: COLORS.common.white,
    // Larger font for desktop
    ...(isLargeScreen && {
      fontSize: 14,
      marginTop: 4,
    }),
  },
  header: {
    backgroundColor: COLORS.primary.background,
    // Center and limit width on large screens
    ...(isLargeScreen && {
      height: 80,
      alignItems: 'center',
    }),
  },
  headerTitle: {
    color: COLORS.primary.text,
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    // Larger title for desktop
    ...(isLargeScreen && {
      fontSize: 24,
    }),
  },
  headerRight: {
    marginRight: SPACING.md,
    // Add more spacing on large screens
    ...(isLargeScreen && {
      marginRight: SPACING.lg,
    }),
  },
});
