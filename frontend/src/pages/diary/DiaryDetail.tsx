import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import type { DiaryDetailSaveType } from "../../types/diary.types";
import DiaryImageForm from "./DiaryImageForm";
import axios from "axios";


function DiaryDetail() {

   const nav = useNavigate();

   const location = useLocation();

   const { diaryId } = useParams();


   const [diaryState, setDiaryState] = useState<DiaryDetailSaveType>({
      title: "",
      content: "",
      mood: "",
      imageUrl: "",
      imageType: "",
      savedDiaryImageName: ""
   })
   

   useEffect(() => {
      if (location.state) {
         setDiaryState({
            ...diaryState,
            title: location.state.title,
            content: location.state.content,
            mood: location.state.mood,
         })
      } else if (diaryId) {
         (async () => {
            try {
               const res = await axios.get(`/api/diary/detail/${diaryId}`)
               setDiaryState({
                  ...diaryState,
                  title: res.data.title,
                  content: res.data.content,
                  mood: res.data.mood,
                  savedDiaryImageName: res.data.savedDiaryImageName
               })
            } catch (err) {
               console.log(err);
            }
         })()
      }
   }, [diaryId, location])




   // 일기 작성 폼으로 돌아가기
   function handelDiaryModify() {
      nav("/diary-form", { // 상태값 전달
         state: {
            title: diaryState.title,
            content: diaryState.content,
            mood: diaryState.mood
         }
      })
   }

   function handleImageModify() {
      nav("/diary/detail")
   }




   return (
      <>
         <div className="flex flex-row mt-8 mx-auto gap-14 justify-center items-center">
            <div className="bg-gray-100 flex flex-col items-center w-1/3 border rounded-lg shadow-md pb-12 h-[512px] relative p-5">
               <br />
               <br />
               <h3 className="font-bold text-xl text-neutral-600">{diaryState.title}</h3>
               <br />
               <br />
               <p className="text-neutral-700 text-sm">{diaryState.content}</p>
               <button onClick={handelDiaryModify} className="absolute bottom-16 right-4 border-2 border-neutral-300 rounded-md bg-neutral-200 hover:bg-neutral-300 p-1">일기 수정하기</button>
               <button onClick={handleImageModify} className="absolute bottom-4 right-4 border-2 border-indigo-300 rounded-md bg-indigo-200 hover:bg-indigo-300 p-1">이미지 수정하기</button>
            </div>

            {!diaryId && <DiaryImageForm diaryState={diaryState} setDiaryState={setDiaryState} />}

            <div className="bg-red-200 flex flex-col items-center w-1/3 border rounded-lg shadow-md pb-12 h-[512px]">
               {diaryState.imageUrl &&
                  <img src={diaryState.imageUrl} width="512px" height="512px" alt="생성된 이미지" className="rounded-lg" />
               }
               {diaryState.savedDiaryImageName && !location.state && !diaryState.imageUrl &&
                  <img src={`http://localhost:9001/images/diary-images/${diaryState.savedDiaryImageName}`} width="512px" height="512px" alt="생성된 이미지" className="rounded-lg" />
               }
            </div>
         </div>

      </>
   );
}

export default DiaryDetail;