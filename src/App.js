import styled, { createGlobalStyle } from "styled-components";
import { ReactRouter } from "./Components/ReactRouter";

const GlobalStyle = createGlobalStyle`
  @font-face {
      font-family: 'GmarketSansMedium';
      src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff');
      font-weight: normal;
      font-style: normal;
  }
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: GmarketSansMedium;
  }
`

const All = styled.div`
  background-color: #333;
  color: white;
  height: 100vh;
`

const All2 = styled.div`
  background-color: #333;
  color: white;
  padding-bottom: 50px;
  cursor: default;
`

function App() {
  return <>
    <GlobalStyle />
    <All>
      <All2>
        <ReactRouter />
      </All2>
    </All>
  </>
}


export default App;
