'use client';

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../database/config";
import Login from "../components/login";
import { wrapper, title } from "./styles";

function useUser() {
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

  return (
    <div className={wrapper}>
      <h1 className={title}>Web Dev Bytes</h1>
      {!user ? <Login /> : children}
    </div>
  );
}
