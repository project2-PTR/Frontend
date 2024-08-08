import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { Login } from "./Login";
import { Header } from "./Header";
import { Signup } from "./Signup";
import { Logout } from "./Logout";
import { Game } from "./Game";
import { Feed } from "./Feed";
import { Lecture } from "./Lecture";
import { Teacher } from "./Teacher";
import { Record } from "./Record";
import { Game2 } from "./Game2";
import { TeacherSearch } from "./TeacherSearch";

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
        <Route path='/feed' element={<Feed/>}></Route>
        <Route path='/lecture' element={<Lecture/>}></Route>
        <Route path='/teacher/search' element={<TeacherSearch/>}></Route>
        <Route path='/record' element={<Record/>}></Route>
        <Route path='/teacher' element={<Teacher/>}></Route>
      </Routes>
    </BrowserRouter>
  </>
}