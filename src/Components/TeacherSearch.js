import styled from "styled-components";
import { PopupContainer } from "./PopupContainer";
import { ScrollableContent, SubButton, Title } from "./Styles";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchBox = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 30px;
`

const Input = styled.input`
    border: 2px solid black;
    border-radius: 5px;
    padding: 10px 10px;
    font-size: 15px;
    color: black;
    flex: 1;
`

const SearchBtn = styled.div`
    font-size: 15px;
    padding: 10px 20px;
    background-color: #041346;
    color: white;
    border-radius: 5px;
    cursor: pointer;
`

export function TeacherSearch(){
    const [teacherList, setTeacherList] = useState(null);

    useEffect(()=>{
        allTeacherGet();
    }, [])   // 최초 1회만 실행

    async function allTeacherGet(){
        try{
            const response = await axios.get("http://localhost:8080/api/teacher");
            console.log(response.data);
            setTeacherList(response.data);
        }catch(error){
            console.log("error", error);
        }
    }

    return <>
        <PopupContainer>
            <div style={{padding: '0 50px'}}>
                <Title style={{padding:'30px 0px 30px 0px'}}>강사 검색</Title>
                <SearchBox>
                    <Input type="text" placeholder="강사 이름을 입력하시오."/>
                    <SearchBtn>검색</SearchBtn>
                </SearchBox>
                <ScrollableContent height="500px" width="100%">
                    {
                      teacherList && teacherList.map((teacher)=>(
                        <TeacherBar key={teacher.id} teacher={teacher}/>
                      ))
                    }
                </ScrollableContent>
            </div>
        </PopupContainer>
    </>
}

const TeacherBarContainer = styled.div`
    display: flex;
    padding: 10px 30px;
    background-color: #D9D9D9;
    border-radius: 5px;
    align-items: center;
    margin: 5px;
    justify-content: space-between;
    cursor: pointer;
`
const TeacherImg = styled.img`
    width: 60px;
    height: 60px;
`
const FlexColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 15px;
`
const Flex = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`
const TeacherName = styled.div`
    font-size: 25px;
    font-weight: bold;
`
const SubNum = styled.div``
const LectureNum = styled.div``
const Date = styled.div`
    color: #666;
    font-size: 15px;
`
const TeacherProfile = styled.div`
    margin-top: 5px;
`
const SubBtn = styled.div`
    font-size: 15px;
    padding: 10px 20px;
    background-color: #041346;
    color: white;
    border-radius: 5px;
    text-align: center;
`

export function TeacherBar(teacher){
    teacher = teacher.teacher;
    const [lectureNum, setLectureNum] = useState(null);
    const [subNum, setSubNum] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        Getlecture()
        GetSubNum()
    }, []);

    async function Getlecture(){
        try{
            const response = await axios.post("http://localhost:8080/api/findTeacherLecture", {id: teacher.id});
            const data = response.data;
            setLectureNum(data.length)
            // console.log(data.length)
        }catch(error){
            console.log("요청에 실패했습니다.", error);
        }
    }
    async function GetSubNum(){
        try{
            const response = await axios.post("http://localhost:8080/api/teacherSubscription", {id: teacher.id});
            const data = response.data;
            setSubNum(data)
        }catch(error){
            console.log("요청에 실패했습니다.", error);
        }
    }

    return <>
        <TeacherBarContainer onClick={()=>(navigate('/teacher/'+ teacher.id))}>
            <Flex>
                <TeacherImg src={teacher.user.profileImg}/>
                <FlexColumn>
                    <Flex>
                        <TeacherName>{teacher.user.userName}</TeacherName>
                        <SubNum> | 구독자수 {subNum}명</SubNum>
                        <LectureNum> - 영상수 {lectureNum}개</LectureNum>
                        <Date>{teacher.user.createdAt} 가입</Date>
                    </Flex>
                    <TeacherProfile>{teacher.user.profileText}</TeacherProfile>
                </FlexColumn>
            </Flex>
            <SubButton teacher={teacher} onToggle={GetSubNum}/>
        </TeacherBarContainer>
    </>
}