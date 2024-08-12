import styled from "styled-components"
import { Title } from "./Styles"
import { useState } from "react"
import axios from "axios"

const Grid = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    align-items: center;
    gap: 10px;
    text-align: end;
    font-size: 25px;
`

const Input = styled.input`
    border: 2px solid white;
    border-radius: 10px;
    background-color: #333;
    padding: 10px 10px;
    width: 35%;
    font-size: 25px;
    color: white;
    margin-left: 30px;
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
    margin: 100px auto;
    cursor: pointer;
`

export function Signup(){
    const [user, setUser] = useState(null);

    let id;
    let password;
    let name;
    let email;
    let birthday;

    async function signup(){
        if(id==null || password==null || name==null || email==null || birthday==null){
            alert("빈칸이 있습니다.");
            return;
        }
        const user = {
            userId: id,
            password: password,
            userName: name,
            userEmail: email,
            birthday: birthday
        };
        const sessionUser = {
            userId: id,
            password: password
        }
        try{
            const response = await axios.post("http://localhost:8080/api/signup", user);
            const data = response.data;
            console.log(data);
            alert(data);
            if(data == "이미 등록된 아이디입니다."){
                return;
            } else{
                setUser(sessionUser);
            }
            window.location.href = '/login';
        }catch(error){
            console.log("요청에 실패했습니다.", error);
        }
    }

    return <>
        <Title>Signup</Title>
        <Grid>
            <div>Id</div>
            <Input type="text" onChange={(e)=> {id = e.target.value}}/>
            <div>Password</div>
            <Input type="password" onChange={(e)=> {password = e.target.value}}/>
            <div>Name</div>
            <Input type="text" onChange={(e)=> {name = e.target.value}}/>
            <div>Email</div>
            <Input type="text" onChange={(e)=> {email = e.target.value}}/>
            <div>Birthday</div>
            <Input type="date" onChange={(e)=> {birthday = e.target.value}}/>
        </Grid>
        <LoginBtn onClick={()=>{signup()}}>회원가입</LoginBtn>
    </>
}