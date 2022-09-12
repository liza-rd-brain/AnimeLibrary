import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DetailAnime, State } from "../types";

const DATABASE_ERR = "Failed to load DataBase";

const DATABASE_STORE = "animeList";
type TableAnime = DetailAnime & { id: string };

const addAnime = (
  dataBase: IDBDatabase,
  anime: DetailAnime,
  promiseCallBack: (err: DOMException | null, result?: IDBValidKey) => void
) => {
  const transaction = dataBase.transaction(DATABASE_STORE, "readwrite");
  const animeList = transaction.objectStore(DATABASE_STORE);

  const newTableAnime: TableAnime = {
    id: anime.animeName,
    ...anime,
  };

  const request = animeList.add(newTableAnime);

  request.onerror = () => {
    console.log("request", request);
  };

  request.onsuccess = () => {
    console.log("request", request);
    promiseCallBack(null, request.result);
  };
};

const createAddAnimePromise = (dataBase: IDBDatabase, anime: DetailAnime) => {
  return new Promise((resolve, reject) => {
    addAnime(
      dataBase,
      anime,
      (err: DOMException | null, result?: IDBValidKey) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

export function useAddAnime() {
  const { doEffect, dataBase } = useSelector((state: State) => ({ ...state }));
  const dispatch = useDispatch();

  useEffect(() => {
    switch (doEffect?.type) {
      case "!addAnime":
        // eslint-disable-next-line no-lone-blocks
        {
          console.log("addAnime");
          if (dataBase) {
            const currAnime = doEffect.data;
            const addAnimePromise = createAddAnimePromise(dataBase, currAnime);
          }
        }
        break;

      default: {
        break;
      }
    }
  }, [doEffect]);
}
