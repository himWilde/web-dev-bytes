import { ToolConstructable } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Paragraph from '@editorjs/paragraph';

const EditorConfig = {
  holder: 'editorjs',
  autofocus: true,
  minHeight: 0,
  tools: { 
    header: {
      class: Header as unknown as ToolConstructable,
      config: {
        levels: [1, 2, 3],
        defaultLevel: 1
      }
    }, 
    list: {
      class: List as unknown as ToolConstructable,
      inlineToolbar: true 
    },
    paragraph: {
      class: Paragraph as unknown as ToolConstructable,
      inlineToolbar: true
    }
  }, 
};

export default EditorConfig;
