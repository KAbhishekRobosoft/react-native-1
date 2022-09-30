import React from 'react';
import {View,StyleSheet,SafeAreaView,Text,Pressable} from 'react-native';

function FlexStart() {
  return (
    <View style={styles.con44}>
      <Text style={styles.text}>{'\n'}Flex Start</Text>

      <View style={styles.con1}>
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

    con1:{
      justifyContent:"flex-start",
      flexDirection:"row",
      marginTop:10,
      marginBottom:10,
      flex:1,
      borderWidth:3,
      margin:15,
      padding:10,
      backgroundColor:"#cccccc"
  },

  con44:{
    borderWidth:3,
    margin:15,
    padding:10,
    backgroundColor:"pink"
},

  text:{
    fontWeight:"bold",
    fontSize:20,
    textAlign:"center"
  
},

    but3:{
        backgroundColor:"red",
        padding:10,
        borderWidth:2
    }
})

export default FlexStart;