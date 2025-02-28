import BytesList from "./components/bytes-list";
import { getBytes } from "./database/bytes";
import { Byte } from "./types";

export default async function Home() {
  const bytes = await getBytes() as Byte[];

  return (
    <BytesList bytes={bytes} />
  );
}
