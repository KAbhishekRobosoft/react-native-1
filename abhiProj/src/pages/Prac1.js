import React, { useEffect, useState } from 'react'
import {ActivityIndicator,StyleSheet, View} from 'react-native'

function Prac1() {

    const [isLoading,setisLoading]= useState(true)
    const [data,setdata]= useState([])

    useEffect(
        fetch('https://facebook.github.io/react-native/movies.json')
        .then((data)=> data.json())
        .then(res =>{
            setisLoading(false)
            setdata(res.movies)
        })
        .catch(err =>{
            console.log(err)
        })
    )

  return (
     <View>
       
        
     </View> 
    )
}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    
      item:{
        flex:1,
        alignSelf:"stretch",
        margin:10,
        alignItems:"center",
        borderBottomWidth:1,
        borderBottomColor:"#eee"
      }
})

export default Prac1