import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZE } from '@/constants/theme';
import { useUser } from '@/context/UserContext';
import EarningsCard from '@/components/EarningsCard';
import { Clock, Check, X } from 'lucide-react-native';

export default function WalletScreen() {
  const { mode } = useUser();
  
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.headerTitle}>
          {mode === 'driver' ? 'Earnings' : 'Payment'}
        </Text>
        
        {mode === 'driver' ? (
          <DriverWalletContent />
        ) : (
          <RiderWalletContent />
        )}
      </ScrollView>
    </View>
  );
}

function DriverWalletContent() {
  const transactions = [
    {
      id: 'tx-1',
      type: 'ride',
      amount: '$12.50',
      date: 'Today, 3:45 PM',
      status: 'completed',
      details: 'Ride to Empire State Building',
    },
    {
      id: 'tx-2',
      type: 'ride',
      amount: '$8.75',
      date: 'Today, 1:20 PM',
      status: 'completed',
      details: 'Ride to Central Park',
    },
    {
      id: 'tx-3',
      type: 'cashout',
      amount: '$85.25',
      date: 'Yesterday, 8:30 PM',
      status: 'completed',
      details: 'Instant cashout to Bank Account (...1234)',
    },
    {
      id: 'tx-4',
      type: 'ride',
      amount: '$15.30',
      date: 'Yesterday, 5:15 PM',
      status: 'completed',
      details: 'Ride to Grand Central Terminal',
    },
    {
      id: 'tx-5',
      type: 'bonus',
      amount: '$25.00',
      date: 'May 15, 2023',
      status: 'completed',
      details: 'Weekly Challenge Bonus',
    },
  ];

  return (
    <>
      <EarningsCard />
      
      <View style={styles.transactionsContainer}>
        <Text style={styles.sectionTitle}>Transaction History</Text>
        
        {transactions.map((transaction) => (
          <TouchableOpacity key={transaction.id} style={styles.transactionItem}>
            <View style={styles.transactionIconContainer}>
              {transaction.type === 'ride' && (
                <Clock size={20} color={COLORS.primary.text} />
              )}
              {transaction.type === 'cashout' && (
                <Check size={20} color={COLORS.status.success} />
              )}
              {transaction.type === 'bonus' && (
                <Check size={20} color={COLORS.primary.yellow} />
              )}
            </View>
            
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionTitle}>{transaction.details}</Text>
              <Text style={styles.transactionDate}>{transaction.date}</Text>
            </View>
            
            <Text 
              style={[
                styles.transactionAmount,
                transaction.type === 'cashout' ? styles.cashoutAmount : null
              ]}
            >
              {transaction.type === 'cashout' ? '-' : '+'}{transaction.amount}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
}

function RiderWalletContent() {
  const paymentMethods = [
    {
      id: 'pm-1',
      type: 'card',
      name: 'Visa •••• 4242',
      default: true,
    },
    {
      id: 'pm-2',
      type: 'card',
      name: 'Mastercard •••• 5555',
      default: false,
    },
  ];
  
  const recentTrips = [
    {
      id: 'trip-1',
      pickup: 'Home',
      dropoff: 'Work',
      date: 'Today, 9:15 AM',
      amount: '$12.50',
      status: 'completed',
    },
    {
      id: 'trip-2',
      pickup: 'Work',
      dropoff: 'Home',
      date: 'Yesterday, 6:30 PM',
      amount: '$13.25',
      status: 'completed',
    },
    {
      id: 'trip-3',
      pickup: 'Home',
      dropoff: 'Gym',
      date: 'May 12, 2023',
      amount: '$8.75',
      status: 'completed',
    },
  ];
  
  return (
    <>
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Available Credits</Text>
        <Text style={styles.balanceAmount}>$25.00</Text>
        <TouchableOpacity style={styles.addCreditsButton}>
          <Text style={styles.addCreditsButtonText}>Add Credits</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.paymentMethodsContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Payment Methods</Text>
          <TouchableOpacity>
            <Text style={styles.addLink}>+ Add New</Text>
          </TouchableOpacity>
        </View>
        
        {paymentMethods.map((method) => (
          <View key={method.id} style={styles.paymentMethodItem}>
            <View style={styles.paymentMethodIconContainer}>
              <Text style={styles.paymentMethodIcon}>
                {method.type === 'card' ? '💳' : '🏦'}
              </Text>
            </View>
            
            <View style={styles.paymentMethodDetails}>
              <Text style={styles.paymentMethodName}>{method.name}</Text>
              {method.default && (
                <Text style={styles.defaultLabel}>Default</Text>
              )}
            </View>
          </View>
        ))}
      </View>
      
      <View style={styles.recentTripsContainer}>
        <Text style={styles.sectionTitle}>Recent Trips</Text>
        
        {recentTrips.map((trip) => (
          <TouchableOpacity key={trip.id} style={styles.tripItem}>
            <View style={styles.tripDetails}>
              <Text style={styles.tripRoute}>
                {trip.pickup} to {trip.dropoff}
              </Text>
              <Text style={styles.tripDate}>{trip.date}</Text>
            </View>
            
            <Text style={styles.tripAmount}>{trip.amount}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary.background,
  },
  scrollView: {
    flex: 1,
    padding: SPACING.md,
  },
  headerTitle: {
    color: COLORS.primary.text,
    fontFamily: 'Poppins-Bold',
    fontSize: FONT_SIZE.xxl,
    marginBottom: SPACING.md,
  },
  transactionsContainer: {
    marginTop: SPACING.md,
  },
  sectionTitle: {
    color: COLORS.primary.text,
    fontFamily: 'Poppins-SemiBold',
    fontSize: FONT_SIZE.lg,
    marginBottom: SPACING.sm,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.common.grey[800],
  },
  transactionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: COLORS.common.grey[800],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionTitle: {
    color: COLORS.primary.text,
    fontFamily: 'Poppins-Medium',
    fontSize: FONT_SIZE.md,
  },
  transactionDate: {
    color: COLORS.common.grey[400],
    fontFamily: 'Poppins-Regular',
    fontSize: FONT_SIZE.xs,
  },
  transactionAmount: {
    color: COLORS.primary.yellow,
    fontFamily: 'Poppins-SemiBold',
    fontSize: FONT_SIZE.md,
  },
  cashoutAmount: {
    color: COLORS.common.grey[400],
  },
  balanceCard: {
    backgroundColor: COLORS.primary.card,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  balanceLabel: {
    color: COLORS.common.grey[400],
    fontFamily: 'Poppins-Medium',
    fontSize: FONT_SIZE.md,
    marginBottom: SPACING.xs,
  },
  balanceAmount: {
    color: COLORS.primary.text,
    fontFamily: 'Poppins-Bold',
    fontSize: 36,
    marginBottom: SPACING.md,
  },
  addCreditsButton: {
    backgroundColor: COLORS.primary.yellow,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.round,
  },
  addCreditsButtonText: {
    color: COLORS.primary.background,
    fontFamily: 'Poppins-SemiBold',
  },
  paymentMethodsContainer: {
    marginBottom: SPACING.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  addLink: {
    color: COLORS.primary.yellow,
    fontFamily: 'Poppins-Medium',
    fontSize: FONT_SIZE.sm,
  },
  paymentMethodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary.card,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  paymentMethodIconContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  paymentMethodIcon: {
    fontSize: 24,
  },
  paymentMethodDetails: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentMethodName: {
    color: COLORS.primary.text,
    fontFamily: 'Poppins-Medium',
    fontSize: FONT_SIZE.md,
  },
  defaultLabel: {
    color: COLORS.primary.yellow,
    fontFamily: 'Poppins-Medium',
    fontSize: FONT_SIZE.xs,
    backgroundColor: 'rgba(255, 208, 0, 0.1)',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.round,
  },
  recentTripsContainer: {
    marginBottom: SPACING.lg,
  },
  tripItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.primary.card,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  tripDetails: {
    flex: 1,
  },
  tripRoute: {
    color: COLORS.primary.text,
    fontFamily: 'Poppins-Medium',
    fontSize: FONT_SIZE.md,
    marginBottom: 2,
  },
  tripDate: {
    color: COLORS.common.grey[400],
    fontFamily: 'Poppins-Regular',
    fontSize: FONT_SIZE.xs,
  },
  tripAmount: {
    color: COLORS.primary.text,
    fontFamily: 'Poppins-SemiBold',
    fontSize: FONT_SIZE.md,
  },
});