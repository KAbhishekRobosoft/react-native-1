import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {GarageInputField} from '../components/InputFields';
import {addBikeData, addBikeType} from '../redux/AccessoriesSlice';
import {getBikeDetails} from '../services/Auth';
import {getVerifiedKeys} from '../utils/Functions';
import {setLoading, deSetLoading} from '../redux/MileStoneSlice';
import {getAllService} from '../services/Auth';
import {addAllServices} from '../redux/AccessoriesSlice';

export const MyGarage = ({navigation}) => {
  const hadBike = useSelector(state => state.auth.userCredentials);
  const dispatch = useDispatch();
  const bikeType = useSelector(state => state.shop.bikeType);
  const authData = useSelector(state => state.auth);
  const loading = useSelector(state => state.milestone.isLoading);
  const serviceData = useSelector(state => state.shop.serviceData);
  const [day, setDay] = useState();
  useEffect(() => {
    dispatch(deSetLoading());
    const get = async () => {
      try {
        let cred = await getVerifiedKeys(authData.userToken);
        const response = await getBikeDetails(cred);
        const response2 = await getAllService(cred);
        const time = response2[0].slotDate;
        const time2 = Date.now();
        const diffTime = new Date(time).getTime() - time2;
        setDay(diffTime);
        dispatch(addAllServices(response2));
        const BikeTypes = response.map(e => {
          return e.vehicleType;
        });
        dispatch(addBikeType(BikeTypes));
        dispatch(addBikeData(response));
      } catch (e) {
        dispatch(addAllServices([]));
      }
      dispatch(setLoading());
    };
    get();
  }, []);
  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="orange" />
      </View>
    );
  }

  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        {serviceData.length > 0 ? (
          new Date(serviceData[0]?.slotDate) >= Date.now() ? (
            <View style={styles.serviceDueView}>
              <Text style={styles.daysText}>
                {Math.floor(day / (1000 * 3600 * 24))} days
              </Text>
              <Text style={styles.daysDescription}>Next Service due</Text>
            </View>
          ) : (
            <View style={styles.serviceDueView}>
              <Text style={styles.daysText}>No service Due</Text>
            </View>
          )
        ) : (
          <View style={styles.serviceDueView}>
            <Text style={styles.daysText}>No Services Booked</Text>
          </View>
        )}

        <Image
          source={require('../assets/images/meter.png')}
          style={styles.meterImage}
        />
        {hadBike.haveBike ? (
          <View style={{marginTop: 30}}>
            <GarageInputField
              text="Book a Service"
              source={require('../assets/images/telemarketer.png')}
              onPress={() => {
                if (bikeType[0] === undefined) {
                  navigation.navigate('AddDetailsStack');
                } else {
                  navigation.navigate('BookService');
                }
              }}
              disabled={false}
            />
            <GarageInputField
              text="Service Records"
              source={require('../assets/images/folder.png')}
              onPress={() => {
                if (bikeType[0] === undefined) {
                  navigation.navigate('AddDetailsStack');
                } else {
                  navigation.navigate('ServiceRecord');
                }
              }}
              disabled={false}
            />
            <GarageInputField
              text="Owners Manual"
              source={require('../assets/images/notebook-of-spring-with-lines-page.png')}
              onPress={() => {
                if (bikeType[0] === undefined) {
                  navigation.navigate('AddDetailsStack');
                } else {
                  navigation.navigate('OwnerManual');
                }
              }}
              disabled={false}
            />
            <GarageInputField
              text="Tool Kit"
              source={require('../assets/images/tOLS.png')}
              onPress={() => navigation.navigate('ToolKit')}
              disabled={false}
            />
            <GarageInputField
              text="Accessories"
              source={require('../assets/images/helmet.png')}
              onPress={() => navigation.navigate('Accessories')}
              disabled={false}
            />
          </View>
        ) : (
          <View style={{marginTop: 30}}>
            <GarageInputField
              text="Book a Service"
              source={require('../assets/images/telemarketer.png')}
              onPress={() => navigation.navigate('BookServiceStack')}
              disabled={true}
            />
            <GarageInputField
              text="Service Records"
              source={require('../assets/images/folder.png')}
              onPress={() => navigation.navigate('ServiceRecordStack')}
              disabled={true}
            />
            <GarageInputField
              text="Owners Manual"
              source={require('../assets/images/notebook-of-spring-with-lines-page.png')}
              onPress={() => navigation.navigate('OwnersManualStack')}
              disabled={true}
            />
            <GarageInputField
              text="Tool Kit"
              source={require('../assets/images/tOLS.png')}
              onPress={() => navigation.navigate('ToolKit')}
              disabled={false}
            />
            <GarageInputField
              text="Accessories"
              source={require('../assets/images/helmet.png')}
              onPress={() => navigation.navigate('Accessories')}
              disabled={false}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  serviceDueView: {
    alignItems: 'center',
    marginTop: 25,
  },
  daysText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 17,
    color: '#E08B4D',
    lineHeight: 19,
  },
  daysDescription: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    color: '#E08B4D',
    lineHeight: 19,
  },
  meterImage: {
    height: 170,
    width: 320,
    alignSelf: 'center',
    marginTop: 30,
  },
});
