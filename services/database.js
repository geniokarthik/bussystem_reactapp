import SQLite from 'react-native-sqlite-storage';
import RNFS from 'react-native-fs';
import { DATABASE_NAME, SQL_FILE_PATH } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

let db;

export const initializeDatabase = async () => {
  if (!db) {
    db = SQLite.openDatabase(
      { name: DATABASE_NAME, location: 'default' },
      () => console.log('Database opened'),
      error => console.error('Error opening database:', error)
    );
  }

  console.log('Initializing Database...');
  try {
    const sqlFileContent = await readSQLFile();
    console.log('SQL File Content:', sqlFileContent);

    await new Promise((resolve, reject) => {
      db.transaction(
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

    await AsyncStorage.setItem('DATABASE_INITIALIZED', 'true');
    console.log('Database initialized.');
  } catch (error) {
    console.error('Database initialization failed:', error);
  }
};



export const getDatabase = () => {
  if (!db) {
    db = SQLite.openDatabase(
      { name: DATABASE_NAME, location: 'default' },
      () => console.log('Database opened'),
      error => console.error('Error opening database:', error)
    );
  }
  return db;
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
