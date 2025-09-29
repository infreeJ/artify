import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/types";
import { useParams } from "react-router-dom";

interface DiaryDetail {
      title : string
      content : string
      mood : string
}

function DiaryDetail() {

   const {id} = useParams();

   const [diaryState, setDiaryState] = useState<DiaryDetail>({
      title : "",
      content : "",
      mood : ""
   })

   useEffect(() => {
      (async () => {
         const res = await axios.get(`/api/diary/detail/${id}`)
         setDiaryState({
            title : res.data.title,
            content : res.data.content,
            mood : res.data.imageUrl
         })
      })()
   }, [])

   return (
      <>
         <div>
            <h3>{diaryState.title}</h3>
            <div>{diaryState.content}</div>
            <div>{diaryState.mood}</div>
         </div>
      </>
   );
}

export default DiaryDetail;