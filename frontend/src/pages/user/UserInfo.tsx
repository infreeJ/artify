import { useEffect, useState } from "react";
import useGetIdFromToken from "../../hooks/useGetIdFromToken";
import axios from "axios";
import type { IsEdit, UserState } from "../../types/user.types";
import InfoCompo from "../../components/InfoCompo";



function UserInfo() {

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
   async function handleUpdate(e: React.MouseEvent<HTMLButtonElement>) {
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
      <div className="flex flex-col">
         <div className="bg-neutral-300 w-1/2 mx-auto mt-10 rounded-lg shadow-md">
            <div className="flex items-center justify-between p-8 border-neutral-400 relative">
               <div className="flex items-center w-11/12 pl-6">
                  <p className="font-semibold text-xl w-1/6">아이디</p>
                  <p>{userState.loginId}</p>
               </div>
               <div className="flex items-center w-2/12">
                  <button className="absolute text-green-700 hover:text-green-800 p-2 rounded-md font-semibold text-base cursor-pointer">비밀번호 변경</button>
               </div>
            </div>
            <InfoCompo userState={userState} isEdit={isEdit} handleEditChange={handleEditChange} inputName="name" inputNameKo="이름" updateStat={updateStat} setUpdateState={setUpdateState} />
            <InfoCompo userState={userState} isEdit={isEdit} handleEditChange={handleEditChange} inputName="age" inputNameKo="나이" updateStat={updateStat} setUpdateState={setUpdateState} />
            <InfoCompo userState={userState} isEdit={isEdit} handleEditChange={handleEditChange} inputName="gender" inputNameKo="성별" updateStat={updateStat} setUpdateState={setUpdateState} />
            <InfoCompo userState={userState} isEdit={isEdit} handleEditChange={handleEditChange} inputName="persona" inputNameKo="특징" updateStat={updateStat} setUpdateState={setUpdateState} />
         </div>

         <div className="w-1/2 mx-auto mt-8 relative">
            <button onClick={handleUpdate} className="absolute right-32 bg-blue-300 hover:bg-blue-400 p-2 rounded-md shadow-md font-semibold text-base cursor-pointer">수정사항 저장</button>
            <button className="absolute right-4 bg-neutral-300 hover:bg-neutral-400 p-2 rounded-md shadow-md font-semibold text-base cursor-pointer">회원 탈퇴</button>
         </div>
      </div>
   );
}

export default UserInfo;