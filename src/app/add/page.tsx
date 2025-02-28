'use client';

import { useRef, useEffect } from 'react';
import EditorJS from '@editorjs/editorjs';
import EditorConfig from '../config/editor';
import { useRouter } from 'next/navigation';
import { addByte } from '../database/bytes';
import { ByteContent } from '../types';
import { button } from '../styles';

export default function Add () {
  const editorRef = useRef<EditorJS | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = new EditorJS(EditorConfig);
    }
  }, []);

  const handleAdd = async () => {
    const outputData = await editorRef.current?.save();

    if (outputData) {
      const slug = await addByte(outputData as ByteContent);
      if (slug) router.push(`/view/${slug}`);
    }
  };

  return (
    <>
      <div id="editorjs"></div>
      <button type="button" className={button} onClick={handleAdd}>Add</button>
    </>
  );
}
