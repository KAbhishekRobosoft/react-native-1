import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector, useDispatch} from 'react-redux';
import ActivityList from '../components/MyActivityList';
import {getSortedTripDetails, profileData} from '../services/Auth';
import {getVerifiedKeys, month} from '../utils/Functions';
import ImagePicker from 'react-native-image-crop-picker';
import { uploadProfileImage } from '../services/Auth';
import { setLoading,deSetLoading } from '../redux/MileStoneSlice';
import { setToken } from '../redux/AuthSlice';
import { setInitialState } from '../redux/MileStoneSlice';
import Toast from 'react-native-simple-toast'

const Profile = ({navigation}) => {
  const [personData, setPersonData] = useState({});
  const [tripDetails, setTripDetails] = useState([]);
  const userData = useSelector(state => state.auth.userCredentials);
  const token = useSelector(state => state.auth);
  const state = useSelector(state => state.milestone.initialState);
  const dispatch = useDispatch();
  const loading = useSelector(state => state.milestone.isLoading);

  function setImage() {
    ImagePicker.openPicker({
      width: 200,
      height: 200,
      cropping: true,
    }).then(async image => {
      const payload = new FormData();
      payload.append('image', {
        uri: image.path,
        type: image.mime,
        name: `${image.filename}.${image.mime.substring(
          image.mime.indexOf('/') + 1,
        )}`,
      })
      let cred= await getVerifiedKeys(token.userToken)
      dispatch(setToken(cred))
      const resp = await uploadProfileImage(payload,cred)
      if(resp !== undefined){
        Toast.show('Profile image updated succesfully')
        dispatch(setInitialState(state))
      }
    })
  }

  useEffect(() => {
    dispatch(deSetLoading());
    setTimeout(async () => {
      const cred = await getVerifiedKeys(token.userToken);
      dispatch(setToken(cred));
      const data = await profileData(cred, userData.mobile);
      setPersonData(data);
      const tripdata = await getSortedTripDetails(cred);
      setTripDetails(tripdata);
      dispatch(setLoading());
    }, 500);
  }, [state]);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="orange" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
    {JSON.stringify(personData) !== "{}" ? 
      <ScrollView style={{flex: 1}}>
        
        { JSON.stringify(personData) !== "{}" && <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#ED7E2C', '#F7B557']}
          style={styles.gradientCreateButton}>
          <ImageBackground
            source={require('../assets/images/profilebike.png')}
            resizeMode="cover"
            style={styles.backgroundImage}></ImageBackground>
          <Pressable
            onPress={() =>
              navigation.navigate('updateProfile', {
                userName: personData.userDetails.userName,
                aboutUser: personData.userDetails.aboutUser,
              })
            }>
            <Image
              source={require('../assets/images/edit.png')}
              style={styles.editIcon}
            />
          </Pressable>
          <View style={styles.profileContainer}>
            {personData.userDetails.hasOwnProperty('profileImage') ?(<Pressable onPress={setImage}><Image
              source={{uri:'https'+personData.userDetails.profileImage.substring(4)}}
              style={styles.profileImage}
            /></Pressable>):<Pressable onPress={setImage}><Image
              source={require('../assets/images/photoless.png')}
              style={styles.profileImage}
            /></Pressable>}
            <Text style={styles.profileName}>
              {personData?.userDetails?.userName}
            </Text>
            <Text style={styles.bioText}>
              {personData?.userDetails?.aboutUser}
            </Text>
          </View>
        </LinearGradient>}
        <View style={styles.detailContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.detailText}>Rides</Text>
            <Text style={styles.numberText}>{personData?.tripCount}</Text>
          </View>
          <View style={styles.line}></View>
          <View style={styles.textContainer}>
            <Text style={styles.detailText}>Following</Text>
            <Text style={styles.numberText}>
              {personData?.userDetails?.followingCount}
            </Text>
          </View>
          <View style={styles.line}></View>
          <View style={styles.textContainer}>
            <Text style={styles.detailText}>Followers</Text>
            <Text style={styles.numberText}>
              {personData?.userDetails?.followersCount}
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.activitiText}>My Activities</Text>
        </View>
        <ScrollView style={{flex: 1}}>
          {tripDetails.length > 0
            ? tripDetails.map(details => (
                <ActivityList
                  key={details?._id}
                  image={'https' + details?.tripImage?.substring(4)}
                  placeName={details?.tripName}
                  tripYear={details?.startDate?.substring(0, 4)}
                  startDate={details?.startDate?.substring(8, 10)}
                  endDate={details?.endDate?.substring(8, 10)}
                  startMonth={month[details?.startDate?.substring(5, 7)]}
                  endMonth={month[details?.endDate?.substring(5, 7)]}
                />
              ))
            : null}
        </ScrollView>
      </ScrollView> : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  gradientCreateButton: {
    height: 341,
    shadowColor: 'rgba(0,0,0,0.5)',
  },

  backgroundImage: {
    opacity: 0.06,
    flex: 1,
    height: 301,
    flexWrap: 'nowrap',
    marginTop: 20,
    left: '37%',
    position: 'absolute',
    width: '100%',
  },

  profileContainer: {
    alignItems: 'center',
    height: 300,
    width: '100%',
  },

  profileImage: {
    height: 120,
    width: 120,
    borderRadius: 65,
    marginBottom: 10,
    borderColor: '#FFFFFF',
  },

  followContainer: {
    height: 28,
    borderColor: '#FFFFFF',
    borderRadius: 15.5,
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },

  followText: {
    color: '#FFFFFF',
    height: 19,
    lineHeight: 19,
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: '500',
    letterSpacing: 0,
  },

  profileName: {
    color: '#FFFFFF',
    height: 28,
    lineHeight: 28,
    fontSize: 20,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    letterSpacing: 0,
  },

  bioText: {
    color: '#FFFFFF',
    height: 28,
    lineHeight: 28,
    fontSize: 12,
    fontFamily: 'Roboto',
    fontWeight: '500',
    letterSpacing: 0,
    marginBottom: 10,
  },

  detailContainer: {
    height: 71,
    width: '90%',
    alignSelf: 'center',
    bottom: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: 'rgba(95,95,95,0.5)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    shadowOpacity: 0.9,
    elevation: 5,
  },

  line: {
    borderLeftWidth: 1,
    height: 44,
    opacity: 0.19,
    borderColor: '#979797;',
  },

  detailText: {
    color: '#7E7D7D',
    fontFamily: 'Roboto',
    fontSize: 14,
    alignSelf: 'center',
    fontWeight: '500',
    marginBottom: 5,
    width: 100,
    textAlign: 'center',
  },

  numberText: {
    color: '#EE8330',
    fontFamily: 'Roboto',
    fontSize: 22,
    alignSelf: 'center',
    fontWeight: '500',
    width: 100,
    textAlign: 'center',
  },

  editIcon: {
    tintColor: '#FFFFFF',
    height: 20,
    width: 20,
    marginLeft: '90%',
    marginTop: '5%',
  },

  activitiText: {
    color: '#616161',
    height: 28,
    fontSize: 18,
    fontFamily: 'Roboto',
    fontWeight: '500',
    lineHeight: 28,
    marginLeft: 21,
    bottom: 20,
  },
});

export default Profile;
