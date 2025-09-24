import { jwtDecode } from "jwt-decode";
import type { DecodedToken } from "../types/auth.types";
import api from "../api/api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function useAuthJwt() {

const dispatch = useDispatch();
const nav = useNavigate();

useEffect(() => {
   const token = localStorage.getItem("token")

   if (token) {
      try {

         const decoded = jwtDecode<DecodedToken>(token.substring(7))
         const now = Date.now() / 1000

         if (decoded.exp > now) {
            api.defaults.headers.common['Authorization'] = token;
            dispatch({
               type: "USER_INFO",
               payload: {
                  id: decoded.id,
                  loginId: decoded.sub,
                  name: decoded.name,
                  profileImageUrl: decoded.profileImageUrl ? `/api/images${decoded.profileImageUrl}` : null // 아직 경로 지정 안됨
               }
            })

            const remainTime = (decoded.exp - now) * 1000;
            const logoutTimer = setTimeout(() => {
               dispatch({ type: "LOGOUT" })
               nav("/")
               alert("세션이 만료되어 자동 로그아웃 되었습니다.")
            }, remainTime)

            return () => clearTimeout(logoutTimer)

         } else {
            dispatch({ type: "LOGOUT" })
         }
      } catch (err) {
         console.error("유효하지 않은 토큰 : ", err);
         dispatch({ type: "LOGOUT" })
      }
   }
}, [dispatch, nav])
}

export default useAuthJwt;