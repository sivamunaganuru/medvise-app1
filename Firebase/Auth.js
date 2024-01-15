// import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import firebase from './firebaseConfig'; // Import your firebaseConfig



// GoogleSignin.configure({
//   webClientId: '19968252747-16r2bplu4qulnoc71lgnpp7tuidq4vs0.apps.googleusercontent.com', // Find this in your Firebase console
//   offlineAccess: true // If you want to access Google API on behalf of the user FROM YOUR SERVER
// });

// export const signInWithGoogle = async () => {
//   try {
//     await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
//   // Get the users ID token
//     const { idToken } = await GoogleSignin.signIn();

//     const googleCredential = firebase.auth.GoogleAuthProvider.credential(idToken);
//     await firebase.auth().signInWithCredential(googleCredential);
    
//     console.log('User Info:', userInfo); // Console log user info

//     // Navigate to UserPage or handle the user info as needed
//     // navigation.navigate('UserPage');
//   } catch (error) {
//     console.error(error);
//   }
// };