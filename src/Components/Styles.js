import styled from "styled-components";

export const Title = styled.div`
    font-size: 50px;
    padding-top: 100px;
    padding-bottom: 80px;
    text-align: center;
`



const ScrollableContainer = styled.div`
    width: ${props => props.width};         /* 컨테이너의 너비 */
    height: ${props => props.height};      /* 고정된 높이 설정 */
    overflow-y: auto;   /* 수직 스크롤 활성화 */
    border: 1px solid #ccc; /* 경계선 추가 (선택 사항) */
    padding: 10px;      /* 내부 여백 추가 (선택 사항) */
    margin: auto;
`

export function ScrollableContent({ width, height, children }) {
    return (
        <ScrollableContainer height={height} width={width}>
            { children }
        </ScrollableContainer>
    );
}