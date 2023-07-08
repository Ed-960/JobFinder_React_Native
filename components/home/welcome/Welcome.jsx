import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  VirtualizedList,
} from 'react-native';
import { useRouter } from 'expo-router';
import styles from './welcome.style';
import { icons, SIZES } from '../../../constants';
import { TextInput } from 'react-native-gesture-handler';

const jobTypes = [
  'Full-time',
  'Part-time',
  'Contractor',
  'react',
  'react-native',
  'x',
];

const Welcome = ({ searchTerm, setSearchTerm, handleClick }) => {
  const router = useRouter();
  const [activeJobType, setActiveJobType] = useState('Full-time');
  const getItemCount = () => jobTypes.length;
  const getItem = (data, index) => data[index];

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello Joe Tribiani</Text>
        <Text style={styles.welcomeMessage}>Find your perfect job</Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={(text) => {
              setSearchTerm(text);
            }}
            placeholder='What are you looking for?'
          />
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
          <Image
            source={icons.search}
            resizeMode='contain'
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.tabsContainer}>
        <VirtualizedList
          data={jobTypes}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeJobType, item)}
              onPress={() => {
                setActiveJobType(item);
                router.push(`/search/${item}`);
              }}
            >
              <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          getItemCount={getItemCount}
          getItem={getItem}
          horizontal
        />
      </View>
    </View>
  );
};

export default Welcome;
