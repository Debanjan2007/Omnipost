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
import LandingPage from "./components/Landing-page/Landingpage.jsx";
import LoginPage from "./components/Login-signup/LoginPage.jsx";
import SignupPage from "./components/Login-signup/SignupPage.jsx";
import SolutionsSection from "./components/Landing-page/Solution.jsx";
import FeaturesSection from "./components/Landing-page/Features.jsx";
import PricingPage from "./components/Landing-page/Pricing.jsx";
import AboutPage from "./components/Landing-page/AboutusPage.jsx";
import ContactPage from "./components/Landing-page/ContactusPage.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path='/user' element={<Layout/>}>
                <Route path='dashboard' element={<DashboardPage/>}/>
                <Route path='create' element={<CreatePost/>}/>
                <Route path='accounts' element={<Accounts/>}/>
                <Route path='history' element={<History/>}/>
                <Route path='settings' element={<SettingsPage/>}/>
                <Route path='userinfo' element={<UserProfilePage />}/>
            </Route>,
                <Route path='*' element={<ErrorPage/>}/>
            <Route path='/' element={<LandingPage/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/signup' element={<SignupPage/>}/>
            <Route path='/solution' element={<SolutionsSection/>}/>
            <Route path='/features' element={<FeaturesSection/>}/>
            <Route path='/pricing' element={<PricingPage/>}/>
            <Route path='/about' element={<AboutPage/>}/>
            <Route path='/contact' element={<ContactPage/>}/>
        </>
    )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={router}/>
  </StrictMode>,
)
