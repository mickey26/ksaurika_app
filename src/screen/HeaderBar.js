import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';

const openModel = require('../constants/icons/openModel.png');
const searchIcon = require('../constants/icons/searchIcon.png');
const addPostIcon = require('../constants/icons/addPostIcon.png');

function HeaderBar() {
  return (
    <View style={styles.headerContainer}>
      <Image source={openModel} style={styles.modelIcon} />
      {/* <Image source={searchIcon} style={styles.modelIcon} /> */}
      <TouchableOpacity onPress={() => Actions.UplaodPost()}>
        <Image source={addPostIcon} style={styles.modelIcon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 10,
    backgroundColor: 'white',
  },
  modelIcon: {
    height: 30,
    width: 30,
  },
});

export default HeaderBar;
