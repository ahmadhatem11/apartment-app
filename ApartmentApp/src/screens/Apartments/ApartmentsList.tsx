import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

const ApartmentList = () => {
  const [apartments, setApartments] = useState([]);
  const navigation = useNavigation();

  async function fetchData() {
    const res = await fetch('http://localhost:3000/api/apartment');
    const apartments = (await res.json()).apartments;

    setApartments(apartments);
  }

  useLayoutEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={apartments}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('ApartmentDetails', {apartment: item})
            }>
            <Image
              source={{uri: item?.images?.[0]?.image_url}}
              style={styles.image}
            />
            <View style={styles.cardContent}>
              <Text
                style={
                  styles.title
                }>{`${item.name} (${item.compound.name})`}</Text>
              <Text>{item.description.slice(0, 100)}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 10,
  },
  card: {
    flex: 1,
    margin: 5,
    overflow: 'hidden',
    borderRadius: 10,
    backgroundColor: '#FFF',
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ApartmentList;
