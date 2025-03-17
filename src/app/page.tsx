import AutoComplete from "./components/auto-complete";
import ByteList from "./components/byte-list";
import { getBytes } from "./database/bytes";
import { Byte } from "./types";

export default async function Home() {
  const bytes = await getBytes() as Byte[];

  return (
  <>
    <AutoComplete />
    <ByteList bytes={bytes} />
  </> 
  );
}
