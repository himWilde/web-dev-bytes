import { useState, useEffect } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { auth } from "./config";

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

export function useUser() {
  const [user, setUser] = useState<User | null | false>(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => setUser(user));
  }, []);

  return user;
} 
