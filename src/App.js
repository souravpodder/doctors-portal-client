import { Route, Routes } from 'react-router-dom';
import './App.css';
import About from './Pages/About/About';
import AppointmentPage from './Pages/AppointmentPage/AppointmentPage';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import RequireAuth from './Pages/Login/RequireAuth';
import SignUp from './Pages/Login/SignUp';
import Footer from './Pages/Shared/Footer';
import Navbar from './Pages/Shared/Navbar/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './Pages/Dashboard/Dashboard';
import MyAppointments from './Pages/Dashboard/MyAppointments';
import Review from './Pages/Dashboard/MyReview';
import MyHistory from './Pages/Dashboard/MyHistory';
import Users from './Pages/Dashboard/Users';
import RequireAdmin from './Pages/Login/RequireAdmin';
import AddDoctor from './Pages/Dashboard/AddDoctor';
import ManageDoctors from './Pages/Dashboard/ManageDoctors';
import Payment from './Pages/Dashboard/Payment';

function App() {
  return (
    <div className='max-w-7xl mx-auto'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="appointment" element={
          <RequireAuth>
            <AppointmentPage />
          </RequireAuth>
        } />

        {/* dashboard routes  */}
        <Route path="dashboard" element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        } >


          <Route index element={<MyAppointments />} />
          <Route path='review' element={<Review />} />
          <Route path='history' element={<MyHistory />} />
          <Route path='payment/:id' element={<Payment />} />
          <Route path='users' element={
            <RequireAdmin>
              <Users />
            </RequireAdmin>
          } />
          <Route path='addDoctor' element={
            <RequireAdmin>
              <AddDoctor />
            </RequireAdmin>
          } />
          <Route path='manageDoctors' element={
            <RequireAdmin>
              <ManageDoctors />
            </RequireAdmin>
          } />

        </Route>
      </Routes>
      <ToastContainer />

    </div>
  );
}

export default App;
