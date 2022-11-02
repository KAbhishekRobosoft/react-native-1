import React, { useState } from 'react';
import Toast from 'react-native-simple-toast'
import {
  View,
  StyleSheet,
  Text,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {Formik, Field} from 'formik';
import DropDown from '../component/DropDown';
import EntryButton from '../component/CRUDButton';
import {useDispatch,useSelector} from 'react-redux';
import { updateData } from '../redux/AddDataSlice';
import CustomInput from '../component/CustomInput';
import PasswordToggleInput from '../component/PasswordToggleInput';
import { editPost } from '../redux/PostSlice';

function EditSite({navigation,route}) {
  const userAuth= useSelector(state=>state.authSite)
  const dispatch = useDispatch();

//Data is brought here by sending data as parameter in flatlist page.  
  let data = route.params.paramKey;

//Used to make textInput editable by making it 
//either true or false using useState
  const [edit,setEdit]= useState(false)

//Function to send edited object passed through forms
  function sendData(obj) {
    if (obj === initialValues) Toast.show('Please enter Values');
    else {
      obj['id']= data.id
      console.log(data.id+"hfggweqvw")
      obj['userId']= userAuth.userId
      dispatch(updateData(obj));
      dispatch(editPost(obj,data.id))
      navigation.goBack('List');
    }
  }

//Form initial Values
  const initialValues = {
    url: data.url,
    siteName: data.siteName,
    dropdown:data.dropdown,
    userName: data.userName,
    password: data.password,
    notes: data.notes,
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.bossCon}>
 
      <Formik
        initialValues={initialValues}
        onSubmit={values => {
          sendData(values)
        }}>
        {({handleSubmit, isValid}) => (
          <ScrollView>
          <View>
          <View style={styles.entryCon}>
            <View>
              <Text style={styles.text1}>URL</Text>
              <Field editable= {edit} defaultValue={data.url} component={CustomInput} name="url" />
            </View>

            <View>
              <Text style={styles.text1}>Site Name</Text>
              <Field
                defaultValue={data.siteName}
                editable= {edit}
                component={CustomInput}
                name="siteName"
              />
            </View>

            <View>
              <Text style={styles.text1}>Sector/Folder</Text>
              <Field
                defaultValue={data.dropdown}
                editable= {edit}
                component={DropDown}
                name="dropdown"
              />
            </View>

            <View>
              <Text style={styles.text1}>User Name</Text>
              <Field
                defaultValue={data.userName}
                editable={edit}
                component={CustomInput}
                name="userName"
              />
            </View>

            <View>
              <Text style={styles.text2}>Site Password</Text>
              <Field
                defaultValue={data.userName}
                editable= {edit}
                component={PasswordToggleInput}
                name="password"
                secureTextEntry
              />
            </View>

            <View style={styles.notes}>
              <Text style={styles.text1}>Notes</Text>
              <Field
                component={CustomInput}
                editable={edit}
                multiLine={true}
                numberOfLines={4}
                name="notes"
                defaultValue={data.notes}
              />
            </View>
            </View>

            <View style={styles.butView}>
              <View style={styles.but1}>
                <EntryButton
                  name="Edit"
                  onPress={() => setEdit(true)}
                  disabled={!isValid}
                />
              </View>
              <View style={styles.but2}>
                <EntryButton
                  onPress={handleSubmit}
                  name="Save"
                  disabled={!isValid}
                />
              </View>
            </View>
            </View>
          </ScrollView>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  text1: {
    fontSize: Platform.OS === 'ios' ? 20 : 15,
    color: Platform.OS === 'ios' ? '#c9ccd1' : 'black',
    marginTop: Platform.OS === 'android' ? 5 : 0,
    marginLeft: Platform.OS === 'android' ? 18 : 20,
  },

  text2: {
    fontSize: Platform.OS === 'ios' ? 20 : 15,
    color: Platform.OS === 'ios' ? '#c9ccd1' : 'black',
    marginTop: Platform.OS === 'android' ? 5 : 0,
    marginLeft:20
  },

  notes: {
    marginTop: 10,
    marginBottom: 5,
  },

  entryCon:{
    flex:9,
    marginTop:40
  },

  but2: {
    marginLeft: 2,
    width: '50%',
  },

  bossCon: {
    flex: 1,
  },

  but1: {
    width: '50%',
  },

  butView: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Platform.OS === 'android' ?10 : 110,
  },

});
export default EditSite;