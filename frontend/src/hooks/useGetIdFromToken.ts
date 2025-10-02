import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import type { TokenPayload } from "../types/user.types";


function useGetIdFromToken() {
   const [userId, setUserId] = useState<number | undefined>();
   // 토큰 가져오기

   // 가져온 토큰 업데이트
   useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
         try {
            const decoded = jwtDecode<TokenPayload>(token);
            setUserId(decoded.userId)
         } catch (err) {
            console.log(err);
            setUserId(undefined);
         }
      } else {
         setUserId(undefined);
      }
   }, [])
   return userId;
}

export default useGetIdFromToken;