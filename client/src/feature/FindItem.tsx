import React, { FC, useContext, useRef, useState } from "react";
import styled from "styled-components";

import { AppContext } from "../AppContext";
import { useAppDispatch, ActionName } from "../business/reducer";

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

export const FindItem: FC<{
  refState?: React.MutableRefObject<{
    value: string | null;
  }>;
}> = ({ refState }) => {
  const dispatch = useAppDispatch();

  const textInput = useRef<HTMLInputElement>(null);

  const changeInput = (event: any) => {
    dispatch({
      type: ActionName.filterList,
      payload: textInput.current?.value as string,
    });
  };

  return (
    <StyledSearchItem>
      <div>
        <StyledTextInput
          placeholder="anime name"
          inputRef={textInput}
          onChange={(event) => changeInput(event)}
        />
      </div>
    </StyledSearchItem>
  );
};
