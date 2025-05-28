import React, { createContext, useContext, useState, useEffect } from 'react';
import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

// Define the types
export type UserMode = 'rider' | 'driver';

interface UserContextType {
  mode: UserMode;
  switchMode: () => void;
  isLoading: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    rating: number;
    trips: number;
    profileImage?: string;
  } | null;
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<UserMode>('rider');
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({
    id: 'user-123',
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '+1 555-123-4567',
    rating: 4.9,
    trips: 58,
    profileImage: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=800',
  });

  useEffect(() => {
    // Simulate loading user data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const switchMode = () => {
    setMode((prevMode) => (prevMode === 'rider' ? 'driver' : 'rider'));
    
    // Provide haptic feedback on mode switch if not on web
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  };

  return (
    <UserContext.Provider
      value={{
        mode,
        switchMode,
        isLoading,
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the context
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};