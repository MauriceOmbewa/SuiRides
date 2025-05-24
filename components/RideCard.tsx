import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MapPin, Navigation, Clock, DollarSign, Star } from 'lucide-react-native';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZE } from '../constants/theme';

interface RideCardProps {
  ride: {
    id: string;
    rider: {
      name: string;
      rating: number;
      trips: number;
    };
    pickup: {
      location: string;
      address: string;
      distance: string;
      eta: string;
    };
    dropoff: {
      location: string;
      address: string;
      distance: string;
    };
    fare: {
      amount: string;
      currency: string;
      duration: string;
    };
    status: string;
    timestamp: Date;
  };
  onAccept?: () => void;
  onDecline?: () => void;
}

const RideCard: React.FC<RideCardProps> = ({ ride, onAccept, onDecline }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.riderInfo}>
          <Text style={styles.riderName}>{ride.rider.name}</Text>
          <View style={styles.ratingContainer}>
            <Star size={14} color={COLORS.primary.yellow} />
            <Text style={styles.ratingText}>{ride.rider.rating}</Text>
            <Text style={styles.tripsText}>({ride.rider.trips} trips)</Text>
          </View>
        </View>
        <View style={styles.fareContainer}>
          <Text style={styles.fareAmount}>{ride.fare.amount}</Text>
          <Text style={styles.fareDuration}>{ride.fare.duration}</Text>
        </View>
      </View>

      <View style={styles.locationContainer}>
        <View style={styles.locationIcons}>
          <View style={styles.pickupIconContainer}>
            <MapPin size={18} color={COLORS.primary.yellow} />
          </View>
          <View style={styles.locationLine} />
          <View style={styles.dropoffIconContainer}>
            <Navigation size={18} color={COLORS.primary.yellow} />
          </View>
        </View>
        
        <View style={styles.locationDetails}>
          <View style={styles.locationItem}>
            <Text style={styles.locationTitle}>{ride.pickup.location}</Text>
            <Text style={styles.locationAddress}>{ride.pickup.address}</Text>
            <View style={styles.etaContainer}>
              <Clock size={12} color={COLORS.common.grey[400]} />
              <Text style={styles.etaText}>{ride.pickup.eta} away</Text>
            </View>
          </View>
          
          <View style={styles.separator} />
          
          <View style={styles.locationItem}>
            <Text style={styles.locationTitle}>{ride.dropoff.location}</Text>
            <Text style={styles.locationAddress}>{ride.dropoff.address}</Text>
            <View style={styles.distanceContainer}>
              <DollarSign size={12} color={COLORS.common.grey[400]} />
              <Text style={styles.distanceText}>
                {ride.dropoff.distance} total
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.declineButton]} 
          onPress={onDecline}
        >
          <Text style={styles.declineButtonText}>Decline</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, styles.acceptButton]} 
          onPress={onAccept}
        >
          <Text style={styles.acceptButtonText}>Accept</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary.card,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  riderInfo: {
    flex: 1,
  },
  riderName: {
    color: COLORS.primary.text,
    fontSize: FONT_SIZE.lg,
    fontWeight: '600',
    marginBottom: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: COLORS.primary.text,
    fontSize: FONT_SIZE.sm,
    marginLeft: 4,
    fontWeight: '500',
  },
  tripsText: {
    color: COLORS.common.grey[400],
    fontSize: FONT_SIZE.xs,
    marginLeft: 4,
  },
  fareContainer: {
    alignItems: 'flex-end',
  },
  fareAmount: {
    color: COLORS.primary.yellow,
    fontSize: FONT_SIZE.lg,
    fontWeight: '700',
  },
  fareDuration: {
    color: COLORS.common.grey[400],
    fontSize: FONT_SIZE.xs,
  },
  locationContainer: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
  },
  locationIcons: {
    width: 24,
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  pickupIconContainer: {
    height: 24,
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationLine: {
    width: 2,
    height: 30,
    backgroundColor: COLORS.common.grey[700],
    marginVertical: 4,
    marginHorizontal: 'auto',
  },
  dropoffIconContainer: {
    height: 24,
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationDetails: {
    flex: 1,
  },
  locationItem: {
    marginBottom: SPACING.sm,
  },
  locationTitle: {
    color: COLORS.primary.text,
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    marginBottom: 2,
  },
  locationAddress: {
    color: COLORS.common.grey[400],
    fontSize: FONT_SIZE.sm,
    marginBottom: 4,
  },
  etaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  etaText: {
    color: COLORS.common.grey[400],
    fontSize: FONT_SIZE.xs,
    marginLeft: 4,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceText: {
    color: COLORS.common.grey[400],
    fontSize: FONT_SIZE.xs,
    marginLeft: 4,
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.common.grey[800],
    marginVertical: SPACING.xs,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.sm,
  },
  actionButton: {
    flex: 1,
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
  },
  declineButton: {
    backgroundColor: COLORS.common.grey[800],
    marginRight: SPACING.sm,
  },
  acceptButton: {
    backgroundColor: COLORS.primary.yellow,
  },
  declineButtonText: {
    color: COLORS.primary.text,
    fontWeight: '600',
  },
  acceptButtonText: {
    color: COLORS.primary.background,
    fontWeight: '600',
  },
});

export default RideCard;