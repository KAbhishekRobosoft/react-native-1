import {Formik} from 'formik';
import React, {useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import {ToolkitData} from '../assets/data';
import Modal from 'react-native-modal';

export const ToolKit = ({navigation}) => {
  const [text, setText] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const handleToggle = () => {
    setModalVisible(!isModalVisible);
  };

  const search = async value => {
    setText(value);
  };

  return (
    <SafeAreaView style={styles.safeareaView}>
      <View style={[styles.header, styles.shadow]}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon
            name="md-arrow-back"
            color={'white'}
            size={25}
            style={styles.icon}
          />
        </Pressable>
        <Text style={styles.headerText}>Tool Kit</Text>
      </View>
      <View style={styles.container}>
        {text ? (
          <View style={styles.form1}></View>
        ) : (
          <View style={styles.form}></View>
        )}
        <View>
          <>
            {text ? (
              <View style={styles.placeholder}>
                <Text style={styles.text}>What is the trouble</Text>
              </View>
            ) : (
              <></>
            )}
          </>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            name="search"
            placeholder="What is the trouble?"
            placeholderTextColor={'rgba(141,138,138,0.87)'}
            value={text}
            onChangeText={value => search(value)}
            style={styles.textInput}
          />
          <Image
            source={require('../assets/images/search.png')}
            style={styles.search}
          />
        </View>
      </View>
      <View style={{height: '80%'}}>
        <FlatList
          data={ToolkitData}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <Pressable onPress={handleToggle}>
              <View style={styles.flatView}>
                <Image source={item.icon} style={styles.image} />
                <Text style={styles.title}>{item.title}</Text>
              </View>
            </Pressable>
          )}
        />
      </View>
      <Modal isVisible={isModalVisible} style={{alignItems: 'center'}}>
        <View
          style={{
            backgroundColor: 'white',
            height: 416,
            width: 322,
            borderRadius: 17,
          }}>
          <Pressable onPress={handleToggle}>
            <Icon2
              name="times"
              size={20}
              color={'#A4A4A4'}
              style={styles.times}
            />
          </Pressable>
          <Text style={styles.modalHeader}>Onsite Minor Repairs</Text>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <Text style={styles.modalDescription}>
              If your Royal Enfield motorcycle breaks down due to a minor
              mechanical or electrical fault and an immediate repair on the spot
              is deemed possible, Royal Enfield shall assist the user by
              arranging for a technician to reach the breakdown location. Royal
              Enfield will bear the labour and conveyance costs. However, the
              cost of material and spare parts, if required, to repair the
              motorcycle on the spot and any other incidental conveyance to
              obtain such material and spare parts, will have to be borne by the
              user. This service will be provided when the motorcycle is not in
              a position to be ridden to the nearest Service Centre (Unlimited
              KM).
            </Text>
          </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeareaView: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    height: 64,
    backgroundColor: '#ED7E2B',
    alignItems: 'center',
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    shadowOpacity: 0.9,
    elevation: 5,
    opacity: 0.9,
  },
  shadow: {
    backgroundColor: '#ED7E2B',
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3,
    shadowOpacity: 0.9,
    elevation: 5,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 25,
    fontFamily: 'Roboto-Medium',
  },
  icon: {
    marginHorizontal: 20,
  },
  textInput: {
    color: '#4F504F',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    height: Platform.OS === 'ios' ? 21 : 30,
    width: '78%',
    paddingBottom: 3,
  },
  form1: {
    marginTop: Platform.OS === 'ios' ? 14 : 15,
  },

  form: {
    marginTop: Platform.OS === 'ios' ? 40 : 30,
  },
  text: {
    height: 17,
    color: Platform.OS === 'ios' ? '#9F9F9F' : '#9F9F9F',
    fontSize: 14,
    lineHeight: 17,
    fontFamily: 'Roboto-Regular',
  },
  search: {
    marginHorizontal: '14%',
    tintColor: 'rgba(0,0,0,0.54)',
    marginTop: Platform.OS === 'ios' ? -2 : 8,
  },
  container: {
    marginHorizontal: 40,
    flexDirection: 'column',
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#B4B3B3',
  },
  placeholder: {
    marginTop: 7,
  },
  flatView: {
    height: 54,
    marginHorizontal: 40,
    backgroundColor: '#FFFFFF',
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    shadowOpacity: 0.9,
    elevation: 5,
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
    paddingStart: 10,
  },
  image: {
    resizeMode: 'contain',
    width: 24,
    height: 28,
  },
  title: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    lineHeight: 19,
    color: '#4F504F',
    marginLeft: 15,
  },
  textSearchSomethingView: {
    alignItems: 'center',
    marginTop: '50%',
  },
  textSearchSomethingText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 30,
    color: 'rgba(0,0,0,0.54)',
  },
  times: {
    resizeMode: 'contain',
    height: 20,
    width: 20,
    marginTop: 15,
    marginLeft: 290,
  },
  modalHeader: {
    fontFamily: 'Roboto-Regular',
    fontSize: 24,
    lineHeight: 35,
    color: '#4F504F',
    alignSelf: 'center',
    marginTop: 10,
  },
  modalDescription: {
    fontFamily: 'Roboto-Regular',
    color: '#727070',
    lineHeight: 20,
    fontSize: 14,
    alignSelf: 'center',
    marginHorizontal: 40,
    marginTop: 13,
    paddingBottom: 20,
  },
});
