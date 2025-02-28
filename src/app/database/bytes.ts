import { collection, getDocs, addDoc, query, where, updateDoc, doc } from "firebase/firestore";
import { User } from "firebase/auth";
import { toast } from "react-toastify";
import { db, auth } from "./config";
import { Byte, ByteContent } from "../types";
// import { formatTags } from "./helpers";

export async function getBytes(): Promise<Byte[]> {
  const query = collection(db, 'bytes');
  const querySnapshot = await getDocs(query);

  const bytes = querySnapshot.docs.map((doc) => ({
    id: doc.id as string,
    slug: doc.data().slug as string,
    content: doc.data().content as ByteContent,
  }));

  // randomize the bytes
  for (let i = bytes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [bytes[i], bytes[j]] = [bytes[j], bytes[i]];
  }

  return bytes;
}

export function createSlug(content: ByteContent): string {
  const slug = content.blocks[0].data.text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return slug;
}

export async function checkSlug(slug: string): Promise<boolean> {
  const q = query(collection(db, "bytes"), where("slug", "==", slug));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
}

export async function getByte(slug: string): Promise<Byte> {
  const q = query(collection(db, "bytes"), where("slug", "==", slug));
  const querySnapshot = await getDocs(q);

  return {
    id: querySnapshot.docs[0].id as string,
    slug: querySnapshot.docs[0].data().slug as string,
    content: querySnapshot.docs[0].data().content as ByteContent,
  };
}

export async function addByte(content: ByteContent): Promise<string | undefined> {
  const user = auth.currentUser as User;
  const slug = createSlug(content);
  const isSlugTaken = await checkSlug(slug);

  if (isSlugTaken) {
    toast.error("Title is already taken!");
    return;
  }

  try {
    const docRef = await addDoc(collection(db, "bytes"), {
      content,
      slug,
      userId: user.uid,
    });

    console.log("Document written with ID:", docRef.id);
  } catch (error) {
    console.error("Error adding document:", error);
  } finally {
    return slug;
  }
}
export async function updateByte(id: string, content: unknown) {
  const user = auth.currentUser as User;

  try {
    const docRef = doc(db, "bytes", id);
    await updateDoc(docRef, {
      content,
      userId: user.uid
    });

    console.log("Document updated with ID:", id);
  } catch (error) {
    console.error("Error updating document:", error);
  }
}


