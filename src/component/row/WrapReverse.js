import React from 'react'
import {View,StyleSheet,Text,Pressable} from 'react-native';


function AlignContent() {
  return (
    <View style={styles.con44}>
        <Text style={styles.text}>{"\n"}Wrap Reverse & Flex Grow</Text>
        
        <View style= {styles.con4}>
            <Pressable style= {styles.but1}>
                <Text>Hello1</Text>
            </Pressable>

            <Pressable style= {styles.but2}>
                <Text>Hello2</Text>
             </Pressable>

            <Pressable style= {styles.but3}>
                <Text>Hello3</Text>
            </Pressable>

            <Pressable style= {styles.but1}>
                <Text>Hello1</Text>
            </Pressable>

            <Pressable style= {styles.but2}>
                <Text>Hello2</Text>
             </Pressable>

            <Pressable style= {styles.but3}>
                <Text>Hello3</Text>
            </Pressable>

            <Pressable style= {styles.but2}>
                <Text>Hello2</Text>
             </Pressable>

            <Pressable style= {styles.but3}>
                <Text>Hello3</Text>
            </Pressable>

            <Pressable style= {styles.but2}>
                <Text>Hello2</Text>
             </Pressable>

        </View>
    </View>
  )
}
const styles= StyleSheet.create({
    but1:{
        backgroundColor:"green",
        padding:10,
        flexGrow:2,
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

    text:{
        fontWeight:"bold",
        fontSize:20,
        textAlign:"center"
    },

    con4:{
        flexWrap:"wrap-reverse",
        flexDirection:"row",
        marginTop:10,
        marginBottom:10,
        alignContent:"space-between",
        flex:1,
        maxHeight: 400,
        borderWidth:3,
        padding:10,
        backgroundColor:"#cccccc",
        margin:15,
    },

    but3:{
        backgroundColor:"red",
        padding:10,
        borderWidth:2
    }
})
export default AlignContent