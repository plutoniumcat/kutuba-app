import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const LessonSchema = sqliteTable('LESSONS', {
    id: integer('ID').primaryKey(),
    lessonNum: integer('LESSON_NUM'),
    title: text('TITLE'),
    description: text('DESCRIPTION'),
    completed: integer('COMPLETED'),
  }
);