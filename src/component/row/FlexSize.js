import React from 'react';
import {View,StyleSheet,Text,Pressable} from 'react-native';

function FlexSize() {
  return (
    <View style={styles.con44}>
      <Text style={styles.text}>{'\n'}Flex Size : Shrink,Grow,Basis</Text>

      <View style={styles.con2}>
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
        flexBasis:150,
        flexShrink:3,
        borderWidth:2
    },

    but2:{
        backgroundColor:"purple",
        padding:10,
        flexBasis:150,
        flexShrink:3,
        borderWidth:2
    },

    but3:{
        backgroundColor:"red",
        padding:10,   
        flexBasis:150,
        flexShrink:2,
        borderWidth:2
    },

    text:{
      fontWeight:"bold",
      fontSize:20,
      textAlign:"center"
      
  },

  con44:{
    borderWidth:3,
    margin:15,
    padding:10,
    backgroundColor:"pink"
},

    con2:{
      flexDirection:"row",
      marginTop:10,
      marginBottom:10,
      alignItems:"center",
      borderWidth:3,
      margin:15,
      padding:10,
      backgroundColor:"#cccccc"
      
  }
})
export default FlexSize;