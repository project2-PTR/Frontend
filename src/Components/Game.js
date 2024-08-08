import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components"

const Container = styled.div`
    width: 1344px;
    height: 756px;
    margin: auto;
    border: 1px solid gray;
    display: ${props => (props.hidden ? 'none' : 'block')};
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  padding: 5px;
`;

export function Game(){
    const [hiddenGame, sethiddenGame] = useState(false);
    const location = useLocation();

    useEffect(() => {
        // 현재 URL 경로 확인
        if (location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/logout') {
            sethiddenGame(true);
        } else {
            sethiddenGame(false);
        }
    }, [location.pathname]);

    return <>
        <Container hidden={hiddenGame}>
            <StyledLink to='/feed'>Feed</StyledLink>
            <StyledLink to='/lecture'>Lecture</StyledLink>
            <StyledLink to='/teacher'>Teacher</StyledLink>
            <StyledLink to='/teacher/search'>TeacherSearch</StyledLink>
            <StyledLink to='/record'>Record</StyledLink>
        </Container>
    </>
}