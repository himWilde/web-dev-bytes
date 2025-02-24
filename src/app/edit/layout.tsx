'use client';

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../database/config";
import Login from "../components/login";

export function useUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => setUser(user));
  }, []);

  return user;
} 

export default function EditLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = useUser();
  if (!user) return <Login />
  return children;
}
