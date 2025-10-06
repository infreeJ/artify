import React from 'react';
import LoginForm from '../pages/user/LoginForm';
import SignupForm from '../pages/user/SignupForm';
import type { ModalMode } from '../types/modal.types';
import PwdEditForm from '../pages/user/PwdEditForm';

interface ModalProps {
   isOpen: boolean;
   onClose: () => void;
   mode: ModalMode;
}

function Modal({ isOpen, onClose, mode }: ModalProps) {

   // 오버레이 클릭 시 모달창 비활성화
   function handleBackgroundClick(e: React.MouseEvent<HTMLDivElement>) {
      if (e.target === e.currentTarget) {
         onClose();
      }
   }

   if (!isOpen) {
      return null;
   }



   return (
      <div onClick={handleBackgroundClick} className='fixed inset-0 bg-black/60 flex justify-center items-center z-50'>
         <div className='bg-white p-8 rounded-lg shadow-xl w-full max-w-md relative'>
            <button onClick={onClose} className='absolute top-4 right-4 text-gray-400 hover:text-gray-700'>
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
               </svg>
            </button>
            {/* {mode === 'login' ? <LoginForm onClose={onClose} /> : <SignupForm />} */}
            {(() => {
               if (mode === 'login') {
                  return <LoginForm onClose={onClose} />;
               } else if (mode === 'signup') {
                  return <SignupForm />;
               } else if (mode === 'pwd-edit') {
                  return <PwdEditForm />;
               } else {
                  return null; // 항상 기본 케이스를 처리해주는 게 좋아요.
               }
            })()}
         </div>
      </div>
   );
}

export default Modal;