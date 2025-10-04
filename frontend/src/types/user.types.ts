export interface TokenPayload {
   sub: string;    // 사용자 id (loginId)
   userId: number; // 사용자 PK (id)
}

// 유저 정보(UserInfo.tsx)
export interface UserState {
   loginId: string
   name: string
   age: number | null
   gender: string
   persona: string
}

// 수정 input요소 상태(UserInfo.tsx)
export interface IsEdit {
   name: boolean
   age: boolean
   gender: boolean
   persona: boolean
}