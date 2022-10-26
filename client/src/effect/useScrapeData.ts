import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, ActionName } from "../business/reducer";

import { State } from "../types";

import { findAnimeWebSocket } from "../business/findAnimeWebSocket";

const ErrorType = { type: "abort socket" };

export function useScrapeData() {
  const [doEffect] = useSelector((state: State) => [state.doEffect]);
  const dispatch = useAppDispatch();

  useEffect(
    function requestDataScrape() {
      const controller = new AbortController();

      switch (doEffect?.type) {
        case "!dataScrape": {
          const dataPromise = findAnimeWebSocket(doEffect.data, controller);

          dataPromise.then(
            (detailAnimeListJSON) => {
              const detailAnimeList = JSON.parse(detailAnimeListJSON);

              const animeListNotEmpty = detailAnimeList.length;

              if (detailAnimeList) {
                if (animeListNotEmpty) {
                  dispatch({
                    type: "dataReceived",
                    payload: detailAnimeList,
                  });
                } else {
                  dispatch({
                    type: "dataNotFound",
                  });
                }
              } else {
                dispatch({
                  type: ActionName.scrappingAborted,
                });
              }
            },
            (rej) => {
              console.log("rej", rej);

              dispatch({
                type: ActionName.scrappingAborted,
              });
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
