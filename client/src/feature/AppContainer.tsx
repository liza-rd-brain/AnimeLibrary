import { useRef, FC } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import Backdrop from "@mui/material/Backdrop";
import LinearProgress from "@mui/material/LinearProgress";

import {
  useAddAnime,
  useDeleteAnime,
  useOpenDB,
  useScrapeData,
} from "../effect";
import { useAppDispatch } from "../business/reducer";
import { CardButtonType, AnimeListType, State } from "../types";

import { Error } from "./Error";
import { Header } from "./Header";
import { Navigator } from "./Navigator";
import { Card } from "../component/Card";
import SubHeaderList from "./SubHeaderList";
import SubHeaderSearch from "../feature/SubHeaderSearch";
import { CardPreview } from "../component/CardPreview";
import logo from "../assets/pikachu_default.png";
import logoAnimated from "../assets/pikachu_preloader.gif";

type StyledContainerType = { isInit: boolean; disableClick: boolean };

const StyledContainer = styled.div<StyledContainerType>`
  display: flex;
  /*   align-items: center; */
  flex-direction: column;
  margin: auto;
  /* margin: 20px auto 0; */
  min-width: 320px;
  max-width: 1350px;
  width: 100%;
  padding-top: ${({ isInit }) => {
    return isInit ? "250px" : "0px";
  }};
  pointer-events: ${({ disableClick }) => {
    return disableClick ? "none" : "initial";
  }};
`;

const StyledBody = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const AnimeListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  //если ширина меньше 1000 - по центру?
  /* justify-content: center; */
  gap: 20px;
  margin-top: 20px;
  /* height: 1000px; */
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 80vh;

  ::-webkit-scrollbar {
    width: 8px;
    position: fixed;
    /* background-color: #d6d6d6; */
    border-radius: 4px;
    position: fixed;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #77abdf;
    border-radius: 4px;
  }
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
  background-size: 400px;
  background-position: center;
  transform: scale(-1, 1);
`;

const PreloaderContainer = styled.div`
  display: grid;
  height: 200px;
`;

const StyledContent = styled.div`
  width: 1260px;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* height: 1000px; */
`;

const AnimeListWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  overflow: hidden;
  padding: 34px;
  gap: 20px;
`;

const StyledBackdrop = styled(Backdrop)`
  padding-left: 200px;
`;

const getAnimeCardList = ({
  animeList,
  buttonType,
}: {
  animeList: AnimeListType;
  buttonType: CardButtonType;
}) => {
  if (animeList) {
    const animeCardList = animeList?.map((animeItem, index) => (
      <CardPreview key={index} data={animeItem} buttonType={buttonType} />
    ));

    return (
      <AnimeListContainer>
        <AnimeListWrapper>{animeCardList}</AnimeListWrapper>
      </AnimeListContainer>
    );
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
  const { data, openedCard, phase, currPage, savedData } = useSelector(
    (state: State) => state
  );

  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch({ type: "closeCard" });
  };

  const refState = useRef<{ value: string | null }>({ value: null });

  useOpenDB();
  useScrapeData();
  useAddAnime();
  useDeleteAnime();

  const currPhaseName = phase.type;

  const isScrapingView =
    currPhaseName === "dataScraping" || currPhaseName === "waitingDB";

  const getSearchView = () => {
    switch (currPhaseName) {
      case "waitingDB": {
        return (
          <>
            <Preloader isAnimated={true} />
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

      case "idle": {
        if (data && typeof data !== "string") {
          return (
            <div>
              {getAnimeCardList({ animeList: data, buttonType: "add" })}
              <StyledBackdrop
                sx={{
                  color: "#fff",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={false}
                onClick={handleClose}
              >
                {openedCard && <Card data={openedCard} buttonType={"add"} />}
              </StyledBackdrop>
            </div>
          );
        } else {
          return (
            <>
              <Preloader isAnimated={false} />
            </>
          );
        }
      }

      case "cardOpening": {
        if (typeof data !== "string") {
          return (
            <>
              {getAnimeCardList({ animeList: data, buttonType: "add" })}
              <StyledBackdrop
                sx={{
                  color: "#fff",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={phase.type === "cardOpening"}
                onClick={handleClose}
              >
                {openedCard && <Card data={openedCard} buttonType={"add"} />}
              </StyledBackdrop>
            </>
          );
        } else {
          return null;
        }
      }

      case "errHandling": {
        if (typeof data === "string") {
          return <Error text={data} />;
        } else return null;
      }

      default: {
        return null;
      }
    }
  };

  const getAppView = () => {
    switch (currPage) {
      case "search": {
        return (
          <>
            <SubHeaderSearch refState={refState} />
            {getSearchView()}
          </>
        );
      }

      case "list": {
        switch (currPhaseName) {
          //TODO: нужна ли фаза waitingDB здесь?
          // case "waitingDB": {
          //   return (
          //     <>
          //       <Preloader isAnimated={true} />
          //     </>
          //   );
          // }
          default: {
            return (
              <>
                <SubHeaderList refState={refState} />
                {getAnimeCardList({
                  animeList: savedData,
                  buttonType: "delete",
                })}
                <StyledBackdrop
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
                </StyledBackdrop>
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
    <StyledContainer isInit={false} disableClick={isScrapingView}>
      <Header /*  isFaded={isScrapingView} */ />
      <StyledBody>
        <Navigator refState={refState} isFaded={isScrapingView} />
        <StyledContent>{getAppView()}</StyledContent>
      </StyledBody>
    </StyledContainer>
  );
};
