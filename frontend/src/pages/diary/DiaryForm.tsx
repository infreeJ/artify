

import {  useState } from "react";
import ToastEditor from "../../components/ToastEditor";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/types";
import axios from "axios";

function DiaryForm() {

   const userId = useSelector((state: RootState) => {return state.userInfo?.id})
   console.log("유저 아이디는 ", userId);
   

   const name = useSelector((state: RootState) => {return state.userInfo?.name})
   
   // const loginId = useSelector((state:RootState) => { return state.userInfo?.loginId})
   const nav = useNavigate();

   const [title, setTitle] = useState<string>(' ')
   const [content, setContent] = useState<string>(' ')
   const [mood, setMood] = useState<string>("2")


   function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
      setTitle(e.target.value)
   }

   function handleContentChange(content: string) {
      setContent(content)
   }

   function handleMoodChange(e: React.ChangeEvent<HTMLInputElement>) {
      setMood(e.target.value)
   }

   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      // const formData = new FormData(e.currentTarget)
      // const obj = Object.fromEntries(formData)
      const obj = { userId, title, content, mood }

      try {
         // console.log(userId);
         
         // console.log(name);

         console.log(obj);
         
         
         const res = await axios.post("/api/diary", obj)
         alert("저장 완료")
         nav(`/diary/detail/${res.data.id}`)
      } catch (err) {
         console.log(err);
      }
   }


   return (
      <>
         <div className="pl-4 pr-4">

            <form onSubmit={handleSubmit}>
               <div>
                  <label htmlFor="title"></label>
                  <input onChange={handleTitleChange} value={title} className="w-full h-16 mt-4 mb-4 border-2 border-gray-300 focus:border-blue-400 focus:outline-none pl-4 pr-4 rounded-md" type="text" name="title" id="title" placeholder="제목을 입력하세요" />
               </div>
               <ToastEditor value={content} height="550px" onChange={handleContentChange} />
               <div className="w-72 mt-4">
                  <label htmlFor="mood-1">나쁨</label>
                  <input onChange={handleMoodChange} type="radio" name="mood" id="mood-1" className="me-4"  value="1"/>
                  <label htmlFor="mood-2">보통</label>
                  <input onChange={handleMoodChange} type="radio" name="mood" id="mood-2" className="me-4" value="2" defaultChecked/>
                  <label htmlFor="mood-3">좋음</label>
                  <input onChange={handleMoodChange} type="radio" name="mood" id="mood-3" value="3"/>
                  <button type="submit" className="absolute right-10 border bg-blue-300 rounded-lg text-xl font-semibold">작성하기</button>
               </div>
            </form>
         </div>
      </>
   );
}

export default DiaryForm;