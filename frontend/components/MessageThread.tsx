import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZE } from '../constants/theme';

interface MessageThreadProps {
  thread: {
    id: string;
    name: string;
    lastMessage: string;
    timestamp: string;
    unread: boolean;
  };
  onPress: (id: string) => void;
}

const MessageThread: React.FC<MessageThreadProps> = ({ thread, onPress }) => {
  const isSupport = thread.name.includes('Support');
  const isPromotion = thread.name.includes('Promotion');
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };
  
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={() => onPress(thread.id)}
    >
      <View style={[
        styles.avatarContainer,
        isSupport && styles.supportAvatarContainer,
        isPromotion && styles.promotionAvatarContainer,
      ]}>
        <Text style={styles.avatarText}>{getInitials(thread.name)}</Text>
      </View>
      
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.nameText}>{thread.name}</Text>
          <Text style={styles.timestampText}>{thread.timestamp}</Text>
        </View>
        
        <View style={styles.messageContainer}>
          <Text 
            style={[
              styles.messageText,
              thread.unread && styles.unreadMessageText
            ]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {thread.lastMessage}
          </Text>
          
          {thread.unread && (
            <View style={styles.unreadIndicator} />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.common.grey[800],
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: BORDER_RADIUS.round,
    backgroundColor: COLORS.common.grey[700],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  supportAvatarContainer: {
    backgroundColor: 'rgba(96, 165, 250, 0.2)',
  },
  promotionAvatarContainer: {
    backgroundColor: 'rgba(255, 208, 0, 0.2)',
  },
  avatarText: {
    color: COLORS.primary.text,
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  nameText: {
    color: COLORS.primary.text,
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
  },
  timestampText: {
    color: COLORS.common.grey[500],
    fontSize: FONT_SIZE.xs,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageText: {
    color: COLORS.common.grey[400],
    fontSize: FONT_SIZE.sm,
    flex: 1,
  },
  unreadMessageText: {
    color: COLORS.primary.text,
    fontWeight: '500',
  },
  unreadIndicator: {
    width: 8,
    height: 8,
    borderRadius: BORDER_RADIUS.round,
    backgroundColor: COLORS.primary.yellow,
    marginLeft: SPACING.sm,
  },
});

export default MessageThread;