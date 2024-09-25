import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import Profile from './Profile';
import ProtectedRoute from './Components/ProtectedRoute';
import ProtectedRoutes from './Components/ProtectedRoutes';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/login" element={<ProtectedRoutes><Login /></ProtectedRoutes>} />
            <Route path="/signup" element={<ProtectedRoutes><SignUp /></ProtectedRoutes>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
         </Routes>
    </div>
  );
}

export default App;
