import React from 'react';
import {View,StyleSheet,SafeAreaView,Text,Pressable} from 'react-native';

function SpaceBetween() {
  return (
    <View style={styles.con44}>
      <SafeAreaView>
        <Text style={styles.text}>Direction: Row{'\n\n'}Space Between</Text>
      </SafeAreaView>
      <View style={styles.con}>
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

    con:{
      flexDirection:"row",
      justifyContent:"space-between",
      marginTop:10,
      marginBottom:10,
      flex:1,
      borderWidth:3,
      padding:10,
      backgroundColor:"#cccccc",
      margin:15,

    },

    but2:{
        backgroundColor:"purple",
        padding:10,
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
    backgroundColor:"pink",
    marginTop:50
},

    but3:{
        backgroundColor:"red",
        padding:10,
        borderWidth:2
    }
})

export default SpaceBetween;