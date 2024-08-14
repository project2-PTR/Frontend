import styled from "styled-components";
import { PopupContainer } from "./PopupContainer";
import { ScrollableContent, Title } from "./Styles";
import { useEffect, useState } from "react";
import axios from "axios";
import { SessionCurrent } from "./SessionCurrent";
import { TeacherBar } from "./TeacherSearch";

const SearchBox = styled.div`
    display: flex;
    gap: 5px;
    width: 90%;
    margin: auto auto -1px auto;
    padding: 5px;
    border: 1px solid #ccc;
`

const Input = styled.input`
    border: 1px solid black;
    border-radius: 5px;
    font-size: 15px;
    color: black;
    flex: 1;
    padding-left: 10px;
`

const SearchBtn = styled.div`
    font-size: 15px;
    padding: 5px 10px;
    background-color: #041346;
    color: white;
    border-radius: 5px;
    cursor: pointer;
`

export function TeacherSub(){
    const { sessionUser } = SessionCurrent();
    const [teacherList, setTeacherList] = useState(null);

    useEffect(() => {
        if (sessionUser) {
            mySubTeacher();
        }
    }, [sessionUser]);

    async function mySubTeacher(){
        try{
            const response = await axios.post("http://localhost:8080/api/mySubscription", {userId: sessionUser});
            const data = response.data;
            console.log(data);
            setTeacherList(data);
        }catch(error){
            console.log("요청에 실패했습니다.", error);
        }
    }

    return <>
        <PopupContainer>
            <Title style={{padding:'30px 0px 30px 0px'}}>구독한 강사</Title>
            <SearchBox>
                <Input type="text" placeholder="강사 이름을 입력하시오."/>
                <SearchBtn>검색</SearchBtn>
            </SearchBox>
            <ScrollableContent height="500px" width="90%">
                {teacherList!=null? <SubTeacher teacherList={teacherList} />: null}
            </ScrollableContent>
        </PopupContainer>
    </>
}

const TeacherBox = styled.div``

function SubTeacher( {teacherList} ){
    return <TeacherBox>
        {
          teacherList && teacherList.map((teacher)=>(
            <TeacherBar key={teacher.id} teacher={teacher.teacher}/>
          ))
        }
    </TeacherBox>
}