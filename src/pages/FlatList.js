import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Pressable,
  ScrollView,
  TextInput,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ListDisplay from '../component/ListDisplay';
import {types} from '../component/Images';
import {Dropdown} from 'react-native-element-dropdown';
import {filterData} from '../redux/Reducer';

function FlatList({navigation}) {
  const [text, setText] = useState(false);
  const [value, setValue] = useState();
  const dispatch = useDispatch();
  const data = useSelector(state => state);
  return (
    <View style={styles.main_con}>
      {console.log(data)}
      <View style={styles.bgm1}>
        <View style={styles.imgView}>
          <Pressable>
            <Image source={require('../images/burger.png')} />
          </Pressable>
        </View>
        <View style={styles.con1}>
          <Text style={styles.listText}>PASS{'\n'}MANAGER</Text>
        </View>

        <View style={styles.searchView}>
          <Pressable onPress= {()=>{setText(true)}}>
            <Image source={require('../images/search.png')} />
          </Pressable>
        </View>

        <View style={styles.syncView}>
          <Pressable>
            <Image source={require('../images/sync.png')} />
          </Pressable>
        </View>

        <View style={styles.profileView}>
          <Pressable>
            <Image source={require('../images/profile.png')} />
          </Pressable>
        </View>
      </View>

      <View style={styles.workCon}>
        {!text && (
          <View style={styles.txtView}>
            <Text style={styles.workText}>Sites</Text>
            <View style={styles.underLine}></View>
          </View>
        )}
        {text && <View>
            <TextInput placeholder='Type Keywords to search' style={{width:'100%'}} />
        </View>}
        {!text && (
          <View>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={types}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select item"
              searchPlaceholder="Search..."
              value={value}
              onChange={item => {
                setValue(item.value);
                dispatch(filterData(value));
              }}
            />
          </View>
        )}
      </View>

      <View style={styles.listBack}>
        <ScrollView>
          {data.map(ele => {
            let img = ele.siteName.toLowerCase();
            return <ListDisplay key={ele.id} img={img} ele={ele} />;
          })}
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

  listImg: {
    width: 40,
    height: 30,
  },

  listBack: {
    flex: 14,
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

  dropdown: {
    width: 180,
    marginRight: 20,
    height: 50,
    marginTop: 20,
  },

  rowComp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },

  txtView: {
    marginTop: 20,
    marginLeft: 20,
  },

  workText: {
    fontSize: 25,
  },

  workCon: {
    flexDirection: 'row',
    flex: 1.5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  bgm1: {
    flexDirection: 'row',
    backgroundColor: '#0e85ff',
    alignItems: 'center',
    width: '100%',
    height: 100,
    flex: 2,
  },

  searchView: {
    marginTop: 30,
    marginLeft: 60,
  },

  AddView: {
    marginTop: 500,
    marginLeft: 300,
    position: 'absolute',
  },

  profileView: {
    marginTop: 30,
    marginLeft: 30,
  },

  syncView: {
    marginTop: 30,
    marginLeft: 30,
  },

  imgView: {
    marginTop: 40,
    marginLeft: 30,
  },

  listText: {
    padding: 5,
    marginLeft: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 40,
  },
});

export default FlatList;
