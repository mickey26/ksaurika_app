import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';

function PostViewCard({props}) {
  const handlePageView = () => {
    console.log(props, 'vfndn');
    Actions.PostScreen(props);
  };

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => handlePageView()}>
      {/* <TouchableOpacity onPress={() => handlePageView()}> */}
      <View style={styles.imageView}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1603982448288-de3378e3d88d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textHeading}>{props.post_title}</Text>
        <Text style={styles.textsubHeading}>{props.post_subheading}</Text>
        <Text style={styles.textContent} numberOfLines={4}>
          {props.post_content}
        </Text>
      </View>
      {/* </TouchableOpacity> */}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '95%',
    height: 150,
    borderWidth: 2,
    borderColor: '#d3d3d3',
    borderRadius: 20,
    margin: 10,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  imageView: {},
  image: {
    height: '100%',
    width: 130,
  },
  textContainer: {
    flex: 1,
    padding: 6,
  },
  textHeading: {
    fontWeight: 'bold',
    fontSize: 22,
    fontFamily: 'serif',
    padding: 2,
  },
  textsubHeading: {
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'serif',
    padding: 2,
  },
  textContent: {
    fontSize: 16,
    fontFamily: 'notoserif',
    padding: 2,
  },
});

export default PostViewCard;
