import {
  onDocumentCreated,
  onDocumentUpdated
} from "firebase-functions/v2/firestore";
import * as admin from 'firebase-admin';

admin.initializeApp();

export const addSearchableIndex = onDocumentCreated({
  document: "bytes/{id}",
  region: "europe-west4",
}, event => {
  const byteId = event.params.id;
  const snapshot = event.data;

  if (!snapshot) {
    console.log("No data associated with the event");
    return;
  }

  const byte = snapshot.data();
  const searchableIndex = createIndex(byte.content.blocks[0].data.text)
  const indexedMovie = { ...byte, searchableIndex }
  const db = admin.firestore()

  return db.collection('bytes').doc(byteId).set(indexedMovie, { merge: true })
})

export const updateSearchableIndex = onDocumentUpdated({
  document: "bytes/{id}",
  region: "europe-west4",
}, event => {
  const byteId = event.params.id;
  const snapshot = event.data;

  if (!snapshot) {
    console.log("No data associated with the event");
    return;
  }

  const byte = snapshot.after.data();
  const searchableIndex = createIndex(byte.content.blocks[0].data.text)
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