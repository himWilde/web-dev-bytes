'use client';

import { useRouter } from "next/navigation";
import { Byte, ByteBlock } from "../types";
import FormatBlocks from "./format-blocks";
import { container, card } from "../styles";

export default function ByteList(
  { bytes }: { bytes: Byte[] }
) {
  const router = useRouter();

  const handleClick = (slug: string) => {
    router.push(`/view/${slug}`);
  }
  
  return (
    <div className={container}>
      {bytes && bytes.map((byte: Byte) => (
        <div
          key={byte.id}
          className={card}
          onClick={() => handleClick(byte.slug)}
        >
          {byte.content.blocks.map((block: ByteBlock) => (
            <FormatBlocks key={block.id} block={block} />
          ))}
        </div>
      ))}
    </div>
  );
}
