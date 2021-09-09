import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {signInUser} from '../constants/url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {LoginAction} from '../actions/LoginPageActions';

const loginUser = require('../constants/icons/login_user.png');
const login_password = require('../constants/icons/login_password.png');

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();

  const data = useSelector(data => data.LoginPageReducer);
  useEffect(() => {
    let userId;
    async function getUserId() {
      try {
        userId = await AsyncStorage.getItem('userId');
        console.log(userId, 'asyncid');
        if (userId !== null) {
          let payload = JSON.parse(userId);
          dispatch({type: 'IS_LOGIN', payload: payload});
          Actions.LandingPage();
        }
      } catch (error) {
        console.log(error.message);
      }
      return userId;
    }
    getUserId();
  }, []);

  const handleLogin = () => {
    const data = {email, password};
    axios.post(signInUser, data).then(
      async response => {
        console.log(response, 'signup');
        if (response.status === 200) {
          let action = LoginAction(response.data.data);
          console.log(action, 'devesh');
          await AsyncStorage.setItem('userId', JSON.stringify(action));
          dispatch({
            type: 'SET_USERNAME_AND_TOKEN',
            payload: action,
          });
          Actions.LandingPage();
        }
        setPassword('');
        setEmail('');
      },
      error => {
        console.log(error, 'error');
      },
    );
  };
  return (
    <View style={styles.loginView}>
      <View style={styles.card}>
        <View style={styles.iconView}>
          <Image style={styles.iconStyle} source={loginUser} />
          <TextInput
            style={styles.inputBox}
            placeholder="Email"
            value={email}
            onChangeText={e => setEmail(e)}
          />
        </View>
        <View style={styles.iconView}>
          <Image style={styles.iconStyle} source={login_password} />
          <TextInput
            style={styles.inputBox}
            placeholder="Password"
            value={password}
            secureTextEntry={true}
            onChangeText={e => setPassword(e)}
          />
        </View>
        <TouchableOpacity onPress={() => handleLogin()} style={{width: '100%'}}>
          <View style={styles.button}>
            <Text style={styles.textSty}>Login</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginView: {
    padding: 5,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#EDF1F7',
  },
  btnContainer: {
    backgroundColor: '#fed250',
    marginTop: 12,
    padding: 8,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  card: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    borderRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: {width: 2, height: 7},
    shadowRadius: 5,
    elevation: 3,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    // flex: 1,
    // alignItems: 'center',
    padding: 12,
    // flexDirection: 'row',
  },
  textSty: {
    fontFamily: 'Cochin',
    fontSize: 20,
  },
  button: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
    borderRadius: 8,
    backgroundColor: '#FED250',
    // flex: 1,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
  },
  inputBox: {
    width: 400,
    padding: 4,
    margin: 5,
  },
  iconView: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 70,
    margin: 10,
    alignItems: 'center',
    borderStyle: 'solid',
    borderBottomWidth: 0.5,
  },
  iconStyle: {
    width: 22,
    height: 22,
    backgroundColor: 'white',
  },
});
