import styled from "styled-components";
import { PopupContainer } from "./PopupContainer";
import { SessionCurrent } from "./SessionCurrent";
import { useEffect, useState } from "react";
import axios from "axios";
import cashImg from "./../img/cash.jpg";

const Flex = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`

const Grid = styled.div`
    display: grid;
    grid-template-columns: 10% auto auto auto;
    gap: 10px 50px;
    align-items: center;
    padding: 50px 50px;
    font-size: 20px;
`

const Img = styled.img`
    width: 70%;
`

const BuyBtn = styled.div`
    padding: 10px 20px;
    background-color: #041346;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    text-align: center;
`







const Button = styled.button`
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 16px;
    border-radius: 5px;
    margin: 0;
    &:hover {
        background-color: #e0e0e0;
    }
    &:focus {
        outline: none;
    }
`;

const InputContainer = styled.div`
    display: flex;
    align-items: center;
`;

const NumberInput = styled.input`
    width: 60px;
    text-align: center;
    padding: 5px;
    border: 1px solid #ccc;
    font-size: 16px;

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* -moz-appearance: textfield; */
`;


export function CashBuy(){
    const [inputValues, setInputValues] = useState({
        single: 0,
        five: 0,
        ten: 0,
        fifty: 0,
        hundred: 0
    });
    
    const handleIncrement = (key) => {
        setInputValues(prev => ({ ...prev, [key]: prev[key] + 1 }));
    };
    
    const handleDecrement = (key) => {
        setInputValues(prev => ({ ...prev, [key]: Math.max(prev[key] - 1, 0) }));
    };
    
    const [sum, setSum] = useState(0);

    useEffect(() => {
        setSum(inputValues.single*200 + inputValues.five*1000 + inputValues.ten*2000 + inputValues.fifty*10000 + inputValues.hundred*20000);
        setCashBuy(inputValues.single + inputValues.five*5 + inputValues.ten*10 + inputValues.fifty*50 + inputValues.hundred*100)
    }, [inputValues]);



    const { sessionUser } = SessionCurrent();
    const [nowCash, setNowCash] = useState();
    const [cashBuy, setCashBuy] = useState(0);

    useEffect(() => {
        if (sessionUser) {
            findCoin();
        }
    }, [sessionUser]);
    
    async function findCoin(){
        try{
            const response = await axios.post("http://localhost:8080/api/findCoin", {userId: sessionUser});
            const data = response.data;
            console.log(data);
            setNowCash(data)
        }catch(error){
            console.log("요청에 실패했습니다.", error);
        }
    }

    async function changeCoin(){
        try{
            const response = await axios.post("http://localhost:8080/api/changeCoin", {userId: sessionUser, coin: (cashBuy+nowCash)});
            const data = response.data;
            console.log(data);
            alert("구매가 정상적으로 처리되었습니다.");
        }catch(error){
            console.log("요청에 실패했습니다.", error);
        }
    }

    return (
        <PopupContainer padding="40px 70px">
            <Flex>
                <div style={{fontSize:"25px", fontWeight:"bold", marginRight:"30px"}}>단백질바 구매</div>
                <div>현재 보유 단백질바 {nowCash}개</div>
                <div>+</div>
                <div>충전 단백질바 {cashBuy}개</div>
                <div>=</div>
                <div>충전후 단백질바 {nowCash+cashBuy}개</div>
            </Flex>
            <Grid>
                <Img src={cashImg} />
                <div>단백질바 1개</div>
                <div>200원</div>
                <InputContainer>
                    <Button onClick={() => handleDecrement('single')}>-</Button>
                    <NumberInput 
                        type="number" 
                        min="0" 
                        value={inputValues.single} 
                        onChange={(e) => setInputValues(prev => ({ ...prev, single: Number(e.target.value) }))} 
                    />
                    <Button onClick={() => handleIncrement('single')}>+</Button>
                </InputContainer>
                <Img src={cashImg} />
                <div>단백질바 5개</div>
                <div>1,000원</div>
                <InputContainer>
                    <Button onClick={() => handleDecrement('five')}>-</Button>
                    <NumberInput 
                        type="number" 
                        min="0" 
                        value={inputValues.five} 
                        onChange={(e) => setInputValues(prev => ({ ...prev, five: Number(e.target.value) }))} 
                    />
                    <Button onClick={() => handleIncrement('five')}>+</Button>
                </InputContainer>
                <Img src={cashImg} />
                <div>단백질바 10개</div>
                <div>2,000원</div>
                <InputContainer>
                    <Button onClick={() => handleDecrement('ten')}>-</Button>
                    <NumberInput 
                        type="number" 
                        min="0" 
                        value={inputValues.ten} 
                        onChange={(e) => setInputValues(prev => ({ ...prev, ten: Number(e.target.value) }))} 
                    />
                    <Button onClick={() => handleIncrement('ten')}>+</Button>
                </InputContainer>
                <Img src={cashImg} />
                <div>단백질바 50개</div>
                <div>10,000원</div>
                <InputContainer>
                    <Button onClick={() => handleDecrement('fifty')}>-</Button>
                    <NumberInput 
                        type="number" 
                        min="0" 
                        value={inputValues.fifty} 
                        onChange={(e) => setInputValues(prev => ({ ...prev, fifty: Number(e.target.value) }))} 
                    />
                    <Button onClick={() => handleIncrement('fifty')}>+</Button>
                </InputContainer>
                <Img src={cashImg} />
                <div>단백질바 100개</div>
                <div>20,000원</div>
                <InputContainer>
                    <Button onClick={() => handleDecrement('hundred')}>-</Button>
                    <NumberInput 
                        type="number" 
                        min="0" 
                        value={inputValues.hundred} 
                        onChange={(e) => setInputValues(prev => ({ ...prev, hundred: Number(e.target.value) }))} 
                    />
                    <Button onClick={() => handleIncrement('hundred')}>+</Button>
                </InputContainer>
            </Grid>
            <Flex style={{justifyContent:"center"}}>
                <div style={{fontSize:"20px", fontWeight:"bold"}}>총 결제 금액 {sum}원</div>
                <BuyBtn onClick={()=>{changeCoin()}}>결제하기</BuyBtn>
            </Flex>
        </PopupContainer>
    );
    
}