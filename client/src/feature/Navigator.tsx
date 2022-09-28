import React, { FC } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../business/reducer";

import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";

import { SearchItem } from "./SearchItem";
import { PageName, State } from "../types";
import logo from "../assets/pikachu_64.png";

const Logo = styled.div`
  background: url(${logo});
  background-repeat: no-repeat;
  background-size: 40px;
  /* background-position: -10px -10px; */
  transform: scale(-1, 1);
  height: 40px;
  width: 40px;
`;

const StyledHeader = styled(Box)`
  display: flex;
  width: 100%;
  margin-bottom: 50px;
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

  const [phaseOuter] = phase.type.split(".");
  const inputVisibilitySearch = !(
    phaseOuter === "waitingScraping" || phaseOuter === "waitingDB"
  );

  const hasInput = currPage === "search" ? inputVisibilitySearch : true;

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    debugger;

    dispatch({ type: "switchPage" });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <StyledHeader>
        <Logo />
        <Tabs
          value={currPageIndex}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {/* TODO:  Добавить disabled на пустой список-?! */}
          <Tab label={SEARCH_TEXT} />
          <Tab label={LIST_TEXT} />
        </Tabs>
        {hasInput && <SearchItem refState={refState} page={currPage} />}
      </StyledHeader>
    </Box>
  );
};
