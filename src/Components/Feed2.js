import styled from "styled-components";
import { Title } from "./Styles";

const TabContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: end;
    margin-right: 20px;
    position: absolute; /* 절대 위치로 설정 */
    right: 20px; /* 오른쪽에서 20px 떨어진 위치 */
    bottom: 20px; /* 아래쪽에서 20px 떨어진 위치 */
`

const Tab = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #fff;
    color: black;
    text-align: center;
    padding: 10px;
    cursor: pointer;
`

const Img = styled.img`
    width: 50px;
    height: 50px;
`

export function Feed2(){
    return <>
        <Title>Feed</Title>
        <FeedTab/>
    </>
}

function FeedTab(){
    return <>
        <TabContainer>
            <Tab>
                <Img></Img>
                <div>피드홈</div>
            </Tab>
            <Tab>
                <Img></Img>
                <div>피드검색</div>
            </Tab>
            <Tab>
                <Img></Img>
                <div>개인피드</div>
            </Tab>
            <Tab>
                <Img></Img>
                <div>피드작성</div>
            </Tab>
            <Tab>
                <Img></Img>
                <div>좋아요</div>
            </Tab>
            <Tab>
                <Img></Img>
                <div>스크랩</div>
            </Tab>
        </TabContainer>
    </>
}