import { ByteBlock } from "@/app/types";

const blockComponents = {
  header: ({ id, text }: { id: string; text: string }) => (
    <h2
      className="text-2xl font-bold mb-4"
      key={id}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  ),
  paragraph: ({ id, text }: { id: string; text: string }) => (
    <p
      key={id}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  ),
};

const FormatBlocks = ({ block }: { block: ByteBlock }) => {
  const Component = blockComponents[block.type as keyof typeof blockComponents];
  return Component ? <Component id={block.id} text={block.data.text} /> : null;
}

export default FormatBlocks;