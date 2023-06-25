import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Regis";
import DeTailVac from "./components/DeTailVac";
import Book from "./components/Book";
import Assess from "./components/Assess";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Admin from "./components/Admin";
import History from "./components/History";
function App() {
  return (
    
    <BrowserRouter>
    <ToastContainer />
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/detailvac" element={<DeTailVac />}></Route>
        <Route path="/book" element={<Book />}></Route>
        <Route path="/history" element={<History />}></Route>
        <Route path="/assess" element={<Assess />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
