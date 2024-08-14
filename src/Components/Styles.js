import styled from "styled-components";
import { SessionCurrent } from "./SessionCurrent";
import { useEffect, useState } from "react";
import axios from "axios";

export const Title = styled.div`
    font-size: 50px;
    padding-top: 100px;
    padding-bottom: 80px;
    text-align: center;
`


const ScrollableContainer = styled.div`
    width: ${props => props.width};         /* 컨테이너의 너비 */
    height: ${props => props.height};      /* 고정된 높이 설정 */
    overflow-y: auto;   /* 수직 스크롤 활성화 */
    border: 1px solid #ccc; /* 경계선 추가 (선택 사항) */
    padding: 10px;      /* 내부 여백 추가 (선택 사항) */
    margin: auto;
`

export function ScrollableContent({ width, height, children }) {
    return (
        <ScrollableContainer height={height} width={width}>
            { children }
        </ScrollableContainer>
    );
}

const SubBtn = styled.div`
    font-size: 15px;
    padding: 8px 0px;
    width: 80px;
    background-color: ${props => props.$subcheck? "#041346": "white"};
    color: ${props => props.$subcheck? "white": "#041346"};
    border: 5px solid #041346;
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
    user-select: none;
`

export function SubButton({ teacher, onToggle }){
    const { sessionUser } = SessionCurrent();
    const [subCheck, setSubCheck] = useState(false);
    const [subId, setSubId] = useState();

    useEffect(() => {
        if (sessionUser) {
            GetSubCheck()
        }
    }, [sessionUser, subCheck]);

    async function GetSubCheck(){
        try{
            const response = await axios.post("http://localhost:8080/api/subscriptionCheck", {user: {userId: sessionUser}, teacher: {id: teacher.id}});
            const data = response.data;
            if(data){
                setSubCheck(true)
                setSubId(data.id)
            }else{
                setSubCheck(false)
            }
        }catch(error){
            console.log("요청에 실패했습니다.", error);
        }
    }

    async function SubBtnClick(){
        try{
            if(subCheck){
                const response = await axios.post("http://localhost:8080/api/subscriptionCansel", {id: subId});
                const data = response.data;
                setSubCheck(false)
                console.log(data)
            } else{
                const response = await axios.post("http://localhost:8080/api/subscription", {user: {userId: sessionUser}, teacher: {id: teacher.id}});
                const data = response.data;
                setSubCheck(true)
                console.log(data)
            }
            if (onToggle) onToggle();
        }catch(error){
            console.log("요청에 실패했습니다.", error);
        }
    }
    
    return <>
        <SubBtn $subcheck={subCheck} onClick={(event) => {event.stopPropagation();SubBtnClick();}}>{subCheck? "구독중": "구독"}</SubBtn>
    </>
}