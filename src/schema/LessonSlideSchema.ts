import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { LessonSchema } from './LessonSchema';

export const LessonSlideSchema = sqliteTable('LESSON_SLIDES', {
    id: integer('ID').primaryKey(),
    lessonId: integer('LESSON_ID').references(() => LessonSchema.id),
    title: text('TITLE'),
    item1: text('ITEM_1'),
    item2: text('ITEM_2'),
    item3: text('ITEM_3'),
    item4: text('ITEM_4'),
    item5: text('ITEM_5'),
    item6: text('ITEM_6'),
    item7: text('ITEM_7'),
    item8: text('ITEM_8'),
    item9: text('ITEM_9'),
    item10: text('ITEM_10')
  }
);