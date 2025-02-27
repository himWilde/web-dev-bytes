import { Byte, ByteBlock } from "../types";

const FormatBlock = ({ block }: { block: ByteBlock }) => {
  switch (block.type) {
    case 'header':
      return (
        <h2
          className="text-2xl font-bold mb-4"
          key={block.id}
          dangerouslySetInnerHTML={{ __html: block.data.text }}
        />
      );
    case 'paragraph':
      return (
        <p
          key={block.id}
          dangerouslySetInnerHTML={{ __html: block.data.text }}
        />
      );
    default:
      return null;
  }
}

export default function BytesList(
  { bytes }: { bytes: Byte[] }
) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {bytes && bytes.map((byte: Byte) => (
        <div
          key={byte.id}
          className="p-4 border border-gray-200 rounded-md shadow-sm"
        >
          {byte.content.blocks.map((block: ByteBlock) => (
            <FormatBlock key={block.id} block={block} />
          ))}
        </div>
      ))}
    </div>
  );
}
