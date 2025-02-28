'use client';

import { useUser } from "../../database/auth";
import Login from "../../components/login";

export default function EditLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = useUser();

  if (!user) return <Login />;
  return children;
}