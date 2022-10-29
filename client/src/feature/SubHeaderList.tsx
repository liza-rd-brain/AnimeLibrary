import React, { FC } from "react";
import styled from "styled-components";

import { FindItem } from "./FindItem";

const SubHeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
  display: flex;
`;

export const SubHeaderList: FC<{
  refState: React.MutableRefObject<{
    value: string | null;
  }>;
}> = ({ refState }) => {
  return (
    <SubHeaderContainer>
      <FindItem refState={refState} />
    </SubHeaderContainer>
  );
};
