import type { AppAction, RootState } from "./types";

const initState: RootState = {
   userInfo: null,
   logoutTimer: null
};

function reducer(state: RootState = initState, action: AppAction): RootState {
   switch (action.type) {
      case 'USER_INFO':
         return { ...state, userInfo: action.payload };
      case 'LOGOUT':
         if (state.logoutTimer) {
            clearTimeout(state.logoutTimer);
         }
         localStorage.removeItem("token");
         return { ...initState };
      default:
         return state;
   }
}

export default reducer;