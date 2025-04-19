import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Alert,
} from 'react-native';
import Header from '../components/Header';
import {ms} from 'react-native-size-matters';
import {FlashList} from '@shopify/flash-list';
import UserCard from '../components/UserCard';
import {Colors} from '../constants/colors';
import AppModal, {ModalRef} from '../components/AppModal';
import firestore from '@react-native-firebase/firestore';

const UserListScreen = ({navigation}) => {
  const [usersData, setUsersData] = useState([
    {
      id: 1,
      username: 'abc',
      firstName: 'xyz',
      lastName: 'pqr',
    },
    {
      id: 2,
      username: 'abc',
      firstName: 'xyz',
      lastName: 'pqr',
    },
    {
      id: 3,
      username: 'abc',
      firstName: 'xyz',
      lastName: 'pqr',
    },
    {
      id: 4,
      username: 'abc',
      firstName: 'xyz',
      lastName: 'pqr',
    },
    {
      id: 5,
      username: 'abc',
      firstName: 'xyz',
      lastName: 'pqr',
    },
    {
      id: 6,
      username: 'abc',
      firstName: 'xyz',
      lastName: 'pqr',
    },
    {
      id: 7,
      username: 'abc',
      firstName: 'xyz',
      lastName: 'pqr',
    },
    {
      id: 8,
      username: 'abc',
      firstName: 'xyz',
      lastName: 'pqr',
    },
    {
      id: 9,
      username: 'abc',
      firstName: 'xyz',
      lastName: 'pqr',
    },
  ]);

  const modalRef = useRef<ModalRef>(null);

  const handleCardPress = item => {
    navigation.navigate('UserProfile', {data: item});
  };

  const handleDeleteUser = async id => {
    modalRef?.current?.hideModal();

    try {
      await firestore().collection('users').doc(id).delete();

      setUsersData(prevData => prevData.filter(user => user.id !== id));

      Alert.alert('Delete User', 'User deleted successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to delete user');
    }
  };

  const renderUsers = ({item, index}) => {
    return (
      <UserCard
        data={item}
        onCardPress={() => {
          handleCardPress(item);
        }}
        onEditPress={() => {
          modalRef?.current?.showModal(
            'EditProfile',
            'Edit Profile',
            {
              onSubmitPress: data => {
                console.log('User confirmed edit: ', data);

                modalRef?.current?.hideModal();

                const filteredData = Object.fromEntries(
                  Object.entries(data).filter(
                    ([key, value]) =>
                      value !== undefined &&
                      value !== null &&
                      value.toString().trim() !== '',
                  ),
                );

                if (Object.keys(filteredData).length === 0) {
                  Alert.alert(
                    'Validation Error',
                    'Please provide at least one non-empty field to update.',
                  );
                  return;
                }

                try {
                  firestore()
                    .collection('users')
                    .doc(item?.id)
                    .update(filteredData);

                  Alert.alert('Update User', 'User updated successfully');
                } catch (error) {
                  Alert.alert('Error', 'Failed to update user');
                }
              },
            },
            item,
          );
        }}
        onDeletePress={() => {
          modalRef?.current?.showModal('DeleteUser', 'Confirm Delete User', {
            onDeletePress: () => {
              console.log('User confirmed delete');

              handleDeleteUser(item?.id);
            },
          });
        }}
      />
    );
  };

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('users')
      .onSnapshot(
        snapshot => {
          const users = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));

          console.log('user data from firestore: ', users);

          setUsersData(users);
        },
        error => {
          console.log('Error fetching users: ', error);
        },
      );

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Header title={'LIST OF USERS'} />

      <View style={{height: ms(15)}} />

      <View style={styles.listContainer}>
        <FlashList
          data={usersData}
          renderItem={renderUsers}
          contentContainerStyle={{paddingHorizontal: ms(20)}}
          estimatedItemSize={ms(60)}
          ListEmptyComponent={() => (
            <View style={{alignItems: 'center'}}>
              <Text style={styles.noDataText}>No Users Found</Text>
            </View>
          )}
        />
      </View>

      <AppModal ref={modalRef} />
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
  listContainer: {
    flex: 1,
    width: '100%',
  },
  noDataText: {
    fontSize: ms(16),
    color: Colors.black,
    fontWeight: '500',
  },
});

export default UserListScreen;
