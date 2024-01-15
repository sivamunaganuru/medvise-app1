import * as React from 'react';
import { SafeAreaView,View, Text,StatusBar,StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import ForgotPassword from './screens/ForgotPassword';
import UserPage from './screens/UserPage';
import RecordPage from './screens/RecordPage';
import Experiment from './screens/Experiment';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>
        <Stack.Screen name="Experiment" component={Experiment} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="UserPage" component={UserPage} />
        <Stack.Screen name="RecordPage" component={RecordPage} options={{
          gestureEnabled: true, // Ensure this is true or omitted
        }}/>

      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white' // or any color that matches your app's theme
  }
});

export default App;

