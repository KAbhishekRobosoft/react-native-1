import React from 'react'
import {View,StyleSheet,Image} from 'react-native'

function EntryPage() {
  return (
   <View style= {styles.main_con}>
        <View style={styles.imgLock}>
                <Image source= {require('../images/pic.png')} />
        </View>

   </View>
  )
}

const styles= StyleSheet.create({
    main_con:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:'#0e85ff'
    }
})
export default EntryPage