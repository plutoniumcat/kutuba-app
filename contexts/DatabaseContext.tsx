import React, { useContext } from "react";
import { Db, orm } from "../database/Db";

const DatabaseContext = React.createContext<Db | undefined>(undefined);

// To make the next bit of code work with React 18
type Props = {
  children?: React.ReactNode
};

export const DatabaseProvider: React.FunctionComponent<Props> = function(props) {
  return <DatabaseContext.Provider value={orm} {...props} />;
};

// Hook to pull database object from the context and return it.
export function useDatabase(): Db {
  const database = useContext(DatabaseContext);
  if (database === undefined) {
    throw new Error("useDatabase must be used within a DatabaseProvider");
  }
  return database;
}