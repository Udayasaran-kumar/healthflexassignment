import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import TimerCard from './TimerCard';
import { Timer } from '../types/index';

interface CategorySectionProps {
  title: string;
  timers: Timer[];
  onStart: (id: string) => void;
  onPause: (id: string) => void;
  onReset: (id: string) => void;
  onComplete: (id: string) => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({
  title,
  timers,
  onStart,
  onPause,
  onReset,
  onComplete,
}) => {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={timers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TimerCard
            timer={item}
            onStart={() => onStart(item.id)}
            onPause={() => onPause(item.id)}
            onReset={() => onReset(item.id)}
            onComplete={() => onComplete(item.id)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginVertical: 10,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default CategorySection;
