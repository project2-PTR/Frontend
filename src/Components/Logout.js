import { useNavigate } from "react-router-dom"
import styled from "styled-components"

const Title = styled.div`
    font-size: 50px;
    padding-top: 100px;
    padding-bottom: 80px;
    text-align: center;
`

const Container = styled.div`
    background-color: white;
    color: black;
    padding: 100px 0;
    width: 50%;
    margin: auto;
    border-radius: 20px;
`

const Div = styled.div`
    font-size: 35px;
    text-align: center;
    font-weight: bold;
    margin-bottom: 70px;
`

const LoginBtn = styled.div`
    border-radius: 50px;
    background-color: #222;
    color: white;
    width: 50%;
    padding-top: 20px;
    padding-bottom: 20px;
    text-align: center;
    font-size: 25px;
    margin: 10px auto;
    cursor: pointer;
`

export function Logout(){
    const navigate = useNavigate();

    return <>
        <Title>Logout</Title>
        <Container>
            <Div>00님 로그아웃 하시겠습니까?</Div>
            <LoginBtn>로그아웃</LoginBtn>
            <LoginBtn onClick={()=>{navigate("/")}}>돌아가기</LoginBtn>
        </Container>        
    </>
}