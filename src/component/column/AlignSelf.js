import React from 'react'
import {View,StyleSheet,SafeAreaView,Text,Pressable} from 'react-native';

function AlignBaseline() {
  return (
   <View style={styles.con44}>
        <Text style={styles.text}>{"\n"}Align Self</Text>
            <View style= {styles.con7}>
                <Pressable style= {styles.but1}>
                    <Text>Hello1</Text>
                </Pressable>

                <Pressable style= {styles.but2}>
                    <Text>Hello2</Text>
                 </Pressable>

                <Pressable style= {styles.but3}>
                    <Text>Hello3</Text>
                </Pressable>
            </View>

   </View>
  )
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
        alignSelf:"flex-end",
        borderWidth:2
       
       
    },

    but3:{
        backgroundColor:"red",
        padding:10,
        alignSelf:"center",
        borderWidth:2
    },

    con7:{
        alignItems:"baseline",
        marginTop:10,
        marginBottom:10,
        margin:10,
        flex:1,
        borderWidth:3,
        padding:10,
        backgroundColor:"#cccccc",
    },

    text:{
      fontWeight:"bold",
      fontSize:20,
      textAlign:"center"
  },

  con44:{
    borderWidth:3,
    margin:10,
    padding:10,
    backgroundColor:"pink",
},
})

export default AlignBaseline