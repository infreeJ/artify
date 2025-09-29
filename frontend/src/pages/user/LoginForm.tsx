import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { DecodedToken } from '../../types/auth.types';

type Formdata = {
   loginId: string;
   pwd: string;
}

interface LoginFormProps {
   onClose: () => void;
}

function LoginForm({onClose}: LoginFormProps) {

   const dispatch = useDispatch();
   const nav = useNavigate();

   const [state, setState] = useState<Formdata>({
      loginId: '',
      pwd: ''
   })

   // 로그인 요청
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

         // 로그인한 유저의 정보 호출
         const infoRes = await axios.get(`/api/user/loginId/${decoded.sub}`)
         
         // store 저장
         dispatch({
            type: "USER_INFO",
            payload: {
               id: infoRes.data.id,
               loginId: decoded.sub,
               name: infoRes.data.name,
               profileImageUrl: infoRes.data.profileImageUrl ? `/api/images${infoRes.data.profileImageUrl}` : null // 아직 경로 지정 안됨
            }
         })

         onClose() // 모달창 비활성화
         alert("로그인 성공!");
         nav("/");
         
      } catch (err) {
         console.log(err);
         alert("로그인에 실패했습니다.")
      }
   }

   // 입력값 변경 핸들러
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