import React from 'react'
import {View,StyleSheet,SafeAreaView,Text,Pressable} from 'react-native';

function Center() {
  return (
        <View style={styles.con44}>
            <Text style={styles.text}>{"\n"}Center</Text>
        
        <View style= {styles.con5}>
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

    con5:{
    
        flexDirection:"row",
        justifyContent:"center",
        alignContent:"space-between",
        marginTop:10,
        marginBottom:10,
        flex:1,
        borderWidth:3,
        margin:15,
        padding:10,
        backgroundColor:"#cccccc"
    },

    but1:{
        backgroundColor:"green",
        padding:10,
        borderWidth:2
    },

    con44:{
        borderWidth:3,
        margin:15,
        padding:10,
        backgroundColor:"pink"
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

    text:{
        fontWeight:"bold",
        fontSize:20,
        textAlign:"center"
    },
})

export default Center