import React,{useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {images} from '../utils/HardCodedText';
import {editSearchedPlace} from '../redux/FavouriteSlice';
import {addFavourite} from '../redux/FavouriteSlice';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { status } from '../utils/HardCodedText';
import { filterSearched } from '../redux/FavouriteSlice';


function RecentSearch({navigation}) {
  const [textInp, setTextInp] = useState(false);
  const data = useSelector(state => state.addFavourites.searchedPlace);
  const fav= useSelector(state=>state.addFavourites.favourites)
  console.log('onakkam');
  console.log(data);
  const dispatch = useDispatch();
  const {width,height}= useWindowDimensions()
  const marginLeft= width > height ? (Platform.OS === "ios" ? 10 : 0) :0
  const marginLeft1= width > height ? (Platform.OS === "ios" ? 30 :20) : 16
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
              <Text style={styles.headingText}>Recent Search</Text>
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
                  dispatch(filterSearched(getText))
            }} placeholder="Type Keywords to search" />
            <Pressable onPress={()=>{
              setTextInp(false)
            }}>
              <Icon name="arrow-right" size={20} />
            </Pressable>
          </View>
        )}
        <View style={styles.favListDisp}>
          {data.length === 0 && (
            <View
              style={{
                justifyContent: 'center',
                marginTop: 175,
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
                No Recent Search
              </Text>
            </View>
          )}
          {data.length !== 0 && (
            <FlatList
              data={data}
              renderItem={({item}) => {
                return (
                  <View
                    style={[{
                      backgroundColor: '#8571c4',
                      height: 80,
                      marginRight: 16,
                      marginTop: 1,
                    },{marginLeft:marginLeft1}]}>
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
                          }}>
                          <Image
                            style={{width: 30, height: 25, marginLeft: 15}}
                            source={images.weatherPic[item.status]}
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
                      {item.favourite && fav.length > 0 && (
                        <Image
                          style={{marginRight: 20, width: 20, height: 20}}
                          source={require('../images/icon_favourite_active_copy.png')}
                        />
                      )}

                      {(!item.favourite || fav.length === 0) && (
                        <Pressable
                          onPress={() => {
                            console.log("helooofofo")
                            console.log(status.name[item.status])
                            dispatch(
                              addFavourite({
                                favourite: true,
                                id: item.id,
                                place: item.place,
                                picType: status.name[item.status],
                                temp: item.temp,
                                status: item.status,
                              }),
                            );
                            dispatch(editSearchedPlace(item));
                          }}>
                          <Image
                            style={{marginRight: 20, width: 20, height: 20}}
                            source={require('../images/icon_favourite.png')}
                          />
                        </Pressable>
                      )}
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

  logoContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
    alignItems: 'center',
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
export default RecentSearch;
