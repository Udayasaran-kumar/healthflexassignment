import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Timer } from '../types';

interface TimerContextType {
  timers: Timer[];
  history: Timer[];
  addTimer: (timer: Timer) => void;
  deleteTimer: (id: string) => void;
  startTimer: (id: string) => void;
  pauseTimer: (id: string) => void;
  resetTimer: (id: string) => void;
  completeTimer: (id: string) => void;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const TimerProvider = ({ children }: { children: ReactNode }) => {
  const [timers, setTimers] = useState<Timer[]>([]);
  const [history, setHistory] = useState<Timer[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const [storedTimers, storedHistory] = await Promise.all([
        AsyncStorage.getItem('timers'),
        AsyncStorage.getItem('history'),
      ]);
      if (storedTimers) setTimers(JSON.parse(storedTimers));
      if (storedHistory) setHistory(JSON.parse(storedHistory));
    };
    loadData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prevTimers) =>
        prevTimers.map((timer) => {
          if (timer.status === 'running' && timer.remainingTime > 0) {
            const updatedTime = timer.remainingTime - 1;
            if (updatedTime <= 0) {
              completeTimer(timer.id);
              return { ...timer, status: 'completed', remainingTime: 0 };
            }
            return { ...timer, remainingTime: updatedTime };
          }
          return timer;
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [timers]);

  const saveTimers = async (newTimers: Timer[]) => {
    setTimers(newTimers);
    await AsyncStorage.setItem('timers', JSON.stringify(newTimers));
  };

  const saveHistory = async (newHistory: Timer[]) => {
    setHistory(newHistory);
    await AsyncStorage.setItem('history', JSON.stringify(newHistory));
  };

  const addTimer = (newTimer: Timer) => saveTimers([...timers, newTimer]);

  const deleteTimer = (id: string) =>
    saveTimers(timers.filter((t) => t.id !== id));

  const startTimer = (id: string) =>
    saveTimers(
      timers.map((t) =>
        t.id === id ? { ...t, status: 'running' } : t
      )
    );

  const pauseTimer = (id: string) =>
    saveTimers(
      timers.map((t) =>
        t.id === id && t.status === 'running' ? { ...t, status: 'paused' } : t
      )
    );

  const resetTimer = (id: string) =>
    saveTimers(
      timers.map((t) =>
        t.id === id ? { ...t, status: 'paused', remainingTime: t.duration } : t
      )
    );

  const completeTimer = (id: string) => {
    const updated = timers.map((t) =>
      t.id === id ? { ...t, status: 'completed', remainingTime: 0 } : t
    );
    saveTimers(updated);
    const completed = timers.find((t) => t.id === id);
    if (completed) {
      const completedWithDate = {
        ...completed,
        completedAt: new Date().toISOString(),
      };
      const newHistory = [...history, completedWithDate];
      saveHistory(newHistory);
      Alert.alert('Congratulations!', `${completed.name} completed!`);
    }
  };

  return (
    <TimerContext.Provider
      value={{
        timers,
        history,
        addTimer,
        deleteTimer,
        startTimer,
        pauseTimer,
        resetTimer,
        completeTimer,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export const useTimerContext = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimerContext must be used within a TimerProvider');
  }
  return context;
};
