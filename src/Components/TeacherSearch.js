import styled from "styled-components";
import { PopupContainer } from "./PopupContainer";
import { ScrollableContent, Title } from "./Styles";

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
    return <>
        <PopupContainer>
            <Title style={{padding:'30px'}}>강사 검색</Title>
            <SearchBox>
                <Input type="text" placeholder="강사 이름을 입력하시오."/>
                <SearchBtn>검색</SearchBtn>
            </SearchBox>
            <ScrollableContent height="500px" width="100%">
                <TeacherBar>{}</TeacherBar>
                <TeacherBar>{}</TeacherBar>
                <TeacherBar>{}</TeacherBar>
                <TeacherBar>{}</TeacherBar>
                <TeacherBar>{}</TeacherBar>
                <TeacherBar>{}</TeacherBar>
            </ScrollableContent>
        </PopupContainer>
    </>
}

const TeacherBarContainer = styled.div`
    display: flex;
    padding: 10px 20px;
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
const TeacherProfile = styled.div`
    
`
const SubBtn = styled.div`
    font-size: 15px;
    padding: 10px 20px;
    background-color: #041346;
    color: white;
    border-radius: 5px;
    text-align: center;
`

function TeacherBar(object){
    return <>
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
    </>
}