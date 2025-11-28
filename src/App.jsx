import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import RootLayout from './layouts/RootLayout'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Content from './pages/Setting'
import Users from './pages/Childrens'
import ParentView from './pages/parentChildrens'
import Faqs from './pages/Faqs'
import UserFeedBack from './pages/UserFeedBack'
import Parents from './pages/Parents'
import Childrens from './pages/Childrens'
import ParentProfile from "./pages/ParentProfile";
import ParentChildren from './pages/parentChildrens'
import ParentEdit from './pages/ParentEdit'
import ChildEdit from './pages/ChildEdit'
import ChildView from './pages/ChildProfile'
import Milestones from './pages/Milestones'
import TermsAndConditions from './pages/TermsAndConditions'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Setting from './pages/Setting'
import ChildProfile from './pages/ChildProfile'
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayout />} >
          <Route index element={<Home />} />
          <Route path='faqs' element={<Faqs />} />
          <Route path='feedback' element={<UserFeedBack />} />
          <Route path='setting' element={<Setting />} />
          <Route path='TotalParents' element={<Parents />} />
          <Route path='/viewChildren' element={<ParentChildren />} />
          <Route path='/ParentProfile' element={<ParentProfile />} />
          <Route path='/ParentEdit' element={<ParentEdit />} />
          <Route path='profile' element={<Profile />} />
          <Route path='TotalChildren' element={<Childrens />} />
          <Route path='/ChildEdit' element={<ChildEdit />} />
          <Route path='/ChildView' element={<ChildProfile />} />
          <Route path='milestones' element={<Milestones />} />
          <Route path='termsCondition' element={<TermsAndConditions />} />
          <Route path='PrivacyPolicy' element={<PrivacyPolicy />} />

  
          {/* <Route path='users' element={<Childrens></Childrens>} /> */}
        </Route>
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  )
}

export default App
