import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors} from '../constants/colors';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {ms} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';

const Header = ({title}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.backIconContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesignIcon
            name="arrowleft"
            style={styles.icon}
            color={Colors.black}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      <View style={styles.rightSpacer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  backIconContainer: {
    width: ms(50),
    paddingLeft: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 30,
    color: Colors.black,
    fontWeight: '700',
  },
  icon: {
    fontSize: 35,
  },
  rightSpacer: {
    width: ms(50),
  },
});

export default Header;
