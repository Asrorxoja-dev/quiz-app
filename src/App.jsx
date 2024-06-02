import MainLayout from "./layout/MainLayout"
import Home from "./pages/Home"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Quiz from "./pages/Quiz"
function App() {
  const routes = createBrowserRouter([
    {
      path:'/',
      element:<MainLayout/>,
      children:[
        {
          index:true,
          element:<Home/>
        },
        {
          path:"/quiz/:id",
          element:<Quiz/>
        }
      ]

    }
  ])
  return <RouterProvider router={routes}/>
}

export default App