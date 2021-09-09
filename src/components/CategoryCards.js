import React, {useState} from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';

function CategoryCards({data}) {
  return (
    <View style={styles.cardContainer}>
      <ImageBackground
        source={{uri: `${data.p_category_url}`}}
        style={styles.imageContainer}
        blurRadius={1}>
        <Text style={styles.text}>{data.p_category_name}</Text>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    height: 280,
    width: 220,
    margin: 10,
    // elevation: 1,
    borderRadius: 15,
    overflow: 'hidden',
    position: 'relative',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  text: {
    position: 'absolute',
    color: 'white',
    fontSize: 22,
    // top: 0,
    bottom: 0,
    // left: '50%',
    // right: '50%',
    width: '100%',
    textAlign: 'center',
    backgroundColor: ' rgba(0, 0, 0, 0.5)',
    padding: 12,
  },
});

export default CategoryCards;
