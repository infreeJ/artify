import { createHashRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Modal from "../pages/user/Modal";

const routes = [
   { path : "/index.html", element : <Home/>},
   { path : "/", element : <Home/>},

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