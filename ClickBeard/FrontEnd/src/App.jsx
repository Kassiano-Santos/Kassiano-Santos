import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LinkRoutes from './routes/LinkRoutes'
import { AuthProvider } from './context/AuthContext'

function App() {
  const [count, setCount] = useState(0)

  return (
    <AuthProvider>
      <div>
        <LinkRoutes />
      </div>
    </AuthProvider>
  )
}

export default App
