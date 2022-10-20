import React, { FC } from "react";
import styled from "styled-components";
import { SearchItem } from "../feature/SearchItem";
import { PageName } from "../types";

const SubHeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* justify-content: flex-end; */
  width: 100%;
  height: 80px;
  display: flex;
  /* border-bottom: 1px solid lightgray; */

  /* background: #ece3e4; */
`;

const SubHeaderSearch: FC<{
  refState?: React.MutableRefObject<{
    value: string | null;
  }>;
  page: PageName;
}> = ({ refState, page }) => {
  return (
    <SubHeaderContainer>
      <SearchItem refState={refState} page={page} />
    </SubHeaderContainer>
  );
};

export default SubHeaderSearch;
