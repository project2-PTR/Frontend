import styled from "styled-components";
import { PopupContainer } from "./PopupContainer";
import { ScrollableContent, Title } from "./Styles";
import { useEffect, useState } from "react";
import axios from "axios";
import { LectureContainer } from "./LectureContainer";

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

export function LectureSearch(){
    return <>
        <PopupContainer>
            <div style={{padding: '0 50px'}}>
                <Title style={{padding:'30px 0px 30px 0px'}}>영상 검색</Title>
                <SearchBox>
                    <Input type="text" placeholder="영상 이름을 입력하시오."/>
                    <SearchBtn>검색</SearchBtn>
                </SearchBox>
                <ScrollableContent height="500px" width="100%">
                    <Lecture>{}</Lecture>
                </ScrollableContent>
            </div>
        </PopupContainer>
    </>
}

const LectureBox = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 15px;
    padding: 10px;
`
function Lecture(object){
    return <LectureBox>
        <LectureContainer/>
        <LectureContainer/>
        <LectureContainer/>
    </LectureBox>
}