import { useState } from 'react'
import Header from './componenets/Header'
import { BrowserRouter, Routes, Route, Link ,createBrowserRouter,RouterProvider} from 'react-router-dom';
import Loginpage from './componenets/Loginpage'
import Home from './componenets/Home'
import Profilepage from './componenets/Profilepage';
import Registrationpage from './componenets/Registrationpage';
import Bookmarkpage from './componenets/Bookmarkpage';
import Createpage from './componenets/Createpage';
import Yourworks from './componenets/Yourworks';
import Novelpage from './componenets/Novelpage';
import FilterComponent from './componenets/FilterComponent';
import Addchapter from './componenets/Addchapter';
import Particularchapter from './componenets/Particularchapter';
import Updatepage from './componenets/Updatepage';
import Rankingpage from './componenets/Rankingpage';
import Editchapter from './componenets/Editchapter';
const router = createBrowserRouter([
             {
              path:"/",
              element:<Home/>
             },
             {
                 path:"/updates",
                 element:<Updatepage/>
             },
             {
              path:"/novel/:_id",
              element:<Novelpage/>
             },
             {
              path:"/novel/:novelId/particularchapter/:chapterId",
              element:<Particularchapter/>
             }
             ,
             {
              path:"/filter",
              element:<FilterComponent/>
             },
             {
              path:"/editchapter/:novelId/:chapterId",
              element: <Editchapter/>
             },
             {
              path:"/addchapter/:novelId",
                element:<Addchapter></Addchapter>
             },
             
             {
              path:"/profilepage",
              element:<Profilepage/>,
              children: [
                {
                  path: 'bookmark',
                  element: <Bookmarkpage />,
                },
                {
                  path: 'creatework',
                  element: <Createpage />,
                },
                {
                  path: 'yourworks',
                  element: <Yourworks />,
                }
              ]
             },
             {
              path:"/login",
              element:<Loginpage/>
             },
             {
              path:"/register",
              element:<Registrationpage/>
             }
             ,{
              path:"/ranking",
              element:<Rankingpage/>
             }
])

function App() {

  
    
    
    /*<BrowserRouter>
    <Header/>
    <Routes>
        <Route path="/" element={<div>this is homepage</div>} />
        <Route path="/login" element={<Loginpage />} />
    </Routes>
    </BrowserRouter>*/

    return (
      <>
      <RouterProvider router={router} />
      
      </>
    )
      
    
  
}

export default App
