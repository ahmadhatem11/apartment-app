// Header.js
import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const Header = ({title}) => {
  return (
    <View style={styles.headerContainer}>
      <Image
        source={{
          uri: 'https://play-lh.googleusercontent.com/Awci4hQqRnoYyJDEIr3yd8lnuLB7_oKcZ-nCHpr2fLuemP57mL_GBnKZYPZqmOj56_g',
        }}
        style={styles.logo}
      />
      <Text style={{color: 'black'}}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    backgroundColor: '#fff',
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
  },
});

export default Header;
