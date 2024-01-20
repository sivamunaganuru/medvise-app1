import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { globalStyles } from '../styles/globalStyles';
import signInWithGoogle from '../Firebase/Auth'
import { storeSessionInfo, retrieveSessionInfo, clearSessionInfo } from '../Firebase/sessionService';
// import CookieManager from 'react-native-cookies'
import RCTNetworking from 'react-native/Libraries/Network/RCTNetworking';

// Validation Schema for the form
const loginValidationSchema = yup.object().shape({
  username: yup
    .string()
    .required('username is required'),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});

const LoginScreen = ({ navigation }) => {


  const handleLogin = async (values, actions) => {
    try {
      console.log(values);
      // CookieManager.clearAll()
      RCTNetworking.clearCookies(() => { })
      
      const response = await axios.post('https://testapi.medvise.ai/api/auth/login/', values);
      // Handle success response
      storeSessionInfo(response.headers['set-cookie'][0]);
      // Navigate to the next screen or perform further actions
      navigation.navigate('UserPage',{user : response.data});
    } catch (error) {
      // Handle error response
      console.log(error.response.data);
      actions.setFieldError('general', error.response.data.detail || 'An error occurred during login.');
    }
  };

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={handleLogin}
      validationSchema={loginValidationSchema}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
         <View style={globalStyles.container}>
         <View style={[globalStyles.card, styles.cardSize]}>
           <Image source={require('../assets/logo.webp')} style={styles.logo} />
           <Text style={globalStyles.header}>Login</Text>
            <TextInput
            style={[globalStyles.input,styles.credentialsInput]}
              name="username"
              placeholder="Username"
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
              autoCapitalize="none"
            />
            {(errors.username && touched.username) &&
              <Text style={styles.errorText}>{errors.username}</Text>
            }
            <TextInput
              name="password"
              style={[globalStyles.input,styles.credentialsInput]}
              placeholder="Password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry={true}
              autoCapitalize="none"
            />
            {(errors.password && touched.password) &&
              <Text style={styles.errorText}>{errors.password}</Text>
            }
            {errors.general &&
              <Text style={styles.errorText}>{errors.general}</Text>
            }
            <TouchableOpacity style={[globalStyles.button,styles.loginButton]} onPress={handleSubmit}>
              <Text style={globalStyles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={globalStyles.linkText}>Forgot Password?</Text>
            </TouchableOpacity>
            <View style={globalStyles.divider} />
            <TouchableOpacity style={[globalStyles.button, styles.loginButton]} > 
            {/* onPress={signInWithGoogle} */}
              <Text style={[globalStyles.buttonText]}>Sign in with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity>
            <Text style={globalStyles.linkText}>Don't have an account? Join Us!</Text>
            </TouchableOpacity>
            </View>
            </View>
            )}
    </Formik>
    );
};


const styles = StyleSheet.create({
        cardSize: {
            width: '90%',
            padding: 25,
            alignItems: 'center',
        },
        logo: {
            width: 250,
            height: 60,
            marginBottom: 20,
        },
        errorText: {
            fontSize: 14,
            color: 'red',
            padding :2,
            marginBottom: 10,
        },
        loginButton: {
            width: '100%',
            height: 50, // Set a fixed height 
            maxWidth : 500,
        },
        credentialsInput: {
            width: '100%',
            height: 50,
            maxWidth : 500,
        },

});



export default LoginScreen;