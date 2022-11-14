import React, { FC, useRef } from "react";
import styled from "styled-components";
import { ActionName, useAppDispatch } from "../business/reducer";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const StyledSearchItem = styled.div`
  display: grid;
  gap: 10px;
`;

const StyledTextInput = styled(TextField)`
  width: 600px;
`;

const StyledButton = styled(Button)`
  width: 56px;
  height: 56px;
`;

export const SearchItem: FC<{
  refState?: React.MutableRefObject<{
    value: string | null;
  }>;
}> = ({ refState }) => {
  const dispatch = useAppDispatch();

  const textInput = useRef<HTMLInputElement>(null);
  //написать условие: если инпут повторный и дата не null

  const scrapeAnimeData = () => {
    if (textInput.current?.value) {
      if (refState) {
        if (refState.current.value !== textInput.current?.value) {
          refState.current.value = textInput.current?.value;
          dispatch({
            type: ActionName.startedAnimeScraping,
            payload: textInput.current?.value,
          });
        }
      } else {
        dispatch({
          type: ActionName.startedAnimeScraping,
          payload: textInput.current?.value,
        });
      }
    }
  };

  return (
    <StyledSearchItem>
      <div>
        <StyledTextInput
          autoComplete="off"
          inputRef={textInput}
          defaultValue={refState?.current.value}
        />
        <StyledButton variant="outlined" onClick={scrapeAnimeData}>
          find
        </StyledButton>
      </div>
    </StyledSearchItem>
  );
};
