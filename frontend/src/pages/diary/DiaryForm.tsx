

import { useEffect, useState } from "react";
import ToastEditor from "../../components/ToastEditor";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";

function DiaryForm() {

   const [content, setContent] = useState<string>(' ')

   const nav = useNavigate();

   function handleContentChange(content: string) {
      setContent(content)
   }

   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      const formData = new FormData(e.target) 

      try {
         const res = await api.post("/api/diary")
         alert("저장 완료")
         nav(`/diary/${res.data.id}`)
      } catch(err) {
         console.log(err);
      }
   }


   return (
      <div className="pl-4 pr-4">

         <form onSubmit={handleSubmit}>
            <label htmlFor="title"></label>
            <input className="w-full h-16 mt-4 mb-4 border-2 border-gray-300 focus:border-blue-400 focus:outline-none pl-4 pr-4 rounded-md" type="text" name="title" id="title" placeholder="제목을 입력하세요" />
            <ToastEditor value={content} height="550px" onChange={handleContentChange} />
            <button type="submit" className="absolute right-10 mt-6 border bg-blue-300 rounded-lg text-xl font-semibold">작성하기</button>
         </form>

      </div>
   );
}

export default DiaryForm;