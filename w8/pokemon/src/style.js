import styled from "styled-components";
import './font.css';

export const WholePage = styled.div`
  background-color: ${({ theme }) => theme.gridcontainer.background};
  font-family: 'game';
`;

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
export const ModeSwitch = styled.div`
  position: relative;
  left: 74%
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
  display: flex;
  justify-content: center;
  border-width: 0px;
  text-align: center;
  line-height: 0.8;
  height:27vh;
`;

export const Detail = styled.div`
  background-color: ${({ theme }) => theme.gridcontainer.background};
  padding-top: 200px;
  display: flex;
  justify-content: center;
  text-align: center;
  font-family: 'game';
`;

export const Card = styled.div`
  width: 25vw;
  height: 55vh;
  text-align: center;
  background-color: ${({ theme }) => theme.griditem.background};
  color: ${({ theme }) => theme.griditem.textcolor};
  bordercolor: #D8D8D8;
  border-style: solid;
  border-radius: 25px;
  box-shadow: 7px 7px 7px #A4A4A4;
  border-width: 0px;

`;
export const Type = styled.div`
  width: 6vw;
  height: 2.5vh;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  background-color: green;
  border-radius: 5px;
  
`;
export const xIcon = styled.img.attrs({
  src: "xIcon.png",
  alt: "xIcon",
})`
  width: 2%;
  height: 2%;
  position: relative;
  top: 30px;
  left: 90%;
 `;