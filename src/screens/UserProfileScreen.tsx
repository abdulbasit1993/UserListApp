import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '../constants/colors';
import {ms} from 'react-native-size-matters';
import Header from '../components/Header';

const UserProfileScreen = ({route}) => {
  const params = route.params;
  const userData = params?.data;

  console.log('userData : ', userData);

  return (
    <View style={styles.container}>
      <Header title={'USER PROFILE'} />

      <View style={{height: ms(25)}} />

      <View>
        <View style={styles.infoView}>
          <Text style={styles.infoText}>First Name:</Text>
          <View style={styles.infoValue}>
            <Text style={styles.infoText}>{userData?.firstName}</Text>
          </View>
        </View>

        <View style={styles.infoView}>
          <Text style={styles.infoText}>Last Name:</Text>
          <View style={styles.infoValue}>
            <Text style={styles.infoText}>{userData?.lastName}</Text>
          </View>
        </View>

        <View style={styles.infoView}>
          <Text style={styles.infoText}>Username:</Text>
          <View style={styles.infoValue}>
            <Text style={styles.infoText}>{userData?.username}</Text>
          </View>
        </View>

        <View style={styles.infoView}>
          <Text style={styles.infoText}>Email:</Text>
          <View style={styles.infoValue}>
            <Text style={styles.infoText}>{userData?.email}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingVertical: ms(80),
  },
  infoView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: ms(45),
    marginBottom: ms(20),
  },
  infoValue: {
    marginLeft: ms(40),
  },
  infoText: {
    color: Colors.black,
    fontSize: ms(20),
    fontWeight: '600',
  },
});

export default UserProfileScreen;
