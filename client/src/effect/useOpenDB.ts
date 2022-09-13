import { resolve } from "path";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../types";

// const DATABASE_ERR = "Failed to load DataBase";

const DATABASE_NAME = "animeBase";
const STORE_NAME = "animeList";

const openDataBasePromise = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const requestDB = window.indexedDB.open(DATABASE_NAME, 1);

    requestDB.onupgradeneeded = function () {
      // срабатывает, если на клиенте нет базы данных до открытия соединения
      let db = requestDB.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };

    requestDB.onsuccess = () => resolve(requestDB.result);

    requestDB.onerror = () => reject(requestDB.error);
  });
};

const getAnimeList = (db: IDBDatabase) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const animeList = transaction.objectStore(STORE_NAME);
    const requestStoredAnime = animeList.getAll();
    requestStoredAnime.onsuccess = () => resolve(requestStoredAnime.result);
    requestStoredAnime.onerror = () => reject(requestStoredAnime.error);
  });
};

export function useOpenDB() {
  const [doEffect] = useSelector((state: State) => [state.doEffect]);
  const dispatch = useDispatch();

  useEffect(() => {
    switch (doEffect?.type) {
      case "!openDB":
        openDataBasePromise().then(
          (db) => {
            getAnimeList(db).then((animeList) => {
              setTimeout(() => {
                dispatch({
                  type: "loadedDB",
                  payload: { dataVase: db, animeList },
                });
              }, 2000);
            });
          },
          (error) => {
            console.log("error", error);
          }
        );
        break;

      default: {
        break;
      }
    }
  }, [dispatch, doEffect]);
}
