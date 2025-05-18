// // // App.tsx or src/navigation/AppNavigator.tsx

// // import React from 'react';
// // import { NavigationContainer } from '@react-navigation/native';
// // import { createNativeStackNavigator } from '@react-navigation/native-stack';
// // import HomeScreen from './screens/HomeScreen';
// // import AddTimerScreen from './screens/AddTimerScreen';
// // import HistoryScreen from './screens/HistoryScreen';
// // import { RootStackParamList } from './types/navigation';
// // import { TimerProvider } from './context/TimerContext';



// // const Stack = createNativeStackNavigator<RootStackParamList>();

// // const App = () => (
// //   <TimerProvider>
// //     <NavigationContainer>
// //       <Stack.Navigator initialRouteName="Home">
// //         <Stack.Screen name="Home" component={HomeScreen} />
// //         <Stack.Screen name="Add Timer" component={AddTimerScreen} />
// //         <Stack.Screen name="History" component={HistoryScreen} />
// //       </Stack.Navigator>
// //     </NavigationContainer>
// //   </TimerProvider>
// // );

// // export default App;


// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import HomeScreen from './screens/HomeScreen';
// import AddTimerScreen from './screens/AddTimerScreen';
// import HistoryScreen from './screens/HistoryScreen';
// import { TimerProvider } from './context/TimerContext';
// import { RootStackParamList } from './types/navigation';

// const Stack = createNativeStackNavigator<RootStackParamList>();

// const App = () => (
//   <TimerProvider>
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Home">
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="Add Timer" component={AddTimerScreen} />
//         <Stack.Screen name="History" component={HistoryScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   </TimerProvider>
// );

// export default App;
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TimerProvider } from './context/TimerContext';

import HomeScreen from './screens/HomeScreen';
import AddTimerScreen from './screens/AddTimerScreen';
import HistoryScreen from './screens/HistoryScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <TimerProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Add Timer" component={AddTimerScreen} />
          <Stack.Screen name="History" component={HistoryScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TimerProvider>
  );
}
