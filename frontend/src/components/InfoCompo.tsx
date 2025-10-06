import type { Dispatch, SetStateAction } from "react";
import type { IsEdit, UserState } from "../types/user.types";


interface InfoCompoType {
   userState: UserState
   isEdit: IsEdit
   handleEditChange: (e: React.MouseEvent<HTMLButtonElement>) => void
   inputName: keyof IsEdit
   inputNameKo: string
   updateStat: UserState
   setUpdateState: Dispatch<SetStateAction<UserState>>;
}


// 회원 정보 페이지에 들어갈 부품 컴포넌트
function InfoCompo({ userState, isEdit, handleEditChange, inputName, inputNameKo, updateStat, setUpdateState }: InfoCompoType) {

   // input 요소 값 변경 핸들러
   function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
      setUpdateState({
         ...updateStat,
         [e.target.name]: e.target.value
      })
   }

   // button 요소 값 변경 핸들러
   function handelGenderChange(e: React.MouseEvent<HTMLButtonElement>) {
      setUpdateState({
         ...updateStat,
         [e.currentTarget.name]: e.currentTarget.value
      })
   }

   return (
      <>
         <div className="flex justify-between p-6 border-t border-slate-200">
            <div className="flex items-start w-11/12 pl-2 pt-1">
               <p className="font-semibold text-xl w-1/6 text-slate-700">{inputNameKo}</p>
               {!isEdit[inputName]
                  ? (inputName !== "gender"
                     ? <p className="h-10 flex items-center text-slate-800">{userState[inputName]}</p>
                     : <p className="h-10 flex items-center font-semibold text-slate-800">{userState[inputName] === "1" ? "남자" : "여자"}</p>
                  )
                  : (inputName !== "gender"
                     ? (inputName === "persona"
                        ? <textarea onChange={handleInputChange} className="h-40 w-2/3 p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition" name={inputName} value={updateStat[inputName] as string} placeholder="자신을 나타내는 특징을 알려주세요."></textarea>
                        : <input onChange={handleInputChange} className="rounded-md w-1/2 h-10 px-2 border border-slate-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition focus:outline-none" type="text" name={inputName} value={updateStat[inputName] as string} placeholder="입력하면 더 좋은 사진을 만들 수 있어요!" />
                     )
                     : <div className='flex justify-around h-10 w-1/3 bg-slate-200 rounded-lg p-1'>
                        <button onClick={handelGenderChange} type='button' name='gender' className={`w-full rounded-md py-1 text-sm font-semibold transition-colors ${updateStat.gender === "1" ? 'bg-blue-500 text-white shadow-sm' : 'bg-transparent text-slate-600'}`} value='1'>남자</button>
                        <button onClick={handelGenderChange} type='button' name='gender' className={`w-full rounded-md py-1 text-sm font-semibold transition-colors ${updateStat.gender === "2" ? 'bg-blue-500 text-white shadow-sm' : 'bg-transparent text-slate-600'}`} value='2'>여자</button>
                     </div>
                  )
               }
            </div>
            <div className={`flex w-1/12 pt-1`}>
               {!isEdit[inputName]
                  ? <button onClick={handleEditChange} name={inputName} className="font-semibold text-sm text-green-600 hover:text-green-700 transition-colors">수정</button>
                  : <button onClick={handleEditChange} name={inputName} className="font-semibold text-sm text-gray-500 hover:text-gray-700 transition-colors">취소</button>
               }
            </div>
         </div>
      </>
   );
}



export default InfoCompo;