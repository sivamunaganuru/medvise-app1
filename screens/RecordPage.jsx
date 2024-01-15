import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView ,Button} from 'react-native';
import { Audio } from 'expo-av';
import { MaterialIcons } from '@expo/vector-icons'; // Ensure you have expo/vector-icons installed


const RecordPage = ({ navigation, route }) => {
  // Extract patient name from route params if passed
  const patientName = route.params?.patient.name || 'Patient';
  const [recording, setRecording] = useState();
  const [recordings, setRecordings] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState(0);
  
  async function startRecording() {
    try {
      const perm = await Audio.requestPermissionsAsync();
      if (perm.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true
        });
        const { recording } = await Audio.Recording.createAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
        setRecording(recording);
      }
    } catch (err) {}
  }

  async function stopRecording() {
    setRecording(undefined);

    await recording.stopAndUnloadAsync();
    let allRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    allRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: recording.getURI()
    });

    setRecordings(allRecordings);
  }

  function getDurationFormatted(milliseconds) {
    const minutes = milliseconds / 1000 / 60;
    const seconds = Math.round((minutes - Math.floor(minutes)) * 60);
    return seconds < 10 ? `${Math.floor(minutes)}:0${seconds}` : `${Math.floor(minutes)}:${seconds}`
  }

  function getRecordingLines() {
    return recordings.map((recordingLine, index) => {
      return (
        <View key={index} style={styles.row}>
          <Text style={styles.fill}>
            Recording #{index + 1} | {recordingLine.duration}
          </Text>
          <Button onPress={() => recordingLine.sound.replayAsync()} title="Play"></Button>
        </View>
      );
    });
  }
  
    function clearRecordings() {
      setRecordings([])
    }

  const handleClose = () => {
    navigation.goBack();
  };

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1); // Increment timer every second
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isRecording]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.patientName}>{patientName}</Text>

        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
        <MaterialIcons name="close" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.timerText}>{getDurationFormatted(timer)}</Text>

        {/* Waveform placeholder */}
        <View style={styles.waveformPlaceholder}>
          {/* Placeholder for waveform. You can implement or integrate an actual waveform representation */}
          <Text style={styles.waveformText}>Waveform goes here</Text>
        </View>

        {/* Recording controls */}
        <View style={styles.controls}>
          <TouchableOpacity onPress={isRecording ? stopRecording : startRecording} style={styles.recordButton}>
            <MaterialIcons name={isRecording ? "stop" : "mic"} size={30} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.recordingText}>{isRecording ? 'Recording...' : 'Tap to Start'}</Text>
        </View>

        <View style={styles.recordingsList}>
          {getRecordingLines()}
        </View>

        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => {
            // Placeholder for sending the file to the server
            console.log('Send button pressed. Implement sending the audio file.');
          }}
        >
          <Text style={styles.sendButtonText}>Send to Server</Text>
        </TouchableOpacity>
    
      </View>
    </SafeAreaView>
  );
};


// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#4CAF50', // Primary color
//   },
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   closeButton: {
//     alignSelf: 'flex-end',
//     padding: 16,
//   },
//   timerText: {
//     color: '#fff',
//     fontSize: 24,
//     marginVertical: 32,
//   },
//   recordButton: {
//     backgroundColor: '#fff', // Contrast color for the button
//     borderRadius: 50,
//     padding: 20,
//     marginBottom: 32,
//   },
//   recordButtonText: {
//     color: '#4CAF50', // Text color
//     fontSize: 18,
//   },
//   // Add more styles as needed
// });
const styles = StyleSheet.create({
safeArea: {
    flex: 1,
    backgroundColor: '#4CAF50', // Primary color
    },
    container: {
    flex: 1,
    backgroundColor: '#7E57C2', // Primary color from the image
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    },
    closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
    },
    patientName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    },
    timerText: {
    fontSize: 30,
    color: '#fff',
    marginBottom: 40,
    },
    recordButton: {
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 15,
    paddingHorizontal: 30,
    marginVertical: 10,
    },
    recordButtonText: {
    color: '#4CAF50',
    fontSize: 20,
    },
    pauseButton: {
    backgroundColor: 'lightgrey',
    borderRadius: 30,
    padding: 15,
    paddingHorizontal: 30,
    marginVertical: 10,
    },
    pauseButtonText: {
    color: '#fff',
    fontSize: 20,
    },
    sendButton: {
    backgroundColor: 'darkgrey',
    borderRadius: 30,
    padding: 15,
    paddingHorizontal: 30,
    marginVertical: 10,
    },
    sendButtonText: {
    color: '#fff',
    fontSize: 20,
    },
    waveformPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // additional styles if necessary
    },
    waveformText: {
    color: '#fff',
    // other styles for the waveform text
    },
    // ... other styles you may need
    });


export default RecordPage;
