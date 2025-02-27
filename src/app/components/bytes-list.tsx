'use client';

import { useRouter } from "next/navigation";
import { Byte, ByteBlock } from "../types";
import FormatBlocks from "./format-blocks";

export default function BytesList(
  { bytes }: { bytes: Byte[] }
) {
  const router = useRouter();

  const handleClick = (slug: string) => {
    router.push(`/view/${slug}`);
  }
  
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 w-[1020px]">
      {bytes && bytes.map((byte: Byte) => (
        <div
          key={byte.id}
          className="p-4 border border-2 border-white rounded-md shadow-sm"
          onClick={() => handleClick(byte.slug || '')}
        >
          {byte.content.blocks.map((block: ByteBlock) => (
            <FormatBlocks key={block.id} block={block} />
          ))}
        </div>
      ))}
    </div>
  );
}
