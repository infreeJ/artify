import { createHashRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Diary from "../pages/diary/Diary";
import DiaryForm from "../pages/diary/DiaryForm";
import DiaryDetail from "../pages/diary/DiaryDetail";
import UserInfo from "../pages/user/UserInfo";

const routes = [
   { path : "/index.html", element : <Home/>},
   { path : "/", element : <Home/>},
   { path : "/diary/:userId", element : <Diary/>},
   { path : "/diary-form", element : <DiaryForm/>},
   { path : "/diary/detail", element : <DiaryDetail/>}, // 지금 막 작성하고 있는 일기
   { path : "/diary/detail/:diaryId", element : <DiaryDetail/>}, // 이미 생성된 일기 세부정보 페이지
   { path : "/user-info/:userId", element : <UserInfo/>}, // 유저 정보 페이지

]

const router = createHashRouter([{
   path : "/",
   element : <App />,
   children : routes.map((route) => {
      return {
         index : route.path === "/",
         path : route.path === "/" ? undefined : route.path,
         element : route.element
      }
   })
}])

export default router;