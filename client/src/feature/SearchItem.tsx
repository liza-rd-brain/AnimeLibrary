import React, { FC, useRef } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { PageName } from "../types";

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

export const SearchItem: FC<{
  refState?: React.MutableRefObject<{
    value: string | null;
  }>;
  page: PageName;
}> = ({ refState, page }) => {
  const dispatch = useDispatch();

  const textInput = useRef<HTMLInputElement>(null);

  const scrapeAnimeData = () => {
    if (textInput.current?.value) {
      if (refState) {
        if (refState.current.value !== textInput.current?.value) {
          refState.current.value = textInput.current?.value;
          dispatch({
            type: "startedAnimeScraping",
            payload: textInput.current?.value,
          });
        }
      } else {
        dispatch({
          type: "startedAnimeScraping",
          payload: textInput.current?.value,
        });
      }
    }
  };

  const makeSearch = () => {
    if (page === "search") {
      scrapeAnimeData();
    } else if (page === "list") {
      console.log("поиск в списке");
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
          <StyledButton variant="outlined" onClick={makeSearch}>
            find
          </StyledButton>
        </div>
      </StyledSearchItem>
    );
  };

  return <SearchItem />;
};
