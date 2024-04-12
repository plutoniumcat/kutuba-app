import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from '../../drizzle/migrations';
import { ExpoSQLiteDatabase } from 'drizzle-orm/expo-sqlite';
import { LessonSchema } from '../schema/LessonSchema';
import { LessonSlideSchema } from '../schema/LessonSlideSchema';
import { db } from './Db'

export const schema = {
  ...LessonSchema,
  ...LessonSlideSchema
};

export function databaseMigration() {
  // Drizzle migrations on App start
  const { success, error } = useMigrations(db as ExpoSQLiteDatabase<typeof schema>, migrations);

  if (error) {
    return  "Migration error: " + error.message;
  }

  if (!success) {
  return "Migration is in progress..."
  }

}