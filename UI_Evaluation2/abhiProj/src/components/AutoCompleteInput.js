import React, {useRef, useState} from 'react';


import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  Pressable,
} from 'react-native';
import {useDispatch} from 'react-redux';
import { addRecentPlace } from '../redux/FavouriteSlice';
import { getCity } from '../services/ApiCall';
import { setInit } from '../redux/FavouriteSlice';

const AutoCompleteInput = ({navigation, route}) => {
  // const weatherData = useSelector(state => state.addFavourites.searchedPlace);
  const dispatch = useDispatch();
  const inpRef = useRef();
  const [filteredData, setFilteredData] = useState([]);
  const [visibleClear, setVisibleClear] = useState(false);

  const findData = async query => {
     const resp= await getCity(query)
     console.log(resp)
  
    if (query) {
      setFilteredData(
        resp.filter(x =>
          x.name.toLowerCase().startsWith(query.toLowerCase()),
        ),
      );
    } else {
      setFilteredData([]);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Pressable
          onPress={() => {
            navigation.goBack('HomePage');
          }}>
          <Image
            style={styles.back_img}
            source={require('../images/icon_back_black.png')}
          />
        </Pressable>
        <TextInput
          ref={inpRef}
          onChangeText={getText => {
            setVisibleClear(true);
              findData(getText);
          }}
          placeholder="Search for City"
          style={styles.input}
        />
        {visibleClear && (
          <Pressable
            onPress={() => {
              inpRef.current.clear();
              setVisibleClear(false);
            }}>
            <Image
              style={styles.clear_img}
              source={require('../images/icon_clear.png')}
            />
          </Pressable>
        )}
      </View>
      <View style={styles.listData}>
        {filteredData.length !== 0
          ? filteredData.map(ele => {
              return (
                <Pressable key={ele.id} onPress= {()=>{
                  dispatch(setInit(ele.name))
                  navigation.navigate('HomePage')
                }} >
                  <View style={styles.listItems}>
                    <Text
                      style={{lineHeight: 36, fontFamily: 'Roboto-Regular'}}>
                      {ele.name}
                    </Text>
                  </View>
                </Pressable>
              );
            })
          : null}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: 55,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },

  listItems: {
    marginTop:1,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    justifyContent: 'center',
    padding: 10,
  },

  clear_img: {
    width: 14,
    height: 14,
    margin: 20,
  },

  input: {
    height: 55,
    width: '70%',
    padding: 10,
    marginLeft: 20,
  },

  back_img: {
    width: 18,
    height: 18,
    marginLeft: 20,
  },
});
export default AutoCompleteInput;
