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
