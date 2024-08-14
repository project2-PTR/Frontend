import styled from "styled-components"
import bookmark from "./../img/bookmark2.png";
import bookmarkcheck from "./../img/bookmark2check.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { SessionCurrent } from "./SessionCurrent";
import { useNavigate } from "react-router-dom";

const LectureBox = styled.div`
    display: flex;
    flex-direction: column;
    position: relative; /* 자식 요소의 절대 위치를 위한 기준 설정 */
    cursor: pointer;
`
const LectureImg = styled.img`
    width: 100%;
    aspect-ratio: 2 / 1; /* 1:1 비율로 유지 */
    height: auto; /* 자동으로 높이 조정 */
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    position: relative; /* 자식 요소의 절대 위치를 위한 기준 설정 */
`
const Div = styled.div`
    width: 70px;
    height: 70px;
    color: black;
    position: absolute; /* 절대 위치로 설정 */
    top: 5px; /* 이미지 상단에서의 위치 */
    right: 5px; /* 이미지 오른쪽에서의 위치 */
    padding: 5px; /* 여백 추가 */
    cursor: pointer; /* 커서 포인터 추가 */
`
const LectureDetail = styled.div`
    background-color: gray;
    padding: 10px;
`
const LectureTitle = styled.div`
    font-size: 20px;
`
const LectureFlex = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
`
const LectureBuyNum = styled.div`
    font-size: 15px;
`
const LecturePrice = styled.div`
    font-size: 15px;
`

export function LectureContainer(data){
    const { sessionUser } = SessionCurrent();
    const [buynum, setBuynum] = useState(0);
    const [isScrap, setIsScrap] = useState(false);
    const [scrapId, setScrapId] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if (sessionUser) {
            buyNumber();
            userScrap();
        }
    }, [sessionUser, isScrap]);

    const lecture = data.lecture;

    async function buyNumber(){
        try{
            const response = await axios.post("http://localhost:8080/api/buyNumber", {id: lecture.id});
            const data = response.data;
            setBuynum(data);
            // console.log("buynumdata", data)
        }catch(error){
            console.log("요청에 실패했습니다.", error);
        }
    }

    async function userScrap(){
        try{
            const response = await axios.post("http://localhost:8080/api/findScrapLectureByUserAndLecture", {user: {userId: sessionUser}, lecture: {id: lecture.id}});
            const data = response.data;
            // console.log("setIsScrap", data);
            if(data){
                setIsScrap(true);
                setScrapId(data.id);
            }
        }catch(error){
            console.log("요청에 실패했습니다.", error);
        }
    }

    async function ScrapClick(){
        try{
            if(isScrap){
                const response = await axios.post("http://localhost:8080/api/deleteScrapLecture", {id: scrapId});
                const data = response.data;
                console.log(data)
                setIsScrap(!isScrap);
            }else{
                const response = await axios.post("http://localhost:8080/api/scrapLecture", {user: {userId: sessionUser}, lecture: {id: lecture.id}});
                const data = response.data;
                console.log(data)
                setIsScrap(!isScrap);
            }
            
        }catch(error){
            console.log("요청에 실패했습니다.", error);
        }
    }
    
    return <>
        <LectureBox onClick={()=>(navigate('/lecture/'+ lecture.id))}>
            <div style={{display:'flex'}}>
                <LectureImg src="https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_1280.jpg" />
                <Div onClick={(event) => {event.stopPropagation();ScrapClick();}}>
                    <img src={isScrap?bookmarkcheck:bookmark} style={{width:'100%'}}/>
                </Div>
            </div>
            <LectureDetail>
                <LectureTitle>{lecture.lectureName}</LectureTitle>
                <LectureFlex>
                    <LectureBuyNum>구매수 {buynum}</LectureBuyNum>
                    <LecturePrice>단백질바 {lecture.price}개</LecturePrice>
                </LectureFlex>
            </LectureDetail>
        </LectureBox>  
    </>
}