import React, { FC } from "react";
// import styled from "styled-components";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../business/reducer";

import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";

import { PageName, State } from "../types";
import logo from "../assets/pikachu_64.png";

const StyledNavigator = styled(Box)`
  display: flex;
  width: 160px;
  margin-bottom: 50px;
`;

const StyledTab = styled(Tab)`
  height: 80px;
`;
const StyledTabs = styled(Tabs)`
  width: 100%;
  & .Mui-selected {
    background: #b5c1e8;
  }
`;

const SEARCH_TEXT = "search";
const LIST_TEXT = "my list";

export const Navigator: FC<{
  refState?: React.MutableRefObject<{
    value: string | null;
  }>;
}> = ({ refState }) => {
  const dispatch = useAppDispatch();
  const { currPage, phase } = useSelector((state: State) => state);
  const pageName: PageName[] = ["search", "list"];
  const currPageIndex = pageName.findIndex((page) => page === currPage);

  // const [phaseOuter] = phase.type.split(".");
  // const inputVisibilitySearch = !(
  //   phaseOuter === "waitingScraping" || phaseOuter === "waitingDB"
  // );

  // const hasInput = currPage === "search" ? inputVisibilitySearch : true;

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    debugger;

    dispatch({ type: "switchPage" });
  };

  return (
    <Box /*  sx={{ width: "100%" }} */>
      <StyledNavigator>
        <StyledTabs
          orientation="vertical"
          value={currPageIndex}
          onChange={handleChange}
          aria-label="basic tabs example"
          visibleScrollbar={false}
          // indicatorColor="secondary"
          TabIndicatorProps={{ hidden: true }}
        >
          {/* TODO:  Добавить disabled на пустой список-?! */}
          <StyledTab label={SEARCH_TEXT} />
          <StyledTab label={LIST_TEXT} />
        </StyledTabs>
        {/* {hasInput && <SearchItem refState={refState} page={currPage} />} */}
      </StyledNavigator>
    </Box>
  );
};
