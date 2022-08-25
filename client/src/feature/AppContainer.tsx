import React from "react";
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import { useScrapeData } from "../effect";
import { SearchItem } from "./SearchItem";
import { AnimeListType, State } from "../types";
import { Error } from "./Error";

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px auto 0;
  min-width: 320px;
  max-width: 1200px;
  width: 100%;
  min-height: 600px;
  padding-top: 100px;
`;

const getAnimeList = (animeList: AnimeListType) => {
  if (animeList) {
    const animeListNotEmpty = Boolean(Object.values(animeList).length);
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

  return <div></div>;
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
