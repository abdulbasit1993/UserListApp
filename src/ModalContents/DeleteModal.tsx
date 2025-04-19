import React from 'react';
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

const DeleteModal = ({onDeletePress, onCancelPress}) => {
  return (
    <View style={styles.container}>
      <Text>Are you sure you want to delete this user?</Text>
      <View style={{height: ms(20)}} />

      <View style={styles.buttonsRow}>
        <AppButton
          title="YES"
          onPress={() => {
            onDeletePress();
          }}
          customStyle={{
            width: ms(100),
          }}
        />

        <AppButton
          title="NO"
          onPress={() => {
            onCancelPress();
          }}
          customStyle={{
            width: ms(100),
          }}
        />
      </View>
    </View>
  );
};

export default DeleteModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: ms(10),
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
