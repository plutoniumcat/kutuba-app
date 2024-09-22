import React from 'react';
import { AppStateStatus, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from './src/types/navigatorTypes';
import { LessonView } from './src/components/lessons/LessonView';
import { MainMenu } from './src/components/mainMenu/MainMenu';
import { DatabaseProvider } from './src/contexts/DatabaseContext';

// Track as variable rather than state- do not want to rerender on change
let appState: AppStateStatus;

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {

  return (
    <NavigationContainer>
      <DatabaseProvider>
        <Stack.Navigator initialRouteName='MainMenu'>
          <Stack.Screen name="MainMenu" component={MainMenu} />
          <Stack.Screen name="LessonView" component={LessonView} />
        </Stack.Navigator>
      </DatabaseProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
