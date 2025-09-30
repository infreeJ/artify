import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface DiaryDetail {
   title: string
   content: string
   mood: string
   imageUrl: string
   imageType: string
}

function DiaryDetail() {

   const { id } = useParams();
   const [option, setOption] = useState<string>("") // 추가 요청사항 상태값

   const [diaryState, setDiaryState] = useState<DiaryDetail>({
      title: "",
      content: "",
      mood: "",
      imageUrl: "",
      imageType: ""
   })

   // 입력값 변경 핸들러
   function handleOptionChange(e : React.ChangeEvent<HTMLInputElement>) {
      setOption(e.target.value)
   }

   // 일기 정보 출력
   useEffect(() => {
      (async () => {
         const res = await axios.get(`/api/diary/detail/${id}`)
         setDiaryState({
            title: res.data.title,
            content: res.data.content,
            mood: res.data.mood,
            imageUrl: "",
            imageType: ""
         })
      })()
   }, [])


   // 이미지 생성 요청
   async function handleImageGenerate() {
      try {
         const res = await axios.post("/api/image-generate", {request : diaryState.content + " 이 일기를 바탕으로 이미지를 만들어줘 이미지는 뒤의 요청에 맞게 만들어줘 " + option})
         // setImageUrl(res.data)
         setDiaryState({
            ...diaryState,
            imageUrl: res.data
         })
      } catch (err) {
         console.log(err);
      }
   }

   // 이미지 저장 요청
   async function handleImageSave() {
      const obj = {
         diaryId: id,
         imageUrl: diaryState.imageUrl,
         imageType: "diary"
      }
      try {
         await axios.post("/api/diary-image-save", obj)
      } catch(err) {
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
         {diaryState.imageUrl && <img src={diaryState.imageUrl} width="512px" height="512px" alt="생성된 이미지" />}
         <label htmlFor="option">추가 요청사항</label>
         <input onChange={handleOptionChange} type="text" className="bg-slate-500 rounded-md" name="option" id="option" value={option} />
         <br />
         {diaryState.imageUrl && <button onClick={handleImageGenerate} className="border bg-red-300 rounded-md" type="button">이미지 다시 생성하기</button>}
         {diaryState.imageUrl && <button onClick={handleImageSave} className="border bg-blue-300 rounded-md" type="button">이미지 저장하기</button>}
         {!diaryState.imageUrl && <button onClick={handleImageGenerate} className="border bg-red-300 rounded-md" type="button">이미지 생성하기</button>}
      </>
   );
}

export default DiaryDetail;