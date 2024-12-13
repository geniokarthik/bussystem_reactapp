import SQLite from 'react-native-sqlite-storage';
import RNFS from 'react-native-fs';
import { DATABASE_NAME, SQL_FILE_PATH } from '../common/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

let db;

const openDatabase = async () => {
  if (!db) {
    try {
      db = await SQLite.openDatabase({ name: DATABASE_NAME, location: 'default' });
      console.log('Database opened');
    } catch (error) {
      console.error('Error opening database:', error);
      throw error;
    }
  }
  return db;
};

export const initializeDatabase = async () => {
  try {
    const databaseInitialized = await AsyncStorage.getItem('DATABASE_INITIALIZED');
    if (databaseInitialized === 'true') {
      console.log('Database already initialized.', databaseInitialized);

      return;
    }
  
    console.log('Initializing Database...');
    const sqlFileContent = await readSQLFile();
    console.log('SQL File Content:', sqlFileContent);

    // Open the database
    const dbInstance = await openDatabase();

    // Initialize the database with SQL queries
    await new Promise((resolve, reject) => {
      dbInstance.transaction(
        tx => {
          console.log('Transaction started');
          sqlFileContent.split(';').forEach(query => {
            if (query.trim()) {
              console.log('Executing query:', query);
              tx.executeSql(
                query,
                [],
                () => console.log('Query executed successfully.'),
                (tx, error) => {
                  console.error('SQL execution failed:', error);
                  reject(error);
                }
              );
            }
          });
        },
        error => {
          console.error('Transaction failed:', error);
          reject(error);
        },
        () => {
          console.log('Transaction completed successfully.');
          resolve();
        }
      );
    });

    // Mark database as initialized in AsyncStorage
    await AsyncStorage.setItem('DATABASE_INITIALIZED', 'true');
    console.log('Database initialized.');
  } catch (error) {
    console.error('Database initialization failed:', error);
  }
};

export const getDatabase = async () => {
  try {
    return await openDatabase();
  } catch (error) {
    console.error('Error getting database:', error);
    throw error;
  }
};

const readSQLFile = async () => {
  try {
    const sqlFileContent = await RNFS.readFileAssets(SQL_FILE_PATH, 'utf8');
    return sqlFileContent;
  } catch (error) {
    console.error('Error reading SQL file:', error);
    throw error;
  }
};

export default db;