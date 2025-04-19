import React from 'react';
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ms} from 'react-native-size-matters';
import {Colors} from '../constants/colors';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

const {width, height} = Dimensions.get('window');

const UserCard = ({data, onCardPress, onEditPress, onDeletePress}) => {
  return (
    <TouchableOpacity onPress={onCardPress} style={styles.container}>
      <View style={styles.cardLeftContainer}>
        <Text>
          {data?.firstName} {data?.lastName}
        </Text>
        <Text>{data?.email}</Text>
      </View>
      <View style={styles.cardRightContainer}>
        <View style={styles.iconsContainer}>
          <TouchableOpacity onPress={onEditPress}>
            <FontAwesomeIcon
              name="pencil"
              style={styles.icon}
              color={Colors.black}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={onDeletePress}>
            <AntDesignIcon
              name="delete"
              style={styles.icon}
              color={Colors.black}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: width - ms(50),
    height: ms(60),
    backgroundColor: Colors.white,
    marginBottom: ms(15),
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.black,
  },
  cardLeftContainer: {
    width: '80%',
    justifyContent: 'center',
    paddingHorizontal: ms(10),
  },
  cardRightContainer: {
    width: '20%',
    justifyContent: 'center',
  },
  icon: {
    fontSize: ms(25),
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: ms(55),
  },
});

export default UserCard;
