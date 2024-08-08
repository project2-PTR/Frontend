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

export function Game3(){
    const [hiddenGame, sethiddenGame] = useState(false);
    const location = useLocation();

    useEffect(() => {
        // 현재 URL 경로 확인
        if (location.pathname === '/') {
            sethiddenGame(false);
        } else {
            sethiddenGame(true);
        }
    }, [location.pathname]);

    return <>
        <Container hidden={hiddenGame}>
            <Link to='/feed'>Feed</Link>
            <Link to='/lecture'>Lecture</Link>
            <Link to='/teacher'>Teacher</Link>
            <Link to='/record'>Record</Link>
        </Container>
    </>
}