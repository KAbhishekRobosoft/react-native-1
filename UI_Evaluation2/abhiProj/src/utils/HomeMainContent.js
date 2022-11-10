import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addFavourite} from '../redux/FavouriteSlice';
import {imagesLong} from './HardCodedText';
import moment from 'moment';
import {status} from './HardCodedText';
import {getWeather} from '../services/ApiCall';
import {addRecentPlace} from '../redux/FavouriteSlice';

import {editSearchedPlace} from '../redux/FavouriteSlice';

function HomeMainContent() {
  const dispatch = useDispatch();
  const data = useSelector(state => state.addFavourites.recentPlace);
  const init = useSelector(state => state.addFavourites.initialPlace);
  const load = useSelector(state => state.addFavourites.isLoading);
  const img = useSelector(state => state.addFavourites.searchedPlace);
  const fav= useSelector(state=>state.addFavourites.favourites)
  const [temp,setTemp]= useState(true)

  useEffect(() => {
    setTimeout(async () => {
        const resp = await getWeather(init);
        dispatch(
          addRecentPlace({
            id: resp.id,
            place: resp.name,
            temp: Number(resp.main.temp) - 273.15,
            tempMin: Number(resp.main.temp_min) - 273.15,
            tempMax: Number(resp.main.temp_max) - 273.15,
            status: status.name[resp.weather[0].description],
            humidity: Number(resp.main.humidity),
            visibility: Number(resp.visibility),
            rain: Number(resp.rain),
            favourite: false,
          }),
        );
        console.log(resp)
    }, 1000);
  }, [init]);

  if (load) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator color="green" size="large" />
      </View>
    );
  }

  return (
    <View style={styles.main_content}>
      <Text style={styles.calenderText}>
        {moment().format(' ddd, D MMM YYYY, h:mm a')}
      </Text>
      <Text style={styles.placeText}>{data.place}</Text>
      <View style={styles.favouriteView}>
        <Pressable
          onPress={() => {
            console.log(status.name[data.status])
            dispatch(
              addFavourite({
                favourite: true,
                id: data.id,
                place: data.place,
                picType: data.status,
                temp: data.temp,
                status: data.status,
              }),
            );
            dispatch(editSearchedPlace(data));
          }}>
          {img.length > 0 &&
            img.map(ele => {
              if (ele.id === data.id) {
                if (ele.favourite === true && fav.length > 0) {
                  return (
                    <View key={data.id}>
                      <Image
                        style={styles.favourite_img}
                        source={require('../images/icon_favourite_active_copy.png')}
                      />
                    </View>
                  );
                } else {
                  return (
                    <View key={data.id}>
                      <Image
                        style={styles.favourite_img}
                        source={require('../images/icon_favourite.png')}
                      />
                    </View>
                  );
                }
              }
            })}
        </Pressable>
        <Text style={styles.favouriteText}>Add to favourite</Text>
      </View>
      <Image
        style={styles.sky_img}
        source={imagesLong.weatherPic[data.status]}
      />
      <View style={styles.temperatureView}>
        {temp && <Text style={styles.tempText}>{parseInt(data.temp)}</Text>}
        {!temp && <Text style={styles.tempText}>{parseInt((data.temp * 1.8) + 32)}</Text>}
        
        {temp && <View style={styles.butCon}>
          <View
            style={{
              width: 28,
              height: 30,
              borderWidth: 1,
              justifyContent: 'center',
              borderColor: '#FFFFFF',
              backgroundColor:"white"
            }}>
            <TouchableOpacity onPress= {()=>{
              setTemp(true)
            }}>
              <Text style={styles.textStyle}>C</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.but3}>
            <TouchableOpacity onPress= {()=>{
              setTemp(false)
            }}>
              <Text style={styles.textStyle1}>F</Text>
            </TouchableOpacity>
          </View>
        </View>}

        {!temp && <View style={styles.butCon}>
          <View
            style={{
              width: 28,
              height: 30,
              borderWidth: 1,
              justifyContent: 'center',
              borderColor: '#FFFFFF',
            }}>
            <TouchableOpacity onPress= {()=>{
              setTemp(true)
            }}>
              <Text style={styles.textStyle1}>C</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.but2}>
            <TouchableOpacity onPress= {()=>{
              setTemp(false)
            }}>
              <Text style={styles.textStyle}>F</Text>
            </TouchableOpacity>
          </View>
        </View>}

      </View>
      <Text style={styles.weatherText}>{data.status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  butCon: {
    flexDirection: 'row',
    marginLeft:10
  },

  weatherText: {
    lineHeight: 21,
    marginTop: 11,
    fontSize: 18,
    color: '#FFFFFF',
    fontFamily: 'Roboto-Regular',
  },

  textStyle1:{
    fontSize: 16,
    lineHeight: 19,
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },

  but1: {
    width: 28,
    height: 30,
    borderWidth: 1,
    justifyContent: 'center',
    borderColor: '#FFFFFF',
  },

  but2: {
    width: 28,
    height: 30,
    borderWidth: 1,
    justifyContent: 'center',
    borderColor: '#FFFFFF',
    backgroundColor:"white"
  },

  but3:{
    width: 28,
    height: 30,
    borderWidth: 1,
    justifyContent: 'center',
    borderColor: '#FFFFFF',

  },

  tempText: {
    lineHeight: 61,
    fontSize: 52,
    fontFamily: 'Roboto-Medium',
    color: '#FFFFFF',
  },

  textStyle: {
    fontSize: 16,
    lineHeight: 19,
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
    color: 'red',
    fontWeight: 'bold',
  },

  temperatureView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },

  sky_img: {
    width: 90,
    height:70,
    marginTop: 95.48,
  },

  favouriteText: {
    marginLeft: 7,
    lineHeight: 15,
    fontSize: 13,
    fontFamily: 'Roboto-Medium',
    color: '#FFFFFF',
  },

  favouriteView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 23,
  },

  favourite_img: {
    width: 18,
    height: 17,
  },

  main_content: {
    alignItems: 'center',
    width: '100%',
    marginTop: 52,
  },

  calenderText: {
    fontFamily: 'Roboto-Regular',
    lineHeight: 15,
    fontSize: 13,
    letterSpacing: 1.5,
    color: '#ffffff',
  },

  placeText: {
    marginTop: 10,
    lineHeight: 21,
    fontSize: 18,
    fontFamily: 'Roboto-Medium',
    color: '#ffffff',
  },
});
export default HomeMainContent;
