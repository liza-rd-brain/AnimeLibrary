import React, { FC, useRef } from "react";
import styled from "styled-components";

import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";

import logo from "../assets/pikachu_64.png";

import { SearchItem } from "./SearchItem";

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
`;

const BasicTabs: FC<{
  hasInput: boolean;
  refState?: React.MutableRefObject<{
    value: string | null;
  }>;
}> = ({ hasInput, refState }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <StyledHeader /* sx={{ borderBottom: 1, borderColor: "divider" }} */>
        <Logo />
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Item One" />
          <Tab label="Item Two" />
        </Tabs>
        {hasInput && <SearchItem refState={refState} />}
      </StyledHeader>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
    </Box>
  );
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

export const Navigator: FC<{
  hasInput: boolean;
  refState?: React.MutableRefObject<{
    value: string | null;
  }>;
}> = ({ hasInput, refState }) => {
  return (
    <>
      <BasicTabs hasInput={hasInput} refState={refState} />
    </>
  );
};
