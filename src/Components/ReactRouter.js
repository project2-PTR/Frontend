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
import { TeacherSearch } from "./TeacherSearch";
import { LectureBuy } from "./LectureBuy";
import { LectureSearch } from "./LectureSearch";
import { LectureScrap } from "./LectureScrap";
import { Wrapper } from "./Wrapper";

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
        <Route path='/lecture' element={<Wrapper/>}>
          <Route path=":id" element={<Lecture/>}></Route>
          <Route path='search' element={<LectureSearch/>}></Route>
          <Route path='buy' element={<LectureBuy/>}></Route>
          <Route path='scrap' element={<LectureScrap/>}></Route>
        </Route>
        <Route path='/teacher' element={<Wrapper/>}>
          <Route path=':id' element={<Teacher/>}></Route>
          <Route path='search' element={<TeacherSearch/>}></Route>
        </Route>
        <Route path='/record' element={<Record/>}></Route>
      </Routes>
    </BrowserRouter>
  </>
}