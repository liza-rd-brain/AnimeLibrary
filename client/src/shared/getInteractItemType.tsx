import { DetailAnime } from "types";
import {
  AnimeListType,
  CardButtonType,
  PageName,
  PreviewItemType,
} from "../types";

export const getInteractItemType = ({
  buttonType,
  animeItem,
  savedData,
  currPage,
}: {
  buttonType?: CardButtonType;
  animeItem: DetailAnime;
  savedData: AnimeListType;
  currPage: PageName;
}): PreviewItemType => {
  const linkKey = animeItem.link;
  const hasMarkAdded = savedData?.[linkKey] && currPage === "search";
  const hasPreviewItem = buttonType || hasMarkAdded;

  if (hasPreviewItem) {
    if (hasMarkAdded) {
      return "markAdded";
    } else {
      return "button";
    }
  } else return null;
};
