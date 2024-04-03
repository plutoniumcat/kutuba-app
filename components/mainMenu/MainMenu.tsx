import React from "react";
import { View, StyleSheet, Text } from "react-native";

export const MainMenu: React.FC = () => {
  
    // TODO Get slides from database
  
    return (
      <View style={styles.container} testID="lessonView">
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