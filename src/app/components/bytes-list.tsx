import { Byte } from "../types";

export default function BytesList(
  { bytes }: { bytes: Array<Byte> }
) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {bytes && bytes.map((byte: Byte) => (
        <div
          key={byte.id}
          className="p-4 border border-gray-200 rounded-md shadow-sm"
        >
          <h2>{byte.title}</h2>
          <p>{byte.summary}</p>
        </div>
      ))}
    </div>
  );
}
