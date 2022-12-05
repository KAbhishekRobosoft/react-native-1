import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Image,
  Modal,
  ToastAndroid,
} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {getVerifiedKeys} from '../utils/Functions';
import {deleteTrip} from '../services/Auth';
import {useDispatch, useSelector} from 'react-redux';
import {setInitialState} from '../redux/MileStoneSlice';
import {month1} from '../utils/Functions';
import Toast from 'react-native-simple-toast';

const AllTripList = ({navigation, data}) => {
  const state = useSelector(state => state.milestone.initialState);
  const [visible, setVisible] = useState(false);
  const authData = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleClose = async id => {
    const key = await getVerifiedKeys(authData.userToken);
    const reponse = await deleteTrip(id, key);
    Toast.show('trip deleted successfully');
    dispatch(setInitialState(state));
  };
  return (
    <View>
      <Pressable
        onPress={() =>
          navigation.navigate('particularTrip', {
            data: data,
          })
        }>
        <View style={styles.container}>
          <ImageBackground
            source={{uri: 'https' + data.tripImage.substring(4)}}
            resizeMode="cover"
            style={styles.image}>
            <View style={styles.listContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.placeName}>{data.tripName}</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.dateText}>
                    {data.startDate.substring(8, 10)}{' '}
                    {month1[data.startDate.substring(5, 7)]} -{' '}
                  </Text>
                  <Text style={styles.dateText}>
                    {data.endDate.substring(8, 10)}{' '}
                    {month1[data.endDate.substring(5, 7)]}
                  </Text>
                </View>
                <View style={styles.statusContainer}>
                  <Text style={styles.statusText}>{data.tripStatus}</Text>
                </View>
              </View>
              {authData.userCredentials.mobile === data.mobile && (
                <Pressable onPress={() => handleClose(data._id)}>
                  <Image
                    source={require('../assets/images/close.png')}
                    style={styles.closeImage}
                  />
                </Pressable>
              )}
            </View>
          </ImageBackground>
        </View>
      </Pressable>
      <Modal visible={visible} animationType="slide">
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Pressable onPress={() => setVisible(false)}>
            <Text>HeLLO</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};

export default AllTripList;

const styles = StyleSheet.create({
  container: {
    height: 140,
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    backgroundColor: 'grey',
    borderRadius: 5,
  },

  listContainer: {flexDirection: 'row', justifyContent: 'space-between'},
  image: {
    height: 140,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2
    }
  },

  placeName: {
    color: '#FFFFFF',
    height: 28,
    lineHeight: 28,
    fontSize: 18,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    letterSpacing: 0,
  },

  dateText: {
    color: '#FFFFFF',
    height: 28,
    lineHeight: 28,
    fontSize: 12,
    fontFamily: 'Roboto',
    fontWeight: '500',
    letterSpacing: 0,
  },

  statusContainer: {
    height: 21,
    borderColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    width: '100%',
    alignItems: 'center',
  },

  statusText: {
    color: '#FFFFFF',
    height: 16,
    lineHeight: 16,
    fontSize: 12,
    fontFamily: 'Roboto',
    fontWeight: '500',
    letterSpacing: 0,
    height: 30,
    justifyContent: 'center',
  },

  textContainer: {
    marginLeft: 14,
    marginTop: 10,
  },

  closeImage: {
    tintColor: '#FFFFFF',
    height: 30,
    width: 30,
    marginRight: 5,
    marginTop: 5,
  },
});
