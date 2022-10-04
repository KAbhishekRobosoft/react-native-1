import React, {useState} from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Buttons from '../component/Buttons';
import {getImage} from '../services/Auth';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

function RandomGame() {
  const [gameState, setGamestate] = useState([]);
  const [isOpen, setIsopen] = useState(false);

  function open() {
    setIsopen(true);
  }

  async function getGameData() {
    let data = await getImage();
    let str = `${data.results[0].name.title} ${data.results[0].name.first} ${data.results[0].name.last}`;
    setGamestate(curData => [
      ...curData,
      {
        data: {
          name: str,
          images: data.results[0].picture.medium.toString(),
          email: data.results[0].email,
          dob: data.results[0].dob.date,
          country: data.results[0].location.country,
          phone: data.results[0].phone,
          id: Math.random().toString(),
        },
        id: Math.random().toString(),
      },
    ]);
  }

  return (
    <View style={styles.mCon}>
      <ImageBackground
        style={styles.back}
        source={require('../images/pic1.jpg')}>
        <SafeAreaView>
          <Text style={styles.txt6}>
            Let's play a game {'\n'}just me and you
          </Text>
        </SafeAreaView>
        <View style={styles.conBut}>
          <Buttons onPress={open} name="Go" />
        </View>
      </ImageBackground>
      <Modal animationType="slide" visible={isOpen}>
        <View style={styles.con}>
          <SafeAreaView>
            <View style={styles.butView}>
              <Pressable style={styles.but} onPress={getGameData}>
                <Text style={styles.text9}>Find</Text>
              </Pressable>
              <Pressable style={styles.bu1} onPress={() => setIsopen(false)}>
                <Text style={styles.text9}>Cancel</Text>
              </Pressable>
            </View>
          </SafeAreaView>
          <FlatList
            data={gameState}
            renderItem={itemData => {
              return (
                <View style={styles.con1}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.text1}>Name:</Text>
                    <Text style={styles.text2}>{itemData.item.data.name}</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.text1}>Email:</Text>
                    <Text style={styles.text2}>{itemData.item.data.email}</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.text1}>DOB:</Text>
                    <Text style={styles.text2}>{itemData.item.data.dob}</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.text1}>Country:</Text>
                    <Text style={styles.text2}>
                      {itemData.item.data.country}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.text1}>Phone Number:</Text>
                    <Text style={styles.text2}>{itemData.item.data.phone}</Text>
                  </View>
                </View>
              );
            }}
            keyExtractor={item => {
              return item.id;
            }}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  con: {
    flex: 4,
    backgroundColor: 'purple',
  },


  txt6: {
    fontSize: 25,
    marginLeft: 30,
    lineHeight: 40,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: 'green',
  },

  conBut: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 200,
  },

  back: {
    width: screenWidth,
    height: screenHeight,
  },

  conItem: {
    marginRight: 20,
  },

  but: {
    backgroundColor: 'orange',
    borderRadius: 10,
    padding: 10,
    width: 150,
    marginLeft: 30,
    marginTop:10
  },

  bu1: {
    backgroundColor: 'orange',
    borderRadius: 10,
    padding: 10,
    width: 150,
    marginLeft: 10,
    marginTop:10
  },

  text9: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },

  butView: {
    flexDirection: 'row',
  },

  mCon: {
    flex: 1,
  },

  text1: {
    textAlign: 'center',
    margin: 5,
    fontWeight: 'bold',
    marginLeft: 40,
  },

  text2: {
    textAlign: 'center',
    margin: 5,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },

  con1: {
    backgroundColor: 'white',
    margin: 15,
    padding: 5,
    shadowColor: 'black',
    shadowOffset: {width: -6, height: 8},
    shadowOpacity: 0.9,
    shadowRadius: 3,
    marginTop: 20,
  },
});
export default RandomGame;
