import { Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Resgister from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Navbar from './components/Navbar';       // <-- Import Navbar
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import PublicRoute from './components/routes/PublicRoute';
import PrivateRoute from './components/routes/PrivateRoute';

function App() {
  return (
    <>
      <ToastContainer />
      

      <Routes>
        <Route path='/' element={
          <PublicRoute>
            <HomePage />
          </PublicRoute>
        } />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={
          <PublicRoute>
            <Resgister />
          </PublicRoute>
        } />

        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />

        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;








