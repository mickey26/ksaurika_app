import React from 'react';
import {View, Text, StyleSheet, Image, ImageBackground} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import MainWrapper from './MainWrapper';

// const backButton = require('../constants/icons/backButton.png');

function PostScreen(props) {
  console.log(props, 'postScreen');
  return (
    <View style={styles.PageContainer}>
      <Image
        style={styles.Image}
        source={{
          uri: `${props.post_imgurl}`,
        }}></Image>

      <ScrollView>
        <Text style={styles.headingTitle}>{props.post_title}</Text>
        <Text style={styles.headingTitle}>{props.post_subheading}</Text>
        <View style={styles.textArea}>
          <Text style={styles.postText}>{props.post_content}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  PageContainer: {
    flex: 1,
  },
  textArea: {
    // overflow: 'hidden',
    // elevation: 3,
    margin: 10,
    padding: 20,
    borderWidth: 2,
    borderColor: 'red',
  },
  postText: {
    fontSize: 20,
    fontFamily: '',
  },
  Image: {
    width: '100%',
    height: '30%',
  },
  headingTitle: {
    fontWeight: 'bold',
    fontSize: 34,
    fontFamily: 'serif',
    padding: 2,
    color: 'black',
  },
  // imageHeader: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',

  //   backgroundColor: ' rgba(0, 0, 0, 0.5)',
  // },
  // backButton: {
  //   height: 60,
  //   width: 40,
  // },
});

export default PostScreen;
