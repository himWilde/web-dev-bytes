'use client';

import { useUser } from "../../database/auth";
import Login from "../../components/login";
import Loader from "@/app/components/loader";

export default function EditLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = useUser();

  if (user === false) return <Loader />;
  if (user === null) return <Login />;
  return children;
}