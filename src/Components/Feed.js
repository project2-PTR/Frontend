import styled from "styled-components";
import { ScrollableContent, Title } from "./Styles";
import { PopupContainer } from "./PopupContainer";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import heart from "./../img/heart.png";
import redheart from "./../img/redheart.png";
import bookmark from "./../img/bookmark.png";
import blackbookmark from "./../img/blackbookmark.png";
import { SessionCurrent } from "./SessionCurrent";

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
    cursor: pointer;
`

const Input = styled.input`
    width: 100%;
    padding: 3px;
`

const CommentBtn = styled.div`
    background-color: #25559B;
    color: white;
    padding: 3px;
    width: 100px;
    text-align: center;
    cursor: pointer;
`

export function Feed() {
    const { id } = useParams();
    const [feed, setFeed] = useState();
    const [follower, setFollower] = useState();
    const [following, setFollowing] = useState();
    const { sessionUser } = SessionCurrent();
    const [scrap, setScrap] = useState(false);
    const [like, setLike] = useState(false);
    const [likeNum, setLikeNum] = useState(0);
    const [commentList, setCommentList] = useState();
    const [commentPost, setCommentPost] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        GetFeed()
    }, [id]);

    useEffect(() => {
        if(feed){
            GetFollower()
            GetFollowing()
        }
    }, [feed]);

    useEffect(() => {
        if(feed&&sessionUser){
            GetFeedScrap()
            GetFeedLike()
        }
    }, [feed, sessionUser]);

    useEffect(() => {
        if(feed&&sessionUser){
            GetFeedLikeNum()
        }
    }, [like]);

    useEffect(() => {
        if(feed){
            GetFeedCommentList()
        }
    }, [feed, commentPost]);

    async function GetFeed(){
        try{
            const response = await axios.post("http://localhost:8080/api/feed/feed", {id: id});
            const data = response.data;
            // console.log(data);
            setFeed(data)
        }catch(error){
            console.log("요청에 실패했습니다.", error);
        }
    }

    async function GetFollower(){
        try{
            const response = await axios.post("http://localhost:8080/api/userFollow/user2", {userId: feed.user.userId});
            const data = response.data;
            // console.log("GetFollower", data);
            setFollower(data)
        }catch(error){
            console.log("요청에 실패했습니다.", error);
        }
    }

    async function GetFollowing(){
        try{
            const response = await axios.post("http://localhost:8080/api/userFollow/user", {userId: feed.user.userId});
            const data = response.data;
            // console.log("GetFollowing", data);
            setFollowing(data)
        }catch(error){
            console.log("요청에 실패했습니다.", error);
        }
    }

    async function GetFeedScrap(){
        try{
            const response = await axios.post("http://localhost:8080/api/checkFeedScrapClick", {user:{userId: sessionUser}, feed:{id:feed.id}});
            const data = response.data;
            // console.log("GetFeedScrap", data);
            setScrap(data)
        }catch(error){
            console.log("요청에 실패했습니다.", error);
        }
    }

    async function GetFeedLike(){
        try{
            const response = await axios.post("http://localhost:8080/api/checkFeedLikeClick", {user:{userId: sessionUser}, feed:{id:feed.id}});
            const data = response.data;
            // console.log("GetFeedLike", data);
            setLike(data)
        }catch(error){
            console.log("요청에 실패했습니다.", error);
        }
    }

    async function GetFeedLikeNum(){
        try{
            const response = await axios.post("http://localhost:8080/api/numberOfFeedLike", {id:feed.id});
            const data = response.data;
            // console.log("GetFeedLikeNum", data);
            setLikeNum(data)
        }catch(error){
            console.log("요청에 실패했습니다.", error);
        }
    }

    async function ScrapClick(){
        try{
            if(scrap){
                const response = await axios.delete("http://localhost:8080/api/feedScrap", {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: {
                        user: { userId: sessionUser },
                        feed: { id: feed.id }
                    }
                });
                const data = response.data;
                // console.log(data)
                setScrap(!scrap);
            }else{
                const response = await axios.post("http://localhost:8080/api/feedScrap", {user:{userId: sessionUser}, feed:{id:feed.id}});
                const data = response.data;
                // console.log(data)
                setScrap(!scrap);
            }
        }catch(error){
            console.log("요청에 실패했습니다.", error);
        }
    }

    async function LikeClick(){
        try{
            if(like){
                const response = await axios.delete("http://localhost:8080/api/feedLike", {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: {
                        user: { userId: sessionUser },
                        feed: { id: feed.id }
                    }
                });
                const data = response.data;
                // console.log(data)
                setLike(!like);
            }else{
                const response = await axios.post("http://localhost:8080/api/feedLike", {user:{userId: sessionUser}, feed:{id:feed.id}});
                const data = response.data;
                // console.log(data)
                setLike(!like);
            }
        }catch(error){
            console.log("요청에 실패했습니다.", error);
        }
    }


    async function GetFeedCommentList(){
        try{
            const response = await axios.post("http://localhost:8080/api/getFeedComment", {id:feed.id});
            const data = response.data;
            // console.log("GetFeedCommentList", data);
            setCommentList(data)
        }catch(error){
            console.log("요청에 실패했습니다.", error);
        }
    }

    let commentText;

    async function CommentPost(){
        try{
            const response = await axios.post("http://localhost:8080/api/feedComment", {feed: {id:feed.id}, user: {userId: sessionUser}, text: commentText});
            const data = response.data;
            console.log("CommentPost", data);
            setCommentPost(!commentPost);
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
                        <ProfileImg src={feed.user.profileImg} onClick={()=>{navigate("/feed/user/"+feed.user.userId)}}/>
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
                            <img src={like? redheart: heart} style={{height: "25px", cursor:"pointer"}} onClick={()=>{LikeClick()}}/>
                            <div style={{marginLeft:"-10px", cursor:"pointer"}}>{likeNum}</div>
                            <img src={scrap? blackbookmark: bookmark} style={{height: "25px", cursor:"pointer"}} onClick={()=>{ScrapClick()}}/>
                        </Flex>
                    </Flex>
                </Contents>
                <Contents>
                    <div style={{padding:"10px 20px"}}>댓글 {commentList? commentList.length+"개": "없음"}</div>
                    <ScrollableContent width="90%" height="400px">
                        {commentList && commentList.map((comment, index)=> comment.feedComment==null?(
                            <FeedCommentBar key={index} comment={comment} func={() => setCommentPost(!commentPost)}/>
                        ):null)}
                    </ScrollableContent>
                    <Flex style={{gap: "0", padding: "10px"}}>
                        <Input type="text" placeholder="댓글 내용을 입력하시오." onChange={(e)=> {commentText = e.target.value}}/>
                        <CommentBtn onClick={()=>{CommentPost()}}>댓글달기</CommentBtn>
                    </Flex>
                </Contents>
            </Container>
        </PopupContainer>: <div/>}
    </>
}

const FeedCommentContainer = styled.div`
    /* background-color: #ccc; */
    border-radius: 5px;
    /* padding: 10px; */
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
`

const Img = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
`

