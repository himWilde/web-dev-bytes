import { getBytes } from "./database/bytes";
import BytesList from "./components/bytes-list";

export default async function Home() {
  const bytes = await getBytes();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Web Dev Bytes</h1>
      <BytesList bytes={bytes} />
  </div>
  );
}
