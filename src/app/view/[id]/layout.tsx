import { wrapper, title } from "@/app/styles";

export default function ViewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={wrapper}>
      <h1 className={title}>Web Dev Bytes</h1>
      {children}
    </div>
  );
}
