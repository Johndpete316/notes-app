import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useTheme } from './ThemeContext'
import './styles/app.css'

// component imports
import Login from './components/Login'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'

function App() {
  const { theme } = useTheme();

  return (
    <div className="app">
      <div className='app-container' data-theme={theme}>
        <Navbar />
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </div>
    </div>
  )
}

export default App

