import React from "react";
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import { useScrapeData } from "../effect";
import { SearchItem } from "./SearchItem";
import { AnimeListType, State } from "../types";

import { Error } from "./Error";
import { Card } from "../component/Card";

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 20px auto 0;
  min-width: 320px;
  max-width: 1200px;
  width: 100%;
  /* min-height: 600px; */
  padding-top: 100px;
`;

const AnimeListContainer = styled.div`
  display: grid;
  gap: 20px;
`;

const getAnimeList = (animeList: AnimeListType) => {
  if (animeList) {
    const animeListNotEmpty = animeList.length;
    if (animeListNotEmpty) {
      return <AnimeList />;
    } else {
      return <Error />;
    }
  }
};

//вынести в feature
const AnimeList = () => {
  const [animeList] = useSelector((state: State) => [state.data]);
  // const animeCardList=animeList?.map(animeItem:DetailAnime=><Card data={animeItem}/>)
  const animeCardList = animeList?.map((animeItem, index) => (
    <Card key={index} data={animeItem} />
  ));

  return <AnimeListContainer>{animeCardList}</AnimeListContainer>;
};

export const AppContainer = () => {
  const [animeList] = useSelector((state: State) => [state.data]);
  useScrapeData();

  return (
    <StyledContainer>
      <SearchItem />
      {getAnimeList(animeList)}
    </StyledContainer>
  );
};
