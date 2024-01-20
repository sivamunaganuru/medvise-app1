import React from 'react';
import { useState, useEffect } from "react";
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, StyleSheet,Image,Modal, TextInput, Button } from 'react-native';
import useFetchAppointments from '../hook/useFetchAppointments';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';


const UserPage = ({ navigation,route }) => {
  const { user } = route.params;
  const { appointments,isLoading,error,refetch } = useFetchAppointments({
    "doctor_id": user.ids.doctor_id,
  });
  const [modalVisible, setModalVisible] = useState(false); // State to control the visibility of the modal
  const [newAppointment, setNewAppointment] = useState({
    name: '',
    dateOfBirth: '',
    time: '',
    doctorName: '',
  });
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);


  const renderAppointment = ({ item }) => {
    const imageSource = require('../assets/patient.png'); // Placeholder image
  
    return (
      <TouchableOpacity
        style={styles.appointmentItem}
        onPress={() => navigation.navigate('RecordPage', { patient: item })}
        activeOpacity={0.7}
      >
        <Image source={imageSource} style={styles.patientImage} />
        <View style={styles.appointmentInfo}>
          <Text style={styles.patientName}>{item.patientName}</Text>
          <Text>Age: {item.patientAge}</Text>
          <Text>Doctor: {item.doctorName}</Text>
        </View>
      </TouchableOpacity>
    );
  };


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setNewAppointment({ ...newAppointment, dateOfBirth: currentDate.toISOString().split('T')[0] });
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const createAppointment = () => {
    // Your implementation to create an appointment
    console.log(newAppointment);
    setModalVisible(false);
  };

    return (
      <View style={styles.container}>
        <View style={styles.header}>
        <Text style={styles.headerText}>Patient Appointments</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.iconContainer}>
          <MaterialIcons name="account-circle" size={40} color="black" />
        </TouchableOpacity>
      </View>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            data={appointments}
            renderItem={renderAppointment}
            keyExtractor={(item) => item.id.toString()}
          />
        )}
  
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text>Close</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.modalTextInput}
              placeholder="Patient Name"
              onChangeText={(text) => setNewAppointment({ ...newAppointment, name: text })}
              value={newAppointment.name}
            />
            <TouchableOpacity
              style={styles.modalTextInput}
              onPress={() => showMode('date')}
            >
              <Text>{newAppointment.dateOfBirth || 'Select Date of Birth'}</Text>
            </TouchableOpacity>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
            {/* ... Time Picker and Doctor Name Input */}
            <Button title="Submit" onPress={createAppointment} />
          </View>
        </View>
      </Modal>
      </View>
    );
  };
   


const styles = StyleSheet.create({
  // safeArea: {
  //   flex: 1,
  //   backgroundColor: '#4CAF50', // Use the same color as your header for consistency
  // },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#4CAF50', // Change to your header's background color
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    width: 60,
    height: 60,
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

  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 10,
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 25, // Makes it circular
    borderWidth: 2,
    borderColor: '#fff',
    marginRight: 10, // Spacing between icon and text
  },
  createButton: {
    backgroundColor: '#007bff', // Example button color
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-end', // Aligns button to the right
    marginRight: 10, // Right margin from the screen edge
    marginTop: 10, // Top margin from the header or previous element
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTextInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: '100%',
    marginBottom: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
    margin: 10,
    backgroundColor: '#ddd', // Example style
    borderRadius: 5,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    // ... rest of your modalView styles
  },
  
});

export default UserPage;
