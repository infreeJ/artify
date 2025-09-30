import { createHashRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Diary from "../pages/diary/Diary";
import DiaryForm from "../pages/diary/DiaryForm";
import DiaryImageForm from "../pages/diary/DiaryImageForm";
import DiaryDetail from "../pages/diary/DiaryDetail";

const routes = [
   { path : "/index.html", element : <Home/>},
   { path : "/", element : <Home/>},
   { path : "/diary", element : <Diary/>},
   { path : "/diary-form", element : <DiaryForm/>},
   { path : "/diary/image-form", element : <DiaryImageForm/>},
   { path : "/diary/detail/id", element : <DiaryDetail/>},

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