import axios from "axios";
import { useEffect, useState } from "react";
import useGetIdFromToken from "../../hooks/useGetIdFromToken";
import { format } from "date-fns";
import type { DiaryListType } from "../../types/diary.types";
import { useNavigate } from "react-router-dom";



function Diary() {

   const nav = useNavigate();

   const [diaryList, setDiaryList] = useState<DiaryListType>();

   const userId = useGetIdFromToken();

   useEffect(() => {
      if (userId) {
         (async () => {
            try {
               const res = await axios.get(`/api/diary/list/${userId}`)
               console.log(res.data.diaries);
               setDiaryList(res.data.diaries)
            } catch (err) {
               console.log(err);
            }
         })()
      }
   }, [userId])



   function handleDetailNav(id: number) {
      nav(`/diary/detail/${id}`)
   }


   return (
      <>
         <div className="grid grid-cols-4 gap-10 m-14">
            {diaryList?.map(item =>
               <div onClick={() => {handleDetailNav(item.id)}} key={item.id} className="bg-slate-200 flex flex-col rounded-lg shadow-md p-4 hover:cursor-pointer">
                  <div className="h-auto mb-4">
                     <img className="rounded-lg" src={`http://localhost:9001/images/diary-images/${item.savedDiaryImageName}`} alt="일기 이미지" />
                  </div>
                  <div className="h-24 relative border-t-2 border-slate-300">
                     <span className="text-xl font-semibold text-neutral-600 absolute left-3 top-3">{item.title}</span>
                     <span className="absolute bottom-3 right-3 text-sm text-neutral-700">{format(new Date(item.createdAt), `yyyy년 MM월 dd일`)}</span>
                  </div>
               </div>
            )}
         </div>
      </>
   );
}

export default Diary;