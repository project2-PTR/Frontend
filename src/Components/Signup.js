import styled from "styled-components"
import { Title } from "./Styles"

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
    return <>
        <Title>Signup</Title>
        <Grid>
            <div>Id</div>
            <Input type="text" />
            <div>Password</div>
            <Input type="password" />
            <div>Name</div>
            <Input type="text" />
            <div>Email</div>
            <Input type="text" />
            <div>Birthday</div>
            <Input type="date" />
        </Grid>
        <LoginBtn>회원가입</LoginBtn>
    </>
}