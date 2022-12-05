import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {TripSummaryList} from '../components/summarizeMilestones';
import {RecommendationTripSummary} from '../components/Recommendations';
import {CreateButton} from '../components/Buttons';
import {useSelector, useDispatch} from 'react-redux';
import BikeImageComponent from '../components/BikeImageComponent';
import {getVerifiedKeys} from '../utils/Functions';
import {setToken} from '../redux/AuthSlice';
import {createTrip} from '../services/Auth';
import Toast from 'react-native-simple-toast';
import MapView, {Marker} from 'react-native-maps';
import {Polyline} from 'react-native-maps';
import {calculateRoute} from '../services/Auth';
import uuid from 'react-native-uuid';
import {deleteMilestonesData} from '../redux/MileStoneSlice';
import {setLoading} from '../redux/MileStoneSlice';
import {deSetLoading} from '../redux/MileStoneSlice';

export const TripSummary = ({navigation}) => {
  const mapRef = useRef(null);
  const tripDetails = useSelector(state => state.milestone.storeTrip);
  const loading = useSelector(state => state.milestone.isLoading);
  const milestonedata = useSelector(state => state.milestone.milestoneData);
  const contactsData = useSelector(state => state.contact);
  const authData = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [route, setRoute] = useState([]);

  useEffect(() => {
    dispatch(deSetLoading());
    setTimeout(async () => {
      const resp = await calculateRoute(
        tripDetails.source[0].latitude,
        tripDetails.source[0].longitude,
        tripDetails.destination[0].latitude,
        tripDetails.destination[0].longitude,
      );
      setRoute(resp.legs[0].points);
      dispatch(setLoading());
      setTimeout(()=>{
        mapRef.current.animateToRegion(
          {
            latitude: parseFloat(tripDetails.source[0].latitude),
            longitude: parseFloat(tripDetails.source[0].longitude),
            latitudeDelta: 0.03,
            longitudeDelta: 0.1,
          },
          3 * 1000,
        );
      },500)
    }, 500);
  }, []);
  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color="orange"/>
      </View>
    );
  }
  return (
    <SafeAreaView>
      {route.length > 0 ? (
        <View style={styles.mainView}>
          <View style={[styles.header]}>
            <View style={styles.subHeader}>
              <Pressable
                onPress={() => {
                  navigation.goBack();
                }}>
                <Icon
                  name="md-arrow-back"
                  color={'white'}
                  size={25}
                  style={styles.icon}
                />
              </Pressable>
              <Text style={styles.headerText}>TripSummary</Text>
            </View>
            <Pressable
              onPress={() => {
                navigation.navigate('CreateTrip');
                dispatch(deleteMilestonesData());
              }}>
              <Image
                source={require('../assets/images/ic_mode_edit_black.png')}
                style={styles.editImage}
              />
            </Pressable>
          </View>
          <ScrollView style={styles.scrollView}>
            <View style={styles.mapView}>
              <MapView
                ref={mapRef}
                style={styles.mapStyle}
                customMapStyle={mapStyle}>
                <Polyline
                  key={uuid.v4()}
                  coordinates={route.map(ele => ({
                    latitude: ele.latitude,
                    longitude: ele.longitude,
                  }))}
                  strokeColor={'blue'}
                  strokeWidth={2}
                  lineDashPattern={[1]}
                />
                <Marker
                  coordinate={{
                    latitude: parseFloat(tripDetails.source[0].latitude),
                    longitude: parseFloat(tripDetails.source[0].longitude),
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  }}
                />

                <Marker
                  coordinate={{
                    latitude: parseFloat(tripDetails.destination[0].latitude),
                    longitude: parseFloat(tripDetails.destination[0].longitude),
                    latitudeDelta: 0.03,
                    longitudeDelta: 0.01,
                  }}
                />
              </MapView>
              <View style={styles.summaryView}>
                <Image source={require('../assets/images/motorcycle.png')} />
                <Text style={styles.tripName}>{tripDetails?.tripName}</Text>
                <Text style={styles.dateText}>
                  {tripDetails?.startDate?.substring(8, 10)}{' '}{tripDetails?.startDate?.substring(4, 7)}{' '}-{' '}{tripDetails?.endDate?.substring(8, 10)}{' '}{tripDetails?.endDate?.substring(4, 7)} {tripDetails?.endDate?.substring(11, 15)}
                </Text>
                <Text style={styles.timeText}>
                  {tripDetails?.startTime?.substring(15, 21)}
                </Text>
                <View style={styles.fromToView}>
                  <Text style={styles.fromToText}>
                    {tripDetails?.source[0]?.place}
                  </Text>
                  <View style={styles.lineView}></View>
                  <Text style={styles.fromToText1}>
                    {tripDetails?.destination[0]?.place}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.listView}>
              <TripSummaryList data={milestonedata} />
              <View style={styles.recommendationsView}>
                <RecommendationTripSummary />
              </View>
              <View style={styles.addUserView}>
                <View style={styles.addUserImgView}>
                  <Pressable>
                    <Image
                      style={styles.calenderImg}
                      source={require('../assets/images/adduser.png')}
                    />
                  </Pressable>
                </View>
                {contactsData.addTripContacts.length === 0 && (
                  <Text style={styles.text}>Invite other riders</Text>
                )}
                {contactsData.addTripContacts.length > 0 && (
                  <BikeImageComponent data={contactsData.addTripContacts.length}/>
                )}
              </View>
              <View style={styles.buttonView}>
                <CreateButton
                  onPress={async () => {
                    const cred = await getVerifiedKeys(authData.userToken);
                    dispatch(setToken(cred));
                    const resp = await createTrip(tripDetails, cred);
                    if (resp !== undefined)
                      navigation.navigate('CreateTripSuccess');
                    else Toast.show('Trip Creation Unsuccessfull');
                  }}
                  title="CREATE"
                />
              </View>
            </View>
          </ScrollView>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: 'white',
    // height: '100%',
  },

  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  scrollView: {
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    height: 64,
    backgroundColor: '#ED7E2B',
    alignItems: 'center',
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3,
    shadowOpacity: 0.9,
    elevation: 5,
    justifyContent: 'space-between',
    opacity: 0.9,
  },
  subHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 15,
    fontFamily: 'Roboto-Medium',
  },
  icon: {
    marginHorizontal: 20,
  },
  editImage: {
    marginHorizontal: 25,
  },
  mapView: {
    height: 270,
    width: '100%',
    // borderWidth: 1,
    backgroundColor: 'grey',
  },
  summaryView: {
    height: 186,
    marginHorizontal: 20,
    marginTop: 210,
    shadowColor: 'rgba(179,172,172,0.5)',
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowRadius: 3,
    shadowOpacity: 0.9,
    elevation: 5,
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 20,
    justifyContent: 'space-around',
    borderRadius: 8,
  },
  tripName: {
    fontFamily: 'Roboto-Regular',
    fontSize: 24,
    color: 'rgba(58,57,57,0.87)',
    lineHeight: 32,
  },
  dateText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#4F504F',
    lineHeight: 21,
  },
  timeText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    lineHeight: 19,
    color: '#4F504F',
  },
  fromToView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  fromToText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    lineHeight: 19,
    color: '#4F504F',
    paddingHorizontal: 3,
  },
  fromToText1: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    lineHeight: 19,
    color: '#4F504F',
    paddingHorizontal: 3,
    width: '30%'
  },
  lineView: {
    borderWidth: 1,
    height: 1,
    width: 61,
    borderColor: 'rgba(151,151,151,0.4)',
    backgroundColor: 'rgba(151,151,151,0.4)',
  },
  listView: {
    marginVertical: 155,
  },
  recommendationsView: {
    paddingTop: 20,
  },
  buttonView: {
    paddingTop: 40,
    alignItems: 'center',
  },
  calenderImg: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  addUserView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
    paddingHorizontal: 28,
  },
  addUserImgView: {
    backgroundColor: 'white',
    width: 46,
    height: 46,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3,
    shadowOpacity: 0.6,
    elevation: 5,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    color: '#4F504F',
    width: '70%',
    textAlign: 'left',
    marginLeft: 10,
  },
});

const mapStyle = [
  {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
  {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
  {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{color: '#263c3f'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{color: '#6b9a76'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{color: '#38414e'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{color: '#212a37'}],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{color: '#9ca5b3'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{color: '#746855'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{color: '#1f2835'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{color: '#f3d19c'}],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{color: '#2f3948'}],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{color: '#17263c'}],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{color: '#515c6d'}],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{color: '#17263c'}],
  },
];
