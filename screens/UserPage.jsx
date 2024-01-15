import React from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, StyleSheet,Image } from 'react-native';

const appointments = [
  {
    id: 1,
    name: 'John Doe',
    time: '9:00 AM',
    imageUrl: 'path/to/image1.jpg',
  },
  {
    id: 2,
    name: 'Jane Smith',
    time: '10:00 AM',
    imageUrl: 'path/to/image2.jpg',
  },
  {
  id: 3,
  name: 'Jane drev',
  time: '11:00 AM',
  imageUrl: 'path/to/image3.jpg',
  },
  {
  id: 4,
  name: 'lorry drev',
  time: '11:00 AM',
  imageUrl: 'path/to/image3.jpg',
  },
  {
    id: 5,
    name: 'nalla mallesh',
    time: '11:00 AM',
    imageUrl: 'path/to/image3.jpg',
    },
  {
    id: 6,
    name: 'malyala',
    time: '11:00 AM',
    imageUrl: 'path/to/image3.jpg',
    },

  // ... more appointments
];

const UserPage = ({ navigation }) => {
  const renderAppointment = ({ item }) => {
    console.log('Rendering appointment, image URL:', item.imageUrl); // Debugging output
    const imageSource =  require('../assets/patient.png');


    return (
      <TouchableOpacity
        style={styles.appointmentItem}
        onPress={() => navigation.navigate('RecordPage', { patient: appointments[item.id] })}
        activeOpacity={0.7} 
      >
        <Image source={imageSource} style={styles.patientImage} />
        <View style={styles.appointmentInfo}>
          <Text style={styles.patientName}>{item.name}</Text>
          <Text style={styles.appointmentTime}>{item.time}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (

    <View style={styles.container}>
      <Header />
      <FlatList
        data={appointments}
        renderItem={renderAppointment}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
   
  );
};

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Patient Appointments</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  // safeArea: {
  //   flex: 1,
  //   backgroundColor: '#4CAF50', // Use the same color as your header for consistency
  // },
  header: {
    backgroundColor: '#4CAF50', // Replace with your primary color
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
  },
  appointmentItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3, // for Android shadow
    marginVertical: 5,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  patientImage: {
    width: 100,
    height: 100,
    borderRadius: 25,
    marginRight: 10,
  },
  appointmentInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  appointmentTime: {
    fontSize: 16,
  },
});

export default UserPage;
