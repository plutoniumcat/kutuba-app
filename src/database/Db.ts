import * as SQLite from "expo-sqlite";
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { DatabaseInitialization } from "./DatabaseInitialization";
import { DATABASE } from "./Constants";
import { AppState, AppStateStatus } from "react-native";
import { LessonSlide } from "../models/LessonSlide";
import { Lesson } from "../models/Lesson";

export interface Database {
  // Read
  getLesson(lessonId: number): Promise<Lesson | null>;
//   getLessonSlides(lessonId: number): Promise<LessonSlide[]>;
//   getReviewCards(date: number): Promise<Card[]>;
// TODO Get settings
  // Update
//   updateLessonStatus(lessonId: number): Promise<void>;
//   updateDueDate(card: Card): Promise<void>;
// TODO Update settings
}

let databaseInstance: SQLite.SQLiteDatabase | undefined;

// Get all lessons (array)
// async function getAllLessons(): Promise<LessonInfo[]> {
//   console.log("[db] Fetching lessons from db...");
//   return getDatabase()
//     .then((db) =>
//       db.executeSql("SELECT lesson_id, title, description FROM Lesson ORDER BY lesson_id;"),
//     )
//     .then(([results]) => {
//       if (results === undefined) {
//         return [];
//       }
//       const count = results.rows.length;
//       const lessons: LessonInfo[] = [];
//       for (let i = 0; i < count; i++) {
//         const info = results.rows.item(i);
//         const lessonInfo = new LessonInfo(info);
//         console.log(`[db] Lesson title: ${lessonInfo.title}, id: ${lessonInfo.lesson_id}`);
//         lessons.push(lessonInfo);
//       }
//       return lessons;
//     });
// }


async function getLesson(lessonId: number): Promise<Lesson | null> {
    try {
      const db = await getDatabase();
      
      const result = await new Promise<Lesson | null>((resolve, reject) => {
        db.transactionAsync(
            async (tx) => {
                const resultSet = await tx.executeSqlAsync(`SELECT * FROM Lesson WHERE lesson_id = ?;`, [lessonId])
                if (resultSet.rows.length > 0) {
                    const lesson = new Lesson(resultSet.rows[0].id, resultSet.rows[0].lessonNum, resultSet.rows[0].lesson_title, resultSet.rows[0].description, resultSet.rows[0].complete);
                    resolve(lesson);
                } else {
                    resolve(null);
                }
            },
        );
    });
    return result;
    } catch {
        // TODO error handling
        return null;
    }
    }

// // Get lesson slides (array)
// async function getLessonSlides(lessonId: number): Promise<LessonSlide[]> {
//   console.log("[db] Fetching lesson slides from db...");
//   return getDatabase()
//     .then((db) =>
//       db.transactionAsync("SELECT * FROM LessonSlides WHERE lesson_id = ?;",
//         [lessonId]
//       ),
//     )
//     .then(([results]) => {
//       if (results === undefined) {
//         return [];
//       }
//       const count = results.rows.length;
//       const lessonSlides: LessonSlide[] = [];
//       for (let i = 0; i < count; i++) {
//         const nextSlideData = results.rows.item(i);
//         const slide = new LessonSlide(nextSlideData);
//         lessonSlides.push(slide);
//       }
//       return lessonSlides;
//     });
// }

// async function updateLessonStatus(lessonId: number, status: number): Promise<void> {
//   // Must be 0 or 1
//   if (status < 0 || status > 1) return;
//   return getDatabase()
//     .then((db) =>
//       db.executeSql("UPDATE Lesson SET completed = ? WHERE lesson_id = ?;", [
//         status,
//         lessonId
//       ]),
//     )
//     .then(([results]) => {
//       console.log(`[db] Status of lesson: ${lessonId} updated.`);
//     });
// }


// "Private" helpers

async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (databaseInstance !== undefined) {
    return Promise.resolve(databaseInstance);
  }
  // otherwise: open the database first
  return open();
}

// Open a connection to the database
async function open(): Promise<SQLite.SQLiteDatabase> {
//   SQLite.DEBUG(true);
//   SQLite.enablePromise(true);

  if (databaseInstance) {
    console.log("[db] Database is already open: returning the existing instance");
    return databaseInstance;
  }

  // Otherwise, create a new instance
  const db = await SQLite.openDatabase(DATABASE.FILE_NAME);
  console.log("[db] Database open!");

  // Perform any database initialization or updates, if needed
  const databaseInitialization = new DatabaseInitialization();
  await databaseInitialization.updateDatabaseTables(db);

  databaseInstance = db;
  return db;
}

async function openDatabase(pathToDatabaseFile: string): Promise<SQLite.SQLiteDatabase> {
    if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
      await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
    }
    const asset = await Asset.fromModule(require(pathToDatabaseFile)).downloadAsync();
    if (asset.localUri) {
        await FileSystem.copyAsync({
            from: asset.localUri,
            to: FileSystem.documentDirectory + 'SQLite/' + DATABASE.FILE_NAME,
          });
          return SQLite.openDatabase(DATABASE.FILE_NAME);
    } else {
        throw Error("[db] asset.localUri was null")
    }
  }

// Close the connection to the database
async function close(): Promise<void> {
  if (databaseInstance === undefined) {
    console.log("[db] Db already closed, could not close again.");
    return;
  }
  const status = await databaseInstance.closeAsync();
  console.log("[db] Database closed.");
  databaseInstance = undefined;
}

// Listen to app state changes. Close the database when the app is put into the background (or enters the "inactive" state)
let appState = "active";
console.log("[db] Adding listener to handle app state changes");
AppState.addEventListener("change", handleAppStateChange);

// Handle the app going from foreground to background, and vice versa.
function handleAppStateChange(nextAppState: AppStateStatus) {
  if (appState === "active" && nextAppState.match(/inactive|background/)) {
    // App has moved from the foreground into the background (or become inactive)
    console.log("[db] App has gone to the background - closing DB connection.");
    close();
  }
  appState = nextAppState;
}

// Export the functions which fulfill the Database interface contract
export const sqliteDatabase: Database = {
  // Read
  getLesson,
//   getLessonSlides,
//   getReviewCards,
  // Update
//   updateLessonStatus,
//   updateDueDate(card: Card): Promise<void>;
};