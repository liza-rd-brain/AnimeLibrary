import React, { FC, useRef } from "react";
import styled from "styled-components";

import { State } from "../types";
import { useSelector } from "react-redux";
import { useAppDispatch, ActionName } from "../business/reducer";

import TextField from "@mui/material/TextField";

const StyledSearchItem = styled.div`
  display: grid;
  gap: 10px;
`;

const StyledTextInput = styled(TextField)`
  width: 600px;
`;

export const FindItem: FC<{
  refState?: React.MutableRefObject<{
    value: string | null;
  }>;
}> = ({ refState }) => {
  const dispatch = useAppDispatch();
  const { filter } = useSelector((state: State) => state);

  console.log("filter", filter);

  const currValue = filter?.name || null;
  const textInput = useRef<{ value: string | null }>({ value: currValue });
  console.log("textInput", textInput.current);

  const changeInput = (event: any) => {
    dispatch({
      type: ActionName.filterListByName,
      payload: textInput.current?.value as string,
    });
  };

  return (
    <StyledSearchItem>
      <div>
        <StyledTextInput
          autoComplete="off"
          placeholder="anime name"
          inputRef={textInput}
          onChange={(event) => changeInput(event)}
          value={currValue}
        />
      </div>
    </StyledSearchItem>
  );
};
