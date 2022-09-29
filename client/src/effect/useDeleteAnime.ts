import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../business/reducer";

import { State } from "../types";
import { STORE_NAME } from "./common/constantList";
import { getAnimeList } from "./common/getAnimeList";

const deleteAnime = (
  dataBase: IDBDatabase,
  animeName: string,
  controller: AbortController
): Promise<undefined> => {
  return new Promise((resolve, reject) => {
    const transaction = dataBase.transaction(STORE_NAME, "readwrite");
    const animeList = transaction.objectStore(STORE_NAME);
    const request = animeList.delete(animeName);

    request.onerror = () => {
      reject(request.error);
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    controller.signal.addEventListener("abort", reject);
  });
};

export function useDeleteAnime() {
  const { doEffect, dataBase } = useSelector((state: State) => state);
  const dispatch = useAppDispatch();

  useEffect(
    function requestDeleteAnime() {
      const controller = new AbortController();
      switch (doEffect?.type) {
        case "!startedDeleteAnime":
          if (dataBase) {
            const animeName = doEffect.data;
            const addAnimePromise = deleteAnime(
              dataBase,
              animeName,
              controller
            );
            //возвращает  key
            addAnimePromise.then(
              (res) => {
                getAnimeList(dataBase, controller).then((animeList) => {
                  dispatch({
                    type: "endedDeleteAnime",
                    payload: animeList,
                  });
                });
              },
              (error) => {
                dispatch({
                  type: "endedDeleteAnime",
                });
              }
            );

            return () => {
              controller.abort();
            };
          }

          break;

        default: {
          break;
        }
      }
    },
    //не нужно добавлять dispatch, dataBase в список зависимостей
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [doEffect]
  );
}
