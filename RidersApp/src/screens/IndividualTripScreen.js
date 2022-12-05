import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  TextInput,
  SafeAreaView,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
  Text,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AllTripList from '../components/AllTripList';
import {addOwnerDetails, getBikeDetails, getOwnerDetails, UserTrips} from '../services/Auth';
import {getVerifiedKeys} from '../utils/Functions';
import {SearchUserTrips} from '../services/Auth';
import {setToken, setUserData} from '../redux/AuthSlice';
import Toast from 'react-native-simple-toast';
import { addBikeData, addBikeType } from '../redux/AccessoriesSlice';

const AllTrips = ({navigation}) => {
  const [tripDetails, setTripDetails] = useState([]);
  const authData = useSelector(state => state.auth);
  const state = useSelector(state => state.milestone.initialState);
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(async () => {
      try{
      const key = await getVerifiedKeys(authData.userToken);
      dispatch(setToken(key));
      const response = await getOwnerDetails(key);
      dispatch(setUserData(response[0]));
      const tripdata = await UserTrips(key);
      setTripDetails(tripdata);
      }catch(er){
        Toast.show("Error Occurred")
      }
    }, 500);
  }, [state]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const cred = await getVerifiedKeys(authData.userToken);
    dispatch(setToken(cred));
    const tripdata = await UserTrips(cred);
    if (tripdata !== undefined) {
      Toast.show('Loading Created Trips');
      setTripDetails(tripdata);
    } else {
      Toast.show('Unable to Load Trips');
    }
    setRefreshing(false);
  }, []);

  const renderItem = details => {
    return <AllTripList navigation={navigation} data={details.item} />;
  };
  const handleSearch = async value => {
    const key = await getVerifiedKeys(authData.userToken);
    const response = await SearchUserTrips(key, value);
    setTripDetails(response);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.searchView}>
        <Image
          source={require('../assets/images/search.png')}
          style={styles.searchIcon}
        />
        <TextInput
          name="Search a Trip"
          placeholder="Search a Trip"
          placeholderTextColor="rgba(166,166,166,0.87)"
          fontFamily="Roboto-Medium"
          fontSize={12}
          alignSelf={'center'}
          marginLeft={6}
          onChangeText={text => handleSearch(text)}
          style={styles.inputText}
        />
      </View>
      <FlatList
        data={tripDetails}
        keyExtractor={details => details._id}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      <Pressable
        style={styles.addButton}
        onPress={() => navigation.navigate('CreateTrip')}>
        <Image source={require('../assets/images/addtrip.png')} />
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchView: {
    height: 40,
    width: '90%',
    marginTop: 40,
    alignSelf: 'center',
    flexDirection: 'row',
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 4,
    shadowOpacity: 0.9,
    elevation: 5,
    opacity: 0.9,
    backgroundColor: 'white',
  },

  inputText: {
    marginLeft: 10,
    width: '70%',
  },

  searchIcon: {
    tintColor: 'grey',
    alignSelf: 'center',
    marginLeft: 12,
  },

  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 65,
    position: 'absolute',
    bottom: 50,
    right: 20,
    height: 65,
    paddingBottom: 15,
  },
  displayText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    alignSelf: 'center',
    marginTop: 50,
  },
});

export default AllTrips;
