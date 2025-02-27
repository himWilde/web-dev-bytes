'use client';

import { useRef, useEffect } from 'react';
import EditorJS from '@editorjs/editorjs';
import EditorConfig from '../config/editor';

import { addByte, logout } from '../database/bytes';
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

  const handleLogout = () => logout();
  return (
    <>
      <button type="button" className="mb-10" onClick={handleLogout}>Logout</ button>
      <div id="editorjs"></div>
      <button type="button" className={button} onClick={handleAdd}>Add</button>
    </>
  );
}
