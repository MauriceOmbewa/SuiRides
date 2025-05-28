import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MapPin, Navigation, Clock, DollarSign, X } from 'lucide-react-native';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZE } from '../constants/theme';
import { vehicleTypes } from '../constants/data';

interface BookingModalProps {
  pickup?: string;
  dropoff?: string;
  onClose: () => void;
  onConfirm: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ 
  pickup = 'Current Location',
  dropoff = 'Destination',
  onClose,
  onConfirm,
}) => {
  const [selectedVehicle, setSelectedVehicle] = useState('regular');
  const [expanded, setExpanded] = useState(false);
  
  const handleVehicleSelect = (id: string) => {
    setSelectedVehicle(id);
  };
  
  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  
  return (
    <View style={[styles.container, expanded && styles.expandedContainer]}>
      <View style={styles.handle} />
      
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <X size={20} color={COLORS.common.grey[400]} />
      </TouchableOpacity>
      
      <TouchableOpacity onPress={toggleExpand} style={styles.header}>
        <Text style={styles.title}>Book a Ride</Text>
      </TouchableOpacity>
      
      <ScrollView style={styles.content}>
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
              <Text style={styles.locationLabel}>Pickup</Text>
              <Text style={styles.locationValue}>{pickup}</Text>
            </View>
            
            <View style={styles.separator} />
            
            <View style={styles.locationItem}>
              <Text style={styles.locationLabel}>Dropoff</Text>
              <Text style={styles.locationValue}>{dropoff}</Text>
            </View>
          </View>
        </View>
        
        <Text style={styles.sectionTitle}>Choose Vehicle Type</Text>
        
        <View style={styles.vehicleOptions}>
          {vehicleTypes.map((vehicle) => (
            <TouchableOpacity 
              key={vehicle.id}
              style={[
                styles.vehicleOption,
                selectedVehicle === vehicle.id && styles.selectedVehicleOption
              ]}
              onPress={() => handleVehicleSelect(vehicle.id)}
            >
              <Text style={[
                styles.vehicleName,
                selectedVehicle === vehicle.id && styles.selectedVehicleName
              ]}>
                {vehicle.name}
              </Text>
              <View style={styles.vehicleDetails}>
                <Text style={styles.vehicleCapacity}>
                  {vehicle.capacity} seats
                </Text>
                <Text style={[
                  styles.vehiclePrice,
                  selectedVehicle === vehicle.id && styles.selectedVehiclePrice
                ]}>
                  {vehicle.price}
                </Text>
              </View>
              <View style={styles.vehicleEta}>
                <Clock size={12} color={COLORS.common.grey[400]} />
                <Text style={styles.vehicleEtaText}>{vehicle.eta}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.fareEstimate}>
          <Text style={styles.fareEstimateTitle}>Fare Estimate</Text>
          <View style={styles.fareDetails}>
            <View style={styles.fareItem}>
              <Text style={styles.fareLabel}>Base Fare</Text>
              <Text style={styles.fareValue}>$10.00</Text>
            </View>
            <View style={styles.fareItem}>
              <Text style={styles.fareLabel}>Distance (5.2 km)</Text>
              <Text style={styles.fareValue}>$5.20</Text>
            </View>
            <View style={styles.fareItem}>
              <Text style={styles.fareLabel}>Time (15 min)</Text>
              <Text style={styles.fareValue}>$3.75</Text>
            </View>
            <View style={styles.fareItem}>
              <Text style={styles.fareLabel}>Service Fee</Text>
              <Text style={styles.fareValue}>$1.50</Text>
            </View>
            <View style={styles.separatorHorizontal} />
            <View style={styles.fareTotal}>
              <Text style={styles.fareTotalLabel}>Total</Text>
              <Text style={styles.fareTotalValue}>$20.45</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
          <DollarSign size={18} color={COLORS.primary.background} />
          <Text style={styles.confirmButtonText}>Confirm Ride • $20.45</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary.card,
    borderTopLeftRadius: BORDER_RADIUS.lg,
    borderTopRightRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    paddingTop: SPACING.sm,
    height: '50%',
  },
  expandedContainer: {
    height: '90%',
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: COLORS.common.grey[600],
    borderRadius: BORDER_RADIUS.round,
    alignSelf: 'center',
    marginBottom: SPACING.md,
  },
  closeButton: {
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.md,
    zIndex: 1,
  },
  header: {
    marginBottom: SPACING.md,
  },
  title: {
    color: COLORS.primary.text,
    fontSize: FONT_SIZE.xl,
    fontWeight: '700',
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  locationContainer: {
    flexDirection: 'row',
    marginBottom: SPACING.lg,
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
  locationLabel: {
    color: COLORS.common.grey[400],
    fontSize: FONT_SIZE.xs,
    marginBottom: 2,
  },
  locationValue: {
    color: COLORS.primary.text,
    fontSize: FONT_SIZE.md,
    fontWeight: '500',
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.common.grey[800],
    marginVertical: SPACING.xs,
  },
  sectionTitle: {
    color: COLORS.primary.text,
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    marginBottom: SPACING.sm,
  },
  vehicleOptions: {
    marginBottom: SPACING.lg,
  },
  vehicleOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.sm,
    backgroundColor: COLORS.common.grey[800],
    borderRadius: BORDER_RADIUS.sm,
    marginBottom: SPACING.sm,
  },
  selectedVehicleOption: {
    backgroundColor: 'rgba(255, 208, 0, 0.1)',
    borderWidth: 1,
    borderColor: COLORS.primary.yellow,
  },
  vehicleName: {
    color: COLORS.primary.text,
    fontSize: FONT_SIZE.md,
    fontWeight: '500',
    flex: 1,
  },
  selectedVehicleName: {
    color: COLORS.primary.yellow,
    fontWeight: '600',
  },
  vehicleDetails: {
    flex: 1,
    alignItems: 'center',
  },
  vehicleCapacity: {
    color: COLORS.common.grey[400],
    fontSize: FONT_SIZE.xs,
  },
  vehiclePrice: {
    color: COLORS.primary.text,
    fontSize: FONT_SIZE.sm,
    fontWeight: '500',
  },
  selectedVehiclePrice: {
    color: COLORS.primary.yellow,
  },
  vehicleEta: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  vehicleEtaText: {
    color: COLORS.common.grey[400],
    fontSize: FONT_SIZE.xs,
    marginLeft: 4,
  },
  fareEstimate: {
    backgroundColor: COLORS.common.grey[800],
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
  },
  fareEstimateTitle: {
    color: COLORS.primary.text,
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    marginBottom: SPACING.sm,
  },
  fareDetails: {},
  fareItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
  },
  fareLabel: {
    color: COLORS.common.grey[400],
    fontSize: FONT_SIZE.sm,
  },
  fareValue: {
    color: COLORS.primary.text,
    fontSize: FONT_SIZE.sm,
  },
  separatorHorizontal: {
    height: 1,
    backgroundColor: COLORS.common.grey[700],
    marginVertical: SPACING.sm,
  },
  fareTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fareTotalLabel: {
    color: COLORS.primary.text,
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
  },
  fareTotalValue: {
    color: COLORS.primary.yellow,
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
  },
  footer: {
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.common.grey[800],
  },
  confirmButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary.yellow,
    borderRadius: BORDER_RADIUS.sm,
    padding: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonText: {
    color: COLORS.primary.background,
    fontWeight: '600',
    marginLeft: SPACING.xs,
  },
});

export default BookingModal;