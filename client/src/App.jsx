import { Toaster } from 'react-hot-toast'
import { Route, Routes, useLocation } from "react-router-dom"
import Footer from './components/Footer'
import Navbar from "./components/Navbar"
import Favorite from "./pages/Favorite"
import Home from "./pages/Home"
import MovieDetails from "./pages/MovieDetails"
import Movies from "./pages/Movies"
import MyBookings from "./pages/MyBookings"
import SeatLayout from "./pages/SeatLayout"
import ListShows from './pages/Admin/ListShows'
import AdminSideBar from './components/admin/AdminSidebar'
import AddShows from './pages/Admin/AddShows'
import Dashboard from './pages/Admin/Dashboard'
import Layout from './pages/Admin/Layout'
import ListBookings from './pages/Admin/ListBookings'



const App = () => {
  const isAdminRoute = useLocation().pathname.startsWith('/admin')

  return (
    <>
    <Toaster/>
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/movies/:id/:date" element={<SeatLayout />} />
        <Route path="/my-booking" element={<MyBookings />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path='/admin/*' element={<Layout/>}>
          <Route index element={<Dashboard />} />
          <Route path='add-shows' element={<AddShows/>} />
          <Route path='list-shows' element={<ListShows />} />
          <Route path='list-bookings' element={<ListBookings />} />
        </Route>
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  )
}

export default App
