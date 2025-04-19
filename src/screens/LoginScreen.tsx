import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
} from 'react-native';
import {Colors} from '../constants/colors';
import {ms} from 'react-native-size-matters';
import Ionicon from 'react-native-vector-icons/Ionicons';
import AppButton from '../components/AppButton';
import firestore from '@react-native-firebase/firestore';
import CryptoJS from 'crypto-js';

const LoginScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const handleLogin = async () => {
    Keyboard.dismiss();
    const sanitizedUsername = username.trim();
    const sanitizedPassword = password.trim();

    if (sanitizedUsername === '' || sanitizedPassword === '') {
      Alert.alert('Validation Error', 'Please fill all the fields');
      return;
    }

    setIsLoading(true);

    try {
      // query the firestore db

      const userSnapshot = await firestore()
        .collection('users')
        .where('username', '==', sanitizedUsername)
        .get();

      if (userSnapshot.empty) {
        Alert.alert('Login Error', 'User not found');
        setIsLoading(false);
        return;
      }

      const userData = userSnapshot.docs[0].data();

      const hashedEnteredPassword =
        CryptoJS.SHA256(sanitizedPassword).toString();

      if (hashedEnteredPassword === userData?.password) {
        Alert.alert('Success', 'Login successful');
        setUsername('');
        setPassword('');
        navigation.navigate('UserList');
      } else {
        Alert.alert('Login Error', 'Invalid Password');
      }
    } catch (error) {
      Alert.alert('Login Error', 'Something went wrong');
      console.log('Error logging in: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require('../assets/images/fighter-jet.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          value={username}
          placeholder="Username"
          placeholderTextColor={Colors.black}
          style={styles.input}
          onChangeText={text => setUsername(text)}
        />

        <View style={{height: ms(15)}} />

        <View style={styles.passwordField}>
          <View style={styles.inputField}>
            <TextInput
              value={password}
              placeholder="Password"
              placeholderTextColor={Colors.black}
              style={styles.passwordinput}
              secureTextEntry={isPasswordShown ? false : true}
              onChangeText={text => setPassword(text)}
            />
          </View>

          <View style={styles.iconField}>
            <TouchableOpacity
              onPress={() => setIsPasswordShown(!isPasswordShown)}>
              <Ionicon
                name={isPasswordShown ? 'eye' : 'eye-off'}
                size={ms(25)}
                color={Colors.black}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={{height: ms(30)}} />

      <View>
        <AppButton
          title={'LOGIN'}
          onPress={() => handleLogin()}
          loading={isLoading}
        />
      </View>

      <View style={{height: ms(50)}} />

      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Signup');
          }}>
          <Text style={styles.signUpText}>Sign Up for free</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    paddingVertical: ms(100),
  },
  image: {
    width: ms(280),
    height: ms(250),
  },
  inputContainer: {},
  input: {
    width: ms(270),
    backgroundColor: Colors.white,
    color: Colors.black,
    borderWidth: 2,
    borderColor: Colors.black,
    borderRadius: 10,
    paddingHorizontal: ms(10),
  },
  passwordinput: {
    color: Colors.black,
  },
  inputField: {
    width: '85%',
  },
  iconField: {width: '15%', justifyContent: 'center'},
  passwordField: {
    flexDirection: 'row',
    width: ms(270),
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.black,
    borderRadius: 10,
    paddingHorizontal: ms(10),
  },
  loginBtn: {
    backgroundColor: Colors.button,
    width: ms(150),
    height: ms(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  loginBtnText: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: '700',
  },
  signUpText: {
    fontSize: 20,
    color: Colors.black,
  },
});

export default LoginScreen;
