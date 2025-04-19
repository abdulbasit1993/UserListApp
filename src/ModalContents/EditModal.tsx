import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {ms} from 'react-native-size-matters';
import {Colors} from '../constants/colors';
import AppButton from '../components/AppButton';

const EditModal = ({onSubmitPress, data}) => {
  console.log('data (EditModal) ====>> ', data);

  const [firstName, setFirstName] = useState(data?.firstName);
  const [lastName, setLastName] = useState(data?.lastName);
  const [username, setUsername] = useState(data?.username);
  const [email, setEmail] = useState(data?.email);

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <View style={styles.labelContainer}>
          <Text>First Name</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            value={firstName}
            style={styles.input}
            onChangeText={text => setFirstName(text)}
          />
        </View>
      </View>

      <View style={styles.inputRow}>
        <View style={styles.labelContainer}>
          <Text>Last Name</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            value={lastName}
            style={styles.input}
            onChangeText={text => setLastName(text)}
          />
        </View>
      </View>

      <View style={styles.inputRow}>
        <View style={styles.labelContainer}>
          <Text>Username</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            value={username}
            style={styles.input}
            onChangeText={text => setUsername(text)}
          />
        </View>
      </View>

      <View style={styles.inputRow}>
        <View style={styles.labelContainer}>
          <Text>Email</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            value={email}
            style={styles.input}
            onChangeText={text => setEmail(text)}
          />
        </View>
      </View>

      <View style={{height: ms(20)}} />

      <View>
        <AppButton
          title="SAVE"
          onPress={() => {
            onSubmitPress({
              firstName: firstName,
              lastName: lastName,
              username: username,
              email: email,
            });
          }}
          customStyle={{
            alignSelf: 'center',
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: ms(10),
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: ms(20),
  },
  labelContainer: {
    width: '40%',
    justifyContent: 'center',
  },
  inputContainer: {
    width: '60%',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: Colors.white,
    color: Colors.black,
    borderWidth: 2,
    borderColor: Colors.black,
    borderRadius: 10,
    paddingHorizontal: ms(10),
  },
});

export default EditModal;
