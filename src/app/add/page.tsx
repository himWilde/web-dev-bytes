'use client';

import { useRef, useEffect } from 'react';
import EditorJS from '@editorjs/editorjs';
import EditorConfig from '../config/editor';

import { addByte } from '../database/bytes';
import { button } from '../styles';

export default function Add () {
  const editorRef = useRef<EditorJS | null>(null);

  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = new EditorJS(EditorConfig);
    }
  }, []);

  const handleAdd = async () => {
    const outputData = await editorRef.current?.save();

    if (outputData) addByte(outputData);
  };

  return (
    <>
      <div id="editorjs"></div>
      <button type="button" className={button} onClick={handleAdd}>Add</button>
    </>
  );
}
