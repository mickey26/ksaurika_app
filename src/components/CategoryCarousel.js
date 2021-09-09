import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {getAllCategory} from '../constants/url';
import axios from 'axios';
import CategoryCards from '../components/CategoryCards';
import {useDispatch, useSelector} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Actions} from 'react-native-router-flux';

function CategoryCarousel() {
  const dispatch = useDispatch();
  const categoryListData = useSelector(
    state => state.LoginPageReducer.categoryList,
  );
  useEffect(() => {
    axios.get(getAllCategory).then(response => {
      if (response.status === 200) {
        dispatch({type: 'CATEGORY LIST', payload: response.data.data});
      } else {
        console.log(response, 'error');
      }
    });
  }, []);
  return (
    <FlatList
      data={categoryListData}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({item, index}) => (
        <TouchableOpacity onPress={() => Actions.CategorySubScreen(item)}>
          <CategoryCards data={item} />
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({});
export default CategoryCarousel;
