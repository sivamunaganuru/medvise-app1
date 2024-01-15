import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { Formik } from 'formik';
import * as yup from 'yup';
import { globalStyles } from '../styles/globalStyles';
// If you're using Expo, you can import the Ionicons like this:
import { Ionicons } from '@expo/vector-icons';

// Validation schema
const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required('Email is required'),
});

const ForgotPassword = ({ navigation }) => {
  const handleBack = () => {
    // Go back to the previous screen
    navigation.goBack();
  };

  const sendResetPasswordLink = async () => {
    try {
      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      // await axios.post('YOUR_API_ENDPOINT/forgot-password', { email });
      Alert.alert("Success", "A link to reset your password has been sent to your email.");
      // Redirect back to the login screen
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message || 'An error occurred while attempting to reset password.');
    }
  };

  return (
    <Formik
      initialValues={{ email: '' }}
      onSubmit={(values) => sendResetPasswordLink(values.email)}
      validationSchema={validationSchema}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={globalStyles.container}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            {/* You can use any icon library you prefer or just text */}
            <Ionicons name="ios-arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <View style={[globalStyles.card, styles.cardSize]}>
            <Text style={globalStyles.header}>Forgot Password</Text>
            <Text style={globalStyles.subheader}>Enter your email address below and we'll send you a link to reset your password.</Text>
            <TextInput
              style={[globalStyles.input, styles.credentialsInput]}
              placeholder="Enter your email"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {touched.email && errors.email &&
              <Text style={styles.errorText}>{errors.email}</Text>
            }
            <TouchableOpacity style={[globalStyles.button, styles.loginButton]} onPress={handleSubmit}>
              <Text style={globalStyles.buttonText}>Send Reset Link</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
};

// Add styles for ForgotPassword if needed

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

export default ForgotPassword;
