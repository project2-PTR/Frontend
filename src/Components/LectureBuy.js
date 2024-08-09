import styled from "styled-components";
import { PopupContainer } from "./PopupContainer";
import { ScrollableContent, Title } from "./Styles";
import { LectureContainer } from "./LectureContainer";

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

export function LectureBuy(){
    return <>
        <PopupContainer>
            
            <Title style={{padding:'30px 0px 30px 0px'}}>구매한 영상</Title>
            <SearchBox>
                <Input type="text" placeholder="영상 이름을 입력하시오."/>
                <SearchBtn>검색</SearchBtn>
            </SearchBox>
            <ScrollableContent height="500px" width="90%">
                <TeacherLecture>{}</TeacherLecture>
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

function TeacherLecture(object){
    return <LectureBox>
        <LectureContainer/>
        <LectureContainer/>
        <LectureContainer/>
        <LectureContainer/>
        <LectureContainer/>
        <LectureContainer/>
        <LectureContainer/>
    </LectureBox>
}