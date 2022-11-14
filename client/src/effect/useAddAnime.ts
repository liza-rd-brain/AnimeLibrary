import { useEffect } from "react";
import { useSelector } from "react-redux";

import { State } from "../types";
import { DetailAnime } from "types";
import { STORE_NAME } from "./common/constantList";
import { convertListToHashTable } from "../shared/helpers";
import { getAnimeList } from "./common/getAnimeList";
import { ActionName, useAppDispatch } from "../business/reducer";

const addAnime = (
  dataBase: IDBDatabase,
  anime: DetailAnime,
  controller: AbortController
): Promise<IDBValidKey> => {
  return new Promise((resolve, reject) => {
    const transaction = dataBase.transaction(STORE_NAME, "readwrite");
    const animeList = transaction.objectStore(STORE_NAME);
    const request = animeList.add(anime);

    request.onerror = () => {
      reject(request.error);
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    controller.signal.addEventListener("abort", reject);
  });
};

export function useAddAnime() {
  const { doEffect, dataBase } = useSelector((state: State) => state);
  const dispatch = useAppDispatch();

  useEffect(
    function requestAddAnime() {
      const controller = new AbortController();

      switch (doEffect?.type) {
        case "!startedAddAnime":
          if (dataBase) {
            const currAnime = doEffect.data;
            const addAnimePromise = addAnime(dataBase, currAnime, controller);
            //возвращает  key
            addAnimePromise.then(
              (res) => {
                getAnimeList(dataBase, controller).then((animeList) => {
                  const hashAnime = convertListToHashTable(animeList);
                  dispatch({
                    type: ActionName.endedAddAnime,
                    payload: hashAnime,
                  });
                });
              },
              (error) => {
                dispatch({
                  type: ActionName.endedAddAnime,
                });
              }
            );
          }
          return () => {
            controller.abort();
          };

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
