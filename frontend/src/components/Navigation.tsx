import cn from 'classnames'
import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/types';
import Modal from './Modal';
import { jwtDecode } from 'jwt-decode';
import type { TokenPayload } from '../types/user.types';

type ModalMode = 'login' | 'signup';

function Navigation() {
   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
   const [modalMode, setModalMode] = useState<ModalMode>('login');

   const dispatch = useDispatch();
   const nav = useNavigate();


   const [userId, setUserId] = useState<number | undefined>();
   // 토큰 가져오기
   const token = localStorage.getItem("token");
   // 가져온 토큰 업데이트
   useEffect(() => {
      if (token) {
         const decoded = jwtDecode<TokenPayload>(token);
         setUserId(decoded.userId)
      }
   }, [token, setUserId])



   // 모달창 활성화
   function openModal(mode: ModalMode) {
      setModalMode(mode);
      setIsModalOpen(true);
   }

   // 모달창 비활성화
   function closeModal() {
      setIsModalOpen(false);
   }

   const userInfo = useSelector((state: RootState) => {
      return state.userInfo
   })


   // 정보 수정 페이지 이동
   function handleInfoEdit() {
      nav(`/user-info/${userId}`)
   }


   // 로그아웃 핸들러
   function handleLogout() {
      dispatch({
         type: "LOGOUT"
      })
      alert("로그아웃 완료")
      nav("/")
   }

   return (
      <>
         <nav className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="flex justify-between items-center h-16">
                  <div className="flex items-center">
                     <Link to="/" className="text-2xl font-bold text-blue-600">Artify</Link>
                     <ul className="hidden md:flex ml-10 space-x-8">
                        <li>
                           <NavLink to="/diary-form" className={({ isActive }) => cn(
                              "text-gray-500 hover:text-gray-900 font-medium",
                              { "text-blue-600": isActive }
                           )}>일기 작성</NavLink>
                        </li>
                        <li>
                           <NavLink to={`/diary/${userId}`} className={({ isActive }) => cn(
                              "text-gray-500 hover:text-gray-900 font-medium",
                              { "text-blue-600": isActive }
                           )}>일기 목록</NavLink>
                        </li>
                        <li>
                           <NavLink to="/info" className={({ isActive }) => cn(
                              "text-gray-500 hover:text-gray-900 font-medium",
                              { "text-blue-600": isActive }
                           )}>내 정보</NavLink>
                        </li>

                     </ul>
                  </div>

                  {userInfo &&
                     <div className="hidden md:flex items-center space-x-4">
                        {/* <p>{userInfo?.loginId}</p> */}
                        {/* <p>{userInfo?.profileImageUrl}</p> */}
                        <p onClick={handleInfoEdit} className='cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                           <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                           <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                        </svg></p>
                        <button onClick={handleLogout}
                           className="py-2 px-4 bg-gray-200 text-gray font-semibold rounded-lg shadow-md hover:bg-red-400 transition duration-300">
                           로그아웃
                        </button>
                     </div>
                  }

                  {!userInfo &&
                     <div className="hidden md:flex items-center space-x-4">
                        <button onClick={() => openModal('login')}
                           className="py-2 px-4 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-300 transition duration-300">
                           로그인
                        </button>
                        <button onClick={() => openModal('signup')}
                           className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
                           회원가입
                        </button>
                     </div>
                  }

                  <div className="md:hidden">
                     <button>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                     </button>
                  </div>
               </div>
            </div>
         </nav>

         {isModalOpen && <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            mode={modalMode}
         />}
      </>
   );
}

export default Navigation;