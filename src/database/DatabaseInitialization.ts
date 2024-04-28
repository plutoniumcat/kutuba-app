import * as SQLite from 'expo-sqlite';
import { tableSchema, seedData } from './createTables';
import { version } from 'react';

export class DatabaseInitialization {
  // Perform any updates to the database schema. These can occur during initial configuration, or after an app store update.
  // This should be called each time the database is opened.

  public initDb(database: SQLite.SQLiteDatabase): Promise<void> {
    this.updateDatabaseTables(database);
    return database.transactionAsync(async (tx) => {
      this.seedDatabase(tx);
    })
  }
  
  public updateDatabaseTables(database: SQLite.SQLiteDatabase): Promise<void> {
    let dbVersion: number = 0;
    console.log("[db] Beginning database updates...");

    // First: create tables if they do not already exist
    return database
      .transactionAsync(async tx => {
        this.createTables(tx)
      })
      .then(() => {
        // Get the current database version
        return this.getDatabaseVersion(database);
      })
      .then((version: number) => {
        dbVersion = version;
        console.log("Current database version is: " + dbVersion);

        // Perform DB updates based on this version

        // This is included as an example of how you make database schema changes once the app has been shipped
        if (dbVersion < 1) {
          // Uncomment the next line, and the referenced function below, to enable this
          // return database.transaction(this.preVersion1Inserts);
        }
        // otherwise,
        return;
      })
      .then(() => {
        if (dbVersion < 2) {
          // Uncomment the next line, and the referenced function below, to enable this
          // return database.transaction(this.preVersion2Inserts);
        }
        // otherwise,
        return;
      });
  }

  // Perform initial setup of the database tables
  private createTables(transaction: SQLite.SQLTransactionAsync) {
    // DANGER! For dev only
    const dropAllTables = false;
    if (dropAllTables) {
        tableSchema.forEach((key, value) => {
            console.log(`[db] Creating table ${key}.`)
            transaction.executeSqlAsync(`DROP TABLE IF EXISTS ?`, [key]);
        });
    }

    tableSchema.forEach((key, value) => {
        console.log(`[db] Creating table ${key}.`)
        transaction.executeSqlAsync(value);
    });

    // Version table
    transaction.executeSqlAsync(`
      CREATE TABLE IF NOT EXISTS Version(
        version_id INTEGER PRIMARY KEY NOT NULL,
        version INTEGER
      );
    `);
  }
  
  // Seed database with test data
  private seedDatabase(transaction: SQLite.SQLTransactionAsync) {
    seedData.forEach((key, value) => {
      console.log(`[db] Seeding table ${key}.`)
      transaction.executeSqlAsync(value);
  });
  }

  // Get the version of the database, as specified in the Version table
  private getDatabaseVersion(database: SQLite.SQLiteDatabase): Promise<number> {
    // Select the highest version number from the version table
    const version = database
      .transactionAsync(async (tx) => {
        const results = await tx.executeSqlAsync("SELECT version FROM Version ORDER BY version DESC LIMIT 1;")
        if (results.rows && results.rows.length > 0) {
        const version = results.rows[0].version;
        return version;
        } else {
        return 0;
        }
      })
      return new Promise((resolve, reject) => 0);
  }

  // Once the app has shipped, use the following functions as a template for updating the database:
  /*
    // This function should be called when the version of the db is < 1
    private preVersion1Inserts(transaction: SQLite.Transaction) {
        console.log("Running pre-version 1 DB inserts");

        // Make schema changes
        transaction.executeSql("ALTER TABLE ...");

        // Lastly, update the database version
        transaction.executeSql("INSERT INTO Version (version) VALUES (1);");
    }

    // This function should be called when the version of the db is < 2
    private preVersion2Inserts(transaction: SQLite.Transaction) {
        console.log("Running pre-version 2 DB inserts");
        
        // Make schema changes
        transaction.executeSql("ALTER TABLE ...");

        // Lastly, update the database version
        transaction.executeSql("INSERT INTO Version (version) VALUES (2);");
    }
    */
}