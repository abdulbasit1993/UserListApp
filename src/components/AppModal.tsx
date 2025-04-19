import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from 'react';
import {
  DimensionValue,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
import {ms} from 'react-native-size-matters';
import {Colors} from '../constants/colors';
import EditModal from '../ModalContents/EditModal';
import DeleteModal from '../ModalContents/DeleteModal';

type ModalType = 'EditProfile' | 'DeleteUser' | null;

type ModalCallbacks = {
  onDeletePress?: () => void;
  onSubmitPress?: (data: any) => void;
};

export type ModalRef = {
  showModal: (
    type: ModalType,
    title: string,
    callbacks?: ModalCallbacks,
    data?: any,
  ) => void;
  hideModal: () => void;
};

const AppModal = forwardRef<ModalRef>((_, ref) => {
  const [visible, setVisible] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [modalTitle, setModalTitle] = useState<string>('');
  const [modalCallbacks, setModalCallbacks] = useState<ModalCallbacks>({});
  const [data, setData] = useState();

  useImperativeHandle(ref, () => ({
    showModal: (type, title, callbacks, data) => {
      setModalType(type);
      setModalTitle(title);
      setVisible(true);
      if (callbacks) {
        setModalCallbacks(callbacks);
      } else {
        setModalCallbacks({});
      }
      if (data) {
        setData(data);
      }
    },
    hideModal: () => {
      setVisible(false);
      setModalType(null);
      setModalTitle('');
    },
  }));

  const handleClose = () => {
    setVisible(false);
    setModalType(null);
    setModalTitle('');
  };

  const renderContent = () => {
    switch (modalType) {
      case 'EditProfile':
        return (
          <EditModal onSubmitPress={modalCallbacks.onSubmitPress} data={data} />
        );
      case 'DeleteUser':
        return (
          <DeleteModal
            onDeletePress={modalCallbacks.onDeletePress}
            onCancelPress={() => {
              setVisible(false);
              setModalType(null);
              setModalTitle('');
            }}
          />
        );
      default:
        return <></>;
    }
  };

  return (
    <Modal
      isVisible={visible}
      avoidKeyboard={true}
      backdropTransitionOutTiming={0}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardAvoidingView}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={[styles.modalContent]}>
            <View style={styles.header}>
              <Text style={styles.title}>{modalTitle}</Text>
              <TouchableOpacity
                onPress={handleClose}
                style={styles.closeButton}>
                <AntDesignIcon
                  name="close"
                  style={styles.icon}
                  color={Colors.black}
                />
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={{paddingBottom: ms(40)}}>
              <View style={styles.modalBody}>{renderContent()}</View>
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
});

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: 10,
    alignItems: 'center',
    maxHeight: '60%',
    overflow: 'hidden',
  },
  keyboardAvoidingView: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  header: {
    width: '100%',
    height: ms(50),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    paddingVertical: ms(5),
    borderBottomWidth: 1,
    borderBottomColor: Colors.black,
  },
  title: {
    fontSize: ms(20),
    color: Colors.black,
  },
  closeButton: {
    position: 'absolute',
    right: ms(10),
  },
  icon: {
    fontSize: ms(25),
  },
  modalBody: {
    marginTop: ms(20),
    width: '100%',
    height: '100%',
  },
});

export default AppModal;
