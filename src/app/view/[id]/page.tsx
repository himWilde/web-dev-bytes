import { getByte } from "@/app/database/bytes";
import { ByteBlock } from "@/app/types";
import FormatBlocks from "@/app/components/format-blocks";

export default async function View({ params }: { params: { id: string } }) {
  const byte = await getByte(params.id);
  
  return (
    <div className="w-[720px]">
      {byte && byte.content.blocks.map((block: ByteBlock) => (
        <FormatBlocks key={block.id} block={block} />
      ))}
    </div>
  );
}