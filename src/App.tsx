import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Regis";
import Appheader from "./components/subcomponents/Header";
import DeTailVac from "./components/DeTailVac";
import Book from "./components/Book";
import Assess from "./components/Assess";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/detailvac" element={<DeTailVac />}></Route>
        <Route path="/book" element={<Book />}></Route>
        <Route path="/assess" element={<Assess />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
