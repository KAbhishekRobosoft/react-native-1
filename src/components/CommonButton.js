import React from 'react'
import { Pressable,View,Text,StyleSheet } from 'react-native'

function CommonButton({name,onPress}) {
  return (
    <View style= {styles.butCon}>
        <Pressable style= {styles.but} onPress= {onPress}>
            <Text style={styles.butInp}>{name}</Text>
        </Pressable>
    </View>
  )
}

const styles= StyleSheet.create({
    butCon:{
            backgroundColor:"orange",
            padding:10,
        },

        but:{
            width:60,
            height:20  
        },

        butInp:{
            textAlign:"center",
            fontSize:18
        }
    })
export default CommonButton