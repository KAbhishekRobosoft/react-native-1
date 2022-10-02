import React from 'react';
import {View,StyleSheet,SafeAreaView,Text,Pressable} from 'react-native';

function AlignStretch() {
  return (
    <View style={styles.con44}>
      <Text style={styles.text}>
        {'\n\n'}Direction: Column{'\n\n'}Align Stretch
      </Text>
      <View style={styles.con6}>
        <Pressable style={styles.but1}>
          <Text>Hello1</Text>
        </Pressable>

        <Pressable style={styles.but2}>
          <Text>Hello2</Text>
        </Pressable>

        <Pressable style={styles.but3}>
          <Text>Hello3</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles= StyleSheet.create({
    but1:{
        backgroundColor:"green",
        padding:10,
        borderWidth:2
    },

    but2:{
        backgroundColor:"purple",
        padding:10,
        borderWidth:2
    },

    but3:{
        backgroundColor:"red",
        padding:10,
        borderWidth:2
    },

    con44:{
      borderWidth:3,
      margin:10,
      padding:10,
      backgroundColor:"pink",
  },

    text:{
      fontWeight:"bold",
      fontSize:20,
      textAlign:"center"
  },


  con6:{
    alignItems:"stretch",
    marginBottom:30,
    flex:1,
    borderWidth:3,
    margin:15,
    padding:10,
    backgroundColor:"#cccccc"
},
})

export default AlignStretch;