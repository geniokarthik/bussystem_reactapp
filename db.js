import React, { useEffect } from 'react';
import SQLite from 'react-native-sqlite-storage';
import RNFS from 'react-native-fs';

SQLite.enablePromise(true);

// Function to check if the database exists
async function doesDatabaseExist(dbName) {
  const dbPath = `${RNFS.DocumentDirectoryPath}/${dbName}`;
  console.log('Document Directory Path:', RNFS.DocumentDirectoryPath);
  console.log(RNFS);
  try {
    const exists = await RNFS.exists(dbPath);
    return exists;
  } catch (error) {
    console.error('Error checking database existence:', error);
    return false;
  }
}

// Function to execute SQL statements from a file
async function executeSQLFromFile() {
  const db = await SQLite.openDatabase({name: 'myDatabase.db', location: 'default'});

  // Read the SQL file
  const sqlPath = `${RNFS.DocumentDirectoryPath}/bus.sql`;
  console.log('Document Directory Path:', RNFS.DocumentDirectoryPath);

  const sqlFileContents = await RNFS.readFile(sqlPath);

  // Split the SQL file content into individual statements (assuming each statement ends with a semicolon)
  const sqlStatements = sqlFileContents.split(';').map(statement => statement.trim()).filter(statement => statement.length > 0);

  // Execute each SQL statement
  for (const sql of sqlStatements) {
    await db.executeSql(sql);
  }

  console.log('SQL file executed successfully');
}

// Initialize the database and execute SQL if it's the first time
async function initializeDatabase() {
  const dbExists = await doesDatabaseExist('myDatabase.db');

  if (!dbExists) {
    // If the database doesn't exist, execute the SQL file to set it up
    console.log('Database not found. Initializing database...');
    await executeSQLFromFile();
  } else {
    console.log('Database already initialized.');
  }
}

const App = () => {
  useEffect(() => {
    // Initialize the database on app startup
    initializeDatabase();
  }, []);

  return (
    <></> // Your component's JSX, can be replaced with actual UI components
  );
};

export default App;