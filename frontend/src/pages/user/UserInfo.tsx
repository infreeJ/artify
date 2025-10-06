import { useEffect, useState } from "react";
import useGetIdFromToken from "../../hooks/useGetIdFromToken";
import axios from "axios";
import type { IsEdit, UserState } from "../../types/user.types";
import InfoCompo from "../../components/InfoCompo";
import { useNavigate } from "react-router-dom";



function UserInfo() {

   const nav = useNavigate()

   const userId: number | undefined = useGetIdFromToken()

   // 출력되는 상태값
   const [userState, setUserState] = useState<UserState>({
      loginId: "",
      name: "",
      age: null,
      gender: "",
      persona: ""
   });

   // 컴포넌트 렌더링 시 get
   useEffect(() => {
      if (userId) {
         (async () => {
            try {
               const res = await axios.get(`/api/user/${userId}`)
               setUserState(res.data);
            } catch (err) {
               console.log(err);
            }
         })()
      }
   }, [userId])


   // 수정폼 관리용
   const [updateStat, setUpdateState] = useState<UserState>({
      loginId: userState.loginId,
      name: userState.name,
      age: userState.age,
      gender: userState.gender,
      persona: userState.persona
   })

   useEffect(() => {
      setUpdateState(userState)
   }, [userState])


   // input 요소 활성화 여부
   const [isEdit, setIsEdit] = useState<IsEdit>({
      name: false,
      age: false,
      gender: false,
      persona: false
   })

   // input 요소 활성화 핸들러
   function handleEditChange(e: React.MouseEvent<HTMLButtonElement>) {
      const stateName = e.currentTarget.name as keyof UserState
      setUpdateState({
         ...updateStat,
         [stateName]: userState[stateName]
      })
      const editName = e.currentTarget.name as keyof IsEdit
      setIsEdit({
         ...isEdit,
         [editName]: !isEdit[editName]
      })
   }

   // 정보 수정 요청
   async function handleUpdate() {
      try {
         const obj = {
            ...updateStat,
            id: userId
         }
         const res = await axios.patch("/api/user", obj)
         if (res.data == 1) {
            alert("수정 완료")
            setUserState(updateStat)
            setIsEdit({
               name: false,
               age: false,
               gender: false,
               persona: false
            })
         }
      } catch (err) {
         console.log(err);
      }
   }


   return (
      <div className="bg-slate-100 min-h-screen py-10">
         <div className="bg-white w-full max-w-3xl mx-auto rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center h-24 justify-between p-6">
               <div className="flex items-center w-11/12 pl-2">
                  <p className="font-semibold text-xl w-1/6 text-slate-700">아이디</p>
                  <p className="text-slate-800">{userState.loginId}</p>
               </div>
               <div className="flex items-center w-2/12">
                  <button onClick={() => {nav(`/pwd-edit/${userId}`)}} className="text-sm font-semibold text-sky-600 hover:text-sky-700 transition-colors">비밀번호 변경</button>
               </div>
            </div>
            <InfoCompo userState={userState} isEdit={isEdit} handleEditChange={handleEditChange} inputName="name" inputNameKo="이름" updateStat={updateStat} setUpdateState={setUpdateState} />
            <InfoCompo userState={userState} isEdit={isEdit} handleEditChange={handleEditChange} inputName="age" inputNameKo="나이" updateStat={updateStat} setUpdateState={setUpdateState} />
            <InfoCompo userState={userState} isEdit={isEdit} handleEditChange={handleEditChange} inputName="gender" inputNameKo="성별" updateStat={updateStat} setUpdateState={setUpdateState} />
            <InfoCompo userState={userState} isEdit={isEdit} handleEditChange={handleEditChange} inputName="persona" inputNameKo="특징" updateStat={updateStat} setUpdateState={setUpdateState} />
         </div>

         <div className="w-full max-w-3xl mx-auto mt-6 flex justify-end gap-3 px-4">
            <button onClick={handleUpdate} className="px-4 py-2 rounded-lg shadow-sm font-semibold text-sm bg-blue-500 text-white hover:bg-blue-600 transition-colors">수정사항 저장</button>
            <button className="px-4 py-2 rounded-lg shadow-sm font-semibold text-sm bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors">회원 탈퇴</button>
         </div>
      </div>
   );
}

export default UserInfo;