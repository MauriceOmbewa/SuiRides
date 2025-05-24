import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Dimensions } from 'react-native';
import { Play, Pause, Car, MapPin, Clock } from 'lucide-react-native';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZE } from '@/constants/theme';
import { useUser } from '@/context/UserContext';
import RideCard from '@/components/RideCard';
import LocationSearch from '@/components/LocationSearch';
import BookingModal from '@/components/BookingModal';
import { driverRideRequests } from '@/constants/data';

// Get screen dimensions
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const isLargeScreen = SCREEN_WIDTH > 768;

export default function HomeScreen() {
  const { mode, user } = useUser();
  const [isOnline, setIsOnline] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('Current Location');
  const [destination, setDestination] = useState('');

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
  };

  const handleLocationSelect = (location: any) => {
    setDestination(location.name);
    setShowBookingModal(true);
  };

  const handleCloseBookingModal = () => {
    setShowBookingModal(false);
  };

  const handleConfirmRide = () => {
    setShowBookingModal(false);
    // Handle ride confirmation logic
  };

  return (
    <View style={styles.container}>
      {mode === 'driver' ? (
        <DriverHomeScreen 
          isOnline={isOnline} 
          toggleOnlineStatus={toggleOnlineStatus} 
        />
      ) : (
        <RiderHomeScreen 
          onLocationSelect={handleLocationSelect}
        />
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={showBookingModal}
        onRequestClose={handleCloseBookingModal}
      >
        <View style={styles.modalContainer}>
          <BookingModal
            pickup={currentLocation}
            dropoff={destination}
            onClose={handleCloseBookingModal}
            onConfirm={handleConfirmRide}
          />
        </View>
      </Modal>
    </View>
  );
}

function DriverHomeScreen({ isOnline, toggleOnlineStatus }: { isOnline: boolean, toggleOnlineStatus: () => void }) {
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.driverStatusCard}>
        <View style={styles.driverStatusHeader}>
          <Text style={styles.driverStatusTitle}>
            {isOnline ? 'You are online' : 'You are offline'}
          </Text>
          <TouchableOpacity 
            style={[
              styles.toggleButton,
              isOnline ? styles.onlineButton : styles.offlineButton
            ]}
            onPress={toggleOnlineStatus}
          >
            {isOnline ? (
              <Pause size={16} color={COLORS.primary.background} />
            ) : (
              <Play size={16} color={COLORS.primary.background} />
            )}
            <Text style={styles.toggleButtonText}>
              {isOnline ? 'Go Offline' : 'Go Online'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.driverStatsContainer}>
          <View style={styles.driverStat}>
            <Text style={styles.driverStatValue}>23</Text>
            <Text style={styles.driverStatLabel}>Minutes Online</Text>
          </View>
          <View style={styles.driverStat}>
            <Text style={styles.driverStatValue}>2</Text>
            <Text style={styles.driverStatLabel}>Trips Today</Text>
          </View>
          <View style={styles.driverStat}>
            <Text style={styles.driverStatValue}>$25.50</Text>
            <Text style={styles.driverStatLabel}>Earned Today</Text>
          </View>
        </View>
      </View>

      {isOnline && (
        <>
          <Text style={styles.sectionTitle}>Ride Requests</Text>
          {driverRideRequests.map((ride) => (
            <RideCard 
              key={ride.id} 
              ride={ride} 
              onAccept={() => console.log('Accepted ride', ride.id)}
              onDecline={() => console.log('Declined ride', ride.id)}
            />
          ))}
        </>
      )}

      {!isOnline && (
        <View style={styles.offlineMessage}>
          <Car size={48} color={COLORS.common.grey[600]} />
          <Text style={styles.offlineMessageTitle}>You're currently offline</Text>
          <Text style={styles.offlineMessageSubtitle}>
            Go online to start receiving ride requests
          </Text>
          <TouchableOpacity 
            style={styles.goOnlineButton}
            onPress={toggleOnlineStatus}
          >
            <Play size={18} color={COLORS.primary.background} />
            <Text style={styles.goOnlineButtonText}>Go Online</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

function RiderHomeScreen({ onLocationSelect }: { onLocationSelect: (location: any) => void }) {
  return (
    <View style={styles.riderContainer}>
      <View style={styles.mapPlaceholder}>
        {/* Map View would go here */}
        <Text style={styles.mapPlaceholderText}>Map View</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <LocationSearch onLocationSelect={onLocationSelect} />
      </View>
      
      <View style={styles.quickActionContainer}>
        <TouchableOpacity style={styles.quickActionButton}>
          <Car size={20} color={COLORS.primary.yellow} />
          <Text style={styles.quickActionText}>Ride</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.quickActionButton}>
          <Clock size={20} color={COLORS.primary.yellow} />
          <Text style={styles.quickActionText}>Schedule</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.quickActionButton}>
          <MapPin size={20} color={COLORS.primary.yellow} />
          <Text style={styles.quickActionText}>Saved Places</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary.background,
    // Center content on large screens
    ...(isLargeScreen && {
      alignItems: 'center',
    }),
  },
  scrollView: {
    flex: 1,
    padding: SPACING.md,
    // Limit width on large screens
    ...(isLargeScreen && {
      width: '100%',
      maxWidth: 1200,
    }),
  },
  driverStatusCard: {
    backgroundColor: COLORS.primary.card,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    // Wider card on large screens
    ...(isLargeScreen && {
      padding: SPACING.lg,
      marginHorizontal: SPACING.lg,
    }),
  },
  driverStatusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  driverStatusTitle: {
    color: COLORS.primary.text,
    fontFamily: 'Poppins-SemiBold',
    fontSize: FONT_SIZE.lg,
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.round,
  },
  onlineButton: {
    backgroundColor: COLORS.primary.yellow,
  },
  offlineButton: {
    backgroundColor: COLORS.primary.yellowAlt,
  },
  toggleButtonText: {
    color: COLORS.primary.background,
    fontFamily: 'Poppins-SemiBold',
    marginLeft: 4,
  },
  driverStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  driverStat: {
    alignItems: 'center',
    backgroundColor: COLORS.common.grey[800],
    borderRadius: BORDER_RADIUS.sm,
    padding: SPACING.sm,
    flex: 1,
    marginHorizontal: 4,
  },
  driverStatValue: {
    color: COLORS.primary.yellow,
    fontFamily: 'Poppins-SemiBold',
    fontSize: FONT_SIZE.lg,
  },
  driverStatLabel: {
    color: COLORS.common.grey[400],
    fontFamily: 'Poppins-Regular',
    fontSize: FONT_SIZE.xs,
    textAlign: 'center',
  },
  sectionTitle: {
    color: COLORS.primary.text,
    fontFamily: 'Poppins-SemiBold',
    fontSize: FONT_SIZE.lg,
    marginBottom: SPACING.sm,
    marginTop: SPACING.md,
  },
  offlineMessage: {
    backgroundColor: COLORS.primary.card,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
    marginTop: SPACING.lg,
    alignItems: 'center',
  },
  offlineMessageTitle: {
    color: COLORS.primary.text,
    fontFamily: 'Poppins-SemiBold',
    fontSize: FONT_SIZE.lg,
    marginTop: SPACING.md,
    marginBottom: SPACING.xs,
  },
  offlineMessageSubtitle: {
    color: COLORS.common.grey[400],
    fontFamily: 'Poppins-Regular',
    fontSize: FONT_SIZE.sm,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  goOnlineButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary.yellow,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
  },
  goOnlineButtonText: {
    color: COLORS.primary.background,
    fontFamily: 'Poppins-SemiBold',
    marginLeft: 4,
  },
  riderContainer: {
    flex: 1,
    // Center and limit width on large screens
    ...(isLargeScreen && {
      width: '100%',
      maxWidth: 1200,
      alignSelf: 'center',
    }),
  },
  mapPlaceholder: {
    backgroundColor: COLORS.primary.card,
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    // Adjust height for large screens
    ...(isLargeScreen && {
      height: 600,
      borderRadius: BORDER_RADIUS.md,
      marginTop: SPACING.lg,
      marginHorizontal: SPACING.lg,
    }),
  },
  mapPlaceholderText: {
    color: COLORS.common.grey[400],
    fontFamily: 'Poppins-Regular',
  },
  searchContainer: {
    position: 'absolute',
    top: SPACING.lg,
    left: SPACING.md,
    right: SPACING.md,
    zIndex: 10,
    // Center search on large screens
    ...(isLargeScreen && {
      top: SPACING.xl,
      left: '20%',
      right: '20%',
    }),
  },
  quickActionContainer: {
    position: 'absolute',
    bottom: SPACING.lg,
    left: SPACING.md,
    right: SPACING.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // Center buttons on large screens
    ...(isLargeScreen && {
      bottom: SPACING.xl,
      left: '20%',
      right: '20%',
    }),
  },
  quickActionButton: {
    backgroundColor: COLORS.primary.card,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '30%',
    // Larger buttons on desktop
    ...(isLargeScreen && {
      paddingHorizontal: SPACING.md,
      paddingVertical: SPACING.md,
    }),
  },
  quickActionText: {
    color: COLORS.primary.text,
    fontFamily: 'Poppins-Medium',
    marginLeft: SPACING.xs,
    // Larger text on desktop
    ...(isLargeScreen && {
      fontSize: FONT_SIZE.md,
    }),
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // Center modal on large screens
    ...(isLargeScreen && {
      justifyContent: 'center',
      alignItems: 'center',
    }),
  },
});
