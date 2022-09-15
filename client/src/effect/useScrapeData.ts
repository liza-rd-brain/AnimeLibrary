import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { findAnime } from "../business/findAnime";
import { ActionType } from "../business/reducer";
import { DetailAnimeList, State } from "../types";

export function useScrapeData() {
  const [doEffect] = useSelector((state: State) => [state.doEffect]);
  const dispatch = useDispatch<Dispatch<ActionType>>();

  useEffect(() => {
    switch (doEffect?.type) {
      case "!dataScrape": {
        const data = findAnime(doEffect.data);
        data.then(
          (detailAnimeList) => {
            if (detailAnimeList) {
              dispatch({
                type: "dataReceived",
                payload: detailAnimeList,
              });
            } else {
              dispatch({
                type: "dataNotReceived",
              });
            }
          },
          (rej) => {
            console.log("rej", rej);
          }
        );

        break;
      }
      default: {
        break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doEffect]);
}