export function FeedCommentBar({comment, func}){
    const navigate = useNavigate();
    const { sessionUser } = SessionCurrent();
    const [commentList, setCommentList] = useState();
    const [like, setLike] = useState(false);
    const [likeNum, setLikeNum] = useState(0);
    const [commentLook, setCommentLook] = useState(false);
    const [commentWriteLook, setCommentWriteLook] = useState(false);
    const [commentPost, setCommentPost] = useState(false);

    const commentInputRef = useRef(null);
    
    const handleClickOutside = (event) => {
        if (commentInputRef.current && !commentInputRef.current.contains(event.target)) {
            setCommentWriteLook(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    
    useEffect(() => {
        getFeedCommentByFeedComment()
    }, [commentPost]);

    useEffect(() => {
        if(sessionUser){
            GetFeedLike()
        }
    }, [sessionUser]);

    useEffect(() => {
        GetFeedLikeNum()
    }, [like]);
    
    async function getFeedCommentByFeedComment(){
        try{
            const response = await axios.post("http://localhost:8080/api/getFeedCommentByFeedComment", {id:comment.id});
            const data = response.data;
            // console.log("GetFeedCommentList", data);
            setCommentList(data)
        }catch(error){
            console.log("요청에 실패했습니다.", error);
        }
    }    
    
    async function GetFeedLike(){
        try{
            const response = await axios.post("http://localhost:8080/api/checkFeedCommentLikeClick", {user:{userId: sessionUser}, feedComment:{id:comment.id}});
            const data = response.data;
            // console.log("GetFeedLike", data);
            setLike(data)
        }catch(error){
            console.log("요청에 실패했습니다.", error);
        }
    }

    async function GetFeedLikeNum(){
        try{
            const response = await axios.post("http://localhost:8080/api/numberOfFeedCommentLike", {id:comment.id});
            const data = response.data;
            // console.log("GetFeedLike", data);
            setLikeNum(data)
        }catch(error){
            console.log("요청에 실패했습니다.", error);
        }
    }

    async function LikeClick(){
        try{
            if(like){
                const response = await axios.delete("http://localhost:8080/api/feedCommentLike", {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: {
                        user: { userId: sessionUser },
                        feedComment:{id: comment.id}
                    }
                });
                const data = response.data;
                // console.log(data)
                setLike(!like);
            }else{
                const response = await axios.post("http://localhost:8080/api/feedCommentLike", {user:{userId: sessionUser}, feedComment:{id:comment.id}});
                const data = response.data;
                // console.log(data)
                setLike(!like);
            }
        }catch(error){
            console.log("요청에 실패했습니다.", error);
        }
    }

    let commentText;

    async function CommentPost(){
        try{
            const response = await axios.post("http://localhost:8080/api/feedComment", {feed: {id: comment.feed.id}, user: {userId: sessionUser}, text: commentText, feedComment: {id: comment.id}});
            const data = response.data;
            console.log("CommentPost", data);
            setCommentPost(!commentPost);
            func();
        }catch(error){
            console.log("요청에 실패했습니다.", error);
        }
    }
    
    return <>
        <FeedCommentContainer>
            <Flex style={{alignItems:"start"}}>
                <Img src={comment.user.profileImg} onClick={()=>{navigate("/feed/user/"+comment.user.userId)}}/>
                <div style={{width: "100%"}}>
                    <Flex style={{gap: "5px", marginBottom: "5px"}}>
                        <div>{comment.user.userId}</div>
                        <div style={{fontSize: "10px", color: "gray"}}>{comment.createdAt}</div>
                    </Flex>
                    <Flex style={{justifyContent: "space-between"}}>
                        <div>
                            <div>{comment.text}</div>
                            <Flex>
                                <div style={{fontSize: "12px", color: "gray", marginTop: "5px", cursor:"pointer"}} onClick={()=>{setCommentWriteLook(!commentWriteLook)}}>답글달기</div>
                                {commentList? commentList.length!=0? 
                                    (<div style={{fontSize: "12px", color: "gray", marginTop: "5px", cursor:"pointer"}} onClick={()=>{setCommentLook(!commentLook)}}>
                                    {commentLook? "↑답글닫기": "↓답글보기("+commentList.length+"개)"}</div>): null: null
                                }
                            </Flex>
                        </div>
                        <Flex style={{gap: "5px"}}>
                            <img src={like? redheart: heart} style={{height: "15px", cursor:"pointer"}} onClick={()=>{LikeClick()}}/>
                            <div style={{cursor:"pointer"}}>{likeNum}</div>
                        </Flex>
                    </Flex>
                    {commentWriteLook? <Flex ref={commentInputRef} style={{gap: "0"}}>
                        <Input type="text" placeholder="답글 내용을 입력하시오." onChange={(e)=> {commentText = e.target.value}}/>
                        <CommentBtn onClick={()=>{CommentPost()}}>답글달기</CommentBtn>
                    </Flex>: null}
                    {commentLook? commentList.map((comment, index)=> (
                        <FeedCommentBar key={index} comment={comment} func={func}/>
                    )): null}
                </div>
            </Flex>
        </FeedCommentContainer>
    </>
}
