import { Link } from "react-router-dom"
import styled from "styled-components"

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #222;
    color: white;
    padding: 10px 40px;
    font-size: 20px;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`

export function Header(){
    return<>
        <Container>
            <StyledLink to='/' style={{ fontWeight: 'bold', fontSize: '30px' }}>PTR</StyledLink>
            <Login/>
        </Container>
    </>
}

function Login(){
    return <>
        <StyledLink to='/login' style={{ fontSize: '20px' }}>로그인 / 회원가입</StyledLink>
        {/* <StyledLink to='/logout' fontstyle="20px">로그아웃</StyledLink> */}
    </>
}