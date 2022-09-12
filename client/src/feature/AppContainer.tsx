import { useRef, FC } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";

import { Error } from "./Error";
import { useOpenDB, useScrapeData } from "../effect";
import { Navigator } from "./Navigator";
import { Card } from "../component/Card";
import { SearchItem } from "./SearchItem";
import { AnimeListType, State } from "../types";
import { CardPreview } from "../component/CardPreview";

import logo from "../assets/pikachu_default.png";
import logoAnimated from "../assets/pikachu_preloader.gif";

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
      return <AnimeList />;
    } else {
      return <Error />;
    }
  }
};

const AnimeList = () => {
  const [animeList] = useSelector((state: State) => [state.data]);

  const animeCardList = animeList?.map((animeItem, index) => (
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
  } = useSelector((state: State) => ({
    ...state,
  }));

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch({ type: "closeCard" });
  };

  const refState = useRef<{ value: string | null }>({ value: null });

  useScrapeData();
  useOpenDB();

  const [phaseOuter, phaseInner] = phase.split(".");

  const clickDisable =
    phaseOuter === "dataScraping" || phaseInner === "dataScraping";

  const getAppView = () => {
    switch (currPage) {
      case "search": {
        switch (phaseOuter) {
          case "waitingDB": {
            return (
              <>
                <Preloader isAnimated={true} />
              </>
            );
          }
          case "waitingUse": {
            return (
              <>
                <Preloader isAnimated={false} />
                <SearchItem refState={refState} />
              </>
            );
          }

          case "dataScraping": {
            return (
              <>
                <Preloader isAnimated={true} />
              </>
            );
          }

          case "idle":
          case "cardOpening": {
            return (
              <>
                {getAnimeList(animeList)}
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={phase === "cardOpening"}
                  onClick={handleClose}
                >
                  {openedCard && <Card data={openedCard} />}
                </Backdrop>
              </>
            );
          }
        }
        break;
      }
      // eslint-disable-next-line no-fallthrough
      default: {
        return null;
      }
    }
  };

  return (
    <StyledContainer isInit={false} disableClick={clickDisable}>
      <Navigator refState={refState} hasInput={phaseOuter !== "waitingUse"} />
      {getAppView()}
    </StyledContainer>
  );
};
