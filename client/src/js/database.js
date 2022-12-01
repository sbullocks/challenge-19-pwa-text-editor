import { openDB } from 'idb';

const initdb = async () =>
// We are creating a new database named 'contact' which will be using version 1 of the database.
  openDB('jate', 1, {
    // Add our database schema if it has not already been initialized.
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      // Create a new object store for the data and give it an key name of 'id' which needs to increment automatically.
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Export a function we will use to POST to the database.
// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.error('putDb not implemented');

  // Create a connection to the database database and version we want to use.
  const contactDb = await openDB('contact', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = contactDb.transaction('contact', 'readwrite');

  // Open up the desired object store.
  const store = tx.objectStore('contact');

  // Use the .add() method on the store and pass in the content.
  const request = store.add({ name: name, home_phone: home, cell_phone: cell, email: email });

  // Get confirmation of the request.
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};
;
// Export a function we will use to GET to the database.
// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => { 
  console.error('getDb not implemented');

  // Create a connection to the database database and version we want to use.
  const contactDb = await openDB('contact', 1);

  // Create a new transaction and specify the database and data privileges.
    const tx = contactDb.transaction('contact', 'readonly');

  // Open up the desired object store.
  const store = tx.objectStore('contact');

  // Use the .getAll() method to get all data in the database.
    const request = store.getAll();

  // Get confirmation of the request.
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
