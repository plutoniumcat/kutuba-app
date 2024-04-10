import * as SQLite from 'expo-sqlite/next';
import * as FileSystem from 'expo-file-system';
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
// import migrations from '../../drizzle/migrations';
import { eq, lt } from 'drizzle-orm';
import { ExpoSQLiteDatabase } from 'drizzle-orm/expo-sqlite';
import { AppState, AppStateStatus } from "react-native";
import { DATABASE } from "./Constants";
// import { DatabaseInitialization } from "./DatabaseInitialization";
import { LessonSchema } from '../schema/LessonSchema';
import { LessonSlideSchema } from '../schema/LessonSlideSchema';
import { Lesson } from "../models/Lesson";
import { LessonSlide } from "../models/LessonSlide";

export interface Db {
    // Create
    // Read
    getLesson(lessonId: number): Promise<Lesson>;
    getLessonSlides(lessonId: number): Promise<LessonSlide[]>;
    // getAllCards(): Promise<Card[]>;
    // getCardsByDueDate(dueDate: Date): Promise<Card[]>;
    // getCardsByLesson(lessonId: number): Promise<Card[]>;
    // getAppSettings();
    // getUserSettings();
    // Update
    updateLessonStatus(lessonId: number): Promise<boolean>;
    // updateReviewCard(cardId: number, newDate: Date): Promise<boolean>;
    // updateUserSettings();
    // Delete
}

let sqliteDb: SQLite.SQLiteDatabase | undefined;
let db: ExpoSQLiteDatabase<typeof schema> | undefined;

const schema = {
    ...LessonSchema,
    ...LessonSlideSchema
  };

// export function databaseMigration() {
//   // Drizzle migrations on App start
//   const { success, error } = useMigrations(db, migrations);

//   if (error) {
//     return  "Migration error: " + error.message;
//   }

//   if (!success) {
//   return "Migration is in progress..."
//   }

// }

async function openDatabase(pathToDatabaseFile: string): Promise<SQLite.SQLiteDatabase> {
    // Return existing sqlitedb connection if already open
    if (sqliteDb != undefined) {
        console.log("[db] SQlite DB is already open: returning the existing instance");
        return sqliteDb;
      }

    if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
      await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
      // await FileSystem.writeAsStringAsync(pathToDatabaseFile, ''); // Create an empty file
    }
    // let path = pathToDatabaseFile + "/SQLite/" + DATABASE.FILE_NAME;
    // await FileSystem.downloadAsync(
    //   Asset.fromModule(require("/SQLite/AppDatabase.db")).uri,
    //   FileSystem.documentDirectory + 'SQLite/' + DATABASE.FILE_NAME
    // );
    return await SQLite.openDatabaseAsync("SQLite/" + DATABASE.FILE_NAME);
}

async function openDbConnection(pathToDatabaseFile: string): Promise<ExpoSQLiteDatabase<typeof schema>> {
    if (db != undefined) {
        console.log("[db] Drizzle db connection is already open: returning the existing instance");
        return db;
      }
    const sqlDb = await openDatabase("/");
    const dbConn = drizzle(sqlDb, { schema: { schema } });
    return dbConn;
}

// const dbConn = await openDatabase("/");
// db = await getDatabase();

const getLesson = async (lessonId: number): Promise<Lesson> => {
    return getDatabase()
        .then((db) => db.select().from(LessonSchema).where(eq(LessonSchema.id, lessonId)).limit(1))
        .then((results) => {
            // TODO better error handling
            if (results.length === 0) {
                throw new Error(`Lesson with ID ${lessonId} not found`);
            }
            const result = results[0];
            return new Lesson(
                result.id,
                result.lessonNum,
                result.title,
                result.description,
                Boolean(result.completed)
            );
        })
}

