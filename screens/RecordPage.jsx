import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated ,Button} from 'react-native';
import { Audio } from 'expo-av';
import { MaterialIcons } from '@expo/vector-icons'; // Ensure you have expo/vector-icons installed
import AnimatedSoundBars from '../components/AnimatedSoundBars';

const dotAnimations = Array.from({ length: 10 }).map(
  () => new Animated.Value(1)
);

const RecordPage = ({ navigation, route }) => {
  // Extract patient name from route params if passed
  const patientName = route.params?.patient.patientName || 'Patient';
  const [recording, setRecording] = useState();
  const [recordings, setRecordings] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState(0);
  
  async function startRecording() {
    setIsRecording((prev) => !prev);

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
    setIsRecording((prev) => !prev);
    setTimer(0); // Reset the timer to zero

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

  const formatTime = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

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

      <View style={styles.container}>
        <Text style={styles.patientName}>{patientName}</Text>

        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <MaterialIcons name="close" size={32} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.timerText}>{formatTime()}</Text>

        {/* Waveform placeholder */}
        <View style={styles.waveformPlaceholder}>
          {/* Placeholder for waveform. You can implement or integrate an actual waveform representation */}
          <AnimatedSoundBars isAnimating={isRecording} barColor="#FFF" />
          {/* <Text style={styles.waveformText}>Waveform goes here</Text> */}
        </View>

        {/* Recording controls */}
        <View style={styles.controls}>
          <TouchableOpacity onPress={isRecording ? stopRecording : startRecording} style={styles.recordButton}>
            <MaterialIcons name={isRecording ? "stop" : "mic"} size={30} />
          </TouchableOpacity>
          <Text style={styles.recordButtonText}>{isRecording ? 'Recording...' : 'Tap to Start'}</Text>
        </View>

        {/* <View style={styles.recordingsList}>
          {getRecordingLines()}
        </View> */}

        <TouchableOpacity style={styles.sendButton}
          onPress={() => {
            // Placeholder for sending the file to the server
            console.log('Send button pressed. Implement sending the audio file.');
          }}
        >
          <Text style={styles.sendButtonText}>Send to Server</Text>
        </TouchableOpacity>
    
      </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#4CAF50', // Primary color from the image
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    patientName: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 20,
    },
    closeButton: {
      position: 'absolute',
      top: 10,
      right: 10,
      padding: 10,
    },
    timerText: {
      fontSize: 32,
      color: '#fff',
      marginBottom: 40,
    },
    waveformPlaceholder: {
      flex: 1,
      padding : 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    waveformText: {
      color: '#fff',
    },
    controls: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 20,
      marginBottom: 10,
    },
    recordButton: {
      backgroundColor: '#fff',
      borderRadius: 30,
      padding: 15,
    },
    recordButtonText: {
      color: '#fff',
      fontSize: 20,
    },
    
    pauseButton: {
      backgroundColor: 'lightgrey',
      borderRadius: 30,
      padding: 15,
    },
    pauseButtonText: {
      color: '#fff',
      fontSize: 20,
    },
    
    sendButton: {
      backgroundColor: '#4CAF50', // A color that stands out for the CTA button
      borderRadius: 25,
      paddingVertical: 15,
      paddingHorizontal: 30,
      alignSelf: 'center',
      marginVertical: 20,
    },
    sendButtonText: {
      color: '#fff',
      fontSize: 20,
      textAlign: 'center',
    },
    amplitudeBar: {
      width: 10,
      height: 100,
      backgroundColor: 'white',
      // Other styling for the bar
    },
    row: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    bar: {
      height: 15,
      width: 10,
      borderRadius: 2,
      marginHorizontal: 2,
    },
});


export default RecordPage;
