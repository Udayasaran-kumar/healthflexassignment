// import React, { useState } from 'react';
// import { View, TextInput, Button,  StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { useTimerContext } from '../context/TimerContext';
// import { Timer, TimerStatus } from '../types/index';
// import { Picker } from '@react-native-picker/picker';


// const AddTimerScreen = () => {
//   const navigation = useNavigation();
//   const { addTimer } = useTimerContext();

//   const [name, setName] = useState('');
//   const [duration, setDuration] = useState('');
//   const [category, setCategory] = useState('Work');

//   const handleSave = () => {
//     if (!name || !duration) return;

//     const newTimer: Timer = {
//       id: Date.now().toString(),
//       name,
//       duration: parseInt(duration),
//       category,
//       status: 'paused',
//       remainingTime: parseInt(duration),
//     };

//     addTimer(newTimer);
//     navigation.goBack();
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         placeholder="Timer Name"
//         value={name}
//         onChangeText={setName}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Duration (seconds)"
//         keyboardType="numeric"
//         value={duration}
//         onChangeText={setDuration}
//       />
//       <Picker
//         selectedValue={category}
//         style={styles.picker}
//         onValueChange={(itemValue) => setCategory(itemValue)}
//       >
//         <Picker.Item label="Work" value="Work" />
//         <Picker.Item label="Study" value="Study" />
//         <Picker.Item label="Exercise" value="Exercise" />
//         <Picker.Item label="Break" value="Break" />
//       </Picker>
//       <Button title="Save Timer" onPress={handleSave} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   input: {
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     marginBottom: 12,
//     paddingLeft: 8,
//   },
//   picker: {
//     height: 50,
//     marginBottom: 12,
//   },
// });

// export default AddTimerScreen;


import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTimerContext } from '../context/TimerContext';
import { Timer } from '../types';
import uuid from 'react-native-uuid';

const AddTimerScreen = () => {
  const navigation = useNavigation();
  const { addTimer } = useTimerContext();

  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('');

  const handleAdd = () => {
    const durationSeconds = parseInt(duration, 10);
    if (!name || isNaN(durationSeconds)) {
      Alert.alert('Validation Error', 'Please enter a valid name and duration.');
      return;
    }

    const newTimer: Timer = {
      id: uuid.v4(),
      name,
      duration: durationSeconds,
      remainingTime: durationSeconds,
      category,
      status: 'paused',
    };

    addTimer(newTimer);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Timer Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Duration (seconds)</Text>
      <TextInput
        style={styles.input}
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Category (optional)</Text>
      <TextInput style={styles.input} value={category} onChangeText={setCategory} />

      <Button title="Add Timer" onPress={handleAdd} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  label: {
    fontSize: 16,
    marginTop: 12,
    color:'rgba(10, 9, 9, 0.8)'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginTop: 4,
    borderRadius: 4,
    color:'rgba(10, 9, 9, 0.8)'
  },
});

export default AddTimerScreen;
