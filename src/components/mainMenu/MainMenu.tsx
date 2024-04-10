import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { MainMenuScreenProps } from "../../types/navigatorTypes";

export const MainMenu: React.FC<MainMenuScreenProps> = ({route, navigation}: MainMenuScreenProps) => {
  
    return (
      <View style={styles.container} testID="MainMenu">
        <Button 
            title="Lesson"
            onPress={() => navigation.navigate('LessonView', {lessonId: 1})}
        ></Button>
        <Text>Lesson</Text>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });