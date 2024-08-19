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
            <StyledLink to='/feed/1'>Feed</StyledLink>
            <StyledLink to='/feed/user/rose'>FeedUser</StyledLink>
            <StyledLink to='/feed/scrap'>FeedScrap</StyledLink>
            <StyledLink to='/feed/like'>FeedLike</StyledLink>
            <StyledLink to='/lecture/1'>Lecture</StyledLink>
            <StyledLink to='/lecture/search'>LectureSearch</StyledLink>
            <StyledLink to='/lecture/buy'>LectureBuy</StyledLink>
            <StyledLink to='/lecture/scrap'>LectureScrap</StyledLink>
            <StyledLink to='/teacher/1'>Teacher</StyledLink>
            <StyledLink to='/teacher/search'>TeacherSearch</StyledLink>
            <StyledLink to='/teacher/subscription'>TeacherSub</StyledLink>
            <StyledLink to='/record'>Record</StyledLink>
            <StyledLink to='/cashbuy'>Cash</StyledLink>
            <StyledLink to='/gym'>Gym</StyledLink>
        </Container>
    </>
}