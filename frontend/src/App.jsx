import react from "react"
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import CartPage from './pages/CartPage'
import ProtectedRoute from "./components/ProtectedRoute"
import CreateListingPage from './pages/CreateListingPage';
import CheckoutPage from './pages/CheckoutPage'
import DjangoCart from "./pages/DjangoCart"
import AdminDashboard from './pages/AdminPage'


function Logout(){
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout(){
  localStorage.clear()
  return <Register />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage /> }/>
        <Route path="/create-listing" element={<CreateListingPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/djangocart" element={<DjangoCart />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
