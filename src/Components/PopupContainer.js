import { useEffect, useRef } from "react"; // useRef 추가
import { useNavigate } from "react-router-dom"; // useNavigate 추가
import styled from "styled-components";

const Popup = styled.div`
    position: absolute;
    top: 100px; /* 고정된 세로 위치 */
    left: 50%; /* 가로 중앙 */
    transform: translateX(-50%); /* 중앙 정렬을 위해 이동 */
    background: white;
    padding: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    z-index: 10; /* 팝업이 다른 요소 위에 나타나게 하기 위한 설정 */
    color: black;
    width: 1200px;
`;

export function PopupContainer({ children }) {
    const navigate = useNavigate(); // 페이지 이동을 위한 navigate 훅
    const popupRef = useRef(null); // 팝업 요소를 참조하기 위한 ref

    useEffect(() => {
        const handleClickOutside = (event) => {
            // 클릭된 요소가 팝업 내부가 아닐 경우
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                navigate('/'); // '/' 페이지로 이동
            }
        };

        document.addEventListener("mousedown", handleClickOutside); // mousedown 이벤트 리스너 등록

        return () => {
            document.removeEventListener("mousedown", handleClickOutside); // 언마운트 시 리스너 제거
        };
    }, [navigate]);

    return (
        <>
            <Popup ref={popupRef}>
                { children }
            </Popup>
        </>
    );
}