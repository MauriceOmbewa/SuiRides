import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Award } from 'lucide-react-native';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZE } from '../constants/theme';

interface LoyaltyCardProps {
  progress: {
    rides: number;
    target: number;
    reward: string;
  };
  type: 'rider' | 'driver';
}

const LoyaltyCard: React.FC<LoyaltyCardProps> = ({ progress, type }) => {
  const progressPercentage = Math.min((progress.rides / progress.target) * 100, 100);
  
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.iconContainer}>
          <Award size={24} color={COLORS.primary.yellow} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Loyalty Rewards</Text>
          <Text style={styles.subtitle}>
            {type === 'rider' ? 'Keep riding to earn rewards' : 'Keep driving to earn bonuses'}
          </Text>
        </View>
      </View>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressBackground}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${progressPercentage}%` }
            ]} 
          />
        </View>
        <View style={styles.progressLabels}>
          <Text style={styles.progressText}>
            {progress.rides} of {progress.target} rides
          </Text>
          <Text style={styles.progressPercentage}>
            {Math.round(progressPercentage)}%
          </Text>
        </View>
      </View>
      
      <View style={styles.rewardContainer}>
        <Text style={styles.rewardLabel}>Reward:</Text>
        <Text style={styles.rewardValue}>{progress.reward}</Text>
      </View>
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: 'rgba(255, 208, 0, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    color: COLORS.primary.text,
    fontSize: FONT_SIZE.lg,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    color: COLORS.common.grey[400],
    fontSize: FONT_SIZE.sm,
  },
  progressContainer: {
    marginBottom: SPACING.md,
  },
  progressBackground: {
    height: 8,
    backgroundColor: COLORS.common.grey[800],
    borderRadius: BORDER_RADIUS.round,
    overflow: 'hidden',
    marginBottom: SPACING.xs,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary.yellow,
    borderRadius: BORDER_RADIUS.round,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressText: {
    color: COLORS.common.grey[400],
    fontSize: FONT_SIZE.sm,
  },
  progressPercentage: {
    color: COLORS.primary.yellow,
    fontSize: FONT_SIZE.sm,
    fontWeight: '600',
  },
  rewardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 208, 0, 0.1)',
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
  },
  rewardLabel: {
    color: COLORS.common.grey[400],
    fontSize: FONT_SIZE.sm,
    marginRight: SPACING.xs,
  },
  rewardValue: {
    color: COLORS.primary.yellow,
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
  },
});

export default LoyaltyCard;