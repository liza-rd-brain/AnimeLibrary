import { FC } from "react";
import styled from "styled-components";

import { CardPreview } from "../component";
import { AnimeListType, CardButtonType } from "../types";

const AnimeListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 80vh;
  width: 100%;

  ::-webkit-scrollbar {
    width: 8px;
    position: fixed;
    border-radius: 4px;
    position: fixed;
  }

  ::-webkit-scrollbar-track {
    border-radius: 3px;
    background: rgb(186, 183, 183);
    border: 3px solid transparent;
    background-clip: content-box; /* THIS IS IMPORTANT */
  }

  ::-webkit-scrollbar-thumb {
    background-color: #77abdf;
    border-radius: 4px;
  }
`;

const AnimeListWrapper = styled.div`
  display: flex;
  padding: 34px;
  width: 100%;
`;

const CardListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 340px);
  gap: 20px;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  & > {
    padding: 12px;
  }
`;

export const AnimeCardList: FC<{
  animeList: AnimeListType;
  buttonType: CardButtonType;
}> = ({ animeList, buttonType }) => {
  const listForPainting = animeList && Object.values(animeList);

  const animeCardList = listForPainting?.map((animeItem, index) => (
    <CardPreview key={index} data={animeItem} buttonType={buttonType} />
  ));

  return (
    <AnimeListContainer>
      <AnimeListWrapper>
        <CardListWrapper>{animeCardList}</CardListWrapper>
      </AnimeListWrapper>
    </AnimeListContainer>
  );
};
