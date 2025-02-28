import { getByte } from "@/app/database/bytes";
import { ByteBlock } from "@/app/types";
import FormatBlocks from "@/app/components/format-blocks";

export default async function View({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const byte = await getByte(id);
  
  return (
    <div className="w-[720px]">
      {byte && byte.content.blocks.map((block: ByteBlock) => (
        <FormatBlocks key={block.id} block={block} context="view"/>
      ))}
    </div>
  );
}