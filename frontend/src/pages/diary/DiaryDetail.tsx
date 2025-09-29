import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/types";
import { useParams } from "react-router-dom";

interface DiaryDetail {
   title: string
   content: string
   mood: string
}

function DiaryDetail() {

   const { id } = useParams();

   const [imageUrl, setImageUrl] = useState<string>()

   const [option, setOption] = useState<string>("")

   const [diaryState, setDiaryState] = useState<DiaryDetail>({
      title: "",
      content: "",
      mood: ""
   })

   function handleOptionChange(e : React.ChangeEvent<HTMLInputElement>) {
      setOption(e.target.value)
   }

   useEffect(() => {
      (async () => {
         const res = await axios.get(`/api/diary/detail/${id}`)
         setDiaryState({
            title: res.data.title,
            content: res.data.content,
            mood: res.data.mood
         })
      })()
   }, [])

   async function handleImageGenerate() {
      try {
         const res = await axios.post("/api/image-generate", {request : diaryState.content + " 이 일기를 바탕으로 이미지를 만들어줘 이미지는 뒤의 요청에 맞게 만들어줘 " + option})
         setImageUrl(res.data)
      } catch (err) {
         console.log(err);
      }
   }

   return (
      <>
         <div>
            <h3>{diaryState.title}</h3>
            <div>{diaryState.content}</div>
            <div>{diaryState.mood}</div>
         </div>
         {imageUrl && <img src={imageUrl} width="512px" height="512px" alt="생성된 이미지" />}
         <label htmlFor="option">추가 요청사항</label>
         <input onChange={handleOptionChange} type="text" className="bg-slate-500 rounded-md" name="option" id="option" value={option} />
         <br />
         {imageUrl && <button onClick={handleImageGenerate} className="border bg-red-300 rounded-md" type="button">이미지 다시 생성하기</button>}
         {!imageUrl && <button onClick={handleImageGenerate} className="border bg-red-300 rounded-md" type="button">이미지 생성하기</button>}
      </>
   );
}

export default DiaryDetail;