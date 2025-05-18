// import React from 'react';
// import { View, Text, StyleSheet, Button, Platform } from 'react-native';
// import { Timer } from '../types/index';

// type TimerCardProps = {
//   timer: Timer;
//   onStart: () => void;
//   onPause: () => void;
//   onReset: () => void;
//   onComplete: () => void;
// };

// const TimerCard: React.FC<TimerCardProps> = ({
//   timer,
//   onStart,
//   onPause,
//   onReset,
//   onComplete,
// }) => {
//   const progress = timer.duration > 0 ? timer.remaining / timer.duration : 0;

//   const formatTime = (sec: number) => {
//     const minutes = Math.floor(sec / 60);
//     const seconds = Math.floor(sec % 60);
//     return `${minutes}:${seconds.toString().padStart(2, '0')}`;
//   };

//   return (
//     <View style={styles.card}>
//       <Text style={styles.name}>{timer.name}</Text>

//       {/* Custom Cross-Platform Progress Bar */}
//       <View style={styles.progressContainer}>
//         <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
//       </View>

//       <Text style={styles.time}>{formatTime(timer.remaining)} remaining</Text>

//       <View style={styles.actions}>
//         <Button title="Start" onPress={onStart} disabled={timer.isRunning} />
//         <Button title="Pause" onPress={onPause} disabled={!timer.isRunning} />
//         <Button title="Reset" onPress={onReset} />
//         <Button title="Complete" onPress={onComplete} />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     padding: 16,
//     marginVertical: 8,
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     elevation: 2,
//   },
//   name: {
//     fontSize: 18,
//     marginBottom: 8,
//     fontWeight: '600',
//   },
//   progressContainer: {
//     height: 10,
//     backgroundColor: '#e0e0e0',
//     borderRadius: 5,
//     overflow: 'hidden',
//   },
//   progressBar: {
//     height: '100%',
//     backgroundColor: '#6200ee',
//   },
//   time: {
//     marginTop: 8,
//     fontSize: 14,
//     color: '#555',
//     textAlign: 'center',
//   },
//   actions: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 12,
//   },
// });

// export default TimerCard;


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
