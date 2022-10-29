import { FC } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { DetailAnime } from "types";

import { CardPreview } from "../component";
import { getInteractItemType } from "../shared/getInteractItemType";

import {
  State,
  AnimeListType,
  CardButtonType,
  PreviewItemType,
  PageName,
} from "../types";

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
  buttonType?: CardButtonType;
}> = ({ animeList, buttonType }) => {
  const { savedData, currPage } = useSelector((state: State) => state);
  //пройтись по data

  const listForPainting = animeList && Object.values(animeList);

  const animeCardList = listForPainting?.map((animeItem, index) => {
    const currPreviewItem = getInteractItemType({
      buttonType: buttonType,
      animeItem: animeItem,
      savedData: savedData,
      currPage: currPage,
    });

    return (
      <CardPreview
        key={index}
        data={animeItem}
        previewItemType={currPreviewItem}
      />
    );
  });

  return (
    <AnimeListContainer>
      <AnimeListWrapper>
        <CardListWrapper>{animeCardList}</CardListWrapper>
      </AnimeListWrapper>
    </AnimeListContainer>
  );
};
