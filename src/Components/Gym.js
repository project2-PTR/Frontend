import { PopupContainer } from "./PopupContainer";
import { Title } from "./Styles";
import bookmarkImg from "./../img/menu_bookmark.png";
import searchImg from "./../img/menu_search.png";
import shopImg from "./../img/menu_shop.png";
import subImg from "./../img/menu_sub.png";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Text = styled.div`
    font-size: 25px;
    font-weight: bold;
    margin-top: 50px;
`

const Flex = styled.div`
    display: flex;
    gap: 30px;
`
const Container = styled.div`
    padding: 20px 50px;
    background-color: #D9D9D9;
    border-radius: 5px;
    align-items: center;
    text-align: center;
    justify-content: center;
    font-size: 20px;
    cursor: pointer;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
    &:hover {
        background-color: #B0B0B0; /* 호버 시 배경색 변경 */
        box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2); /* 호버 시 그림자 변경 */
        transform: scale(1.03); /* 호버 시 약간 확대 */
    }
`
const Img = styled.img`

`

export function Gym(){
    const navigate = useNavigate();

    return <PopupContainer padding="50px 100px">
        <Title style={{padding:"0"}}>헬스장</Title>
        <Text>강의</Text>
        <Flex>
            <Container onClick={()=>{navigate("/lecture/search")}}>
                <Img src={searchImg}/>
                <div>강의 검색</div>
            </Container>
            <Container onClick={()=>{navigate("/lecture/buy")}}>
                <Img src={shopImg}/>
                <div>구매한 강의</div>
            </Container>
            <Container onClick={()=>{navigate("/lecture/scrap")}}>
                <Img src={bookmarkImg}/>
                <div>스크랩한 강의</div>
            </Container>
        </Flex>
        <Text>강사</Text>
        <Flex>
            <Container onClick={()=>{navigate("/teacher/search")}}>
                <Img src={searchImg}/>
                <div>강사 검색</div>
            </Container>
            <Container onClick={()=>{navigate("/teacher/subscription")}}>
                <Img src={bookmarkImg}/>
                <div>구독한 강사</div>
            </Container>
        </Flex>
    </PopupContainer>
}