import React from 'react';
import {View, StyleSheet, Text, Platform} from 'react-native';
import {Formik, Field} from 'formik';
import Details from '../utils/Details';
import DropDown from '../utils/DropDown';
import PasswordInput from '../utils/PasswordInput';
import EntryButton from '../utils/EntryButton';
import { addData } from '../redux/Reducer';
import { useDispatch} from 'react-redux';

function AddSite({navigation}) {
  const dispatch= useDispatch()

  function sendData(obj){
      dispatch(addData(obj))
      navigation.navigate('List')
  }

  const initialValues = {id:Math.floor(Math.random() * 1000),url: '',siteName: '', userName: '', password: '',notes:'',};
  return (
    <View>
      <Formik
        initialValues={initialValues}
        onSubmit={values => {
              sendData(values)
        }}>
        {({handleSubmit, isValid, resetForm}) => (
          <View style={styles.main_con}>
            <View style={styles.con1}>
              <Text style={styles.text1}>URL</Text>
              <Field component={Details} name="url" />
            </View>
            <View>
              <Text style={styles.text1}>Site Name</Text>
              <Field component={Details} name="siteName" />
            </View>

            <View>
              <Text style={styles.text1}>Sector/Folder</Text>
              <Field component={DropDown} name="dropdown" />
            </View>

            <View>
              <Text style={styles.text1}>User Name</Text>
              <Field component={Details} name="userName" />
            </View>

            <View>
              <Text style={styles.text1}>Site Password</Text>
              <Field
                component={PasswordInput}
                name="password"
                secureTextEntry
              />
            </View>

            <View style={styles.notes}>
              <Text style={styles.text1}>Notes</Text>
              <Field component={Details} name="notes" />
            </View>

            <View style={styles.butView}>
              <View style={styles.but1}>
                <EntryButton
                  name="Reset"
                  onPress={() => resetForm(initialValues)}
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
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  text1: {
    fontSize: 20,
    color: Platform.OS === 'ios' ? '#c9ccd1' : 'black',
    marginLeft: 22,
  },

  notes: {
    marginTop: 10,
  },

  main_con: {
    justifyContent: 'center',
  },

  but2: {
    marginLeft: 2,
    width: 195,
  },

  but1: {
    width: 195,
  },

  butView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop:Platform.OS === "android" ? 0 : 39
  },

  con1: {
    marginTop: Platform.OS === "android" ? 10 : 20
  },
});
export default AddSite;
