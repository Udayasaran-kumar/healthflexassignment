// import React from 'react';
// import { View, Text, FlatList, StyleSheet } from 'react-native';
// import { useTimerContext } from '../context/TimerContext';


// const HistoryScreen = () => {
//   const { history } = useTimerContext();

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Timer History</Text>
//       <FlatList
//         data={history}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.item}>
//             <Text style={styles.itemText}>{item.name}</Text>
//             <Text style={styles.itemText}>
//               Completed at: {new Date(item.completedAt).toLocaleString()}
//             </Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   item: {
//     marginBottom: 12,
//     padding: 12,
//     backgroundColor: '#f9f9f9',
//     borderRadius: 8,
//   },
//   itemText: {
//     fontSize: 16,
//   },
// });

// export default HistoryScreen;

import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useTimerContext } from '../context/TimerContext';

const HistoryScreen = () => {
  const { history } = useTimerContext();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Completed Timers</Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.detail}>
              Completed at: {new Date(item.completedAt!).toLocaleString()}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color:'rgba(10, 9, 9, 0.8)'
  },
  item: {
    backgroundColor: '#eee',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    color:'rgba(10, 9, 9, 0.8)'
  },
  detail: {
    fontSize: 14,
    color: '#555',
  },
});

export default HistoryScreen;
