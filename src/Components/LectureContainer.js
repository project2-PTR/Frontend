import styled from "styled-components"
import bookmark from "./../img/bookmark2.png";
import bookmarkcheck from "./../img/bookmark2check.png";

const LectureBox = styled.div`
    display: flex;
    flex-direction: column;
    position: relative; /* 자식 요소의 절대 위치를 위한 기준 설정 */
    cursor: pointer;
`
const LectureImg = styled.img`
    width: 100%;
    aspect-ratio: 2 / 1; /* 1:1 비율로 유지 */
    height: auto; /* 자동으로 높이 조정 */
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    position: relative; /* 자식 요소의 절대 위치를 위한 기준 설정 */
`
const Div = styled.div`
    width: 70px;
    height: 70px;
    color: black;
    position: absolute; /* 절대 위치로 설정 */
    top: 5px; /* 이미지 상단에서의 위치 */
    right: 5px; /* 이미지 오른쪽에서의 위치 */
    padding: 5px; /* 여백 추가 */
    cursor: pointer; /* 커서 포인터 추가 */
`
const LectureDetail = styled.div`
    background-color: gray;
    padding: 10px;
`
const LectureTitle = styled.div`
    font-size: 20px;
`
const LectureFlex = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
`
const LectureBuyNum = styled.div`
    font-size: 15px;
`
const LecturePrice = styled.div`
    font-size: 15px;
`

export function LectureContainer(object){
    return <>
        <LectureBox>
            <div style={{display:'flex'}}>
                <LectureImg src="https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_1280.jpg" />
                <Div><img src={bookmark} style={{width:'100%'}}/></Div>
            </div>
            <LectureDetail>
                <LectureTitle>스트레칭 영상입니다.</LectureTitle>
                <LectureFlex>
                    <LectureBuyNum>구매수 30</LectureBuyNum>
                    <LecturePrice>단백질바 3개</LecturePrice>
                </LectureFlex>
            </LectureDetail>
        </LectureBox>  
    </>
}