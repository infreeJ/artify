export interface UserInfo {
   id: number;
   loginId: string;
   name: string;
   profileImageUrl: string | null
}

export interface RootState {
   userInfo: UserInfo | null;
   logoutTimer: NodeJS.Timeout | null;
}

// Action 타입 정의
export interface SetUserInfoAction {
   type: 'USER_INFO';
   payload: UserInfo | null;
}


export interface LogoutAction {
   type: 'LOGOUT';
}

export type AppAction = SetUserInfoAction | LogoutAction;