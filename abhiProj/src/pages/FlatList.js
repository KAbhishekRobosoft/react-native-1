import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Pressable,
  ScrollView,
  TextInput,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {types} from '../utils/HardCodedData';
import {Dropdown} from 'react-native-element-dropdown';
import {useDispatch, useSelector} from 'react-redux';
import ListDisplay from '../component/ListDisplay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {logout} from '../redux/AuthenticationSlice';
import {filterData} from '../redux/AddDataSlice';
import {filterCategory} from '../redux/AddDataSlice';

function FlatList({navigation}) {
  const [text, setText] = useState(false);
  const dispatch = useDispatch();
  let data = useSelector(state => state.addDetails.userData);

  function searchText(getinpText) {
    dispatch(filterData(getinpText));
  }

  function searchList() {
    setText(false);
  }

  async function logOutFromAccount() {
    try {
      await AsyncStorage.removeItem('mPin');
    } catch (e) {
      console.log(e);
    }
    dispatch(logout());
  }

  return (
    <View style={styles.main_con}>
      <View style={styles.bgm1}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.imgView}>
            <Pressable>
              <Image source={require('../images/burger.png')} />
            </Pressable>
          </View>
          <View style={styles.con1}>
            <Text style={styles.listText}>PASS{'\n'}MANAGER</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.searchView}>
            <Pressable
              onPress={() => {
                setText(true);
              }}>
              <Image source={require('../images/search.png')} />
            </Pressable>
          </View>

          <View style={styles.syncView}>
            <Pressable>
              <Image source={require('../images/sync.png')} />
            </Pressable>
          </View>

          <View style={styles.profileView}>
            <Pressable onPress={logOutFromAccount}>
              <Image source={require('../images/profile.png')} />
            </Pressable>
          </View>
        </View>
      </View>

      <View style={styles.workCon}>
        {!text && (
          <View style={styles.txtView}>
            <Text style={styles.workText}>Sites</Text>
            <View style={styles.underLine}></View>
          </View>
        )}
        {text && (
          <View style={styles.txtInpView}>
            <TextInput
              style={styles.txtInp}
              placeholder="Type Keywords to search"
              onChangeText={searchText}
            />
            <Pressable onPress={searchList}>
              <Icon name="arrow-right" size={20} />
            </Pressable>
          </View>
        )}
        {!text && (
          <View style={styles.dropView}>
            <View>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                data={types}
                value="All"
                maxHeight={300}
                labelField="label"
                valueField="value"
                onChange={item => {
                  dispatch(filterCategory(item.value));
                }}
              />
            </View>
            <View style={styles.lengthCount}>
              <Text style={styles.textCount}>{data.length}</Text>
            </View>
          </View>
        )}
      </View>

      <View style={styles.listBack}>
        <ScrollView>
          {data?.length > 0
            ? data.map(ele => {
                let img = ele.siteName.toLowerCase();
                return (
                  <ListDisplay
                    navigation={navigation}
                    key={ele.id}
                    img={img}
                    ele={ele}
                  />
                );
              })
            : null}
        </ScrollView>
        <View style={styles.AddView}>
          <Pressable onPress={() => navigation.navigate('AddSite')}>
            <Image source={require('../images/add.png')} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main_con: {
    flex: 1,
  },

  textCount: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
    width: 20,
    fontWeight: 'bold',
  },

  lengthCount: {
    backgroundColor: '#0e85ff',
    marginTop: 10,
    marginRight: 20,
    borderRadius: 30,
  },

  dropView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },

  listBack: {
    flex: Platform.OS === 'ios' ? 14 : 20,
  },

  underLine: {
    width: 29,
    backgroundColor: 'orange',
    height: 3,
    marginTop: 3,
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

  placeholderStyle: {
    fontSize: 16,
  },

  selectedTextStyle: {
    fontSize: 16,
  },

  txtView: {
    marginTop: 10,
    marginLeft: 35,
  },

  workText: {
    fontSize: 25,
  },

  txtInpView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    width: '100%',
    padding: 5,
    height: 55,
    marginTop: Platform.OS === 'android' ? 12 : 0,
    marginBottom: Platform.OS === 'ios' ? 14 : 0,
  },

  workCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  bgm1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#0e85ff',
    alignItems: 'center',
  },

  searchView: {
    marginTop: Platform.OS === 'ios' ? 10 : 10,
    marginRight: 20,
  },

  txtInp: {
    fontSize: 15,
  },

  AddView: {
    marginTop: 130,
    marginLeft: 20,
    justifyContent: 'flex-end',
    position: 'absolute',
  },

  dropdown: {
    height: Platform.OS === 'ios' ? 45 : 35,
    borderWidth: Platform.OS === 'ios' ? 2 : 1,
    padding: 5,
    width: 170,
    marginTop: 10,
    borderRadius: 6,
    marginRight: 10,
    borderColor: Platform.OS === 'ios' ? '#e9e9ea' : 'black',
    backgroundColor: '#f5f7fb',
  },

  text1: {
    fontSize: 20,
    color: '#c9ccd1',
  },

  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

  profileView: {
    marginTop: Platform.OS === 'ios' ? 10 : 10,
    marginRight: 20,
  },

  syncView: {
    marginTop: Platform.OS === 'ios' ? 10 : 10,
    marginRight: 20,
  },

  imgView: {
    marginTop: Platform.OS === 'ios' ? 10 : 15,
    marginLeft: 30,
  },

  con1: {
    marginLeft: 20,
    marginTop: Platform.OS === 'ios' ? 0 : 8,
  },

  listText: {
    padding: 5,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default FlatList;
