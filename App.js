import React from 'react';
import reducers from './src/reducers';
import thunk from 'redux-thunk';
import LandingScreen from './src/screen/LandingScreen';
import PostScreen from './src/components/PostScreen';
import AddPostScreen from './src/screen/AddPostScreen';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import LoginScreen from './src/screen/LoginScreen';
import SignupScreen from './src/screen/SignupScreen';
import CategorySubScreen from './src/screen/CategorySubScreen';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import {Router, Scene} from 'react-native-router-flux';
import {uploadpost} from './src/constants/url';
import UplaodPostScreen from './src/screen/UploadPostScreen';

const store = createStore(reducers, {}, applyMiddleware(thunk));
const App = () => {
  return (
    <Provider store={store}>
      <Router
      // titleStyle={{fontSize: 22}}
      // headerLayoutPreset="center"
      // navigationBarStyle={{
      //   backgroundColor: '#fed250',
      //   elevation: 1,
      //   borderBottomWidth: 0,
      // }}
      >
        <Scene key="root">
          <Scene
            key="loginPage"
            component={LoginScreen}
            hideNavBar={true}
            initial
          />
          <Scene
            key="LandingPage"
            component={LandingScreen}
            hideNavBar={true}
          />
          <Scene key="SignUp" component={SignupScreen} hideNavBar={true} />
          <Scene key="PostScreen" component={PostScreen} hideNavBar={true} />
          <Scene key="AddPost" component={AddPostScreen} hideNavBar={true} />
          <Scene
            key="CategorySubScreen"
            component={CategorySubScreen}
            hideNavBar={true}
          />
          <Scene
            key="UplaodPost"
            component={UplaodPostScreen}
            hideNavBar={true}
          />
        </Scene>
      </Router>
    </Provider>
  );
};

const styles = StyleSheet.create({
  appView: {
    margin: 0,
    flex: 1,
  },
});

export default App;
