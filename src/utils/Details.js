import React from 'react';
import {View,Text,TextInput,StyleSheet} from 'react-native'

function Details({name}) {
  return (
    <View style={styles.textInpView1}>
      <Text style={styles.text1}>{name}</Text>
      <TextInput style={styles.textInp1} />
    </View>
  );
}

const styles= StyleSheet.create({
    textInpView1:{
        padding:20,
      },
    
      text1:{
        fontSize:20,
        color:'#c9ccd1',
      },
    
      textInp1:{
        height: 45,
        width: 330,
        borderWidth:2,
        borderColor:'#e9e9ea',
        marginTop:10,
        borderRadius:6,
        fontSize:16,
        padding:10,
        backgroundColor:"#f5f7fb"
      }
})

export default Details;
