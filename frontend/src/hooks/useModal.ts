import { useState } from "react";
import type { ModalMode } from "../types/modal.types";




function useModal() {
   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
   const [modalMode, setModalMode] = useState<ModalMode>('login');

   // 모달창 활성화
   function openModal(mode: ModalMode) {
      setModalMode(mode);
      setIsModalOpen(true);
   }

   // 모달창 비활성화
   function closeModal() {
      setIsModalOpen(false);
   }
   

   return {isModalOpen, modalMode, openModal, closeModal}
}

export default useModal;