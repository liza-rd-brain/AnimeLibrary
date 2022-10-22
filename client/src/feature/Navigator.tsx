import React, { FC } from "react";
import { useSelector } from "react-redux";
import { useTheme, makeStyles, withTheme, styled } from "@mui/material/styles";

import { useAppDispatch } from "../business/reducer";

import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";

import { PageName, State } from "../types";
import { theme } from "../theme";

const StyledNavigator = styled(Box)`
  display: flex;
  width: 200px;
  margin-bottom: 50px;
`;

//example theme using
const MyThemeComponent = styled("div")(({ theme }) => ({
  // color: theme.palette.grey[100],
  color: theme.palette.primary.dark,
  backgroundColor: theme.palette.primary.medium,
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
}));

/* background: ${(props) => props.theme.palette.action.disabled}; */
const StyledTab = styled(Tab)`
  height: 80px;
  border-radius: 6px;
`;
const StyledTabs = styled(Tabs)`
  width: 100%;
  & .Mui-selected {
    /* backgroundColor: theme.palette.primary.main, */
    background: #77abdf;
  }
`;

const SEARCH_TEXT = "search";
const LIST_TEXT = "my list";

export const Navigator: FC<{
  refState?: React.MutableRefObject<{
    value: string | null;
  }>;
}> = ({ refState }) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { currPage } = useSelector((state: State) => state);
  const pageName: PageName[] = ["search", "list"];
  const currPageIndex = pageName.findIndex((page) => page === currPage);

  // const [phaseOuter] = phase.type.split(".");
  // const inputVisibilitySearch = !(
  //   phaseOuter === "waitingScraping" || phaseOuter === "waitingDB"
  // );

  // const hasInput = currPage === "search" ? inputVisibilitySearch : true;

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
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
