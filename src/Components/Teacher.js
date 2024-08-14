import styled from "styled-components";
import { PopupContainer } from "./PopupContainer";
import { ScrollableContent, SubButton } from "./Styles";
import { LectureContainer } from "./LectureContainer";
import { useEffect, useState } from "react";
import { SessionCurrent } from "./SessionCurrent";
import axios from "axios";
import { useParams } from "react-router-dom";

const TeacherBarContainer = styled.div`
    display: flex;
    padding: 10px 50px;
    align-items: center;
    margin: 5px;
    justify-content: space-between;
    margin-bottom: 30px;
`
const TeacherImg = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 5px;
`
const FlexColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`
const Flex = styled.div`
    display: flex;
    gap: 30px;
    align-items: center;
`
const TeacherName = styled.div`
    font-size: 50px;
    font-weight: bold;
`
const SubNum = styled.div`
    font-size: 20px;
`
const TeacherProfile = styled.div`
    font-size: 20px;
`
const SubBtn = styled.div`
    font-size: 15px;
    padding: 10px 20px;
    background-color: #041346;
    color: white;
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
`

const SearchBox = styled.div`
    display: flex;
    gap: 5px;
    width: 90%;
    margin: auto auto -1px auto;
    padding: 5px;
    border: 1px solid #ccc;
`

const Input = styled.input`
    border: 1px solid black;
    border-radius: 5px;
    font-size: 15px;
    color: black;
    flex: 1;
    padding-left: 10px;
`

const SearchBtn = styled.div`
    font-size: 15px;
    padding: 5px 10px;
    background-color: #041346;
    color: white;
    border-radius: 5px;
    cursor: pointer;
`

export function Teacher(){
    const { id } = useParams();
    const [teacher, setTeacher] = useState(null);
    const [lectureList, setLectureList] = useState(null);
    const [subNum, setSubNum] = useState(0);
    
    useEffect(() => {
        GetTeacher()
    }, []);

    useEffect(() => {
        if(teacher!=null){
            Getlecture()
            GetSubNum()
        }
    }, [teacher]);

    async function GetTeacher(){
        try{
            const response = await axios.get("http://localhost:8080/api/teacher/" + id);
            const data = response.data;
            setTeacher(data);
        }catch(error){
            console.log("요청에 실패했습니다.", error);
        }
    }

    async function Getlecture(){
        try{
            const response = await axios.post("http://localhost:8080/api/findTeacherLecture", {id: teacher.id});
            const data = response.data;
            setLectureList(data)
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
        {teacher? <PopupContainer>
            <TeacherBarContainer>
                <Flex>
                    <TeacherImg src={teacher.user.profileImg}/>
                    <FlexColumn>
                        <Flex>
                            <TeacherName>{teacher.user.userName}</TeacherName>
                            <SubNum>구독자 {subNum}명</SubNum>
                        </Flex>
                        <TeacherProfile>{teacher.user.profileText}</TeacherProfile>
                    </FlexColumn>
                </Flex>
                <SubButton teacher={teacher} onToggle={GetSubNum}/>
            </TeacherBarContainer>
            <SearchBox>
                <Input type="text" placeholder="영상 이름을 입력하시오."/>
                <SearchBtn>검색</SearchBtn>
            </SearchBox>
            <ScrollableContent height="500px" width="90%">
                {lectureList!=null? <TeacherLecture lectureList={lectureList} />: null}
            </ScrollableContent>
        </PopupContainer>: <div/>}
    </>
}

const LectureBox = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 15px;
    padding: 10px;
`
function TeacherLecture({lectureList}){
    return <LectureBox>
        {
          lectureList && lectureList.map((lecture)=>(
            <LectureContainer key={lecture.id} lecture={lecture}/>
          ))
        }
    </LectureBox>
}