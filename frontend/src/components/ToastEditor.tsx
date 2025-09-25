// components/ToastEditor.tsx
import type { ToastEditorProps } from '../types/diary.types';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { useRef } from 'react';




export default function ToastEditor({ value = '', height = '400px', onChange }: ToastEditorProps) {
   // useRef의 제네릭 타입으로 react-editor의 Editor 컴포넌트를 지정합니다.
   // 이 ref는 Editor '컴포넌트'를 가리키게 됩니다.
   const editorRef = useRef<Editor>(null);

   const handleChange = () => {
      // ref를 통해 에디터 인스턴스에 접근합니다.
      if (editorRef.current) {
         // getInstance() 메서드로 내부 인스턴스를 가져온 뒤 getMarkdown()을 호출합니다.
         const markdown = editorRef.current.getInstance().getMarkdown();
         onChange?.(markdown);
      }
   };

   // 더 이상 useEffect나 빈 div는 필요 없습니다!
   return (
      <Editor
         // ref를 Editor 컴포넌트에 직접 연결합니다.
         ref={editorRef}
         initialValue={value}
         initialEditType="wysiwyg"
         previewStyle="vertical"
         height={height}
         useCommandShortcut={true}
         // onChange prop을 사용해 변경 이벤트를 처리합니다.
         onChange={handleChange}
      />
   );
}