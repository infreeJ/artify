import type { ToastEditorProps } from '../types/diary.types';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { useRef } from 'react';




export default function ToastEditor({ value = '', height = '400px', onChange }: ToastEditorProps) {
   // useRef의 제네릭 타입으로 react-editor의 Editor 컴포넌트 지정
   // 이 ref는 Editor '컴포넌트'를 가리키게 된다.
   const editorRef = useRef<Editor>(null);

   const handleChange = () => {
      // ref를 통해 에디터 인스턴스에 접근
      if (editorRef.current) {
         // 내부 인스턴스를 가져온 뒤 getMarkdown()을 호출
         const markdown = editorRef.current.getInstance().getMarkdown();
         onChange?.(markdown);
      }
   };


   return (
      <Editor
         // ref를 Editor 컴포넌트에 직접 연결
         ref={editorRef}
         initialValue={value}
         initialEditType="wysiwyg"
         previewStyle="vertical"
         height={height}
         useCommandShortcut={false}
         toolbarItems={[]} 
         hideModeSwitch={true}
         // onChange prop을 사용해 이벤트 처리
         onChange={handleChange}
      />
   );
}