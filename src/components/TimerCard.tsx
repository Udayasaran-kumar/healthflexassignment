import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Timer } from '../types';

interface Props {
  timer: Timer;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onComplete: () => void;
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const TimerCard: React.FC<Props> = ({ timer, onStart, onPause, onReset, onComplete }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{timer.name}</Text>
      <Text style={styles.time}>⏱ {formatTime(timer.remainingTime)}</Text>
      <Text style={styles.status}>Status: {timer.status}</Text>
      <View style={styles.actions}>
        {timer.status !== 'running' && timer.status !== 'completed' && (
          <Button title="Start" onPress={onStart} />
        )}
        {timer.status === 'running' && <Button title="Pause" onPress={onPause} />}
        {timer.status !== 'completed' && <Button title="Reset" onPress={onReset} />}
        {timer.status !== 'completed' && <Button title="Complete" onPress={onComplete} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f8f8f8',
    marginHorizontal: 10,
    marginVertical: 6,
    padding: 16,
    borderRadius: 10,
    elevation: 2,
    
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color:'rgba(10, 9, 9, 0.8)'
  },
  time: {
    fontSize: 18,
    marginVertical: 6,
    color:'rgba(10, 9, 9, 0.8)'
  },
  status: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default TimerCard;
