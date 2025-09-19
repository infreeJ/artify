import { createHashRouter } from "react-router-dom";

const routes = [
   { path : "/index.html", element : <Home/>},
   { path : "/", element : <Home/>}
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