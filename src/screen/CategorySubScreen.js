import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import axios from 'axios';
import {postByCategory} from '../constants/url';

function CategorySubScreen(props) {
  useEffect(() => {
    let category = props.p_category_name;
  }, []);

  return (
    <View>
      <Text>this is category sunSCreen</Text>
    </View>
  );
}

export default CategorySubScreen;
