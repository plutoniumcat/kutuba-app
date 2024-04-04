import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { LessonSlideView } from "./LessonSlideView";
import { LessonViewScreenProps } from "../../types/navigatorTypes";

export const LessonView: React.FC<LessonViewScreenProps> = ({route, navigation}: LessonViewScreenProps) => {
  const lessonId = route.params;
  const [lessonSlide, setLessonSlide] = useState(0);

  // TODO Get slides from database

  return (
    <View style={styles.container} testID="lessonView">
      {<>
        <Text>Lesson View Component</Text>
        {/* TODO On swipe, change slide */}
        <LessonSlideView slideId={lessonSlide}></LessonSlideView>
      </>
      }
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