// db.js
import { openDB } from 'idb';

const DB_NAME = 'MyIdb';
const DB_VERSION = 1;
const OBJECT_STORE_NAME = 'cartItems';

export const initializeDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      db.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'productName' });
    },
  });
};
