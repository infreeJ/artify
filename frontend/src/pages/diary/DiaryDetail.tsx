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
      <div>
         
      </div>
   );
}

export default DiaryDetail;