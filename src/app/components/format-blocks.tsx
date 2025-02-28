import { ByteBlock } from "@/app/types";

const blockComponents = {
  header: ({ id, text, context }: { id: string; text: string, context: string }) => {
    if (context === "view") {
      return (
        <h2
          className="text-4xl font-bold mb-10"
          key={id}
          dangerouslySetInnerHTML={{ __html: text }}
        />
      );
    }
    if (context === "list") {
      return (
        <h3
          className="text-2xl font-bold mb-4"
          key={id}
          dangerouslySetInnerHTML={{ __html: text }}
        />
      );
    }
  },
  paragraph: ({ id, text }: { id: string; text: string }) => (
    <p
      key={id}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  ),
};

const FormatBlocks = ({ block, context }: { block: ByteBlock, context: string }) => {
  const Component = blockComponents[block.type as keyof typeof blockComponents];
  return Component ? <Component id={block.id} text={block.data.text} context={context} /> : null;
}

export default FormatBlocks;