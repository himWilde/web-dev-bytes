'use client';

import { useUser } from "../database/auth";
import Loader from "../components/loader";
import Login from "../components/login";

export default function AddLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = useUser();

  if (user === false) return <Loader />;
  if (user === null) return <Login />;
  return children;
}
