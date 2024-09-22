import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, FlatList, Dimensions, ListRenderItem } from "react-native";
import { LessonViewScreenProps } from "../../types/navigatorTypes";
import { LessonSlide } from "../../models/LessonSlide";
import { Lesson } from "../../models/Lesson";
import { useDatabase } from "../../contexts/DatabaseContext";

const SCREEN_WIDTH = Dimensions.get('window').width;

// const testSlideArr: LessonSlide[] = [
//   {
//     slideId: 1,
//     lessonId: 1,
//     title: "Slide 1",
//     item1: "text1",
//     item2: "text2",
//     item3: "text3",
//     item4: null,
//     item5: null,
//     item6: null,
//     item7: null,
//     item8: null,
//     item9: null,
//     item10: null,
//   },
//   {
//     slideId: 2,
//     lessonId: 1,
//     title: "Slide 2",
//     item1: "text1",
//     item2: "text2",
//     item3: "text3",
//     item4: "text4",
//     item5: null,
//     item6: null,
//     item7: null,
//     item8: null,
//     item9: null,
//     item10: null,
//   }
// ]

const renderSlide: ListRenderItem<LessonSlide> = ({ item }) => (
  <View style={{ width: SCREEN_WIDTH, flex: 1 }} >
    <Text>{ item.title }</Text>
    <Text>{ item.item1 }</Text>
    <Text>{ item.item2 }</Text>
    <Text>{ item.item3 }</Text>
    <Text>{ item.item4 }</Text>
  </View>
);

export const LessonView: React.FC<LessonViewScreenProps> = ({route, navigation}: LessonViewScreenProps) => {
  const lessonId = route.params.lessonId;
  const database = useDatabase();
  const [lessonSlides, setLessonSlides] = useState([] as LessonSlide[]);

  // TODO Get slides from database
  useEffect(() => {
    console.log("useEffect triggered");
    database.getLessonSlides(1)
    .then(
      (result) =>{
        console.log("setting lesson slides");
        result ?
        setLessonSlides(result) 
        :
        null
      }
    )
  }, [])

  return (
    <View style={styles.container} testID="lessonView">
      <FlatList
        data={lessonSlides}
        renderItem={renderSlide}
        keyExtractor={item => item.slideId.toString()}
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