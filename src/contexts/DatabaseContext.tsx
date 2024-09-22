import React, { useContext } from "react";
import { Database, sqliteDatabase } from "../database/Db";

// Initialize database context.
const DatabaseContext = React.createContext<Database | undefined>(undefined);

// Database context provider
// TODO - Does Element type cause problems here?
export const DatabaseProvider: React.FunctionComponent<Element> = function(props: Element) {
  return <DatabaseContext.Provider value={sqliteDatabase} {...props} />;
};

// Hook to pull our database object from the context and return it.
// Inspired by the Kent C. Dodds approach to using context: https://kentcdodds.com/blog/how-to-use-react-context-effectively
export function useDatabase(): Database {
  const database = useContext(DatabaseContext);
  if (database === undefined) {
    throw new Error("[DatabaseContext] useDatabase must be used within a DatabaseProvider");
  }
  return database;
}