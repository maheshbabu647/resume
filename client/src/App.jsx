import React from 'react'

import AppRouter from './routes/AppRouter.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { TemplateContextProvider } from './context/TemplateContext.jsx'
import { ResumeContextProvider } from './context/ResumeContext.jsx'

const App = () => {

  return (
    <AuthContextProvider>
      <TemplateContextProvider>
          <ResumeContextProvider>
              <AppRouter />
          </ResumeContextProvider>
      </TemplateContextProvider>
    </AuthContextProvider>
  )
}


export default App