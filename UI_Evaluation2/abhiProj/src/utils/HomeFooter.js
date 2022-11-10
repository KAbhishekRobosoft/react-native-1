import React from 'react';
import {View,Text,StyleSheet,Image} from 'react-native'
import { useSelector } from 'react-redux';
import { precipitation } from './HardCodedText';

function HomeFooter() {
  const data= useSelector(state=>state.addFavourites.recentPlace)
  return (
    <>
      <View style={styles.tempValView}>
        <Image
          style={styles.tempImg}
          source={require('../images/icon_temperature_info.png')}
        />
        <View style={styles.tempDisp}>
          <Text style={styles.minMax}>Min - Max</Text>
          <Text style={styles.tempNumDisp}>{parseInt(data.tempMin)} - {parseInt(data.tempMax)}</Text>
        </View>
      </View>

      <View style={styles.rainValView}>
        <Image
          style={styles.rainImg}
          source={require('../images/icon_rain_small.png')}
        />
        <View style={styles.tempDisp}>
          <Text style={styles.minMax}>Precipitation</Text>
          <Text style={styles.tempNumDisp}>{precipitation.name[data.status]}%</Text>
        </View>
      </View>

      <View style={styles.humidityValView}>
        <Image
          style={styles.humidityImg}
          source={require('../images/icon_humidity_info.png')}
        />
        <View style={styles.tempDisp}>
          <Text style={styles.minMax}>Humidity</Text>
          <Text style={styles.tempNumDisp}>{data.humidity}%</Text>
        </View>
      </View>

      <View style={styles.visibilityView}>
        <Image
          style={styles.visibilityImg}
          source={require('../images/icon_visibility_info.png')}
        />
        <View style={styles.tempDisp}>
          <Text style={styles.minMax}>Visibility</Text>
          <Text style={styles.tempNumDisp}>{data.visibility}</Text>
        </View>
      </View>
      </>
 
  );
}
const styles = StyleSheet.create({
 
    rainImg:{
      width:24,
      height:23,
      marginLeft:18
    },
  
    visibilityImg:{
      width:24,
      height:15,
      marginLeft:18
    },
  
    humidityImg:{
      width:15,
      height:20,
      marginLeft:18
    },
  
    minMax:{
      fontSize:13,
      lineHeight:15,
      fontFamily:"Roboto-Regular",
      color:"#ffffff"
    },
  
    tempNumDisp:{
      lineHeight:21,
      fontSize:18,
      fontFamily:"Roboto-Regular",
      color:"#ffffff"
    },
  
    tempImg:{
      width:13,
      height:26,
      marginLeft:18
    },
  
    tempValView:{
      width:110,
      flexDirection:"row",
      justifyContent:"space-between",
      alignItems:"center",
    },
  
    visibilityView:{
      width:110,
      flexDirection:"row",
      justifyContent:"space-between",
      alignItems:"center",
      marginLeft:30,
      marginRight:20
    },
  
    humidityValView:{
      width:110,
      flexDirection:"row",
      justifyContent:"space-between",
      alignItems:"center",
      marginLeft:33,
    },
  
    rainValView:{
      width:130,
      flexDirection:"row",
      justifyContent:"space-between",
      alignItems:"center",
      marginLeft:33,
    },

  });

export default HomeFooter;
