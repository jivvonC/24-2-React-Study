import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as S from "./style";
import * as SE from "./setting.js"
import { ThemeProvider } from "styled-components";
import { DarkTheme, LightTheme } from "./theme"
import './toggle.css';
import './search.css';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import './Paging.css';
import Pagination from "react-js-pagination";
import './font.css';


function Home(){
  const navigate = useNavigate();
  const baseURL = `https://pokeapi.co/api/v2/`;
  let [pokemonData, setPokemonData] = useState([]);
  useEffect(() => {
      const fetchPokemon = async () => {
        try {
          const res = await axios.get(`${baseURL}/pokemon?offset=0&limit=150`);
          const pokemonList = res.data.results;
  
          const allPokemonData = [];
          for (const pokemon of pokemonList) {
            const speciesRes = await axios.get(pokemon.url);
            const speciesData = await axios.get(speciesRes.data.species.url);
            const koreanName = speciesData.data.names.find(name => name.language.name === 'ko');

            const typesData = speciesRes.data.types;
            const typesData2 = typesData.map(function(item){return(item.type.url)});
            var rr=[]
            for (const x of typesData2){
              const temp= await axios.get(x);
              const typeKor = temp.data.names.find(name => name.language.name === 'ko');
              rr.push(typeKor);
            }

            const statsData = speciesRes.data.stats;
            const statsData2 = statsData.map(function(item){return(item.stat.url)});
            var ss=[]
            for(const x of statsData2){
              var ttemp=[]
              const temp= await axios.get(x);
              const statsKor = temp.data.names.find(name => name.language.name === 'ko');
              ttemp.push(statsKor.name);

              for (var i of statsData){
                if(i.stat.url==x){ttemp.push(i.base_stat); ttemp.push(i.effort)}
              }
              ss.push(ttemp);
            }  
            //console.log(ss)
  
            allPokemonData.push({
              title: koreanName.name,
              sprite: speciesRes.data.sprites.front_default,
              types: rr,
              stats: ss,
            });
          }
          setPokemonData(allPokemonData); // 상태 업데이트
          console.log('fetch끝')
          localStorage.setItem('pokemonData', JSON.stringify(pokemonData));
  
        } catch (err) {
          console.log(err);
        }
      }
        fetchPokemon();
      //   async function handleStorage(){
      //     if(localStorage.getItem('pokemonData')== '[]'){
      //       await fetchPokemon();
      //       console.log(pokemonData);
      //       localStorage.setItem('pokemonData', JSON.stringify(pokemonData))
      //     }
      //   }
      //   handleStorage();
  
      // if(localStorage.getItem('pokemonData')== '[]'){
      //   console.log('if')
      //   fetchPokemon(); 
      //   console.log('done')}

    }, []);
    
    
    //  let pokepoke = localStorage.getItem('pokemonData')
    //  pokemonData= JSON.parse(pokepoke)

    useEffect(()=>{
      if (localStorage.getItem('theme') == null){
        localStorage.setItem('theme', JSON.stringify(false))
      }
    }, [])

    let userTheme = localStorage.getItem("theme")
    userTheme= JSON.parse(userTheme)

    const [darkMode, setDarkMode] = React.useState(userTheme);
    const darkModeHandler = (e) => {
      setDarkMode(!darkMode);
      localStorage.setItem('theme', JSON.stringify(darkMode))
    };
  
    const [searchTerm, setSearchTerm] = useState("");
    const handleInputChange = (event) => {
      const term = event.target.value; // term은 입력하는 글자
      onSearch(term);   // 검색하는 글자(term)로 실시간으로 상태를 업데이트
    }
  
    const onSearch = (term) => {
      setSearchTerm(term)
    }
  
  
    let filteredItems = pokemonData.filter(function (x) {
      const tt= x.types.map(function (item, i) {
        return(item.name)
      })
  
      if(tt.includes(searchTerm) || (x.title == searchTerm))
        return true;
    })

    const handleDetailPost = ({ item }) => {
      const tk= item.types.map(function (item, i) {
        return(item.name)
      })
      
      localStorage.setItem("theme", darkMode);
      navigate('/details', {
        state: {
          image: `${item.sprite}`,
          title: `${item.title}`,
          types: `${tk}`,
          stats: `${item.stats}`,
        },
      });
    };

    const [page, setPage] = useState(1);
    const [list, setList] = useState();

    const handlePageChange = (page) => {
      setPage(page);
    };

    useEffect(()=>{
      var temp = pokemonData.slice((page-1)*16, page*16);
      setList(temp);
    },[page]);

   
    return(
      <ThemeProvider theme={darkMode ? DarkTheme : LightTheme}>
      <S.WholePage>
        <S.HeaderImg></S.HeaderImg>
        <S.Toolbar>
          &emsp;
          <form class="form">
            <button>
              <svg width="17" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="search">
                <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9" stroke="currentColor" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            </button>
            <input class="input" placeholder="타입 또는 이름을 검색하세요" required="" type="text" value={searchTerm} onChange={handleInputChange}></input>
            <button class="reset" type="reset">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </form>
          <S.ModeSwitch>
          <label className="switch">
            <span className="sun"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="#ffd43b"><circle r="5" cy="12" cx="12"></circle><path d="m21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1 -.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1 -.75.29zm-12.02 12.02a1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1 -.7.24zm6.36-14.36a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm0 17a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm-5.66-14.66a1 1 0 0 1 -.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.29zm12.02 12.02a1 1 0 0 1 -.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.24z"></path></g></svg></span>
            <span className="moon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="m223.5 32c-123.5 0-223.5 100.3-223.5 224s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"></path></svg></span>
            <input type="checkbox" class="input" id='my_checkbox' onClick={darkModeHandler}></input>
            <span className="slider"></span>
          </label>
          </S.ModeSwitch>
        </S.Toolbar>

        <S.GridContainer>
          {filteredItems.length > 0 ?
          filteredItems.map(function (item, i) {
              return (
          <S.GridItem onClick={() => handleDetailPost({ item })}>
            <div className="grid-item" key={i}>
              <img src={item.sprite}></img>
              <h2>{item.title}</h2>
              <div style={{display: 'grid', rowGap: '10px',flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
                {item.types.map(types => <div style={{width: '6vw', height: '2.5vh',display: 'flex', textAlign: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: SE.getTypeColor(types.name), borderRadius: '5px', fontFamily: 'game'}}>
                <img src={SE.typeIcons[SE.translate(types.name)]} width={12} height={12}/>&nbsp;{types.name}</div>)}</div>
            </div>
          </S.GridItem>
          )
            }) : list && list.map(function (item, i) {
              return (
          <S.GridItem onClick={() => handleDetailPost({ item })}>
            <div className="grid-item" key={i}>
              <img src={item.sprite}></img>
              <h2>{item.title}</h2>
              <div style={{display: 'grid', rowGap: '10px',flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
                {item.types.map(types => <div style={{width: '6vw', height: '2.5vh',display: 'flex', textAlign: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: SE.getTypeColor(types.name), borderRadius: '5px' , fontFamily: 'game'}}>
                <img src={SE.typeIcons[SE.translate(types.name)]} width={12} height={12}/>&nbsp;{types.name}</div>)}</div>
            </div>
          </S.GridItem>
          )
            })}
        </S.GridContainer>
        <Pagination
          activePage={page}
          itemsCountPerPage={16}
          totalItemsCount={150}
          pageRangeDisplayed={5}
          prevPageText={"‹"}
          nextPageText={"›"}
          onChange={handlePageChange}/>
          <br></br>
        </S.WholePage>
      </ThemeProvider>
    )
}

const Details = () => {
  const location = useLocation();
  const image= location.state.image;
  const title= location.state.title;
  const types= location.state.types;
  const stats= location.state.stats;
  let darkMode;
  let userTheme = localStorage.getItem("theme")
  if(userTheme == 'true'){
    darkMode = true
  }
  else { darkMode = false}

  var tyt= types.split(',')

  var sts= stats.split(',')

  var result=[]
  result.push(sts.slice(0,3))
  result.push(sts.slice(3,6))
  result.push(sts.slice(6,9))
  result.push(sts.slice(9,12))
  result.push(sts.slice(12,15))
  result.push(sts.slice(15,18))
  //console.log(result)
  const navigate = useNavigate();

    return (
    <ThemeProvider theme={darkMode ? DarkTheme : LightTheme}>
    <S.WholePage>
    <S.xIcon onClick={() => navigate(-1)}></S.xIcon>
    <S.Detail>
      <S.Card>
      <img src={image} style={{position: 'relative', top:'30px'}}></img>
      <h2>{title}</h2>
      {/* <div style={{textAlign: 'center'}}>{tyt.map(item => <h3 style={{display: 'inline'}}>{item}&emsp;</h3>)}</div> */}
      <div style={{display: 'grid', rowGap: '10px',flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
        {tyt.map(item => <div style={{width: '6vw', height: '2.5vh',display: 'flex', textAlign: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: SE.getTypeColor(item), borderRadius: '5px' , fontFamily: 'game'}}>
        <img src={SE.typeIcons[SE.translate(item)]} width={12} height={12}/>&nbsp;{item}</div>)}</div>
      <br></br>
      {result.map(function(item,i){
        return(
        <div style={{lineHeight: '2.0'}}>
          <b style={{display: 'inline'}}>{item[0]}:</b>&nbsp;
          <p style={{display: 'inline'}}>{item[1]}</p>&nbsp;
          <p style={{display: 'inline'}}><b>effort: </b>{item[2]}</p>&nbsp;
        </div>)
      })}
      </S.Card>
    </S.Detail>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    </S.WholePage>
    </ThemeProvider>
    );
};

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/details" element={<Details />} />
    </Routes>
    </BrowserRouter>
  )
}


export default App;
