import React, { FC } from "react";
import styled from "styled-components";

import { DetailAnime } from "../types";

const StyledCardContainer = styled.div`
  display: grid;
  grid-template-columns: 300px 400px;
`;

const StyledTable = styled.div``;

const StyledImg = styled.img``;

const StyledTitle = styled.div`
  font-size: 30px;
  font-weight: bold;
`;

const StyledRow = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 150px 150px;
`;

// const RowItem: FC;

export const Card: FC<{ data: DetailAnime }> = ({ data }) => {
  const { pictureUrl, animeName, description, ...detailTable } = data;

  const detailList = Object.entries(detailTable);

  const getDetailTable = () => {
    return detailList.map((item, index) => {
      const [key, value] = item;
      return (
        <StyledRow key={index}>
          <div>{key}</div>
          <div>{value}</div>
        </StyledRow>
      );
      //   const [key, value] = item;
      //   return (
      //     <>
      //     <div>key<div/>
      //     <div>value<div/>
      //     </>)
      //   )
      // });
    });
  };

  return (
    <StyledCardContainer>
      <StyledImg src={pictureUrl} />
      <div>
        <StyledTitle>{animeName}</StyledTitle>
        <StyledTable>{getDetailTable()}</StyledTable>
      </div>
    </StyledCardContainer>
  );
};
