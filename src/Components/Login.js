import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { Title } from "./Styles"
import { useState } from "react"
import axios from "axios"
import { SessionCurrent } from "./SessionCurrent"

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
    const [user, setUser] = useState(null);

    let id;
    let password;

    async function login(){
        if(id==null || password==null){
            alert("빈칸이 있습니다.");
            return;
        }
        const user = {
            userId: id,
            password: password
        };
        try{
            const response = await axios.post("http://localhost:8080/api/user/login", user, { withCredentials: true });
            const data = response.data;
            console.log(data);
            setUser(user);
            alert("로그인에 성공하셨습니다.");
            window.location.href = '/';
        }catch(error){
            console.log("요청에 실패했습니다.", error);
            alert("아이디 또는 비밀번호가 틀렸습니다.");
        }
    }

    return <>
        <Title>Login</Title>
        <Flex>
            <Input type="text" placeholder="Id" onChange={(e)=> {id = e.target.value}} />
            <Input type="password" placeholder="Password" onChange={(e)=> {password = e.target.value}} />
            <LoginBtn onClick={()=>{login()}}>로그인</LoginBtn>
            <LoginBtn onClick={()=>{navigate("/signup")}}>회원가입</LoginBtn>
        </Flex>
    </>
}