import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import useAuthContext from '../hooks/useAuth.js'


import MainLayout from '../components/Layout/MainLayout.jsx'

import LoginPage from '../pages/LoginPage.jsx'
import SignupPage from '../pages/SignupPage.jsx'
import ResumePage from '../pages/ResumePage.jsx'
import TemplatesPage from '../pages/TemplatesPage.jsx'
import ResumeEditorPage from '../pages/ResumeEditorPage.jsx'
import AdminTemplatesPage from '../pages/AdminTemplatesPage.jsx'
import AdminTemplateEditPage from '../pages/AdminTemplateEditPage.jsx'
import NotFoundPage from '../pages/NotFoundPage.jsx'

import ProtectedRoute  from './ProtectedRoute.jsx'
import ResumeViewerPage from '../pages/ResumeViewerPage.jsx'

const AppRouter = () => {

    return (
        <Router>
            <Routes>
                <Route path = '/signin' element = {<LoginPage />} />
                <Route path = '/signup' element = {<SignupPage />} />

                <Route element = {<MainLayout />}>
                    
                    <Route element = {<ProtectedRoute roles = {['user', 'admin']}/>}>
                        <Route path = '/' element = {<ResumePage />} />
                        <Route path = '/resumes' element = {<ResumePage />} />
                        <Route path = '/templates' element = {<TemplatesPage />} />
                        
                        <Route path = '/resume/new/:newResumeTemplateId' element = {<ResumeEditorPage mode = "create"/>} />
                        <Route path = '/resume/edit/:existingResumeId' element = {<ResumeEditorPage mode = "edit"/>} />
                        <Route path = '/resume/view/:resumeId' element = {<ResumeViewerPage />} />
                    </Route>

                    <Route element = {<ProtectedRoute roles={['admin']} />} >
                        <Route path = '/admin/templates' element = {<AdminTemplatesPage />} />
                        <Route path = '/admin/templates/new' element = {<AdminTemplateEditPage mode = "create" />} />
                        <Route path = '/admin/templates/edit/:templateId' element = {<AdminTemplateEditPage mode = "edit" />} />
                    </Route>

                    <Route path = "*" element = {<NotFoundPage />} />

                </Route>
            </Routes>
        </Router>
    )
}

export default AppRouter