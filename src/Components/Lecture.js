import styled from "styled-components";
import { PopupContainer } from "./PopupContainer";
import bookmark from "./../img/bookmark2.png";
import bookmarkcheck from "./../img/bookmark2check.png";

const Title = styled.div`
    font-size: 50px;
    padding-top: 20px;
    padding-bottom: 50px;
    text-align: center;
`
const LectureContainer = styled.div`
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: 50px;
    padding: 0 50px;
    margin-bottom: 20px;
`
const LectureBox = styled.div`
    display: 'flex';
    flex-direction: column;
    position: relative; /* 자식 요소의 절대 위치를 위한 기준 설정 */
`
const Img = styled.img`
    width: 100%;
    aspect-ratio: 2 / 1; /* 2:1 비율로 유지 */
    height: auto; /* 자동으로 높이 조정 */
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
const TeacherImg = styled.img`
    width: 50px;
    height: 50px;
`
const SubBtn = styled.div`
    font-size: 15px;
    padding: 10px 20px;
    background-color: #041346;
    color: white;
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
    margin: 5px 0;
`
const LectureDetailBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 40px 0;
    font-size: 20px;
`
const Flex = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`
const Bold = styled.div`
    font-weight: bold;
`


export function Lecture(){
    return <>
        <PopupContainer>
            <Title>스트레칭 영상입니다.</Title>
            <LectureContainer>
                <LectureBox>
                    <div style={{display:'flex'}}>
                        <Img src="https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_1280.jpg" />
                        <Div><img src={bookmark} style={{width:'100%'}}/></Div>
                    </div>
                    <div style={{fontSize: '25px', marginTop: '30px'}}>영상소개</div>
                    <div>안녕하세요. 스티브입니다. 안녕하세요. 스티브입니다. 안녕하세요. 안녕하세요. 스티브입니다. 안녕하세요.</div>
                </LectureBox>
                <LectureBox>
                    <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                        <TeacherImg src="https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_1280.jpg" />
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <div style={{fontSize: '20px', fontWeight: 'bold'}}>Steve</div>
                            <div style={{fontSize: '15px'}}>구독자 10명</div>
                        </div>
                        <SubBtn>구독</SubBtn>
                    </div>
                    <LectureDetailBox>
                        <Flex>
                            <Bold>구매자수</Bold>
                            <div>10명</div>
                        </Flex>
                        <Flex>
                            <Bold>평점</Bold>
                            <div>10</div>
                        </Flex>
                        <Flex>
                            <Bold>업로드일</Bold>
                            <div>2020-01-01</div>
                        </Flex>
                        <Flex>
                            <Bold>카테고리</Bold>
                            <div>유산소</div>
                        </Flex>
                        <Flex>
                            <Bold>가격</Bold>
                            <div>단백질바 0개</div>
                        </Flex>
                    </LectureDetailBox>
                    <div>
                        <SubBtn>구매하기</SubBtn>
                        <SubBtn>리뷰보기</SubBtn>
                    </div>
                </LectureBox>
            </LectureContainer>
        </PopupContainer>
    </>
}