const getLessonSlides = async (lessonId: number): Promise<LessonSlide[]> => {
    return getDatabase()
        .then((db) => db.select().from(LessonSlideSchema).where(eq(LessonSlideSchema.lessonId, lessonId)))
        .then((result) => {
            const lessonSlides = new Array<LessonSlide>();
            for (let s of result) {
                const slide: LessonSlide = new LessonSlide(s["id"], Number(s['lessonId']), s['title'], s['item1'], s['item2'], s['item3'], s['item4'],
                    s['item5'], s['item6'], s['item7'], s['item8'], s['item9'], s['item10']);
                lessonSlides.push(slide);
            }
            return lessonSlides;
        });
}

// const cardSchemaToCards = (results: Array<object>): Card[] => {
//     const cards = new Array<Card>();
//     for (let c of results) {
//         const card: Card = new Card(c['id'], c['lessonId'], c['frontTargetLang'], c['frontTransliterated'], c['frontTranslation'], 
//         c['backTargetLang'], c['backTransliterated'], c['backTranslation'], c['imageId'], c['audioId'], c['hintOne'], 
//         c['hintTwo'], c['due'])
//         cards.push(card);
//     }
//     return cards;
// }

// const getCardsByLesson = async (lessonId: number): Promise<Card[]> => {
//     return getDatabase()
//         .then((db) => db.select().from(CardSchema).where(eq(CardSchema.lessonId, lessonId)))
//         .then((result) => cardSchemaToCards(result));
// }

// const getCardsByDueDate = async (dueDate: Date): Promise<Card[]> => {
//     const unixTs = dueDate[Symbol.toPrimitive]('number');
//     return getDatabase()
//         .then((db) => db.select().from(CardSchema).where(lt(CardSchema.due, unixTs)))
//         .then((result) => cardSchemaToCards(result));
// }

// const getAllCards = async (): Promise<Card[]> => {
//     return getDatabase()
//         .then((db) => db.select().from(CardSchema).limit(5000))
//         .then((result) => cardSchemaToCards(result));
// }

const updateLessonStatus = async (lessonId: number): Promise<boolean> => {
    return getDatabase()
        .then((db) => db.update(LessonSchema).set({completed: 1}).where(eq(LessonSchema.id, lessonId))
            .returning())
        .then(result => Boolean(result));
}

// const updateReviewCard = async (cardId: number, newDate: Date): Promise<boolean> => {
//     // Convert date to unix TS
//     const unixTs = newDate[Symbol.toPrimitive]('number');
//     return getDatabase()
//         .then((db) => db.update(CardSchema).set({ due: unixTs }).where(eq(CardSchema.id, cardId)).returning())
//         .then(result => Boolean(result));
// }

// Database helper functions

async function getDatabase(): Promise<ExpoSQLiteDatabase<typeof schema>> {
    if (db !== undefined) {
      return Promise.resolve(db);
    }
    // otherwise: open the database first
    return openDbConnection("/");
  }

async function close(): Promise<void> {
    if (sqliteDb === undefined) {
      console.log("[db] Close db failed; db connection is already closed");
      return;
    }
    const status = await sqliteDb.closeAsync();
    console.log("[db] Database closed.");
    db = undefined;
  }

  // Listen to app state changes.
let appState = "active";
console.log("[db] Adding listener for app state changes");
AppState.addEventListener("change", handleAppStateChange);

// Handle the app going from foreground to background, and vice versa.
// TODO Does the app correctly reconnect when becoming active or do I need to do that here?
function handleAppStateChange(nextAppState: AppStateStatus) {
  if (appState === "active" && nextAppState.match(/inactive|background/)) {
    console.log("[db] App has gone to the background - closing DB connection.");
    close();
  }
  appState = nextAppState;
}
  

export const orm: Db = {
    // Create
    // Read
    getLesson,
    getLessonSlides,
    // getAllCards,
    // getCardsByDueDate,
    // getCardsByLesson,
    // getAppSettings,
    // getUserSettings,
    // Update
    updateLessonStatus,
    // updateReviewCard,
    // updateUserSettings,
    // Delete
}