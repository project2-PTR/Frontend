import { useNavigate, useParams } from "react-router-dom";
import { PopupContainer } from "./PopupContainer";
import { useEffect, useState } from "react";
import axios from "axios";
import { SessionCurrent } from "./SessionCurrent";
import styled from "styled-components";
import { FollowerTooltip, FollowingTooltip, ScrollableContent, Tooltip } from "./Styles";

const ProfileImg = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 50%;
`

const Flex = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

const FlexC = styled.div`
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    gap: 10px;
`

const ProfileText = styled.div`
    background-color: #ccc;
    border-radius: 5px;
    padding: 10px;
`

const FeedContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 15px;
`

const Img = styled.img`
    width: 100%;
    cursor: pointer;
    &:hover {
        box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.4);
        transform: scale(1.03);
    }
`

const Btn = styled.div`
    width: 150px;
    padding: 10px 0;
    border-radius: 5px;
    /* background-color: gray; */
    border: 1px solid black;
    text-align: center;
    cursor: pointer;
    &:hover {
        /* box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.4); */
        background-color: #25559B;
        color: white;
    }
`

export function FeedUser(){
    const { id } = useParams();
    const [user, setUser] = useState();
    const [feedList, setFeedList] = useState();
    const [follower, setFollower] = useState();
    const [following, setFollowing] = useState();
    const { sessionUser } = SessionCurrent();
    const navigate = useNavigate();
    const [sessionUserFollow, setSessionUserFollow] = useState();
    const [followChange, setFollowChange] = useState(false);
    const [teacher, setTeacher] = useState(false);
    const [isMyPage, setIsMyPage] = useState(false);

    useEffect(() => {
        GetFeedList()
        GetUser()
        IsTeacher()
    }, [id]);

    useEffect(() => {
        GetFollower()
        GetFollowing()
    }, [id, followChange]);

    useEffect(() => {
        if(sessionUser && follower){
            IsUserFollow()
        }
    }, [sessionUser, follower]);

    useEffect(() => {
        if(sessionUser==id){
            setIsMyPage(true)
        }else{
            setIsMyPage(false)
        }
    }, [id, sessionUser]);

    function IsUserFollow(){
        setSessionUserFollow()
        follower.map((userFollow)=>
            {console.log(userFollow.user.userId);
                if(userFollow.user.userId==sessionUser){
                setSessionUserFollow(userFollow.id)
                return
            }}
        )
    }

    async function GetUser(){
        try{
            const response = await axios.post("http://localhost:8080/api/sendUser", {userId: id});
            const data = response.data;
            console.log("GetUser", data);
            setUser(data)
        }catch(error){
            console.log("요청에 실패했습니다.", error);
        }
    }

    async function GetFeedList(){
        try{
            const response = await axios.post("http://localhost:8080/api/feed/id", {userId: id});
            const data = response.data;
            console.log("GetFeedList", data);
            setFeedList(data)
        }catch(error){
            console.log("요청에 실패했습니다.", error);
        }
    }

    async function GetFollower(){
        try{
            const response = await axios.post("http://localhost:8080/api/userFollow/user2", {userId: id});
            const data = response.data;
            console.log("GetFollower", data);
            setFollower(data)
        }catch(error){
            console.log("요청에 실패했습니다.", error);
        }
    }

    async function GetFollowing(){
        try{
            const response = await axios.post("http://localhost:8080/api/userFollow/user", {userId: id});
            const data = response.data;
            console.log("GetFollowing", data);
            setFollowing(data)
        }catch(error){
            console.log("요청에 실패했습니다.", error);
        }
    }

    async function FollowClick(){
        try{
            if(sessionUserFollow){
                const response = await axios.delete("http://localhost:8080/api/userFollow", {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: {
                        id:sessionUserFollow
                    }
                });
                const data = response.data;
                console.log("FollowClick", data)
                setFollowChange(!followChange);
            }else{
                const response = await axios.post("http://localhost:8080/api/userFollow", {user:{userId: sessionUser}, user2:{userId: id}});
                const data = response.data;
                console.log("FollowClick", data)
                setFollowChange(!followChange);
            }
        }catch(error){
            console.log("요청에 실패했습니다.", error);
        }
    }

    async function IsTeacher(){
        try{
            const response = await axios.post("http://localhost:8080/api/userIsTeacher", {userId: id});
            const data = response.data;
            console.log("IsTeacher", data);
            setTeacher(data)
        }catch(error){
            console.log("요청에 실패했습니다.", error);
        }
    }

    return <PopupContainer padding="20px 80px">
        {user? <>
            <Flex style={{marginBottom:"20px"}}>
                <FlexC style={{marginRight:"20px", alignItems:"center", gap: "0"}}>
                    <ProfileImg src={user.profileImg}/>
                    <div style={{fontSize:"30px", fontWeight:"bold"}}>{id}</div>
                </FlexC>
                {follower && following && feedList? <FlexC>
                    <Flex style={{gap: "30px", fontSize: "20px"}}>
                        <FlexC style={{gap: "0", alignItems:"center"}}>
                            <div>피드</div>
                            <div>{feedList.length}개</div>
                        </FlexC>
                        <Tooltip tooltipContents={FollowerTooltip(follower, ()=>{setFollowChange(!followChange)})}>
                            <FlexC style={{gap: "0", alignItems:"center", cursor:"pointer"}}>
                                <div>팔로워</div>
                                <div>{follower.length}명</div>
                            </FlexC>
                        </Tooltip>
                        <Tooltip tooltipContents={FollowingTooltip(following, ()=>{setFollowChange(!followChange)})}>
                            <FlexC style={{gap: "0", alignItems:"center", cursor:"pointer"}}>
                                <div>팔로잉</div>
                                <div>{following.length}명</div>
                            </FlexC>
                        </Tooltip>
                    </Flex>
                    <Flex>
                        {isMyPage? <Btn onClick={()=>{}}>프로필 편집</Btn> :<Btn onClick={()=>{FollowClick()}}>{sessionUserFollow? "팔로잉": "팔로우"}</Btn>}
                        {teacher? <Btn onClick={()=>{navigate("/teacher/"+teacher.id)}}>강사 페이지로 이동</Btn>: null}
                    </Flex>
                    <ProfileText>{user.profileText}</ProfileText>
                </FlexC>: null}
            </Flex>
        </>: null}
        <ScrollableContent width="100%" height="500px">
            <FeedContainer>
                {feedList && feedList.map((feed, index)=>(
                    <Img key={index} src={feed.image} onClick={()=>{navigate("/feed/"+feed.id)}}/>
                ))}
            </FeedContainer>
        </ScrollableContent>
    </PopupContainer>
}