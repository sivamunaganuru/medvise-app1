import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { retrieveSessionInfo } from '../Firebase/sessionService';
import axios from 'axios';
import RCTNetworking from 'react-native/Libraries/Network/RCTNetworking'

const LandingPage = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);

  const options = {
    method: "GET",
    url: `https://testapi.medvise.ai/api/auth/get_user_metadata/`,
  };

  useEffect(() => {
    let isMounted = true; // flag to track whether the component is mounted

    const checkSession = async () => {
        setIsLoading(true)
      try {
        const cookie = await retrieveSessionInfo();
        console.log(cookie);
        if (cookie && isMounted) {
          // Assuming that 'options' is defined and includes the necessary request configuration
          RCTNetworking.clearCookies(() => { })
          axios.defaults.headers.common['Cookie'] = `csrftoken=${cookie.csrfToken}; sessionid=${cookie.sessionId}`;
          const response = await axios.request(options);
          console.log(response.data);
          if (response.data) {
            navigation.replace('UserPage', { user: response.data });
          } else {
            navigation.replace('Login');
          }
        } else {
          navigation.replace('Login');
        }
      } catch (error) {
        console.error(error);
        if (isMounted) {
          navigation.replace('Login');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    const timer = setTimeout(() => {checkSession(), 4000});

    return () => {
      isMounted = false; // set flag as false when component unmounts
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      
        <Image
            source={require('../assets/logo.webp')} // Ensure the path to your logo is correct
            style={styles.logo}
        />
        {isLoading && (
        <ActivityIndicator size="large" color="#0000ff" />
        ) 
        }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // Or any other color you want for the background
  },
  logo: {
    width: 250, // Adjust the size as needed
    height: 250, // Adjust the size as needed
    resizeMode: 'contain',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
     shadowRadius: 20,
  },
});

export default LandingPage;


