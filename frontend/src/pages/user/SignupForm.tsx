import React, { useState } from 'react';
import axios from 'axios';

function SignupForm() {

   const [gender, setGender] = useState<number>();

   function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
      setGender(parseInt(e.currentTarget.value, 10))
   }

   const [state, setState] = useState({
      loginId: '',
      pwd: '',
      pwd2: '',
      name: '',
      age: ''
   });

   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      console.log(gender);
      
      e.preventDefault()
      try {
         const res = axios.post('/api/user', {
            loginId: state.loginId,
            pwd: state.pwd,
            name: state.name,
            age: state.age,
            gender: gender
         })
         console.log(res);
      } catch(err) {
         console.log(err);
      }
   }

   function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      setState({
         ...state,
         [e.target.name] : e.target.value
      })
   }

   return (
      <div className='flex flex-col'>
         <h2 className='font-bold text-3xl self-center mb-8'>회원가입</h2>
         <form className='flex flex-col' onSubmit={handleSubmit}>
            <div className='flex flex-col'>
               <label className='ml-2' htmlFor="loginId">아이디</label>
               <input onChange={handleChange} className='bg-slate-300 rounded h-12 mb-4 px-2' type="text" name='loginId' id='loginId' placeholder='아이디를 입력하세요' value={state.loginId} />
            </div>
            <div className='flex flex-col'>
               <label className='ml-2' htmlFor="pwd">비밀번호</label>
               <input onChange={handleChange} className='bg-slate-300 rounded h-12 mb-4 px-2' type="password" name='pwd' id='pwd' placeholder='비밀번호를 입력하세요' value={state.pwd} />
            </div>
            <div className='flex flex-col'>
               <label className='ml-2' htmlFor="pwd2">비밀번호 확인</label>
               <input onChange={handleChange} className='bg-slate-300 rounded h-12 mb-4 px-2' type="password" name='pwd2' id='pwd2' placeholder='비밀번호를 입력하세요' value={state.pwd2} />
            </div>
            <div className='flex flex-col'>
               <label className='ml-2' htmlFor="name">이름</label>
               <input onChange={handleChange} className='bg-slate-300 rounded h-12 mb-4 px-2' type="text" name='name' id='name' placeholder='이름을 입력하세요' value={state.name} />
            </div>
            <div className='flex flex-col'>
               <label className='ml-2' htmlFor="age">나이</label>
               <input onChange={handleChange} className='bg-slate-300 rounded h-12 mb-4 px-2' type="number" name='age' id='age' placeholder='나이을 입력하세요' value={state.age} />
            </div>
            <div className='flex flex-col'>
               <label className='ml-2' htmlFor="gender">성별</label>
               <div className='flex justify-around w-full h-12 bg-slate-300 rounded-lg p-1'>
                  <button onClick={handleClick} type='button' name='gender' id='gender' className={`transition w-full rounded ${gender == 1 ? 'bg-purple-500' : ''}`} value='1'>남</button>
                  <button onClick={handleClick} type='button' name='gender' id='gender' className={`transition w-full rounded ${gender == 2 ? 'bg-purple-500' : ''}`} value='2'>여</button>
               </div>
            </div>
            <button type='submit' className='bg-blue-500 rounded w-20 h-10 text-base text-zinc-700 font-semibold self-end mt-4'>회원가입</button>

         </form>
      </div>
   );
}

export default SignupForm;