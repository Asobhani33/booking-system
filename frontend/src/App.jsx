import {Routes, Route} from 'react-router'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import BusinessesPage from './pages/BusinessesPage'
import BookingPage from './pages/BookingPage'
import MyBookingsPage from './pages/MyBookingsPage'
import DashboardPage from './pages/DashboardPage'


function App() {
  return (
    <div data-theme="light">
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/businesses" element={<BusinessesPage />} />
          <Route path="/booking/:id" element={<BookingPage />} />
          <Route path="/my-bookings" element={<MyBookingsPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>

    </div>
  )
}

export default App