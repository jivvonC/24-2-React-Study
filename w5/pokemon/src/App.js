import logo from './logo.svg';
//import './App.css';
import dummyData from './dummyData.js';
import { render } from '@testing-library/react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { IoSunnyOutline, IoMoonSharp } from "react-icons/io5";
import { DarkTheme, LightTheme } from "./theme"
import './toggle.css';
import './search.css';



const HeaderImg = styled.img.attrs({
  src: "header.png",
  alt: "pokemon logo",
})`
  width: 100%;
  height: 100%;
 `
const Toolbar = styled.div`
  background-color: ${({ theme }) => theme.gridcontainer.background};
  height: 3vh;
  display: flex;
  
`;

const GridContainer = styled.div`
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

const GridItem = styled.div`
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
  font-family: "malgun gothic";
  height:27vh;
`;


function App() {
  const baseURL = `https://pokeapi.co/api/v2/`;
  const [pokemonData, setPokemonData] = useState([]);
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await axios.get(`${baseURL}/pokemon?offset=0&limit=20`);
        const pokemonList = res.data.results;

        const allPokemonData = [];
        for (const pokemon of pokemonList) {
          const speciesRes = await axios.get(pokemon.url);
          const speciesData = await axios.get(speciesRes.data.species.url);
          const koreanName = speciesData.data.names.find(name => name.language.name === 'ko');

          allPokemonData.push({
            title: koreanName.name,
            sprite: speciesRes.data.sprites.front_default,
            types: speciesRes.data.types
          });
        }
        setPokemonData(allPokemonData); // 상태 업데이트

      } catch (err) {
        console.log(err);
      }
    }

    fetchPokemon();
  }, []);

  const [darkMode, setDarkMode] = React.useState(false);
  const darkModeHandler = (e) => {
    setDarkMode(!darkMode);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const handleInputChange = (event) => {
    const term = event.target.value; // term은 입력하는 글자
    onSearch(term);   // 검색하는 글자(term)로 실시간으로 상태를 업데이트
  }

  const onSearch = (term) => {
    setSearchTerm(term)
  }

  // let filteredItems = pokemonData.filter(function (x) {
  //   return x.title == searchTerm;
  // })

  let filteredItems = pokemonData.filter(function (x) {
    const tt= x.types.map(function (item, i) {
      return(item.type.name)
    })
    return tt.includes(searchTerm);
  })

  return (
    <div className='pokemon'>
      <ThemeProvider theme={darkMode ? DarkTheme : LightTheme}>
        <HeaderImg></HeaderImg>
        <Toolbar>
          <form class="form">
            <button>
              <svg width="17" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="search">
                <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9" stroke="currentColor" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            </button>
            <input class="input" placeholder="타입을 검색하세요" required="" type="text" value={searchTerm} onChange={handleInputChange}></input>
            <button class="reset" type="reset">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </form>

          <label className="switch">
            <span className="sun"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="#ffd43b"><circle r="5" cy="12" cx="12"></circle><path d="m21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1 -.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1 -.75.29zm-12.02 12.02a1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1 -.7.24zm6.36-14.36a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm0 17a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm-5.66-14.66a1 1 0 0 1 -.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.29zm12.02 12.02a1 1 0 0 1 -.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.24z"></path></g></svg></span>
            <span className="moon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="m223.5 32c-123.5 0-223.5 100.3-223.5 224s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"></path></svg></span>
            <input type="checkbox" class="input" id='my_checkbox' onClick={darkModeHandler}></input>
            <span className="slider"></span>
          </label>
        </Toolbar>

        <GridContainer>
          {filteredItems.length > 0 ?
          filteredItems.map(function (item, i) {
              return (
          <GridItem>
            <div className="grid-item" key={i}>
              <img src={item.sprite}></img>
              <h2>{item.title}</h2>
              {item.types.map(slots => <h4>{slots.type.name}</h4>)}
            </div>
          </GridItem>
          )
            }) : pokemonData.map(function (item, i) {
              return (
          <GridItem>
            <div className="grid-item" key={i}>
              <img src={item.sprite}></img>
              <h2>{item.title}</h2>
              {item.types.map(slots => <h4>{slots.type.name}</h4>)}
            </div>
          </GridItem>
          )
            })}
        </GridContainer>
      </ThemeProvider>
    </div>
  )
}


export default App;
