import { useRef, FC } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import Backdrop from "@mui/material/Backdrop";
import LinearProgress from "@mui/material/LinearProgress";

import { Error } from "./Error";
import { Navigator } from "./Navigator";
import { Card } from "../component/Card";
import { SearchItem } from "./SearchItem";
import { AnimeListType, State } from "../types";
import { useAddAnime, useOpenDB, useScrapeData } from "../effect";
import { CardPreview } from "../component/CardPreview";

import logo from "../assets/pikachu_default.png";
import logoAnimated from "../assets/pikachu_preloader.gif";

const SCRAPING_ERR_TEXT = "Something went wrong!";

type StyledContainerType = { isInit: boolean; disableClick: boolean };

const StyledContainer = styled.div<StyledContainerType>`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 20px auto 0;
  min-width: 320px;
  max-width: 1060px;
  width: 100%;

  padding-top: ${({ isInit }) => {
    return isInit ? "250px" : "0px";
  }};
  pointer-events: ${({ disableClick }) => {
    return disableClick ? "none" : "initial";
  }};
`;

const AnimeListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  //если ширина меньше 1000 - по центру?
  /* justify-content: center; */
  gap: 20px;
`;

const StyledProgress = styled(LinearProgress)`
  transform: scale(-1, 1);
  width: 300px;
`;

const Logo = styled.div<{ isAnimated?: boolean }>`
  width: 300px;
  height: 150px;
  background: ${({ isAnimated }) => {
    return isAnimated ? `url(${logoAnimated})` : `url(${logo})`;
  }};
  background-repeat: no-repeat;
  background-size: 300px;
  background-position: center;
  transform: scale(-1, 1);
`;

const PreloaderContainer = styled.div`
  display: grid;
  height: 200px;
`;

const getAnimeList = (animeList: AnimeListType) => {
  if (animeList) {
    const animeListNotEmpty = animeList.length;
    if (animeListNotEmpty) {
      return <AnimeList list={animeList} />;
    } else {
      return <Error />;
    }
  }
};

const AnimeList: FC<{ list: AnimeListType }> = ({ list }) => {
  const animeCardList = list?.map((animeItem, index) => (
    <CardPreview key={index} data={animeItem} />
  ));

  return <AnimeListContainer>{animeCardList}</AnimeListContainer>;
};

const Preloader: FC<{ isAnimated: boolean }> = ({ isAnimated }) => {
  return (
    <PreloaderContainer>
      <Logo isAnimated={isAnimated} />
      {isAnimated && <StyledProgress />}
    </PreloaderContainer>
  );
};

export const AppContainer = () => {
  const {
    data: animeList,
    openedCard,
    phase,
    currPage,
    savedData,
  } = useSelector((state: State) => ({
    ...state,
  }));

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch({ type: "closeCard" });
  };

  const refState = useRef<{ value: string | null }>({ value: null });

  useScrapeData();
  useAddAnime();
  useOpenDB();

  const [phaseOuter, phaseInner] = phase.type.split(".");

  const clickDisable =
    phaseOuter === "dataScraping" || phaseInner === "dataScraping";

  const inputVisibility = !(
    phaseOuter === "waitingScraping" || phaseOuter === "waitingDB"
  );

  const getAppView = () => {
    switch (currPage) {
      case "search": {
        switch (phaseOuter) {
          case "waitingDB":
          case "dataScraping": {
            return (
              <>
                <Preloader isAnimated={true} />
              </>
            );
          }

          case "waitingScraping": {
            return (
              <>
                <Preloader
                  isAnimated={phaseInner === "dataScraping" ? true : false}
                />
                <SearchItem refState={refState} />
              </>
            );
          }

          case "idle":
          case "animeAdding":
          case "cardOpening": {
            return (
              <>
                {getAnimeList(animeList)}
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={phase.type === "cardOpening"}
                  onClick={handleClose}
                >
                  {openedCard && <Card data={openedCard} />}
                </Backdrop>
              </>
            );
          }

          case "scrapingErr": {
            return <div>{SCRAPING_ERR_TEXT}</div>;
          }
        }
        break;
      }
      case "list": {
        return (
          <>
            {getAnimeList(savedData)}
            <Backdrop
              sx={{
                color: "#fff",
                zIndex: (theme) => theme.zIndex.drawer + 1,
              }}
              open={phase.type === "cardOpening"}
              onClick={handleClose}
            >
              {openedCard && <Card data={openedCard} />}
            </Backdrop>
          </>
        );
      }
      // eslint-disable-next-line no-fallthrough
      default: {
        return null;
      }
    }
  };

  return (
    <StyledContainer isInit={false} disableClick={clickDisable}>
      <Navigator refState={refState} hasInput={inputVisibility} />
      {getAppView()}
    </StyledContainer>
  );
};
