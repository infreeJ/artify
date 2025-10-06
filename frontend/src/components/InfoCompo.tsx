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
         <div className="flex items-center justify-between p-6 border-t-2 border-neutral-400 relative">
            <div className="flex items-center w-11/12 pl-6">
               <p className="font-semibold text-xl w-1/6">{inputNameKo}</p>
               {!isEdit[inputName]
                  ? (inputName != "gender"
                     ? <p className="h-10 flex items-center">{userState[inputName]}</p>
                     : <p className="h-10 flex items-center">{userState[inputName] == "1" ? "남자" : "여자"}</p>
                  )
                  : (inputName != "gender"
                     ? (inputName == "persona"
                        ? <textarea onChange={handleInputChange} className="h-40 w-2/3" name={inputName} value={updateStat[inputName] as keyof UserState} placeholder="입력하면 더 좋은 사진을 만들 수 있어요!"></textarea>
                        : <input onChange={handleInputChange} className="rounded-md w-1/2 h-10" type="text" name={inputName} value={updateStat[inputName] as keyof UserState} placeholder="입력하면 더 좋은 사진을 만들 수 있어요!" />
                     )
                     : <div className='flex justify-around h-10 w-2/3 bg-slate-300 rounded-lg'>
                        <button onClick={handelGenderChange} type='button' name='gender' id='gender' className={`transition w-full rounded ${updateStat.gender == "1" ? 'bg-purple-500' : ''}`} value='1'>남</button>
                        <button onClick={handelGenderChange} type='button' name='gender' id='gender' className={`transition w-full rounded ${updateStat.gender == "2" ? 'bg-purple-500' : ''}`} value='2'>여</button>
                     </div>
                  )
               }
            </div>
            <div className={`flex items-center w-1/12 ${inputName == "persona" && "h-40"}`}>
               {!isEdit[inputName]
                  ? <button onClick={handleEditChange} name={inputName} className="absolute text-green-700 hover:text-green-800 p-2 rounded-md font-semibold text-base cursor-pointer">수정</button>
                  : <button onClick={handleEditChange} name={inputName} className="absolute text-orange-700 hover:text-orange-800 p-2 rounded-md font-semibold text-base cursor-pointer">취소</button>
               }
            </div>
         </div>
      </>
   );
}



export default InfoCompo;