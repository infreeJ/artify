export type ModalMode = 'login' | 'signup' | 'pwd-edit';

// 모달을 사용하는 컴포넌트에서 사용할 타입
export interface UseModalReturnType {
   isModalOpen: boolean
   modalMode: 'login' | 'signup' | 'pwd-edit';
   openModal: (mode: ModalMode) => void
   closeModal: () => void
}