import React, { FC, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import logo from "../assets/pikachu_default.png";
import logoAnimated from "../assets/pikachu_preloader.gif";

import { State } from "../types";

const StyledSearchItem = styled.div`
  display: grid;
  gap: 10px;
`;

const StyledTextInput = styled(TextField)`
  width: 300px;
`;

const StyledButton = styled(Button)`
  width: 56px;
  height: 56px;
`;

const Logo = styled.div<{ isAnimated?: boolean }>`
  /* background: url(${logoAnimated}); */
  background: ${({ isAnimated }) => {
    return isAnimated ? `url(${logoAnimated})` : `url(${logo})`;
  }};
  background-repeat: no-repeat;
  background-size: 300px;
  background-position: center;
  transform: scale(-1, 1);
`;

export const SearchItem: FC<{
  refState?: React.MutableRefObject<{
    value: string | null;
  }>;
}> = ({ refState }) => {
  // const state = useSelector((state: State) => state);
  const dispatch = useDispatch();

  const textInput = useRef<HTMLInputElement>(null);

  const scrapeAnimeData = () => {
    if (textInput.current?.value) {
      if (refState) {
        refState.current.value = textInput.current?.value;
      }

      dispatch({
        type: "startedAnimeScraping",
        payload: textInput.current?.value,
      });
    }
  };

  const SearchItem: FC<{ isAnimated?: boolean }> = ({ isAnimated }) => {
    return (
      <StyledSearchItem>
        <div>
          <StyledTextInput
            inputRef={textInput}
            defaultValue={refState?.current.value}
          />
          <StyledButton
            variant="outlined"
            onClick={() => {
              scrapeAnimeData();
            }}
          >
            find
          </StyledButton>
        </div>
      </StyledSearchItem>
    );
  };

  return <SearchItem />;
};
