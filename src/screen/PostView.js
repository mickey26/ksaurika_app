import React, {useState} from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import PostViewCard from '../components/PostViewCard';

export default function PostView() {
  const postData = useSelector(data => data.LoginPageReducer.allPosts);
  console.log(postData, 'dapage');

  return (
    <View style={styles.container}>
      {postData && postData.map((data, index) => <PostViewCard props={data} />)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
