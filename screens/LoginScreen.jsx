import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { globalStyles } from '../styles/globalStyles';
import signInWithGoogle from '../Firebase/Auth'

// Validation Schema for the form
const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required('Email is required'),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});

const LoginScreen = ({ navigation }) => {
  const handleLogin = async (values, actions) => {
    try {
      console.log(values);
      // const response = await axios.post('YOUR_API_ENDPOINT/login', values);
      // Handle success response
      // console.log(response.data);
      // Navigate to the next screen or perform further actions
      navigation.navigate('UserPage');
    } catch (error) {
      // Handle error response
      actions.setFieldError('general', error.response.data.message || 'An error occurred during login.');
    }
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
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
              name="email"
              placeholder="Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {(errors.email && touched.email) &&
              <Text style={styles.errorText}>{errors.email}</Text>
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