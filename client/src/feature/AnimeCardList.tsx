import { FC } from "react";
import styled from "styled-components";

import { CardPreview } from "../component/CardPreview";
import { AnimeListType, CardButtonType } from "../types";

const AnimeListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 80vh;

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
  justify-content: center;
  flex-wrap: wrap;
  overflow: hidden;
  padding: 34px;
  gap: 20px;
`;

export const AnimeCardList: FC<{
  animeList: AnimeListType;
  buttonType: CardButtonType;
}> = ({ animeList, buttonType }) => {
  const animeCardList = animeList?.map((animeItem, index) => (
    <CardPreview key={index} data={animeItem} buttonType={buttonType} />
  ));

  return (
    <AnimeListContainer>
      <AnimeListWrapper>{animeCardList}</AnimeListWrapper>
    </AnimeListContainer>
  );
};
