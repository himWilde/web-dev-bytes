'use client';

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Byte, ByteBlock } from "../types";
import FormatBlocks from "./format-blocks";
import { container, card } from "../styles";

export default function ByteList(
  { bytes }: { bytes: Byte[] }
) {
  const router = useRouter();
  const columnsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [columns] = useState<number>(3);

  // Group bytes into columns
  const columnedBytes = bytes.reduce((acc: Byte[][], byte, index) => {
    const columnIndex = index % columns;
    if (!acc[columnIndex]) acc[columnIndex] = [];
    acc[columnIndex].push(byte);
    return acc;
  }, []);

  const setColumnRef = (column: number) => (ref: HTMLDivElement | null) => {
    columnsRef.current[column] = ref;
  }

  const handleClick = (slug: string) => {
    router.push(`/view/${slug}`);
  }
  
  return (
    <div className={container}>
      {columnedBytes.map((columnBytes, columnIndex) => (
        <div key={columnIndex} ref={setColumnRef(columnIndex)} className="flex flex-col gap-8">
          {columnBytes.map((byte: Byte) => (
            <div
              key={byte.id}
              className={card}
              onClick={() => handleClick(byte.slug)}
            >
              {byte.content.blocks.map((block: ByteBlock) => (
                <FormatBlocks key={block.id} block={block} context="list" />
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
