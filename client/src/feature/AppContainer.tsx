import React, { useRef } from "react";
import styled from "styled-components";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import { useSelector, useDispatch } from "react-redux";
import { useScrapeData } from "../effect";
import { SearchItem } from "./SearchItem";
import { AnimeListType, DetailAnime, State } from "../types";

import { Error } from "./Error";
import { Card } from "../component/Card";
import { CardPreview } from "../component/CardPreview";
import { SearchItemInitial } from "./SearchItemInitial";
import { Preloader } from "../component/Preloader";

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 20px auto 0;
  min-width: 320px;
  max-width: 1060px;
  width: 100%;
  /* min-height: 600px; */
  padding-top: 250px;
`;

const AnimeListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  //если ширина меньше 1000 - по центру?
  /* justify-content: center; */
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
    <CardPreview key={index} data={animeItem} />
  ));

  return <AnimeListContainer>{animeCardList}</AnimeListContainer>;
};

export const AppContainer = () => {
  const {
    data: animeList,
    openedCard,
    phase,
  } = useSelector((state: State) => ({
    ...state,
  }));

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch({ type: "closeCard" });
    console.log("close card");
  };
  const refState = useRef<{ value: string | null }>({ value: null });

  useScrapeData();

  const getAppView = () => {
    switch (phase) {
      case "waiting": /*   case "dataScraping":  */ {
        // return <SearchItemInitial />;
        return (
          <>
            <SearchItem refState={refState} />
            {/* <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={phase === "dataScraping"}
              onClick={handleClose}
            >
              <CircularProgress color="inherit" />
            </Backdrop> */}
          </>
        );
      }

      case "idle":
      case "cardIsOpen": {
        return (
          <>
            <SearchItem refState={refState} />
            {getAnimeList(animeList)}{" "}
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={phase === "cardIsOpen"}
              onClick={handleClose}
            >
              {openedCard && <Card data={openedCard} />}
              {/* <CircularProgress color="inherit" /> */}
            </Backdrop>
          </>
        );
      }
      case "dataScraping": {
        return <Preloader />;
      }
    }
  };

  return <StyledContainer>{getAppView()}</StyledContainer>;
};
