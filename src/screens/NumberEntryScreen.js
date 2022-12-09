import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  useWindowDimensions,
  Platform,
  Pressable,
  TextInput,
  Text,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ButtonLarge from '../components/Buttons';
import {useDispatch, useSelector} from 'react-redux';
import {setUserData} from '../redux/AuthSlice';
import { deSetForgotPassword } from '../redux/AuthSlice';

function NumberEntryScreen({navigation}) {
  const [text, setText] = useState('');
  const {width, height} = useWindowDimensions();
  const horizontalLength =
    width > height ? (Platform.OS === 'ios' ? 110 : 110) : 150;
  const VerticalLength =
    width > height ? (Platform.OS === 'ios' ? 110 : 110) : 150;
  const dispatch = useDispatch();
  const authData = useSelector(state => state.auth);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Pressable
          onPress={() => {
            navigation.goBack();
            dispatch(deSetForgotPassword())
          }}>
          <Image
            style={styles.back_pic}
            source={require('../assets/images/back_arrow.png')}
          />
        </Pressable>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{flex: 1}}>
            <Image
              style={styles.blueCircle}
              source={require('../assets/images/blueCircle.png')}
            />
            <Image
              style={[
                styles.mobilePic,
                {height: horizontalLength, width: VerticalLength},
              ]}
              source={require('../assets/images/contact-book.png')}
            />
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 0, y: 0.45}}
              colors={['#fbe5d4', 'rgba(255,255,255,0)']}
              style={styles.gradient}>
              {text ? (
                <View style={styles.placeholder}>
                  <Text style={styles.text}>Enter your Mobile number</Text>
                </View>
              ) : (
                <></>
              )}
              <View style={styles.textInputView}>
                <TextInput
                  name="sample"
                  placeholder="Enter your Mobile number"
                  keyboardType="numeric"
                  value={text}
                  onChangeText={value => setText(value)}
                  style={styles.textInput}
                />
              </View>
            </LinearGradient>
            <View style={{alignSelf: 'center'}}>
              <ButtonLarge
                onPress={() => {
                  dispatch(setUserData({mobile: text}));
                  navigation.navigate('Otp');
                }}
                title="SUBMIT"
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  back_pic: {
    marginTop: 16,
    marginLeft: 19,
  },

  gradient: {
    marginTop: 30,
    height: 180,
    width: 321,
    borderRadius: 13,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },

  blueCircle: {
    width: 246,
    height: 86,
    marginTop: 11,
    alignSelf: 'center',
  },

  textView: {
    backgroundColor: '',
  },

  mobilePic: {
    alignSelf: 'center',
  },
  textInput: {
    width: '100%',
    marginVertical: Platform.OS === 'android' ? -17 : -3,
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    color: '#4F504F',
    marginHorizontal: 60
  },
  textInputView: {
    width: '90%',
    height: 50,
    flexDirection: 'row',
    // marginTop: 25,
    borderColor: '#B4B3B3',
    borderBottomWidth: 1,
  },
  placeholder: {
    marginLeft: 10,
    paddingBottom: 5,
  },
  text: {
    height: 17,
    color: '#9F9F9F',
    fontSize: 14,
    letterSpacing: 0.29,
    lineHeight: 17,
  },
});

export default NumberEntryScreen;
