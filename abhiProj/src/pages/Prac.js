import React, {Component} from 'react';
import {StyleSheet, View, Text, ActivityIndicator, SafeAreaView} from 'react-native';

class Prac extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null,
    };
  }

  componentDidMount() {
    return fetch('https://facebook.github.io/react-native/movies.json')
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.movies,
        });
      })
      .catch(er => {
        console.log(er);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    } else {
      let movies= this.state.dataSource.map((val,key)=>{
        return(
         
            <View key= {key} style={styles.item}>
            <SafeAreaView>
                <Text>{val.title}</Text>
                </SafeAreaView>
            </View>
        )
      })
      return <View style={styles.container}>
            {movies}
      </View>;
    }
  }
}

const styles = StyleSheet.create({
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
});

export default Prac;
