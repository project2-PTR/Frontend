import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    width: 1344px;
    height: 756px;
    margin: auto;
    border: 1px solid gray;
    display: ${props => (props.hidden ? 'none' : 'block')};
    position: relative; // 패널을 중앙에 배치하기 위한 설정
`;

const Popup = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    border: 1px solid gray;
    padding: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    z-index: 10; // 팝업이 다른 요소 위에 나타나게 하기 위한 설정
`;

const CloseButton = styled.button`
    margin-top: 10px;
    padding: 5px 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

export function Game2() {
    const [hiddenGame, setHiddenGame] = useState(false);
    const [popup, setPopup] = useState(null); // 현재 열려 있는 팝업 상태
    const location = useLocation();

    useEffect(() => {
        // 현재 URL 경로 확인
        if (location.pathname === '/') {
            setHiddenGame(false);
            setPopup(null); // 홈으로 돌아가면 팝업 닫기
        } else {
            setHiddenGame(true);
        }
    }, [location.pathname]);

    const handleLinkClick = (page) => {
        setPopup(page); // 클릭한 페이지에 따른 팝업 설정
    };

    const closePopup = () => {
        setPopup(null); // 팝업 닫기
    };

    return (
        <>
            <Container hidden={hiddenGame}>
                <Link to='/feed' onClick={() => handleLinkClick('Feed')}>Feed</Link>
                <Link to='/lecture' onClick={() => handleLinkClick('Lecture')}>Lecture</Link>
                <Link to='/teacher' onClick={() => handleLinkClick('Teacher')}>Teacher</Link>
                <Link to='/record' onClick={() => handleLinkClick('Record')}>Record</Link>
            </Container>
            {popup && (
                <Popup>
                    <h2>{popup} 팝업</h2>
                    <p>{popup}에 대한 내용이 여기에 표시됩니다.</p>
                    <CloseButton onClick={closePopup}>닫기</CloseButton>
                </Popup>
            )}
        </>
    );
}
