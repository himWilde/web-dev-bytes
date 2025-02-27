import BytesList from "./components/bytes-list";
import { getBytes } from "./database/bytes";
import { Byte } from "./types";
import { title, wrapper } from "./styles";

export default async function Home() {
  const bytes = await getBytes() as Byte[];

  return (
    <div className={wrapper}>
      <h1 className={title}>Web Dev Bytes</h1>
      <BytesList bytes={bytes} />
  </div>
  );
}
