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
            <TimerCard style={styles.text}
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
    color:'rgba(10, 9, 9, 0.8)'
  },
  text:{
    color:'rgba(10, 9, 9, 0.8)'
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,
  },
});

export default HomeScreen;
