import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
  FlatList,
  useWindowDimensions,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import Button from '../components/Button';
import {images} from '../utils/HardCodedText';
import {useDispatch} from 'react-redux';
import {emptyFavourite} from '../redux/FavouriteSlice';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { filterFavourite } from '../redux/FavouriteSlice';

function FavouritePage({navigation}) {
  const [textInp, setTextInp] = useState(false);
  const data = useSelector(state => state.addFavourites.favourites);
  const dispatch = useDispatch();
  const {width, height} = useWindowDimensions();
  const marginLeft = width > height ? (Platform.OS === 'ios' ? 20 : 0) : 0;
  const marginLeft1 = width > height ? (Platform.OS === 'ios' ? 30 : 20) : 10;
  const marginTop1 = height > width ? (Platform.OS === 'ios' ? 175 : 175) : 0;
  const marginBottom = width > height ? (Platform.OS === 'ios' ? 200 : 0) : 0;
  return (
    <LinearGradient
      style={styles.main_con}
      start={{x: 0, y: 0.5}}
      end={{x: 1, y: 0.5}}
      colors={['#634bb2', '#9468bd']}>
      <SafeAreaView style={styles.work_con}>
        {!textInp && (
          <View style={[styles.header, {marginLeft: marginLeft}]}>
            <View style={styles.logoContent}>
              <Pressable onPress={() => navigation.goBack('Home')}>
                <Image
                  style={styles.back_img}
                  source={require('../images/icon_back_black.png')}
                />
              </Pressable>
              <Text style={styles.headingText}>Favourite</Text>
            </View>
            <Pressable onPress={()=>{
              setTextInp(true)
            }}>
              <Icon style={styles.searchIcon_img} size={20} name="search" />
            </Pressable>
          </View>
        )}
        {textInp && (
          <View style={styles.txtInpView}>
            <TextInput onChangeText={(getText)=>{
                  dispatch(filterFavourite(getText))
            }} placeholder="Type Keywords to search" />
            <Pressable onPress={()=>{
              setTextInp(false)
            }}>
              <Icon name="arrow-right" size={20} />
            </Pressable>
          </View>
        )}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <Text
            style={{
              marginLeft: 15,
              color: 'white',
              fontFamily: 'Roboto-Regular',
              fontSize: 15,
            }}>
            {data.length} city added as favourite
          </Text>
          <View style={{marginRight: 15}}>
            <Button
              onPress={() => {
                dispatch(emptyFavourite());
                // dispatch(changeSearchedPlace())
              }}
              name="Remove All"
            />
          </View>
        </View>
        <View style={styles.favListDisp}>
          {data.length === 0 && (
            <View
              style={{
                justifyContent: 'center',
                marginTop: marginTop1,
                marginBottom: marginBottom,
                alignItems: 'center',
              }}>
              <Image
                style={{width: 159, height: 84}}
                source={require('../images/icon_nothing.png')}
              />
              <Text
                style={{
                  marginTop: 25,
                  color: '#FFFFFF',
                  lineHeight: 21,
                  fontFamily: 'Roboto-Regular',
                  fontSize: 18,
                }}>
                No Favourites Added
              </Text>
            </View>
          )}
          {data.length !== 0 && (
            <FlatList
              data={data}
              renderItem={({item}) => {
                return (
                  <View
                    style={{
                      backgroundColor: '#8571c4',
                      height: 80,
                      marginLeft: 16,
                      marginRight: 16,
                      marginTop: 1,
                      marginLeft: marginLeft1,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <View>
                        <Text
                          style={{
                            marginLeft: 15,
                            marginTop: 15,
                            fontFamily: 'Roboto-Medium',
                            color: '#FFE539',
                          }}>
                          {item.place}
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 10,
                            marginBottom: 14,
                          }}>
                          <Image
                            style={{width: 30, height: 25, marginLeft: 15}}
                            source={images.weatherPic[item.picType]}
                          />
                          <Text
                            style={{
                              lineHeight: 21,
                              fontSize: 18,
                              fontFamily: 'Roboto-Medium',
                              color: 'white',
                              marginLeft: 9,
                            }}>
                            {parseInt(item.temp)} c
                          </Text>
                          <Text
                            style={{
                              lineHeight: 16,
                              fontSize: 14,
                              marginLeft: 17,
                              fontFamily: 'Roboto-Regular',
                              color: 'white',
                            }}>
                            {item.status}
                          </Text>
                        </View>
                      </View>
                      <Image
                        style={{
                          marginRight: 20,
                          marginTop: 32,
                          width: 20,
                          height: 20,
                          marginBottom: 31,
                        }}
                        source={require('../images/icon_favourite_active_copy.png')}
                      />
                    </View>
                  </View>
                );
              }}
            />
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  main_con: {
    flex: 1,
  },

  favListDisp: {
    marginTop: 40,
  },

  headingText: {
    lineHeight: 24,
    fontSize: 20,
    fontFamily: 'Roboto-Medium',
    color: 'black',
  },

  searchIcon_img: {
    marginRight: 10,
  },

  logoContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '40%',
    alignItems: 'center',
  },

  txtInpView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    width: '100%',
    padding: 5,
    height: 55,
    marginBottom: Platform.OS === 'ios' ? 14 : 0,
  },

  work_con: {
    flex: 1,
  },

  back_img: {
    width: 16,
    height: 16,
    marginLeft: 16,
  },

  header: {
    backgroundColor: 'white',
    width: '100%',
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
export default FavouritePage;
