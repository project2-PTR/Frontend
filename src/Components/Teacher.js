import styled from "styled-components";
import { PopupContainer } from "./PopupContainer";
import { ScrollableContent } from "./Styles";
import { LectureContainer } from "./LectureContainer";
import { useEffect, useState } from "react";
import { SessionCurrent } from "./SessionCurrent";
import axios from "axios";

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
    const { sessionUser } = SessionCurrent();
    const [lectureList, setLectureList] = useState(null);

    useEffect(() => {
        if (sessionUser) {
            myScrapLecture();
        }
    }, [sessionUser]);

    async function myScrapLecture(){
        try{
            const response = await axios.post("http://localhost:8080/api/myScrapLecture", {userId: sessionUser});
            const data = response.data;
            console.log(data);
            setLectureList(data);
        }catch(error){
            console.log("요청에 실패했습니다.", error);
        }
    }

    return <>
        <PopupContainer>
            <TeacherBarContainer>
                <Flex>
                    <TeacherImg src="https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_1280.jpg"/>
                    <FlexColumn>
                        <Flex>
                            <TeacherName>Steve</TeacherName>
                            <SubNum>구독자수 10명</SubNum>
                        </Flex>
                        <TeacherProfile>안녕하세요. 스티브입니다.</TeacherProfile>
                    </FlexColumn>
                </Flex>
                <SubBtn>구독</SubBtn>
            </TeacherBarContainer>
            <SearchBox>
                <Input type="text" placeholder="영상 이름을 입력하시오."/>
                <SearchBtn>검색</SearchBtn>
            </SearchBox>
            <ScrollableContent height="500px" width="90%">
                {lectureList!=null? <TeacherLecture lectureList={lectureList} />: null}
            </ScrollableContent>
        </PopupContainer>
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