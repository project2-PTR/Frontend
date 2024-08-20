import styled from "styled-components";
import { PopupContainer } from "./PopupContainer";
import { ScrollableContent, Title } from "./Styles";
import { useEffect, useState } from "react";
import axios from "axios";

const SearchBox = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 30px;
`

const Input = styled.input`
    border: 2px solid black;
    border-radius: 5px;
    padding: 10px 10px;
    font-size: 15px;
    color: black;
    flex: 1;
`

const SearchBtn = styled.div`
    font-size: 15px;
    padding: 10px 20px;
    background-color: #041346;
    color: white;
    border-radius: 5px;
    cursor: pointer;
`

export function FeedUserSearch(){
    const [userList, setUserList] = useState([]);
    const [userSearchList, setUserSearchList] = useState([]);

    useEffect(() => {
        getAllUser()
    }, []);

    async function getAllUser(){
        try{
            const response = await axios.get("http://localhost:8080/api/allUser");
            const data = response.data;
            console.log("getAllUser", data);
            setUserList(data);
        }catch(error){
            console.log("요청에 실패했습니다.", error);
        }
    }

    let search = ""

    function SearchBtnClick(){
        if(search==""){
            setUserSearchList([])
        }else{
            userList && userList.map((user)=>{
                // if(user.userId==search){
                //     setUserSearchList(userSearchList+user)
                // }else if(user.profileText==search){
                //     setUserSearchList(userSearchList+user)
                // }


                if (user.userId.includes(search) || user.profileText.includes(search)) {
                    setUserSearchList(prevList => [...prevList, user]);
                }
            })
        }
    }

    return <>
        <PopupContainer>
            <div style={{padding: '0 50px'}}>
                <Title style={{padding:'30px 0px 30px 0px'}}>유저 검색</Title>
                <SearchBox>
                    <Input type="text" placeholder="유저 아이디를 입력하시오." onChange={(e)=> {search = e.target.value}} />
                    <SearchBtn onClick={()=>{SearchBtnClick()}}>검색</SearchBtn>
                </SearchBox>
                <ScrollableContent height="500px" width="100%">
                    {userSearchList==null? <UserBar userList={userList} />:  <UserBar userList={userSearchList} />}
                </ScrollableContent>
            </div>
        </PopupContainer>
    </>
}

const UserBox = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 15px;
    padding: 10px;
`
function UserBar({ userList }){
    return <UserBox>
        {
          userList && userList.map((user, index)=>(
            // <LectureContainer key={lecture.id} lecture={lecture}/>
            <div key={index}>{user.userId}</div>
          ))
        }
    </UserBox>
}