import SQLite from 'react-native-sqlite-storage';

// Enable debugging (optional)
SQLite.DEBUG(true);
SQLite.enablePromise(true);

const databaseName = "example.db";

SQLite.openDatabase({ name: ms, location: "default" })
  .then((db) => {
    console.log("Database opened");
    db.executeSql("CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);")
      .then(() => {
        console.log("Table created successfully");
        return db.executeSql("INSERT INTO Users (name) VALUES (?);", ["John Doe"]);
      })
      .then(() => {
        console.log("Data inserted successfully");
      })
      .catch((error) => console.error("Error executing SQL", error));
  })
  .catch((error) => console.error("Failed to open database", error));
