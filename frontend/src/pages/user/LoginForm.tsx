import axios from 'axios';
import React, { useState } from 'react';

type formdata = {
   loginId: string;
   pwd: string;
}

function LoginForm() {

   const [state, setState] = useState<formdata>({
      loginId: '',
      pwd: ''
   })

   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault()
      try {
         axios.post("/api/login", {
            loginId: state.loginId,
            pwd: state.pwd
         })
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
               <label className='mb-1 font-semibold text-zinc-600' htmlFor="loginId">아이디</label>
               <input onChange={handleChange} className='bg-slate-300 rounded h-12 mb-4' type="text" name='loginId' id='loginId' placeholder='아이디를 입력하세요' value={state.loginId} />
            </div>
            <div className='flex flex-col'>
               <label className='mb-1 font-semibold text-zinc-600' htmlFor="pwd">비밀번호</label>
               <input onChange={handleChange} className='bg-slate-300 rounded h-12 mb-4' type="password" name='pwd' id='pwd' placeholder='비밀번호를 입력하세요' value={state.pwd} />
            </div>
            <button className='bg-violet-500 rounded w-20 h-10 text-base text-zinc-700 font-semibold self-end'>로그인</button>
         </form>
      </div>
   );
}

export default LoginForm;