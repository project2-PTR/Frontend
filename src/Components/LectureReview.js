import styled from "styled-components";
import { PopupContainer } from "./PopupContainer";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { SessionCurrent } from "./SessionCurrent";

const LectureBox = styled.div`
    display: flex;
    width: 100%;
    padding: 20px 50px;
    cursor: pointer;
    align-items: center;
`
const Img = styled.img`
    width: 20%;
    aspect-ratio: 2 / 1;
    height: auto;
    position: relative;
    margin-right: 20px;
`
const TeacherBox = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

const ProfileImg = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
`

const ReviewContainer = styled.div`
    width: 100%;
    background-color: #E0E0E0;
    padding: 20px 50px;
`

const WriteBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    width: 100%;
`
const WriteBtns = styled.div`
    display: flex;
    gap: 10px;
`
const WriteReviewBox = styled.div`
    display: flex;
    background-color: #C7C7C7;
    padding: 10px;
    align-items: center;
    gap: 10px;
`
const ReviewBox = styled.div`
    background-color: #C7C7C7;
    margin-top: 10px;
    max-height: 400px; /* 최대 높이 설정 */
    overflow-y: auto; /* 스크롤 추가 */
`

// 테이블 스타일 정의
const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const Th = styled.th`
    border: 1px solid #ddd;
    padding: 8px;
    background-color: #f2f2f2;
    font-weight: bold;
    position: sticky; /* 헤더 고정 */
    top: 0; /* 상단에 고정 */
    z-index: 10; /* 다른 요소들 위에 보이도록 설정 */
`;

const Td = styled.td`
    border: 1px solid #ddd;
    padding: 8px;
    max-width: 150px; /* 데이터 셀 최대 너비 설정 */
    overflow: hidden; /* 넘치는 텍스트 숨김 */
    text-overflow: ellipsis; /* 넘치는 텍스트를 '...'로 표시 */
    white-space: nowrap; /* 텍스트 줄바꿈 방지 */
`;

const Tr = styled.tr`

`;

const Btn = styled.div`
    width: 80px;
    padding: 10px 0;
    background-color: #041346;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    text-align: center;
`

export function LectureReview({lecture, buyNum, subNum, sessionUser, reviewClose}){
    const [reviewList, setReviewList] = useState(null);
    const [reviewWrite, setReviewWrite] = useState(false);
    const [reviewChange, setReviewChange] = useState(false);

    useEffect(() => {
        GetReviewList()
    }, []);

    useEffect(() => {
        if (reviewList) {
        }
    }, [reviewList]);

    useEffect(() => {
        setReviewWrite(false)
        GetReviewList()
    }, [reviewChange]);
    
    async function GetReviewList(){
        try{
            const response = await axios.post("http://localhost:8080/api/findReviewByLecture", {id: lecture.id});
            const data = response.data;
            console.log(data);
            setReviewList(data)
        }catch(error){
            console.log("요청에 실패했습니다.", error);
        }
    }

    let rating = -1;
    let review = "";

    async function changeLectureUser(){
        try{
            const response = await axios.post("http://localhost:8080/api/changeLectureUser", {user: {userId: sessionUser}, lecture: {id: lecture.id}, teacherRating: rating, teacherReview: review});
            const data = response.data;
            console.log(data);
            setReviewChange(!reviewChange)
        }catch(error){
            console.log("요청에 실패했습니다.", error);
        }
    }

    return <>
        {reviewList? <PopupContainer padding="0" backNavigate={()=>{reviewClose()}}>
            <LectureBox onClick={()=>{reviewClose()}}>
                <Img src="https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_1280.jpg" />
                <div>
                    <div style={{fontSize:"30px", fontWeight:"bold"}}>{lecture.lectureName}</div>
                    <TeacherBox>
                        <ProfileImg src={lecture.teacher.user.profileImg}/>
                        <div style={{fontSize:"25px"}}>{lecture.teacher.user.userName}</div>
                        <div style={{fontSize:"15px", color:"gray"}}>구독자 {subNum}명</div>
                    </TeacherBox>
                </div>
            </LectureBox>
            <ReviewContainer>
                {reviewWrite? <><WriteBox>
                    <div style={{fontSize:"20px"}}>리뷰작성</div>
                    <WriteBtns>
                        <Btn onClick={()=>{setReviewWrite(false)}}>취소</Btn>
                        <Btn onClick={()=>{changeLectureUser()}}>완료</Btn>
                    </WriteBtns>
                </WriteBox>
                <WriteReviewBox>
                    <div>별점</div>
                    <input type="number" min="0" max="10" style={{padding:"5px"}} onChange={(e)=> {rating = e.target.value}}/>
                    <div style={{marginLeft:"20px"}}>리뷰내용</div>
                    <textarea style={{width:"100%", flex:1, padding:"5px"}} onChange={(e)=> {review = e.target.value}}/>
                </WriteReviewBox></>: <Btn onClick={()=>{setReviewWrite(true)}}>리뷰작성</Btn>}
                <ReviewBox>
                    <Table className="lecture_reviews_table">
                        <caption></caption>
                        <thead>
                            <Tr>
                              <Th>작성자</Th>
                              <Th>별점</Th>
                              <Th>리뷰</Th>
                              <Th>구매일</Th>
                            </Tr>
                        </thead>
                        <tbody>
                            {reviewList.map((review, index) => (
                                <Tr key={index}>
                                    <Td>{review.user.userName}</Td>
                                    <Td>{review.teacherRating==-1?"미작성":review.teacherRating}</Td>
                                    <Td>{review.teacherReview}</Td>
                                    <Td>{review.createdAt}</Td>
                                </Tr>
                            ))}
                        </tbody>
                    </Table>
                </ReviewBox>
            </ReviewContainer>
        </PopupContainer>: <div/>}
    </>
}