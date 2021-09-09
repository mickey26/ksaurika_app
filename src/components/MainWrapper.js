import React, {Component} from 'react';
import {FlatList, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import HeaderBar from '../screen/HeaderBar';

class MainWrapper extends Component {
  render() {
    return (
      <ScrollView
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: '#EDF1F7', flex: 1}}>
        <HeaderBar />
        {this.props.children}
      </ScrollView>
    );
  }
}

export default MainWrapper;
