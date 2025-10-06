import { useParams } from "react-router-dom";


function PwdEditForm() {
   
   const {userId} = useParams();

   return (
      <div className='flex flex-col'>
         <h2 className='text-center text-3xl font-bold text-zinc-700 mb-8'>로그인</h2>
         <form className='flex flex-col'>
            <div className='flex flex-col'>
               <label className='mb-1 font-semibold text-zinc-600 ml-2' htmlFor="loginId">아이디</label>
               <input className='bg-slate-300 rounded h-12 mb-4 px-2' type="text" name='loginId' id='loginId' placeholder='아이디를 입력하세요' />
            </div>
            <div className='flex flex-col'>
               <label className='mb-1 font-semibold text-zinc-600 ml-2' htmlFor="pwd">비밀번호</label>
               <input className='bg-slate-300 rounded h-12 mb-4 px-2' type="password" name='pwd' id='pwd' placeholder='비밀번호를 입력하세요' />
            </div>
            <button type='submit' className='bg-blue-500 rounded w-20 h-10 text-base text-zinc-700 font-semibold self-end'>로그인</button>
         </form>
      </div>
   );
}

export default PwdEditForm;