import styled from "styled-components";
import { PopupContainer } from "./PopupContainer";
import { ScrollableContent, Title } from "./Styles";
import { LectureContainer } from "./LectureContainer";
import { useEffect, useState } from "react";
import axios from "axios";
import { SessionCurrent } from "./SessionCurrent";

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

export function LectureScrap(){
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
            
            <Title style={{padding:'30px 0px 30px 0px'}}>스크랩한 영상</Title>
            <SearchBox>
                <Input type="text" placeholder="영상 이름을 입력하시오."/>
                <SearchBtn>검색</SearchBtn>
            </SearchBox>
            <ScrollableContent height="500px" width="90%">
                {lectureList!=null? <ScrapLecture lectureList={lectureList} />: null}
            </ScrollableContent>
        </PopupContainer>
    </>
}

const LectureBox = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 15px;
    padding: 10px;
`

function ScrapLecture( {lectureList} ){
    return <LectureBox>
        {
          lectureList && lectureList.map((lecture)=>(
            <LectureContainer key={lecture.id} lecture={lecture}/>
          ))
        }
    </LectureBox>
}