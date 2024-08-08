import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { Title } from "./Styles"

const Flex = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`

const Input = styled.input`
    border: 2px solid white;
    border-radius: 50px;
    background-color: #333;
    padding: 20px 50px;
    width: 35%;
    font-size: 25px;
    color: white;
`
const LoginBtn = styled.div`
    border-radius: 50px;
    background-color: white;
    color: black;
    width: 35%;
    padding-top: 20px;
    padding-bottom: 20px;
    text-align: center;
    font-size: 25px;
    font-weight: bold;
    cursor: pointer;
`

export function Login(){
    const navigate = useNavigate();

    return <>
        <Title>Login</Title>
        <Flex>
            <Input type="text" placeholder="Id"/>
            <Input type="password" placeholder="Password"/>
            <LoginBtn>로그인</LoginBtn>
            <LoginBtn onClick={()=>{navigate("/signup")}}>회원가입</LoginBtn>
        </Flex>
    </>
}