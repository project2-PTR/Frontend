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
import { TeacherSub } from "./TeacherSub";
import { LectureReview } from "./LectureReview";
import { CashBuy } from "./CashBuy";
import { Gym } from "./Gym";
import { FeedList } from "./FeedList";
import { FeedUser } from "./FeedUser";
import { FeedSearch } from "./FeedSearch";
import { FeedUserSearch } from "./FeedUserSearch";
import { MyPage } from "./MyPage";
import { MyPageEdit } from "./MyPageEdit";
import { ProfileEdit } from "./ProfileEdit";

export function ReactRouter() {
  return <>
    <BrowserRouter>
      <Header/>
      {/* <Game/> */}
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/logout' element={<Logout/>}></Route>
        <Route path='/mypage' element={<MyPage/>}>
          <Route path='edit' element={<MyPageEdit/>}></Route>
          <Route path='profile' element={<ProfileEdit/>}></Route>
          <Route path='scrap' element={<FeedList/>}></Route>
          <Route path='like' element={<FeedList/>}></Route>
        </Route>
        <Route path='/feed' element={<Wrapper/>}>
          <Route path=":id" element={<Feed/>}></Route>
          <Route path='scrap' element={<FeedList/>}></Route>
          <Route path='like' element={<FeedList/>}></Route>
          <Route path="search/user" element={<FeedUserSearch/>}></Route>
          <Route path="search" element={<FeedSearch/>}></Route>
          <Route path="user/:id" element={<FeedUser/>}></Route>
        </Route>
        <Route path='/lecture' element={<Wrapper/>}>
          <Route path=":id" element={<Wrapper/>}>
            <Route index element={<Lecture/>} />
            <Route path='review' element={<LectureReview/>}></Route>
          </Route>
          <Route path='search' element={<LectureSearch/>}></Route>
          <Route path='buy' element={<LectureBuy/>}></Route>
          <Route path='scrap' element={<LectureScrap/>}></Route>
        </Route>
        <Route path='/teacher' element={<Wrapper/>}>
          <Route path=':id' element={<Teacher/>}></Route>
          <Route path='search' element={<TeacherSearch/>}></Route>
          <Route path='subscription' element={<TeacherSub/>}></Route>
        </Route>
        <Route path='/record' element={<Record/>}></Route>
        <Route path='/cashbuy' element={<CashBuy/>}></Route>
        <Route path='/gym' element={<Gym/>}></Route>
      </Routes>
    </BrowserRouter>
  </>
}