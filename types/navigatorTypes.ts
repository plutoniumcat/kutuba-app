import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
    Home: undefined;
    Settings: undefined;
    MainMenu: undefined;
    LessonMenu: undefined;
    LessonView: {lessonId: number};
  };

export type LessonViewScreenProps = NativeStackScreenProps<RootStackParamList, 'LessonView'>;