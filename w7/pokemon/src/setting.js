export const typeIcons = {
    bug:require("./icons/bug.svg").default,
    dark:require("./icons/dark.svg").default,
    dragon:require("./icons/dragon.svg").default,
    electric: require("./icons/electric.svg").default,
    fairy: require("./icons/fairy.svg").default,
    fighting: require("./icons/fighting.svg").default,
    fire: require("./icons/fire.svg").default,
    flying: require("./icons/flying.svg").default,
    ghost: require("./icons/ghost.svg").default,
    grass: require("./icons/grass.svg").default,
    ground: require("./icons/ground.svg").default,
    ice: require("./icons/ice.svg").default,
    normal: require("./icons/normal.svg").default,
    poison: require("./icons/poison.svg").default,
    phychic: require("./icons/poison.svg").default,
    rock: require("./icons/rock.svg").default,
    steel: require("./icons/steel.svg").default,
    water: require("./icons/water.svg").default
    }

export const colors = {
    bug: "#92BC2C",
    dark: "#595761",
    dragon: "#0C69C8",
    electric: "#F2D94E",
    fairy: "#EE90E6",
    fighting: "#D3425F",
    fire:"#FBA54C",
    flying: "#A1BBEC",
    ghost: "#5F6DBC",
    grass: "#5FBD58",
    ground:"#DA7C4D",
    ice: "#75D0C1",
    normal: "#A0A29F",
    poison: "#B763CF",
    phychic: "#FA8581",
    rock: "#C9BB8A",
    steel: "#5695A3",
    water: "#539DDF"
  }

export const translate = (t) =>{
    if(t == '풀'){return ('grass');}
    else if(t == '벌레'){return('bug');}
    else if(t == '어둠'){return ('dark');}
    else if(t == '드래곤'){return ('dragon');}
    else if(t == '전기'){return ('electric');}
    else if(t == '페어리'){return ('fairy');}
    else if(t == '격투'){return ('fighting');}
    else if(t == '불꽃'){return ('fire');}
    else if(t == '비행'){return ('flying');}
    else if(t == '고스트'){return ('ghost');}
    else if(t == '땅'){return ('ground');}
    else if(t == '얼음'){return ('ice');}
    else if(t == '노말'){return ('normal');}
    else if(t == '독'){return ('poison');}
    else if(t == '에스퍼'){return ('phychic');}
    else if(t == '바위'){return ('rock');}
    else if(t == '강철'){return ('steel');}
    else if(t == '물'){return ('water');}
  }

export function getTypeColor(type) {
    return colors[translate(type)] || "#FFFFFF"; // 타입 정보가 없으면 기본 색상 사용
  }