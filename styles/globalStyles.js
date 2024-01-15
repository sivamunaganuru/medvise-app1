import { StyleSheet } from 'react-native';

const colors = {
  primary: '#4CAF50', // Green shade used in buttons and icons
  accent: '#FFFFFF', // White color for text on primary buttons
  background: '#F5F5F5', // Light gray for page background
  text: '#212121', // Dark gray for primary text
  secondaryText: '#757575', // Lighter gray for secondary text
  divider: '#BDBDBD', // Divider color
  inputBackground: '#FFFFFF', // Background color for input fields
  inputBorder: '#E0E0E0', // Border color for input fields
};

export const fonts = {
    primary: 'System', // Replace 'System' with your font if necessary
    // ... other fonts
  };

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: colors.inputBackground,
    borderRadius: 6,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  header: {
    fontSize: 26,
    color: colors.text,
    fontFamily: fonts.primary,
    marginBottom: 20,
  },
  subheader: {
    fontSize: 20,
    color: colors.text,
    fontFamily: fonts.primary,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: colors.secondaryText,
    fontFamily: fonts.primary,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
//   button: {
    //     // Define a common button style
    //     backgroundColor: '#4CAF50', // Use the primary color
    //     padding: 15,
    //     borderRadius: 4,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     height: 50, // Set a fixed height
    //     marginTop: 10, // Add some margin at the top
    //   },
  buttonText: {
    color: colors.accent,
    fontSize: 16,
    fontFamily: fonts.primary,
  },
  input: {
    backgroundColor: colors.inputBackground,
    borderColor: colors.inputBorder,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
    fontFamily: fonts.primary,
    color: colors.text,
    marginBottom: 10,
  },
  linkText: {
    color: colors.primary,
    fontFamily: fonts.primary,
    fontSize: 16,
    padding: 10,
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider,
    marginVertical: 10,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputWrapper: {
    flex: 1, // Take up all available space
  },
  showPasswordButton: {
    marginLeft: 10, // Add some spacing between the input and button
  },
  showPasswordText: {
    color: '#4CAF50', // Use the primary color
    fontSize: 16,
  },
//   
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default {
  colors,
  fonts,
};
