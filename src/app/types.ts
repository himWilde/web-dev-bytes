export type Byte = {
  id: string;
  slug: string;
  content: ByteContent;
}

export type ByteContent = {
  blocks: ByteBlock[];
  time: number;
  version: string;
}

export type ByteBlock = {
  id: string;
  type: string;
  data: {
    text: string;
    level?: number;
  }
}

export type AutoComplete = {
  title: string;
  link: string;
  length: number;
}
