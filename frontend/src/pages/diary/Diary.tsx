import axios from "axios";
import { useEffect, useState } from "react";
import type { TokenPayload } from "../../types/user.types";
import { jwtDecode } from "jwt-decode";

function Diary() {

   const [diaryList, setDiaryList] = useState();


   const [userId, setUserId] = useState<number | undefined>();
   // 토큰 가져오기
   const token = localStorage.getItem("token");
   // 가져온 토큰 업데이트
   useEffect(() => {
      if (token) {
         const decoded = jwtDecode<TokenPayload>(token);
         setUserId(decoded.userId)
      }
   }, [token, setUserId])


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

   return (
      <div>
         일기 목록 출력 예정
      </div>
   );
}

export default Diary;