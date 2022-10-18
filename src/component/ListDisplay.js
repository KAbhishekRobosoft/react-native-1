import React, { useState } from 'react';
import {View, Image, StyleSheet, Text,Pressable} from 'react-native';
import {images} from './Images';
import Clipboard from '@react-native-community/clipboard';
import Icon from 'react-native-vector-icons/MaterialIcons';


function ListDisplay(props) {
  const [value,setValue]= useState(null)

  let {ele, img} = props;

  function copyText(){
      Clipboard.setString(ele.password)
  }

  return (
    <View key={ele.id} style={styles.main_con}>
      <View style={styles.describe}>
        <View style={styles.imageCon}>
          <Image style={styles.imageDes} source={images.siteName[img]} />
        </View>

        <View style={styles.textCon}>
          <Text style={styles.text1}>{ele.siteName}</Text>
          <View>
            <Pressable onPress= {copyText} style={styles.copy}>
              <Icon size={25} name="flip-to-back" color={'#6aadf6'} />
              <Text style={styles.textSty}>Copy Password</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <View style={styles.url}>
        <Text>{ele.url.toLowerCase()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main_con: {
    backgroundColor: 'white',
    marginLeft: 20,
    marginTop: 20,
    marginRight: 20,
    borderRadius: 6,
  },

  textSty: {
    color: '#0e85ff',
    fontSize: 12,
  },

  copy: {
    flexDirection: 'row',
    margin: 5,
    alignItems: 'center',
  },

  url: {
    backgroundColor: '#fcfcfc',
    marginTop: 25,
    height: 37.8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text1: {
    fontSize: 18,
    color: '#0e85ff',
    fontWeight: 'bold',
    marginLeft: 40,
    marginTop:10
  },

  describe: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  imageCon: {
    marginTop: 10,
    marginLeft: 20,
  },
});

export default ListDisplay;
