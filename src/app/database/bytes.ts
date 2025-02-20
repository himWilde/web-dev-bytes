import { collection, getDocs } from "firebase/firestore";
import { db } from "./config";

async function getBytes() {
  const query = collection(db, 'bytes');
  const querySnapshot = await getDocs(query);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    title: doc.data().title,
    summary: doc.data().summary,
    tags: doc.data().tags,
  }));
}

export { getBytes };
