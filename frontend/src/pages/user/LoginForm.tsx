import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { DecodedToken } from '../../types/auth.types';

type formdata = {
   loginId: string;
   pwd: string;
}

function LoginForm() {

   const dispatch = useDispatch();
   const nav = useNavigate();

   const [state, setState] = useState<formdata>({
      loginId: '',
      pwd: ''
   })

   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault()
      try {
         const res = await axios.post("/api/login", {
            loginId: state.loginId,
            pwd: state.pwd
         })
         const token = res.data.token
         localStorage.setItem("token", token)
         axios.defaults.headers.common['Authorization'] = token;
         const decoded = jwtDecode<DecodedToken>(token.substring(7))
         dispatch({
            type: "USER_INFO",
            payload: {
               id: decoded.id,
               loginId: decoded.sub,
               name: decoded.name,
               profileImageUrl: decoded.profileImageUrl ? `/api/images${decoded.profileImageUrl}` : null // 아직 경로 지정 안됨
            }
         })
         const nowInSeconds = Date.now() / 1000;
         const remainTime = (decoded.exp - nowInSeconds) * 1000;
         const logoutTimer = setTimeout(() => {
            dispatch({ type: "LOGOUT" });
            nav("/");
            alert("세션이 만료되어 자동 로그아웃 되었습니다.");
         }, remainTime);

         dispatch({ type: "SET_LOGOUT_TIMER", payload: logoutTimer });

         alert("로그인 성공!");
         // 8. 로그인 성공 후 원하는 페이지로 이동 (e.g., 메인 페이지)
         nav("/");
         // 또는 모달을 사용하는 경우 onClose() 호출
         alert("로그인 성공!")
         
      } catch (err) {
         console.log(err);
      }
   }



   function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      setState({
         ...state,
         [e.target.name]: e.target.value
      })
   }

   return (
      <div className='flex flex-col'>
         <h2 className='text-center text-3xl font-bold text-zinc-700 mb-8'>로그인</h2>
         <form className='flex flex-col' onSubmit={handleSubmit}>
            <div className='flex flex-col'>
               <label className='mb-1 font-semibold text-zinc-600 ml-2' htmlFor="loginId">아이디</label>
               <input onChange={handleChange} className='bg-slate-300 rounded h-12 mb-4 px-2' type="text" name='loginId' id='loginId' placeholder='아이디를 입력하세요' value={state.loginId} />
            </div>
            <div className='flex flex-col'>
               <label className='mb-1 font-semibold text-zinc-600 ml-2' htmlFor="pwd">비밀번호</label>
               <input onChange={handleChange} className='bg-slate-300 rounded h-12 mb-4 px-2' type="password" name='pwd' id='pwd' placeholder='비밀번호를 입력하세요' value={state.pwd} />
            </div>
            <button type='submit' className='bg-blue-500 rounded w-20 h-10 text-base text-zinc-700 font-semibold self-end'>로그인</button>
         </form>
      </div>
   );
}

export default LoginForm;