import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../business/reducer";

import { DetailAnime, State } from "../types";
import { STORE_NAME } from "./common/constantList";
import { getAnimeList } from "./common/getAnimeList";

const addAnime = (
  dataBase: IDBDatabase,
  anime: DetailAnime
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
  });
};

export function useAddAnime() {
  const { doEffect, dataBase } = useSelector((state: State) => ({ ...state }));
  const dispatch = useAppDispatch();

  useEffect(() => {
    switch (doEffect?.type) {
      case "!startedAddAnime":
        if (dataBase) {
          const currAnime = doEffect.data;
          const addAnimePromise = addAnime(dataBase, currAnime);

          console.log("addAnimePromise", addAnimePromise);
          //возвращает  key
          addAnimePromise.then(
            (res) => {
              getAnimeList(dataBase).then((animeList) => {
                dispatch({
                  type: "endedAddAnime",
                  payload: animeList,
                });
              });
            },
            (error) => {
              dispatch({
                type: "endedAddAnime",
              });
            }
          );
        }

        break;

      default: {
        break;
      }
    }
    //не нужно добавлять dispatch, dataBase в список зависимостей
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doEffect]);
}
