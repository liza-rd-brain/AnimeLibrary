import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DetailAnime, State } from "../types";
import { STORE_NAME } from "./common/constantList";
import { getAnimeList } from "./common/getAnimeList";

const DATABASE_ERR = "Failed to load DataBase";

type TableAnime = DetailAnime & { id: string };

//TODO: прибрать промис
const startedAddAnime = (dataBase: IDBDatabase, anime: DetailAnime) => {
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
  const dispatch = useDispatch();

  useEffect(() => {
    switch (doEffect?.type) {
      case "!startedAddAnime":
        // eslint-disable-next-line no-lone-blocks
        {
          if (dataBase) {
            const currAnime = doEffect.data;
            const addAnimePromise = startedAddAnime(dataBase, currAnime);
            //возвращает  key
            addAnimePromise.then(
              (res) => {
                console.log("add res", res);
                getAnimeList(dataBase).then((animeList) => {
                  console.log("newAnimeList", animeList);
                  dispatch({
                    type: "endedAddAnime",
                    payload: animeList,
                  });
                });
              },
              (error) => {
                console.log("error", error);
                dispatch({
                  type: "endedAddAnime",
                });
              }
            );
          }
        }
        break;

      default: {
        break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doEffect]);
}
