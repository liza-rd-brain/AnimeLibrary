import React, { useRef } from "react";
import styled from "styled-components";

import Backdrop from "@mui/material/Backdrop";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

import { useSelector, useDispatch } from "react-redux";
import { useScrapeData } from "../effect";
import { SearchItem } from "./SearchItem";
import { AnimeListType, DetailAnime, State } from "../types";

import { Error } from "./Error";
import { Card } from "../component/Card";
import { CardPreview } from "../component/CardPreview";
import { Navigator } from "./Navigator";

import { Preloader } from "../component/Preloader";

const StyledContainer = styled.div<{ isInit: boolean; disableClick: boolean }>`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 20px auto 0;
  min-width: 320px;
  max-width: 1060px;
  width: 100%;
  /* min-height: 600px; */
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

const AppHeader = styled.div`
  display: flex;
  justify-content: start;
  width: 100%;
`;

const StyledProgress = styled(LinearProgress)`
  transform: scale(-1, 1);
  width: 300px;
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

const TabPanel = (props: any) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const BasicTabs = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Item One" />
          <Tab label="Item Two" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
    </Box>
  );
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
      case "waiting": {
        return (
          <>
            <SearchItem refState={refState} />
          </>
        );
      }
      case "dataScraping": {
        return (
          <>
            <SearchItem refState={refState} />
            <StyledProgress />
          </>
        );
      }

      case "idle":
      case "cardIsOpen": {
        return (
          <>
            {getAnimeList(animeList)}
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={phase === "cardIsOpen"}
              onClick={handleClose}
            >
              {openedCard && <Card data={openedCard} />}
            </Backdrop>
          </>
        );
      }
    }
  };

  return (
    <StyledContainer isInit={false} disableClick={phase === "dataScraping"}>
      <Navigator
        refState={refState}
        hasInput={phase !== "waiting" && phase !== "dataScraping"}
      />
      {getAppView()}
    </StyledContainer>
  );
};
