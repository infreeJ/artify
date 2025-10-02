import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import type { DiaryDetailType } from "../../types/diary.types";


function DiaryDetail() {
   const {id} = useParams();

   const [diaryState, setDiaryState] = useState<DiaryDetailType>({
         title: "",
         content: "",
         mood: "",
         imageName: "",
      })

   // 일기 정보 출력
   useEffect(() => {
      (async () => {
         const res = await axios.get(`/api/diary/detail/${id}`)
         setDiaryState({
            ...diaryState,
            title: res.data.title,
            content: res.data.content,
            mood: res.data.mood,
            imageName: res.data.diaryImage?.uuidDiaryImgName
         })
      })()
   }, [])

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
               <button className="absolute bottom-4 right-4 border-2 border-neutral-300 rounded-md bg-neutral-200 hover:bg-neutral-300 p-1">일기 수정하기</button>
            </div>

            <div className="bg-red-200 flex flex-col items-center w-1/3 border rounded-lg shadow-md pb-12 h-[512px]">
               {diaryState.imageName &&
                  <img src={diaryState.imageName} width="512px" height="512px" alt="생성된 이미지" className="rounded-lg" />
               }
            </div>
         </div>
      </>
   );
}

export default DiaryDetail;