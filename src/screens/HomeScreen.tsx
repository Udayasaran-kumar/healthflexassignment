// // import React from 'react';
// // import { View, Button, SectionList, Text, StyleSheet } from 'react-native';
// // import { useNavigation } from '@react-navigation/native';
// // import { useTimerContext } from '../context/TimerContext';
// // import TimerCard from '../components/TimerCard';
// // import { Timer } from '../types';

// // const HomeScreen = () => {
// //   const navigation = useNavigation();
// //   const { timers, startTimer, pauseTimer, resetTimer, completeTimer } = useTimerContext();

// //   const sections = Object.entries(
// //     timers.reduce((acc, timer) => {
// //       const category = timer.category || 'Uncategorized';
// //       if (!acc[category]) acc[category] = [];
// //       acc[category].push(timer);
// //       return acc;
// //     }, {} as Record<string, Timer[]>)
// //   ).map(([title, data]) => ({ title, data }));

// //   return (
// //     <View style={{ flex: 1 }}>
// //       <Button title="Add Timer" onPress={() => navigation.navigate('Add Timer')} />
// //       <SectionList
// //         sections={sections}
// //         keyExtractor={(item) => item.id}
// //         renderItem={({ item }) => (
// //           <TimerCard
// //             timer={item}
// //             onStart={() => startTimer(item.id)}
// //             onPause={() => pauseTimer(item.id)}
// //             onReset={() => resetTimer(item.id)}
// //             onComplete={() => completeTimer(item.id)}
// //           />
// //         )}
// //         renderSectionHeader={({ section: { title } }) => (
// //           <Text style={styles.sectionTitle}>{title}</Text>
// //         )}
// //         contentContainerStyle={{ padding: 16 }}
// //       />
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   sectionTitle: {
// //     fontSize: 20,
// //     fontWeight: 'bold',
// //     marginTop: 16,
// //     marginBottom: 8,
// //   },
// // });

// // export default HomeScreen;

// import React, { useState } from 'react';
// import { View, Button, SectionList, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { useTimerContext } from '../context/TimerContext';
// import TimerCard from '../components/TimerCard';
// import { Timer } from '../types/index';


// const HomeScreen = () => {
//   const navigation = useNavigation();
//   const { timers, startTimer, pauseTimer, resetTimer, completeTimer } = useTimerContext();

//   const sections = Object.entries(
//     timers.reduce((acc, timer) => {
//       const category = timer.category || 'Uncategorized';
//       if (!acc[category]) acc[category] = [];
//       acc[category].push(timer);
//       return acc;
//     }, {} as Record<string, Timer[]>)
//   ).map(([title, data]) => ({ title, data }));

//   // State to track which categories are collapsed
//   const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});

//   const toggleCollapse = (category: string) => {
//     setCollapsedCategories((prev) => ({
//       ...prev,
//       [category]: !prev[category],
//     }));
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <Button title="Add Timer" onPress={() => navigation.navigate('Add Timer')} />
//       <SectionList
//         sections={sections}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item, section }) => {
//           // Don't render if category is collapsed
//           if (collapsedCategories[section.title]) return null;
//           return (
//             <TimerCard
//               timer={item}
//               onStart={() => startTimer(item.id)}
//               onPause={() => pauseTimer(item.id)}
//               onReset={() => resetTimer(item.id)}
//               onComplete={() => completeTimer(item.id)}
//             />
//           );
//         }}
//         renderSectionHeader={({ section: { title } }) => (
//           <TouchableOpacity onPress={() => toggleCollapse(title)} style={styles.header}>
//             <Text style={styles.headerText}>{title}</Text>
//             <Text>{collapsedCategories[title] ? '+' : '-'}</Text>
//           </TouchableOpacity>
//         )}
//         stickySectionHeadersEnabled={true}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   header: {
//     backgroundColor: '#fff',
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   headerText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
// });

// export default HomeScreen;

import React, { useState } from 'react';
import {
  View,
  Button,
  SectionList,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { DarkTheme, useNavigation } from '@react-navigation/native';
import { useTimerContext } from '../context/TimerContext';
import TimerCard from '../components/TimerCard';
import { Timer } from '../types';

const HomeScreen = () => {
  const navigation = useNavigation();
  const {
    timers,
    startTimer,
    pauseTimer,
    resetTimer,
    completeTimer,
  } = useTimerContext();

  const sections = Object.entries(
    timers.reduce((acc, timer) => {
      const category = timer.category || 'Uncategorized';
      if (!acc[category]) acc[category] = [];
      acc[category].push(timer);
      return acc;
    }, {} as Record<string, Timer[]>)
  ).map(([title, data]) => ({ title, data }));

  const [collapsedCategories, setCollapsedCategories] = useState<
    Record<string, boolean>
  >({});

  const toggleCollapse = (category: string) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.buttonGroup}>
        <Button title="Add Timer" onPress={() => navigation.navigate('Add Timer')} />
        <Button title="History" onPress={() => navigation.navigate('History')} />
      </View>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={({ item, section }) => {
          if (collapsedCategories[section.title]) return null;
          return (
            <TimerCard
              timer={item}
              onStart={() => startTimer(item.id)}
              onPause={() => pauseTimer(item.id)}
              onReset={() => resetTimer(item.id)}
              onComplete={() => completeTimer(item.id)}
            />
          );
        }}
        renderSectionHeader={({ section: { title } }) => (
          <TouchableOpacity onPress={() => toggleCollapse(title)} style={styles.header}>
            <Text style={styles.headerText}>{title}</Text>
            <Text>{collapsedCategories[title] ? '+' : '-'}</Text>
          </TouchableOpacity>
        )}
        stickySectionHeadersEnabled
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,
  },
});

export default HomeScreen;
