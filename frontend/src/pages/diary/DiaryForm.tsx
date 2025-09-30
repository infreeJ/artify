import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { DiaryInputType } from "../../types/diary.types";

function DiaryForm() {

   const nav = useNavigate();

   const [inputState, setInputState] = useState<DiaryInputType>({
      title: "",
      content: "",
      mood: ""
   })

   const moodOptions = [
      { name: 'angry', icon: '😠', value: "1" },
      { name: 'sad', icon: '😢', value: "2" },
      { name: 'neutral', icon: '😐', value: "3" },
      { name: 'good', icon: '😊', value: "4" },
      { name: 'happy', icon: '😄', value: "5" },
   ];


   // 입력값 변경 핸들러
   function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | React.MouseEvent<HTMLButtonElement>) {
      setInputState({
         ...inputState,
         [e.currentTarget.name]: e.currentTarget.value
      })
   }

   function handleBtnClick() {
      nav("/diary/image-form", {
         state: {
            title: inputState.title,
            content: inputState.content,
            mood: inputState.mood
         }
      })
   }


   return (
      <>
         <div className="pl-4 pr-4 w-6/12 mx-auto relative">

            <div>
               <label htmlFor="title"></label>
               <input onChange={handleChange} value={inputState.title} className="w-full h-14 mt-6 mb-4 border-2 border-gray-200 focus:border-blue-200 focus:outline-none pl-4 pr-4 rounded-md text-base" type="text" name="title" id="title" placeholder="오늘의 제목" />
            </div>
            {/* <ToastEditor value={content} height="530px" onChange={handleContentChange} /> */}
            <label htmlFor="content"></label>
            <textarea value={inputState.content} onChange={handleChange} placeholder="오늘 하루는 어땠나요?" className="w-full h-[27rem] p-4 border-2 border-gray-200 rounded-md focus:ring-2 focus:ring-blue-200 focus:outline-none font-sans text-sm" name="content" id="content" />
            <div className="w-72 mt-4">
               <h5 className="text-base font-semibold mb-2 text-neutral-600">오늘의 기분은 어떠셨나요?</h5>
               <div className="flex items-center justify-center space-x-4">
                  {moodOptions.map((mood) => (
                     <button name="mood" value={mood.value} key={mood.name} type="button" onClick={handleChange}
                        className={`p-2 rounded-full text-2xl transition-transform transform ${inputState.mood === mood.value
                           ? 'bg-blue-100 ring-2 ring-blue-300 scale-90'
                           : 'hover:bg-gray-200'}`}>
                        {mood.icon}
                     </button>
                  ))}
               <button onClick={handleBtnClick} type="button" className="absolute right-4 border bg-blue-300 hover:bg-blue-400 text-neutral-800 p-2 rounded-lg text-base font-semibold">이미지 만들러가기</button>
               </div>
            </div>
         </div>
      </>
   );
}

export default DiaryForm;