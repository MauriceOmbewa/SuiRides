import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DollarSign, Clock, MapPin } from 'lucide-react-native';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZE } from '../constants/theme';
import { driverEarnings } from '../constants/data';

type PeriodType = 'today' | 'week' | 'month';

const EarningsCard = () => {
  const [activePeriod, setActivePeriod] = useState<PeriodType>('today');
  
  const periodData = driverEarnings[activePeriod];
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Earnings</Text>
        <View style={styles.periodSelector}>
          <TouchableOpacity
            style={[
              styles.periodButton,
              activePeriod === 'today' && styles.activePeriodButton
            ]}
            onPress={() => setActivePeriod('today')}
          >
            <Text style={[
              styles.periodButtonText,
              activePeriod === 'today' && styles.activePeriodButtonText
            ]}>
              Today
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.periodButton,
              activePeriod === 'week' && styles.activePeriodButton
            ]}
            onPress={() => setActivePeriod('week')}
          >
            <Text style={[
              styles.periodButtonText,
              activePeriod === 'week' && styles.activePeriodButtonText
            ]}>
              Week
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.periodButton,
              activePeriod === 'month' && styles.activePeriodButton
            ]}
            onPress={() => setActivePeriod('month')}
          >
            <Text style={[
              styles.periodButtonText,
              activePeriod === 'month' && styles.activePeriodButtonText
            ]}>
              Month
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.amountContainer}>
        <Text style={styles.amountValue}>{periodData.amount}</Text>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <View style={styles.statIconContainer}>
            <MapPin size={16} color={COLORS.primary.yellow} />
          </View>
          <View>
            <Text style={styles.statValue}>{periodData.trips}</Text>
            <Text style={styles.statLabel}>Trips</Text>
          </View>
        </View>
        
        <View style={styles.statDivider} />
        
        <View style={styles.statItem}>
          <View style={styles.statIconContainer}>
            <Clock size={16} color={COLORS.primary.yellow} />
          </View>
          <View>
            <Text style={styles.statValue}>{periodData.hours}</Text>
            <Text style={styles.statLabel}>Online</Text>
          </View>
        </View>
      </View>
      
      <TouchableOpacity style={styles.cashoutButton}>
        <DollarSign size={18} color={COLORS.primary.background} />
        <Text style={styles.cashoutButtonText}>Instant Cashout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary.card,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginVertical: SPACING.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  title: {
    color: COLORS.primary.text,
    fontSize: FONT_SIZE.lg,
    fontWeight: '700',
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: COLORS.common.grey[800],
    borderRadius: BORDER_RADIUS.round,
    padding: 2,
  },
  periodButton: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.round,
  },
  activePeriodButton: {
    backgroundColor: COLORS.primary.yellow,
  },
  periodButtonText: {
    color: COLORS.common.grey[400],
    fontSize: FONT_SIZE.sm,
  },
  activePeriodButtonText: {
    color: COLORS.primary.background,
    fontWeight: '600',
  },
  amountContainer: {
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  amountValue: {
    color: COLORS.primary.text,
    fontSize: FONT_SIZE.xxxl,
    fontWeight: '700',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: SPACING.md,
    backgroundColor: COLORS.common.grey[800],
    borderRadius: BORDER_RADIUS.sm,
    padding: SPACING.md,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statIconContainer: {
    width: 32,
    height: 32,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: 'rgba(255, 208, 0, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
  },
  statValue: {
    color: COLORS.primary.text,
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
  },
  statLabel: {
    color: COLORS.common.grey[400],
    fontSize: FONT_SIZE.xs,
  },
  statDivider: {
    width: 1,
    height: '80%',
    backgroundColor: COLORS.common.grey[700],
  },
  cashoutButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary.yellow,
    borderRadius: BORDER_RADIUS.sm,
    padding: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cashoutButtonText: {
    color: COLORS.primary.background,
    fontWeight: '600',
    marginLeft: SPACING.xs,
  },
});

export default EarningsCard;