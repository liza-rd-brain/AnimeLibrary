import React from "react";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";

import { ActionName, useAppDispatch } from "../business/reducer";

import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";

import { PageName, State } from "../types";

const StyledNavigator = styled(Box)`
  display: flex;
  width: 200px;
  margin-bottom: 50px;
`;

const StyledTab = styled(Tab)`
  height: 80px;
  border-radius: 6px;
`;
const StyledTabs = styled(Tabs)`
  width: 100%;
  & .Mui-selected {
    background: #77abdf;
  }
`;

const SEARCH_TEXT = "search";
const LIST_TEXT = "my list";

export const Navigator = () => {
  const dispatch = useAppDispatch();
  const { currPage } = useSelector((state: State) => state);
  const pageName: PageName[] = ["search", "list"];
  const currPageIndex = pageName.findIndex((page) => page === currPage);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    dispatch({ type: ActionName.switchPage });
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
