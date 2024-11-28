import { openDatabase } from './db';

const fetchData = async () => {
  const db = await openDatabase();
  if (db) {
    const [results] = await db.executeSql('SELECT * FROM Users');
    console.log(results.rows.raw());  // Logs the rows fetched
  }
};

fetchData();
