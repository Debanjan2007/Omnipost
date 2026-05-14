import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import Layout from "./Layout.jsx";
import { CreatePost , Accounts , History } from "./components/index.jsx";
import DashboardPage from "./components/HeroSection/Dashboard/DashboardPage.jsx";
import ErrorPage from "./components/Error/Errorpage.jsx";
import SettingsPage from "./components/HeroSection/Settings.section.jsx";
import UserProfilePage from "./components/HeroSection/UserInfo.section.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path='/' element={<Layout/>}>
                <Route path='dashboard' element={<DashboardPage/>}/>
                <Route path='create' element={<CreatePost/>}/>
                <Route path='accounts' element={<Accounts/>}/>
                <Route path='history' element={<History/>}/>
                <Route path='settings' element={<SettingsPage/>}/>
                <Route path='userinfo' element={<UserProfilePage />}/>
            </Route>,
                <Route path='*' element={<ErrorPage/>}/>
        </>
    )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={router}/>
  </StrictMode>,
)
