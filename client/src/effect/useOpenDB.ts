import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../business/reducer";

import { State } from "../types";
import { getAnimeList } from "./common/getAnimeList";

// const DATABASE_ERR = "Failed to load DataBase";

const DATABASE_NAME = "animeBase";
const STORE_NAME = "animeList";
const KEY_NAME = "animeName";

const openDataBasePromise = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const requestDB = window.indexedDB.open(DATABASE_NAME, 1);

    requestDB.onupgradeneeded = function () {
      // срабатывает, если на клиенте нет базы данных до открытия соединения
      let db = requestDB.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: KEY_NAME });
      }
    };

    requestDB.onsuccess = () => resolve(requestDB.result);

    requestDB.onerror = () => reject(requestDB.error);
  });
};

export function useOpenDB() {
  const [doEffect] = useSelector((state: State) => [state.doEffect]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    switch (doEffect?.type) {
      case "!openDB":
        openDataBasePromise().then(
          (db) => {
            getAnimeList(db).then((animeList) => {
              setTimeout(() => {
                dispatch({
                  type: "loadedDB",
                  payload: { dataBase: db, animeList },
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
