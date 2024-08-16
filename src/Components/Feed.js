import styled from "styled-components";
import { Title } from "./Styles";
import { PopupContainer } from "./PopupContainer";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import heart from "./../img/heart.png";
import redheart from "./../img/redheart.png";
import bookmark from "./../img/bookmark.png";
import blackbookmark from "./../img/blackbookmark.png";

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 30px;
    gap: 10px;
`

const Contents = styled.div`
    border: 1px solid black;
`

const Flex = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
`

const ProfileImg = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
`

export function Feed() {
    const { id } = useParams();
    const [feed, setFeed] = useState();
    const [follower, setFollower] = useState();
    const [following, setFollowing] = useState();

    useEffect(() => {
        GetFeed()
    }, [id]);

    useEffect(() => {
        if(feed){
            GetFollower()
            GetFollowing()
        }
    }, [feed]);

    async function GetFeed(){
        try{
            const response = await axios.post("http://localhost:8080/api/feed/feed", {id: id});
            const data = response.data;
            console.log(data);
            setFeed(data)
        }catch(error){
            console.log("요청에 실패했습니다.", error);
        }
    }

    async function GetFollower(){
        try{
            const response = await axios.post("http://localhost:8080/api/userFollow/user2", {userId: feed.user.userId});
            const data = response.data;
            console.log("GetFollower", data);
            setFollower(data)
        }catch(error){
            console.log("요청에 실패했습니다.", error);
        }
    }

    async function GetFollowing(){
        try{
            const response = await axios.post("http://localhost:8080/api/userFollow/user", {userId: feed.user.userId});
            const data = response.data;
            console.log("GetFollowing", data);
            setFollowing(data)
        }catch(error){
            console.log("요청에 실패했습니다.", error);
        }
    }

    return <>
        {feed && follower && following? <PopupContainer>
            <Title style={{padding: "20px"}}>Feed</Title>
            <Container>
                <Contents>
                    <Flex style={{padding: "5px 15px"}}>
                        <ProfileImg src={feed.user.profileImg}/>
                        <div>
                            <Flex>
                                <div style={{fontSize: "20px", fontWeight: "bold"}}>{feed.user.userId}</div>
                                <div>팔로워 {follower.length}명</div>
                                <div>팔로잉 {following.length}명</div>
                            </Flex>
                            <div>{feed.createdAt}업로드</div>
                        </div>
                    </Flex>

                    <img src={feed.image} style={{width: "100%"}}/>
                    <Flex style={{justifyContent: "space-between", padding: "5px 15px"}}>
                        <div>{feed.text}</div>
                        <Flex>
                            <img src={heart} style={{height: "25px"}}/>
                            <img src={bookmark} style={{height: "25px"}}/>
                        </Flex>
                    </Flex>
                </Contents>
                <Contents>
                    <div>댓글</div>
                </Contents>
            </Container>
        </PopupContainer>: <div/>}
    </>
}


