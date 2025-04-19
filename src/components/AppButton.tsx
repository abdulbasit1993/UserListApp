import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import {Colors} from '../constants/colors';
import {ms} from 'react-native-size-matters';

interface AppButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  customStyle?: any;
}

const AppButton = ({
  title,
  onPress,
  loading,
  customStyle,
}: AppButtonProps): React.ReactElement => {
  return (
    <TouchableOpacity
      style={[styles.btn, customStyle]}
      onPress={() => {
        onPress();
      }}
      disabled={loading}>
      {loading ? (
        <ActivityIndicator size="small" color={Colors.black} />
      ) : (
        <Text style={styles.btnText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
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
  btnText: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: '700',
  },
});

export default AppButton;
