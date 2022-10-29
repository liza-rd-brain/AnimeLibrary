import React, { FC } from "react";
import styled from "styled-components";
import { SearchItem } from "../feature/SearchItem";

const SubHeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
  display: flex;
`;

export const SubHeaderSearch: FC<{
  refState?: React.MutableRefObject<{
    value: string | null;
  }>;
}> = ({ refState }) => {
  return (
    <SubHeaderContainer>
      <SearchItem refState={refState} />
    </SubHeaderContainer>
  );
};
