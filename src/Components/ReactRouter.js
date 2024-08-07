import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { Login } from "./Login";
import { Header } from "./Header";
import { Signup } from "./Signup";
import { Logout } from "./Logout";
import { Game } from "./Game";

export function ReactRouter() {
  return <>
    <BrowserRouter>
      <Header/>
      <Game/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/logout' element={<Logout/>}></Route>
      </Routes>
    </BrowserRouter>
  </>
}