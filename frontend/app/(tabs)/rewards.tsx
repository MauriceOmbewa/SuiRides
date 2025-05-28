import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZE } from '@/constants/theme';
import { useUser } from '@/context/UserContext';
import LoyaltyCard from '@/components/LoyaltyCard';
import { loyaltyProgress } from '@/constants/data';
import { Award, Gift, Clock, ChevronRight, Share2 } from 'lucide-react-native';

export default function RewardsScreen() {
  const { mode } = useUser();
  
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.headerTitle}>Loyalty Rewards</Text>
        
        <LoyaltyCard 
          progress={mode === 'driver' ? loyaltyProgress.driver : loyaltyProgress.rider} 
          type={mode}
        />
        
        <View style={styles.rewardsInfo}>
          <Text style={styles.rewardsInfoText}>
            {mode === 'driver' 
              ? 'Complete more rides to earn bonuses and rewards!' 
              : 'Ride more to earn free trips and exclusive discounts!'}
          </Text>
        </View>
        
        <View style={styles.inviteContainer}>
          <View style={styles.inviteHeader}>
            <Gift size={24} color={COLORS.primary.yellow} />
            <Text style={styles.inviteTitle}>Invite Friends</Text>
          </View>
          <Text style={styles.inviteDescription}>
            {mode === 'driver'
              ? 'Earn $10 for each friend who signs up and completes 10 rides'
              : 'Earn $5 in credits for each friend who takes their first ride'}
          </Text>
          <TouchableOpacity style={styles.inviteButton}>
            <Share2 size={18} color={COLORS.primary.background} />
            <Text style={styles.inviteButtonText}>Share Invitation</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.sectionTitle}>Available Rewards</Text>
        
        <AvailableRewards mode={mode} />
      </ScrollView>
    </View>
  );
}

function AvailableRewards({ mode }: { mode: 'rider' | 'driver' }) {
  const riderRewards = [
    {
      id: 'reward-1',
      title: 'Free Ride (up to $15)',
      description: 'Complete 50 rides to unlock',
      progress: 78,
      target: 100,
      unlocked: false,
    },
    {
      id: 'reward-2',
      title: '20% Off Next 5 Rides',
      description: 'Valid for 30 days',
      unlocked: true,
      expires: '5 days left',
    },
    {
      id: 'reward-3',
      title: 'Priority Matching',
      description: 'Get matched with drivers faster',
      progress: 45,
      target: 75,
      unlocked: false,
    },
  ];
  
  const driverRewards = [
    {
      id: 'reward-1',
      title: '$50 Bonus',
      description: 'Complete 250 rides to unlock',
      progress: 212,
      target: 250,
      unlocked: false,
    },
    {
      id: 'reward-2',
      title: 'Reduced Platform Fee (15%)',
      description: 'For the next 20 rides',
      unlocked: true,
      expires: '10 rides left',
    },
    {
      id: 'reward-3',
      title: 'Premium Driver Status',
      description: 'Higher-paying ride requests',
      progress: 45,
      target: 100,
      unlocked: false,
    },
  ];
  
  const rewards = mode === 'driver' ? driverRewards : riderRewards;
  
  return (
    <View>
      {rewards.map((reward) => (
        <TouchableOpacity key={reward.id} style={styles.rewardItem}>
          <View style={styles.rewardIconContainer}>
            <Award size={24} color={COLORS.primary.yellow} />
          </View>
          
          <View style={styles.rewardDetails}>
            <Text style={styles.rewardTitle}>{reward.title}</Text>
            <Text style={styles.rewardDescription}>{reward.description}</Text>
            
            {reward.unlocked ? (
              <View style={styles.rewardStatus}>
                <Clock size={12} color={COLORS.status.warning} />
                <Text style={styles.rewardExpiry}>Expires in {reward.expires}</Text>
              </View>
            ) : (
              <View style={styles.progressContainer}>
                <View style={styles.progressBackground}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { width: `${(reward.progress / reward.target) * 100}%` }
                    ]} 
                  />
                </View>
                <Text style={styles.progressText}>
                  {reward.progress}/{reward.target}
                </Text>
              </View>
            )}
          </View>
          
          <ChevronRight size={20} color={COLORS.common.grey[500]} />
        </TouchableOpacity>
      ))}
    </View>
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
  rewardsInfo: {
    backgroundColor: 'rgba(255, 208, 0, 0.1)',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginVertical: SPACING.md,
  },
  rewardsInfoText: {
    color: COLORS.primary.text,
    fontFamily: 'Poppins-Regular',
    fontSize: FONT_SIZE.sm,
  },
  inviteContainer: {
    backgroundColor: COLORS.primary.card,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
  },
  inviteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  inviteTitle: {
    color: COLORS.primary.text,
    fontFamily: 'Poppins-SemiBold',
    fontSize: FONT_SIZE.lg,
    marginLeft: SPACING.sm,
  },
  inviteDescription: {
    color: COLORS.common.grey[400],
    fontFamily: 'Poppins-Regular',
    fontSize: FONT_SIZE.sm,
    marginBottom: SPACING.md,
  },
  inviteButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary.yellow,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inviteButtonText: {
    color: COLORS.primary.background,
    fontFamily: 'Poppins-SemiBold',
    marginLeft: SPACING.xs,
  },
  sectionTitle: {
    color: COLORS.primary.text,
    fontFamily: 'Poppins-SemiBold',
    fontSize: FONT_SIZE.lg,
    marginBottom: SPACING.sm,
  },
  rewardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary.card,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  rewardIconContainer: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: 'rgba(255, 208, 0, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  rewardDetails: {
    flex: 1,
  },
  rewardTitle: {
    color: COLORS.primary.text,
    fontFamily: 'Poppins-SemiBold',
    fontSize: FONT_SIZE.md,
    marginBottom: 2,
  },
  rewardDescription: {
    color: COLORS.common.grey[400],
    fontFamily: 'Poppins-Regular',
    fontSize: FONT_SIZE.xs,
    marginBottom: 4,
  },
  rewardStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rewardExpiry: {
    color: COLORS.status.warning,
    fontFamily: 'Poppins-Medium',
    fontSize: FONT_SIZE.xs,
    marginLeft: 4,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBackground: {
    flex: 1,
    height: 4,
    backgroundColor: COLORS.common.grey[800],
    borderRadius: BORDER_RADIUS.round,
    overflow: 'hidden',
    marginRight: SPACING.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary.yellow,
    borderRadius: BORDER_RADIUS.round,
  },
  progressText: {
    color: COLORS.common.grey[400],
    fontFamily: 'Poppins-Regular',
    fontSize: FONT_SIZE.xs,
    width: 40,
  },
});