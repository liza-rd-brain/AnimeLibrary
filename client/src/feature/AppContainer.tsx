import { useRef, FC } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../business/reducer";

import Backdrop from "@mui/material/Backdrop";
import LinearProgress from "@mui/material/LinearProgress";

import {
  useAddAnime,
  useDeleteAnime,
  useOpenDB,
  useScrapeData,
} from "../effect";

import { Error } from "./Error";
import { Navigator } from "./Navigator";
import { Card } from "../component/Card";
import { CardButtonType, AnimeListType, State } from "../types";
import { SearchItem } from "./SearchItem";
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

const getAnimeList = ({
  animeList,
  buttonType,
}: {
  animeList: AnimeListType;
  buttonType: CardButtonType;
}) => {
  if (animeList) {
    const animeListNotEmpty = animeList.length;
    if (animeListNotEmpty) {
      const animeCardList = animeList?.map((animeItem, index) => (
        <CardPreview key={index} data={animeItem} buttonType={buttonType} />
      ));

      return <AnimeListContainer>{animeCardList}</AnimeListContainer>;
    } else {
      return <Error />;
    }
  }
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

  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch({ type: "closeCard" });
  };

  const refState = useRef<{ value: string | null }>({ value: null });

  useOpenDB();
  useScrapeData();
  useAddAnime();
  useDeleteAnime();

  const [phaseOuter, phaseInner] = phase.type.split(".");

  const clickDisable =
    phaseOuter === "dataScraping" || phaseInner === "dataScraping";

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
                <SearchItem refState={refState} page={"search"} />
              </>
            );
          }

          case "waitingScrapeHandle":
          case "cardOpening": {
            return (
              <>
                {getAnimeList({ animeList, buttonType: "add" })}
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={phase.type === "cardOpening"}
                  onClick={handleClose}
                >
                  {openedCard && <Card data={openedCard} buttonType={"add"} />}
                </Backdrop>
              </>
            );
          }

          case "scrapingErr": {
            return <div>{SCRAPING_ERR_TEXT}</div>;
          }
          default: {
            return null;
          }
        }
      }
      case "list": {
        switch (phaseOuter) {
          case "waitingDB": {
            return (
              <>
                <Preloader isAnimated={true} />
              </>
            );
          }
          default: {
            return (
              <>
                {getAnimeList({ animeList: savedData, buttonType: "delete" })}
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={phase.type === "cardOpening"}
                  onClick={handleClose}
                >
                  {openedCard && (
                    <Card data={openedCard} buttonType={"delete"} />
                  )}
                </Backdrop>
              </>
            );
          }
        }
      }
      default: {
        return null;
      }
    }
  };

  return (
    <StyledContainer isInit={false} disableClick={clickDisable}>
      <Navigator refState={refState} />
      {getAppView()}
    </StyledContainer>
  );
};
