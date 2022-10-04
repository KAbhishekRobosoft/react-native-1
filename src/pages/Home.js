import React from 'react'
import { View,Text,StyleSheet,ImageBackground,Dimensions,Pressable, Platform} from 'react-native'
import Buttons from '../component/Buttons'
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;


function Home({navigation}) {
    const wel= ()=>{
       navigation.navigate('Login')
  };

  const create= ()=>{
    navigation.navigate('SignUp')
  }

  return (  
    <View style={styles.cont}>
    <ImageBackground
      source={require('../images/img.jpg')}
      resizeMode="stretch"
      style={styles.img}>
      <Text style={styles.input}>
        Experience the{'\n'}easiest way to learn{"\n"}Flex Box
      </Text>
      <View>
          <Buttons onPress= {wel} name="Login" /> 
          <View style= {styles.con}>
              <Pressable onPress= {create} style= {styles.but}>
                <Text style={styles.text1} >Don't have an Account</Text>
              </Pressable>  
          </View>
      </View>
    </ImageBackground>
  </View>
  )
  }

const styles= StyleSheet.create({


cont: {
  flex: 1,
},

img: {
  height: screenHeight,
  width: screenWidth,
  justifyContent: 'center',
  alignItems: 'center',
  opacity: 0.9,
},

but: {
  backgroundColor: 'orange',
  borderRadius: 10,
  padding:10,
  width: Platform.OS === "android" ? 220 : 220,
  marginTop:10,
  marginLeft:5
  },

  text1:{
    textAlign:"center",
    fontSize:18,
    fontWeight:"bold"
  },
  con:{
    marginTop:30,
    alignItems:"center",
    margin:10
  },

input: {
  color: 'white',
  fontSize: 30,
  lineHeight: 40,
  fontWeight: 'bold',
  textAlign: 'left',
  marginRight:80
},

})
export default Home