import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../business/reducer";

import { State } from "../types";
import { findAnimeWebSocket } from "../business/findAnimeWebSocket";

export function useScrapeData() {
  const [doEffect] = useSelector((state: State) => [state.doEffect]);
  const dispatch = useAppDispatch();

  useEffect(
    function requestDataScrape() {
      const controller = new AbortController();

      switch (doEffect?.type) {
        case "!dataScrape": {
          const data = findAnimeWebSocket(doEffect.data);
          console.log("data", data);

          data.then(
            (detailAnimeListJSON) => {
              console.log("detailAnimeList", detailAnimeListJSON);
              const detailAnimeList = JSON.parse(detailAnimeListJSON);
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

          return () => {
            //reject промиса
            //отправить контр запрос?????
            //abort самого промиса в axios
            controller.abort();
          };
        }
        default: {
          break;
        }
      }
    },
    //не нужно добавлять dispatch в список зависимостей
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [doEffect]
  );
}
