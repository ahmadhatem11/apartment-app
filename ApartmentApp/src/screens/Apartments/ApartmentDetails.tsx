import React, {useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const ApartmentDetails = ({route}: any) => {
  const param = route.params;
  const [apartment, setApartment] = useState(null);
  const [mainImage, setMainImage] = useState('');

  async function fetchData() {
    const res = await fetch(
      `http://localhost:3000/api/apartment/${param.apartment?.id}`,
    );
    const apartments = (await res.json()).apartment;

    setApartment(apartments);
    setMainImage(apartments?.images?.[0]?.image_url);
  }

  useLayoutEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {!!mainImage && (
        <Image source={{uri: mainImage}} style={styles.mainImage} />
      )}
      <FlatList
        data={apartment?.images}
        horizontal
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => setMainImage(item.image_url)}>
            <Image source={{uri: item.image_url}} style={styles.thumbnail} />
          </TouchableOpacity>
        )}
        style={styles.thumbnailContainer}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.size}>{`Size: ${apartment?.unit_area} m²`}</Text>
        <View style={styles.detailItem}>
          <Text style={styles.detailKey}>Bathrooms:</Text>
          <Text style={styles.detailValue}>{apartment?.bathrooms}</Text>
          <Text style={styles.detailKey}>Bedrooms:</Text>
          <Text style={styles.detailValue}>{apartment?.bedrooms}</Text>
        </View>
        <Text style={styles.aboutTitle}>About</Text>
        <Text style={styles.aboutText}>{apartment?.description}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainImage: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
  thumbnailContainer: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
  thumbnail: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  detailsContainer: {
    padding: 20,
  },
  size: {
    fontSize: 18,
    marginBottom: 10,
  },
  detailItem: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  detailKey: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  detailValue: {
    flex: 1,
  },
  aboutTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5,
  },
  aboutText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
});

export default ApartmentDetails;
