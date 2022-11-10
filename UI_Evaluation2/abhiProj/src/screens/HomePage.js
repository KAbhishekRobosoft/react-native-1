import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  useWindowDimensions,
  Platform,
  Pressable,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import HomeFooter from '../utils/HomeFooter';
import HomeMainContent from '../utils/HomeMainContent';

function HomePage({navigation}) {
  const data = [
    {id: 1, place: 'udupi'},
    {id: 2, place: 'mangaluru'},
  ];
  const {width, height} = useWindowDimensions();
  const marginTop =
    height > width ? (Platform.OS === 'android' ? 150 : 190) : 20;

  return (
    <LinearGradient
      style={styles.main_con}
      start={{x: 0, y: 0.5}}
      end={{x: 1, y: 0.5}}
      colors={['#634bb2', '#9468bd']}>
      <SafeAreaView style={styles.work_con}>
        <View style={styles.header}>
          <View style={styles.main_logo}>
            <Pressable onPress={() => navigation.openDrawer()}>
              <Image
                style={styles.menu_img}
                source={require('../images/icon_menu_white.png')}
              />
            </Pressable>
            <Image
              style={styles.logo_img}
              source={require('../images/logo.png')}
            />
          </View>
          <View>
            <Pressable
              onPress={() => {
                navigation.navigate('AutoInput', {
                  data: data,
                });
              }}>
              <Image
                style={styles.search_img}
                source={require('../images/icon_search_white.png')}
              />
            </Pressable>
          </View>
        </View>
        <ScrollView>
          <HomeMainContent />
          {height > width && (
            <View style={[styles.footerContent, {marginTop: marginTop}]}>
              <ScrollView horizontal={true}>
                <HomeFooter />
              </ScrollView>
            </View>
          )}
          {width > height && (
            <View style={[styles.footerContent, {marginTop: marginTop}]}>
              <HomeFooter />
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  main_con: {
    flex: 1,
  },

  footerContent: {
    marginTop: 80,
    width: '100%',
    height: 100,
    borderWidth: 1,
    borderColor: '#a4a3e3',
    backgroundColor: '#8571c4',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  menu_img: {
    marginLeft: 16,
    width: 18,
    height: 12,
  },

  main_logo: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  logo_img: {
    width: 113,
    height: 24,
  },

  search_img: {
    marginRight: 16,
    width: 17.49,
    height: 17.49,
  },

  work_con: {
    flex: 1,
    justifyContent: 'space-between',
  },

  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    justifyContent: 'space-between',
  },
});

export default HomePage;
