import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZE } from '@/constants/theme';
import { useUser } from '@/context/UserContext';
import MessageThread from '@/components/MessageThread';
import { messageThreads } from '@/constants/data';
import { Search, Bell } from 'lucide-react-native';

export default function MessagesScreen() {
  const { user } = useUser();
  
  const [searchQuery, setSearchQuery] = React.useState('');
  
  const handleThreadPress = (id: string) => {
    console.log('Thread pressed:', id);
    // Navigate to conversation
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Bell size={24} color={COLORS.primary.text} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.searchContainer}>
        <Search size={20} color={COLORS.common.grey[500]} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search messages..."
          placeholderTextColor={COLORS.common.grey[500]}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      
      <FlatList
        data={messageThreads}
        renderItem={({ item }) => (
          <MessageThread thread={item} onPress={handleThreadPress} />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No messages yet</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.sm,
  },
  headerTitle: {
    color: COLORS.primary.text,
    fontFamily: 'Poppins-Bold',
    fontSize: FONT_SIZE.xxl,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.round,
    backgroundColor: COLORS.primary.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary.card,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    height: 48,
  },
  searchIcon: {
    marginRight: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    color: COLORS.primary.text,
    fontFamily: 'Poppins-Regular',
  },
  listContainer: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.lg,
  },
  emptyText: {
    color: COLORS.common.grey[500],
    fontFamily: 'Poppins-Medium',
    fontSize: FONT_SIZE.md,
  },
});