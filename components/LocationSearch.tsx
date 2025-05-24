import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, FlatList } from 'react-native';
import { Search, MapPin, Home, Briefcase, Clock, X } from 'lucide-react-native';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZE } from '../constants/theme';
import { riderRecentLocations } from '../constants/data';

interface LocationSearchProps {
  onLocationSelect: (location: any) => void;
  placeholder?: string;
}

const LocationSearch: React.FC<LocationSearchProps> = ({ 
  onLocationSelect,
  placeholder = "Where to?" 
}) => {
  const [searchText, setSearchText] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const clearSearch = () => {
    setSearchText('');
  };

  const renderRecentItem = ({ item }: { item: any }) => {
    const getIcon = () => {
      switch (item.icon) {
        case 'home':
          return <Home size={20} color={COLORS.primary.text} />;
        case 'briefcase':
          return <Briefcase size={20} color={COLORS.primary.text} />;
        default:
          return <MapPin size={20} color={COLORS.primary.text} />;
      }
    };

    return (
      <TouchableOpacity 
        style={styles.recentItem}
        onPress={() => onLocationSelect(item)}
      >
        <View style={styles.recentIconContainer}>
          {getIcon()}
        </View>
        <View style={styles.recentDetails}>
          <Text style={styles.recentName}>{item.name}</Text>
          <Text style={styles.recentAddress}>{item.address}</Text>
        </View>
        <Clock size={16} color={COLORS.common.grey[500]} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={[
        styles.inputContainer,
        isFocused && styles.inputContainerFocused
      ]}>
        <Search size={20} color={COLORS.primary.yellow} style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={COLORS.common.grey[400]}
          value={searchText}
          onChangeText={setSearchText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
            <X size={16} color={COLORS.common.grey[400]} />
          </TouchableOpacity>
        )}
      </View>

      {isFocused && (
        <View style={styles.recentsContainer}>
          <Text style={styles.recentsTitle}>Recent Places</Text>
          <FlatList
            data={riderRecentLocations}
            renderItem={renderRecentItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    zIndex: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary.card,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.common.grey[700],
  },
  inputContainerFocused: {
    borderColor: COLORS.primary.yellow,
  },
  searchIcon: {
    marginRight: SPACING.sm,
  },
  input: {
    flex: 1,
    height: '100%',
    color: COLORS.primary.text,
    fontSize: FONT_SIZE.md,
  },
  clearButton: {
    padding: SPACING.xs,
  },
  recentsContainer: {
    backgroundColor: COLORS.primary.card,
    borderRadius: BORDER_RADIUS.md,
    marginTop: SPACING.xs,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.common.grey[700],
  },
  recentsTitle: {
    color: COLORS.common.grey[400],
    fontSize: FONT_SIZE.sm,
    marginBottom: SPACING.sm,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.common.grey[800],
  },
  recentIconContainer: {
    width: 36,
    height: 36,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: COLORS.common.grey[800],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
  },
  recentDetails: {
    flex: 1,
  },
  recentName: {
    color: COLORS.primary.text,
    fontSize: FONT_SIZE.md,
    marginBottom: 2,
  },
  recentAddress: {
    color: COLORS.common.grey[500],
    fontSize: FONT_SIZE.sm,
  },
});

export default LocationSearch;