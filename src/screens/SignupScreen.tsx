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
import Header from '../components/Header';
import AppButton from '../components/AppButton';
import firestore from '@react-native-firebase/firestore';
import CryptoJS from 'crypto-js';

const SignupScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  function generateRandomId(length = 10) {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < length; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  const handleSubmit = async () => {
    Keyboard.dismiss();
    const sanitizedUsername = username.trim();
    const sanitizedFirstName = firstName.trim();
    const sanitizedLastName = lastName.trim();
    const sanitizedPassword = password.trim();
    const sanitizedEmail = email.trim();

    if (
      sanitizedUsername === '' ||
      sanitizedFirstName === '' ||
      sanitizedLastName === '' ||
      sanitizedPassword === '' ||
      sanitizedEmail === ''
    ) {
      Alert.alert('Validation Error', 'Please fill all the fields');
      return;
    }

    setIsLoading(true);

    try {
      const id = generateRandomId(16);

      const hashedPassword = CryptoJS.SHA256(sanitizedPassword).toString();

      // Save user in firestore db
      await firestore().collection('users').doc(id).set({
        id: id,
        username: sanitizedUsername,
        firstName: sanitizedFirstName,
        lastName: sanitizedLastName,
        email: sanitizedEmail,
        password: hashedPassword,
        createdAt: new Date().toISOString(),
      });

      Alert.alert('Success', 'User created successfully');

      setFirstName('');
      setLastName('');
      setUsername('');
      setPassword('');
      setEmail('');

      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header title={'SIGN UP'} />

      <View style={{height: ms(45)}} />

      <View style={styles.inputContainer}>
        <TextInput
          value={username}
          placeholder="Username"
          placeholderTextColor={Colors.black}
          style={styles.input}
          onChangeText={text => setUsername(text)}
        />

        <View style={{height: ms(15)}} />

        <TextInput
          value={firstName}
          placeholder="First Name"
          placeholderTextColor={Colors.black}
          style={styles.input}
          onChangeText={text => setFirstName(text)}
        />

        <View style={{height: ms(15)}} />

        <TextInput
          value={lastName}
          placeholder="Last Name"
          placeholderTextColor={Colors.black}
          style={styles.input}
          onChangeText={text => setLastName(text)}
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

        <View style={{height: ms(15)}} />

        <TextInput
          value={email}
          placeholder="Email Address"
          placeholderTextColor={Colors.black}
          style={styles.input}
          onChangeText={text => setEmail(text)}
        />
      </View>

      <View style={{height: ms(30)}} />

      <View>
        <AppButton
          title={'SUBMIT'}
          onPress={handleSubmit}
          loading={isLoading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    paddingVertical: ms(80),
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

export default SignupScreen;
