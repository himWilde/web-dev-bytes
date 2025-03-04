import {
  onDocumentCreated
} from "firebase-functions/v2/firestore";
import * as admin from 'firebase-admin';

admin.initializeApp();

exports.updateIndex = onDocumentCreated('bytes/{id}', event => {
  const byteId = event.params.id;
  const snapshot = event.data;

  if (!snapshot) {
    console.log("No data associated with the event");
    return;
  }

  const byte = snapshot.data();
  console.log('byte', byte);
  const searchableIndex = createIndex(byte.title)
  const indexedMovie = { ...byte, searchableIndex }
  const db = admin.firestore()

  return db.collection('bytes').doc(byteId).set(indexedMovie, { merge: true })
})

function createIndex(title: string) {
    const arr = title.toLowerCase().split('');
    const searchableIndex = {} as Record<string, boolean>;

    let prevKey = '';

    for (const char of arr) {
        const key = prevKey + char;
        searchableIndex[key] = true
        prevKey = key
    }

    return searchableIndex
}