import React from "react";
import { View, StyleSheet, Text } from "react-native";

type SlideProps = {
    slideId: number
}

export const LessonSlideView: React.FC<SlideProps> = function ({ slideId }) {
    return (
      <View style={styles.container} testID="lessonView">
        <Text>
            {slideId}
        </Text>
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    flex: 1,
  }
});