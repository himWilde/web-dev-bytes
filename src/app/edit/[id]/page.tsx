'use client';

import { useRef, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import EditorJS from '@editorjs/editorjs';
import EditorConfig from '../../config/editor';

import { getByte, updateByte } from '../../database/bytes';
import { button } from '../../styles';
import { Byte } from '@/app/types';

export default function Edit() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const [byte, setByte] = useState<Byte | null>(null);
  const editorRef = useRef<EditorJS | null>(null);

  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = new EditorJS({...EditorConfig, data: byte?.content});
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!byte) {
      const fetchByte = async () => {
        const byte = await getByte(id);
        setByte(byte);
      };

      fetchByte();
    }

    if (editorRef.current && byte?.content) {
      editorRef.current.render(byte.content);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [byte]);

  const handleUpdate = async () => {
    const outputData = await editorRef.current?.save();

    if (outputData && byte) {
      await updateByte(byte.id, outputData);
      router.push(`/view/${byte.slug}`);
    }
  };

  return (
    <>
      <div id="editorjs"></div>
      <button type="button" className={button} onClick={handleUpdate}>Update</button>
    </>
  );
}