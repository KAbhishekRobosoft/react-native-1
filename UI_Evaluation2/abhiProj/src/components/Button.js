import React,{useRef} from 'react'
import { TouchableOpacity,View,Text,StyleSheet } from 'react-native'

function Button({name,onPress,ref}) {
    const viewRef= useRef()
    const textRef= useRef()

  return (
        <View ref={viewRef}>
            <TouchableOpacity onPress= {onPress}>
                <Text ref={textRef} style={styles.textStyle}>{name}</Text>
            </TouchableOpacity>
        </View>
  )
}

const styles= StyleSheet.create({
    textStyle:{
        fontSize:16,
        lineHeight:19,
        fontFamily:"Roboto-Regular",
        textAlign:"center",
        color:"white",
        fontWeight:"bold"
    }
})

export default Button