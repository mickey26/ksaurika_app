import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Actions} from 'react-native-router-flux';
import CategoryCarousel from '../components/CategoryCarousel';
import MainWrapper from '../components/MainWrapper';
import axios from 'axios';
import {getAllPosts} from '../constants/url';
import PostView from './PostView';

function LandingScreen() {
  const dat = useSelector(data => data.LoginPageReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get(getAllPosts).then(res => {
      if (res.status === 200) {
        dispatch({type: 'SET_ALL_DATA', payload: res.data.data});
      } else {
        console.log(res, 'error');
      }
    });
  }, []);

  const handleSignOut = () => {
    async function removeUserId() {
      try {
        await AsyncStorage.removeItem('userId');
        dispatch({type: 'LOGGED_OUT'});
      } catch (error) {
        console.log(error.message);
      }
    }
    removeUserId();
    Actions.loginPage();
  };

  return (
    <MainWrapper>
      <View style={styles.container}>
        <CategoryCarousel />
        <ScrollView horizontal={false}>
          <PostView />
        </ScrollView>
        <Button title="Sign out" onPress={() => handleSignOut()}>
          Sign out
        </Button>
      </View>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  container: {},
  carouselView: {},
});

export default LandingScreen;
