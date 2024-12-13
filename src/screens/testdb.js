import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { openDatabase } from '../db';

const TestDbScreen = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = await openDatabase();
        if (db) {
          db.transaction((tx) => {
            tx.executeSql(
              'SELECT * FROM Users', // Replace 'Users' with your table name
              [],
              (tx, results) => {
                const rows = results.rows;
                const data = [];
                for (let i = 0; i < rows.length; i++) {
                  data.push(rows.item(i));
                }
                console.log(data); // Logs the fetched rows
              },
              (error) => {
                console.error('Error executing SQL:', error);
              }
            );
          });
        }
      } catch (error) {
        console.error('Error opening database:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View>
      <Text>Database Test Screen</Text>
    </View>
  );
};

export default TestDbScreen;
