import React, { useState } from "react";
import { View, StyleSheet, Text, FlatList, Dimensions, ListRenderItem } from "react-native";
import { LessonViewScreenProps } from "../../types/navigatorTypes";
import { LessonSlide } from "../../models/LessonSlide";

const SCREEN_WIDTH = Dimensions.get('window').width;

const testSlideArr: LessonSlide[] = [
  {
    id: 1,
    lessonId: 1,
    title: "Slide 1",
    item1: "text1",
    item2: "text2",
    item3: "text3",
    item4: null,
    item5: null,
    item6: null,
    item7: null,
    item8: null,
    item9: null,
    item10: null,
  },
  {
    id: 2,
    lessonId: 1,
    title: "Slide 2",
    item1: "text1",
    item2: "text1",
    item3: "text1",
    item4: "text1",
    item5: null,
    item6: null,
    item7: null,
    item8: null,
    item9: null,
    item10: null,
  }
]

const renderSlide: ListRenderItem<LessonSlide> = ({ item }) => (
  <View style={{ width: SCREEN_WIDTH, flex: 1 }} >
    <Text>{ item.title }</Text>
  </View>
);

export const LessonView: React.FC<LessonViewScreenProps> = ({route, navigation}: LessonViewScreenProps) => {
  const lessonId = route.params;
  const [lessonSlides, setLessonSlides] = useState(0);

  // TODO Get slides from database



  return (
    <View style={styles.container} testID="lessonView">
      <FlatList
        data={testSlideArr}
        renderItem={renderSlide}
        keyExtractor={item => item.id.toString()}
        horizontal
        pagingEnabled
      />
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