import React from 'react'
import {StyleSheet,View,Text, Pressable} from 'react-native'

function GoalItem(props) {
  return (
            <Pressable onPress= {props.onDeleteItem.bind(this,props.id)}>
                <View style= {styles.goalItem}>
                    <Text style= {styles.texti}>{props.text}</Text>
                </View>
            </Pressable>
    )
}

const styles= StyleSheet.create({
    goalItem: {
        margin:8,
        padding:8,
        borderRadius:6,
        backgroundColor:"#5e0acc",
        width:"40%",
        padding:10,
        marginTop:20
      },
    
    texti: {
       color:"white",
       textAlign:"center",
      }
})

export default GoalItem