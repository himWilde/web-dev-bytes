import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import { signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { db, auth } from "./config";
import { Byte, ByteContent } from "../types";
// import { formatTags } from "./helpers";

export async function getBytes(): Promise<Byte[]> {
  const query = collection(db, 'bytes');
  const querySnapshot = await getDocs(query);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id as string,
    slug: doc.data().slug as string,
    content: doc.data().content as ByteContent,
  }));
}

export async function isSlugTaken(slug: string): Promise<boolean> {
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

export async function addByte(content: unknown) {
  const user = auth.currentUser as User;

  try {
    const docRef = await addDoc(collection(db, "bytes"), {
      content,
      userId: user.uid,
    });

    console.log("Document written with ID:", docRef.id);
  } catch (error) {
    console.error("Error adding document:", error);
  }
}

export async function login(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('Logged in as: ', userCredential.user.email);
    })
    .catch((error) => {
      console.error('Failed to login: ', error.message);
    });
}

export async function logout() {
  await signOut(auth).then(() => {
    console.log('User signed out');
  });
};
