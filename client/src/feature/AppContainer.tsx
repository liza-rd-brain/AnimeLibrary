import { useRef, FC } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { AppContext } from "../AppContext";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
// import LinearProgress from "@mui/material/LinearProgress";

import {
  useAddAnime,
  useDeleteAnime,
  useOpenDB,
  useScrapeData,
} from "../effect";
import { State, FilterDataType } from "../types";
import { ActionName, useAppDispatch } from "../business/reducer";

import { Error } from "./Error";
import { Header } from "./Header";
import { Navigator } from "./Navigator";
import { Card } from "../component/Card";
import SubHeaderList from "./SubHeaderList";
import SubHeaderSearch from "../feature/SubHeaderSearch";
import { convertListToHashTable } from "../shared/helpers";

import { AnimeHashTable } from "types";
import { AnimeCardList } from "./AnimeCardList";
import logo from "../assets/pikachu_default.png";
import logoAnimated from "../assets/pikachu_preloader.gif";

type StyledContainerType = { isInit: boolean; disableClick: boolean };

const SEARCH_INTERRUPT_TEXT = "stop search";

const ContainerWrapper = styled.div<{ isFaded: boolean }>`
  height: 100vh;
  width: 100%;
  /* backdrop-filter: ${({ isFaded }) => {
    return isFaded ? "  brightness(90%)" : "none";
  }}; */
  background-color: ${({ isFaded }) => {
    return isFaded ? "#d1d1d17d" : "none";
  }};
`;

const StyledContainer = styled.div<StyledContainerType>`
  display: flex;
  flex-direction: column;
  margin: auto;
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

// const StyledProgress = styled(LinearProgress)`
//   transform: scale(-1, 1);
//   width: 300px;
// `;

const Logo = styled.div<{ isAnimated?: boolean }>`
  width: 500px;
  height: 300px;
  background: ${({ isAnimated }) => {
    return isAnimated ? `url(${logoAnimated})` : `url(${logo})`;
  }};
  background-repeat: no-repeat;
  background-size: 500px;
  background-position: center;
  transform: scale(-1, 1);
  border-radius: 10px;
`;

const PreloaderContainer = styled.div`
  display: grid;
`;

const StyledContent = styled.div`
  width: 1260px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const CardBackdrop = styled(Backdrop)`
  padding-left: 200px;
`;

const PreloaderBackdrop = styled(Backdrop)<{ withButton?: boolean }>`
  padding: 170px 0 0 200px;
  align-items: start;
  justify-content: center;
`;

const StyledButton = styled(Button)`
  width: 200px;
  height: 56px;
  z-index: 2;
  cursor: pointer;
  pointer-events: initial;
`;

const ScrapingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Preloader: FC<{ isAnimated: boolean }> = ({ isAnimated }) => {
  return (
    <PreloaderContainer>
      <Logo isAnimated={isAnimated} />
      {/*TODO: нужен ли StyledProgress?? */}
      {/* {isAnimated && <StyledProgress />} */}
    </PreloaderContainer>
  );
};

export const AppContainer = () => {
  const { data, openedCard, phase, currPage, savedData, filter } = useSelector(
    (state: State) => state
  );

  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch({ type: ActionName.cardClosed });
  };

  const stopScraping = () => {
    dispatch({ type: ActionName.scrapingInterrupted });
  };

  const getFilteredData = (name: string, savedData: AnimeHashTable) => {
    const dataList = Object.values(savedData);

    const filteredList = dataList.filter((animeItem) => {
      return animeItem.animeName
        ?.toLocaleLowerCase()
        ?.includes(name.toLocaleLowerCase());
    });

    const filteredHashTable = convertListToHashTable(filteredList);

    return filteredHashTable;
  };

  //TODO: rename to smth like refSearchState
  const refFilterNameState = useRef<FilterDataType>({ name: null });

  //TODO:пока фильтрация по имени
  const filteredListData =
    filter?.name && savedData
      ? getFilteredData(filter.name, savedData)
      : savedData;

  const refState = useRef<{ value: string | null }>({ value: null });

  useOpenDB();
  useAddAnime();
  useScrapeData();
  useDeleteAnime();

  const currPhaseName = phase.type;

  const isScrapingView =
    currPhaseName === "dataScraping" || currPhaseName === "waitingDB";

  const getSearchView = () => {
    switch (currPhaseName) {
      case "waitingDB": {
        return (
          <>
            <PreloaderBackdrop
              sx={{
                color: "#fff",
                zIndex: (theme) => theme.zIndex.drawer + 1,
              }}
              open={true}
            >
              <Preloader isAnimated={true} />
            </PreloaderBackdrop>
          </>
        );
      }
      case "dataScraping": {
        return (
          <>
            <PreloaderBackdrop
              sx={{
                color: "#fff",
                zIndex: (theme) => theme.zIndex.drawer + 1,
              }}
              open={true}
              withButton={true}
            >
              <ScrapingContainer>
                <Preloader isAnimated={true} />
                <StyledButton variant="contained" onClick={stopScraping}>
                  {SEARCH_INTERRUPT_TEXT}
                </StyledButton>
              </ScrapingContainer>
            </PreloaderBackdrop>
          </>
        );
      }

      case "idle": {
        if (data && typeof data !== "string") {
          return (
            <>
              <AnimeCardList animeList={data} buttonType={"add"} />
              <CardBackdrop
                sx={{
                  color: "#fff",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={false}
                onClick={handleClose}
              >
                {openedCard && <Card data={openedCard} buttonType={"add"} />}
              </CardBackdrop>
            </>
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
              <AnimeCardList animeList={data} buttonType={"add"} />
              <CardBackdrop
                sx={{
                  color: "#fff",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={true}
                onClick={handleClose}
              >
                {openedCard && <Card data={openedCard} buttonType={"add"} />}
              </CardBackdrop>
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
        return (
          <>
            <SubHeaderList refState={refState} />
            <AnimeCardList animeList={filteredListData} buttonType={"delete"} />
            <CardBackdrop
              sx={{
                color: "#fff",
                zIndex: (theme) => theme.zIndex.drawer + 1,
              }}
              open={phase.type === "cardOpening"}
              onClick={handleClose}
            >
              {openedCard && <Card data={openedCard} buttonType={"delete"} />}
            </CardBackdrop>
          </>
        );
      }

      default: {
        return null;
      }
    }
  };

  return (
    <ContainerWrapper isFaded={isScrapingView}>
      <AppContext.Provider
        value={{
          filter: refFilterNameState,
        }}
      >
        <StyledContainer isInit={false} disableClick={isScrapingView}>
          <Header />
          <StyledBody>
            <Navigator />
            <StyledContent>{getAppView()}</StyledContent>
          </StyledBody>
        </StyledContainer>
      </AppContext.Provider>
    </ContainerWrapper>
  );
};
