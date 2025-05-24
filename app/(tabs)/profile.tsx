import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZE } from '@/constants/theme';
import { useUser } from '@/context/UserContext';
import { 
  User, 
  Star, 
  Settings, 
  CreditCard, 
  HelpCircle, 
  ChevronRight,
  Bell,
  Shield,
  LogOut
} from 'lucide-react-native';

export default function ProfileScreen() {
  const { user, mode, switchMode } = useUser();
  
  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            {user.profileImage ? (
              <Image 
                source={{ uri: user.profileImage }} 
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.profileImagePlaceholder}>
                <User size={40} color={COLORS.primary.text} />
              </View>
            )}
            
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <View style={styles.ratingContainer}>
                <Star size={16} color={COLORS.primary.yellow} />
                <Text style={styles.ratingText}>{user.rating}</Text>
                <Text style={styles.tripsText}>({user.trips} trips)</Text>
              </View>
              <Text style={styles.userEmail}>{user.email}</Text>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.editProfileButton}
            onPress={() => console.log('Edit profile')}
          >
            <Text style={styles.editProfileButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.modeToggleContainer}>
          <Text style={styles.modeToggleLabel}>
            You are in {mode === 'driver' ? 'Driver' : 'Rider'} mode
          </Text>
          <TouchableOpacity 
            style={styles.modeToggleButton}
            onPress={switchMode}
          >
            <Text style={styles.modeToggleButtonText}>
              Switch to {mode === 'driver' ? 'Rider' : 'Driver'} Mode
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.menuSection}>
          <MenuItem
            icon={<Settings size={22} color={COLORS.primary.text} />}
            title="Account Settings"
            onPress={() => console.log('Account Settings')}
          />
          
          <MenuItem
            icon={<CreditCard size={22} color={COLORS.primary.text} />}
            title="Payment Methods"
            onPress={() => console.log('Payment Methods')}
          />
          
          <MenuItem
            icon={<Bell size={22} color={COLORS.primary.text} />}
            title="Notifications"
            badge="3"
            onPress={() => console.log('Notifications')}
          />
          
          <MenuItem
            icon={<Shield size={22} color={COLORS.primary.text} />}
            title="Security"
            onPress={() => console.log('Security')}
          />
          
          <MenuItem
            icon={<HelpCircle size={22} color={COLORS.primary.text} />}
            title="Help & Support"
            onPress={() => console.log('Help & Support')}
          />
        </View>
        
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={() => console.log('Logout')}
        >
          <LogOut size={20} color={COLORS.status.error} />
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
        
        <Text style={styles.versionText}>SuiRides v1.0.0</Text>
      </ScrollView>
    </View>
  );
}

interface MenuItemProps {
  icon: React.ReactNode;
  title: string;
  badge?: string;
  onPress: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, title, badge, onPress }) => {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuItemIcon}>
        {icon}
      </View>
      <Text style={styles.menuItemTitle}>{title}</Text>
      
      <View style={styles.menuItemRight}>
        {badge && (
          <View style={styles.menuItemBadge}>
            <Text style={styles.menuItemBadgeText}>{badge}</Text>
          </View>
        )}
        <ChevronRight size={20} color={COLORS.common.grey[500]} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary.background,
  },
  scrollView: {
    flex: 1,
  },
  loadingText: {
    color: COLORS.primary.text,
    fontFamily: 'Poppins-Regular',
    fontSize: FONT_SIZE.md,
    textAlign: 'center',
    marginTop: SPACING.xl,
  },
  header: {
    backgroundColor: COLORS.primary.card,
    padding: SPACING.md,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: BORDER_RADIUS.round,
    marginRight: SPACING.md,
  },
  profileImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: BORDER_RADIUS.round,
    backgroundColor: COLORS.common.grey[800],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    color: COLORS.primary.text,
    fontFamily: 'Poppins-SemiBold',
    fontSize: FONT_SIZE.lg,
    marginBottom: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingText: {
    color: COLORS.primary.text,
    fontFamily: 'Poppins-Medium',
    fontSize: FONT_SIZE.sm,
    marginLeft: 4,
  },
  tripsText: {
    color: COLORS.common.grey[400],
    fontFamily: 'Poppins-Regular',
    fontSize: FONT_SIZE.xs,
    marginLeft: 4,
  },
  userEmail: {
    color: COLORS.common.grey[400],
    fontFamily: 'Poppins-Regular',
    fontSize: FONT_SIZE.sm,
  },
  editProfileButton: {
    backgroundColor: COLORS.common.grey[800],
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.sm,
    alignItems: 'center',
  },
  editProfileButtonText: {
    color: COLORS.primary.text,
    fontFamily: 'Poppins-Medium',
    fontSize: FONT_SIZE.sm,
  },
  modeToggleContainer: {
    backgroundColor: 'rgba(255, 208, 0, 0.1)',
    padding: SPACING.md,
    marginTop: SPACING.md,
    marginHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
  },
  modeToggleLabel: {
    color: COLORS.primary.text,
    fontFamily: 'Poppins-Regular',
    fontSize: FONT_SIZE.sm,
    marginBottom: SPACING.sm,
  },
  modeToggleButton: {
    backgroundColor: COLORS.primary.yellow,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.sm,
    alignItems: 'center',
  },
  modeToggleButtonText: {
    color: COLORS.primary.background,
    fontFamily: 'Poppins-SemiBold',
    fontSize: FONT_SIZE.sm,
  },
  menuSection: {
    marginTop: SPACING.md,
    marginHorizontal: SPACING.md,
    backgroundColor: COLORS.primary.card,
    borderRadius: BORDER_RADIUS.md,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.common.grey[800],
  },
  menuItemIcon: {
    width: 24,
    marginRight: SPACING.md,
  },
  menuItemTitle: {
    flex: 1,
    color: COLORS.primary.text,
    fontFamily: 'Poppins-Medium',
    fontSize: FONT_SIZE.md,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemBadge: {
    backgroundColor: COLORS.primary.yellow,
    borderRadius: BORDER_RADIUS.round,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
  },
  menuItemBadgeText: {
    color: COLORS.primary.background,
    fontFamily: 'Poppins-Bold',
    fontSize: FONT_SIZE.xs,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.lg,
    marginHorizontal: SPACING.md,
    backgroundColor: 'rgba(248, 113, 113, 0.1)',
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
  },
  logoutButtonText: {
    color: COLORS.status.error,
    fontFamily: 'Poppins-Medium',
    fontSize: FONT_SIZE.md,
    marginLeft: SPACING.sm,
  },
  versionText: {
    color: COLORS.common.grey[600],
    fontFamily: 'Poppins-Regular',
    fontSize: FONT_SIZE.xs,
    textAlign: 'center',
    marginTop: SPACING.lg,
    marginBottom: SPACING.xl,
  },
});