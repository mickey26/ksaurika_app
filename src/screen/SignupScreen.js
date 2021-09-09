import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {signUpUser} from '../constants/url';
import axios from 'axios';
import {Actions} from 'react-native-router-flux';

const userIcon = require('../constants/icons/username_icon.png');
const emailIcon = require('../constants/icons/emailIcon.png');
const passwordIcon = require('../constants/icons/passwordIcon.png');

function SignupScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSignIn() {
    console.log(email, username, password, 'signin');
    const data = {email, username, password};
    axios.post(signUpUser, data).then(
      response => {
        if (response.status == 200) {
          console.log('res');
          Actions.loginPage();
        }
      },
      error => {
        console.log(error);
      },
    );
    setEmail('');
    setUsername('');
    setPassword('');
  }

  return (
    <View style={styles.signupView}>
      <View style={styles.iconView}>
        <Image style={styles.icon} source={emailIcon} />
        <TextInput
          style={styles.inputBox}
          placeholder="Email"
          value={email}
          onChangeText={e => setEmail(e)}
        />
      </View>
      <View style={styles.iconView}>
        <Image style={styles.icon} source={userIcon} />
        <TextInput
          style={styles.inputBox}
          placeholder="User Name"
          value={username}
          onChangeText={e => setUsername(e)}
        />
      </View>
      <View style={styles.iconView}>
        <Image style={styles.icon} source={passwordIcon} />
        <TextInput
          style={styles.inputBox}
          placeholder="Password"
          value={password}
          onChangeText={e => setPassword(e)}
        />
      </View>
      <TouchableOpacity onPress={() => handleSignIn()}>
        <View style={styles.button}>
          <Text style={styles.textSty}>Sign Up</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  signupView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSty: {
    fontFamily: 'Cochin',
    fontSize: 20,
  },
  icon: {
    width: 22,
    height: 22,
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
  button: {
    width: 200,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
    flexDirection: 'row',
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderRadius: 10,
  },
});
export default SignupScreen;
