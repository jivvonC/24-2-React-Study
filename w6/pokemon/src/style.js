import styled from "styled-components";

export const HeaderImg = styled.img.attrs({
  src: "header.png",
  alt: "pokemon logo",
})`
  width: 100%;
  height: 100%;
 `
export const Toolbar = styled.div`
  background-color: ${({ theme }) => theme.gridcontainer.background};
  height: 3vh;
  display: flex;
  
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
  column-gap: 100px;
  row-gap: 20px;
  padding-top: 30px;
  padding-left: 140px;
  padding-right: 140px;
  padding-bottom: 30px;
  background-color: ${({ theme }) => theme.gridcontainer.background};
`;

export const GridItem = styled.div`
  background-color:${({ theme }) => theme.griditem.background};
  color: ${({ theme }) => theme.griditem.textcolor};
  padding-top: 15px;
  padding-bottom: 3px;
  border-style: solid;
  border-radius: 25px;
  box-shadow: 7px 7px 7px #A4A4A4;

  border-width: 0px;
  text-align: center;
  line-height: 0.8;
  font-family: "pretendard";
  height:27vh;
`;

export const Detail = styled.div`
  background-color: #ffffff;
  padding-top: 200px;
  display: flex;
  justify-content: center;
  text-align: center;


`;

export const Card = styled.div`
  width: 25vw;
  height: 52vh;
  text-align: center;
  font-family: "pretendard";
  background-color: #E6E6E6;
  textcolor: #000000;
  bordercolor: #D8D8D8;
  border-style: solid;
  border-radius: 25px;
  box-shadow: 7px 7px 7px #A4A4A4;
  border-width: 0px;

`;
