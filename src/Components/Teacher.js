import styled from "styled-components";
import { PopupContainer } from "./PopupContainer";
import { ScrollableContent, Title } from "./Styles";

const TeacherBarContainer = styled.div`
    display: flex;
    padding: 10px 50px;
    align-items: center;
    margin: 5px;
    justify-content: space-between;
    cursor: pointer;
    margin-bottom: 30px;
`
const TeacherImg = styled.img`
    width: 150px;
    height: 150px;
`
const FlexColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`
const Flex = styled.div`
    display: flex;
    gap: 30px;
    align-items: center;
`
const TeacherName = styled.div`
    font-size: 50px;
    font-weight: bold;
`
const SubNum = styled.div`
    font-size: 20px;
`
const TeacherProfile = styled.div`
    font-size: 20px;
`
const SubBtn = styled.div`
    font-size: 15px;
    padding: 10px 20px;
    background-color: #041346;
    color: white;
    border-radius: 5px;
    text-align: center;
`

export function Teacher(){
    return <>
        <PopupContainer>
            {/* <Title style={{padding:'30px'}}>Teacher</Title> */}
            <TeacherBarContainer>
                <Flex>
                    <TeacherImg src="https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_1280.jpg"/>
                    <FlexColumn>
                        <Flex>
                            <TeacherName>Steve</TeacherName>
                            <SubNum>구독자수 10명</SubNum>
                        </Flex>
                        <TeacherProfile>안녕하세요. 스티브입니다.</TeacherProfile>
                    </FlexColumn>
                </Flex>
                <SubBtn>구독</SubBtn>
            </TeacherBarContainer>
            <ScrollableContent height="500px" width="90%">
                <TeacherLecture>{}</TeacherLecture>
            </ScrollableContent>
        </PopupContainer>
    </>
}

const LectureBox = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 10px;
`
const LectureContainer = styled.div`
    display: flex;
    flex-direction: column;
`
const LectureImg = styled.img`
    width: 100%;
    aspect-ratio: 1 / 1; /* 1:1 비율로 유지 */
    height: auto; /* 자동으로 높이 조정 */
`
const LectureDetail = styled.div`
    background-color: gray;
    padding: 5px;
`
const LectureTitle = styled.div`
    font-size: 20px;
`
const LectureFlex = styled.div`
    display: flex;
    justify-content: space-between;
`
const LectureBuyNum = styled.div`
    font-size: 15px;
`
const LecturePrice = styled.div`
    font-size: 15px;
`

function TeacherLecture(object){
    return <LectureBox>
        <LectureContainer>
            <LectureImg src="https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_1280.jpg"></LectureImg>
            <LectureDetail>
                <LectureTitle>스트레칭 영상입니다.</LectureTitle>
                <LectureFlex>
                    <LectureBuyNum>조회수 30</LectureBuyNum>
                    <LecturePrice>단백질바 3개</LecturePrice>
                </LectureFlex>
            </LectureDetail>
        </LectureContainer>
        <LectureContainer>
            <LectureImg src="https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_1280.jpg"></LectureImg>
            <LectureDetail>
                <LectureTitle>스트레칭 영상입니다.</LectureTitle>
                <LectureFlex>
                    <LectureBuyNum>조회수 30</LectureBuyNum>
                    <LecturePrice>단백질바 3개</LecturePrice>
                </LectureFlex>
            </LectureDetail>
        </LectureContainer>
    </LectureBox>
}