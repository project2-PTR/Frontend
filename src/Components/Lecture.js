import styled from "styled-components";
import { PopupContainer } from "./PopupContainer";
import bookmark from "./../img/bookmark2.png";
import bookmarkcheck from "./../img/bookmark2check.png";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { SessionCurrent } from "./SessionCurrent";
import { SubButton } from "./Styles";
import { LectureReview } from "./LectureReview";

const Title = styled.div`
    font-size: 50px;
    padding-top: 20px;
    padding-bottom: 50px;
    text-align: center;
`
const LectureContainer = styled.div`
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: 50px;
    padding: 0 50px;
    margin-bottom: 20px;
`
const LectureBox = styled.div`
    display: 'flex';
    flex-direction: column;
    position: relative; /* 자식 요소의 절대 위치를 위한 기준 설정 */
`
const Img = styled.img`
    width: 100%;
    aspect-ratio: 2 / 1; /* 2:1 비율로 유지 */
    height: auto; /* 자동으로 높이 조정 */
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
const TeacherImg = styled.img`
    width: 50px;
    height: 50px;
    cursor: pointer;
`
const Btn = styled.div`
    font-size: 15px;
    padding: 10px 20px;
    background-color: #041346;
    color: white;
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
    margin: 5px 0;
`
const LectureDetailBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 40px 0;
    font-size: 20px;
`
const Flex = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`
const Bold = styled.div`
    font-weight: bold;
`


export function Lecture(){
    const { id } = useParams();
    const { sessionUser } = SessionCurrent();
    const [lecture, setLecture] = useState(null);
    const [subNum, setSubNum] = useState(0);
    const [buyNum, setBuyNum] = useState(0);
    const [ratingAVG, setRatingAVG] = useState(0);
    const [category, setCategory] = useState(0);
    const [isScrap, setIsScrap] = useState(false);
    const [scrapId, setScrapId] = useState();
    const [reviewClose, setReviewClose] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        Getlecture()
    }, []);

    useEffect(() => {
        if(lecture!=null){
            GetSubNum()
            GetBuyNum()
            GetRatingAVG()
            GetCategory()
        }
    }, [lecture]);

    useEffect(() => {
        if (sessionUser) {
            userScrap();
        }
    }, [lecture, isScrap]);

    async function Getlecture(){
        try{
            const response = await axios.get("http://localhost:8080/api/lecture/" + id);
            const data = response.data;
            // console.log(data);
            setLecture(data)
        }catch(error){
            console.log("요청에 실패했습니다.", error);
        }
    }

    async function GetSubNum(){
        try{
            const response = await axios.post("http://localhost:8080/api/teacherSubscription", {id: lecture.teacher.id});
            const data = response.data;
            // console.log(data);
            setSubNum(data)
        }catch(error){
            console.log("요청에 실패했습니다.", error);
        }
    }
    async function GetBuyNum(){
        try{
            const response = await axios.post("http://localhost:8080/api/buyNumber", {id: lecture.id});
            const data = response.data;
            // console.log(data);
            setBuyNum(data)
        }catch(error){
            console.log("요청에 실패했습니다.", error);
        }
    }
    async function GetRatingAVG(){
        try{
            const response = await axios.post("http://localhost:8080/api/ratingAVG", {id: lecture.id});
            const data = response.data;
            // console.log(data);
            setRatingAVG(data)
        }catch(error){
            console.log("요청에 실패했습니다.", error);
        }
    }
    async function GetCategory(){
        try{
            const response = await axios.post("http://localhost:8080/api/findLectureCategory", {id: lecture.id});
            const category = response.data;
            // console.log(category);
            let categorys = ""
            category.forEach((data, index) => {
                if (index == category.length - 1) {
                  categorys = categorys + data.category.categoryName;
                } else {
                  categorys = categorys + data.category.categoryName + ", ";
                }
            });
            setCategory(categorys);
            // console.log(categorys);
        }catch(error){
            console.log("요청에 실패했습니다.", error);
        }
    }

    async function userScrap(){
        try{
            const response = await axios.post("http://localhost:8080/api/findScrapLectureByUserAndLecture", {user: {userId: sessionUser}, lecture: {id: lecture.id}});
            const data = response.data;
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
        {lecture? reviewClose? <PopupContainer>
            <Title>{lecture.lectureName}</Title>
            <LectureContainer>
                <LectureBox>
                    <div style={{display:'flex'}}>
                        <Img src="https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_1280.jpg" />
                        <Div onClick={()=>{ScrapClick()}}><img src={isScrap?bookmarkcheck:bookmark} style={{width:'100%'}}/></Div>
                    </div>
                    <div style={{fontSize: '25px', marginTop: '30px'}}>영상소개</div>
                    <div>{lecture.description}</div>
                </LectureBox>
                <LectureBox>
                    <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                        <TeacherImg src={lecture.teacher.user.profileImg}  onClick={()=>(navigate('/teacher/'+ lecture.teacher.id))}/>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <div style={{fontSize: '20px', fontWeight: 'bold', cursor:'pointer'}} onClick={()=>(navigate('/teacher/'+ lecture.teacher.id))}>
                                {lecture.teacher.user.userName}
                            </div>
                            <div style={{fontSize: '15px'}}>구독자 {subNum}명</div>
                        </div>
                        <SubButton teacher={lecture.teacher} onToggle={GetSubNum}/>
                    </div>
                    <LectureDetailBox>
                        <Flex>
                            <Bold>구매자수</Bold>
                            <div>{buyNum}명</div>
                        </Flex>
                        <Flex>
                            <Bold>평점</Bold>
                            <div>{ratingAVG=="NaN"?"없음":ratingAVG+"점"}</div>
                        </Flex>
                        <Flex>
                            <Bold>업로드일</Bold>
                            <div>{lecture.createdAt}</div>
                        </Flex>
                        <Flex>
                            <Bold>카테고리</Bold>
                            <div>{category!=""? category: "없음"}</div>
                        </Flex>
                        <Flex>
                            <Bold>가격</Bold>
                            <div>단백질바 {lecture.price}개</div>
                        </Flex>
                    </LectureDetailBox>
                    <div>
                        <Btn>구매하기</Btn>
                        <Btn onClick={()=>{setReviewClose(false)}}>리뷰보기</Btn>
                    </div>
                </LectureBox>
            </LectureContainer>
        </PopupContainer>: <LectureReview lecture={lecture} buyNum={buyNum} subNum={subNum} reviewClose={()=>{setReviewClose(true)}}/>: <div></div>}
    </>
}