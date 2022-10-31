import React from 'react';
import Toast from 'react-native-simple-toast';
import {
  View,
  StyleSheet,
  Text,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {Formik, Field} from 'formik';
import CustomInput from '../component/CustomInput';
import DropDown from '../component/DropDown'
import EntryButton from '../component/CRUDButton'
import {addData} from '../redux/AddDataSlice';
import {useDispatch} from 'react-redux';
import {images} from '../utils/HardCodedData'
import PasswordToggleInput from '../component/PasswordToggleInput';

function AddSite({navigation}) {

//Used to call the action mentioned in the reducer
  const dispatch = useDispatch();

//Sending the object received through form to add it to the state   
  function sendData(obj) {
    if (obj === initialValues) Toast.show('Please enter Values');
    else {
      obj['id']= Math.floor(Math.random() * 100)
      dispatch(addData(obj));
      navigation.navigate('List');
      Toast.show('Saved Successfully');
    }
  }

//Form initial Value
  const initialValues = {
    dropdown:'',
    notes: '',
    password: '',
    siteName: '',
    url: '',
    userName: '',
  };

//Formik form structure
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.bossCon}>
      <Formik
        initialValues={initialValues}
        onSubmit={values => {
          if(images.siteName.hasOwnProperty(values.siteName.toLowerCase()))
            sendData(values);

          else{
            Toast.show('Enter proper Site Name')
          }
         
        }}>
        {({handleSubmit, isValid, resetForm}) => (
          <ScrollView>
            <View style={styles.entryCon}>
              <View style={styles.con1}>
                <Text style={styles.text1}>URL</Text>
                <Field component={CustomInput} name="url" />
              </View>
              <View>
                <Text style={styles.text1}>Site Name</Text>
                <Field component={CustomInput} name="siteName" />
              </View>

              <View>
                <Text style={styles.text1}>Sector/Folder</Text>
                <Field component={DropDown} name="dropdown" />
              </View>

              <View>
                <Text style={styles.text1}>User Name</Text>
                <Field component={CustomInput} name="userName" />
              </View>

              <View>
                <Text style={styles.text2}>Site Password</Text>
                <Field
                  component={PasswordToggleInput}
                  name="password"
                  secureTextEntry
                />
              </View>

              <View style={styles.notes}>
                <Text style={styles.text1}>Notes</Text>
                <Field
                  component={CustomInput}
                  multiLine={true}
                  numberOfLines={4}
                  name="notes"
                />
              </View>
            </View>

            <View style={styles.butView}>
              <View style={styles.but1}>
                <EntryButton
                  name="Reset"
                  onPress={()=>resetForm({initialValues})}
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
          </ScrollView>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
}

//Dedicated stylesheet
const styles = StyleSheet.create({
  text1: {
    fontSize: Platform.OS === 'ios' ? 20 : 15,
    color: Platform.OS === 'ios' ? '#c9ccd1' : 'black',
    marginTop: Platform.OS === 'android' ? 5 : 5,
    marginLeft: Platform.OS === 'android' ? 18 : 20,
  },

  text2: {
    fontSize: Platform.OS === 'ios' ? 20 : 15,
    color: Platform.OS === 'ios' ? '#c9ccd1' : 'black',
    marginTop: Platform.OS === 'android' ? 5 : 5,
    marginLeft:20
  },

  notes: {
    marginTop: 10,
    marginBottom: 5,
  },

  but2: {
    marginLeft: 2,
    width: '50%',
  },

  bossCon: {
    flex: 1,
  },

  but1: {
    width:'50%',
  },

  butView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Platform.OS === 'android' ? 9 : 74,
  },

  con1: {
    marginTop: Platform.OS === 'android' ? 0 : 20,
  },

  entryCon: {
    flex: 12,
    marginTop: 20,
  },
});
export default AddSite;