import { useEffect, useState } from "react";
import useGetIdFromToken from "../../hooks/useGetIdFromToken";
import axios from "axios";
import type { IsEdit, UserState } from "../../types/user.types";



function UserInfo() {

   const userId: number | undefined = useGetIdFromToken()

   const [userState, setUserState] = useState<UserState>({
      loginId: "",
      name: "",
      age: null,
      gender: "",
      persona: ""
   });

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


   const [isEdit, setIsEdit] = useState<IsEdit>({
      name: false,
      age: false,
      gender: false,
      persona: false
   })

   function handleEditChange(e: React.MouseEvent<HTMLButtonElement>) {
      setIsEdit({
         ...isEdit,
         [e.currentTarget.name]: true
      })
   }


   return (
      <div className="flex flex-col">
         <div className="bg-neutral-300 w-1/2 mx-auto mt-10 rounded-lg shadow-md">
            <div className="flex items-center justify-between p-10 border-b-2 border-neutral-400 relative">
               <div className="flex items-center w-10/12">
                  <p className="w-32 font-semibold text-xl">아이디</p>
                  <p>{userState.loginId}</p>
               </div>
               <div className="flex items-center w-2/12">
                  <button className="absolute text-green-700 hover:text-green-800 p-2 rounded-md font-semibold text-base cursor-pointer">비밀번호 변경</button>
               </div>
            </div>

            <div className="flex items-center justify-between p-10 border-b-2 border-neutral-400 relative">
               <div className="flex items-center w-11/12">
                  <p className="w-32 font-semibold text-xl">이름</p>
                  <p>{userState.name}</p>
               </div>
               <div className="flex items-center w-1/12">
                  {isEdit.name == false &&
                     <button onClick={handleEditChange} name="name" className="absolute text-green-700 hover:text-green-800 p-2 rounded-md font-semibold text-base cursor-pointer">수정</button>
                  }
               </div>
            </div>

            <div className="flex items-center justify-between p-10 border-b-2 border-neutral-400 relative">
               <div className="flex items-center w-11/12">
                  <p className="w-32 font-semibold text-xl">나이</p>
                  <p>{userState.age}</p>
               </div>
               <div className="flex items-center w-1/12">
                  {isEdit.age == false &&
                     <button onClick={handleEditChange} name="age" className="absolute text-green-700 hover:text-green-800 p-2 rounded-md font-semibold text-base cursor-pointer">수정</button>
                  }
               </div>
            </div>

            <div className="flex items-center justify-between p-10 border-b-2 border-neutral-400 relative">
               <div className="flex items-center w-11/12">
                  <p className="w-32 font-semibold text-xl">성별</p>
                  <p>{userState.gender == "1" ? "남자" : "여자"}</p>
               </div>
               <div className="flex items-center w-1/12">
                  {isEdit.gender == false &&
                     <button onClick={handleEditChange} name="gender" className="absolute text-green-700 hover:text-green-800 p-2 rounded-md font-semibold text-base cursor-pointer">수정</button>
                  }
               </div>
            </div>

            <div className="flex items-center justify-between p-10 border-neutral-400 relative">
               <div className="flex items-center w-11/12">
                  <p className="w-32 font-semibold text-xl">특징</p>
                  <p>{userState.persona}</p>
               </div>
               <div className="flex items-center w-1/12">
                  {isEdit.persona == false &&
                     <button onClick={handleEditChange} name="persona" className="absolute text-green-700 hover:text-green-800 p-2 rounded-md font-semibold text-base cursor-pointer">수정</button>
                  }
               </div>
            </div>
         </div>
         <div className="w-1/2 mx-auto mt-8 relative">
            <button className="absolute right-32 bg-blue-300 hover:bg-blue-400 p-2 rounded-md shadow-md font-semibold text-base cursor-pointer">수정사항 저장</button>
            <button className="absolute right-4 bg-neutral-300 hover:bg-neutral-400 p-2 rounded-md shadow-md font-semibold text-base cursor-pointer">회원 탈퇴</button>
         </div>
      </div>
   );
}

export default UserInfo;